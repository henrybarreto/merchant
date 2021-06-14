import { desc, run, sh, task } from "https://deno.land/x/drake@v1.4.6/mod.ts";

desc("Creating the binary file");
task("compile", [], async () => {
  sh(
    "deno compile --unstable --output ./bin/merchant --allow-all ./src/cli.ts",
  );
  sh("cp --force ./merchant.db ./bin");
});

desc("Creating database table and seeding it");
task("database", [], async () => {
  sh(
    "deno run --allow-all ./src/migrations/create.ts && deno run --allow-all ./src/migrations/seed.ts",
  );
});

run();
