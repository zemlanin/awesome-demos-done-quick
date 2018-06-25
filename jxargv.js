const ARGV_HELP = /^(--help|-h)$/;
const ARGV_EQ = /^--([a-z_\-]+)=(.+)$/;
const ARGV_KEY = /^--([a-z_\-]+)$/;

module.exports = function parseArgv(argv) {
  const result = {};
  let currentKey = "";

  for (const arg of argv) {
    if (ARGV_HELP.test(arg)) {
      return { help: true };
    }

    if (ARGV_EQ.test(arg)) {
      const [_, key, value] = arg.match(ARGV_EQ);

      result[key] = value;

      currentKey = "";
      continue;
    }

    if (ARGV_KEY.test(arg)) {
      const [_, key] = arg.match(ARGV_KEY);
      currentKey = key;
      continue;
    }

    if (currentKey) {
      result[currentKey] = arg;
      currentKey = "";
      continue;
    } else {
      result[""] = result[""] ? result[""].concat(arg) : [arg];
    }
  }

  return result;
};
