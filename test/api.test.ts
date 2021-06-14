import { assert } from "../deps.ts";
import API from "../src/API/API.ts";
import { City, Order } from "../src/types.ts";

Deno.test("Testing the public API to catch data about a product in one city", async () => {
  let api = new API();
  let result = await api.fetchProduct({
    name: "T4_BAG",
    qualities: new Set(["1", "2"]),
    city: City.Martlock,
  });
});

Deno.test("Testing the public API to catch data about a product in multiple cities", async () => {
  let api = new API();
  let result = await api.fetchProduct({
    name: "T4_BAG",
    qualities: "4",
    city: new Set([City.Martlock, City.Bridgewatch]),
  });
});