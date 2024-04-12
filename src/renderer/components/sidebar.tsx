import {
  ActivitySquare,
  ChevronLeftIcon,
  LayoutDashboardIcon,
  PocketKnife,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { DashboardMenu } from '../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface SideBarProps {
  project: string | null;
}

const dashboardMenu: DashboardMenu[] = [
  {
    href: 'dashboard',
    title: 'Dashboard',
    icon: <LayoutDashboardIcon className="mr-2 h-4 w-4" />,
  },
  {
    href: 'recon',
    title: 'RECON',
    icon: <PocketKnife className="mr-2 h-4 w-4" />,
  },
  {
    href: 'attack',
    title: 'Attack',
    Disabled: true,
    icon: <PocketKnife className="mr-2 h-4 w-4" />,
  },
  {
    href: 'interceptor',
    title: 'Interceptor',
    Disabled: true,
    icon: <LayoutDashboardIcon className="mr-2 h-4 w-4" />,
  },

  {
    href: 'jsleaks',
    title: 'JsLeaks',
    icon: <LayoutDashboardIcon className="mr-2 h-4 w-4" />,
  },
];

const resultArch: DashboardMenu[] = [
  {
    href: 'result-recon',
    title: 'RECON',
    icon: <PocketKnife className="mr-2 h-4 w-4" />,
  },
  {
    href: 'attack-result',
    title: 'Attack',
    Disabled: true,
    icon: <PocketKnife className="mr-2 h-4 w-4" />,
  },
  {
    href: 'interceptor-result',
    title: 'Interceptor',
    Disabled: true,
    icon: <LayoutDashboardIcon className="mr-2 h-4 w-4" />,
  },
];

export default function SideBar({ project }: SideBarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="relative flex h-screen w-full max-w-[20rem] flex-col rounded-r-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div className="flex items-center gap-3 p-4 mb-2">
        <Button
          onClick={() => {
            navigate('/projects');
          }}
          className="py-1 px-1 w-fit h-fit bg-white"
          variant="outline"
          size="icon"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {project}
        </h5>
      </div>
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        {dashboardMenu.map((el) => {
          return (
            <Button
              disabled={el.Disabled}
              className={`flex justify-start
              ${pathname.includes(el.href) ? 'bg-secondary text-primary' : ''}
              `}
              variant="ghost"
              onClick={() => {
                navigate(`${el.href}`);
              }}
            >
              {el.icon} {el.title}
            </Button>
          );
        })}
        <Accordion asChild type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex justify-between items-center border-b-0">
              <div className="flex justify-center items-center">
                <ActivitySquare className="mr-2 h-4 w-4" />
                Results
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 w-full">
              {resultArch.map((el) => {
                return (
                  <Button
                    disabled={el.Disabled}
                    className={`flex justify-start w-full
                  ${pathname.includes(el.href) ? 'bg-secondary text-primary' : ''}
                  `}
                    variant="ghost"
                    onClick={() => {
                      navigate(`${el.href}`);
                    }}
                  >
                    {el.icon} {el.title}
                  </Button>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </div>
  );
}
