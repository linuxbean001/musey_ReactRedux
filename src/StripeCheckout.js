// StripeCheckoutButton.js
import React, { useEffect } from "react";
import "./Stripe.css";

const StripeCheckout = ({ userId }) => {
  const redirectToStripeCheckout = (sessionId) => {
    const stripeScript = document.createElement("script");
    stripeScript.src = "https://js.stripe.com/v3/";
    stripeScript.async = true;

    stripeScript.addEventListener("load", () => {
      // alert("Stripe script loaded.");

      const stripe = window.Stripe(
        "pk_test_51MniNtSGd0ho6TQXHQ8Puew9Z1Mk1WVkXRruOE4g58O8U5tdTWZsgWXjTAhH9RmWSgta4USqjd8NupY3KMtXXsFF00DBojq5zE"
      );

      // alert("Redirecting to Checkout...");
      stripe
        .redirectToCheckout({ sessionId })
        .then((result) => {
          // Handle the redirection result
          console.log("Redirect result:", result);
          // alert("hii")

          if (result.error) {
            alert("Payment error:", result.error.message);
          } else {
            alert("Payment successful!");
          }
        })
        .catch((error) => {
          console.error("Subscription not activated:", error);
        });
    });

    document.body.appendChild(stripeScript);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/create-checkout-session?userid=${userId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("data", data);

      if (data.sessionId) {
        redirectToStripeCheckout(data.sessionId);
      } else {
        console.error("Invalid sessionId received:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubscription = () => {
    fetchData();
  };

  return (
    <div className="center-container">
      <div className="columns">
        <ul className="price">
          <li className="header">Subscribe to Pro Plan</li>
          <li className="grey">
            <b>$</b> 7.00 per/month
          </li>
          <li className="grey">10GB Storage</li>
          <li className="grey">10 Emails</li>
          <li className="grey">10 Domains</li>
          <li className="grey">1GB Bandwidth</li>
          <li className="grey">
            <a href="#" className="button" onClick={handleSubscription}>
              Subscription
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StripeCheckout;
