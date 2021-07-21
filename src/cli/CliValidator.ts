import { Order } from "../types.ts";

export default class CliValidator {
  static orderConverter = (order: String) => {
    return order as keyof typeof Order;
  };
  static orderFormatter = (order: String) => {
    return order.charAt(0).toUpperCase() + order.slice(1);
  };
  static isValidOrder = (orderToCheck: keyof typeof Order) => {
    return Order[orderToCheck] || Order.Price;
  };

  public static validateOrder(order: String): Order {
    return order &&
      this.isValidOrder(this.orderConverter(this.orderFormatter(order)));
  }
}
