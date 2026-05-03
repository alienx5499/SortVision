const FILE_EXTENSION_MAP: Record<string, string> = {
  python: 'py',
  javascript: 'js',
  typescript: 'ts',
  java: 'java',
  cpp: 'cpp',
  golang: 'go',
  rust: 'rs',
  csharp: 'cs',
  dart: 'dart',
  kotlin: 'kt',
  swift: 'swift',
  php: 'php',
  ruby: 'rb',
  scala: 'scala',
  c: 'c',
  r: 'r',
  lua: 'lua',
  haskell: 'hs',
  julia: 'jl',
  pseudocode: 'txt',
};

const MONACO_LANGUAGE_MAP: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  java: 'java',
  cpp: 'cpp',
  golang: 'go',
  rust: 'rust',
  csharp: 'csharp',
  dart: 'dart',
  kotlin: 'kotlin',
  swift: 'swift',
  php: 'php',
  ruby: 'ruby',
  scala: 'scala',
  c: 'c',
  r: 'r',
  lua: 'lua',
  haskell: 'haskell',
  julia: 'julia',
  pseudocode: 'pseudocode',
};

export const getFileExtension = (language: string): string =>
  FILE_EXTENSION_MAP[language] || 'txt';

export const getMonacoLanguage = (language: string): string =>
  MONACO_LANGUAGE_MAP[language] || 'plaintext';
