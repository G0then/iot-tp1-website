import { useEffect, useState } from "react";
import { DeviceInfoDto } from "../../../../types/device.dto";
import { FacilityDto } from "../../../../types/facility.dto";
import { ParcelDto } from "../../../../types/parcel.dto";
import { SectorDto } from "../../../../types/sector.dto";
import { TrendLocationObjType } from "../../../../utils/trend/objects";
import { conditionTrendState, getDefaultTrendConditionState, TrendDevicesListsType, trendState } from "../TrendContainer";
import { CreateTrendSingleCondition } from "./SingleCondition/SingleCondition";
import styles from "./TelemetryMenu.module.css";

type TrendTelemetryMenuProps = {
  handleChangeTrend: (newState: Partial<trendState>) => void;
  handleChangeDevicesList: (newState: TrendDevicesListsType) => void;
  trendState: trendState;
  devicesListState: TrendDevicesListsType;
  entity: FacilityDto[] | ParcelDto[] | SectorDto[] | SectorDto;
  entityLocation: TrendLocationObjType;
};

export const TrendTelemetryMenu = ({
  handleChangeTrend,
  handleChangeDevicesList,
  trendState,
  devicesListState,
  entity,
  entityLocation,
}: TrendTelemetryMenuProps) => {
  const { ListConditions } = trendState;

  //Conta o número de telemetrias utilizadas
  useEffect(() => {
    const counter = trendState.ListConditions.reduce((count, condition) => condition.Telemetry && condition.Telemetry.length > 0 ? count + condition.Telemetry.length : count, 0);
    handleChangeTrend({numberConditions: counter})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendState.ListConditions])
  

  //Remove o equipamento da lista dos equipamentos para o gráfico e adiciona na última posição da lista de equipamentos disponíveis
   const removeButtonHandler = (indexConditionToDelete: number) => {
    let newListConditions = [...ListConditions];

    // const indexConditionToDelete = newListConditions.findIndex((condition) => condition === conditionToDelete);

    newListConditions.splice(indexConditionToDelete, 1); //Elimina o device da lista de equipamentos para o plano de rega

    handleChangeTrend({ ListConditions: newListConditions }) //Atualiza o state da lista
  }
  

  return (
    <div className={styles.conditionsContainer}>
      <div className={styles.dataContainer}>
        {ListConditions.map((data: conditionTrendState, index: number) => {
          return (
            <CreateTrendSingleCondition
              key={index}
              handleChangeTrend={handleChangeTrend}
              handleChangeDevicesList={handleChangeDevicesList}
              conditionTrendState={data}
              trendState={trendState}
              devicesListState={devicesListState}
              entity={entity}
              entityLocation={entityLocation}
              removeButtonHandler={() => {removeButtonHandler(index)}}
              index={index}
              firstElement={ListConditions.length === 1}
            />
          );
        })}

        <div className={styles.addConditionBtnContainer}>
          <div
            className={styles.addConditionBtn}
            onClick={() =>
              handleChangeTrend({ ListConditions: [...ListConditions, getDefaultTrendConditionState(entity)] }) //Adiciona um objeto conditions default à lista de condições já existentes
            }
          >
            <p>+ Adicionar</p>
          </div>
        </div>
      </div>
    </div>
  );
};
