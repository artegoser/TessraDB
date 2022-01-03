let { TessraDB } = require("../lib/index");
let folderstodelete = [];

function genid() {
  let length = 8;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function createDb() {
  let db = new TessraDB(genid());
  folderstodelete.push(db.name);
  return db;
}

let fs = require("fs");

function removefiles(dbname) {
  fs.rmdirSync(dbname, { recursive: true });
}

describe("FS", () => {
  describe("collections", () => {
    after(() => {
      for (let folder of folderstodelete) {
        removefiles(folder);
      }
    });

    it("create collections", async () => {
      let db = createDb();
      await db.createCollection("helloworld");
      if (db.colNames.indexOf("helloworld") < 0)
        throw new Error("collection is not created");
    });

    it("get collection by name", async () => {
      let db = createDb();
      await db.createCollection("helloworld");
      if (!(await db.getCollection("helloworld")))
        throw new Error("collection is not created");
    });

    it("throw error if collection doesnt exists", async () => {
      let db = createDb();
      let error = false;
      try {
        await db.getCollection("nothelloworld");
      } catch {
        error = true;
      }
      if (error === false) throw new Error("there was no error");
    });

    it("throw error if collection already exists", async () => {
      let db = createDb();
      let error = false;
      try {
        await db.createCollection("helloworld");
        await db.createCollection("helloworld");
      } catch {
        error = true;
      }
      if (error === false) throw new Error("there was no error");
    });

    it("returning parsed collections", () => {
      let db = createDb();
      if (!db.collections) throw new Error("No collections");
    });
  });
});
