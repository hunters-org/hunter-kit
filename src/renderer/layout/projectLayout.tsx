/* eslint-disable no-undef */
import { Outlet, useParams } from 'react-router-dom';
import SideBar from '../components/sidebar';

/* eslint-disable import/prefer-default-export */
export function ProjectLayout() {
  const { projectSlug } = useParams();
  return (
    <main className="flex">
      <SideBar project={projectSlug} />
      <section className="container overflow-y-scroll h-[calc(100vh-6rem)] my-10 w-max-screen border-2 mx-2 py-8 px-10">
        <Outlet />
      </section>
    </main>
  );
}
