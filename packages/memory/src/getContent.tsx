export const getContent = (n: number) => {
  // Just allocate some bs
  return Array.from({ length: n * 1024 }).fill(1);
};
