const input = require("./input");
const logic = require("./app");

async function main() {
    let running = true;
    while (running) {
        let flower = await input.question("Enter flower: ");
        flower = flower.trim().toLowerCase();
        if (flower === "rose" || flower === "sunflower" || flower === "tulip") {
            logic(flower);
            running = false;
        } else {
            console.log("Invalid flower. Please enter 'rose', 'sunflower', or 'tulip'.");
        }
    }
    input.close();
}

main();