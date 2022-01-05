import { WriteStream } from "fs";
import { TessraCollection } from "./collection";

export interface CollectionObject {
  [collectionName: string]: TessraCollection;
}

export interface CollectionDocument {
  _id: string;
  [keys: string]: any;
}

export interface atomWriteStream {
  stream: WriteStream;
  end: () => void;
}
