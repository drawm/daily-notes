import { exists } from "https://deno.land/std/fs/exists.ts";
import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";
import { readJson } from "https://deno.land/std/fs/read_json.ts";
import { ensureFile } from "https://deno.land/std/fs/ensure_file.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import { assertEquals, assert, assertThrowsAsync } from "https://deno.land/std/testing/asserts.ts";
import setup from './setup.ts';


Deno.test('should throw if path is falsy', async ()=>{
  await assertThrowsAsync(()=>setup('', {quiet:true}));
});

Deno.test('should throw if path is not absolute', async ()=>{
  await assertThrowsAsync(()=>setup('./relative/path', {quiet:true}));
});

Deno.test('should throw if the folder does not exist', async ()=>{
  const fileName = `/tmp/test/${(new Date()).getTime()}`;
  await ensureFile(fileName)
  await assertThrowsAsync(()=>setup(fileName, {quiet:true}));
});

Deno.test('should create base template file', async ()=>{
  const dirName = `/tmp/test/${(new Date()).getTime()}`;
  await ensureDir(dirName)
  await setup(dirName, {quiet:true});

  assert(await exists(`${dirName}/.template.md`), "Base template was not added to note directory");
  assert(await readFileStr(`${dirName}/.template.md`), "New base template should not be empty");

});

Deno.test('should create base config file', async ()=>{
  const dirName = `/tmp/test/${(new Date()).getTime()}`;
  await ensureDir(dirName)
  await setup(dirName, {quiet:true});

  const homeDirectory = Deno.env.get('HOME');
  const configDirectory = `${homeDirectory}/.config/daily-notes`;
  const fileName = `${configDirectory}/config`;
  assert(await exists(configDirectory), `Config directory was not found at '${configDirectory}'`);
  assert(await exists(`${homeDirectory}/.config/daily-notes/config`), `Base config was not found at ${fileName}`);
  assert(await exists(fileName), `Base config was not found at ${fileName}`);

  const rawConfig = await readFileStr(fileName); 
  assert(rawConfig , `New base config should not be empty (${fileName} = '${rawConfig}')`);
});

