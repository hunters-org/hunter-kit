/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
export function extractSubdomains(originDomain: string) {
  const subdomains = new Set();
  const parts = originDomain.split('.');

  for (let i = 0; i < parts.length - 2; i++) {
    const subdomain = parts.slice(i).join('.');
    subdomains.add(subdomain);
  }

  return Array.from(subdomains) as string[];
}
export function textToArray(text: string) {
  const lines = text.split('\n');
  return lines.map((line) => {
    return { domain: line.trim() };
  });
}
