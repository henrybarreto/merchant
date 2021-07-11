import { desc, run, sh, task } from "https://deno.land/x/drake@v1.4.6/mod.ts";

desc("Creating the binary file");
task("compile", [], async () => {
  sh(
    "deno compile --unstable --output ./merchant --allow-all ./src/cli.ts",
  );
});

desc("Creating database table and seeding it");
task("database", [], async () => {
  sh(
    "deno run -A ./src/migrations/create_table_products.ts && deno run -A ./src/migrations/seed_table_products.ts",
  );
});

run();
