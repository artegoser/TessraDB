import * as JSONS from "JSONStream";
import * as fs from "fs";
import * as aw from "./atomWrite";
import { collectionDocument } from "./interfaces";

/**
 * Class of Tessra Collection
 * Performs all the functions of TessraDB
 * collections (find, delete, insert, update, etc.)
 */
export class TessraCollection {
  public name: string;
  public path: string;
  #locked: boolean = false;
  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.#init();
  }
  /**
   * Inititalize the collection
   */
  #init(): void {
    if (!fs.existsSync(this.path)) {
      aw.writeFileSync(this.path, "[]");
    }
  }
  /**
   * Insert a document to collection
   * @param doc Document to insert
   */
  public insert(doc: Object): Promise<void> {
      return new Promise(async (res, rej)=>{
        this.#locked = true;
        let readStream = fs.createReadStream(this.path);
        let objReadStream = JSONS.parse([true]);
        let objWriteStream = await aw.objWriteStream(this.path);
        readStream.pipe(objReadStream);

        objReadStream.on("data", (data)=>{
            objWriteStream.stream.write(data);
        });

        objReadStream.on("end", async ()=>{
            objWriteStream.stream.write(doc);
            await objWriteStream.end();
            res();
        });
      });
  }
  /**
   * Insert a many documents to collection
   * @param docArray array of documents to insert
   */
  public insertMany(docArray: Array<collectionDocument>): Promise<void> {
    return new Promise(async (res, rej) => {
      this.#locked = true;
      let readStream = fs.createReadStream(this.path);
      let objReadStream = JSONS.parse([true]);
      let objWriteStream = await aw.objWriteStream(this.path);
      readStream.pipe(objReadStream);

      objReadStream.on("error", (err) => {
        rej(err);
      });

      objReadStream.on("data", (data) => {
        objWriteStream.stream.write(data);
      });

      objReadStream.on("end", async () => {
        for (let doc of docArray) {
          objWriteStream.stream.write(doc);
        }
        await objWriteStream.end();
        res();
      });
    });
  }
}
