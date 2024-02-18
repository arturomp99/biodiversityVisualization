import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { FiltersType } from "src/data/filters";

type FiltersContextType = {
  filters?: FiltersType;
  setFilters:
    | Dispatch<React.SetStateAction<FiltersType | undefined>>
    | undefined;
};

const FiltersContext = createContext<FiltersContextType>({
  filters: undefined,
  setFilters: undefined,
});

export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersContextProvider = (props: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FiltersType>();

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {props.children}
    </FiltersContext.Provider>
  );
};
