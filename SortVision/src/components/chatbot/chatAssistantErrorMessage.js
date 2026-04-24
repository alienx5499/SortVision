export function buildChatErrorMessage(error, errorCount) {
  if (error.message?.includes('TIMEOUT_ERROR')) {
    return `
      <div class="animate-fade-in space-y-1 max-w-full">
        <p class="m-0 text-orange-400"> Request Timeout</p>
        <p class="m-0 text-sm">The request took too long to process. Let me help you with local knowledge instead!</p>
        <p class="m-0 text-xs text-blue-300">Tip: Try asking about specific algorithms!</p>
      </div>`;
  }

  if (error.message?.includes('NETWORK_ERROR')) {
    return `
      <div class="animate-fade-in space-y-1 max-w-full">
        <p class="m-0 text-yellow-400"> Connection Issue</p>
        <p class="m-0 text-sm">I'm having trouble connecting. Let me help you with local knowledge instead!</p>
        <p class="m-0 text-xs text-blue-300">Tip: Try asking about specific algorithms!</p>
      </div>`;
  }

  if (error.message?.includes('RATE_LIMIT')) {
    return `
      <div class="animate-fade-in space-y-1 max-w-full">
        <p class="m-0 text-orange-400"> Rate Limit Reached</p>
        <p class="m-0 text-sm">I'm getting too many requests. Please wait a moment and try again!</p>
        <p class="m-0 text-xs text-blue-300">Tip: In the meantime, try exploring the algorithms above!</p>
      </div>`;
  }

  if (error.message?.includes('SERVER_ERROR')) {
    return `
      <div class="animate-fade-in space-y-1 max-w-full">
        <p class="m-0 text-red-400"> Server Issue</p>
        <p class="m-0 text-sm">There's a temporary server issue. Let me help you with local knowledge instead!</p>
        <p class="m-0 text-xs text-blue-300">Tip: Try asking about specific algorithms!</p>
      </div>`;
  }

  if (errorCount > 2) {
    return `
      <div class="animate-fade-in space-y-1 max-w-full">
        <p class="m-0 text-red-400"> Persistent Issue</p>
        <p class="m-0 text-sm">I'm having trouble connecting. Please try again later or refresh the page.</p>
        <p class="m-0 text-xs text-blue-300">Tip: In the meantime, explore the algorithms above!</p>
      </div>`;
  }

  return `
      <div class="animate-fade-in space-y-1 max-w-full">
        <p class="m-0 text-yellow-400"> Temporary Issue</p>
        <p class="m-0 text-sm">I encountered an error. Let me try to help you again.</p>
        <p class="m-0 text-xs text-blue-300">Tip: Try asking about specific algorithms!</p>
      </div>`;
}
