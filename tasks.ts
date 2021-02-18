import { desc, run, task, sh } from "./deps.ts";

desc("Creating the binary file");
task("compile", [], async () => {
  sh("deno compile --unstable ./src/merchant.ts --output ./bin/merchant");
});

run();