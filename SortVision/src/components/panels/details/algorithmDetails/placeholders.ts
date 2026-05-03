import { PLACEHOLDER_MESSAGES } from './constants';

export const getPlaceholderContent = (): string =>
  PLACEHOLDER_MESSAGES[
    Math.floor(Math.random() * PLACEHOLDER_MESSAGES.length)
  ]!;
