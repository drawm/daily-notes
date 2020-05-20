import loadArgs from './args.ts';
import { assertEquals,assertArrayContains } from "https://deno.land/std/testing/asserts.ts";

Deno.test("should use default value", async () => {
  assertArrayContains(
    Object.keys(await loadArgs([])),
    ['config'],
  );
});

Deno.test("should alias W to workspace", async () => {
  assertArrayContains(
    Object.keys(await loadArgs(['-W'])),
    ['W', 'workspace'],
  );
});
