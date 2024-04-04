import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { DataType } from "src/data/data.types";

export type DetailInteractionContextType = {
  timelineHover: DataType["scientificName"][];
  setTimelineHover?: (scientificName: DataType["scientificName"][]) => void;
};

const DetailInteractionContext = createContext<DetailInteractionContextType>({
  timelineHover: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTimelineHover: () => {},
});

export const useDetailInteractionContext = () =>
  useContext(DetailInteractionContext);

export const DetailInteractionContextProvider = (props: {
  children: ReactNode;
}) => {
  const [detailInteraction, setDetailInteraction] = useState<
    Pick<DetailInteractionContextType, "timelineHover">
  >({ timelineHover: [] });

  const setTimelineHover = useCallback<
    NonNullable<DetailInteractionContextType["setTimelineHover"]>
  >((timelineHover) => {
    setDetailInteraction((previousInteraction) => ({
      ...previousInteraction,
      timelineHover: timelineHover,
    }));
  }, []);

  return (
    <DetailInteractionContext.Provider
      value={{
        timelineHover: detailInteraction.timelineHover,
        setTimelineHover,
      }}
    >
      {props.children}
    </DetailInteractionContext.Provider>
  );
};
