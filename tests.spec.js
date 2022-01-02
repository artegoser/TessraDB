let {TessraDB} = require("./lib/index");
let dbname = "testTessraDB";
let db = new TessraDB(dbname);
let fs = require("fs");
let path = require("path")

describe("FS", ()=>{
    describe("collections", ()=>{
        afterEach(()=>{
            let files = fs.readdirSync(dbname)
            for (const file of files) {
                    fs.unlink(path.join(dbname, file), err => {
                    if (err) throw err;
                });
            }
        });
        after(()=>{
            fs.rmdirSync(dbname, { recursive: true });
        });

        it("create collections", async ()=>{
            await db.createCollection("helloworld");
            if(db.colNames.indexOf("helloworld")<0) throw new Error("collection is not created");
        });

        it("throw error if collection already exists", async ()=>{
            let error = false;
            try{
                await db.createCollection("helloworld");
                await db.createCollection("helloworld");
            } catch{
                error = true;
            }
            if(error===false) throw new Error("there was no error");
        });

        it("returning parsed collections", ()=>{
            if(!db.collections) throw new Error("No collections")
        });
    });
});