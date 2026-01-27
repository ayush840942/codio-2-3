
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LevelMapFiltersProps {
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  topics: string[];
  filteredLevelsCount: number;
}

const LevelMapFilters = ({ 
  selectedTopic, 
  setSelectedTopic, 
  topics,
  filteredLevelsCount 
}: LevelMapFiltersProps) => {
  return (
    <>
      <div className="w-full sm:w-48">
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map(topic => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Showing {filteredLevelsCount} levels {selectedTopic !== "All" ? `in ${selectedTopic}` : 'across all topics'}
      </p>
    </>
  );
};

export default LevelMapFilters;
