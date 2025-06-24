import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import MemoryTracker from './MemoryTracker';
import CacheAnalyzer from './CacheAnalyzer';
import BranchPredictor from './BranchPredictor';

export default function AnalysisPanel() {
  return (
    <div className="analysis-panel">
      <Tabs defaultValue="memory">
        <TabsList>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="cache">Cache</TabsTrigger>
          <TabsTrigger value="branch">Branch</TabsTrigger>
        </TabsList>
        <TabsContent value="memory"><MemoryTracker /></TabsContent>
        <TabsContent value="cache"><CacheAnalyzer /></TabsContent>
        <TabsContent value="branch"><BranchPredictor /></TabsContent>
      </Tabs>
    </div>
  );
}