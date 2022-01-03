import * as fs from "fs"
import * as JSONS from "JSONStream"
import * as path from "path"

/**
 * Main class of TessraDB
 */
export class TessraDB {
    name:string
    constructor(name:string){
        this.name = name;
        this.init();
    }
    /**
     * initialize TessraDB
     */
    private init(){
        if (!fs.existsSync(this.name)){
            fs.mkdirSync(this.name);
        }
    }
    /**
     * A collections object is a read-only variable that contains all the collections in the database
     * Do not use if the database is large
     */
    public get collections(){
        let collect = {};
        let filenames = fs.readdirSync(this.name);
        for(let filename of filenames) {
            collect[filename] = JSON.parse(fs.readFileSync(path.join(this.name, filename), "utf-8"));
        }
        return collect
    }
    public async getCollection(name:string){
        try{
            let file = await fs.promises.readFile(path.join(this.name, name), "utf-8")
            return JSON.parse(file);
        } catch(e){
            if(e.errno===-4058) throw new Error("Collection does not exist")
            else throw e;
        }
    }
    /**
     * Returns names of all collections
     */
    public get colNames(){
        return fs.readdirSync(this.name);
    }
    /**
     * Creates collection
     */
    public async createCollection(name:string){
        if(this.colNames.indexOf(name)<0) await fs.promises.writeFile(path.join(this.name, name), "[]");
        else throw new Error("Collection already exists. Please, drop collection");
    }
}