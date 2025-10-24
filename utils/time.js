const A_MINUTE = 60000;
const A_HOUR = A_MINUTE * 60;
const A_DAY = A_HOUR * 24;
const A_WEEK = A_DAY * 7;

export const formatTimeAgo = (timestamp, variant = 'short') => {
  if (!timestamp) return 'never';
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < A_MINUTE) return 'just now';

  if (diff < A_HOUR) {
    const mins = Math.floor(diff / A_MINUTE);
    return `${mins} min${mins === 1 ? '' : 's'} ago`;
  }

  if (diff < A_DAY) {
    const hours = Math.floor(diff / A_HOUR);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  if (diff < A_WEEK) {
    const days = Math.floor(diff / A_DAY);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  if (variant === 'short') {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
  }

  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: variant,
    day: 'numeric',
  });
};
