import { dateTabEnum } from "../../objects/comboboxData";
import { DateTime } from "luxon";

//Recebe a tab ativa e a data de inicio/fim e retorna a nova data de inicio e fim baseadas na tab escolhida.
//TODO: Alterar esta função para utilizar a library de datas do luxon (muito mais simples) ao invés de tratar as datas usando javascript normal
export const getStartAndStopDateChart = (nextTab: dateTabEnum, StartDateTime: string | undefined, StopDateTime: string | undefined) => {
    const today = new Date(); //Data atual
    const startDate = StartDateTime ? new Date(StartDateTime) : null; //Verifica se existe data de inicio
    //Se existir data de inicio, a mesma vai ser alterar conforme a nova tab escolhida
    const newStartDate = startDate ? 
        nextTab === dateTabEnum.Day ? 
        startDate :
        nextTab === dateTabEnum.Month ?  
            new Date(startDate.setFullYear(startDate.getFullYear(), startDate.getMonth() , 1)) :
            new Date(startDate.setFullYear(startDate.getFullYear(), 0, 1))
        : undefined;
        
    const yesterday = DateTime.fromJSDate(new Date(new Date().setDate(new Date().getDate() - 1))).endOf('day').toJSDate() //Dia anterior ao atual
    const stopDate = StopDateTime ? new Date(StopDateTime) : null; //Verifica se existe data de fim
    //Se existir data de fim, a mesma vai ser alterar conforme a nova tab escolhida
    const newStopDate = stopDate ? 
        nextTab === dateTabEnum.Day ? 
        stopDate :
        nextTab === dateTabEnum.Month ?  
            (yesterday.getFullYear() === stopDate.getFullYear() && yesterday.getMonth() === stopDate.getMonth()) ?
            yesterday :
                new Date(stopDate.setFullYear(stopDate.getFullYear(), stopDate.getMonth() + 1, 0)) 
            : (yesterday.getFullYear() === stopDate.getFullYear()) ? 
            yesterday :
                new Date(stopDate.setFullYear(stopDate.getFullYear(), 11 + 1, 0))
        : undefined;

    //Converte as datas para strings com o formato escolhido (yyyy-mm-dd hh:mm:ss)
    const newFormattedStartDate = newStartDate && DateTime.fromMillis(newStartDate.setHours(0, 0, 0)).toFormat("yyyy-LL-dd TT");
    const newFormattedStopDate = newStopDate && DateTime.fromMillis(newStopDate.setHours(23, 59, 59)).toFormat("yyyy-LL-dd TT");

    return [newFormattedStartDate, newFormattedStopDate]
}