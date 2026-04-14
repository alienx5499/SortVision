import { INSTANT_RESPONSES } from '../constants';

const LOCALIZED_HELP_SNIPPETS = {
  en: INSTANT_RESPONSES.help,
  es: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Hola. Soy SortBot, tu asistente de algoritmos de ordenamiento.</p>
      <p class="m-0 text-sm">Puedo ayudarte con complejidad, pasos y comparaciones de algoritmos.</p>
      <p class="m-0 text-xs text-blue-300">Prueba: "complejidad de merge sort" o "quick sort vs heap sort".</p>
    </div>`,
  hi: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">नमस्ते। मैं SortBot हूँ, आपका sorting algorithm assistant।</p>
      <p class="m-0 text-sm">मैं complexity, steps और algorithm comparison में मदद कर सकता हूँ।</p>
      <p class="m-0 text-xs text-blue-300">उदाहरण: "merge sort complexity" या "quick sort vs heap sort".</p>
    </div>`,
  fr: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Bonjour. Je suis SortBot, votre assistant d'algorithmes de tri.</p>
      <p class="m-0 text-sm">Je peux aider avec la complexité, les étapes et les comparaisons.</p>
      <p class="m-0 text-xs text-blue-300">Essayez: "complexité du merge sort" ou "quick sort vs heap sort".</p>
    </div>`,
  de: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Hallo. Ich bin SortBot, dein Assistent fuer Sortieralgorithmen.</p>
      <p class="m-0 text-sm">Ich helfe bei Komplexitaet, Schritten und Vergleichen.</p>
      <p class="m-0 text-xs text-blue-300">Versuch: "merge sort komplexitaet" oder "quick sort vs heap sort".</p>
    </div>`,
  zh: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">你好。我是 SortBot，你的排序算法助手。</p>
      <p class="m-0 text-sm">我可以帮助你理解复杂度、步骤和算法对比。</p>
      <p class="m-0 text-xs text-blue-300">可以试试："归并排序复杂度" 或 "快速排序和堆排序对比"。</p>
    </div>`,
  bn: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">হ্যালো। আমি SortBot, তোমার sorting algorithm assistant।</p>
      <p class="m-0 text-sm">আমি complexity, ধাপ এবং algorithm comparison এ সাহায্য করতে পারি।</p>
      <p class="m-0 text-xs text-blue-300">চেষ্টা করো: "merge sort complexity" বা "quick sort vs heap sort"।</p>
    </div>`,
  ja: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">こんにちは。SortBotです。ソートアルゴリズムをサポートします。</p>
      <p class="m-0 text-sm">計算量、手順、アルゴリズム比較を分かりやすく説明します。</p>
      <p class="m-0 text-xs text-blue-300">例: "merge sort complexity" や "quick sort vs heap sort"。</p>
    </div>`,
  jp: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">こんにちは。SortBotです。ソートアルゴリズムをサポートします。</p>
      <p class="m-0 text-sm">計算量、手順、アルゴリズム比較を分かりやすく説明します。</p>
      <p class="m-0 text-xs text-blue-300">例: "merge sort complexity" や "quick sort vs heap sort"。</p>
    </div>`,
};

export { LOCALIZED_HELP_SNIPPETS };
