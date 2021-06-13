export function writeJson(path:string, data:any):Promise<void> {
    return Deno.writeTextFile(path, JSON.stringify(data));
}
export function readJson<D>(path:string):Promise<D> {
    return Deno.readTextFile(path)
        .then(text => JSON.parse(text) as D);
}