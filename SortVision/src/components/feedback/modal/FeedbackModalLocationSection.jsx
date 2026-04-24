import React from 'react';
import { MapPin, Wifi } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  formatLocationString,
  getLocationAccuracy,
} from '../utils/locationService';

export function FeedbackModalLocationSection({
  region,
  onRegionChange,
  detectedRegion,
  onManualOverride,
  locationData,
  isDetectingLocation,
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium font-mono text-purple-400 flex items-center gap-2">
          <span className="text-amber-400">$</span> Location & Region
          {isDetectingLocation && (
            <span className="text-xs text-amber-400 bg-amber-900/20 px-2 py-1 rounded border border-amber-500/30 flex items-center gap-1">
              <Wifi className="h-3 w-3 animate-pulse" />
              Detecting...
            </span>
          )}
        </div>

        {!isDetectingLocation && detectedRegion && (
          <button
            type="button"
            onClick={onManualOverride}
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 font-mono underline"
          >
            Manual override
          </button>
        )}
      </div>

      {locationData && !isDetectingLocation && detectedRegion && (
        <div
          id="location-info"
          className="bg-slate-800/50 border border-emerald-500/30 rounded-md p-3 space-y-2 cursor-default"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-mono text-emerald-400">
                Auto-detected Location
              </span>
            </div>
            {getLocationAccuracy(locationData) && (
              <span
                className={`text-xs font-mono ${
                  getLocationAccuracy(locationData).color
                }`}
              >
                {getLocationAccuracy(locationData).text}
              </span>
            )}
          </div>

          <div className="text-base font-mono text-white bg-slate-700/50 rounded px-3 py-2 border border-slate-600">
            {formatLocationString(locationData)}
          </div>

          <details className="text-xs font-mono text-slate-400">
            <summary className="cursor-pointer hover:text-slate-300 transition-colors">
              <span className="text-amber-400">//</span> Technical details
            </summary>
            <div className="mt-2 pl-4 space-y-1 border-l border-slate-600">
              <div>Method: {locationData.detectionMethod}</div>
              {locationData.timezone && (
                <div>Timezone: {locationData.timezone}</div>
              )}
              {locationData.detectionDetails?.browser && (
                <div>Browser: {locationData.detectionDetails.browser}</div>
              )}
              {locationData.detectionDetails?.os && (
                <div>OS: {locationData.detectionDetails.os}</div>
              )}
            </div>
          </details>
        </div>
      )}

      {(!detectedRegion || !locationData) && (
        <div className="space-y-2">
          <label
            htmlFor="region-select"
            className="text-sm font-medium font-mono text-purple-400 flex items-center gap-2"
          >
            <span className="text-amber-400">$</span> Select your region
            manually
          </label>
          <Select value={region} onValueChange={onRegionChange} name="region">
            <SelectTrigger
              id="region-select"
              name="region"
              className="bg-slate-800 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20 font-mono"
            >
              <SelectValue placeholder="Select your region..." />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem
                value="Americas"
                className="text-white hover:bg-slate-700 font-mono"
              >
                Americas (North & South America)
              </SelectItem>
              <SelectItem
                value="Europe"
                className="text-white hover:bg-slate-700 font-mono"
              >
                Europe
              </SelectItem>
              <SelectItem
                value="Asia Pacific"
                className="text-white hover:bg-slate-700 font-mono"
              >
                Asia Pacific
              </SelectItem>
              <SelectItem
                value="Africa"
                className="text-white hover:bg-slate-700 font-mono"
              >
                Africa
              </SelectItem>
              <SelectItem
                value="Australia/Oceania"
                className="text-white hover:bg-slate-700 font-mono"
              >
                Australia/Oceania
              </SelectItem>
              <SelectItem
                value="Middle East"
                className="text-white hover:bg-slate-700 font-mono"
              >
                Middle East
              </SelectItem>
              <SelectItem
                value="Other"
                className="text-white hover:bg-slate-700 font-mono"
              >
                Other / Not listed
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs font-mono text-slate-500">
            <span className="text-amber-400">//</span> This helps us identify
            region-specific issues and improve performance globally
          </p>
        </div>
      )}
    </div>
  );
}
