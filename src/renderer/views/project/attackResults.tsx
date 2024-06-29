/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { ProjectDetails } from '../../types';
import { AskAi } from '../../components/ai/aiChat';

const records = [
  {
    'template-id': 'xss-deprecated-header',
    'template-path':
      '/Users/kroking/nuclei-templates/http/misconfiguration/xss-deprecated-header.yaml',
    info: {
      name: 'XSS-Protection Header - Cross-Site Scripting',
      author: ['joshlarsen'],
      tags: ['xss', 'misconfig', 'generic'],
      description:
        'Setting the XSS-Protection header is deprecated. Setting the header to anything other than `0` can actually introduce an XSS vulnerability.',
      reference: [
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection',
        'https://owasp.org/www-project-secure-headers/#x-xss-protection',
      ],
      severity: 'info',
      metadata: { 'max-request': 1 },
      classification: {
        'cve-id': null,
        'cwe-id': null,
        'cvss-metrics': 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N',
      },
    },
    type: 'http',
    host: 'hi.new',
    port: '443',
    scheme: 'https',
    url: 'https://hi.new',
    'matched-at': 'https://hi.new',
    'extracted-results': ['1; mode=block'],
    ip: '172.67.133.192',
    timestamp: '2024-06-22T03:54:22.157998+03:00',
    'curl-command':
      "curl -X 'GET' -H 'Accept: */*' -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0' 'https://hi.new'",
    'matcher-status': true,
  },
  {
    'template-id': 'xss-deprecated-header',
    'template-path':
      '/Users/kroking/nuclei-templates/http/misconfiguration/xss-deprecated-header.yaml',
    info: {
      name: 'XSS-Protection Header - Cross-Site Scripting',
      author: ['joshlarsen'],
      tags: ['xss', 'misconfig', 'generic'],
      description:
        'Setting the XSS-Protection header is deprecated. Setting the header to anything other than `0` can actually introduce an XSS vulnerability.',
      reference: [
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection',
        'https://owasp.org/www-project-secure-headers/#x-xss-protection',
      ],
      severity: 'info',
      metadata: {
        'max-request': 1,
      },
      classification: {
        'cve-id': null,
        'cwe-id': null,
        'cvss-metrics': 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N',
      },
    },
    type: 'http',
    host: 'api.hi.new',
    port: '443',
    scheme: 'https',
    url: 'https://api.hi.new',
    'matched-at': 'https://api.hi.new',
    'extracted-results': ['1; mode=block'],
    request:
      'GET / HTTP/1.1\r\nHost: api.hi.new\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62\r\nConnection: close\r\nAccept: */*\r\nAccept-Language: en\r\nAccept-Encoding: gzip\r\n\r\n',
    response:
      'HTTP/1.1 200 OK\r\nConnection: close\r\nTransfer-Encoding: chunked\r\nAccess-Control-Allow-Credentials: true\r\nAlt-Svc: h3=":443"; ma=86400\r\nCf-Cache-Status: DYNAMIC\r\nCf-Ray: 8978444758782a5b-CDG\r\nContent-Security-Policy: default-src https: data: \'unsafe-inline\' \'unsafe-eval\'\r\nContent-Type: text/html; charset=utf-8\r\nDate: Sat, 22 Jun 2024 00:54:22 GMT\r\nNel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}\r\nReferrer-Policy: strict-origin-when-cross-origin\r\nReport-To: {"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v4?s=%2F5Id2ZLinpC37qAamn%2B7RiNq1yw9dNzmUAkXBUOK61mKhOJHY0XfC0ts1OG8qtiLLqpIUAqs1e6Dc38rl389H500ip6MGLIowF3iW3RlFN2ibEwNQ5gUL2GvUtXg"}],"group":"cf-nel","max_age":604800}\r\nServer: cloudflare\r\nStrict-Transport-Security: max-age=31536000; includeSubdomains\r\nVary: Origin\r\nX-Content-Type-Options: nosniff\r\nX-Frame-Options: SAMEORIGIN\r\nX-Powered-By: Express\r\nX-Ratelimit-Limit: 30\r\nX-Ratelimit-Remaining: 17\r\nX-Ratelimit-Reset: 31\r\nX-Xss-Protection: 1; mode=block\r\n\r\nHello World!',
    ip: '104.21.14.16',
    timestamp: '2024-06-22T03:54:22.511454+03:00',
    'curl-command':
      "curl -X 'GET' -H 'Accept: */*' -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62' 'https://api.hi.new'",
    'matcher-status': true,
  },
  {
    'template-id': 'tech-detect',
    'template-path':
      '/Users/kroking/nuclei-templates/http/technologies/tech-detect.yaml',
    info: {
      name: 'Wappalyzer Technology Detection',
      author: ['hakluke', 'righettod'],
      tags: ['tech'],
      severity: 'info',
      metadata: {
        'max-request': 1,
      },
    },
    'matcher-name': 'express',
    type: 'http',
    host: 'api.hi.new',
    port: '443',
    scheme: 'https',
    url: 'https://api.hi.new',
    'matched-at': 'https://api.hi.new',
    request:
      'GET / HTTP/1.1\r\nHost: api.hi.new\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/607.1.40 (KHTML, like Gecko) Version/9.1.2 Safari/607.1.40\r\nConnection: close\r\nAccept: */*\r\nAccept-Language: en\r\nAccept-Encoding: gzip\r\n\r\n',
    response:
      'HTTP/1.1 200 OK\r\nConnection: close\r\nTransfer-Encoding: chunked\r\nAccess-Control-Allow-Credentials: true\r\nAlt-Svc: h3=":443"; ma=86400\r\nCf-Cache-Status: DYNAMIC\r\nCf-Ray: 897848814b9c0da6-MRS\r\nContent-Security-Policy: default-src https: data: \'unsafe-inline\' \'unsafe-eval\'\r\nContent-Type: text/html; charset=utf-8\r\nDate: Sat, 22 Jun 2024 00:57:15 GMT\r\nNel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}\r\nReferrer-Policy: strict-origin-when-cross-origin\r\nReport-To: {"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v4?s=6cObOX6LAj1mkw3EEpsJmtuNyJ88sNJmWoORqzXem1bOYB6uSy0sY9GW8dMxkeVuSTxzTKK%2FxTEZ0YAfgBDmgji%2BGkmPZb%2BxjoPSeBZn7a4NIJXNmN3QaExSZWic"}],"group":"cf-nel","max_age":604800}\r\nServer: cloudflare\r\nStrict-Transport-Security: max-age=31536000; includeSubdomains\r\nVary: Origin\r\nX-Content-Type-Options: nosniff\r\nX-Frame-Options: SAMEORIGIN\r\nX-Powered-By: Express\r\nX-Ratelimit-Limit: 30\r\nX-Ratelimit-Remaining: 25\r\nX-Ratelimit-Reset: 43\r\nX-Xss-Protection: 1; mode=block\r\n\r\nHello World!',
    ip: '104.21.14.16',
    timestamp: '2024-06-22T03:57:15.684221+03:00',
    'curl-command':
      "curl -X 'GET' -H 'Accept: */*' -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/607.1.40 (KHTML, like Gecko) Version/9.1.2 Safari/607.1.40' 'https://api.hi.new'",
    'matcher-status': true,
  },
  {
    'template-id': 'tech-detect',
    'template-path':
      '/Users/kroking/nuclei-templates/http/technologies/tech-detect.yaml',
    info: {
      name: 'Wappalyzer Technology Detection',
      author: ['hakluke', 'righettod'],
      tags: ['tech'],
      severity: 'info',
      metadata: {
        'max-request': 1,
      },
    },
    'matcher-name': 'cloudflare',
    type: 'http',
    host: 'api.hi.new',
    port: '443',
    scheme: 'https',
    url: 'https://api.hi.new',
    'matched-at': 'https://api.hi.new',
    request:
      'GET / HTTP/1.1\r\nHost: api.hi.new\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/607.1.40 (KHTML, like Gecko) Version/9.1.2 Safari/607.1.40\r\nConnection: close\r\nAccept: */*\r\nAccept-Language: en\r\nAccept-Encoding: gzip\r\n\r\n',
    response:
      'HTTP/1.1 200 OK\r\nConnection: close\r\nTransfer-Encoding: chunked\r\nAccess-Control-Allow-Credentials: true\r\nAlt-Svc: h3=":443"; ma=86400\r\nCf-Cache-Status: DYNAMIC\r\nCf-Ray: 897848814b9c0da6-MRS\r\nContent-Security-Policy: default-src https: data: \'unsafe-inline\' \'unsafe-eval\'\r\nContent-Type: text/html; charset=utf-8\r\nDate: Sat, 22 Jun 2024 00:57:15 GMT\r\nNel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}\r\nReferrer-Policy: strict-origin-when-cross-origin\r\nReport-To: {"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v4?s=6cObOX6LAj1mkw3EEpsJmtuNyJ88sNJmWoORqzXem1bOYB6uSy0sY9GW8dMxkeVuSTxzTKK%2FxTEZ0YAfgBDmgji%2BGkmPZb%2BxjoPSeBZn7a4NIJXNmN3QaExSZWic"}],"group":"cf-nel","max_age":604800}\r\nServer: cloudflare\r\nStrict-Transport-Security: max-age=31536000; includeSubdomains\r\nVary: Origin\r\nX-Content-Type-Options: nosniff\r\nX-Frame-Options: SAMEORIGIN\r\nX-Powered-By: Express\r\nX-Ratelimit-Limit: 30\r\nX-Ratelimit-Remaining: 25\r\nX-Ratelimit-Reset: 43\r\nX-Xss-Protection: 1; mode=block\r\n\r\nHello World!',
    ip: '104.21.14.16',
    timestamp: '2024-06-22T03:57:15.68423+03:00',
    'curl-command':
      "curl -X 'GET' -H 'Accept: */*' -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/607.1.40 (KHTML, like Gecko) Version/9.1.2 Safari/607.1.40' 'https://api.hi.new'",
    'matcher-status': true,
  },
];

