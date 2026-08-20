import { defineStrategyPlugin } from "@tradejs/core/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import type { StrategyConfig } from "@tradejs/types";
import { config as structureZonesDefaultConfig } from "./StructureZones/config";
import { StructureZonesStrategyDefinition } from "./StructureZones/strategy";

export const strategyEntries: ValidatedStrategyRegistryEntry<any>[] = [
  StructureZonesStrategyDefinition,
];

const defaultConfigs: Record<string, StrategyConfig> = {
  StructureZones: structureZonesDefaultConfig,
};

export const getBuiltInStrategyDefaultConfig = (
  strategyName: string,
): StrategyConfig | undefined => defaultConfigs[strategyName];

export { StructureZonesStrategyDefinition } from "./StructureZones/strategy";
export { structureZonesDefaultConfig };
export { structureZonesManifest } from "./StructureZones/manifest";
export { structureZonesAiAdapter } from "./StructureZones/adapters/ai";

export default defineStrategyPlugin({ strategyEntries });
