const toTitle = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const resolveSortFunctionName = (
  algorithm: string,
  selectedLanguage: string
): string => {
  switch (selectedLanguage) {
    case 'python':
    case 'ruby':
    case 'r':
      return `${algorithm}_sort`;
    case 'julia':
      return `${algorithm}_sort!`;
    case 'pseudocode':
      return `${algorithm}Sort`;
    default:
      return `${algorithm}Sort`;
  }
};

export const getAlgorithmDoc = (algorithm: string): string => {
  const title = `${toTitle(algorithm)} Sort`;
  return `/**
 * ${title}
 *
 * Description: Implements ${title} using a language-specific reference snippet.
 */
`;
};

export const getTestCase = (
  algorithm: string,
  selectedLanguage: string
): string => {
  const sortFunction = resolveSortFunctionName(algorithm, selectedLanguage);

  switch (selectedLanguage) {
    case 'python':
      return `\n# Test\narr = [5, 2, 9, 1]\n${sortFunction}(arr)\nassert arr == [1, 2, 5, 9]\n`;
    case 'javascript':
    case 'typescript':
      return `\n// Test\nconst arr = [5, 2, 9, 1];\n${sortFunction}(arr);\nconsole.assert(JSON.stringify(arr) === JSON.stringify([1, 2, 5, 9]));\n`;
    case 'java':
      return `\n// Test\nint[] arr = {5, 2, 9, 1};\n${sortFunction}(arr);\n// expected: [1, 2, 5, 9]\n`;
    case 'dart':
      return `\n// Test\nfinal arr = [5, 2, 9, 1];\n${sortFunction}(arr);\n// expected: [1, 2, 5, 9]\n`;
    case 'kotlin':
      return `\n// Test\nval arr = intArrayOf(5, 2, 9, 1)\n${sortFunction}(arr)\n// expected: [1, 2, 5, 9]\n`;
    case 'swift':
      return `\n// Test\nvar arr = [5, 2, 9, 1]\n${sortFunction}(&arr)\n// expected: [1, 2, 5, 9]\n`;
    case 'php':
      return `\n// Test\n$arr = [5, 2, 9, 1];\n${sortFunction}($arr);\n// expected: [1, 2, 5, 9]\n`;
    case 'ruby':
      return `\n# Test\narr = [5, 2, 9, 1]\n${sortFunction}(arr)\nraise 'Test failed' unless arr == [1, 2, 5, 9]\n`;
    case 'scala':
      return `\n// Test\nval arr = Array(5, 2, 9, 1)\n${sortFunction}(arr)\n// expected: [1, 2, 5, 9]\n`;
    case 'c':
      return `\n// Test\nint arr[] = {5, 2, 9, 1};\n${sortFunction}(arr, 4);\n// expected: [1, 2, 5, 9]\n`;
    case 'r':
      return `\n# Test\narr <- c(5, 2, 9, 1)\narr <- ${sortFunction}(arr)\nstopifnot(identical(arr, c(1, 2, 5, 9)))\n`;
    case 'lua':
      return `\n-- Test\nlocal arr = {5, 2, 9, 1}\n${sortFunction}(arr)\n-- expected: 1,2,5,9\n`;
    case 'haskell':
      return `\n-- Test\nlet arr = [5, 2, 9, 1]\nlet sorted = ${sortFunction} arr\n-- expected: [1, 2, 5, 9]\n`;
    case 'julia':
      return `\n# Test\narr = [5, 2, 9, 1]\n${sortFunction}(arr)\n@assert arr == [1, 2, 5, 9]\n`;
    case 'pseudocode':
      return `\n// Test\narray <- [5, 2, 9, 1]\n${sortFunction}(array)\n// expected: [1, 2, 5, 9]\n`;
    default:
      return '\n// Test case placeholder\n';
  }
};
