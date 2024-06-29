/* eslint-disable promise/always-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
const url =
  'https://api.cloudflare.com/client/v4/accounts/3cce5a88886b46f56d9ff989b715a588/ai/run/@cf/openchat/openchat-3.5-0106';
const token = 'YbXmqtPZXLgeQSOSjMHC3ka4Qret1QCpQSZXMWCR';

interface Message {
  role: string;
  content: string;
}

interface StreamResponse {
  response: string;
}

export const streamOpenChat = (
  userInput: string,
  onMessage: (message: string) => void,
  onComplete: () => void,
  onError: (error: any) => void,
): void => {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const init: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        stream: true,
        messages: [
          { role: 'system', content: 'You are a web security consultant' },
          { role: 'user', content: userInput },
        ],
      }),
    };

    fetch(url, init)
      .then((response) => {
        if (!response.body) {
          throw new Error('ReadableStream not supported');
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        const readChunk = () => {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                onComplete();
                return;
              }
              const text = decoder.decode(value, { stream: true });
              const lines = text.trim().split('\n');
              lines.forEach((line: string) => {
                if (line.startsWith('data: ')) {
                  try {
                    const jsonData: StreamResponse = JSON.parse(line.slice(6));
                    onMessage(jsonData.response);
                  } catch (error) {
                    console.error('Failed to parse JSON:', error);
                  }
                }
              });
              readChunk();
            })
            .catch((error) => {
              onError(error);
            });
        };

        readChunk();
      })
      .catch((error) => {
        onError(error);
      });
  } catch (error) {
    onError(error);
  }
};
