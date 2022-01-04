import * as JSONS from "JSONStream";
import * as fs from "fs";

/**
 * Class of Tessra Collection
 * Performs the role of a collection object to perform 
 * all the functions of TessraDB collections
 * (find, delete, insert, update)
 */
export class TessraCollection {
    public name:string;
    public path:string;
    constructor(name:string, path:string){
        this.name = name;
        this.path = path;
    }
}