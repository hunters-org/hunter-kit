/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
import { Button } from '@primer/react-brand';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export function Banner() {
  const getPath = window.electron.ipcRenderer.sendSync('get-project-dir');

  const HandleClick = async () => {
    window.electron.ipcRenderer.sendMessage('subfinder-process', {
      domain: 'zjunior.com',
      folderPath: `${getPath}/zjunior`,
    });
  };
  return (
    <div className="relative isolate overflow-hidden">
      <svg
        className="absolute inset-0 z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div className="relative z-30">
        <div className="mt-24 lg:mt-0 lg:min-h-screen relative flex items-center flex-col justify-center py-12 px-6 lg:px-8 sm:mx-auto sm:w-full md:max-w-4xl">
          <div className="text-center bg-gray-800/20 rounded-lg p-12 py-16 border border-white/5 mt-6 md:mt-8 backdrop-blur-sm">
            <h2 className="text-center inline-block text-3xl md:text-5xl tracking-tight leading-8 md:leading-10 font-bold lg:text-6xl text-white/80">
              Hunter kit for security attacks
            </h2>
            <p className="text-center leading-6 my-8 font-medium sm:mx-auto sm:w-full sm:max-w-lg">
              All what you need to pentest websites, and build several attacks
              in on hunter kit.
            </p>
            <div className="flex justify-center gap-10">
              <Link to="/dashboard">
                <Button variant="primary">Dashboard</Button>
              </Link>
              <button onClick={HandleClick}>{getPath}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
