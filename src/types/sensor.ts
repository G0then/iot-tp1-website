export type SensorDto = {
    pid: string;
    calibrate: string | number;
    config: string;
    description: string;
    name: string;
    status: string;
    unit: string;
    unit_name: string;
    minAlertValue?: number | null;
    maxAlertValue?: number | null;
}