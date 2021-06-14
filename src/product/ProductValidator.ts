import SqliteActions from "../database/sqlite/SqliteActions.ts";
import SqliteDatabase from "../database/sqlite/SqliteDatabase.ts";
import { City, Order } from "../types.ts";

export default class ProductValidator {
  /**
     * @param  {string} names
     * @returns string[]
     */
  public static validateName(name: string): string {
    if (new SqliteActions(new SqliteDatabase("./merchant.db")).hasProduct(name)) { //TODO
      return name;
    } else {
      throw new Error("The product name is invalid!: " + name);
    }
  }
  /**
     * @param  {string|undefined} qualities
     * @returns string|undefined
     */
  public static validateQualities(qualities: string): Set<string> {
    try {
      if (qualities) {
        let qualitiesSplited: Array<string> = qualities.split(",");
        console.log(qualitiesSplited);
        let qualitiesSet: Set<string> = new Set(qualitiesSplited);
        return qualitiesSet;
      } else {
        return new Set(["1", "2", "3", "4", "5"]);
      }
    } catch (error) {
      return new Set([qualities]);
    }
  }
  /**
     * @param  {string|undefined} city
     * @returns city[]|undefined
     */
  public static validateCity(city: string): Set<City> {
    if (city) {
      let cityQualities = city.split(",") as City[];
      let citySet: Set<City> = new Set(cityQualities);
      return citySet;
    } else {
      return new Set([
        City.Thetford,
        City.Martlock,
        City.Lymhurst,
        City.Fortsterling,
        City.Bridgewatch,
      ]);
    }
  }
}
