import { DeviceDto } from "@/types/device";
import { SensorDto } from "@/types/sensor";

export type FormAddDeviceError = {
  Pid: string | undefined;
  Name: string | undefined;
  Description: string | undefined;
  Location_name: string | undefined;
};

//Objeto default do erro
const getDefaultAddDeviceFormErrorState = () => {
  return {
    Pid: undefined,
    Name: undefined,
    Description: undefined,
    Location_name: undefined,
  };
};

//Função que valida o formulário do pedido
export const validateFormAddDevice = (formField: DeviceDto) => {
  let formAddDeviceErrorObj: FormAddDeviceError =
    getDefaultAddDeviceFormErrorState();

  //Verificação do pid sensor
  if (!formField.pid) {
    formAddDeviceErrorObj.Pid = "Enter sensor PID";
  }

  //Verificação do nome sensor
  //O nome tem que ter pelo menos 5 caracters
  if (!formField.name || formField.name.length < 5) {
    formAddDeviceErrorObj.Name =
      "Sensor name should have more than 5 characters";
  }

  //Verificação da descrição do sensor
  //A descrição tem que ter pelo menos 5 caracters
  if (!formField.description || formField.description.length < 5) {
    formAddDeviceErrorObj.Description =
      "Sensor description should have more than 5 characters";
  }

  //Verificação do nome da unidade de medida
  //O nome da unidade tem que ter pelo menos 5 caracters
  if (!formField.location.name || formField.location.name.length < 5) {
    formAddDeviceErrorObj.Location_name =
      "Location name should have more than 5 characters";
  }

  //Verifica se todas as propriedades do objeto são undefined. Se forem retorna false, senão retorna true
  const hasError = !Object.values(formAddDeviceErrorObj).every(
    (el) => el === undefined
  );

  //Se existirem erros, retorna um objeto com os erros, senão retorna undefined
  return hasError ? formAddDeviceErrorObj : undefined;
};
