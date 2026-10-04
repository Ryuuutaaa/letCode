import type * as Monaco from 'monaco-editor';
import type { LanguageId } from '~/types/content';
import type { ThemeMode } from '~/types/state';

type MonacoModule = typeof Monaco;

let monacoModule: MonacoModule | null = null;
let environmentReady = false;

const MONACO_LANGUAGES: Record<LanguageId, string> = {
  javascript: 'javascript',
  python: 'python',
};

const MONACO_THEMES: Record<ThemeMode, string> = {
  light: 'vs',
  dark: 'vs-dark',
};

async function loadMonaco(): Promise<MonacoModule> {
  if (monacoModule) {
    return monacoModule;
  }

  const [{ default: EditorWorker }, { default: TypeScriptWorker }, monaco] = await Promise.all([
    import('monaco-editor/editor/editor.worker?worker'),
    import('monaco-editor/language/typescript/ts.worker?worker'),
    import('monaco-editor'),
  ]);

  if (!environmentReady) {
    (globalThis as unknown as { MonacoEnvironment: unknown }).MonacoEnvironment = {
      getWorker(_workerId: string, label: string) {
        if (label === 'typescript' || label === 'javascript') {
          return new TypeScriptWorker();
        }

        return new EditorWorker();
      },
    };

    environmentReady = true;
  }

  monacoModule = monaco;

  return monaco;
}

export interface EditorMountOptions {
  language: LanguageId;
  onChange: (value: string) => void;
  theme: ThemeMode;
  value: string;
}

export function useCodeEditor() {
  let editor: Monaco.editor.IStandaloneCodeEditor | null = null;
  let changeListener: Monaco.IDisposable | null = null;

  async function mount(element: HTMLElement, options: EditorMountOptions): Promise<void> {
    const monaco = await loadMonaco();

    monaco.editor.setTheme(MONACO_THEMES[options.theme]);

    editor = monaco.editor.create(element, {
      automaticLayout: true,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSize: 14,
      language: MONACO_LANGUAGES[options.language],
      minimap: { enabled: false },
      padding: { bottom: 12, top: 12 },
      renderLineHighlight: 'none',
      scrollBeyondLastLine: false,
      tabSize: 2,
      theme: MONACO_THEMES[options.theme],
      value: options.value,
    });

    changeListener = editor.onDidChangeModelContent(() => {
      options.onChange(editor?.getValue() ?? '');
    });
  }

  function dispose(): void {
    changeListener?.dispose();
    changeListener = null;
    editor?.dispose();
    editor = null;
  }

  function getValue(): string {
    return editor?.getValue() ?? '';
  }

  function setValue(value: string): void {
    const model = editor?.getModel();

    if (model && model.getValue() !== value) {
      editor?.setValue(value);
    }
  }

  function setLanguage(language: LanguageId): void {
    const model = editor?.getModel();

    if (model && monacoModule) {
      monacoModule.editor.setModelLanguage(model, MONACO_LANGUAGES[language]);
    }
  }

  function setTheme(theme: ThemeMode): void {
    monacoModule?.editor.setTheme(MONACO_THEMES[theme]);
  }

  function focus(): void {
    editor?.focus();
  }

  return { dispose, focus, getValue, mount, setLanguage, setTheme, setValue };
}
