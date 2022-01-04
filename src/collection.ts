import * as JSONS from "JSONStream";
import * as fs from "fs";

/**
 * Class of Tessra Collection
 * Performs the role of a collection object to perform 
 * all the functions of TessraDB collections
 * (find, delete, insert, update)
 */
export class TessraCollection {
    public name:string
    constructor(name:string){
        this.name = name;
    }
}