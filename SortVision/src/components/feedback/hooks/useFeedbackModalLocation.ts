import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { FeedbackLocationData } from '@/lib/feedback/types';
import {
  detectUserLocation,
  getSimplifiedRegion,
} from '@/lib/feedback/utils/locationService';

/**
 * Runs one-shot geo probe when the modal opens and `locationData` is still null.
 */
export function useFeedbackModalLocation(
  isOpen: boolean,
  shouldLog: boolean,
  onApplyDetectedRegion: (region: string) => void
): {
  detectedRegion: string;
  setDetectedRegion: Dispatch<SetStateAction<string>>;
  locationData: FeedbackLocationData | null;
  setLocationData: Dispatch<SetStateAction<FeedbackLocationData | null>>;
  isDetectingLocation: boolean;
} {
  const [detectedRegion, setDetectedRegion] = useState('');
  const [locationData, setLocationData] = useState<FeedbackLocationData | null>(
    null
  );
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const applyRef = useRef(onApplyDetectedRegion);

  useEffect(() => {
    applyRef.current = onApplyDetectedRegion;
  }, [onApplyDetectedRegion]);

  useEffect(() => {
    if (!isOpen || locationData) return;

    let cancelled = false;

    void (async () => {
      setIsDetectingLocation(true);
      try {
        if (shouldLog) {
          console.log('[SortVision] feedback: starting location detection');
        }
        const location = await detectUserLocation();

        const enhancedLocationData: FeedbackLocationData = {
          ...location,
          country:
            location.countryFromLocale && location.country === 'Unknown'
              ? location.countryFromLocale
              : location.country,
          detectionDetails: {
            browser: location.browser,
            os: location.os,
            locale: location.locale,
            platform: location.platform,
            connectionType: location.connectionType,
            screenResolution: location.screenResolution,
          },
        };

        if (shouldLog) {
          console.log(
            '[SortVision] feedback: location detected',
            enhancedLocationData
          );
        }

        if (cancelled) return;

        setLocationData(enhancedLocationData);
        const simplifiedRegion = getSimplifiedRegion(enhancedLocationData);
        setDetectedRegion(simplifiedRegion);
        applyRef.current(simplifiedRegion);
      } catch (error) {
        console.error(
          '[SortVision] feedback: location detection failed',
          error
        );
        if (cancelled) return;
        setDetectedRegion('Unknown');
        setLocationData({
          ip: 'Unknown',
          country: 'Detection failed',
          countryCode: 'Unknown',
          region: 'Unknown',
          regionCode: 'Unknown',
          city: 'Unknown',
          latitude: null,
          longitude: null,
          timezone: 'Unknown',
          isp: 'Unknown',
          org: 'Unknown',
          asn: 'Unknown',
          detectionMethod: 'Failed',
          accuracy: 'none',
          detectedAt: new Date().toISOString(),
        });
      } finally {
        if (!cancelled) setIsDetectingLocation(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, locationData, shouldLog]);

  return {
    detectedRegion,
    setDetectedRegion,
    locationData,
    setLocationData,
    isDetectingLocation,
  };
}
