// Setup
import {
  parse,
  Args,
  ArgParsingOptions,
} from "https://deno.land/std/flags/mod.ts";
import setup from "./actions/setup.ts";

const args = parse(Deno.args)._;

setup(args[0] as string);

// New File
//if(import.meta.main){
//  newFile("./test/new.md", { extraContent: await extractSections(".") });
//}

// Open file using your favorite editor
//echo "Editing file ${filePath}"
//$EDITOR "${filePath}"
