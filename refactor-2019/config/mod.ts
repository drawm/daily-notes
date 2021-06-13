import { load } from "./default.ts";
import loadArgs from "./args.ts";

// TODO: Change any to a real type (will require changes to deno std/args
export async function loadConfig(): Promise<any> {
  return {
    ...await load(),
    ...await loadArgs(),
  };
}
