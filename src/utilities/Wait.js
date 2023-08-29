export const Waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 3000));
