export default async (targetDate:string):Promise<string> => {
    console.log(targetDate);

    const process = Deno.run({
        cmd: [ 'scripts/gnudate.sh', '-d', targetDate ],
        //cmd: [ 'bash', '-c', 'ls scripts | grep gnu'],
        //cmd: ['whoami'],
        stdout: 'piped',
        stderr: 'piped',
    })
    const {code} = await process.status();
    const rawOutput = await process.output();
    const rawError = await process.stderrOutput();

    if(code !== 0){
        throw new TextDecoder().decode(rawError);
    }

    return new TextDecoder().decode(rawOutput);
}
