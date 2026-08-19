export const logTime = (date: string) => {
  const now = new Date();
  const targetDate = new Date(date);

  const diffInSeconds = Math.floor((now - targetDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}S`;
  }

  const minutes = Math.floor(diffInSeconds / 60);

  if (minutes < 60) {
    return `${minutes}M`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}H`;
  }

  return targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
