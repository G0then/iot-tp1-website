import { ReactNode } from "react";
import Search from "./Search";

type FilterProps = {
    placeholder: string;
    searchOptions?: ReactNode;
    value: string;
    setValue: (e: string) => void;
}

export const Filter = ({ placeholder, searchOptions, value, setValue }: FilterProps) => {
    return(
        <Search placeholder={placeholder} value={value} setValue={setValue}>
            {searchOptions && searchOptions}
        </Search>
    );
}

export default Filter;