import Denomander from "../deps.ts";
import CommandShow from "./commands/CommandShow.ts";
import ProductBuilder from "./product/ProductBuilder.ts";

class Merchant {
  public name: string = "Merchant";
  public version: string = "1.0.01";
  public description: string = "Albion Online trader helper";
  public authors: Array<string> = ["Henry Barreto"];
  private program: Denomander;

  public constructor() {
    this.program = new Denomander({
      app_name: this.name,
      app_version: this.version,
      app_description: this.description,
    });
    try {
      this.program
        .command("product", "Show information about a product")
        .requiredOption("-n, --name", "Name of the product")
        .option("-q, --qualities", "Product qualities")
        .option("-c, --cities", "Name of the cities")
        .option("-o, --order", "Order the result by: [price | qualities]")
        .action(() => {
          this.checkProduct(this.program);
        })
        .parse(Deno.args);
    } catch (error) {
      console.log(error.message);
      Deno.exit(1);
    }
  }
  public async checkProduct(programArgs: Denomander) {
    try {
      let program = programArgs;
      let b1 = new ProductBuilder();
      b1.setName(program.name);
      b1.setCities(program.cities);
      b1.setQualities(program.qualities);
      let p = b1.getProduct();
      console.info(p);
      let command = new CommandShow(p);
      await command.execute();
    } catch (error) {
      console.error(error.message);
    }
  }
}

let merchant = new Merchant();
