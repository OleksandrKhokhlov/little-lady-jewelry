export const getInitialLimit = () => {
  if (window.innerWidth < 768) return 12;
  if (window.innerWidth < 1024) return 20;
  return 24;
};
