import loadConfig from "../config/mod.ts";
import { exists, ensureDir } from "https://deno.land/std/fs/mod.ts";

const config = await loadConfig();
const noteFileName = config._[0] ?? "today";
const workspaceLocation = config.workspace;

if (!await exists(workspaceLocation)) {
  throw new Error(
    `Can't find root folder '${workspaceLocation}', did you run note-setup?`,
  );
}

// TODO: Make it work with arguments such as `yesterday`, `next monday`, etc
const noteFolderLocation = `${workspaceLocation}/notes`;
await ensureDir(noteFolderLocation);

const filePath = `${noteFolderLocation}/${noteFileName}.md`;

async function extractSections(sectionFolder: string): Promise<Deno.Buffer> {
  const isSection = /^\.section\..+$/;
  const newLineByteArray = new TextEncoder().encode("\n");
  const acc = new Deno.Buffer();

  for await (const dirEntry of Deno.readDir(sectionFolder)) {
    if (isSection.test(dirEntry.name)) {
      console.log(`* ${dirEntry.name}`);

      const sectionBuffer = await Deno.open(
        `${sectionFolder}/${dirEntry.name}`,
        { read: true, write: true },
      );

      await acc.write(newLineByteArray);
      await Deno.copy(sectionBuffer, acc);
      Deno.close(sectionBuffer.rid);

      await Deno.remove(`${sectionFolder}/${dirEntry.name}`);
    }
  }

  return acc;
}

type NewFileConfig = {
  extraContent: Deno.Buffer;
  pathToTemplate?: string;
};

async function newFile(
  destination: string,
  { extraContent, pathToTemplate = `./test/.template.md` }: NewFileConfig,
): Promise<void> {
  await Deno.copyFile(pathToTemplate, destination);
  const noteBuffer = await Deno.open(destination, { read: true, write: true });
  await Deno.copy(noteBuffer, noteBuffer);

  console.log("Applying sections to ${filePath}:");
  if (extraContent) {
    await Deno.copy(extraContent, noteBuffer);
  }

  Deno.close(noteBuffer.rid);
}

