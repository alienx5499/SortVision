import { useEffect, useState } from 'react';
import { getFileExtension } from './languageMappings';
import { getPlaceholderContent } from './placeholders';

const useAlgorithmCode = ({ algorithm, selectedLanguage }) => {
  const [codeContent, setCodeContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [retryToken, setRetryToken] = useState(0);

  const retryLoadCode = () => {
    setRetryToken(prev => prev + 1);
  };

  useEffect(() => {
    const loadCode = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const response = await fetch(
          `/code/${algorithm}/${selectedLanguage}/${algorithm}Sort.${getFileExtension(
            selectedLanguage
          )}`
        );
        if (!response.ok) {
          const message =
            response.status === 404
              ? `Code not found for ${selectedLanguage}.`
              : `Failed to load code (${response.status}).`;
          setLoadError(message);
          setCodeContent(getPlaceholderContent());
        } else {
          const content = await response.text();
          const trimmed = content.trim();
          if (!trimmed) {
            setLoadError(`Empty code file for ${selectedLanguage}.`);
            setCodeContent(getPlaceholderContent());
          } else {
            setCodeContent(trimmed);
          }
        }
      } catch (error) {
        console.error('Error loading code:', error);
        setLoadError('Unable to fetch code. Please retry.');
        setCodeContent(getPlaceholderContent());
      }
      setIsLoading(false);
    };

    loadCode();
  }, [algorithm, selectedLanguage, retryToken]);

  return { codeContent, isLoading, loadError, retryLoadCode };
};

export default useAlgorithmCode;
