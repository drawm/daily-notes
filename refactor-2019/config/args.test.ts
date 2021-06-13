import loadArgs from './args.ts';
import { assertArrayIncludes } from "asserts";

Deno.test("should use default value", async () => {
  assertArrayIncludes(
    Object.keys(await loadArgs([])),
    ['config'],
  );
});

Deno.test("should alias W to workspace", async () => {
  assertArrayIncludes(
    Object.keys(await loadArgs(['-W'])),
    ['W', 'workspace'],
  );
});
