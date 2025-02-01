export const createRoute = (...segments: string[]): string => {
  return "/" + segments.map((segment) => segment.trim()).join("/");
};
