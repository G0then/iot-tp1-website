import { Bar, Doughnut, Line, PolarArea, Radar, Scatter, Bubble, Pie } from "react-chartjs-2";
import {
  AiFillPieChart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineDotChart,
  AiOutlineLineChart,
  AiOutlineRadarChart,
} from "react-icons/ai";
import { RiDonutChartFill } from "react-icons/ri";
import { CustomChartDataType } from "../../types/chart.dto";
import { barChartOptions } from "../chart/objects/barChartOptions";
import { bubbleChartOptions } from "../chart/objects/bubbleChartOptions";
import { doughnutChartOptions } from "../chart/objects/doughnutChartOptions";
import { lineChartOptions } from "../chart/objects/lineChartOptions";
import { pieChartOptions } from "../chart/objects/pieChartOptions";
import { polarAreaChartOptions } from "../chart/objects/polarAreaChartOptions";
import { radarChartOptions } from "../chart/objects/radarChartOptions";

export type chartTypeDto = {
  ChartType: any;
  displayName: string;
  Icon?: React.ElementType;
  chartOptions?: (datasets: CustomChartDataType[], timeFormat:chartDateTypeFormatDto, title?: string, timeLabels?: Date[]) => any;
};

export type chartDateTypeFormatDto = {
  unit: string,
  format: string
}

//Objeto com os tipos de gráficos do chartjs
export const chartTypeCombobox: chartTypeDto[] = [
  {
    ChartType: Line,
    chartOptions: (datasets, timeFormat, title) => lineChartOptions(datasets, timeFormat, title),
    displayName: "Linhas",
    Icon: AiOutlineLineChart,
  },

  {
    ChartType: Bar,
    chartOptions: (datasets, timeFormat, title) => barChartOptions(datasets, timeFormat, title),
    displayName: "Barras",
    Icon: AiOutlineBarChart,
  },

  {
    ChartType: Pie,
    chartOptions: (datasets, timeFormat, title) => pieChartOptions(datasets, timeFormat, title),
    displayName: "Circular",
    Icon: AiFillPieChart,
  },

  {
    ChartType: Doughnut,
    chartOptions: (datasets, timeFormat, title) => doughnutChartOptions(datasets, timeFormat, title),
    displayName: "Donut",
    Icon: RiDonutChartFill,
  },

  {
    ChartType: PolarArea,
    chartOptions: (datasets, timeFormat, title, timeLabels) => polarAreaChartOptions(datasets, timeFormat, title, timeLabels),
    displayName: "PolarArea",
    Icon: AiOutlineAreaChart,
  },

  {
    ChartType: Radar,
    chartOptions: (datasets, timeFormat, title, timeLabels) => radarChartOptions(datasets, timeFormat, title, timeLabels),
    displayName: "Radar",
    Icon: AiOutlineRadarChart,
  },

  {
    ChartType: Bubble,
    chartOptions: (datasets, timeFormat, title) => bubbleChartOptions(datasets, timeFormat, title),
    displayName: "Bubble",
    Icon: AiOutlineDotChart,
  },
];