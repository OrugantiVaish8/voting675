import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login.jsx";
import VotingApp from "./components/voting.jsx";
import Results from "./components/Results.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/vote" element={<VotingApp />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}
