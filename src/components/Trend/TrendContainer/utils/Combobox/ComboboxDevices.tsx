import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Image from "next/image";
import { DeviceInfoDto } from "../../../../../types/device.dto";

type CreateTrendConditionDevicesListComboboxProps = {
  handleChange: (e: DeviceInfoDto) => void;
  devicesList: DeviceInfoDto[];
  label: string;
  activeValue: DeviceInfoDto  | undefined | null;
};

export const CreateTrendConditionDevicesListCombobox = ({handleChange, devicesList, label, activeValue}: CreateTrendConditionDevicesListComboboxProps) => {
  return (
    <Autocomplete
      id="device-select"
      size="small"
      fullWidth
      options={devicesList}
      autoHighlight
      getOptionLabel={(option) => option.DeviceName}
      value={activeValue ?? null} //Problema aqui a apagar o texto da combobox
      // isOptionEqualToValue={(option, value) => option.devicePid === value.devicePid}
      onChange={(_, value: DeviceInfoDto | null) => { value && handleChange(value)}}
      noOptionsText={'Não foram encontrados equipamentos'}
      loadingText='A carregar...'
      // inputValue={activeValue?.devicePid}
      //   onInputChange={(event, newInputValue) => {
      //     handleChange(newInputValue)
      //   }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.devicePid}
        >
          {/* <Image
              src="/FIT2_logo-white.svg"
              loading="lazy"
              width="20"
              height="20"
              alt="FulgurIT"
            />
        {option.DeviceName}  */}
        {option.DeviceName}
          
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
