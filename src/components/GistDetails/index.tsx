import { useParams } from 'react-router';

function GistDetails() {
  const { id } = useParams();
  return <div>GistDetails {id}</div>;
}

export default GistDetails;
