// StripeCheckoutButton.js
import React, { useEffect } from "react";
import "./Stripe.css";

const StripeCheckout = ({ userId }) => {


  //**********Submit Section************//
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://musey.ai/api/create-checkout-session?userid=${userId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

      if (data.sessionId) {
        redirectToStripeCheckout(data.sessionId);
      } else {
        console.error("Invalid sessionId received:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //**********Submit Section************//
  

  //*************Redirect Section****************//
  const redirectToStripeCheckout = (sessionId) => {
    const stripeScript = document.createElement("script");
    stripeScript.src = "https://js.stripe.com/v3/";
    stripeScript.async = true;

    stripeScript.addEventListener("load", () => {
      // alert("Stripe script loaded.");

      const stripe = window.Stripe(
        "pk_live_51NfBerKd1jlKELx0VhjYn5Jk3urrinbaTdhz77jZS3JJCHh5Zn2Q2lrynhtb5OzEFGpXL7AZJIn649aBPQaVUuwT00oqHQuSO2"
      );

      // alert("Redirecting to Checkout...");
      stripe
        .redirectToCheckout({ sessionId })
        .then((result) => {
          // Handle the redirection result
          console.log("Redirect result:", result);
          // alert("hii");

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
  //*************Redirect Section****************//


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
