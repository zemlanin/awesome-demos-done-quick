module.exports = function JXArray(c) {
  const r = [];
  for (let i = 0; i < c.length && i < 100; i++) {
    r.push(c[i]);
  }
  return r;
};
