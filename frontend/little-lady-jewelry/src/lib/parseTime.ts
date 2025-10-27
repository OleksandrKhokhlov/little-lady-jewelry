export const parseTime = (durationStr: string): number => {
  const match = durationStr.match(/^(\d+)([hms])$/);
  if (!match) return 0;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  if (unit === "h") {
    return value * 60 * 60;
  }
  return 0;
};
