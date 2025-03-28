import { useEffect, useState } from 'react';

interface Candidate {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  email: string | null;
  html_url: string;
  company: string | null;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted yet.</p>
      ) : (
        savedCandidates.map((candidate, index) => (
          <div key={index} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
            <h2>{candidate.name} ({candidate.login})</h2>
            <img src={candidate.avatar_url} alt={candidate.name} width="100" />
            <p><strong>Location:</strong> {candidate.location}</p>
            <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
            <p><strong>GitHub:</strong> <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a></p>
            <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;
