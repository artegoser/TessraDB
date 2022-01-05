import { WriteStream } from "fs";
import { TessraCollection } from "./collection";

export interface collectionObject {
  [collectionName: string]: TessraCollection;
}

export interface collectionDocument {
  [keys: string]: any;
}

export interface atomWriteStream {
  stream: WriteStream;
  end: () => void;
}
