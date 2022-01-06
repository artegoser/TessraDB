let { TessraDB } = require("../lib/index");
let folderstodelete = [];

function genid() {
  let length = 8;
  var result = "A1\\";
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
let path = require("path");

function removefiles(dbname) {
  fs.rmSync(dbname, { recursive: true });
}

describe("FS", () => {
  before(() => {
    try {
      fs.mkdirSync("A1");
    } catch {}
  });
  after(() => {
    fs.rmSync("A1", { recursive: true, force: true });
  });
  describe("collections", () => {
    it("do not create a folder if it already exists", async () => {
      let name = genid();
      fs.mkdirSync(name);
      let db = new TessraDB(name);
      folderstodelete.push(db.name);

      if (!fs.existsSync(name)) {
        throw new Error("folder created");
      }
    });

    it("do not create a metafile if it already exists", async () => {
      let name = genid();
      fs.mkdirSync(name);
      fs.writeFileSync(path.join(name, "collections.temeta"), "[]");
      let db = new TessraDB(name);
      folderstodelete.push(db.name);

      if (!fs.existsSync(path.join(name, "collections.temeta"))) {
        throw new Error("file created");
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

    it("get collection without creating collection", async () => {
      let db = createDb();
      if (!(await db.getCollection("helloworld")))
        throw new Error("collection is not created");
    });

    it("should insert document to collection", async () => {
      let db = createDb();
      let collection = await db.getCollection("helloworld");
      await collection.insert({ hello: "world" });
      await collection.insert({ hello: "dlrow" });
      let filecol = JSON.parse(fs.readFileSync(collection.path, "utf-8"));
      if (filecol[0].hello !== "world" && filecol[1].hello !== "dlrow")
        throw new Error("document not inserted");
    });

    it("should insert many documents to collection", async () => {
      let db = createDb();
      let collection = await db.getCollection("helloworld");
      await collection.insertMany([{ hello: "world" }, { hello: "dlrow" }]);
      await collection.insertMany([{ hello: "wor" }, { hello: "ld" }]);
      let filecol = JSON.parse(fs.readFileSync(collection.path, "utf-8"));
      if (filecol[0].hello !== "world" && filecol[3].hello !== "ld")
        throw new Error("documents not inserted");
    });

    it("should throw error on stream error", async () => {
      let db = createDb();
      let collection = await db.getCollection("helloworld");
      fs.writeFileSync(collection.path, "nawddawonjson");
      let error = false;
      try {
        await collection.insert({ hello: "dlrow" });
      } catch {
        try {
          await collection.insertMany([{ hello: "dlrow" }]);
        } catch {
          try {
            await collection.find({});
          } catch {
            try {
              await collection.findOne({});
            } catch {
              error = true;
            }
          }
        }
      }
      if (error === false) throw new Error("there was no error");
    });

    it("find documents in collection", async () => {
      let db = createDb();
      let collection = await db.getCollection("helloworld");
      await collection.insertMany([
        { type: "man" },
        { type: "woman" },
        { type: "man" },
        { type: "reptile" },
      ]);
      let response = await collection.find({ type: "man" });
      if (
        !(
          response.length === 2 &&
          response[0].type === "man" &&
          response[1].type === "man"
        )
      )
        throw new Error("not valid find");
    });

    it("find document in collection", async () => {
      let db = createDb();
      let collection = await db.getCollection("helloworld");
      await collection.insertMany([
        { type: "man" },
        { type: "woman" },
        { type: "man" },
        { type: "reptile" },
      ]);
      let response = await collection.findOne({ type: "reptile" });
      if (response.type !== "reptile") throw new Error("not valid find");
    });

    it("return undefined when document not find", async () => {
      let db = createDb();
      let collection = await db.getCollection("helloworld");
      await collection.insertMany([
        { type: "man" },
        { type: "woman" },
        { type: "man" },
        { type: "reptile" },
      ]);
      let response = await collection.findOne({ type: "d" });
      if (response !== undefined) throw new Error("not valid find");
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

    it("returning parsed collections", async () => {
      let db = createDb();
      await db.createCollection("helloworld");
      if (!db.collections.helloworld) throw new Error("No collections");
    });
  });
});
