# @tradejs/strategy-structure-zones

TradeJS strategy plugin providing `StructureZones`.

## Strategy overview

`StructureZones` derives support and resistance zones from significant pivot
swings, waits for acceptance, and trades either reactions or structural
transition breakouts. Bias, candle body, zone age and touch, volatility, and
reaction-distance rules keep entries causal and replayable.

## Logic at a glance

![StructureZones strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-StructureZones/main/docs/strategy-logic.svg)

## Signal on an example chart

A significant swing first becomes an accepted support zone; the later qualified reaction, rather than the original pivot, produces the replayable entry.

![StructureZones signal on an illustrative ticker chart](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-StructureZones/main/docs/signal-example.svg)

The illustration is schematic, not market data. Exact thresholds, confirmation
rules, and risk parameters come from the active TradeJS strategy config.

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

Publishing is beta-first and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow. A relevant push publishes a unique
prerelease and moves the npm `beta` tag only after the production-like Project
image passes. The current verified beta is promoted to one stable `latest`
release by the weekly automation; production never consumes prereleases.

Keywords: ai, claude, codex.

## Runtime host contract

All `@tradejs/*` runtime packages are peer dependencies. The consuming TradeJS Project owns their exact installed versions and package manifest, so this package never loads a hidden nested engine, types package, indicator package, or Strategy Kit. Repository builds use matching dev dependencies only.
