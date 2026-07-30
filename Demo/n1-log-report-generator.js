/**
 * log-report-generator.js
 *
 * Demonstrates:
 * ✔ fs.promises
 * ✔ path
 * ✔ process.argv
 * ✔ process.exit()
 * ✔ Custom Error Class
 * ✔ async/await
 * ✔ try/catch
 *
 * Run:
 * node log-report-generator.js sample.log
 */

const fs = require("fs").promises;
const path = require("path");

// ======================================
// Custom Error
// ======================================
class EmptyLogFileError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmptyLogFileError";
    }
}

// ======================================
// Create Output File Name
// Example:
// sample.log -> sample-report.txt
// ======================================
function createReportPath(fileName) {
    const folder = path.dirname(fileName);
    const name = path.basename(fileName, path.extname(fileName));

    return path.join(folder, `${name}-report.txt`);
}

// ======================================
// Read and Analyze Log File
// ======================================
async function scanLogFile(fileName) {

    const data = await fs.readFile(fileName, "utf8");

    const records = data
        .split("\n")
        .filter(record => record.trim() !== "");

    if (records.length === 0) {
        throw new EmptyLogFileError("The selected log file is empty.");
    }

    let info = 0;
    let warning = 0;
    let error = 0;

    records.forEach(record => {

        if (record.includes("INFO"))
            info++;

        if (record.includes("WARNING"))
            warning++;

        if (record.includes("ERROR"))
            error++;
    });

    return {
        total: records.length,
        info,
        warning,
        error
    };
}

// ======================================
// Save Report
// ======================================
async function saveReport(destination, result) {

    const dateGenerated = new Date().toLocaleString();

    const report = `
========================================
          LOG FILE REPORT
========================================

Generated : ${dateGenerated}

Total Lines : ${result.total}
INFO Lines  : ${result.info}
WARNING     : ${result.warning}
ERROR       : ${result.error}

========================================
End of Report
========================================
`;

    await fs.writeFile(destination, report, "utf8");
}

// ======================================
// Main Program
// ======================================
async function runProgram() {

    const input = process.argv[2];

    if (!input) {
        console.log("Usage:");
        console.log("node log-report-generator.js <logfile>");
        process.exit(1);
    }

    try {

        const result = await scanLogFile(input);

        const output = createReportPath(input);

        await saveReport(output, result);

        console.log("\n========== ANALYSIS COMPLETE ==========");
        console.log(`Total Lines : ${result.total}`);
        console.log(`INFO        : ${result.info}`);
        console.log(`WARNING     : ${result.warning}`);
        console.log(`ERROR       : ${result.error}`);
        console.log(`Report File : ${output}`);
        console.log("=======================================\n");

        process.exit(0);

    } catch (err) {

        if (err.code === "ENOENT") {

            console.log("❌ The file does not exist.");

        } else if (err instanceof EmptyLogFileError) {

            console.log(`❌ ${err.name}: ${err.message}`);

        } else {

            console.log("❌ Unexpected Error:", err.message);

        }

        process.exit(1);
    }
}

runProgram();