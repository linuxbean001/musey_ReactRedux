// StripeCheckoutButton.js
import React, { useEffect } from "react";

const StripeCheckout = ({ userId }) => {
  // const navigate = useNavigate();
  console.log("userId", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/create-checkout-session?userid=${userId}`
        );
        const data = await response.json();
        console.log("data", data);
        redirectToStripeCheckout(data.sessionId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const redirectToStripeCheckout = (sessionId) => {
      const stripeScript = document.createElement("script");
      stripeScript.src = "https://js.stripe.com/v3/";
      stripeScript.async = true;

      stripeScript.addEventListener("load", () => {
        const stripe = window.Stripe(
          "pk_test_T4jeeCzO54vjFdEld3ighfil00tzeJwFSc"
        );
        stripe
          .redirectToCheckout({ sessionId })
          .then((result) => {
            // Handle any errors during the redirection if needed
            console.log("Redirect result:", result);
            
            if (result && result.error) {
              console.error("Payment error:", result.error.message);
            } else {
              window.location.href = `http://localhost:3000?session_id=${sessionId}`;
            }
          })
          .catch((error) => {
            console.error("Subscription not activated:", result);
          });
      });

      document.body.appendChild(stripeScript);
    };

    fetchData();
  }, [userId]);

  return <></>; // You can return null or an empty fragment since this component doesn't render anything
};

export default StripeCheckout;
