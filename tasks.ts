import { desc, run, task, sh } from "https://deno.land/x/drake@v1.4.6/mod.ts";

desc("Creating the binary file");
task("compile", [], async () => {
  sh("deno compile --unstable --lite --output ./bin/merchant ./src/merchant.ts");
  sh("cp --force ./merchant.db ./bin");
});

desc("Creating database table and seeding it");
task("database", [], async () => {
  sh("deno run --allow-all ./src/database/create.ts && deno run --allow-all ./src/database/seed.ts");
});

run();