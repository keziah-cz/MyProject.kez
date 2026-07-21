class ConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConfigError";
  }
}

function loadThreshold() {
  const value = process.env.MAX_ITEMS;
  if (!value) {
    throw new ConfigError("MAX_ITEMS is missing");
  }

  return Number(value);
}

async function run(items) {
  const limit = loadThreshold();

  if (items.length > limit) {
    throw new Error(`Too many items: ${items.length} > ${limit}`);
  }

  return items.map(i => i.toUpperCase());
}

const verbose = process.argv.includes("--verbose");

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

(async () => {
  try {
    const items = ["apple", "banana", "orange"];
    const result = await run(items);
    console.log(result);
  } catch (err) {
    if (verbose) {
      console.error(err.stack);
    } else {
      console.error(err.message);
    }
    process.exit(1);
  }
})();