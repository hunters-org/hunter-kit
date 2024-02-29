/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { ReconTabs } from '../../types';

export const useTabs = () => {
  const [tab, setTab] = useState<ReconTabs>('SUB');

  const SubTab = () => {
    setTab('SUB');
  };
  const ScreenTab = () => {
    setTab('SCREEN');
  };
  const LiveTab = () => {
    setTab('LIVESUB');
  };
  const ParamTab = () => {
    setTab('PARAMS');
  };
  return { SubTab, LiveTab, ParamTab, ScreenTab, tab };
};
