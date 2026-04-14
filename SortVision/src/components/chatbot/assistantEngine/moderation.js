import { Filter } from 'bad-words';

const ABUSE_THRESHOLD = 3;
const filter = new Filter();

const isAbusiveQuery = query => {
  if (!query || typeof query !== 'string') return false;
  return filter.isProfane(query);
};

export { ABUSE_THRESHOLD, isAbusiveQuery };
