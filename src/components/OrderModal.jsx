import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!phone.trim() || !/^[\d()-]+$/.test(phone)) {
      newErrors.phone = "Phone number should only contain numbers, '-', or parentheses";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async () => {
    if (!validateForm()) {
      // If this fails, do not submit the data
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          items: order,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/order-confirmation/${data.id}`);
      } else {
        // Handle error on server response
        // For example: setError("Failed to place the order. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      // For example: setError("An error occurred. Please try again later.");
    }
  };

  const errorFields = Object.keys(errors);

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="text"
                id="phone"
              />
              {errors.phone && <div className={styles.error}>{errors.phone}</div>}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="text"
                id="address"
              />
              {errors.address && <div className={styles.error}>{errors.address}</div>}
            </label>
          </div>
        </form>
        {errorFields.length > 0 && (
          <div className={styles.error}>
            Please fix these fields: {errorFields.join(", ")}
          </div>
        )}
        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
