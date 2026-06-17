import type { SortingAlgorithmId } from './algorithmRegistry';
import type { VisualizerBarHighlight } from './visualizerBarState';

export type StepExplanationInput = {
  algorithm: SortingAlgorithmId;
  array: number[];
  currentBar: VisualizerBarHighlight;
  isSorting: boolean;
  isPaused?: boolean;
  isStopped: boolean;
  currentTestingAlgo?: SortingAlgorithmId | null;
};

export type StepExplanation = {
  algorithmLabel: string;
  status: 'idle' | 'running' | 'paused' | 'stopped';
  title: string;
  detail: string;
  beginnerSummary: string;
  currentFocus: string;
  decisionRule: string;
  nextStep: string;
  reason: string;
  highlightLegend: string[];
  walkthrough: string[];
  values: string[];
};

type AlgorithmGuide = {
  label: string;
  beginnerSummary: string;
  reason: string;
  decisionRule: string;
  highlightLegend: string[];
  walkthrough: string[];
};

const ALGORITHM_GUIDES: Record<SortingAlgorithmId, AlgorithmGuide> = {
  bubble: {
    label: 'Bubble Sort',
    beginnerSummary:
      'Bubble Sort is like repeatedly walking along a row of cards and fixing only the two neighboring cards you are looking at.',
    reason:
      'After each full pass, one of the largest unsorted values has drifted to the right side, so the sorted suffix grows from right to left.',
    decisionRule:
      'Compare the left neighbor with the right neighbor. If the left value is larger, swap them; otherwise keep them in place.',
    highlightLegend: [
      'Compare marker: the left item in the neighboring pair.',
      'Swap marker: the right item in the neighboring pair.',
      'A swap means the larger item moves one step to the right.',
    ],
    walkthrough: [
      'Start at the beginning of the array.',
      'Compare two neighboring values.',
      'Swap them only when the left value is bigger.',
      'Keep moving right until the largest unsorted value reaches its final area.',
    ],
  },
  insertion: {
    label: 'Insertion Sort',
    beginnerSummary:
      'Insertion Sort builds a sorted left side, then inserts the next value into the correct position inside that sorted side.',
    reason:
      'The left side stays sorted because larger values are shifted right until there is space for the current value.',
    decisionRule:
      'If the value on the left is larger than the value being inserted, shift the larger value one position right.',
    highlightLegend: [
      'Compare marker: a value already in the sorted left section.',
      'Swap marker: the position being opened for the value being inserted.',
      'Repeated shifts make room for the current value.',
    ],
    walkthrough: [
      'Treat the first item as already sorted.',
      'Pick the next item as the value to insert.',
      'Move left through the sorted section while values are too large.',
      'Place the picked value in the gap that remains.',
    ],
  },
  selection: {
    label: 'Selection Sort',
    beginnerSummary:
      'Selection Sort chooses the smallest remaining value and places it at the front of the unsorted section.',
    reason:
      'Each pass permanently fixes one position, so the sorted prefix grows from left to right.',
    decisionRule:
      'Keep a current smallest candidate. If the scanned value is smaller, it becomes the new smallest candidate.',
    highlightLegend: [
      'Compare marker: the current smallest candidate found in this pass.',
      'Swap marker: the next unsorted value being scanned.',
      'At the end of the scan, the smallest candidate moves into the next sorted position.',
    ],
    walkthrough: [
      'Choose the first unsorted position.',
      'Scan the rest of the array for a smaller value.',
      'Remember the index of the smallest value found.',
      'Swap that smallest value into the first unsorted position.',
    ],
  },
  quick: {
    label: 'Quick Sort',
    beginnerSummary:
      'Quick Sort chooses a pivot value, then rearranges the current section so smaller values go left and larger values stay right.',
    reason:
      'Once the pivot is placed between the smaller and larger groups, the same idea can sort each side independently.',
    decisionRule:
      'Compare each scanned value with the pivot. Values smaller than the pivot are moved into the left partition.',
    highlightLegend: [
      'Compare marker alone: the pivot value selected for the current partition.',
      'Compare marker with swap marker: a scanned value is being checked against the pivot.',
      'The pivot becomes a boundary between smaller and larger values.',
    ],
    walkthrough: [
      'Pick a pivot, here shown as the highlighted pivot bar.',
      'Scan the current section from left to right.',
      'Move values smaller than the pivot into the left partition.',
      'Put the pivot between the smaller and larger partitions, then repeat on both sides.',
    ],
  },
  merge: {
    label: 'Merge Sort',
    beginnerSummary:
      'Merge Sort splits the array into small sorted pieces, then merges two sorted pieces by choosing the smaller front value.',
    reason:
      'Two already-sorted groups can be merged efficiently because only their front values need to be compared.',
    decisionRule:
      'Compare the front value of the left group with the front value of the right group. Copy the smaller one next.',
    highlightLegend: [
      'Compare marker: the current front value from the left sorted group.',
      'Swap marker: the current front value from the right sorted group.',
      'The smaller highlighted value is copied into the merged output.',
    ],
    walkthrough: [
      'Split the array until each tiny piece is already sorted.',
      'Take two neighboring sorted pieces.',
      'Compare the first unused value from each piece.',
      'Copy the smaller value into the next output position and continue.',
    ],
  },
  radix: {
    label: 'Radix Sort',
    beginnerSummary:
      'Radix Sort does not compare two values directly. It groups numbers by one digit at a time, from ones place to tens place and beyond.',
    reason:
      'Stable digit passes preserve earlier digit ordering while adding more significant digit ordering.',
    decisionRule:
      'Read the active digit of the highlighted value and place the value into the matching digit bucket.',
    highlightLegend: [
      'Compare marker: the value whose current digit is being read.',
      'The buckets are rebuilt for each digit position.',
      'The array is written back after each digit pass.',
    ],
    walkthrough: [
      'Look at one digit position, starting with the ones digit.',
      'Count or group values by that digit.',
      'Write values back in digit order.',
      'Move to the next digit position and repeat until all digits are handled.',
    ],
  },
  heap: {
    label: 'Heap Sort',
    beginnerSummary:
      'Heap Sort first shapes the array like a max heap, where every parent should be at least as large as its children.',
    reason:
      'The largest value is kept at the heap root, so it can be moved to the sorted end of the array one value at a time.',
    decisionRule:
      'Compare a parent or largest candidate with a child. If the child is larger, the child becomes the new largest candidate.',
    highlightLegend: [
      'Compare marker: the current largest candidate in the heap.',
      'Swap marker: the child being checked against that candidate.',
      'If a child is larger, the heap is repaired by swapping downward.',
    ],
    walkthrough: [
      'Build a max heap from the array.',
      'Move the largest value at the root to the end.',
      'Shrink the heap so the sorted end is not touched again.',
      'Repair the heap and repeat.',
    ],
  },
  bucket: {
    label: 'Bucket Sort',
    beginnerSummary:
      'Bucket Sort separates values into value-range buckets, sorts each bucket, then writes all buckets back in order.',
    reason:
      'If values are spread fairly evenly, each bucket is small, so sorting inside buckets is cheaper than sorting everything at once.',
    decisionRule:
      'Use the highlighted value range to choose a bucket, then later write sorted bucket values back into the array.',
    highlightLegend: [
      'Compare marker: a value being assigned to a bucket.',
      'Swap marker: a sorted bucket value being written back to the array.',
      'Buckets are concatenated from low range to high range.',
    ],
    walkthrough: [
      'Find the minimum and maximum values to define bucket ranges.',
      'Place each value into the bucket for its range.',
      'Sort values inside each bucket.',
      'Write buckets back from smallest range to largest range.',
    ],
  },
};

