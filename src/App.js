import { Routes, Route } from "react-router-dom";
import AdmissionForm from "./components/details/form";
import Payment from "./components/payment/payment";
import Success from "./components/success/success";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdmissionForm />} />
        <Route path="/payment/:participantId" element={<Payment />} />
        <Route path="/success/:participantId" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
