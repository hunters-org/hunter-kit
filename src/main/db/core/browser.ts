/* eslint-disable import/prefer-default-export */
export class BrowserDB {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async read(): Promise<any | null> {
    try {
      const response = await fetch(this.filePath);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error reading data:', error);
      return null;
    }
  }
}
