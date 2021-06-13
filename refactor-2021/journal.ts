import omelette from "omelette";
import gnudate from "gnudate";

const complete = omelette("journal <action>");

type OmeletteEvent = Event & {
    before: string,
    fragment: number,
    line: string,
    reply: (words: string[])=>(number | Promise<number>),
};

complete.on("action", function ({ reply }:OmeletteEvent) {
    reply(["begin", "end", "new", "open", "yesterday", "tomorrow", "last friday"]);
});

complete.init();

const cliArguments:string[] = [...Deno.args];

// Get action to call old scripts
const defaultAction = 'begin';
let action = defaultAction;
if(cliArguments.length > 0 && ["begin", "end", "new", "open"].includes(cliArguments[0])){
    action = cliArguments.shift() ?? defaultAction;
    Deno.exit(0);
}


const date = await gnudate(cliArguments[0] ?? 'today');


console.log({action, date});
