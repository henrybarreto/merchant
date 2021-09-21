import Denomander from "../deps.ts";
import CliValidator from "./cli/CliValidator.ts";
import CommandShow from "./commands/CommandShow.ts";
import ProductBuilder from "./business/product/ProductBuilder.ts";

export default class Merchant {
  public name: string = "Merchant";
  public version: string = "1.0.01";
  public description: string = "Albion Online trader helper";
  public authors: Array<string> = ["Henry Barreto"];
  private program: Denomander;

  public constructor(args: any) {
    this.program = new Denomander({
      app_name: this.name,
      app_version: this.version,
      app_description: this.description,
    });
    try {
      this.program
        .command("product", "Show information about a product")
        .requiredOption("-n, --name", "Name of the product")
        .requiredOption("-q, --qualities", "Product qualities")
        .requiredOption("-c, --cities", "Name of the cities")
        .option("-o, --order", "Order the result by: [price | qualities]")
        .action(() => {
          this.checkProduct(this.program);
        })
        .parse(args);
    } catch (error) {
      console.log(error.message);
      Deno.exit(1);
    }
  }
  public async checkProduct(programArgs: Denomander) {
    try {
      let productBuilder: ProductBuilder = new ProductBuilder();
      productBuilder.setName(programArgs.name);
      productBuilder.setCities(programArgs.cities);
      productBuilder.setQualities(programArgs.qualities);

      await (new CommandShow(
        productBuilder.getProduct(),
        CliValidator.validateOrder(programArgs.order),
      ))
        .execute();
    } catch (error) {
      console.error(error.message);
      Deno.exit(1);
    }
  }
}
