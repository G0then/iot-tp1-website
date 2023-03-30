import { useState } from "react";
import { DeviceInfoDto } from "../../../types/device.dto";
import { FacilityDto } from "../../../types/facility.dto";
import {
  TelemetryLatests,
} from "../../../types/telemetry.dto";
import { UserLocationType } from "../../../utils/objects/userLocationData";
import { Breadcrumb } from "../../Breadcrumb/Breadcrumb";
import { TrendTelemetryMenu } from "./TelemetryMenu/TelemetryMenu";
import styles from "./TrendContainer.module.css";
import { TrendChart } from "./TrendChart/TrendChart";
import { Line } from "react-chartjs-2";
import { dateTabEnum } from "../../../utils/objects/comboboxData";
import { ParcelDto } from "../../../types/parcel.dto";
import { SectorDto } from "../../../types/sector.dto";
import { TrendLocationObjType } from "../../../utils/trend/objects";
import { DateTime } from "luxon";


export type TrendDevicesListsType = {
  availableDevices: DeviceInfoDto[];
  trendDevices: DeviceInfoDto[];
};

export type trendState = {
  ChartType: any;
  activeTab: dateTabEnum;
  StartDateTime: string | undefined;
  StopDateTime: string | undefined;
  numberConditions: number;
  ListConditions: conditionTrendState[];
};

//Objeto default do state de Trend
const getDefaultTrendState = (entity: FacilityDto[] | ParcelDto[] | SectorDto[] | SectorDto) => {
  const today = new Date(); //Devia usar este mas o backend não permite ir buscar dados do dia atual
  const yesterday = new Date(today.setDate(today.getDate() - 1))
  
  return {
    ChartType: Line,
    activeTab: dateTabEnum.Day,
    StartDateTime: DateTime.fromJSDate(yesterday).startOf('day').toFormat("yyyy-LL-dd TT"),
    StopDateTime: DateTime.fromJSDate(yesterday).endOf('day').toFormat("yyyy-LL-dd TT"),
    numberConditions: 0,
    ListConditions: [getDefaultTrendConditionState(entity)],
  };
};

export type conditionTrendState = {
  Entity: FacilityDto | ParcelDto | SectorDto | undefined;
  Device: DeviceInfoDto | undefined;
  Telemetry: TelemetryLatests[] | undefined;
};

//Objeto default do state de condition
export const getDefaultTrendConditionState = (
  entity: FacilityDto[] | ParcelDto[] | SectorDto[] | SectorDto
) => {
  return {
    Entity: Array.isArray(entity) ? undefined : entity,
    Device: undefined,
    Telemetry: undefined,
  };
};

type TrendContainerProps = {
  devicesList: DeviceInfoDto[];
  userLocation: UserLocationType;
  entity: FacilityDto[] | ParcelDto[] | SectorDto[] | SectorDto;
  entityLocation: TrendLocationObjType;
};

export const TrendContainer = ({
  devicesList,
  userLocation,
  entity,
  entityLocation,
}: TrendContainerProps) => {
  const [trendState, setTrendState] = useState<trendState>(() =>
    getDefaultTrendState(entity)
  );
  //State que guarda a informação da lista dos devices disponíveis
  const [devicesListState, setDevicesListState] =
    useState<TrendDevicesListsType>({
      availableDevices: devicesList,
      trendDevices: [],
    });

  //Hook para alterar os dados do state. Mantém os dados passados e altera os novos enviados. O Partial permite receber nulls
  const handleChangeTrend = (newState: Partial<trendState>) => {
    setTrendState((currentState) => ({
      ...currentState,
      ...newState,
    }));
  };

  //Hook para alterar os dados das listas de devices.
  const handleChangeDevicesList = (newState: TrendDevicesListsType) => {
    // const { availableDevices, trendDevices } = newState;
    setDevicesListState((currentState) => ({
      ...currentState,
      ...newState,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadCrumb}>
        <Breadcrumb locationObject={userLocation} />
      </div>
      <div className={styles.trendContainer}>
        <TrendTelemetryMenu
          handleChangeTrend={handleChangeTrend}
          handleChangeDevicesList={handleChangeDevicesList}
          trendState={trendState}
          devicesListState={devicesListState}
          entity={entity}
          entityLocation={entityLocation}
        />
        <TrendChart
          handleChangeTrend={handleChangeTrend}
          trendState={trendState}
        />
      </div>
    </div>
  );
};
