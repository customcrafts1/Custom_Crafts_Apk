import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

const isDev = process.env.NODE_ENV !== 'production';
let inlineEditPlugin, editModeDevPlugin;

if (isDev) {
	inlineEditPlugin = (await import('./plugins/visual-editor/vite-plugin-react-inline-editor.js')).default;
	editModeDevPlugin = (await import('./plugins/visual-editor/vite-plugin-edit-mode.js')).default;
}

const configHorizonsRuntimeErrorHandler = `
window.onerror = (message, source, lineno, colno, errorObj) => {
	const errorDetails = errorObj ? JSON.stringify({
		name: errorObj.name,
		message: errorObj.message,
		stack: errorObj.stack,
		source,
		lineno,
		colno,
	}) : null;

	window.parent.postMessage({
		type: 'horizons-runtime-error',
		message,
		error: errorDetails
	}, '*');
};
`;

const configHorizonsViteErrorHandler = `
const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const addedNode of mutation.addedNodes) {
			if (
				addedNode.nodeType === Node.ELEMENT_NODE &&
				(
					addedNode.tagName?.toLowerCase() === 'vite-error-overlay' ||
					addedNode.classList?.contains('backdrop')
				)
			) {
				handleViteOverlay(addedNode);
			}
		}
	}
});

observer.observe(document.documentElement, {
	childList: true,
	subtree: true
});

function handleViteOverlay(node) {
	if (!node.shadowRoot) return;

	const backdrop = node.shadowRoot.querySelector('.backdrop');
	if (backdrop) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(backdrop.outerHTML, 'text/html');
		const msg = doc.querySelector('.message-body')?.textContent.trim() || '';
		const file = doc.querySelector('.file')?.textContent.trim() || '';
		window.parent.postMessage({ type: 'horizons-vite-error', error: msg + (file ? ' File:' + file : '') }, '*');
	}
}
`;

const configHorizonsConsoleErrorHandler = `
const originalConsoleError = console.error;
console.error = function(...args) {
	originalConsoleError.apply(console, args);
	let errorString = '';

	for (const arg of args) {
		if (arg instanceof Error) {
			errorString = arg.stack || \`\${arg.name}: \${arg.message}\`;
			break;
		}
	}

	if (!errorString) {
		errorString = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
	}

	window.parent.postMessage({ type: 'horizons-console-error', error: errorString }, '*');
};
`;

const configWindowFetchMonkeyPatch = `
const originalFetch = window.fetch;
window.fetch = function(...args) {
	const url = args[0] instanceof Request ? args[0].url : args[0];
	if (url.startsWith('ws:') || url.startsWith('wss:')) return originalFetch.apply(this, args);

	return originalFetch.apply(this, args).then(async res => {
		const type = res.headers.get('Content-Type') || '';
		if (!res.ok && !type.includes('text/html') && !type.includes('application/xhtml+xml')) {
			const txt = await res.clone().text();
			console.error(\`Fetch error from \${res.url}: \${txt}\`);
		}
		return res;
	}).catch(err => {
		if (!url.match(/\\.html?$/i)) console.error(err);
		throw err;
	});
};
`;

const addTransformIndexHtml = {
	name: 'add-transform-index-html',
	transformIndexHtml(html) {
		return {
			html,
			tags: [
				{ tag: 'script', attrs: { type: 'module' }, children: configHorizonsRuntimeErrorHandler, injectTo: 'head' },
				{ tag: 'script', attrs: { type: 'module' }, children: configHorizonsViteErrorHandler, injectTo: 'head' },
				{ tag: 'script', attrs: { type: 'module' }, children: configHorizonsConsoleErrorHandler, injectTo: 'head' },
				{ tag: 'script', attrs: { type: 'module' }, children: configWindowFetchMonkeyPatch, injectTo: 'head' },
			],
		};
	},
};

console.warn = () => {};
const logger = createLogger();
const loggerError = logger.error;
logger.error = (msg, options) => {
	if (!options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
		loggerError(msg, options);
	}
};

export default defineConfig({
	base: '/Custom_Crafts_Apk/',
	customLogger: logger,
	plugins: [
		...(isDev ? [inlineEditPlugin(), editModeDevPlugin()] : []),
		react(),
		addTransformIndexHtml,
	],
	server: {
		cors: true,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
		},
		allowedHosts: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			external: [
				'@babel/parser',
				'@babel/traverse',
				'@babel/generator',
				'@babel/types'
			]
		}
	}
});
