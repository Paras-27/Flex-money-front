import React, { useState } from "react";
import { month, year } from "../date";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const months = month();
  const years = year();
  const { participantId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(participantId);
    // console.log(years);
    const formData = new FormData(e.target);

    const selectedPaymentMethod = formData.get("paymentMethod");
    const commonFields = {
      participant: participantId,
    };

    // Extract payment method-specific fields
    let paymentData = {};
    if (selectedPaymentMethod === "card") {
      paymentData = {
        holderName: formData.get("holderName"),
        cardNumber: formData.get("cardNumber"),
        cvv: formData.get("cvv"),
      };
    } else if (selectedPaymentMethod === "upi") {
      paymentData = {
        upiId: formData.get("upiId"),
      };
    } else if (selectedPaymentMethod === "pay-later") {
      paymentData = {
        paylaterDate: formData.get("paylaterDate"),
      };
    }
    // Combine common and payment method-specific data
    const requestData = {
      ...commonFields,
      paymentMethod: selectedPaymentMethod,
      paymentData,
    };
    console.log(paymentData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/payment`,
        requestData
      );
      console.log(response.data);
      navigate(`/success/${participantId}`);
      // Add any additional logic based on the response if needed
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle errors, show messages, etc.
    }
  };
  return (
    <div>
      <div className="admission-form-container">
        <h1 className="form-heading">Yoga Admission Form</h1>
        <form className="admission-form" onSubmit={handleSubmit}>
          <h2>
            Payment of ₹500 for month of {months} {years}
          </h2>
          <label>
            Select Payment Method:
            <select
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="pay-later">Pay Later</option>
            </select>
          </label>

          {/* Additional fields for card payment */}
          {paymentMethod === "card" && (
            <>
              <label>
                Card HolderName:
                <input type="text" name="holderName" required />
              </label>
              <label>
                Card Number:
                <input type="text" name="cardNumber" required />
              </label>

              <label>
                CVV:
                <input type="password" name="cvv" required />
              </label>
            </>
          )}

          {paymentMethod === "upi" && (
            <>
              <label>
                UPI ID:
                <input type="text" name="upiId" required />
              </label>
            </>
          )}
          {paymentMethod === "pay-later" && (
            <>
              <label>
                When will you pay in this month:
                <input type="date" name="paylaterDate" required />
              </label>
            </>
          )}

          <button type="submit">Pay</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
