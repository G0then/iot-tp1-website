export type CustomChartDataType = {
  datasetData?: CustomChartDatasetDataType[];
  xLabel?: string;
  yLabel?: string;
  label?: string;
  unitLabel?: string;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
};

export type CustomChartAnnotationType = {
  id: string;
  xMin?: Date | undefined;
  xMax?: Date | undefined;
  yMin?: number | undefined;
  yMax?: number | undefined;
  backgroundColor?: string | undefined;
  borderColor?: string | undefined;
};

export type CustomChartDatasetDataType = {
    x: Date;
    y: any;
}