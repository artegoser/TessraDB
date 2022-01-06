<h1 align="center">
  <br>
    <a href="https://artegoser.github.io/TessraDB/"><img src="https://artegoser.github.io/tessraStatic/tessradb.png" alt="Markdownify" width="200"></a>
  <br>
  TessraDB
  <br>
</h1>

<h3 align="center">Local noSQL database for Node.js</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/tessradb">
    <img alt="npm" src="https://img.shields.io/npm/v/tessradb">
  </a>
  <a href="https://app.travis-ci.com/github/artegoser/TessraDB">
    <img alt="Travis (.com)" src="https://img.shields.io/travis/com/artegoser/TessraDB">
  </a>
  <a href="https://coveralls.io/github/artegoser/TessraDB">
    <img alt="Coveralls" src="https://img.shields.io/coveralls/github/artegoser/TessraDB">
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <a align="center" href="https://artegoser.github.io/TessraDB/">Documentation</a>
</p>

## Features

- Low memory consumption and fast work due to streaming reading and writing.
- Smart filter for extracting data from collections.
- Atomic write, your data will not be corrupted.

## How To Use

### Installation

- #### NPM
  ```bash
  npm i tessradb
  ```
- #### YARN
  ```bash
  yarn add tessradb
  ```

### Usage

- ### Import

  ```js
  let { TessraDB } = require("tessradb");
  //or
  import { TessraDB } from "tessradb";
  ```

- ### First DataBase

  ```js
  import { TessraDB } from "tessradb";
  let db = new TessraDB("first"); //create a db with name "first"
  run(db);

  async function run(db) {
    let firstCol = await db.getCollection("firstCollection");
    await firstCol.insertMany([
      { type: "man", age: 1, height: 56 },
      { type: "woman", age: 2, height: 76 },
    ]); //insert documents to collection
    console.log(await firstCol.findOne({ type: "man" }));
    //find one document with type "man"
    //output: { type: "man", age: 1, height: 56 }
  }
  ```

## Roadmap

[TODO list](https://github.com/artegoser/TessraDB/blob/main/.github/todo.md)  
You can also suggest new features in [issues](https://github.com/artegoser/TessraDB/issues) yourself.

## Contributing

Your contributions are always welcome! Please look at the [contribution guidelines](https://github.com/artegoser/TessraDB/blob/main/.github/CONTRIBUTING.md) first. 🎉

## Credits

TessraDB uses:

- [JSONStream](https://www.npmjs.com/package/JSONStream) for stream reading and writing JSON

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/artegoser/TessraDB/blob/main/LICENSE)  
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fartegoser%2FTessraDB.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fartegoser%2FTessraDB?ref=badge_large)