function formatValue(index: number, array: number[]): string {
  const value = array[index];
  return value === undefined ? `index ${index}` : `index ${index} = ${value}`;
}

function compareValues(leftIndex: number, rightIndex: number, array: number[]) {
  const left = array[leftIndex];
  const right = array[rightIndex];

  if (left === undefined || right === undefined) {
    return 'One of these positions is outside the visible array, so the panel can only explain the index being highlighted.';
  }
  if (left > right) {
    return `${left} is greater than ${right}.`;
  }
  if (left < right) {
    return `${left} is less than ${right}.`;
  }
  return `${left} is equal to ${right}.`;
}

function getStatus({
  isSorting,
  isPaused,
  isStopped,
}: StepExplanationInput): StepExplanation['status'] {
  if (isPaused) return 'paused';
  if (isStopped) return 'stopped';
  if (isSorting) return 'running';
  return 'idle';
}

function getPairFocus(
  algorithm: SortingAlgorithmId,
  compare: number,
  swap: number,
  array: number[]
): string {
  const relation = compareValues(compare, swap, array);
  const left = formatValue(compare, array);
  const right = formatValue(swap, array);

  switch (algorithm) {
    case 'bubble':
      return `The algorithm is checking neighboring values: ${left} and ${right}. ${relation} Bubble Sort swaps only when the left value is larger.`;
    case 'insertion':
      return `The algorithm is shifting through the sorted left section. It is checking whether ${left} should move right to make room at ${right}. ${relation}`;
    case 'selection':
      return `The algorithm is comparing the current smallest candidate, ${left}, with the scanned value, ${right}. ${relation} If the scanned value is smaller, it becomes the new candidate.`;
    case 'quick':
      return `The algorithm is comparing ${left} with the pivot ${right}. ${relation} Values smaller than the pivot are moved into the left partition.`;
    case 'merge':
      return `The algorithm is merging two sorted groups. It compares the left-front value ${left} with the right-front value ${right}. ${relation} The smaller front value is copied next.`;
    case 'heap':
      return `The algorithm is repairing the heap. It compares largest candidate ${left} with child ${right}. ${relation} The larger value should move closer to the root.`;
    case 'bucket':
      return `Bucket Sort is comparing ${left} and ${right}, but most bucket work is about grouping by ranges rather than pairwise comparison. ${relation}`;
    case 'radix':
      return `Radix Sort is reading digit information. These highlighted positions are ${left} and ${right}; digit grouping, not direct comparison, decides placement.`;
  }
}

