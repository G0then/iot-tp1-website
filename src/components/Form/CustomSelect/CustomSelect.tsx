import { ErrorInformation } from "@/components/Error/ErrorInformation";
import { ComboboxDto } from "@/types/combobox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import classNames from "classnames";
import React from "react";

type CustomSelectProps = {
  title: string;
  comboboxData: ComboboxDto[];
  onChange: (e: SelectChangeEvent<string>) => void;
  activeItem: string | undefined;
  aditionalClass?: string;
};

export default function CustomSelect({
  title,
  comboboxData,
  onChange,
  activeItem,
  aditionalClass
}: CustomSelectProps) {
  return (
    <div className={classNames(aditionalClass, "flex flex-col space-y-1")}>
      <p className="font-semibold text-gray-700">{title}</p>
      <FormControl
        sx={{ m: 0, minWidth: "100%", fontSize: ".6em", borderColor: "#D1D5DB" }}
        size="small"
      >
        {/* <InputLabel id="select-small">{label}</InputLabel> */}
        <InputLabel></InputLabel>
        <Select
          labelId="select-small"
          id="select-small"
          value={activeItem || ""}
          label=""
          MenuProps={{ disableScrollLock: true }} //Para não desativar o scroll da página ao abrir o select
          onChange={onChange}
          style={{ borderColor: "#D1D5DB", borderRadius: "0.5rem", border: "1px" }}
        >
          {comboboxData.map((data: ComboboxDto, index: number) => {
            const { name, displayName } = data;
            return (
              <MenuItem key={index} value={name}>
                {displayName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
