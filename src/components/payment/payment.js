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
    const requestData = {
      ...commonFields,
      paymentMethod: selectedPaymentMethod,
      paymentData,
    };

    try {
      // eslint-disable-next-line
      const response = await axios.post(
        `${process.env.REACT_APP_API}/payment`,
        requestData
      );
      navigate(`/success/${participantId}`);
    } catch (error) {
      // console.error("Error processing payment:", error);
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
