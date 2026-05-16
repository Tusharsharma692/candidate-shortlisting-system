import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import MatchForm from "./components/MatchForm";
import AIShortlist from "./components/AIShortlist";

function App() {

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">

        <div className="max-w-7xl mx-auto p-6">

          <h1 className="text-4xl font-bold">
            AI Candidate Shortlisting
          </h1>

          <p className="mt-2 text-blue-100">
            Smart AI-powered recruiter dashboard
          </p>

        </div>

      </div>

      {/* Main Layout */}

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <CandidateForm />

        <MatchForm />

        <div className="lg:col-span-2">
          <AIShortlist />
        </div>

        <div className="lg:col-span-2">
          <CandidateList />
        </div>

      </div>

    </div>
  );
}

export default App;