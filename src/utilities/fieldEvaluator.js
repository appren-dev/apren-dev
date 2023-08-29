export const FIELDEVALUATOR = (vals) => {
  const entities = Object.keys(vals);
  let error = {};

  for (const i of entities) {
    if (vals[i].length === 0) {
      error = { ...error, [i]: "error" };
    }
  }
  return error;
};
