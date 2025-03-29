// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  readonly name: string;
  readonly login: string;
  readonly location: string;
  readonly avatar_url: string;
  readonly email: string | null;
  readonly html_url: string;
  readonly bio: string;
  readonly company: string | null;
}
export default Candidate;