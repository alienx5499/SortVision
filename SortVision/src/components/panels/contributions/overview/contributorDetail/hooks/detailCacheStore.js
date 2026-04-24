import { DETAIL_CACHE_STORAGE_KEY, DETAIL_CACHE_TTL_MS } from '../constants';

const inMemoryDetailCache = new Map();

function getStorageCacheMap() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem(DETAIL_CACHE_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function setStorageCacheMap(cacheMap) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(DETAIL_CACHE_STORAGE_KEY, JSON.stringify(cacheMap));
  } catch {
    // ignore storage failures
  }
}

export function readDetailCache(cacheKey) {
  const now = Date.now();
  const memory = inMemoryDetailCache.get(cacheKey);
  if (memory && now - memory.timestamp < DETAIL_CACHE_TTL_MS) {
    return memory;
  }

  const storageMap = getStorageCacheMap();
  const storageValue = storageMap[cacheKey];
  if (storageValue && now - storageValue.timestamp < DETAIL_CACHE_TTL_MS) {
    inMemoryDetailCache.set(cacheKey, storageValue);
    return storageValue;
  }

  return null;
}

export function writeDetailCache(cacheKey, snapshot) {
  inMemoryDetailCache.set(cacheKey, snapshot);
  const storageMap = getStorageCacheMap();
  storageMap[cacheKey] = snapshot;
  setStorageCacheMap(storageMap);
}
