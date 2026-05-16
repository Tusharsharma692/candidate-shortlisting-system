import { useState } from "react";
import axios from "axios";

function MatchForm() {

  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {

    setLoading(true);

    try {

      const response = await axios.post(
        "https://candidate-shortlisting-system-jnq7.onrender.com/api/match",
        {
          requiredSkills: skills
            .split(",")
            .map(skill => skill.trim()),

          minExperience: Number(experience)
        }
      );

      setResults(response.data);

    } catch (error) {

      console.log(error);

      alert("Error matching candidates");

    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Match Candidates
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="React, Node.js"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          placeholder="Minimum Experience"
          value={experience}
          onChange={(e) =>
            setExperience(e.target.value)
          }
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleMatch}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg font-semibold"
        >
          {
            loading
              ? "Matching..."
              : "Match Candidates"
          }
        </button>

      </div>

      <div className="mt-6 space-y-4">

        {
          results.map((candidate) => (

            <div
              key={candidate._id}
              className="border rounded-xl p-5 hover:shadow-md transition"
            >

              <div className="flex justify-between items-center">

                <h3 className="text-xl font-bold">
                  {candidate.name}
                </h3>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  {candidate.matchScore.toFixed(0)}%
                </span>

              </div>

              <p className="mt-3 text-gray-600">
                Experience:
                {" "}
                {candidate.experience} years
              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                {
                  candidate.matchedSkills.map((skill, index) => (

                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>

                  ))
                }

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default MatchForm;