export function getPRStatus(pr) {
  if (pr.state === 'open') {
    return {
      status: 'OPEN',
      color: 'green',
      icon: 'text-green-400',
      bg: 'bg-green-500/20 text-green-400',
    };
  }

  if (pr.merged === true || pr.merged_at) {
    return {
      status: 'MERGED',
      color: 'purple',
      icon: 'text-purple-400',
      bg: 'bg-purple-500/20 text-purple-400',
    };
  }

  if (pr.state === 'closed') {
    return {
      status: 'CLOSED',
      color: 'red',
      icon: 'text-red-400',
      bg: 'bg-red-500/20 text-red-400',
    };
  }

  return {
    status: pr.state.toUpperCase(),
    color: 'gray',
    icon: 'text-gray-400',
    bg: 'bg-gray-500/20 text-gray-400',
  };
}
