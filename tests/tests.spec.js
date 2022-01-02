let {TessraDB} = require("../lib/index");

function genid(){
    let length = 8;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }    
    return result;
}

let fs = require("fs");
let path = require("path")


function removefiles(dbname){
    fs.rmdirSync(dbname, { recursive: true });
}

describe("FS", ()=>{
    describe("collections", ()=>{

        it("create collections", async ()=>{
            let db = new TessraDB(genid());
            await db.createCollection("helloworld");
            if(db.colNames.indexOf("helloworld")<0) throw new Error("collection is not created");
            removefiles(db.name);
        });

        it("throw error if collection already exists", async ()=>{
            let db = new TessraDB(genid());
            let error = false;
            try{
                await db.createCollection("helloworld");
                await db.createCollection("helloworld");
            } catch{
                error = true;
            }
            if(error===false) throw new Error("there was no error");
            removefiles(db.name);
        });

        it("returning parsed collections", ()=>{
            let db = new TessraDB(genid());
            if(!db.collections) throw new Error("No collections");
            removefiles(db.name);
        });
    });
});