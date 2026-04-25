/**
 * File purpose: Single source of truth for SEO FAQ content (HTML + JSON-LD).
 */
export const SEO_GENERAL_FAQ_ENTRIES = [
  {
    question: 'What are the 5 sorting algorithms?',
    answer:
      'The 5 most important sorting algorithms to learn are: Bubble Sort (O(n²)), Insertion Sort (O(n²)), Selection Sort (O(n²)), Merge Sort (O(n log n)), and Quick Sort (O(n log n) average). SortVision visualizes all 8 major sorting algorithms including Heap Sort, Radix Sort, and Bucket Sort.',
  },
  {
    question: 'What are sorting algorithms?',
    answer:
      "Sorting algorithms are methods to arrange data in a specific order (ascending or descending). They're fundamental in computer science and essential for coding interviews. SortVision provides interactive visualizations to help you understand how each algorithm works step-by-step.",
  },
  {
    question: 'How many types of sorting algorithms are there?',
    answer:
      'There are many types of sorting algorithms, but the main categories include: comparison-based sorts (Bubble, Insertion, Selection, Merge, Quick, Heap), non-comparison sorts (Radix, Bucket, Counting), stable vs unstable sorts, and in-place vs out-of-place sorts. SortVision covers 8 major algorithms.',
  },
  {
    question: 'Which sorting algorithm is easy?',
    answer:
      "Bubble Sort is considered the easiest to understand and implement, making it perfect for beginners. It uses simple comparison and swapping logic. SortVision's interactive visualizer helps you see exactly how it works before moving to more complex algorithms.",
  },
  {
    question: 'What is the best sorting algorithm to learn first?',
    answer:
      'For beginners, we recommend starting with Bubble Sort to understand basic comparison and swapping concepts, then progressing to Insertion Sort and Selection Sort before tackling more advanced algorithms like Merge Sort and Quick Sort.',
  },
  {
    question: 'How do I prepare for sorting algorithm interview questions?',
    answer:
      'Practice implementing each algorithm from scratch, understand their time and space complexities, know when to use each algorithm, and be able to modify them for specific requirements. Our visualizer helps you understand the mechanics before coding.',
  },
  {
    question:
      "What's the difference between stable and unstable sorting algorithms?",
    answer:
      'Stable sorting algorithms maintain the relative order of equal elements, while unstable algorithms may change their relative positions. Merge Sort and Insertion Sort are stable, while Quick Sort and Heap Sort are typically unstable.',
  },
  {
    question: 'Which sorting algorithm is most efficient?',
    answer:
      'It depends on your data and constraints. Merge Sort and Heap Sort guarantee O(n log n) worst-case performance, Quick Sort averages O(n log n) but can degrade to O(n²), while Radix Sort can be O(nk) for integer data.',
  },
  {
    question: 'What are sorting algorithms used for?',
    answer:
      'Sorting algorithms are used in databases (indexing), search engines (ranking), operating systems (process scheduling), data analysis, machine learning, and countless other applications. Understanding them is crucial for software development and technical interviews.',
  },
  {
    question: 'Why are sorting algorithms important?',
    answer:
      "Sorting algorithms are fundamental to computer science and essential for efficient data processing. They're frequently asked in coding interviews and are the foundation for understanding more complex algorithms and data structures.",
  },
  {
    question: 'What are the four basic sorting algorithms?',
    answer:
      'The four basic sorting algorithms every programmer should know are: Bubble Sort (O(n²)), Insertion Sort (O(n²)), Selection Sort (O(n²)), and Merge Sort (O(n log n)). These form the foundation for understanding more advanced sorting techniques and are commonly asked in coding interviews.',
  },
  {
    question: 'Should I learn sorting algorithms?',
    answer:
      "Absolutely! Sorting algorithms are essential for any programmer. They're fundamental to computer science, frequently asked in coding interviews at top tech companies, and form the basis for understanding more complex algorithms and data structures. SortVision makes learning them interactive and engaging.",
  },
  {
    question: 'What are sorting algorithms used for in real life?',
    answer:
      'Sorting algorithms are used everywhere: search engines (ranking results), databases (indexing), operating systems (process scheduling), e-commerce (product sorting), social media (feed algorithms), data analysis, machine learning, and countless other applications in modern software development.',
  },
  {
    question: 'Which sorting algorithm is fastest?',
    answer:
      'The fastest sorting algorithm depends on your data and constraints. For general-purpose sorting, Quick Sort often performs best in practice (O(n log n) average), while Merge Sort guarantees O(n log n) worst-case performance. For specific data types, Radix Sort can achieve O(nk) linear time for integers.',
  },
  {
    question: 'What is algorithm visualization?',
    answer:
      'Algorithm visualization is the graphical representation of how algorithms work step-by-step. It helps students and developers understand complex algorithmic concepts through interactive animations, making abstract algorithms concrete and easier to learn. SortVision provides the most comprehensive algorithm visualization tools available online.',
  },
  {
    question: 'What is algorithm visualization primarily focused on conveying?',
    answer:
      'Algorithm visualization is primarily focused on conveying the step-by-step execution of algorithms, showing how data structures change, how comparisons and swaps occur, and how the algorithm progresses toward its final result. It makes abstract algorithmic concepts visual and interactive for better understanding and learning.',
  },
  {
    question: 'What is algorithm visualization in DAA?',
    answer:
      'Algorithm visualization in DAA (Design and Analysis of Algorithms) refers to the visual representation of algorithmic processes used in computer science education. It helps students understand algorithm complexity, efficiency, and implementation details through interactive demonstrations and step-by-step animations.',
  },
  {
    question: 'What are data structures and algorithms?',
    answer:
      'Data structures and algorithms (DSA) are fundamental concepts in computer science. Data structures are ways of organizing and storing data, while algorithms are step-by-step procedures for solving problems. Together, they form the foundation of efficient programming and are essential for coding interviews and software development.',
  },
  {
    question: 'How to learn data structures and algorithms?',
    answer:
      'Start with basic concepts like arrays, linked lists, and simple sorting algorithms. Practice implementing algorithms from scratch, understand time and space complexity, and solve coding problems regularly. Use interactive visualizers like SortVision to see algorithms in action, which makes learning much more effective than reading alone.',
  },
  {
    question: 'What is computer science education?',
    answer:
      'Computer science education encompasses the teaching and learning of computational thinking, programming, algorithms, data structures, and computer systems. It prepares students for careers in technology and develops problem-solving skills essential in the digital age.',
  },
  {
    question: 'Why are data structures and algorithms important?',
    answer:
      "Data structures and algorithms are crucial because they enable efficient problem-solving, optimize program performance, and are fundamental to software development. They're essential for coding interviews at top tech companies and form the backbone of computer science education.",
  },
  {
    question: 'Which coding platform is best for interview preparation?',
    answer:
      'Popular platforms include takeUforward, LeetCode, HackerRank, and CodeSignal for interview preparation. For structured DSA learning, takeUforward offers guided sheets and learning paths, while interactive visualizers like SortVision are invaluable for understanding algorithm concepts step-by-step and implementing them confidently during interviews.',
  },
];

