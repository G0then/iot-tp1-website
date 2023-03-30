export enum dateTabEnum {
    Day = "day",
    Month = "month",
    Year = "year",
  }

  export type comboboxDataDto = {
    name: string;
    displayName?: string;
  };

  //Objeto com a seleção de dia/mes/ano
export const dateComboboxData: comboboxDataDto[] = [
  {
    name: "day",
    displayName: "Dia",
  },

  {
    name: "month",
    displayName: "Mês",
  },

  {
    name: "year",
    displayName: "Ano",
  },
];