interface RecordInfo {
  name: string;
  description: string;
  severity: string;
}

interface Record {
  'template-id': string;
  info: RecordInfo;
  url: string;
}

const severityColors = {
  info: 'bg-blue-100 text-blue-800',
  warning: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
  critical: 'bg-purple-100 text-purple-800',
};

const groupByUrl = (records: Record[]) => {
  return records.reduce((acc, record) => {
    const { url } = record;
    if (!acc[url]) {
      acc[url] = [];
    }
    acc[url].push({
      templateId: record['template-id'],
      name: record.info.name,
      description: record.info.description,
      severity: record.info.severity,
    });
    return acc;
  }, {} as RecordGroupedByURL);
};

interface RecordTableProps {
  data: RecordGroupedByURL;
}

const RecordTable: React.FC<RecordTableProps> = ({ data }) => {
  return (
    <div className="p-4">
      {Object.keys(data).map((url) => (
        <div key={url} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{url}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/20 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100/40">
                <tr>
                  <th className="py-2 px-4 border-b">Template ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Ask AI</th>
                  <th className="py-2 px-4 border-b">Severity</th>
                </tr>
              </thead>
              <tbody>
                {data[url].map((record, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{record.templateId}</td>
                    <td className="py-2 px-4">{record.name}</td>
                    <td className="py-2 px-4">{record.description}</td>
                    <td className="py-2 px-4">
                      {record.description && (
                        <AskAi
                          severity={record.severity}
                          input={`${record.description}`}
                        />
                      )}
                    </td>
                    <td
                      className={`py-2 px-4 ${
                        severityColors[record.severity] || ''
                      } rounded-lg text-center`}
                    >
                      {record.severity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
type RecordGroupedByURL = { [url: string]: RecordInfo[] };

const AttacksResults: React.FC = () => {
  const [details, setDetails] = useState<RecordGroupedByURL | undefined>();
  const { projectSlug } = useParams<{ projectSlug: string }>();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await window.electron.ipcRenderer.invoke(
          'get-attack-result',
          projectSlug,
        );
        const groupedData = groupByUrl(res.results);
        setDetails(groupedData);
      } catch (error) {
        console.error('Error fetching attack results:', error);
        // Handle error state or show error message
      }
    };
    getDetails();
  }, [projectSlug]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Attack Results</h1>
      <RecordTable data={details ?? records} />
    </div>
  );
};

export default AttacksResults;
