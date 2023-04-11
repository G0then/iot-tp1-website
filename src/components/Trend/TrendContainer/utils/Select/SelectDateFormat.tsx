import { comboboxDataDto } from "@/utils/objects/combobox/date";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type ChartTypeSelectProps = {
  label: string;
  comboboxData: comboboxDataDto[];
  handleChange: (e: string) => void;
  activeItem: string | undefined;
};

export const ChartDateFormatSelect = ({
  label,
  comboboxData,
  activeItem,
  handleChange,
}: ChartTypeSelectProps) => {
  return (
    <FormControl sx={{ m: 0, minWidth: "auto", fontSize: ".6em" }} >
      <InputLabel id="select-small">{label}</InputLabel>
      <Select
        labelId="select-small"
        id="select-small"
        value={activeItem || ""}
        label={label}
        MenuProps={{ disableScrollLock: true }} //Para não desativar o scroll da página ao abrir o select
        onChange={(e) => handleChange(e.target.value)}
      >
        {comboboxData.map((data: comboboxDataDto, index: number) => {
          const { displayName, name } = data;
          return (
            <MenuItem key={index} value={name}>
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <div>{displayName}</div>
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