function getSingleFocus(
  algorithm: SortingAlgorithmId,
  compare: number | null,
  swap: number | null,
  array: number[]
): string {
  if (compare !== null) {
    const value = formatValue(compare, array);

    switch (algorithm) {
      case 'quick':
        return `The highlighted value ${value} is acting as the pivot for this partition. Other values in this section will be compared against it.`;
      case 'radix': {
        const raw = array[compare];
        const digitHint =
          raw === undefined
            ? ''
            : ` Its ones digit is ${Math.abs(raw) % 10}; later passes look at tens, hundreds, and so on.`;
        return `The highlighted value ${value} is being read for the current digit pass.${digitHint}`;
      }
      case 'bucket':
        return `The highlighted value ${value} is being assigned to a bucket based on its value range.`;
      default:
        return `The algorithm is inspecting ${value}. This is a read step before deciding whether anything must move.`;
    }
  }

  if (swap !== null) {
    const value = formatValue(swap, array);
    if (algorithm === 'bucket') {
      return `A sorted bucket value is being written back into ${value}. This rebuilds the final array from low-value buckets to high-value buckets.`;
    }
    return `The visualization is writing or moving a value at ${value}.`;
  }

  return 'No individual bar is highlighted right now; the algorithm is between visible operations.';
}

function buildNextStep(
  algorithm: SortingAlgorithmId,
  status: StepExplanation['status'],
  hasHighlight: boolean
): string {
  if (status === 'paused') {
    return 'Resume the run to continue from this exact operation.';
  }
  if (status === 'stopped') {
    return 'Start a new run to rebuild the explanation from the first operation.';
  }
  if (status === 'idle') {
    return 'Press start to see the first highlighted operation and follow the guide step by step.';
  }
  if (!hasHighlight) {
    return 'The next visible operation will highlight the value or pair that the algorithm is about to inspect.';
  }

  switch (algorithm) {
    case 'bubble':
      return 'Next, the scan moves to the following neighboring pair; after enough scans, large values settle on the right.';
    case 'insertion':
      return 'Next, the algorithm either shifts another larger value right or inserts the saved value into the open space.';
    case 'selection':
      return 'Next, the scan continues looking for a smaller candidate; the smallest found value is swapped into position at the end of the pass.';
    case 'quick':
      return 'Next, the partition scan continues until the pivot can be placed between smaller and larger values.';
    case 'merge':
      return 'Next, the smaller highlighted front value is copied into the merged output, then that side advances.';
    case 'radix':
      return 'Next, the value is placed according to the active digit; after this digit pass, the algorithm moves to the next digit place.';
    case 'heap':
      return 'Next, the larger candidate may swap upward in the heap, then heap repair continues downward.';
    case 'bucket':
      return 'Next, the algorithm keeps filling buckets or writes the sorted bucket contents back into the array.';
  }
}

