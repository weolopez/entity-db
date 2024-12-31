# EntityDB

An in-browser vector database wrapping indexedDB and Transformers.js

![EntityDB](https://raw.githubusercontent.com/babycommando/entity-db/refs/heads/main/cover.gif)

## Overview

**EntityDB** is a powerful, lightweight in-browser database designed for storing and querying vectors. It integrates seamlessly with [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for persistent storage and [Transformers.js](https://github.com/xenova/transformers) to generate embeddings from text, allowing you to build fast and efficient search systems with state-of-the-art models. Whether you're building search engines, recommendation systems, Ai memory or any app requiring vector similarity, EntityDB has got you covered.

## Features

- **In-browser**: Runs entirely in the browser using IndexedDB for local storage.
- **Seamless Integration with Transformers**: Easily generate text embeddings with Hugging Face models via Transformers.js.
- **Cosine Similarity Search**: Efficient querying based on cosine similarity between vectors.
- **Flexible**: Supports both automatic embedding generation and manual insertion of pre-computed embeddings.
- **Lightweight**: No need for a server-side component or complex setup.

## Installation

To install **EntityDB** in your project, run:

```bash
npm install @babycommando/entity-db
```

```bash
yarn add @babycommando/entity-db
```

```bash
pnpm add @babycommando/entity-db
```

```bash
bun add @babycommando/entity-db
```

## Usage

### Importing the Library

```js
import { EntityDB } from "@babycommando/entity-db";

// Initialize the VectorDB instance
const db = new EntityDB({
  vectorPath: "db_name",
  model: "Xenova/all-MiniLM-L6-v2",
});
```

### Inserting Data with Automatic Embedding Generation

You can insert data by simply passing a text field. The library will automatically generate embeddings using the specified transformer model.

```js
await db.insert({
  text: "This is a sample text to embed",
});
```

### Querying (Cosine Similarity)

You can query the database by providing a text, and EntityDB will return the most similar results based on cosine similarity.

```js
await db.insert({
  const results = await db.query("Find similar texts based on this query");
  console.log(results);
});
```

### Inserting Manual Vectors

If you already have precomputed vectors, you can insert them directly into the database.

```js
await db.insertManualVectors({
  text: "Another sample",
  embedding: [0.1, 0.2, 0.3, ...] // your precomputed embedding
});
```

### Deleting Data

You can delete a vector by its key.

```js
await db.delete(1);
```

### Querying Manual Vectors

If you have precomputed vectors and want to query them directly, use the queryManualVectors method.

```js
  const queryVector = [0.1, 0.2, 0.3, ...]; // your precomputed query vector
  const results = await db.queryManualVectors(queryVector);
  console.log(results);
```

#### For Nextjs

If you're using Next.js, you may need to configure Webpack to work with Transformers.js. Add the following to your next.config.js file:

```js
  webpack: (config) => {
    // Override the default webpack configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      "onnxruntime-node$": false, // Disable onnxruntime-node for browser environments
      "sharp$": false, // optional - Disable sharp package (used by some image processing packages)
    };

    return config;
  },
```

## Contributing

Feel free to fork the repository, create issues, and submit pull requests. We welcome contributions and suggestions!

## License

This project is licensed under the Apache License 2.0.
