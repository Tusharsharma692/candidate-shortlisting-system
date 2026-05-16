import { useState } from "react";
import axios from "axios";

function CandidateForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://candidate-shortlisting-system-jnq7.onrender.com/api/candidates",
        {
          ...formData,
          skills: formData.skills
            .split(",")
            .map(skill => skill.trim())
        }
      );

      alert("Candidate Added");

      setFormData({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: ""
      });

    } catch (error) {

      console.log(error);

      alert("Error adding candidate");

    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add Candidate
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="skills"
          placeholder="React, Node.js, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="bio"
          placeholder="Candidate Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
        >
          Add Candidate
        </button>

      </form>

    </div>
  );
}

export default CandidateForm;