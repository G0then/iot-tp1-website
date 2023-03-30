import { CustomChartAnnotationType } from "../../../types/chart";
import { chartOptionsDataDto } from "../objects/defaultOptions";

//Adiciona annotations defaults ao gráfico
export const addCustomChartAnnotation = (
  annotations: CustomChartAnnotationType[],
  chartOptionsData: any
) => {
  const { chartTypeData, chartTypeOptions } = chartOptionsData;

  //#################OPÇÕES#################

  //Objeto com as novas opções do gráfico
  let newOptions: any = {...chartTypeOptions};

  annotations.map((annotation, index: number) => {
    const optionUpdated = {
      ...newOptions,
      plugins: {
        ...newOptions.plugins,
        annotation: {
          ...newOptions.plugins.annotation,
          annotations: {
            ...newOptions.plugins.annotation?.annotations,
            [annotation.id]: {
              display: true,
              type: "box",
              adjustScaleRange: false, //Faz com que o gráfico se ajuste à annotation se a mesma for superior/inferior aos limites do dataset
              yScaleID: 'y',
              yMin: annotation.yMin
                ? annotation.yMin
                : undefined,
              yMax: annotation.yMax
                ? annotation.yMax
                : undefined,
              xMin: annotation.xMin
                ? annotation.xMin
                : undefined,
              xMax: annotation.xMax
                ? annotation.xMax
                : undefined,
              backgroundColor: annotation.backgroundColor ?? "rgba(0,0,0,0.1)",
              borderColor: annotation.borderColor
            },
          },
        },
      },
    };

    newOptions = optionUpdated; //Atualiza o objeto com as novas configurações "newOptions" a cada iteração
  });

  const newChartOptionsData: chartOptionsDataDto = {
    chartTypeOptions: newOptions,
    chartTypeData: chartTypeData,
  };

  return newChartOptionsData;
};
