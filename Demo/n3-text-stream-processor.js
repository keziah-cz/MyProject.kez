/**
 * text-stream-processor.js
 *
 * Demonstrates:
 * ✔ Readable Stream
 * ✔ Writable Stream
 * ✔ Transform Stream
 * ✔ pipe()
 * ✔ process.argv
 *
 * Run:
 * node text-stream-processor.js sample.log
 */

const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

const sourceFile = process.argv[2];

if (!sourceFile) {
    console.log("Usage:");
    console.log("node text-stream-processor.js <filename>");
    process.exit(1);
}

// ======================================
// Create Transform Stream
// Converts text to uppercase
// Adds line numbers
// ======================================

function createTextTransformer() {

    let lineNumber = 1;

    return new Transform({

        transform(chunk, encoding, callback) {

            const text = chunk.toString();

            const converted = text
                .split("\n")
                .map(line => {

                    if (line.trim() === "") {
                        return "";
                    }

                    return `${lineNumber++}. ${line.toUpperCase()}`;

                })
                .join("\n");

            callback(null, converted);

        }

    });

}

// ======================================
// Process File
// ======================================

function processFile(fileName) {

    const outputFile = path.join(
        path.dirname(fileName),
        `${path.basename(fileName, path.extname(fileName))}-processed.txt`
    );

    const reader = fs.createReadStream(fileName);

    const writer = fs.createWriteStream(outputFile);

    const transformer = createTextTransformer();

    console.log("-----------------------------------");
    console.log("Starting Stream Processing...");
    console.log(
        `Memory Used: ${(process.memoryUsage().heapUsed / 1024).toFixed(2)} KB`
    );
    console.log("-----------------------------------");

    reader
        .pipe(transformer)
        .pipe(writer);

    writer.on("finish", () => {

        console.log("\nProcessing Complete!");
        console.log(
            `Memory Used: ${(process.memoryUsage().heapUsed / 1024).toFixed(2)} KB`
        );
        console.log(`Output File: ${outputFile}`);

    });

    reader.on("error", (err) => {

        console.log("Unable to read the file.");
        console.log(err.message);

        process.exit(1);

    });

    writer.on("error", (err) => {

        console.log("Unable to write the output file.");
        console.log(err.message);

        process.exit(1);

    });

}

processFile(sourceFile);

/*
===========================================
Why use Streams?

Streams process data in small chunks,
so large files can be handled without
loading everything into memory.

Advantages:
✔ Faster for large files
✔ Lower memory usage
✔ Efficient file processing
===========================================
*/