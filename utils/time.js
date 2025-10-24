export const formatTime = (timestamp) => {
  if (!timestamp) return 'never';

  const now = new Date();
  const date = new Date(timestamp);
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  }

  if (diffInMonths > 0) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }

  if (diffInDays === 0) {
    return 'today';
  }

  return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
};
