import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([{
  name: "",
  login: "",
  location: "",
  avatar_url: "",
  email: "",
  html_url: "",
  bio: "",
  company: ""
}]);

const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadCandidates = async () => {
      const users = await searchGithub();
      const profiles = await Promise.all(users.map((u: any) => searchGithubUser(u.login)));
      setCandidates(profiles);
    };
    loadCandidates();
  }, []);

const save = () => {
  const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  saved.push(candidates[index]);
  localStorage.setItem('savedCandidates', JSON.stringify(saved));
  skip();
};

const skip = () => setIndex(i => i + 1);

if (candidates.length === 0 || index>= candidates.length) {
return <p>No more candidates to review.</p>;
}
const c = candidates[index];

return (
  <div>
    <h2>{c.name || 'No Name'} ({c.login})</h2>
    <img src={c.avatar_url} alt={c.name} width="100" />
    <p>Location: {c.location}</p>
    <p>Email: {c.email || 'N/A'}</p>
    <p>GitHub: <a href={c.html_url} target="_blank" rel="noreferrer">{c.html_url}</a></p>
    <p>Company: {c.company || 'N/A'}</p>
    <button onClick={save}>+</button>
    <button onClick={skip}>-</button>
  </div>
);
};

export default CandidateSearch;
