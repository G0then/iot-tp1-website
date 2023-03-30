import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { TelemetryLatests } from "../../../../../types/telemetry.dto";
import { useTelemetryTypes } from "../../../../../utils/contexts/TelemetryType/telemetryTypeContext";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type CreateTrendConditionTelemetryListComboboxProps = {
  handleChange: (e: TelemetryLatests[]) => void;
  telemetryList: TelemetryLatests[];
  label: string;
  activeValues: TelemetryLatests[]  | undefined | null;
};


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CreateTrendConditionTelemetryListCombobox = ({handleChange, telemetryList, label, activeValues}: CreateTrendConditionTelemetryListComboboxProps) => {
  //Obtém o tipo de telemetria escolhida
  const dictTelemetryTypes = useTelemetryTypes(); //Obtém o dicionário de todos os tipos de telemetria

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      limitTags={4}
      id="telemetry-select"
      size="small"
      fullWidth
      options={telemetryList}
      getOptionLabel={(option) => `${dictTelemetryTypes[option.telemetryDescription].displayDescription}`}
      value={activeValues ?? []}
      isOptionEqualToValue={(option, value) => option.telemetryDescription === value.telemetryDescription}
      onChange={(_, value: TelemetryLatests[] | null) => { handleChange(value ?? [])}}
      noOptionsText={'Não foram encontradas telemetrias'}
      loadingText='A carregar...'
      // filterSelectedOptions // COM ESTA OPÇÃO ATIVADA AS OPÇÕES SELECIONADAS NÃO APARECEM COMO ALTERNATIVAS (NESTE CASO COMO ESCOLHI USAR UMA COMBOBOX, DESATIVEI PORQUE NÃO FAZ SENTIDO)
      // inputValue={activeValue?.devicePid}
      //   onInputChange={(event, newInputValue) => {
      //     handleChange(newInputValue)
      // }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {dictTelemetryTypes[option.telemetryDescription].displayDescription}  
        </li>
      )}
      sx={{ height: "auto", maxHeight: '100px', overflow: "auto" ,textOverflow: 'ellipsis' }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="dense" //Evita a label do textfield ficar cortada
          // placeholder="+Telemetria"
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