export function getStepExplanation(
  input: StepExplanationInput
): StepExplanation {
  const activeAlgorithm = input.currentTestingAlgo ?? input.algorithm;
  const guide = ALGORITHM_GUIDES[activeAlgorithm];
  const algorithmLabel = guide.label;
  const status = getStatus(input);
  const { compare, swap } = input.currentBar;
  const values = [
    compare !== null ? formatValue(compare, input.array) : null,
    swap !== null ? formatValue(swap, input.array) : null,
  ].filter((value): value is string => Boolean(value));
  const hasHighlight = compare !== null || swap !== null;
  const base = {
    algorithmLabel,
    status,
    beginnerSummary: guide.beginnerSummary,
    reason: guide.reason,
    decisionRule: guide.decisionRule,
    highlightLegend: guide.highlightLegend,
    walkthrough: guide.walkthrough,
    values,
    nextStep: buildNextStep(activeAlgorithm, status, hasHighlight),
  };

  if (status === 'idle') {
    return {
      ...base,
      title: 'Ready to explain each step',
      detail:
        'Start the visualization to see how highlights connect to the algorithm rule.',
      currentFocus:
        'Nothing is highlighted yet. Use the walkthrough below as the mental model before pressing start.',
      values: [],
    };
  }

  if (status === 'stopped') {
    return {
      ...base,
      title: 'Visualization stopped',
      detail:
        'The current run was terminated, so the panel is preserving the last visible operation.',
      currentFocus: hasHighlight
        ? getSingleFocus(activeAlgorithm, compare, swap, input.array)
        : 'There is no active highlighted operation after stopping.',
    };
  }

  if (compare !== null && swap !== null) {
    return {
      ...base,
      title: 'Comparing highlighted values',
      detail: `The algorithm is checking ${formatValue(compare, input.array)} against ${formatValue(swap, input.array)}.`,
      currentFocus: getPairFocus(activeAlgorithm, compare, swap, input.array),
    };
  }

  if (compare !== null) {
    return {
      ...base,
      title: 'Inspecting one value',
      detail: `The algorithm is reading ${formatValue(compare, input.array)} to decide the next move.`,
      currentFocus: getSingleFocus(activeAlgorithm, compare, null, input.array),
    };
  }

  if (swap !== null) {
    return {
      ...base,
      title: 'Writing a value',
      detail: `The visualization is updating ${formatValue(swap, input.array)} after a move or bucket write-back.`,
      currentFocus: getSingleFocus(activeAlgorithm, null, swap, input.array),
    };
  }

  return {
    ...base,
    title:
      status === 'paused'
        ? 'Paused between operations'
        : 'Preparing the next operation',
    detail:
      status === 'paused'
        ? 'The algorithm is paused. Resume to continue the next comparison or move.'
        : 'The algorithm is between visible steps and will highlight the next operation shortly.',
    currentFocus:
      status === 'paused'
        ? 'The run is paused between two visible operations, so no exact bar action is active at this moment.'
        : 'The algorithm is doing a short internal update before the next highlighted operation appears.',
  };
}
