import React from 'react';
import { Button } from "@/components/ui/button";
import { Beaker, StopCircle, BarChart2 } from 'lucide-react';

const TestControls = ({
  isSorting,
  currentTestingAlgo,
  testAllAlgorithms,
  stopSorting
}) => {
  return (
    <div className="flex justify-between items-center mb-4 relative z-10">
      <div className="font-mono text-sm text-slate-400 flex items-center group cursor-pointer hover:text-purple-400 transition-colors">
        <BarChart2 className="mr-2 h-4 w-4 text-purple-400 group-hover:animate-spin" />
        // algorithm comparison
      </div>
      <div className="flex space-x-2">
        <Button
          variant="secondary"
          onClick={testAllAlgorithms}
          disabled={isSorting && !currentTestingAlgo}
          style={{
            backgroundColor: '#9333ea',
            borderColor: '#a855f7',
            color: 'white'
          }}
          className={`
            font-mono text-sm flex items-center hover:!bg-purple-500
            shadow-md hover:shadow-lg transition-all duration-300
            ${isSorting && !currentTestingAlgo ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[-1px]'}
          `}
        >
          <Beaker className="mr-2 h-4 w-4" />
          test_all()
        </Button>

        <Button
          variant="destructive"
          onClick={stopSorting}
          disabled={!currentTestingAlgo}
          className={`
            font-mono text-sm flex items-center
            border border-red-700 shadow-md hover:shadow-lg transition-all duration-300
            ${!currentTestingAlgo ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[-1px] hover:bg-red-700'}
          `}
        >
          <StopCircle className="mr-2 h-4 w-4" />
          stop_test()
        </Button>
      </div>
    </div>
  );
};

export default TestControls;
