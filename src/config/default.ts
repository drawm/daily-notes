import { ensureFile } from "https://deno.land/std/fs/ensure_file.ts";
import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";
import { writeFileStr } from "https://deno.land/std/fs/write_file_str.ts";
import { readJson } from "https://deno.land/std/fs/read_json.ts";
import { writeJson } from "https://deno.land/std/fs/write_json.ts";

const HOME_FOLDER = Deno.env.get("HOME");
const DEFAULT_PATH_TO_CONFIG = HOME_FOLDER + `/.config/daily-notes/config`;

// Default aliases short form are in caps to mitigate conflicts and indicate they are shared thoughout the project
const defaultConfig = {
  "workspace": HOME_FOLDER + "/daily-notes/",
};

export type AppConfig = {
  workspace: string;
};

export async function load(): Promise<AppConfig> {
  let stat;
  try {
    stat = await Deno.lstat(DEFAULT_PATH_TO_CONFIG);
  } catch (error) {
    throw new Error(
      `Was not able to stat ${DEFAULT_PATH_TO_CONFIG}, the file might not exist or you might not have read access`,
    );
  }
  if (!stat.isFile) {
    throw new Error(
      `config file @ ${DEFAULT_PATH_TO_CONFIG} is not a file, run 'note-setup' to override it.`,
    );
  }

  const rawConfig = await readFileStr(DEFAULT_PATH_TO_CONFIG);
  if (rawConfig === "") {
    throw new Error(
      `config file @ ${DEFAULT_PATH_TO_CONFIG} is empty, run 'note-setup' to override it`,
    );
  }

  try {
    return {
      ...defaultConfig,
      ...JSON.parse(rawConfig),
    };
  } catch (error) {
    console.error(
      `There was an error when parsing ${DEFAULT_PATH_TO_CONFIG} to JSON`,
    );
    throw error;
  }

  return { ...defaultConfig };
}

async function ensureFileWithDefault(
  path: string,
  content: string,
): Promise<void> {
  await ensureFile(path);

  const rawConfig = await readFileStr(path);
  if (rawConfig === "") {
    return writeFileStr(path, content);
  }
}

type SaveOptions = {
  append: boolean;
  create: boolean;
};
export async function save(
  newConfig: Partial<AppConfig>,
  options: SaveOptions = { append: true, create: false },
): Promise<void> {
  if (options.create) {
    console.log("making sure", DEFAULT_PATH_TO_CONFIG, "exist");
    await ensureFileWithDefault(DEFAULT_PATH_TO_CONFIG, "{}");
  }

  const originalConfig = options.append ? await load() : {};

  return writeJson(
    DEFAULT_PATH_TO_CONFIG,
    { ...originalConfig, ...newConfig },
  );
}
