import type { AiPayload, Direction, Signal } from "@tradejs/types";
import { structureZonesAiAdapter } from "../adapters/ai";

const evaluate = ({
  direction = "SHORT",
  benchmarkRelativeStrength1h = -32,
  distanceToTrailStopPct = -4.7,
}: {
  direction?: Direction;
  benchmarkRelativeStrength1h?: number;
  distanceToTrailStopPct?: number;
} = {}) =>
  structureZonesAiAdapter.postProcessLocalAnalysis?.({
    signal: {
      direction,
      prices: { takeProfitPrice: 90, stopLossPrice: 105 },
    } as Signal,
    payload: {
      additionalIndicators: {
        baseContext: {
          relative: {
            benchmark: { relativeStrength1h: benchmarkRelativeStrength1h },
          },
          regime: {
            trend: {
              trendFollow: { distanceToTrailStopPct },
            },
          },
        },
      },
    } as unknown as AiPayload,
    analysis: { direction, quality: 5 },
  });

describe("StructureZones local AI gate", () => {
  it("approves the frozen SHORT boundary", () => {
    expect(evaluate()).toEqual(
      expect.objectContaining({
        direction: "SHORT",
        quality: 4,
        approved: true,
        gateDecision: "approved",
      }),
    );
  });

  it.each([
    ["LONG direction", { direction: "LONG" as Direction }],
    ["benchmark threshold", { benchmarkRelativeStrength1h: -31.999 }],
    ["trail threshold", { distanceToTrailStopPct: -4.699 }],
  ])("rejects outside the frozen rule: %s", (_name, input) => {
    expect(evaluate(input)).toEqual(
      expect.objectContaining({
        direction: null,
        quality: 3,
        approved: false,
        gateDecision: "rejected",
      }),
    );
  });

  it("rejects when either causal feature is missing", () => {
    const result = structureZonesAiAdapter.postProcessLocalAnalysis?.({
      signal: {
        direction: "SHORT",
        prices: { takeProfitPrice: 90, stopLossPrice: 105 },
      } as Signal,
      payload: {
        additionalIndicators: { baseContext: {} },
      } as unknown as AiPayload,
      analysis: { direction: "SHORT", quality: 5 },
    });

    expect(result).toEqual(
      expect.objectContaining({
        direction: null,
        quality: 3,
        approved: false,
        gateDecision: "rejected",
      }),
    );
  });
});
