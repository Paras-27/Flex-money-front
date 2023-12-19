import React, { useState, useEffect } from "react";
import axios from "axios";

import "./success.css"; // Import your CSS file
import { useParams } from "react-router-dom";

const SuccessPage = () => {
  const { participantId } = useParams();
  const [paymentData, setPaymentData] = useState({});
  const [paymentDate, setPaymentDate] = useState();
  const [DOB, setDOB] = useState();
  const [enrollDate, setEnrollDate] = useState();
  const [participantData, setParticipantData] = useState({});

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/payment/${participantId}`
        );
        setPaymentData(response.data[0]);
        if (response.data[0].paymentMethod === "pay-later") {
          let date = response.data[0].payLater.payLaterDate;
          date = date.split("T")[0];
          // console.log(date);
          setPaymentDate(date);
        }
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    const fetchParticipantData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/enroll/${participantId}`
        );
        let dob = response.data.dateOfBirth;
        dob = dob.split("T")[0];
        console.log(dob);
        setDOB(dob);

        let enDate = response.data.enrollmentDate;
        enDate = enDate.split("T")[0];
        setEnrollDate(enDate);
        setParticipantData(response.data);
      } catch (error) {
        console.error("Error fetching participant data:", error);
      }
    };
    fetchPaymentData();
    fetchParticipantData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="success-container">
      <h1>Successfull Registration!</h1>
      <p className="welcome-text">
        Welcome to Yoga Classes, {participantData.name}!
      </p>
      <div className="payment-info">
        <h2>Payment Information:</h2>
        <p>Payment Method: {paymentData.paymentMethod}</p>
        {paymentData.paymentMethod === "card" && (
          <>
            <p>Card Holder: {paymentData.card.holderName}</p>
            <p>Card Number: {paymentData.card.cardNo}</p>
            <p>Amount Paid : ₹500</p>
          </>
        )}
        {paymentData.paymentMethod === "pay-later" && (
          <p>Pay Later Date: {paymentDate}</p>
        )}
        {paymentData.paymentMethod === "upi" && (
          <>
            <p>UPI ID: {paymentData.upiId}</p>
            <p>Amount Paid : ₹500</p>
          </>
        )}
      </div>

      <div className="batch-timing">
        <h2>Your Batch Timing:</h2>
        <p>{participantData.batch}</p>
      </div>

      <div className="personal-info">
        <h2>Your Personal Information:</h2>
        <p>Name: {participantData.name}</p>
        <p>Date of Birth: {DOB}</p>
        <p>Gender: {participantData.gender}</p>
        <p>Enrollment Date: {enrollDate}</p>
      </div>
    </div>
  );
};

export default SuccessPage;
