import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { chartTypeDto } from "../../../../../utils/objects/chartTypeData";

type ChartTypeSelectProps = {
  label: string;
  comboboxData: chartTypeDto[];
  handleChange: (e: string) => void;
  activeItem: string | undefined;
};

export const ChartTypeSelect = ({
  label,
  comboboxData,
  activeItem,
  handleChange,
}: ChartTypeSelectProps) => {
  return (
    <FormControl sx={{ m: 0, minWidth: "auto", fontSize: ".6em" }} size="small">
      <InputLabel id="select-small">{label}</InputLabel>
      <Select
        labelId="select-small"
        id="select-small"
        value={activeItem || ""}
        label={label}
        MenuProps={{ disableScrollLock: true }} //Para não desativar o scroll da página ao abrir o select
        onChange={(e) => handleChange(e.target.value)}
      >
        {comboboxData.map((data: chartTypeDto, index: number) => {
          const { ChartType, displayName, Icon } = data;
          return (
            <MenuItem key={index} value={ChartType}>
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                {Icon && <Icon />}
                <div>{displayName}</div>
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
