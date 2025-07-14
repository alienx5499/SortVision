// src/utils/regressionTester.js
export class RegressionTester {
  constructor(algorithms) {
    this.algorithms = algorithms;
    this.testCases = [];
    this.results = [];
  }
  
  addTestCase(name, generatorFn) {
    this.testCases.push({ name, generatorFn });
  }
  
  async runTests(iterations = 10) {
    this.results = [];
    
    for (const testCase of this.testCases) {
      const data = testCase.generatorFn();
      const caseResults = [];
      
      for (const algoName in this.algorithms) {
        const algo = this.algorithms[algoName];
        const times = [];
        
        for (let i = 0; i < iterations; i++) {
          const arrCopy = [...data];
          const start = performance.now();
          algo(arrCopy);
          times.push(performance.now() - start);
        }
        
        caseResults.push({
          algorithm: algoName,
          avgTime: times.reduce((a,b) => a + b, 0) / times.length,
          minTime: Math.min(...times),
          maxTime: Math.max(...times)
        });
      }
      
      this.results.push({
        testCase: testCase.name,
        results: caseResults
      });
    }
    
    return this.results;
  }
  
  exportResults(format = 'json') {
    if (format === 'json') return JSON.stringify(this.results, null, 2);
    // Add other formats (CSV, etc.) as needed
  }
}