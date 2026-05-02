/** One-word instant replies that use a loading placeholder in the UI. */
export const INSTANT_CHAT_QUERY =
  /^(support|creator|github|help|thank|hi|hello)$/i;

export function isInstantChatQuery(trimmedInput: string): boolean {
  return INSTANT_CHAT_QUERY.test(trimmedInput);
}
