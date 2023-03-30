import { useMemo } from "react";
import { IoCloseCircle, IoRemoveCircle } from "react-icons/io5";
import { DeviceInfoDto } from "../../../../../types/device.dto";
import { FacilityDto } from "../../../../../types/facility.dto";
import { ParcelDto } from "../../../../../types/parcel.dto";
import { SectorDto } from "../../../../../types/sector.dto";
import { TelemetryLatests } from "../../../../../types/telemetry.dto";
import { getDeviceSectors } from "../../../../../utils/trend/getSectorsDevices";
import { TrendLocationObjType } from "../../../../../utils/trend/objects";
import { conditionTrendState, TrendDevicesListsType, trendState } from "../../TrendContainer";
import { CreateTrendConditionDevicesListCombobox } from "../../utils/Combobox/ComboboxDevices";
import { CreateTrendConditionFacilitiesListCombobox } from "../../utils/Combobox/ComboboxFacilities";
import { CreateTrendConditionTelemetryListCombobox } from "../../utils/Combobox/ComboboxTelemetry";
import styles from "./SingleCondition.module.css";

type CreateEventSingleConditionProps = {
  handleChangeTrend: (newState: Partial<trendState>) => void;
  handleChangeDevicesList: (newState: TrendDevicesListsType) => void;
  conditionTrendState: conditionTrendState;
  devicesListState: TrendDevicesListsType;
  entity: FacilityDto[] | ParcelDto[] | SectorDto[] | SectorDto;
  removeButtonHandler: () => void;
  index: number;
  firstElement?: boolean;
  trendState: trendState;
  entityLocation: TrendLocationObjType;
};

export const CreateTrendSingleCondition = ({
  handleChangeTrend,
  handleChangeDevicesList,
  conditionTrendState,
  devicesListState,
  entity,
  entityLocation,
  firstElement,
  index,
  removeButtonHandler,
  trendState,
}: CreateEventSingleConditionProps) => {
  const { availableDevices, trendDevices } = devicesListState;
  const { Entity, Device, Telemetry } = conditionTrendState;

  //Handler para alterar as propriedades das condições
  const changeHandler = (obj: conditionTrendState) => {
    let newListConditions = [...trendState.ListConditions]; //Cria uma copia da lista de condições

    newListConditions[index] = obj; //Altera o antigo objeto condição para o novo com as novas propriedades

    handleChangeTrend({ ListConditions: newListConditions }); //Altera o state para a nova lista com as condições atualizadas
  };

  //Remove o equipamento da lista dos equipamentos disponíveis e adiciona na última posição da lista de equipamentos utilizados no gráfico
  const addDeviceHandler = (newDevice: DeviceInfoDto, activeDevice: DeviceInfoDto | undefined) => {
    
    let devicesToUse = [...availableDevices], devicesInUse = [...trendDevices]; //Cria uma cópia das listas dos equipamentos disponíveis e em uso pelo gráfico

    //Se existir um equipamento ativo, o mesmo é removido
    if(activeDevice){
      const index = devicesInUse.indexOf(activeDevice) //Obtém o index do equipamento ativo no array dos equipamentos utilizados no gráfico 
      devicesInUse.splice(index, 1); //Elimina o device da lista de equipamentos utilizados no gráfico
      devicesToUse.unshift(activeDevice); //Adiciona o device na primeira posição da lista de equipamentos disponíveis
    }

    //O novo equipamento é adicionado
    const index = devicesToUse.indexOf(newDevice) //Obtém o index do novo equipamento a ser utilizado no array dos equipamentos disponíveis
    devicesToUse.splice(index, 1); //Elimina o device da lista de equipamentos diponíveis
    devicesInUse.unshift(newDevice); //Adiciona o device na primeira posição da lista de equipamentos utilizados no gráfico

    handleChangeDevicesList({ availableDevices: devicesToUse, trendDevices: devicesInUse }); //Altera o state com as novas listas dos equipamentos disponíveis e usados 
  }

  //Remove o equipamento da lista dos equipamentos utilizados no gráfico e adiciona na última posição da lista de equipamentos disponíveis
  const removeDeviceHandler = (device: DeviceInfoDto) => {
    let devicesToUse = [...availableDevices], devicesInUse = [...trendDevices]; //Cria uma cópia das listas dos equipamentos disponíveis e em uso pelo gráfico

    const index = devicesInUse.indexOf(device) //Obtém o index do equipamento ativo no array dos equipamentos utilizados no gráfico 
    devicesInUse.splice(index, 1); //Elimina o device da lista de equipamentos utilizados no gráfico
    devicesToUse.unshift(device); //Adiciona o device na primeira posição da lista de equipamentos disponíveis

    handleChangeDevicesList({ availableDevices: devicesToUse, trendDevices: devicesInUse }); //Altera o state com as novas listas dos equipamentos disponíveis e usados 
  }

  const deviceSectors = useMemo(() => Entity ? getDeviceSectors(Entity) : [], [Entity])


  return (
    <div className={styles.comboboxContainer}>
        <CreateTrendConditionFacilitiesListCombobox
        label={entityLocation.comboboxLabel}
        entitiesList={Array.isArray(entity) ? entity : []}
        activeValue={Entity}
        handleChange={(e: FacilityDto) => {
          changeHandler({ ...conditionTrendState, Entity: e, Device: undefined, Telemetry: undefined });
          Device && removeDeviceHandler(Device);
        }}
        entityLocation={entityLocation}
        disable={!(Array.isArray(entity))}
      />
      <CreateTrendConditionDevicesListCombobox
        label="Equipamento"
        devicesList={Entity ? availableDevices.filter(({ id: id1 }) => deviceSectors.some(({ deviceId: id2 }) => id2 === id1)) : []}
        activeValue={Device}
        handleChange={(e: DeviceInfoDto) => {
          changeHandler({ ...conditionTrendState, Device: e, Telemetry: undefined });
          addDeviceHandler(e, Device);
        }}
      />
      <CreateTrendConditionTelemetryListCombobox
        label="Telemetria"
        telemetryList={Device?.telemetrylatests ?? []}
        activeValues={Telemetry}
        handleChange={(e: TelemetryLatests[]) => {
          changeHandler({ ...conditionTrendState, Telemetry: e });
        }}
      />
      {!firstElement && (
        <div
          className={styles.removeButtonContainer}
          onClick={() => {
            removeButtonHandler()
            Device && removeDeviceHandler(Device);
          }}
        >
          <IoCloseCircle className={styles.removeButtonIcon} />
        </div>
      )}
    </div>
  );
};
