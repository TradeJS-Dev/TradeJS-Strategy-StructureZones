import { createStrategyConfigParser } from "@tradejs/strategy-kit/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import { config as DEFAULT_CONFIG, StructureZonesConfig } from "./config";
import { createStructureZonesCore } from "./core";
import { structureZonesManifest } from "./manifest";

export const StructureZonesStrategyDefinition: ValidatedStrategyRegistryEntry<StructureZonesConfig> =
  {
    defaults: DEFAULT_CONFIG,
    parseConfig: createStrategyConfigParser({
      strategyName: "StructureZones",
      defaults: DEFAULT_CONFIG,
    }),
    createCore: createStructureZonesCore,
    manifest: structureZonesManifest,
  };
