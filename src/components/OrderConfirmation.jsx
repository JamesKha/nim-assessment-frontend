import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  // Creating the receipt box with style
  return (
    <div className={styles.receipt}>
      <h1>Order Confirmation</h1>
      <p>Thank you for your order</p>
      <div className={styles["customer-info"]}>
        <p>
          <b>Customer&apos;s Name: </b>
          {order.name}
        </p>
        <p>
          <b>Customer&apos;s Address: </b>
          {order.address}
        </p>
      </div>
      <h1>Your ordered items:</h1>
      <div className={styles["ordered-items"]}>
        {order.items.map((orderItem) => (
          // eslint-disable-next-line no-underscore-dangle
          <div key={orderItem.item._id}>
            <b>{orderItem.item.name}</b> - ${orderItem.item.price}(Quantity:{" "}
            {orderItem.quantity})
          </div>
        ))}
      </div>
      <p>
        <b>Order ID:</b> {order.id}
      </p>
    </div>
  );
}

export default OrderConfirmation;
