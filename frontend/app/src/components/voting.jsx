import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./voting.css";

export default function VotingApp() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const vote = async (candidateName) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/vote", { candidate: candidateName });
      fetchResults();
    } catch (error) {
      console.error("Error voting:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold ">Voting Application</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Vote for your Candidate</h2>
        <div className="space-y-2">
          {candidates.map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => vote(candidate.name)}
              disabled={loading}
              className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {candidate.name}
            </button>
          ))}
        </div>
      </div>
      <Link to="/results" className="mt-4 text-blue-500 hover:underline">
        View Results
      </Link>
    </div>
  );
}
