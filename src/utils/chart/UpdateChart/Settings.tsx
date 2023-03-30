//Recebe o gráfico e as novas opções de configuração do mesmo e atualiza o gráfico
export const updateCustomChartConfigByMutating = (chart: any, newOptions: any) => {
  //Verifica se as novas opções são válidas e se o chart existe
  if (!newOptions || !chart) {
    return;
  }
  
  // chart.config.options = newOptions //Atualiza as opções do chart
  chart.options = newOptions //Atualiza as opções do chart

  chart.update(); //Atualiza o gráfico para ficar com as novas configurações
};
