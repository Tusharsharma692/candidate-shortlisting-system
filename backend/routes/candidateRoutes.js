const express = require("express");

const router = express.Router();

const {
  addCandidate,
  getCandidates,
  matchCandidates,
  aiShortlist,
  deleteCandidate,
  updateCandidate
} = require("../controllers/candidateController");



// ADD CANDIDATE

router.post(
  "/candidates",
  addCandidate
);



// GET ALL CANDIDATES

router.get(
  "/candidates",
  getCandidates
);



// MATCH CANDIDATES

router.post(
  "/match",
  matchCandidates
);



// AI SHORTLIST

router.post(
  "/ai/shortlist",
  aiShortlist
);



// DELETE CANDIDATE

router.delete(
  "/candidates/:id",
  deleteCandidate
);



// UPDATE CANDIDATE

router.put(
  "/candidates/:id",
  updateCandidate
);

module.exports = router;