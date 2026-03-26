export const getInitialLimit = () => {
  if (typeof window === "undefined") return 12; // Default limit for server-side rendering
  if (window.innerWidth < 768) return 12;
  if (window.innerWidth < 1024) return 20;
  return 24;
};
