import Denomander from "../deps.ts";
import { show } from "./cli/commands.ts";
import { validateOrder } from "./cli/validator.ts";
import productCreate from "./core/product/product.ts";

/**
 * Mechant's inital function.
 * @param {string[]} args
 */
export default function Merchant(args: string[]) {
  const name: string = "Merchant";
  const version: string = "1.0.01";
  const description: string = "Albion Online trader helper";
  const authors: Array<string> = ["Henry Barreto"];

  const program: Denomander = new Denomander({
    app_name: name,
    app_version: version,
    app_description: description,
  });

  const checkProduct = async (programArgs: Denomander) => {
    const product = productCreate(
      programArgs.name,
      programArgs.cities,
      programArgs.qualities,
    );
    if (!product) {
      console.error(
        "Could not create the product because the data is not in a valid format",
      );
      return 1;
    }

    await show(
      product,
      validateOrder(programArgs.order),
    );
  };

  program
    .command("product", "Show information about a product")
    .requiredOption("-n, --name", "Name of the product")
    .requiredOption("-q, --qualities", "Product qualities")
    .requiredOption("-c, --cities", "Name of the cities")
    .option("-o, --order", "Order the result by: [price | qualities]")
    .action(async () => {
      await checkProduct(program);
    }).parse(args);
}
