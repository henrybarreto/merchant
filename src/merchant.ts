//import Denomander from "https://deno.land/x/denomander@0.8.0/mod.ts";
import Denomander from '../deps.ts';
import { main } from "./mod.ts";

const program = new Denomander({
  app_name: "Merchant",
  app_version: "1.0.0",
  app_description: "Albion Online trader helper",
});

try {
  program
    .command("product", "Show information about items")
    .requiredOption("-n, --name", "Name of the product")
    .option("-q, --qualities", "Item qualities")
    .option("-c, --cities", "Name of the cities")
    .option("-o, --order", "Order the result by: [price | qualities]")
    .action(() => {
      main(program);
    })
    .parse(Deno.args);
} catch (error) {
  console.log(error.message);
  Deno.exit(1);
}
