export const formatTime = (time: string) => {
  const seconds = parseInt(time.replace('s', ''));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ${minutes} min${minutes === 1 ? '' : 's'}`;
  }
  return `${minutes} min${minutes === 1 ? '' : 's'}`;
};
