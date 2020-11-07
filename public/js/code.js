require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
	monaco.editor.create(document.getElementById('container'), {
		value: [
			'int main() {',
			'\tint number = 5;',
			'\tchar character = \'A\';',
			'}'
		].join('\n'),
		language: 'cpp',
		theme: 'vs-dark',
		automaticLayout: true
	});
});

$('#container').resize(function(){
	monaco.editor.layout();
});