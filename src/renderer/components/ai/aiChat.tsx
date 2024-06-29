/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';

import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { Button } from '../ui/button';

const UIofAI: React.FC = ({
  closeModal,
  input,
}: {
  closeModal: Boolean;
  input: string;
}) => {
  const [messages, setMessages] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const userInput = input; // Example of serializable data
      try {
        const response = await window.electron.ipcRenderer.invoke(
          'fetch-data',
          { userInput },
        );
        console.log('Received data:', response);
        setLoading(false);
        setMessages(response.result.response);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Handle errors from the main process
      }
    };

    fetchDataFromApi();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      {loading && (
        <div className="flex justify-center my-10">
          <Loader2 className=" animate-spin" size={36} />
        </div>
      )}
      <div className="max-h-[30rem] overflow-scroll py-2">
        <p key={messages.length}>{messages}</p>
      </div>
      {error && <p>Error: {error}</p>}
      <Button onClick={closeModal}>Close</Button>
    </div>
  );
};

export const AskAi = ({
  input,
  severity,
}: {
  input: string;
  severity: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={openModal}>
            {severity}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Getting info about this vulnerability</DialogTitle>
          </DialogHeader>
          <UIofAI input={input} closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
