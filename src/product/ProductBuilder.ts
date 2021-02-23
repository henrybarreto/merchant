import Product, { IProduct } from "./Product.ts";
import ProductValidator from "./ProductValidator.ts";

export default class ProductBuilder {
  private product: IProduct;
  public constructor() {
    this.product = new Product("", new Set([]), new Set([]));
  }
  public setName(name: string) {
    this.product.name = ProductValidator.validateName(name);
  }
  public setCities(city: string) {
    this.product.city = ProductValidator.validateCity(city);
  }
  public setQualities(qualities: string) {
    this.product.qualities = ProductValidator.validateQualities(qualities);
  }
  public getProduct(): IProduct {
    return this.product;
  }
}
