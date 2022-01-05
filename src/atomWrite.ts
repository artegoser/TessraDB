import * as fs from 'fs'
import * as path from 'path'
import { atomWriteStream } from './interfaces';
import * as JSONS from "JSONStream";

function getTemp(name:string): string {
  return path.join(path.dirname(name), path.basename(name) + '.tetmp')
}

export async function writeFile(fileName:string, data:string): Promise<void> {
  let tempFileName = getTemp(fileName);
  await fs.promises.writeFile(tempFileName, data, 'utf-8');
  await fs.promises.rename(tempFileName, fileName);
}

export function writeFileSync(fileName:string, data:string): void {
  let tempFileName = getTemp(fileName);
  fs.writeFileSync(tempFileName, data, 'utf-8');
  fs.renameSync(tempFileName, fileName);
}

export async function objWriteStream(fileName:string): Promise<atomWriteStream> {
  let tempFileName = getTemp(fileName);
  let writeStream = fs.createWriteStream(tempFileName);
  let objStream = JSONS.stringify("[",",","]");
  objStream.pipe(writeStream);

  async function end(){
    objStream.end();
    await fs.promises.rename(tempFileName, fileName);
  }

  return {stream: objStream, end};
}