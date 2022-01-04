import * as fs from 'fs'
import * as path from 'path'

function getTemp(name:string){
  return path.join(path.dirname(name), path.basename(name) + '.tetmp')
}

export async function writeFile(filename:string, data:string){
  let tempfilename = getTemp(filename);
  await fs.promises.writeFile(tempfilename, data, 'utf-8');
  await fs.promises.rename(tempfilename, filename);
}

export function writeFileSync(filename:string, data:string){
  let tempfilename = getTemp(filename);
  fs.writeFileSync(tempfilename, data, 'utf-8');
  fs.renameSync(tempfilename, filename);
}