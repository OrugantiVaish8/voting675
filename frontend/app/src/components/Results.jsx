import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./results.css";

export default function Results() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:3000/results");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Voting Results</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id} className="text-lg font-medium">
              {candidate.name}: {candidate.votes} votes
            </li>
          ))}
        </ul>
      </div>
      <Link to="/vote" className="mt-4 text-blue-500 hover:underline">
        Back to Voting
      </Link>
    </div>
  );
}
