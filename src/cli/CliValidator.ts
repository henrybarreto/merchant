import { Order } from "../types.ts";

export default class CliValidator {
  public static validateOrder(order: String): Order {
    if(!order) {
      return Order.Price;
    }
    order = order.charAt(0).toUpperCase() + order.slice(1);
    const orderToCheck = order as keyof typeof Order;
    const hasValidOrder = Order[orderToCheck];
    if(!hasValidOrder) {
      return Order.Price;
    }

    return hasValidOrder;
  }
}
