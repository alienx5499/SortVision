export function buildMarkdownSection(title, body) {
  if (!body) return '';
  return `\n## ${title}\n\n${body}`;
}

export function isKnown(value) {
  return Boolean(value && value !== 'Unknown');
}

export function boolLabel(condition, yes, no) {
  return condition ? yes : no;
}
