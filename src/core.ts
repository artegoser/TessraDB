import * as fs from "fs";
import * as JSONS from "JSONStream";
import * as path from "path";

/**
 * Main class of TessraDB
 */
export class TessraDB {
  public name: string;
  public colNames: Array<string>;
  #metaPath: string;
  constructor(name: string) {
    this.name = name;
    this.#metaPath = path.join(this.name, "collections.temeta");
    this.#init();
  }
  /**
   * initialize TessraDB
   */
  #init(): void {
    if (!fs.existsSync(this.name)) {
      fs.mkdirSync(this.name);
    }
    if(fs.existsSync(this.#metaPath)){
      this.colNames = JSON.parse(fs.readFileSync(`${this.name}/collections.temeta`, "utf-8"));
    } else{
      this.colNames = [];
      fs.writeFileSync(this.#metaPath, "[]");
    }
  }
  /**
   * Add collection to metadata .temeta file
   */
  async #addCollectionToMeta(name): Promise<void>{
    this.colNames.push(name);
    await fs.promises.writeFile(this.#metaPath, JSON.stringify(this.colNames));
  }
  /**
   * A collections object is a read-only variable that contains all the collections in the database
   * Do not use if the database is large
   * @returns all collections in db
   */
  public get collections(): Object {
    let collect = {};
    for (let filename of this.colNames) {
      collect[filename] = JSON.parse(
        fs.readFileSync(path.join(this.name, filename+".tdb"), "utf-8")
      );
    }
    return collect;
  }
  /**
   * Function to get collection by name
   * @param name name of the collection
   * @returns full collection
   */
  public async getCollection(name: string): Promise<Object> {
    try {
      let file = await fs.promises.readFile(
        path.join(this.name, name+".tdb"),
        "utf-8"
      );
      return JSON.parse(file);
    } catch (e) {
      if (e.code === "ENOENT") throw new Error("Collection does not exist");
      else throw e;
    }
  }
  /**
   * Creates collection
   * @param name name of the collection
   */
  public async createCollection(name: string): Promise<void> {
    if (!(this.colNames.indexOf(name) < 0)) throw new Error("Collection already exists. Please, drop collection");
    await fs.promises.writeFile(path.join(this.name, name+".tdb"), "[]");
    await this.#addCollectionToMeta(name);
  }
}
