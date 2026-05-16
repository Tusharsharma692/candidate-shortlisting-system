const Candidate = require("../models/Candidate");

const axios = require("axios");



// ADD CANDIDATE

exports.addCandidate = async (req, res) => {

  try {

    const candidate =
      await Candidate.create(req.body);

    res.status(201).json(candidate);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};



// GET ALL CANDIDATES

exports.getCandidates = async (req, res) => {

  try {

    const candidates =
      await Candidate.find();

    res.json(candidates);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};



// MATCH CANDIDATES

exports.matchCandidates = async (req, res) => {

  try {

    const {
      requiredSkills,
      minExperience
    } = req.body;

    const candidates =
      await Candidate.find();

    const matched =
      candidates

        .map((candidate) => {

          const candidateSkills =
            Array.isArray(candidate.skills)
              ? candidate.skills
              : String(candidate.skills)
                  .split(",");

          const matchedSkills =
            candidateSkills.filter(
              (skill) =>
                requiredSkills.includes(
                  skill.trim()
                )
            );

          const score =
            (
              matchedSkills.length
              /
              requiredSkills.length
            ) * 100;

          return {

            ...candidate._doc,

            matchedSkills,

            matchScore: score

          };

        })

        .filter(
          (candidate) =>
            candidate.experience
            >=
            minExperience
        )

        .sort(
          (a, b) =>
            b.matchScore - a.matchScore
        );

    res.json(matched);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};



// AI SHORTLIST

exports.aiShortlist = async (req, res) => {

  console.log("AI Route Hit");

  try {

    const candidates =
      await Candidate.find();

    const prompt = `
You are a professional AI recruiter.

Analyze all candidates carefully and rank the best candidates for the job.

Required Skills:
${req.body.requiredSkills.join(", ")}

Candidates:
${candidates.map((c, i) =>
`
Candidate ${i + 1}

Name: ${c.name}

Skills: ${
  Array.isArray(c.skills)
    ? c.skills.join(", ")
    : c.skills
}

Experience: ${c.experience} years

Bio: ${c.bio}
`
).join("\n")}

Instructions:

1. Rank candidates from best to worst.

2. Give each candidate a match score out of 100.

3. Explain clearly why each candidate is suitable.

4. Use professional recruiter language.

5. Use headings and bullet points.

6. Keep formatting clean and readable.

7. Start with:
🏆 Top Recommended Candidates
`;



    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-4o-mini",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },

      {
        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",

          "HTTP-Referer":
            "http://localhost:3000",

          "X-Title":
            "Candidate Shortlisting System"

        }
      }
    );

    console.log(response.data);

    res.json(response.data);

  } catch (error) {

    console.log(
      error.response?.data
      ||
      error.message
    );

    res.status(500).json({

      error:
        error.response?.data
        ||
        error.message

    });

  }
};



// UPDATE CANDIDATE

exports.updateCandidate = async (req, res) => {

  try {

    const updatedCandidate =
      await Candidate.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.json(updatedCandidate);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};



// DELETE CANDIDATE

exports.deleteCandidate = async (req, res) => {

  try {

    await Candidate.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Candidate deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};