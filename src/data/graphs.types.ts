export type GraphMetadataType = {
  title: string;
  description: string;
};

export type GraphDataType = GraphMetadataType & {
  expanded?: boolean;
};
