//Recebe o gráfico e os novos dados e atualiza o gráfico
export const updateCustomChartDataByMutating = (chart: any, newData: any) => {
    //Verifica se as novas opções são válidas e se o chart existe
    if (!newData || !chart) {
      return;
    }

    chart.config.data.datasets = newData //Atualiza os datasets do chart
    chart.update(); //Atualiza o gráfico para os novos datasets
  };