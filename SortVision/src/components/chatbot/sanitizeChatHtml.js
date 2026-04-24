import DOMPurify from 'dompurify';

const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: ['div', 'p', 'span', 'br', 'b', 'strong', 'i', 'em', 'code'],
  ALLOWED_ATTR: ['class'],
  FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
  FORBID_ATTR: ['onerror', 'onclick', 'onload', 'style'],
};

export function sanitizeChatHtml(content) {
  return DOMPurify.sanitize(String(content || ''), SANITIZE_OPTIONS);
}
