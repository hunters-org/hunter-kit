import { useParams } from 'react-router-dom';

/* eslint-disable import/prefer-default-export */
export function Recon() {
  const { projectSlug } = useParams();
  return <h1>{projectSlug}</h1>;
}
