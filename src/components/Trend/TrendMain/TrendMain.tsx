import { DeviceInfoDto } from "../../../types/device.dto";
import { FacilityDto } from "../../../types/facility.dto";
import { ParcelDto } from "../../../types/parcel.dto";
import { SectorDto } from "../../../types/sector.dto";
import { UserLocationType } from "../../../utils/objects/userLocationData";
import { TrendLocationObjType } from "../../../utils/trend/objects";
import { MainContainer } from "../../Containers/MainContainer/MainContainer";
import { TrendContainer } from "../TrendContainer/TrendContainer";
import styles from "./TrendMain.module.css";

type TrendMainProps = {
  devicesList: DeviceInfoDto[];
  userLocation: UserLocationType;
  entity: FacilityDto[] | ParcelDto[] | SectorDto[] | SectorDto;
  entityLocation: TrendLocationObjType;
};

export const TrendMain = ({ devicesList, userLocation, entity, entityLocation }: TrendMainProps) => {
  return (
    <MainContainer>
      <h1 className={styles.title}>Tendências</h1>

      <p className={styles.description}>
        Aqui é possível ver tendências das telemetrias dos equipamentos
      </p>
      <TrendContainer devicesList={devicesList} entityLocation={entityLocation} userLocation={userLocation} entity={entity}/>
    </MainContainer>
  );
};
