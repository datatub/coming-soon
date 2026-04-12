import tailwindPlugin from "bun-plugin-tailwind";

const result = await Bun.build({
  entrypoints: ["./src/backend/main.ts"],
  target: "bun",
  minify: true,
  sourcemap: "none",
  plugins: [tailwindPlugin],
  compile: {
    outfile: "./dist/server",
  },
});

if (!result.success) {
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log(`Built ${result.outputs[0]?.path ?? "./dist/server"}`);
