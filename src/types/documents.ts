export type CountDocumentsDto = {
  alerts: {
    total: number;
    total_cleared: number;
  };
  logs: number;
  readings: number;
  sensors?: number;
  devices?: number;
};
