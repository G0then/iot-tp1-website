import { SensorDto } from "@/types/sensor";

export type FormAddSensorError = {
  Pid: string | undefined;
  Name: string | undefined;
  Description: string | undefined;
  Unit: string | undefined;
  Unit_name: string | undefined;
};

//Objeto default do state de eventActionsError
const getDefaultEventActionsErrorState = () => {
  return {
    Pid: undefined,
    Name: undefined,
    Description: undefined,
    Unit: undefined,
    Unit_name: undefined,
  };
};

//Função que valida o formulário do pedido
export const validateFormAddSensor = (formField: SensorDto) => {
  let formAddSensorErrorObj: FormAddSensorError =
    getDefaultEventActionsErrorState();

  //Verificação do pid sensor
  if (!formField.pid) {
    formAddSensorErrorObj.Pid = "Enter sensor PID";
  }

  //Verificação do nome sensor
  //O nome tem que ter pelo menos 5 caracters
  if (!formField.name || formField.name.length < 5) {
    formAddSensorErrorObj.Name =
      "Sensor name should have more than 5 characters";
  }

  //Verificação da descrição do sensor
  //A descrição tem que ter pelo menos 5 caracters
  if (!formField.description || formField.description.length < 5) {
    formAddSensorErrorObj.Description =
      "Sensor description should have more than 5 characters";
  }

  //Verificação da unidade de medida
  if (!formField.unit) {
    formAddSensorErrorObj.Unit = "Insert a measurement unit";
  }

  //Verificação do nome da unidade de medida
  //O nome da unidade tem que ter pelo menos 5 caracters
  if (!formField.unit_name || formField.unit_name.length < 5) {
    formAddSensorErrorObj.Unit_name =
      "Unit name should have more than 5 characters";
  }

  //Verifica se todas as propriedades do objeto são undefined. Se forem retorna false, senão retorna true
  const hasError = !Object.values(formAddSensorErrorObj).every(
    (el) => el === undefined
  );

  //Se existirem erros, retorna um objeto com os erros, senão retorna undefined
  return hasError ? formAddSensorErrorObj : undefined;
};
