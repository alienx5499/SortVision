import { useEffect, useState } from 'react';
import { getFileExtension, getPlaceholderContent } from './helpers';

const useAlgorithmCode = ({ algorithm, selectedLanguage }) => {
  const [codeContent, setCodeContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCode = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/code/${algorithm}/${selectedLanguage}/${algorithm}Sort.${getFileExtension(
            selectedLanguage
          )}`
        );
        if (!response.ok) {
          console.error(
            `Failed to load code: ${response.status} ${response.statusText}`
          );
          setCodeContent(getPlaceholderContent());
        } else {
          const content = await response.text();
          setCodeContent(content.trim() || getPlaceholderContent());
        }
      } catch (error) {
        console.error('Error loading code:', error);
        setCodeContent(getPlaceholderContent());
      }
      setIsLoading(false);
    };

    loadCode();
  }, [algorithm, selectedLanguage]);

  return { codeContent, isLoading };
};

export default useAlgorithmCode;
