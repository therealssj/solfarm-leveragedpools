const { blob } = require("buffer-layout");//FIXME: ver el homólogo de blob en BORSH para no tener que usar 2 libs
const { publicKey, u64, u8, u128, u32, bool, struct } = require("@project-serum/borsh");

const FARMS = {
  RayUsdcVault: 0,
  RaySolVault: 1,
  RayUsdtVault: 2,
  RaySrmVault: 3,
  MerUsdcVault: 4,
  MediaUsdcVault: 5,
  CopeUsdcVault: 6,
  RayEthVault: 7,
  StepUsdcVault: 8,
  RopeUsdcVault: 9,
  AlephUsdcVault: 10,
  TulipUsdcVault: 11,
  SnyUsdcVault: 12,
  BopRayVault: 13,
  SlrsUsdcVault: 14,
  SamoRayVault: 15,
  Unknown: 255,
};

const VAULT_LAYOUT = struct([
  blob(8),
  publicKey("authority"),
  publicKey("token_program"),
  publicKey("pda_token_account"),
  publicKey("pda"),
  u8("nonce"),
  u8("info_nonce"),
  u8("reward_a_nonce"),
  u8("reward_b_nonce"),
  u8("swap_to_nonce"),
  u64("total_vault_balance"),
  publicKey("info_account"),
  publicKey("lp_token_account"),
  publicKey("lp_token_mint"),
  publicKey("reward_a_account"),
  publicKey("reward_b_account"),
  publicKey("swap_to_account"),
  u64("total_vlp_shares")
]);

const filters = [
  {
    dataSize: VAULT_LAYOUT.span
  }
];

const USER_BALANCE_LAYOUT = struct([
  blob(8),
  publicKey("owner"),
  u64("amount")
]);

const STAKE_INFO_LAYOUT_V4 = struct([
  u64("state"),
  u64("nonce"),
  publicKey("poolLpTokenAccount"),
  publicKey("poolRewardTokenAccount"),
  u64("totalReward"),
  u128("perShare"),
  u64("perBlock"),
  u8("option"),
  publicKey("poolRewardTokenAccountB"),
  blob(7),
  u64("totalRewardB"),
  u128("perShareB"),
  u64("perBlockB"),
  u64("lastBlock"),
  publicKey("owner")
]);

const STAKE_INFO_LAYOUT = struct([
  u64("state"),
  u64("nonce"),
  publicKey("poolLpTokenAccount"),
  publicKey("poolRewardTokenAccount"),
  publicKey("owner"),
  publicKey("feeOwner"),
  u64("feeY"),
  u64("feeX"),
  u64("totalReward"),
  u128("rewardPerShareNet"),
  u64("lastBlock"),
  u64("rewardPerBlock")
]);

const ACCOUNT_LAYOUT = struct([
  publicKey("mint"),
  publicKey("owner"),
  u64("amount"),
  u32("delegateOption"),
  publicKey("delegate"),
  u8("state"),
  u32("isNativeOption"),
  u64("isNative"),
  u64("delegatedAmount"),
  u32("closeAuthorityOption"),
  publicKey("closeAuthority")
]);

const MINT_LAYOUT = struct([
  u32('mintAuthorityOption'),
  publicKey('mintAuthority'),
  u64('supply'),
  u8('decimals'),
  bool('initialized'),
  u32('freezeAuthorityOption'),
  publicKey('freezeAuthority')
]);

const AMM_INFO_LAYOUT_V4 = struct([
  u64('status'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('systemDecimalsValue'),
  // Fees
  u64('minSeparateNumerator'),
  u64('minSeparateDenominator'),
  u64('tradeFeeNumerator'),
  u64('tradeFeeDenominator'),
  u64('pnlNumerator'),
  u64('pnlDenominator'),
  u64('swapFeeNumerator'),
  u64('swapFeeDenominator'),
  // OutPutData
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlPc'),
  u64('totalPnlCoin'),
  u128('poolTotalDepositPc'),
  u128('poolTotalDepositCoin'),
  u128('swapCoinInAmount'),
  u128('swapPcOutAmount'),
  u64('swapCoin2PcFee'),
  u128('swapPcInAmount'),
  u128('swapCoinOutAmount'),
  u64('swapPc2CoinFee'),

  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner')
]);

const AMM_INFO_LAYOUT_V3 = struct([
  u64('status'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('fee'),
  u64('min_separate'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('pnlRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlX'),
  u64('totalPnlY'),
  u64('systemDecimalsValue'),
  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('ammQuantities'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner'),
  publicKey('srmTokenAccount')
])

const LENDING_OBLIGATION_LIQUIDITY = struct(
  [
    publicKey('borrowReserve'),
    u128('cumulativeBorrowRateWads'), // decimal
    u128('borrowedAmountWads'), // decimal
    u128('marketValue'), // decimal
  ]
);

const LENDING_OBLIGATION_LAYOUT = struct([
  u8("version"),
  struct([u64("slot"), bool("stale")], "lastUpdateSlot"),

  publicKey("lendingMarket"),
  publicKey("owner"),
  u128("borrowedValue"), // decimal
  u64("vaultShares"), // decimal
  u64("lpTokens"), // decimal
  u64("coinDeposits"), // decimal
  u64("pcDeposits"), // decimal
  u128("depositsMarketValue"), // decimal
  u8("lpDecimals"),
  u8("coinDecimals"),
  u8("pcDecimals"),
  u8("depositsLen"),
  u8("borrowsLen"),
  struct(
    [
      publicKey("borrowReserve"),
      u128("cumulativeBorrowRateWads"), // decimal
      u128("borrowedAmountWads"), // decimal
      u128("marketValue") // decimal
    ],
    "obligationBorrowOne"
  ),
  struct(
    [
      publicKey("borrowReserve"),
      u128("cumulativeBorrowRateWads"), // decimal
      u128("borrowedAmountWads"), // decimal
      u128("marketValue") // decimal
    ],
    "obligationBorrowTwo"
  )
]);

const OBLIGATION_LAYOUT = struct([
  publicKey('obligationAccount'),
  u64('coinAmount'),
  u64('pcAmount'),
  u64('depositedLPTokens'),
  u8('positionState'),
]);

const USER_FARM = struct([
  blob(76),
  struct(
    [OBLIGATION_LAYOUT, OBLIGATION_LAYOUT, OBLIGATION_LAYOUT], "obligations"
  )
]);

module.exports = {
  filters,
  FARMS,
  VAULT_LAYOUT,
  USER_BALANCE_LAYOUT,
  STAKE_INFO_LAYOUT_V4,
  STAKE_INFO_LAYOUT,
  ACCOUNT_LAYOUT,
  MINT_LAYOUT,
  AMM_INFO_LAYOUT_V4,
  AMM_INFO_LAYOUT_V3,
  LENDING_OBLIGATION_LIQUIDITY,
  LENDING_OBLIGATION_LAYOUT,
  OBLIGATION_LAYOUT,
  USER_FARM,
};


