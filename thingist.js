#!/usr/bin/env osascript -l JavaScript

const help = `
Export Things 3 area/project into Markdown format and upload it to GitHub Gist
  
  ./thingist.js --area <area-name>
  ./thingist.js --project <project-name>
  ./thingist.js --project <project-name> --token <github-token> --gist <gist-id>

Options:
  --area      Area name to export
  --project   Project name to export
  --token     GitHub Token with \`gist\` scope. Can be created on
              https://github.com/settings/tokens/new
  --gist      Target Gist's identifier. Exported area/project will be saved
              as \`<name>-thingist.md\`
`;

const ARGV_HELP = /^(--help|-h)$/;
const ARGV_EQ = /^--([a-z_-]+)=(.+)$/;
const ARGV_KEY = /^--([a-z_-]+)$/;

function parseArgv(argv) {
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
}

const pad0 = v => (v > 9 ? "" : "0") + v;

function formatTodo(todo) {
  const name = todo.name();
  const notes = todo.notes();
  const cDate = todo.completionDate();

  let cDateString = "";
  if (cDate) {
    const year = cDate.getUTCFullYear();
    const month = cDate.getUTCMonth() + 1;
    const day = cDate.getUTCDate();

    cDateString = `${year}-${pad0(month)}-${pad0(day)}`;
  }

  const checkbox = cDateString ? `[x] \`${cDateString}\`` : "[ ]";

  return (
    `- ${checkbox} ${name}` +
    (notes ? `\n\n\t${notes.replace(/\n/g, "  \n\t")}` : "")
  );
}

function projectDump(T, project) {
  const current = project.toDos();

  const completed = T.toDos()
    .filter(todo => todo.project() && todo.project().id() == project.id())
    .filter(todo => todo.completionDate());

  completed.sort((a, b) => a.completionDate() < b.completionDate());

  const completedDump = completed.length
    ? `<details><summary>Logbook (${
        completed.length
      })</summary><p>\n\n${completed
        .map(formatTodo)
        .join("\n\n")}</p></details>`
    : "";

  return `# ${project.name()}
${project.notes() ? "\n" + project.notes() + "\n" : ""}
${current.map(formatTodo).join("\n\n")}

${completedDump}`;
}

function areaItemType(item) {
  try {
    item.toDos();
    return "project";
  } catch (e) {
    return "todo";
  }
}

function areaDump(T, area) {
  const items = area.toDos();
  items.sort((a, b) => {
    const a_ = areaItemType(a);
    const b_ = areaItemType(b);

    if (a_ === b_) {
      return 0;
    }
    if (a_ === "project") {
      return 1;
    }
    return -1;
  });

  const dump = items
    .map(item => {
      if (areaItemType(item) === "project") {
        return projectDump(T, item).replace(/^(#+) /gm, "$1# ");
      } else {
        return formatTodo(item);
      }
    })
    .join("\n\n");

  return `# ${area.name()}

${dump}`;
}

function run(argv) {
  const options = parseArgv(argv);

  if (options.help) {
    return help;
  }

  if (!options.project && !options.area) {
    return "either --project or --area is required";
  }

  if ((options.gist && !options.token) || (!options.gist && options.token)) {
    return "both --gist and --token are required to update thingist";
  }

  const T = Application("Things");

  if (!T.running()) {
    return "start Things";
  }

  let dump, filename;

  if (options.project) {
    const project = T.projects[options.project];
    dump = projectDump(T, project);
    filename = project.name() + "-thingist.md";
  } else if (options.area) {
    const area = T.areas[options.area];
    dump = areaDump(T, area);
    filename = area.name() + "-thingist.md";
  }

  if (options.gist && options.token) {
    const result = JSON.stringify({
      files: { [filename]: { content: dump } }
    });

    const app = Application.currentApplication();
    app.includeStandardAdditions = true;

    app.doShellScript(
      `curl -H "Authorization: token ${options.token}" ` +
        `-XPATCH https://api.github.com/gists/${options.gist} ` +
        "-d " +
        JSON.stringify(result).replace(/`/g, "\\`")
    );

    return `https://api.github.com/gists/${options.gist}`;
  } else {
    return dump;
  }
}
