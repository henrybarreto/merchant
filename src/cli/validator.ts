import { Order } from "../types.ts";

export const orderConverter = (order: String) => order as keyof typeof Order;
export const orderFormatter = (order: String) =>
  order.charAt(0).toUpperCase() + order.slice(1);
export const isValidOrder = (orderToCheck: keyof typeof Order) =>
  Order[orderToCheck] || Order.Price;

export function validateOrder(order: String): Order {
  return order && isValidOrder(orderConverter(orderFormatter(order)));
}
