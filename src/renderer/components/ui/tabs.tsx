/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import { FC, ReactNode } from 'react';
import { useTabs } from '../hooks/useTabs';

interface ViewTabsProps {
  ScreensComponent: ReactNode;
  ParamsComponent: ReactNode;
  SubComponent: ReactNode;
  LiveComponent: ReactNode;
}

const ReconTabs: FC<ViewTabsProps> = (props) => {
  const { tab, SubTab, LiveTab, ParamTab, ScreenTab } = useTabs();

  return (
    <div className="">
      <div className="hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-500/20 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-10 flex justify-center  ">
        <nav
          className="inline-flex gap-4 px-2 py-2 bg-gray-500/5 border border-gray-100/10 rounded-md p-1"
          aria-label="Tabs"
        >
          <button
            onClick={SubTab}
            className={` ${
              tab === 'SUB'
                ? 'bg-gray-500/10 transition-all duration-300 text-white border flex justify-center items-center border-gray-500/25 '
                : 'hover:text-white flex justify-center items-center text-gray-500 font-medium'
            }
            rounded-md px-4 py-2 font-bold text-sm space-x-2`}
            aria-current="page"
          >
            <span>Sub-domains</span>
          </button>
          <button
            onClick={LiveTab}
            className={` ${
              tab === 'LIVESUB'
                ? 'bg-gray-500/10 transition-all duration-300 text-white border flex justify-center items-center border-gray-500/25 '
                : 'hover:text-white flex justify-center items-center text-gray-500 font-medium'
            }
            rounded-md px-4 py-2 font-bold text-sm space-x-2`}
            aria-current="page"
          >
            <span>Live Sub-domains</span>
          </button>
          <button
            onClick={ScreenTab}
            className={` ${
              tab === 'SCREEN'
                ? 'bg-gray-500/10 transition-all duration-300 text-white border flex justify-center items-center border-gray-500/25 '
                : 'hover:text-white flex justify-center items-center text-gray-500 font-medium'
            }
            rounded-md px-4 py-2 font-bold text-sm space-x-2`}
            aria-current="page"
          >
            <span>Screenshots</span>
          </button>
          <button
            onClick={ParamTab}
            className={` ${
              tab === 'PARAMS'
                ? 'bg-gray-500/10 transition-all duration-300 text-white border flex justify-center items-center border-gray-500/25 '
                : 'hover:text-white flex justify-center items-center text-gray-500 font-medium'
            }
            rounded-md px-4 py-2 font-bold text-sm space-x-2`}
            aria-current="page"
          >
            <span>Params</span>
          </button>
        </nav>
      </div>
      <div className=" overflow-y-hidden">
        {tab === 'SUB'
          ? props.SubComponent
          : tab === 'LIVESUB'
            ? props.LiveComponent
            : tab === 'PARAMS'
              ? props.ParamsComponent
              : props.ScreensComponent}
      </div>
    </div>
  );
};

export default ReconTabs;
