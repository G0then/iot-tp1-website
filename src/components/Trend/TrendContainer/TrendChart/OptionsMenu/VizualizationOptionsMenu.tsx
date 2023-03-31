import styles from "./VizualizationOptionsMenu.module.css";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { createTheme, TextFieldProps, ThemeProvider } from "@mui/material";
import { ptPT } from "@mui/material/locale";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ChartTypeSelect } from "../../utils/Select/SelectChartType";
import { chartTypeCombobox } from "../../../../../utils/objects/chartTypeData";
import { ChartDateFormatSelect } from "../../utils/Select/SelectDateFormat";
import { getStartAndStopDateChart } from "../../../../../utils/chart/DateFunctions/getStartAndStopDateChart";
import { DateTime } from "luxon";
import { dateComboboxData, dateTabEnum } from "@/utils/objects/combobox/date";
import { trendState } from "@/components/Device/DeviceChartInfo";

type TrendChartVizualizationOptionsMenuProps = {
  handleChangeTrend: (newState: Partial<trendState>) => void;
  trendState: trendState;
};

//Tema para os dateTimePickers do Material UI
const theme = createTheme(
  {
    // typography: {
    //   fontSize: 12,
    //   fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
    // },
    palette: {
      primary: {
        main: "rgb(63,81,181)",
      },
    },
  },
  ptPT
);

export const TrendChartVizualizationOptionsMenu = ({
  handleChangeTrend,
  trendState,
}: TrendChartVizualizationOptionsMenuProps) => {
  const { ChartType, activeTab, StartDateTime, StopDateTime } = trendState;

  const today = DateTime.fromJSDate(new Date()); //Data atual
  const yesterday = DateTime.fromJSDate(new Date(new Date().setDate(new Date().getDate() - 1))).endOf('day') //Dia anterior ao atual
  // const yesterday = DateTime.fromJSDate(today).startOf('day') //Dia anterior ao atual

  //Cria a lista de views para o datePicker conforme a tab do formato de data ativo
  let viewsList: any[] = ["year"];   
  if (activeTab === dateTabEnum.Month || activeTab === dateTabEnum.Day) {
    viewsList.push("month");
  }
  if (activeTab === dateTabEnum.Day) {
    viewsList.push("day");
  }

  console.log(viewsList)
  console.log(today)
  console.log(yesterday)

  return (
    <div className={styles.mainOptionsContainer}>
      <ChartTypeSelect
        label="Tipo"
        comboboxData={chartTypeCombobox}
        activeItem={ChartType}
        handleChange={(e: any) => {
          handleChangeTrend({ ChartType: e });
        }}
      />
      {/* <ThemeProvider theme={theme}>
        <LocalizationProvider adapterLocale="pt-pt" dateAdapter={AdapterLuxon}>
          <div className={styles.dateContainer}>
            <DatePicker
              showDaysOutsideCurrentMonth //Para mostrar 6 semanas (alguns dias do último mês e alguns dias do mês seguinte)
              views={viewsList}
              label="Data de Ínicio*"
              desktopModeMediaQuery="@media (pointer: fine)" //Conforme a resolução, mostra a versão desktop ou mobile
              renderInput={(params: TextFieldProps) => (
                <TextField {...params} style={{ width: "100%" }} size="small" />
              )}
              maxDate={DateTime.fromMillis(yesterday.toMillis())}
              value={StartDateTime ?? null}
              onChange={(startDateTime: DateTime | null) => {
                const newDate = startDateTime ? 
                  activeTab === dateTabEnum.Day ? 
                    startDateTime :
                    activeTab === dateTabEnum.Month ?  
                      startDateTime.startOf('month') :
                      startDateTime.startOf('year')
                  : null;
                handleChangeTrend({
                  StartDateTime: newDate
                    ?
                    newDate.toString() === "Invalid Date"
                      ? newDate.toString()
                      : newDate.startOf('day').toFormat("yyyy-LL-dd TT")
                    : undefined,
                })
              }
              }
              onError={(reason, value) => {
                true;
              }}
              components={{
                OpenPickerIcon: CalendarMonthIcon,
                LeftArrowIcon: ArrowLeftIcon,
                RightArrowIcon: ArrowRightIcon,
              }}
            />
          </div>
          <div className={styles.dateContainer}>
            <DatePicker
              showDaysOutsideCurrentMonth //Para mostrar 6 semanas (alguns dias do último mês e alguns dias do mês seguinte)
              views={viewsList}
              label="Data de Término*"
              desktopModeMediaQuery="@media (pointer: fine)" //Conforme a resolução, mostra a versão desktop ou mobile
              renderInput={(params: TextFieldProps) => (
                <TextField {...params} style={{ width: "100%" }} size="small" />
              )}
              value={StopDateTime ?? null}
              minDate={
                StartDateTime
                  ? DateTime.fromMillis(new Date(StartDateTime).getTime())
                  : undefined
              }
              maxDate={DateTime.fromMillis(yesterday.toMillis())}
              onChange={(stopDateTime: DateTime | null) => {
                const newDate = stopDateTime ? 
                  activeTab === dateTabEnum.Day ? 
                  stopDateTime :
                    activeTab === dateTabEnum.Month ? 
                    stopDateTime.hasSame(yesterday, 'month') ? yesterday : stopDateTime.endOf('month') :
                    stopDateTime.hasSame(yesterday, 'year') ? yesterday : stopDateTime.endOf('year')
                  : null;
                handleChangeTrend({
                  StopDateTime: newDate
                    ? // ? stopDateTimeString.toISOString()
                    newDate.toString() === "Invalid Date"
                      ? newDate.toString()
                      : newDate.endOf('day').toFormat("yyyy-LL-dd TT") //Altera as horas, minutos e segundos para o fim do dia
                    : undefined,
                })
               }
              }
              components={{
                OpenPickerIcon: CalendarMonthIcon,
                LeftArrowIcon: ArrowLeftIcon,
                RightArrowIcon: ArrowRightIcon,
              }}
            />
          </div>
        </LocalizationProvider>
      </ThemeProvider> */}
      <ChartDateFormatSelect
        label="Filtrar"
        comboboxData={dateComboboxData}
        activeItem={activeTab}
        handleChange={(tab: any) => {
          const newDates = getStartAndStopDateChart(tab, StartDateTime, StopDateTime);
          handleChangeTrend({ activeTab: tab, StartDateTime: newDates[0],  StopDateTime: newDates[1]});
        }}
      />
    </div>
  );
};
