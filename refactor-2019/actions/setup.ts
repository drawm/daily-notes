import { ensureFile } from "https://deno.land/std/fs/ensure_file.ts";
import { loadConfig } from "../config/mod.ts";
import { save } from "../config/default.ts";

export type SetupOptions = {
  quiet:boolean,
};
export default async function setup(
  noteFolder: string, 
  options:SetupOptions = {quiet:false},
): Promise<void> {
  if (!noteFolder) {
    throw new Error(
      "Please provide a path to your note folder\n" +
        "ex: ./note-setup /my-daily-notes my-server.com/daily-notes.git",
    );
  }

  if(!options.quiet){
    console.log(
      '\n ___________________________________________________________ \n'+
      '/     ____        _ __            _   __      __            \\\n'+
      '|    / __ \\____ _(_) /_  __      / | / /___  / /____  _____ |\n'+
      '|   / / / / __ \`/ / / / / /_____/  |/ / __ \\/ __/ _ \\/ ___/ |\n'+
      '|  / /_/ / /_/ / / / /_/ /_____/ /|  / /_/ / /_/  __(__  )  |\n'+
      '| /_____/\\__,_/_/_/\\__, /     /_/ |_/\\____/\\__/\\___/____/   |\n'+
      '|                 /____/                                    |\n'+
      '\\___________________________________________________________/'
    );
  }

  // banner goes here

  if (noteFolder[0] !== "/") {
    throw new Error(`Path '${noteFolder}' is not absolute`);
  }

  let noteFolderStat;
  try {
    noteFolderStat = await Deno.lstat(noteFolder);
  } catch (error) {
    throw new Error(`'${noteFolder}' does not exist`);
  }

  if (!noteFolderStat) {
    throw new Error(`Was not able to lstas '${noteFolder}'`);
  }

  if (!noteFolderStat.isDirectory) {
    throw new Error(`'${noteFolder}' is not a directory`);
  }

  // Save path to notes in config file

  if(!options.quiet) console.log(`* Note folder is '${noteFolder}'`);
  await save(
    { workspace: noteFolder },
    { append: true, create: true },
  );
  if(!options.quiet) console.log(`* Config file created at '~/.config/daily-note/config'`);

  // Copy base template file
  const rootFolder = Deno.cwd();
  const templateSource = await Deno.open(
    `${rootFolder}/.template.md`,
    { read: true, write: false },
  );

  await ensureFile(`${noteFolder}/.template.md`);
  const templateDestination = await Deno.open(
    `${noteFolder}/.template.md`,
    { read: false, write: true },
  );

  await Deno.copy(templateSource, templateDestination);

  Deno.close(templateSource.rid);
  Deno.close(templateDestination.rid);

  if(!options.quiet){
    console.log(`* Base template copied to '${noteFolder}/.template.md'`);

    // Print final messages
    console.log("Setup completed!");
    console.log("");
    console.log(
      "Add this to your .bashrc 'export PATH=\"\${PATH}:${rootFolder}\"'",
    );
    console.log("Then run 'note-begin' to get started");
  }
}
