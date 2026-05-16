import { useEffect, useState } from "react";

import axios from "axios";

function CandidateList() {

  const [candidates, setCandidates] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [skillFilter, setSkillFilter] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      name: "",
      email: "",
      experience: "",
      bio: ""
    });



  // FETCH CANDIDATES

  useEffect(() => {

    fetchCandidates();

  }, []);

  const fetchCandidates = async () => {

    try {

      const response = await axios.get(
        "https://candidate-shortlisting-system-jnq7.onrender.com/api/candidates"
      );

      setCandidates(response.data);

    } catch (error) {

      console.log(error);

    }
  };



  // DELETE CANDIDATE

  const deleteCandidate = async (id) => {

    try {

      await axios.delete(
        `https://candidate-shortlisting-system-jnq7.onrender.com/api/candidates/${id}`
      );

      fetchCandidates();

    } catch (error) {

      console.log(error);

    }
  };



  // START EDIT

  const startEdit = (candidate) => {

    setEditingId(candidate._id);

    setEditData({
      name: candidate.name,
      email: candidate.email,
      experience: candidate.experience,
      bio: candidate.bio
    });
  };



  // UPDATE CANDIDATE

  const updateCandidate = async (id) => {

    try {

      await axios.put(
        `https://candidate-shortlisting-system-jnq7.onrender.com/api/candidates/${id}`,
        editData
      );

      setEditingId(null);

      fetchCandidates();

    } catch (error) {

      console.log(error);

    }
  };



  // FILTER LOGIC

  const filteredCandidates =
    candidates.filter((candidate) => {

      const candidateSkills =
        Array.isArray(candidate.skills)
          ? candidate.skills
          : String(candidate.skills).split(",");

      const matchesSearch =
        candidate.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSkill =
        skillFilter === ""
        ||
        candidateSkills.some((skill) =>
          skill
            .trim()
            .toLowerCase()
            .includes(
              skillFilter.toLowerCase()
            )
        );

      return matchesSearch && matchesSkill;
    });



  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h2 className="text-2xl font-bold">
          Candidate Database
        </h2>

        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Filter by skill"
            value={skillFilter}
            onChange={(e) =>
              setSkillFilter(e.target.value)
            }
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

      </div>



      {/* CANDIDATE CARDS */}

      <div className="grid md:grid-cols-2 gap-4">

        {
          filteredCandidates.map((candidate) => (

            <div
              key={candidate._id}
              className="border rounded-xl p-5 bg-gray-50 hover:shadow-md transition"
            >

              {/* NAME */}

              {
                editingId === candidate._id ? (

                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        name: e.target.value
                      })
                    }
                    className="border p-2 rounded w-full"
                  />

                ) : (

                  <h3 className="text-xl font-bold text-gray-800">
                    {candidate.name}
                  </h3>

                )
              }



              {/* EMAIL */}

              {
                editingId === candidate._id ? (

                  <input
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        email: e.target.value
                      })
                    }
                    className="border p-2 rounded w-full mt-3"
                  />

                ) : (

                  <p className="text-gray-500 mt-2">
                    {candidate.email}
                  </p>

                )
              }



              {/* SKILLS */}

              <div className="flex flex-wrap gap-2 mt-4">

                {
                  (
                    Array.isArray(candidate.skills)
                      ? candidate.skills
                      : String(candidate.skills)
                          .split(",")
                  ).map((skill, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>

                  ))
                }

              </div>



              {/* EXPERIENCE */}

              {
                editingId === candidate._id ? (

                  <input
                    type="number"
                    value={editData.experience}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        experience: e.target.value
                      })
                    }
                    className="border p-2 rounded w-full mt-4"
                  />

                ) : (

                  <p className="mt-4 font-medium">
                    Experience:
                    {" "}
                    {candidate.experience} years
                  </p>

                )
              }



              {/* BIO */}

              {
                editingId === candidate._id ? (

                  <textarea
                    value={editData.bio}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        bio: e.target.value
                      })
                    }
                    className="border p-2 rounded w-full mt-4"
                  />

                ) : (

                  <p className="mt-2 text-gray-600">
                    {candidate.bio}
                  </p>

                )
              }



              {/* BUTTONS */}

              <div className="flex gap-3 mt-5">

                {
                  editingId === candidate._id ? (

                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      onClick={() =>
                        updateCandidate(
                          candidate._id
                        )
                      }
                    >
                      Save
                    </button>

                  ) : (

                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      onClick={() =>
                        startEdit(candidate)
                      }
                    >
                      Edit
                    </button>

                  )
                }

                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() =>
                    deleteCandidate(candidate._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default CandidateList;