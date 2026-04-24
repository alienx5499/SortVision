import { useState, useEffect, useRef } from 'react';
import {
  detectUserLocation,
  getSimplifiedRegion,
} from '../utils/locationService';

/**
 * Runs one-shot geo probe when the modal opens and `locationData` is still null.
 */
export function useFeedbackModalLocation(
  isOpen,
  shouldLog,
  onApplyDetectedRegion
) {
  const [detectedRegion, setDetectedRegion] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const applyRef = useRef(onApplyDetectedRegion);

  useEffect(() => {
    applyRef.current = onApplyDetectedRegion;
  }, [onApplyDetectedRegion]);

  useEffect(() => {
    if (!isOpen || locationData) return;

    let cancelled = false;

    (async () => {
      setIsDetectingLocation(true);
      try {
        if (shouldLog) {
          console.log('[SortVision] feedback: starting location detection');
        }
        const location = await detectUserLocation();

        const enhancedLocationData = {
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
          country: 'Detection failed',
          region: 'Unknown',
          city: 'Unknown',
          timezone: 'Unknown',
          detectionMethod: 'Failed',
          accuracy: 'none',
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
