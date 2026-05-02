/**
 * SortBot — sorting-assistant UI and engine.
 * Prefer importing from this barrel for a stable public API.
 */
export { default as ChatAssistant } from './ChatAssistant';
export { default as ChatButton } from './ChatButton';
export { default as ChatModal } from './ChatModal';
export { processMessage, createAssistantSession } from './assistantEngine';
export type { AssistantSession } from './types';
