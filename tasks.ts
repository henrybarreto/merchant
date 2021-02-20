import { desc, run, task, sh } from "./deps.ts";

desc("Creating the binary file");
task("compile", [], async () => {
  sh("deno compile --unstable ./src/merchant.ts --output ./bin/merchant");
});

desc("Creating database table and seeding it");
task("database", [], async () => {
  sh("deno run --allow-all ./src/database/create.ts && deno run --allow-all ./src/database/seed.ts");
});

run();