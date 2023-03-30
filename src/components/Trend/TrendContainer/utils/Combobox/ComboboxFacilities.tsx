import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { FacilityDto } from "../../../../../types/facility.dto";
import { SectorDto } from "../../../../../types/sector.dto";
import { ParcelDto } from "../../../../../types/parcel.dto";
import { TrendLocationObjType } from "../../../../../utils/trend/objects";

type CreateTrendConditionFacilitiesListComboboxProps = {
  handleChange: (e: FacilityDto) => void;
  entitiesList: any[] | [];
  label: string;
  activeValue: FacilityDto | ParcelDto | SectorDto | undefined | null;
  entityLocation: TrendLocationObjType;
  disable?: boolean;
};

export const CreateTrendConditionFacilitiesListCombobox = ({handleChange, entitiesList, label, activeValue, entityLocation, disable}: CreateTrendConditionFacilitiesListComboboxProps) => {
  return (
    <Autocomplete
      id="facility-select"
      size="small"
      fullWidth
      options={entitiesList}
      autoHighlight
      getOptionLabel={(option) => option[entityLocation.comboboxFieldName]}
      value={activeValue ?? null} //Problema aqui a apagar o texto da combobox
      onChange={(_, value: FacilityDto | null) => { value && handleChange(value)}}
      noOptionsText={'Não foram encontradas instalações'}
      loadingText='A carregar...'
      disabled={disable ?? false}
      // inputValue={activeValue?.devicePid}
      //   onInputChange={(event, newInputValue) => {
      //     handleChange(newInputValue)
      //   }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.id}
        >
          {/* <Image
              src="/FIT2_logo-white.svg"
              loading="lazy"
              width="20"
              height="20"
              alt="FulgurIT"
            />
        {option.DeviceName}  */}
          {option[entityLocation.comboboxFieldName]}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            // autoComplete: "new-password", // disable autocomplete and autofill (Não está a funcionar)
            autoComplete: "off", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
