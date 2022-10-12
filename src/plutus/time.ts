import { Network, Slot, SlotConfig, UnixTime } from "../types/mod.ts";

export const SLOT_CONFIG_NETWORK: Record<
  Network,
  SlotConfig
> = {
  Mainnet: { zeroTime: 1596059091000, zeroSlot: 4492800, slotLength: 1000 }, // Starting at Shelley era
  Testnet: { zeroTime: 1595967616000, zeroSlot: 1598400, slotLength: 1000 }, // Starting at Shelley era
  Preview: { zeroTime: 1660003200000, zeroSlot: 0, slotLength: 1000 }, // Starting at Shelley era
  Preprod: {
    zeroTime: 1654041600000 +
      1641599000, // Config start time is not accurate for some reason? Adding this offset, makes it very accurate. Only happens on Preprod network although.
    zeroSlot: 0,
    slotLength: 1000,
  }, // Starting at Shelley era
};

export function slotToBeginUnixTime(
  slot: Slot,
  slotConfig: SlotConfig,
): UnixTime {
  const msAfterBegin = (slot - slotConfig.zeroSlot) * slotConfig.slotLength;
  return slotConfig.zeroTime + msAfterBegin;
}

// slotToBeginUnixTime and slotToEndUnixTime are identical when slotLength == 1. So we don't need to worry about this now.
// function slotToEndUnixTime(slot: Slot, slotConfig: SlotConfig): UnixTime {
//   return slotToBeginUnixTime(slot, slotConfig) + (slotConfig.slotLength - 1);
// }

export function unixTimeToEnclosingSlot(
  unixTime: UnixTime,
  slotConfig: SlotConfig,
): Slot {
  const timePassed = (unixTime - slotConfig.zeroTime);
  const slotsPassed = Math.floor(timePassed / slotConfig.slotLength);
  return slotsPassed + slotConfig.zeroSlot;
}