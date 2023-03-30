import { AxisOptionsState } from "../../../components/CustomChart/AxisMenuOptions/AxisMenuOptions";
import { CustomChartDataType } from "../../../types/chart";
import { updateCustomChartConfigByMutating } from "../UpdateChart/Settings";

export const updateCustomChartMultipleAxis = (
  chart: any,
  datasets: CustomChartDataType[],
  axisOptions: AxisOptionsState
) => {
  const {
    MultipleAxis,
    Reverse,
    MinY,
    MaxY,
    MinMaxValues,
    AnnotationMinY,
    AnnotationMaxY,
    ControlLines,
    ListSingleAxisOptions,
  } = axisOptions;

  //#################DADOS#################

  //Loop que percorre todos os ciclos e altera o id do yAxis conforme a opção de múltiplos eixos esteja ligada ou desligada
  for (let i = 0; i <= chart.config.data.datasets.length - 1; i++) {
    chart.config.data.datasets[i].yAxisID = MultipleAxis
      ? datasets[i].unitLabel
      : "y";
  }

  chart.update(); //Atualiza o gráfico com as novas alterações feitas aos datasets do gráfico

  //#################OPÇÕES#################

  const chartOptions = chart.config.options; //Obtém as configurações atuais da

  //Objeto com as novas opções do gráfico
  let newOptions: any;

  //Dependendo da escolha múltipla de eixos, as novas opções vão ser construídas
  if (MultipleAxis) {
    newOptions = {
      ...chartOptions,
      scales: {
        ...chartOptions.scales,
        y: {
          ...chartOptions.scales.y,
          display: false,
        },
      },
    };
    ListSingleAxisOptions.map((unitLabel, index: number) => {
      const indexIsOdd = index % 2 == 0; //Verifica se o index é par ou impar para colocar o eixo dos y à esquerda ou direita do gráfico
      const newYAxisObj = unitLabel && {
        ...newOptions,
        scales: {
          ...newOptions.scales,
          [unitLabel.AxisId]: {
            title: {
              display: true,
              text: unitLabel.Title, //Verifica se todos os datasets usam o mesmo yLabel. Se usarem a mesma é mostrada no gráfico, senão não é apresentada nenhuma label.
            },
            position: indexIsOdd ? "left" : "right",
            grid: {
              drawOnChartArea: index === 0 ? true : false, // only want the grid lines for one axis to show up
            },
            //Se a checkbox de eixos com valores padrão tiver ativada, os eixos devem ser os definidos pelo chartjs (apartir dos dados do dataset), caos contrário serão os mínimos e máximos definidos pelo utilizados
            min: unitLabel.DefaultMinMaxValues ? undefined : unitLabel.MinY,
            max: unitLabel.DefaultMinMaxValues ? undefined : unitLabel.MaxY,
            reverse: unitLabel.Reverse,
          },
        },
        plugins: {
          ...newOptions.plugins,
          annotation: {
            ...newOptions.plugins.annotation,
            annotations: {
              ...newOptions.plugins.annotation?.annotations,
              y: {
                display: false, //Desliga as anotações gerais do eixo do y
              },
              [unitLabel.AxisId]: {
                display:
                  unitLabel.ControlLines &&
                  (Number.isInteger(unitLabel.AnnotationMinY) ||
                    Number.isInteger(unitLabel.AnnotationMaxY))
                    ? true
                    : false,
                type: "box",
                adjustScaleRange: false, //Faz com que o gráfico se ajuste à annotation se a mesma for superior/inferior aos limites do dataset
                yScaleID: unitLabel.AxisId,
                yMin: unitLabel.ControlLines
                  ? unitLabel.AnnotationMinY
                  : undefined,
                yMax: unitLabel.ControlLines
                  ? unitLabel.AnnotationMaxY
                  : undefined,
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            },
          },
        },
      };

      newOptions = newYAxisObj; //Atualiza o objeto com as novas configurações "newOptions" a cada iteração
    });
  } else {
    //Apenas mantém o eixo do x e y
    newOptions = {
      ...chartOptions,
      scales: {
        y: {
          ...chartOptions.scales.y,
          display: true,
          min: MinMaxValues ? MinY : undefined,
          max: MinMaxValues ? MaxY : undefined,
          reverse: Reverse,
        },
        x: {
          ...chartOptions.scales.x,
        },
      },
      plugins: {
        ...chartOptions.plugins,
        filler: {
          propagate: true,
        },
        annotation: {
          ...chartOptions.plugins.annotation,
          annotations: {
            ...chartOptions.plugins.annotation?.annotations,
            y: {
              display:
                ControlLines &&
                (Number.isInteger(AnnotationMinY) ||
                  Number.isInteger(AnnotationMaxY))
                  ? true
                  : false,
              type: "box",
              adjustScaleRange: false, //Faz com que o gráfico se ajuste à annotation se a mesma for superior/inferior aos limites do dataset
              yMin: ControlLines ? AnnotationMinY : undefined,
              yMax: ControlLines ? AnnotationMaxY : undefined,
              yScaleID: "y",
              backgroundColor: "rgba(0,0,0,0.1)",
            },
          },
        },
      },
    };

    //Desliga as annotations dos multiple axis
    ListSingleAxisOptions.map((unitLabel) => {
      const newYAxisObj = unitLabel && {
        ...newOptions,
        plugins: {
          ...newOptions.plugins,
          annotation: {
            ...newOptions.plugins.annotation,
            annotations: {
              ...newOptions.plugins.annotation?.annotations,
              [unitLabel.AxisId]: {
                display: false},
            },
          },
        },
      };

      newOptions = newYAxisObj; //Atualiza o objeto com as novas configurações "newOptions" a cada iteração
    });
  }

  updateCustomChartConfigByMutating(chart, newOptions); //Atualiza as configurações do gráfico
};
