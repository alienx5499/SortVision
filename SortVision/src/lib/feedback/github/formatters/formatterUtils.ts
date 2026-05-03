export function buildMarkdownSection(title: string, body: string): string {
  if (!body) return '';
  return `\n## ${title}\n\n${body}`;
}

export function isKnown(value: string | null | undefined): boolean {
  return Boolean(value && value !== 'Unknown');
}

export function boolLabel<T, F>(condition: boolean, yes: T, no: F): T | F {
  return condition ? yes : no;
}
