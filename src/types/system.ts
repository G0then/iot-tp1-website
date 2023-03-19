export type SystemNumDocumentsDto = {
    devices: number;
    sensors: number;
    logs: number;
    readings: number;
    alerts: {
        total: number;
        total_cleared: number;
    }
}