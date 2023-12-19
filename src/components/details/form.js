import React from "react";
import "./form.css";
// import DateComp from "./date";
import axios from "axios";
import { validateAge, validateName } from "../../validation/function";
import { useNavigate } from "react-router-dom";

const AdmissionForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("person");
    const dob = formData.get("dob");
    const selectedBatch = formData.get("selectedBatch");
    const gender = formData.get("Gender");

    const age = validateAge(dob);

    //Age Validation
    if (age < 18) {
      alert("Your age is below 18 years");
    } else if (age > 65) {
      alert("Your age is above 65 years");
    } else if (!validateName(name)) {
      alert("Name should only contain Alphabetical Characters");
    } else {
      try {
        const enrollDate = new Date();
        // eslint-disable-next-line
        const response = await axios.post(
          `${process.env.REACT_APP_API}/enroll`,
          {
            name,
            dob,
            selectedBatch,
            Gender: gender,
            enrollmentDate: enrollDate,
          }
        );
        const participantId = response.data._id;
        navigate(`/payment/${participantId}`);
        // console.log(response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="admission-form-container">
      <h1 className="form-heading">Yoga Admission Form</h1>
      <form className="admission-form" onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <label>
          Name:
          <input type="text" name="person" required />
        </label>

        <label>
          Date of Birth:
          <input type="date" name="dob" required />
        </label>

        <label>
          Select Batch:
          <select name="selectedBatch" required>
            <option value="">Select a Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <label>
          Gender:
          <select name="Gender" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default AdmissionForm;
