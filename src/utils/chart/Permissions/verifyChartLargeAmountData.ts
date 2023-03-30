import { Line } from "react-chartjs-2"

//Função que recebe o tipo do gráfico e verifica se existem muitos dados a serem apresentados no gráfico
export const verifyChartLargeAmoutData = (chartType: any, numberData: number, showAllData: boolean) => {
    if((numberData <= 100 && chartType != Line) || (numberData <= 1000 && chartType === Line) || showAllData){
        return false; //Não tem muitos dados
    }else{
        return true; //Tem muitos dados
    }
}