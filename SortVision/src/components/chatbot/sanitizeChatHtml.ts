/** DOMPurify policy for SortBot HTML bubbles (assistant output only). */
import DOMPurify, { type Config } from 'dompurify';

const SANITIZE_OPTIONS: Config = {
  ALLOWED_TAGS: [
    'div',
    'p',
    'span',
    'br',
    'b',
    'strong',
    'i',
    'em',
    'code',
    'pre',
    'button',
    'a',
  ],
  ALLOWED_ATTR: [
    'class',
    'id',
    'type',
    'href',
    'target',
    'rel',
    'data-sv-action',
    'data-sv-algorithm',
    'data-sv-code-id',
    'data-sv-language',
  ],
  FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
  FORBID_ATTR: ['onerror', 'onclick', 'onload', 'style'],
};

export function sanitizeChatHtml(content: unknown): string {
  return DOMPurify.sanitize(String(content || ''), SANITIZE_OPTIONS);
}
