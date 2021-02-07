import Items from "./database/items.ts";
import { Cities, Order, Product } from "./types.ts";

export class ProductValidate implements Product {
    public name: string[];
    public qualities: string[] | undefined;
    public cities: Cities[] | undefined;
    public order: Order;
    
    /**
     * @param  {any} product
     */
    constructor(product: any) {
        this.name = this.validateName(product.name);
        this.qualities = this.validateQualities(product.qualities);
        this.cities = this.validateCities(product.cities);
        this.order = product.order;
    }
    /**
     * @param  {string} names
     * @returns string[]
     */
    public validateName(names: string): string[] {
        const names_validated: string[] = [];
        const names_list = names.split(",");
        names_list.map((name: string) => {
            if (new Items().hasProduct(name)) {
                names_validated.push(name);
            } else {
                throw new Error("One of products names is invalid!: " + name);
            }
        });
        return names_validated;
    }
    /**
     * @param  {string|undefined} qualities
     * @returns string|undefined
     */
    public validateQualities(qualities: string | undefined): string[] | undefined {
        if(qualities) {
            let qualitiesSplited = qualities.split(",");
            return qualitiesSplited;
        } else {
            return undefined
        }
    }
    /**
     * @param  {string|undefined} cities
     * @returns Cities[]|undefined
     */
    public validateCities(cities: string | undefined): Cities[] | undefined {
        if(cities) {
            let citiesQualities = cities.split(",");
            return citiesQualities as Cities[];
        } else {
            return undefined
        }
    }
}