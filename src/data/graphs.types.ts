export type GraphMetadataType = {
  id: string;
  title: string;
  description: string;
};

export type GraphDataType = GraphMetadataType & {
  expanded?: boolean;
};
