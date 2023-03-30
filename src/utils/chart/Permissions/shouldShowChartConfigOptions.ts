import { Bar, Line } from "react-chartjs-2"

//Função que recebe o tipo do gráfico e verifica se existem configurações adicionais para o mesmo
export const shoudShowChartConfigOption = (chartType: any) => {
    if(chartType === Line || chartType === Bar){
        return true; //Tem permissão
    }else{
        return false; //Não tem permissão
    }
}