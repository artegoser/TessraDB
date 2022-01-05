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
   * checking the object for compliance with the filter
   * @param filt filter for object ({id:1, type:"help"})
   * @param obj object to compare
   * @returns {boolean}
   */
  #isFiltValid(filt: Object, obj: Object) {
    let filtnames: Array<string> = Object.keys(filt);
    for (let filtname of filtnames) {
      if (filt[filtname] !== obj[filtname]) return false;
    }
    return true;
  }
  public find(filter: Object): Promise<Array<collectionDocument>> {
    return new Promise(async (res, rej) => {
      let readStream = fs.createReadStream(this.path);
      let objReadStream = JSONS.parse([true]);
      readStream.pipe(objReadStream);

      let response: Array<collectionDocument> = [];

      objReadStream.on("error", (err) => {
        rej(err);
      });

      objReadStream.on("data", (data) => {
        if (this.#isFiltValid(filter, data)) response.push(data);
      });

      objReadStream.on("end", async () => {
        res(response);
      });
    });
  }
  /**
   * Insert a document to collection
   * @param doc Document to insert
   */
  public insert(doc: collectionDocument): Promise<void> {
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
