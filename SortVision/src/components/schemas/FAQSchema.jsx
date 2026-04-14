import React from 'react';

const FAQSchema = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the 5 sorting algorithms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 5 most important sorting algorithms to learn are: Bubble Sort (O(n²)), Insertion Sort (O(n²)), Selection Sort (O(n²)), Merge Sort (O(n log n)), and Quick Sort (O(n log n) average). SortVision visualizes all 8 major sorting algorithms including Heap Sort, Radix Sort, and Bucket Sort.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are sorting algorithms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sorting algorithms are methods to arrange data in a specific order (ascending or descending). They're fundamental in computer science and essential for coding interviews. SortVision provides interactive visualizations to help you understand how each algorithm works step-by-step.",
        },
      },
      {
        '@type': 'Question',
        name: 'How many types of sorting algorithms are there?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There are many types of sorting algorithms, but the main categories include: comparison-based sorts (Bubble, Insertion, Selection, Merge, Quick, Heap), non-comparison sorts (Radix, Bucket, Counting), stable vs unstable sorts, and in-place vs out-of-place sorts. SortVision covers 8 major algorithms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which sorting algorithm is easy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Bubble Sort is considered the easiest to understand and implement, making it perfect for beginners. It uses simple comparison and swapping logic. SortVision's interactive visualizer helps you see exactly how it works before moving to more complex algorithms.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best sorting algorithm to learn first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For beginners, we recommend starting with Bubble Sort to understand basic comparison and swapping concepts, then progressing to Insertion Sort and Selection Sort before tackling more advanced algorithms like Merge Sort and Quick Sort.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prepare for sorting algorithm interview questions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Practice implementing each algorithm from scratch, understand their time and space complexities, know when to use each algorithm, and be able to modify them for specific requirements. Our visualizer helps you understand the mechanics before coding.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which sorting algorithm is most efficient?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on your data and constraints. Merge Sort and Heap Sort guarantee O(n log n) worst-case performance, Quick Sort averages O(n log n) but can degrade to O(n²), while Radix Sort can be O(nk) for integer data.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are sorting algorithms used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sorting algorithms are used in databases (indexing), search engines (ranking), operating systems (process scheduling), data analysis, machine learning, and countless other applications. Understanding them is crucial for software development and technical interviews.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are sorting algorithms important?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sorting algorithms are fundamental to computer science and essential for efficient data processing. They're frequently asked in coding interviews and are the foundation for understanding more complex algorithms and data structures.",
        },
      },
      {
        '@type': 'Question',
        name: 'What are the four basic sorting algorithms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The four basic sorting algorithms every programmer should know are: Bubble Sort (O(n²)), Insertion Sort (O(n²)), Selection Sort (O(n²)), and Merge Sort (O(n log n)). These form the foundation for understanding more advanced sorting techniques and are commonly asked in coding interviews.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I learn sorting algorithms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Absolutely! Sorting algorithms are essential for any programmer. They're fundamental to computer science, frequently asked in coding interviews at top tech companies, and form the basis for understanding more complex algorithms and data structures. SortVision makes learning them interactive and engaging.",
        },
      },
      {
        '@type': 'Question',
        name: 'Which sorting algorithm is fastest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The fastest sorting algorithm depends on your data and constraints. For general-purpose sorting, Quick Sort often performs best in practice (O(n log n) average), while Merge Sort guarantees O(n log n) worst-case performance. For specific data types, Radix Sort can achieve O(nk) linear time for integers.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is algorithm visualization?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Algorithm visualization is the graphical representation of how algorithms work step-by-step. It helps students and developers understand complex algorithmic concepts through interactive animations, making abstract algorithms concrete and easier to learn. SortVision provides the most comprehensive algorithm visualization tools available online.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is algorithm visualization primarily focused on conveying?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Algorithm visualization is primarily focused on conveying the step-by-step execution of algorithms, showing how data structures change, how comparisons and swaps occur, and how the algorithm progresses toward its final result. It makes abstract algorithmic concepts visual and interactive for better understanding and learning.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is algorithm visualization in DAA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Algorithm visualization in DAA (Design and Analysis of Algorithms) refers to the visual representation of algorithmic processes used in computer science education. It helps students understand algorithm complexity, efficiency, and implementation details through interactive demonstrations and step-by-step animations.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are data structures and algorithms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Data structures and algorithms (DSA) are fundamental concepts in computer science. Data structures are ways of organizing and storing data, while algorithms are step-by-step procedures for solving problems. Together, they form the foundation of efficient programming and are essential for coding interviews and software development.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to learn data structures and algorithms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with basic concepts like arrays, linked lists, and simple sorting algorithms. Practice implementing algorithms from scratch, understand time and space complexity, and solve coding problems regularly. Use interactive visualizers like SortVision to see algorithms in action, which makes learning much more effective than reading alone.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is computer science education?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Computer science education encompasses the teaching and learning of computational thinking, programming, algorithms, data structures, and computer systems. It prepares students for careers in technology and develops problem-solving skills essential in the digital age.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are data structures and algorithms important?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Data structures and algorithms are crucial because they enable efficient problem-solving, optimize program performance, and are fundamental to software development. They're essential for coding interviews at top tech companies and form the backbone of computer science education.",
        },
      },
      {
        '@type': 'Question',
        name: 'Which coding platform is best for interview preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Popular platforms include LeetCode, HackerRank, and CodeSignal for practice problems. However, for understanding algorithm concepts, interactive visualizers like SortVision are invaluable. They help you see how algorithms work step-by-step, making it easier to implement them during interviews.',
        },
      },
    ],
  };

  return (
    <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
  );
};

export default FAQSchema;
