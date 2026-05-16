import { useState } from "react";

import axios from "axios";

function AIShortlist() {

  const [skills, setSkills] =
    useState("");

  const [aiResponse, setAiResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);



  const handleAIShortlist = async () => {

    setLoading(true);

    try {

      const response = await axios.post(
        "https://candidate-shortlisting-system-jnq7.onrender.com/api/ai/shortlist",
        {
          requiredSkills: skills
            .split(",")
            .map(skill => skill.trim())
        }
      );

      const content =
        response.data?.choices?.[0]?.message?.content
        ||
        response.data?.choices?.[0]?.text
        ||
        "No AI response received";

      setAiResponse(content);

    } catch (error) {

      console.log(error);

      alert("AI Shortlisting Failed");

    }

    setLoading(false);
  };



  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* TITLE */}

      <h2 className="text-2xl font-bold mb-6">
        AI Candidate Shortlisting
      </h2>



      {/* INPUT SECTION */}

      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="React, Node.js, MongoDB"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleAIShortlist}
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-lg font-semibold"
        >
          {
            loading
              ? "Generating..."
              : "AI Shortlist"
          }
        </button>

      </div>



      {/* AI RESPONSE */}

      <div className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border shadow-sm">

        <h3 className="text-xl font-bold mb-4 text-gray-800">
          AI Recruiter Analysis
        </h3>

        {
          aiResponse ? (

            <div className="whitespace-pre-wrap text-gray-700 leading-8">

              {aiResponse}

            </div>

          ) : (

            <p className="text-gray-500">
              AI recommendations will appear here...
            </p>

          )
        }

      </div>

    </div>
  );
}

export default AIShortlist;