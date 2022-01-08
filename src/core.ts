import * as aw from "./atomWrite";
import * as fs from "fs";
import * as path from "path";
import { TessraCollection } from "./collection";
import { collectionObject } from "./interfaces";

/**
 * Main class of TessraDB
 */
export class TessraDB {
  public name: string;
  public colNames: Array<string>;
  #collections: collectionObject = {};
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
    if (fs.existsSync(this.#metaPath)) {
      this.colNames = JSON.parse(
        fs.readFileSync(`${this.name}/collections.temeta`, "utf-8")
      );
    } else {
      this.colNames = [];
      aw.writeFileSync(this.#metaPath, "[]");
    }
  }
  /**
   * Function to get Collection Path
   * @param name name of the collection
   * @returns Path to Collection
   */
  #getCollectionPath(name: string): string {
    return path.join(this.name, name + ".tdb");
  }
  /**
   * Add collection to metadata .temeta file
   */
  async #addCollectionToMeta(name): Promise<void> {
    this.colNames.push(name);
    await aw.writeFile(this.#metaPath, JSON.stringify(this.colNames));
  }
  /**
   * Function to get collection by name
   * @param name name of the collection
   * @returns full collection
   */
  public async getCollection(name: string): Promise<TessraCollection> {
    let collection: TessraCollection;
    if (this.colNames.indexOf(name) < 0) {
      await this.#addCollectionToMeta(name);
      collection = new TessraCollection(name, this.#getCollectionPath(name));
      this.#collections[name] = collection;
    } else {
      collection = this.#collections[name];
    }
    return collection;
  }
  /**
   * Creates collection
   * @param name name of the collection
   */
  public async createCollection(name: string): Promise<TessraCollection> {
    if (!(this.colNames.indexOf(name) < 0))
      throw new Error("Collection already exists. Please, drop collection");
    await aw.writeFile(path.join(this.name, name + ".tdb"), "[]");
    await this.#addCollectionToMeta(name);
    let collection = new TessraCollection(name, this.#getCollectionPath(name));
    this.#collections[name] = collection;
    return collection;
  }
}