export const SEO_ALGORITHM_DEEP_DIVE_FAQ_ENTRIES = [
  {
    question: 'What is the time complexity of merge sort?',
    answer:
      'Merge sort runs in O(n log n) time in the best, average, and worst cases because each level of recursion processes all n elements and there are log n levels. Its split-and-merge process keeps work balanced regardless of input order. SortVision shows this O(n log n) behavior in real time with live operation counts.',
  },
  {
    question: 'What is the difference between merge sort and quick sort?',
    answer:
      'Merge sort is stable, uses O(n) extra space, and guarantees O(n log n) even in the worst case. Quick sort is usually faster in practice due to cache locality, uses O(log n) stack space on average, but can degrade to O(n²) in poor pivot scenarios. SortVision helps compare merge sort and quick sort side-by-side for both performance and stability trade-offs.',
  },
  {
    question: 'How does heap sort work?',
    answer:
      'Heap sort first heapifies the array into a max-heap, then repeatedly swaps the root with the last unsorted element and heapifies again. This guarantees O(n log n) time complexity with O(1) extra space. It is in-place but unstable, and SortVision animates each heapify and extraction step clearly.',
  },
  {
    question: 'What is the space complexity of sorting algorithms?',
    answer:
      'Bubble, insertion, selection, and heap sort are typically O(1) extra space. Quick sort is usually O(log n) due to recursion stack usage, merge sort is O(n), and radix or bucket sort often use O(n + k). SortVision tracks these space complexity differences in real time to make interview explanations concrete.',
  },
  {
    question: 'Is quick sort better than merge sort?',
    answer:
      'It depends on constraints: quick sort is often faster on average due to strong cache behavior, while merge sort is preferred when stability and O(n log n) worst-case guarantees matter. For linked lists and stable ordering, merge sort is commonly better. SortVision comparison mode lets you validate this against your dataset patterns.',
  },
  {
    question: 'What sorting algorithm does JavaScript use?',
    answer:
      'Modern JavaScript engines such as V8 use TimSort, a hybrid of merge sort and insertion sort, for Array.prototype.sort in many practical cases. Sorting became stable by spec in ECMAScript 2019. Understanding merge sort and insertion sort in SortVision makes TimSort internals much easier to reason about.',
  },
  {
    question: 'What is a stable sorting algorithm?',
    answer:
      'A stable sorting algorithm preserves the relative order of elements with equal keys, such as keeping salary order when sorting employees by department. Merge sort, insertion sort, bubble sort, and radix sort are generally stable, while quick sort, heap sort, and selection sort are usually unstable. Stability is critical in multi-key sorting pipelines.',
  },
  {
    question: 'How do I visualize sorting algorithms?',
    answer:
      'Use SortVision to run real-time, step-by-step visualizations for all 8 major sorting algorithms with adjustable speed controls. You can inspect comparisons, swaps, and complexity metrics as the algorithm executes. SortVision is free, no-login, and built specifically for DSA interview preparation.',
  },
  {
    question: 'What is Big O notation in sorting?',
    answer:
      'Big O notation describes the upper-bound growth of runtime or space as input size increases. In sorting, O(n²) algorithms like bubble sort scale much worse than O(n log n) algorithms like merge sort on large arrays. SortVision complexity dashboards make Big O differences observable with live metrics.',
  },
  {
    question: 'Which sorting algorithm uses divide and conquer?',
    answer:
      'Merge sort and quick sort both use divide and conquer. Merge sort recursively splits into balanced halves and merges results, while quick sort partitions around a pivot and recursively sorts partitions. SortVision animates recursion trees for both so you can compare structure and complexity behavior.',
  },
];

export const SEO_FAQ_ENTRIES = [
  ...SEO_GENERAL_FAQ_ENTRIES,
  ...SEO_ALGORITHM_DEEP_DIVE_FAQ_ENTRIES,
];
