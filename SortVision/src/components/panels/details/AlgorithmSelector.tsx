'use client';

import { useLanguage } from '@/context/language';
import { DETAILS_ALGORITHM_CATEGORIES } from './detailsAlgorithmCategories';
import { DetailsAlgorithmCategoryColumn } from './DetailsAlgorithmCategoryColumn';
import type { DetailsAlgorithmSelectorProps } from '../DetailsPanel/detailsPanelContracts';

export type AlgorithmSelectorProps = DetailsAlgorithmSelectorProps;

export default function AlgorithmSelector({
  algorithm,
  setAlgorithm,
}: AlgorithmSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="mb-8 relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative grid grid-cols-3 gap-4">
        {DETAILS_ALGORITHM_CATEGORIES.map(category => (
          <DetailsAlgorithmCategoryColumn
            key={category.group}
            category={category}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
