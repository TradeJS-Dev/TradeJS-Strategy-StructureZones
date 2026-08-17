# @tradejs/strategy-structure-zones

TradeJS strategy plugin providing `StructureZones`.

## Strategy overview

`StructureZones` derives support and resistance zones from significant pivot
swings, waits for acceptance, and trades either reactions or structural
transition breakouts. Bias, candle body, zone age and touch, volatility, and
reaction-distance rules keep entries causal and replayable.

## Logic at a glance

![StructureZones strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-StructureZones/main/docs/strategy-logic.svg)

## Install

```bash
yarn add @tradejs/strategy-structure-zones
```

Register the package in `tradejs.config.ts`:

```ts
import { defineConfig } from "@tradejs/core/config";

export default defineConfig({
  strategies: ["@tradejs/strategy-structure-zones"],
});
```

The package exports `strategyEntries` for the TradeJS plugin loader together
with its strategy definitions, manifests, default configs, and public AI/ML
adapters. Strategy implementation changes are released from this repository,
independently of the TradeJS engine.

## Development

```bash
yarn install --immutable
yarn checks
```

Publishing is triggered by a GitHub release and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow.

Keywords: ai, claude, codex.
