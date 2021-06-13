/*
// Works but the completion happends in JS and need to be part of the application itself :S
// deno.run mod.ts --completion
import omelette from "https://deno.land/x/omelette/omelette.ts";

const complete = omelette("ideas <mainTopic>");

complete.on("mainTopic", (cli:any ) => {
  cli.reply(["subTopicA", "subTopicB", "subTopicC"]);
});

complete.init();
*/

// Holy shit, it works now!
// deno run --allow-run mod.ts
const program = ["code", "-w"];
const p = Deno.run({
    cmd: program,
    stdout:"piped",
    stderr:"piped",
});
const {code} = await p.status();

// Reading the outputs closes their pipes
const stdout = await p.output();
const stderr = await p.stderrOutput();

console.log(`Done with "${program.join(' ')}"`);

console.log({
    code,
    stdout,
    stderr,
});
