import { removeDuplicatesInArray } from "@/utils/array/removeDuplicatesInArray";
import { useEffect, useMemo, useState } from "react";
import { CustomChartDataType } from "../../../types/chart";
import { updateCustomChartMultipleAxis } from "../../../utils/chart/MultipleAxis/UpdateMultipleAxis";
import styles from "./AxisMenuOptions.module.css";
import { CustomChartOptionsMainAxis } from "./MainAxisOptions/MainAxisOptions";
import { CustomChartOptionsSingleAxis } from "./SingleAxisOptions/SingleAxisOptions";

export type AxisOptionsState = {
  MultipleAxis: boolean;
  Reverse: boolean;
  MinY: number | undefined;
  MaxY: number | undefined;
  MinMaxValues: boolean;
  AnnotationMinY: number | undefined;
  AnnotationMaxY: number | undefined;
  ControlLines: boolean;
  ListSingleAxisOptions: SingleOptionAxis[];
};

//Objeto default do state de AxisOptions
const getDefaultAxisOptionsState = (datasets: CustomChartDataType[]) => {
  return {
    MultipleAxis: false,
    Reverse: false,
    MinY: undefined,
    MaxY: undefined,
    MinMaxValues: false,
    AnnotationMinY: undefined,
    AnnotationMaxY: undefined,
    ControlLines: false,
    ListSingleAxisOptions: [],
  };
};

export type SingleOptionAxis = {
  AxisId: string;
  Title: string;
  Reverse: boolean;
  MinY: number | undefined;
  MaxY: number | undefined;
  DefaultMinMaxValues: boolean;
  AnnotationMinY: number | undefined;
  AnnotationMaxY: number | undefined;
  ControlLines: boolean;
};

const getDefaultSingleOptionAxis = (axisId: string, title: string) => {
  return {
    AxisId: axisId,
    Title: title,
    Reverse: false,
    MinY: undefined,
    MaxY: undefined,
    DefaultMinMaxValues: true,
    AnnotationMinY: undefined,
    AnnotationMaxY: undefined,
    ControlLines: false,
  };
};

type CustomChartOptionsAxisMenuProps = {
  chartRef: any | null;
  chartType: any;
  datasets: CustomChartDataType[];
};

export const CustomChartOptionsAxisMenu = ({
  chartRef,
  chartType,
  datasets,
}: CustomChartOptionsAxisMenuProps) => {
  const [axisOptionsState, setAxisOptionsState] = useState<AxisOptionsState>(
    () => getDefaultAxisOptionsState(datasets)
  );
  const { MultipleAxis, ListSingleAxisOptions } = axisOptionsState;

  //Hook para alterar os dados do state. Mantém os dados passados e altera os novos enviados. O Partial permite receber nulls
  const handleChangeAxisOptions = (
    newState:
      | Partial<AxisOptionsState>
      | ((newState: AxisOptionsState) => Partial<AxisOptionsState>)
  ) => {
    setAxisOptionsState((currentState) => ({
      ...currentState,
      ...(typeof newState === "function" ? newState(currentState) : newState),
    }));
  };

  //Handler para alterar as propriedades das single options axis
  const changeHandlerSingleAxisOptions = (
    obj: Partial<SingleOptionAxis>,
    index: number
  ) => {
    handleChangeAxisOptions((currentState) => {
      let newListSingleAxisOtions = [...currentState.ListSingleAxisOptions]; //Cria uma copia da lista de condições
      newListSingleAxisOtions[index] = {
        ...newListSingleAxisOtions[index],
        ...obj,
      }; //Altera o antigo objeto condição para o novo com as novas propriedades
      return { ListSingleAxisOptions: newListSingleAxisOtions };
    }); //Altera o state para a nova lista com as condições atualizadas
  };

  //Obtém um array com as unidades únicas dentro dos datasets utilizados no gráfico
  useEffect(() => {
    handleChangeAxisOptions((currentState) => {
      const unitsLabel = datasets.map((item) => item.unitLabel); //Array com as unidades presentes no dataset

      const uniqueUnitLabel = removeDuplicatesInArray(unitsLabel); //Remove as uniaddes duplicadas

      let newList = [...currentState.ListSingleAxisOptions]; //Cria uma lista com os valores das unidades atuais

      //Remover opções que estão a mais e não estão dentro das novas units
      for (const options of currentState.ListSingleAxisOptions) {
        //Se a unidade do estado atual não estiver não está na lista de unidades únicas
        const shouldRemove = !uniqueUnitLabel.some(
          (unit) => unit === options.AxisId
        );
        //Remove
        if (shouldRemove) {
          const optionIndex = newList.indexOf(options);
          if (optionIndex !== -1) {
            newList.splice(optionIndex, 1);
          }
        }
      }

      //Ciclo que percorre todas as labels únicas
      for (const unit of uniqueUnitLabel) {
        //Se a opção ainda não estiver na lista, adiciona
        if (!newList.some((option) => option.AxisId === unit)) {
          newList.push(
            getDefaultSingleOptionAxis(unit as string, unit as string)
          );
        }
      }
      
      

      // if (chartRef.current) {
      //   updateCustomChartMultipleAxis(chartRef.current, datasets, {...currentState, ListSingleAxisOptions: newList,}); //Atualiza os dados e configurações atuais do gráfico
      // }

      return {
        ListSingleAxisOptions: newList,
      };
    });
  }, [chartRef, datasets]);

  //Atualiza as opções do gráfico quando as opções dos eixos dos gráficos mudam ou o tipo de gráfico altera
  useEffect(() => {
    if (chartRef.current) {
      updateCustomChartMultipleAxis(chartRef.current, datasets, axisOptionsState); //Atualiza os dados e configurações atuais do gráfico
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axisOptionsState, chartType]);

  return (
    <div className={styles.conditionsContainer}>
      <div className={styles.dataContainer}>
        <CustomChartOptionsMainAxis 
          axisOptionsState={axisOptionsState}
          handleChangeAxisOptions={handleChangeAxisOptions}
        />

        {MultipleAxis &&
          ListSingleAxisOptions.map((unitLabel, index: number) => {
            if (unitLabel) {
              return (
                <CustomChartOptionsSingleAxis
                  key={index}
                  index={index}
                  unitLabel={unitLabel}
                  changeHandler={changeHandlerSingleAxisOptions}
                />
              );
            }
          })}
      </div>
    </div>
  );
};
