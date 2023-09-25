import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  // Retrieves ID from URL
  const { id } = useParams();
  // Creating state variable using setOrder in order to hold data
  const [order, setOrder] = useState(null);
  // To track if the order details are loading or not
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Retrieve data from API
        const response = await fetch(`/api/orders/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Received data from API:", data);
          setOrder(data);
          
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
    // Setting the content
  }, [id]);
  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (order) {
    content = <OrderConfirmation order={order} />;
  }
  return <div>{content}</div>;
}

export default ConfirmationPage;
