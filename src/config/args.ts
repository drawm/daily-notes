import { parse, Args, ArgParsingOptions } from "https://deno.land/std/flags/mod.ts";

// Default aliases short form are in caps to mitigate conflicts and indicate they are shared thoughout the project
const appAlias = {
  W: "workspace",
};

const defaultConfig = {
  config: Deno.env.get('HOME')+"/.config/daily-notes/config",
};

export default async (args = Deno.args, config: ArgParsingOptions = {}): Promise<Args> => {
  // Parse should use a generic to enable typing here
  const options = parse(args, {
    ...config,
    alias: { ...appAlias, ...(config.alias ?? {}) },
    default: { ...(config.default ?? {}) },
  });

  return { ...defaultConfig, ...options };
};
