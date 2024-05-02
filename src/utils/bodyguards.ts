import { ScaleSequential } from "d3";
import {
  DashboardGraphSettingsType,
  DendrogramSettingsType,
} from "src/components/dashboard/dashboardGraphSettings/types";
import { DashboardGraphName } from "src/components/dashboard/dashboardGraphs/DashboardGraph";
import { LegendProps } from "src/components/graphs/shared/Legend/Legend.types";
import {
  ConfidenceFilterType,
  DropFilterType,
  FiltersType,
  IdentificationMethodFilterType,
  LocationFilterType,
  TaxonomicFilterType,
  TemporalFilterType,
  TypeOfFilter,
} from "src/data/filters.types";

export const isTaxonomicFilterType = (
  filter: FiltersType
): filter is TaxonomicFilterType => {
  return filter.type === TypeOfFilter.Taxonomic;
};

export const isTemporalFilterType = (
  filter: FiltersType
): filter is TemporalFilterType => {
  return filter.type === TypeOfFilter.Temporal;
};

export const isDropFilterType = (
  filter: FiltersType
): filter is DropFilterType => {
  return filter.type === TypeOfFilter.Drop;
};

export const isConfidenceFilterType = (
  filter: FiltersType
): filter is ConfidenceFilterType => {
  return filter.type === TypeOfFilter.Confidence;
};

export const isLocationFilterType = (
  filter: FiltersType
): filter is LocationFilterType => {
  return filter.type === TypeOfFilter.Location;
};

export const isIdentificationMethodFilterType = (
  filter: FiltersType
): filter is IdentificationMethodFilterType => {
  return filter.type === TypeOfFilter.IdentificationMethod;
};

export const isDendrogramSettings = (
  settings: DashboardGraphSettingsType
): settings is DendrogramSettingsType => {
  return settings.type === DashboardGraphName.DENDROGRAM;
};

export const isSequentialScale = (
  scale: LegendProps["colorScale"]
): scale is ScaleSequential<string, never> => {
  return typeof scale !== undefined && "interpolator" in scale;
};
