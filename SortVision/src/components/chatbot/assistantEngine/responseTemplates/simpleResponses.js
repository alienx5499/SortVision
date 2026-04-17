export function generateThankYouResponse() {
  return `
        <div class="animate-fade-in animate-duration-150 space-y-0.5 max-w-full">
            <p class="m-0 leading-tight break-words">You're welcome! </p>
            <div class="animate-bounce animate-duration-[1000ms]">
                <p class="m-0 text-sm break-words">If you found SortVision helpful, please give us a  star on <a href="https://github.com/alienx5499/SortVision" target="_blank" class="text-blue-400 hover:text-blue-300 underline transition-colors duration-150">GitHub</a>!</p>
            </div>
            <p class="m-0 text-xs text-slate-400 break-words">Your support means a lot to us! </p>
        </div>`;
}
export function generateHelpResponse() {
  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-emerald-400">Hi, I am SortBot, your sorting algorithm assistant.</p>
            <p class="m-0 text-sm">I can explain algorithm behavior, complexity, and when to use each one. Try:</p>
            <div class="grid grid-cols-1 gap-1 mt-2 text-xs">
                <p class="m-0">• "What is bubble sort?"</p>
                <p class="m-0">• "How does merge sort work?"</p>
                <p class="m-0">• "Compare quick sort vs heap sort"</p>
                <p class="m-0">• "What's the complexity of insertion sort?"</p>
            </div>
            <p class="m-0 text-xs text-blue-300">Tip: Pick an algorithm above to start visualizing!</p>
        </div>`;
}

export function generateClarificationResponse(context) {
  const { algorithm } = context || {};
  const currentAlgo = algorithm && algorithm !== 'Unknown' ? algorithm : null;

  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-yellow-400">I did not fully understand that request.</p>
            ${
              currentAlgo
                ? `<p class="m-0 text-sm">Currently visualizing: <span class="font-semibold text-emerald-300">${currentAlgo}</span></p>`
                : ''
            }
            <div class="text-xs mt-2">
                <p class="m-0">Try one of these:</p>
                <p class="m-0">• "How does this work?"</p>
                <p class="m-0">• "What is the time complexity?"</p>
                <p class="m-0">• "Explain the steps"</p>
            </div>
            <p class="m-0 text-xs text-blue-300">Tip: Or ask about any sorting algorithm!</p>
        </div>`;
}
