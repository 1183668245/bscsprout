const CONFIG = {
  chainId: 56,
  chainName: "BNB Smart Chain",
  tokenAddress: "0x3891cdd9063188f8cc23f8248ee5ef2b65dd7777",
  vaultAddress: "0x3d4E5f9Bf7D5f0D6856eb9979DdF3387E177F67A",
  factoryAddress: "0xe62CBBbab83E2BB1e59CD1ae6AaEb186cBb4395c",
};

const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";

const VAULT_ABI = [
  "function currentRoundId() view returns (uint64)",
  "function pendingFridayLotteryRoundId() view returns (uint64)",
  "function dividendPoolReward() view returns (uint256)",
  "function buybackPool() view returns (uint256)",
  "function totalTaxReceivedBNB() view returns (uint256)",
  "function getBuybackState() view returns ((uint256 triggerThreshold,uint256 maxPerExec,uint256 totalSpentBNB,uint256 totalBoughtToken,uint256 totalBurnedToken,uint64 cooldown,uint64 lastExecutedAt))",
  "function previewCurrentSellWindow() view returns (uint256 startAt,uint256 closeAt,bool snapshotReached,bool inWindow,bool lotteryReached)",
  "function previewCreateGardenStake(uint8 level) view returns (uint256 requiredStake, uint8 plotCount_)",
  "function previewUpgradeCost(uint8 fromLevel, uint8 toLevel) view returns (uint256)",
  "function previewSeedConfig(uint8 seedType) view returns (uint256 burnCost, uint256 outputAmount, uint256 growDuration)",
  "function getUserAccount(address user) view returns ((uint256 stakedAmount,uint256 vegetableBalance,uint256 pendingRewardToken,uint256 claimedRewardToken,uint64 gardenVersion,uint64 autoHarvestUntil,uint64 accelerateCooldownUntil,uint64 lastVegetableSettledRound,uint64 lastVegetableResetRound,uint32 lastStealDay,uint32 stealSuccessCountToday,uint32 lastStolenDay,uint32 stolenCountToday,uint8 level,uint8 plotCount,bool hasGarden))",
  "function getBackpack(address user) view returns ((uint64 boundGardenVersion,uint16 cabbage,uint16 potato,uint16 tomato,uint16 pumpkin,uint16 goldenCorn,uint16 total))",
  "function getGoldenCornState(address user) view returns ((uint64 quotaRoundId,uint64 boundGardenVersion,bool quotaUsed,bool existsNow))",
  "function getPlot(address user, uint8 plotId) view returns ((uint256 outputAmount,uint256 remainingAmount,uint64 plantedAt,uint64 matureAt,uint64 boundGardenVersion,uint8 stealCount,uint8 seedType,bool harvested))",
  "function getRoundLuckWeight(uint256 roundId, address user) view returns (uint256)",
  "function getRoundSnapshot(uint256 roundId) view returns ((uint256 dividendPoolSnapshot,uint256 releaseBps,uint256 releasedAmount,uint256 sellBudget,uint256 lotteryBudget,uint256 totalVegetableSnapshot,uint256 totalLuckSnapshot,uint64 snapshotAt,uint64 sellWindowCloseAt,uint64 lotteryRequestAt,uint64 settledAt,bool snapshotted,bool lotteryRequested,bool lotterySettled,uint8 lotteryStatus,address lotteryWinner))",
  "function getRoundUserState(uint256 roundId, address user) view returns ((uint256 frozenVegetable,uint256 frozenLuck,bool frozenPrepared,bool sold))",
  "function getRoundLuckParticipants(uint256 roundId, uint256 start, uint256 limit) view returns (address[] memory participants)",
  "function stealBurnCostOverride() view returns (uint256)",
  "function superGardenCount() view returns (uint16)",
  "function getActiveGardenUserCount() view returns (uint256)",
  "function getActiveGardenUsers(uint256 start, uint256 limit) view returns (address[] memory result)",
  "function steal(address target, uint8 plotId)",
  "function createGarden(uint8 level)",
  "function plant(uint8 plotId, uint8 seedType)",
  "function harvest(uint8 plotId)",
  "function harvestBatch(uint8[] plotIds)",
  "function buySeeds(uint8 seedType, uint256 amount)",
  "function useAccelerate()",
  "function buyAutoHarvest()",
  "function upgradeGarden(uint8 targetLevel)",
  "function redeemGarden()",
  "function claimRewards()",
  "function requestFridayLottery()",
  "function sellAllVegetables()",
  "event VegetablesSold(address indexed user, uint64 indexed roundId, uint256 frozenVegetable, uint256 rewardAmount)"
];

const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

const els = {
  connectBtn: document.getElementById("connectBtn"),
  topbarHomeLink: document.getElementById("topbarHomeLink"),
  scrollTopBtn: document.getElementById("scrollTopBtn"),
  refreshBtn: document.getElementById("refreshBtn"),
  claimBtn: document.getElementById("claimBtn"),
  sellBtn: document.getElementById("sellBtn"),
  logBox: document.getElementById("logBox"),

  factoryAddress: document.getElementById("factoryAddress"),
  tokenAddress: document.getElementById("tokenAddress"),
  vaultAddress: document.getElementById("vaultAddress"),

  userAddress: document.getElementById("userAddress"),
  networkName: document.getElementById("networkName"),
  nativeBalance: document.getElementById("nativeBalance"),
  tokenBalance: document.getElementById("tokenBalance"),

  currentRoundId: document.getElementById("currentRoundId"),
  pendingFridayRoundId: document.getElementById("pendingFridayRoundId"),
  dividendPoolReward: document.getElementById("dividendPoolReward"),
  buybackPool: document.getElementById("buybackPool"),
  sellWindowState: document.getElementById("sellWindowState"),

  hasGarden: document.getElementById("hasGarden"),
  gardenLevel: document.getElementById("gardenLevel"),
  plotCount: document.getElementById("plotCount"),
  stakedAmount: document.getElementById("stakedAmount"),
  vegetableBalance: document.getElementById("vegetableBalance"),
  activityVegetableBalance: document.getElementById("activityVegetableBalance"),
  pendingReward: document.getElementById("pendingReward"),
  gardenUserAddress: document.getElementById("gardenUserAddress"),
  gardenConnectStatus: document.getElementById("gardenConnectStatus"),
  myLuckPoint: document.getElementById("myLuckPoint"),
  myPendingBnb: document.getElementById("myPendingBnb"),
  legendGardenRemain: document.getElementById("legendGardenRemain"),
  vaultTotalTax: document.getElementById("vaultTotalTax"),
  vaultDividendPool: document.getElementById("vaultDividendPool"),
  vaultTotalBurned: document.getElementById("vaultTotalBurned"),
  playerTotalUsers: document.getElementById("playerTotalUsers"),
  playerTotalStaked: document.getElementById("playerTotalStaked"),
  playerLegendUsers: document.getElementById("playerLegendUsers"),
  playerHarvestUsers: document.getElementById("playerHarvestUsers"),
  playerQualityUsers: document.getElementById("playerQualityUsers"),
  playerNormalUsers: document.getElementById("playerNormalUsers"),
  refreshBtnGarden: document.getElementById("refreshBtnGarden"),
  claimBtnGarden: document.getElementById("claimBtnGarden"),
  redeemGardenBtn: document.getElementById("redeemGardenBtn"),
  buyGardenBtns: document.querySelectorAll(".buy-garden-btn"),
  gardenActionTips: document.querySelectorAll(".garden-action-tip"),
  buySeedBtns: document.querySelectorAll(".buy-seed-btn"),
  seedPriceBadges: document.querySelectorAll("[data-seed-price]"),
  seedTips: document.querySelectorAll("[data-seed-tip]"),
  seedQtyBtns: document.querySelectorAll(".shop-qty-btn"),
  seedTotalTips: document.querySelectorAll("[data-seed-total]"),
  utilityBtns: document.querySelectorAll(".utility-btn"),
  utilityPriceBadges: document.querySelectorAll("[data-utility-price]"),
  topNavLinks: document.querySelectorAll(".top-nav-link"),
  gardenSection: document.getElementById("gardenSection"),
  profileSection: document.getElementById("profileSection"),
  overviewSection: document.getElementById("overviewSection"),
  shopSection: document.getElementById("shopSection"),
  stealPageSection: document.getElementById("stealPageSection"),
  luckyPageSection: document.getElementById("luckyPageSection"),
  luckyCountdownLabel: document.getElementById("luckyCountdownLabel"),
  luckyCountdownValue: document.getElementById("luckyCountdownValue"),
  luckyCountdownHint: document.getElementById("luckyCountdownHint"),
  luckyMyWeight: document.getElementById("luckyMyWeight"),
  luckyLotteryBudget: document.getElementById("luckyLotteryBudget"),
  luckyStatusText: document.getElementById("luckyStatusText"),
  luckyWinner: document.getElementById("luckyWinner"),
  luckyWinnerReward: document.getElementById("luckyWinnerReward"),
  luckyWinnerHint: document.getElementById("luckyWinnerHint"),
  luckyRoundBadge: document.getElementById("luckyRoundBadge"),
  luckyDrawBtn: document.getElementById("luckyDrawBtn"),
  luckyHistoryBody: document.getElementById("luckyHistoryBody"),
  luckyHistoryPageText: document.getElementById("luckyHistoryPageText"),
  luckyHistoryPrevBtn: document.getElementById("luckyHistoryPrevBtn"),
  luckyHistoryNextBtn: document.getElementById("luckyHistoryNextBtn"),
  activityPageSection: document.getElementById("activityPageSection"),
  plantPageSection: document.getElementById("plantPageSection"),
  activityCountdownLabel: document.getElementById("activityCountdownLabel"),
  activityCountdownValue: document.getElementById("activityCountdownValue"),
  activityCountdownHint: document.getElementById("activityCountdownHint"),
  activityWindowTime: document.getElementById("activityWindowTime"),
  activityRoundStatus: document.getElementById("activityRoundStatus"),
  activityBoardTitle: document.getElementById("activityBoardTitle"),
  activityBoardBody: document.getElementById("activityBoardBody"),
  activityUserSoldState: document.getElementById("activityUserSoldState"),
  activityFrozenVegetable: document.getElementById("activityFrozenVegetable"),
  activityExpectedReward: document.getElementById("activityExpectedReward"),
  activityLuckWeight: document.getElementById("activityLuckWeight"),
  activitySellBudget: document.getElementById("activitySellBudget"),
  activityLotteryBudget: document.getElementById("activityLotteryBudget"),
  legacyPageSection: document.getElementById("legacyPageSection"),
  stealQuotaValue: document.getElementById("stealQuotaValue"),
  stealCostValue: document.getElementById("stealCostValue"),
  stealHint: document.getElementById("stealHint"),
  stealTargetCount: document.getElementById("stealTargetCount"),
  stealTargetList: document.getElementById("stealTargetList"),
  stealTargetSummary: document.getElementById("stealTargetSummary"),
  stealPlotGrid: document.getElementById("stealPlotGrid"),
  stealRefreshTargetsBtn: document.getElementById("stealRefreshTargetsBtn"),
  stealPlotFilterBtn: document.getElementById("stealPlotFilterBtn"),
  seedCountCabbage: document.getElementById("seedCountCabbage"),
  seedCountPotato: document.getElementById("seedCountPotato"),
  seedCountTomato: document.getElementById("seedCountTomato"),
  seedCountPumpkin: document.getElementById("seedCountPumpkin"),
  seedCountGoldenCorn: document.getElementById("seedCountGoldenCorn"),
  seedCountTotal: document.getElementById("seedCountTotal"),
  plantRoleBadge: document.getElementById("plantRoleBadge"),
  plantPlotBadge: document.getElementById("plantPlotBadge"),
  plantGardenSummary: document.getElementById("plantGardenSummary"),
  plantGoldenCornSummary: document.getElementById("plantGoldenCornSummary"),
  plantBulkBtn: document.getElementById("plantBulkBtn"),
  plantHarvestAllBtn: document.getElementById("plantHarvestAllBtn"),
  plotGrid: document.getElementById("plotGrid"),
  plantSeedModal: document.getElementById("plantSeedModal"),
  plantSeedModalTitle: document.getElementById("plantSeedModalTitle"),
  plantSeedModalOptions: document.getElementById("plantSeedModalOptions"),
  plantBulkModal: document.getElementById("plantBulkModal"),
  plantBulkSeedOptions: document.getElementById("plantBulkSeedOptions"),
  plantBulkPlotOptions: document.getElementById("plantBulkPlotOptions"),
  plantBulkClearBtn: document.getElementById("plantBulkClearBtn"),
  plantBulkStartBtn: document.getElementById("plantBulkStartBtn"),
  statusModal: document.getElementById("statusModal"),
  statusModalCard: document.getElementById("statusModalCard"),
  statusModalTitle: document.getElementById("statusModalTitle"),
  statusModalHint: document.getElementById("statusModalHint"),
  statusModalMessage: document.getElementById("statusModalMessage"),
  statusModalActions: document.getElementById("statusModalActions"),
  statusModalConfirmBtn: document.getElementById("statusModalConfirmBtn"),
  bulkProgressToast: document.getElementById("bulkProgressToast"),
  bulkProgressToastCard: document.getElementById("bulkProgressToastCard"),
  bulkProgressSpinner: document.getElementById("bulkProgressSpinner"),
  bulkProgressTitle: document.getElementById("bulkProgressTitle"),
  bulkProgressMeta: document.getElementById("bulkProgressMeta"),
  bulkProgressState: document.getElementById("bulkProgressState"),
  bulkProgressDetail: document.getElementById("bulkProgressDetail"),
  toastStack: document.getElementById("toastStack"),
  roleCard: document.getElementById("roleCard"),
  gardenBadge: document.getElementById("gardenBadge"),
  marketBadge: document.getElementById("marketBadge"),
  growthScore: document.getElementById("growthScore"),
};

let provider;
let signer;
let userAddress = "";
let latestViewState = null;
let activePlantPlotId = null;
let bulkPlantModalOpen = false;
let bulkPlantSeedType = 0;
let bulkPlantSelectedPlots = [];
let activeStealTarget = "";
let stealTargetStart = 0;
let stealTargetLimit = 3;
let stealShowAllPlots = false;
let currentPageView = "main";
let plantPageStatus = "idle";
let plantPlotsCache = [];
let luckyHistoryPage = 0;
const LUCKY_HISTORY_PAGE_SIZE = 10;
let statusModalConfirmTask = null;
let activeButtonPhase = null;
const seedQuantityState = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
const EMPTY_ROUND_SNAPSHOT = {
  sellBudget: 0n, lotteryBudget: 0n, totalVegetableSnapshot: 0n, snapshotted: false,
};
const EMPTY_ROUND_USER_STATE = {
  frozenVegetable: 0n, frozenLuck: 0n, frozenPrepared: false, sold: false,
};

const GARDEN_LEVEL_LABELS = {
  1: "普通土地",
  2: "优质土地",
  3: "丰收土地",
  4: "超级土地",
};

const SEED_LABELS = {
  1: "大豆种子",
  2: "水稻种子",
  3: "土豆种子",
  4: "向日葵种子",
  5: "黄金玉米种子",
};

const UTILITY_COSTS = {
  accelerate: ethers.parseUnits("10000", 18),
  protect: ethers.parseUnits("50000", 18),
  superProtect: ethers.parseUnits("25000", 18),
};

function nextUpgradeableLevel(level) {
  return level >= 1 && level < 4 ? level + 1 : 0;
}

function getAutoHarvestCost(level) {
  return Number(level) === 4 ? UTILITY_COSTS.superProtect : UTILITY_COSTS.protect;
}

function updateGardenActionButtons(account, purchaseContext = {}) {
  const hasGarden = Boolean(account?.hasGarden);
  const currentLevel = Number(account?.level ?? 0);
  const nextLevel = nextUpgradeableLevel(currentLevel);
  const tokenBalance = purchaseContext.tokenBalance ?? 0n;
  const allowance = purchaseContext.allowance ?? 0n;
  const purchaseStates = purchaseContext.purchaseStates ?? [];
  const upgradeCost = purchaseContext.upgradeCost ?? 0n;

  els.buyGardenBtns?.forEach((btn) => {
    const level = Number(btn.dataset.gardenLevel);
    const gardenName = GARDEN_LEVEL_LABELS[level] || "土地";
    const purchaseState = purchaseStates.find((item) => item.level === level);
    const card = btn.closest(".garden-card");

    card?.classList.remove("is-owned", "is-upgradeable", "is-muted");

    let disabled = false;
    let label = btn.dataset.defaultLabel || `购买${gardenName}`;
    let tip = "";

    if (!userAddress) {
      disabled = true;
      label = "连接后购买";
      tip = purchaseState ? `购买所需 ${formatNum(purchaseState.requiredStake, 18, 0)}` : "";
      card?.classList.add("is-muted");
    } else if (!hasGarden) {
      if (!purchaseState) {
        disabled = true;
        label = "加载中...";
        card?.classList.add("is-muted");
      } else if (tokenBalance < purchaseState.requiredStake) {
        disabled = true;
        label = "代币不足";
        tip = `购买所需 ${formatNum(purchaseState.requiredStake, 18, 0)}`;
        card?.classList.add("is-muted");
      } else if (allowance < purchaseState.requiredStake) {
        label = `授权并购买${gardenName}`;
        tip = `购买所需 ${formatNum(purchaseState.requiredStake, 18, 0)}`;
      } else {
        tip = `购买所需 ${formatNum(purchaseState.requiredStake, 18, 0)}`;
      }
    } else if (level === currentLevel) {
      disabled = true;
      label = "当前土地";
      tip = "你当前拥有的土地";
      card?.classList.add("is-owned");
    } else if (level === nextLevel) {
      card?.classList.add("is-upgradeable");
      tip = `仅需补差价 ${formatNum(upgradeCost, 18, 0)}`;
      if (tokenBalance < upgradeCost) {
        disabled = true;
        label = "补差价不足";
      } else if (allowance < upgradeCost) {
        label = "授权并补差价升级";
      } else {
        label = `补差价升级到${gardenName}`;
      }
    } else {
      disabled = true;
      label = level < currentLevel ? "当前以下档位" : "需先升上一档";
      card?.classList.add("is-muted");
    }

    btn.disabled = disabled;
    btn.textContent = label;
    const tipEl = card?.querySelector(`[data-garden-tip="${level}"]`);
    if (tipEl) tipEl.textContent = tip;
  });

  if (els.redeemGardenBtn) {
    els.redeemGardenBtn.disabled = !hasGarden;
    els.redeemGardenBtn.textContent = hasGarden ? "⚠ 卖出我的土地" : "暂无可卖土地";
  }
}

function setActiveNav(link) {
  els.topNavLinks?.forEach((item) => item.classList.toggle("is-active", item === link));
}

function togglePageView(view) {
  currentPageView = view;
  const showMain = view === "main";
  const showShop = view === "shop";
  const showSteal = view === "steal";
  const showLucky = view === "lucky";
  const showActivity = view === "activity";
  const showPlant = view === "plant";
  const showOverview = view === "overview";

  if (els.gardenSection) els.gardenSection.hidden = !showMain;
  if (els.profileSection) els.profileSection.hidden = !showMain;
  if (els.overviewSection) els.overviewSection.hidden = !showOverview;
  if (els.shopSection) els.shopSection.hidden = !showShop;
  if (els.stealPageSection) els.stealPageSection.hidden = !showSteal;
  if (els.luckyPageSection) els.luckyPageSection.hidden = !showLucky;
  if (els.activityPageSection) els.activityPageSection.hidden = !showActivity;
  if (els.plantPageSection) els.plantPageSection.hidden = !showPlant;
  if (els.legacyPageSection) els.legacyPageSection.hidden = true;
}

function openGardenSection() {
  const gardenLink = Array.from(els.topNavLinks || []).find((link) => link.getAttribute("href") === "#gardenSection");
  if (gardenLink) setActiveNav(gardenLink);
  togglePageView("main");
  document.querySelector("#gardenSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openShopSection() {
  const shopLink = Array.from(els.topNavLinks || []).find((link) => link.getAttribute("href") === "#shopSection");
  if (shopLink) setActiveNav(shopLink);
  togglePageView("shop");
  document.querySelector("#shopSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initTopNavView() {
  els.topNavLinks?.forEach((link) => {
    link.addEventListener("click", (event) => {
      const view = link.dataset.viewTarget || "main";
      const href = link.getAttribute("href");
      event.preventDefault();
      setActiveNav(link);
      togglePageView(view);
      if (userAddress && (view === "steal" || view === "overview" || view === "shop" || view === "plant" || view === "activity" || view === "lucky")) {
        refreshAll().catch(() => {});
      }
      const target = href ? document.querySelector(href) : null;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setSeedQuantity(seedType, qty) {
  seedQuantityState[seedType] = qty;
}

function resolveSeedQuantity(seedType, burnCost, tokenBalance, backpackTotal = 0) {
  const balanceMax = burnCost === 0n ? 0 : Number(tokenBalance / burnCost);
  const capacityMax = Math.max(0, 100 - Number(backpackTotal || 0));
  const maxQty = seedType === 5 ? Math.min(balanceMax, capacityMax, 1) : Math.min(balanceMax, capacityMax);
  const current = seedType === 5 ? 1 : (seedQuantityState[seedType] ?? 1);
  if (current === "max") {
    return maxQty;
  }
  return Math.min(Number(current), maxQty || Number(current));
}

function updateSeedQtyButtons(seedType, burnCost, tokenBalance, backpackTotal = 0) {
  const balanceMax = burnCost === 0n ? 0 : Number(tokenBalance / burnCost);
  const capacityMax = Math.max(0, 100 - Number(backpackTotal || 0));
  const maxQty = seedType === 5 ? Math.min(balanceMax, capacityMax, 1) : Math.min(balanceMax, capacityMax);
  document.querySelectorAll(`.shop-qty-btn[data-seed-type="${seedType}"]`).forEach((btn) => {
    const qty = btn.dataset.seedQty;
    const active = seedType === 5 ? qty === "1" : String(seedQuantityState[seedType] ?? 1) === qty;
    btn.classList.toggle("is-active", active);
    if (seedType === 5) {
      btn.disabled = qty !== "1" || maxQty <= 0;
      return;
    }
    if (qty === "max") {
      btn.disabled = maxQty <= 0;
      return;
    }
    btn.disabled = Number(qty) > 0 && maxQty > 0 ? Number(qty) > maxQty : false;
  });
}

function updateSeedShop(account, backpack, goldenCornState, currentRoundId, seedConfigs = [], tokenBalance = 0n, allowance = 0n, symbol = "", inSellWindow = false) {
  els.buySeedBtns?.forEach((btn) => {
    const seedType = Number(btn.dataset.seedType);
    const seed = seedConfigs.find((item) => item.seedType === seedType);
    const priceEl = document.querySelector(`[data-seed-price="${seedType}"]`);
    const outputEl = document.querySelector(`[data-seed-output="${seedType}"]`);
    const durationEl = document.querySelector(`[data-seed-duration="${seedType}"]`);
    const totalEl = document.querySelector(`[data-seed-total="${seedType}"]`);
    if (!seed) {
      btn.disabled = true;
      btn.textContent = "加载中...";
      if (priceEl) priceEl.textContent = "-";
      if (outputEl) outputEl.textContent = "-";
      if (durationEl) durationEl.textContent = "-";
      if (totalEl) totalEl.textContent = "";
      return;
    }

    const priceText = `${formatNum(seed.burnCost, 18, 0)}代币`;
    const backpackTotal = Number(backpack?.total ?? 0);
    const remainingSlots = Math.max(0, 100 - backpackTotal);
    const selectedQty = resolveSeedQuantity(seedType, seed.burnCost, tokenBalance, backpackTotal);
    const totalCost = seed.burnCost * BigInt(selectedQty || 0);
    const isGoldenCorn = seedType === 5;
    const hasGarden = Boolean(account?.hasGarden);
    const level = Number(account?.level ?? 0);
    updateSeedQtyButtons(seedType, seed.burnCost, tokenBalance, backpackTotal);

    const hasGoldenCornNow = Boolean(goldenCornState?.existsNow);
    const harvestQuotaUsed = Number(account?.level ?? 0) === 3 && Number(goldenCornState?.quotaRoundId ?? 0) === Number(currentRoundId) && Boolean(goldenCornState?.quotaUsed);

    if (priceEl) priceEl.textContent = priceText;
    if (outputEl) outputEl.textContent = isGoldenCorn
      ? `${formatNum(seed.outputAmount, 18, 0)} 份 + 1点幸运点`
      : `${formatNum(seed.outputAmount, 18, 0)} 份`;
    if (durationEl) durationEl.textContent = `${Math.floor(Number(seed.growDuration) / 3600)} 小时`;
    if (totalEl) totalEl.textContent = isGoldenCorn
      ? (selectedQty > 0 ? `本次总价 ${formatNum(totalCost, 18, 0)} ${symbol}` : "")
      : selectedQty > 0
        ? `背包剩余 ${remainingSlots}，本次总价 ${formatNum(totalCost, 18, 0)} ${symbol}`
        : "当前最高可买 0 颗";

    if (!userAddress) {
      btn.disabled = true;
      btn.textContent = "连接后查看";
      if (totalEl) totalEl.textContent = "先连接钱包查看购买状态";
    } else if (!hasGarden) {
      btn.disabled = false;
      btn.textContent = "先去购买土地";
      if (totalEl) totalEl.textContent = "拥有土地后才可购买种子";
    } else if (inSellWindow) {
      btn.disabled = true;
      btn.textContent = "卖菜期间暂停";
      if (totalEl) totalEl.textContent = "周一卖菜窗口期间不可购买种子";
    } else if (isGoldenCorn && level < 3) {
      btn.disabled = true;
      btn.textContent = "需丰收地主";
      if (totalEl) totalEl.textContent = "黄金玉米仅丰收地主及以上可购买";
    } else if (isGoldenCorn && hasGoldenCornNow) {
      btn.disabled = true;
      btn.textContent = "已售罄";
      if (totalEl) totalEl.textContent = "你当前已持有 1 颗黄金玉米，使用后才能再次购买";
    } else if (isGoldenCorn && harvestQuotaUsed) {
      btn.disabled = true;
      btn.textContent = "已售罄";
      if (totalEl) totalEl.textContent = "丰收地主本轮黄金玉米已售罄，下一轮恢复购买";
    } else if (remainingSlots <= 0) {
      btn.disabled = true;
      btn.textContent = "背包已满";
      if (totalEl) totalEl.textContent = "你的背包最多只能持有 100 枚种子";
    } else if (selectedQty <= 0 || tokenBalance < totalCost) {
      btn.disabled = true;
      btn.textContent = "代币不足";
    } else if (allowance < totalCost) {
      btn.disabled = false;
      btn.textContent = `授权并购买${selectedQty}颗${SEED_LABELS[seedType]}`;
    } else {
      btn.disabled = false;
      btn.textContent = `购买${selectedQty}颗${SEED_LABELS[seedType]}`;
    }
  });
}

function updateUtilityShop(account, tokenBalance = 0n, allowance = 0n, symbol = "", inSellWindow = false) {
  const now = Math.floor(Date.now() / 1000);
  els.utilityBtns?.forEach((btn) => {
    const action = btn.dataset.utilityAction;
    const tipEl = document.querySelector(`[data-utility-tip="${action}"]`);
    const priceEl = document.querySelector(`[data-utility-price="${action}"]`);
    const hasGarden = Boolean(account?.hasGarden);
    const cost = action === "accelerate" ? UTILITY_COSTS.accelerate : getAutoHarvestCost(account?.level);
    const cooldownLeft = Math.max(0, Number(account?.accelerateCooldownUntil || 0) - now);
    const protectLeft = Math.max(0, Number(account?.autoHarvestUntil || 0) - now);
    let label = btn.dataset.defaultLabel || "立即使用";
    let disabled = false;
    let tip = action === "accelerate"
      ? `使用需 ${formatNum(cost, 18, 0)} ${symbol}，冷却 6 小时`
      : `当前设置需 ${formatNum(cost, 18, 0)} ${symbol}，持续 15 天`;

    if (priceEl) {
      priceEl.textContent = `${formatNum(cost, 18, 0)}枚`;
    }

    if (!userAddress) {
      disabled = true;
      label = "连接后查看";
    } else if (!hasGarden) {
      disabled = false;
      label = "先去购买土地";
      tip = "拥有土地后才可使用这些功能";
    } else if (inSellWindow) {
      disabled = true;
      label = "卖菜期间暂停";
      tip = "周一卖菜窗口期间不可使用这些功能";
    } else if (action === "accelerate" && cooldownLeft > 0) {
      disabled = true;
      label = "催化剂冷却中";
      tip = `催化剂冷却剩余 ${formatCountdown(cooldownLeft)}`;
    } else if (action === "protect" && protectLeft > 0) {
      disabled = true;
      label = "栅栏生效中";
      tip = `栅栏剩余 ${formatCountdown(protectLeft)}`;
    } else if (tokenBalance < cost) {
      disabled = true;
      label = "代币不足";
    } else if (allowance < cost) {
      label = action === "accelerate" ? "授权并使用催化剂" : "授权并设置栅栏";
    }

    btn.disabled = disabled;
    btn.textContent = label;
    if (tipEl) tipEl.textContent = tip;
  });
}

function seedTypeText(seedType) {
  return SEED_LABELS[Number(seedType)] || "空地";
}

function getPlantPlotImage(seedType, ready = false) {
  if (!ready) return "./素材/种植中心/生长中.webp";
  const map = {
    1: "./素材/种植中心/大豆.webp",
    2: "./素材/种植中心/水稻.webp",
    3: "./素材/种植中心/土豆.webp",
    4: "./素材/种植中心/向日葵.webp",
    5: "./素材/种植中心/黄金玉米.webp",
  };
  return map[Number(seedType)] || "./素材/种植中心/生长中.webp";
}

function getSeedOptionImage(seedType) {
  const map = {
    1: "./素材/小卖铺/大豆种子.webp",
    2: "./素材/小卖铺/水稻种子.webp",
    3: "./素材/小卖铺/土豆种子.webp",
    4: "./素材/小卖铺/向日葵种子.webp",
    5: "./素材/小卖铺/黄金玉米种子.webp",
  };
  return map[Number(seedType)] || "./素材/种植中心/生长中.webp";
}

function getPlantableSeedOptions(account = {}, backpack = {}) {
  const options = [
    [1, backpack.cabbage], [2, backpack.potato], [3, backpack.tomato], [4, backpack.pumpkin], [5, backpack.goldenCorn],
  ].map(([seedType, count]) => ({ seedType, count: Number(count || 0) })).filter((item) => item.count > 0);
  return Number(account.level || 0) >= 3 ? options : options.filter((item) => item.seedType !== 5);
}

function createSeededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = value * 16807 % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function renderGrowingLightParticles(plotId, seedType) {
  const nowSeconds = Date.now() / 1000;
  return Array.from({ length: 8 }, (_, index) => {
    const particleSeed = (plotId + 1) * 97 + Number(seedType || 0) * 131 + (index + 1) * 389;
    const baseRandom = createSeededRandom(particleSeed);
    const duration = 4 + baseRandom() * 6;
    const phaseOffset = baseRandom() * duration;
    const cyclePosition = nowSeconds + phaseOffset;
    const cycleIndex = Math.floor(cyclePosition / duration);
    const elapsed = cyclePosition - cycleIndex * duration;
    const cycleRandom = createSeededRandom(particleSeed + cycleIndex * 977);
    const left = 30 + cycleRandom() * 40;
    const bottom = 10 + cycleRandom() * 18;
    const size = (1.8 + cycleRandom() * 2.8).toFixed(2);
    const drift = (-10 + cycleRandom() * 20).toFixed(2);
    const rise = (26 + cycleRandom() * 26).toFixed(2);
    const alpha = (0.45 + cycleRandom() * 0.45).toFixed(2);
    return `<span class="plot-life-particle" style="--x:${left.toFixed(2)}%;--y:${bottom.toFixed(2)}px;--size:${size}px;--drift:${drift}px;--rise:${rise}px;--duration:${duration.toFixed(2)}s;--delay:-${elapsed.toFixed(2)}s;--alpha:${alpha};"></span>`;
  }).join("");
}

function getBackpackSeedCount(backpack = {}, seedType) {
  const map = { 1: backpack.cabbage, 2: backpack.potato, 3: backpack.tomato, 4: backpack.pumpkin, 5: backpack.goldenCorn };
  return Number(map[Number(seedType)] || 0);
}

function getEmptyPlantPlotIds(account = {}, plots = []) {
  return plots.flatMap((plot, index) => (Number(plot.seedType) === 0 || plot.harvested || Number(plot.boundGardenVersion) !== Number(account.gardenVersion) ? [index] : []));
}

function getHarvestablePlotIds(account = {}, plots = []) {
  const now = Math.floor(Date.now() / 1000);
  return plots.flatMap((plot, index) => {
    const canHarvest = Number(plot.seedType) !== 0 && !plot.harvested && Number(plot.boundGardenVersion) === Number(account.gardenVersion) && Number(plot.matureAt) <= now;
    return canHarvest ? [index] : [];
  });
}

function getStealDailyLimit(account = {}) {
  return Number(account.level || 0) === 4 ? 6 : 3;
}
const STEAL_SOON_SECONDS = 600;
function getStealPlotState(targetAccount = {}, plot = {}, now = Math.floor(Date.now() / 1000)) {
  const invalid = Number(plot.boundGardenVersion) !== Number(targetAccount.gardenVersion) || Number(plot.seedType) === 0 || plot.harvested;
  if (invalid) return { label: "空地", tip: "这块地当前没有可偷作物", cls: "is-empty", canSteal: false, canSoon: false };
  const matureAt = Number(plot.matureAt || 0);
  if (Number(targetAccount.stolenCountToday || 0) >= 3) return { label: "今日已被偷满", tip: "这个目标今天已达到被偷上限", cls: "is-empty", canSteal: false, canSoon: false };
  if (Number(plot.stealCount) >= 3) return { label: "已被偷满", tip: "这块作物已达到单块被偷上限", cls: "is-empty", canSteal: false, canSoon: false };
  if (Number(targetAccount.autoHarvestUntil || 0) >= matureAt) return { label: "栅栏生效中", tip: "成熟后会自动收获，当前不适合下手", cls: "is-empty", canSteal: false, canSoon: false };
  if (matureAt > now) {
    const left = matureAt - now;
    const soon = left <= STEAL_SOON_SECONDS;
    return { label: soon ? "即将成熟" : "成长中", tip: soon ? `${formatCountdown(left)} 后成熟` : `${formatCountdown(left)} 后成熟`, cls: "is-growing", canSteal: false, canSoon: soon };
  }
  const amount = (BigInt(plot.remainingAmount || 0) * 500n) / 10000n;
  return { label: "可下手", tip: `可偷 ${formatNum(amount, 18, 2)} 菜量 · ${Number(plot.stealCount || 0)}/3`, cls: "is-ready", canSteal: true, canSoon: false };
}
function getStealTargetSignals(targetAccount = {}, targetPlots = []) {
  const plots = targetPlots.map((plot) => getStealPlotState(targetAccount, plot));
  return { stealableCount: plots.filter((item) => item.canSteal).length, soonCount: plots.filter((item) => item.canSoon).length };
}
function getVisibleStealPlots(targetAccount = {}, targetPlots = []) {
  const now = Math.floor(Date.now() / 1000);
  const plots = targetPlots.map((plot, index) => ({ plot, index, state: getStealPlotState(targetAccount, plot, now) }));
  if (stealShowAllPlots) return plots;
  const stealable = plots.filter((item) => item.state.canSteal);
  return stealable.length ? stealable : plots.filter((item) => item.state.canSoon);
}

function renderStealPage(steal = {}) {
  const account = latestViewState?.account;
  const targets = steal.targets || [];
  const targetAccount = steal.targetAccount;
  const targetPlots = steal.targetPlots || [];
  const totalTargets = Number(steal.totalTargets || targets.length || 0);
  const viewedTargetCount = targets.length ? Math.min(stealTargetStart + targets.length, totalTargets || targets.length) : 0;
  const visiblePlots = targetAccount ? getVisibleStealPlots(targetAccount, targetPlots) : [];
  const cost = steal.cost || ethers.parseUnits("500", 18);

  if (els.stealQuotaValue) els.stealQuotaValue.textContent = account?.hasGarden ? `${Number(account.stealSuccessCountToday || 0)}/${getStealDailyLimit(account)}` : "-";
  if (els.stealCostValue) els.stealCostValue.textContent = `${formatNum(cost, 18, 0)} 枚代币`;
  if (els.stealTargetCount) els.stealTargetCount.textContent = `${targets.length} 个推荐目标`;
  if (els.stealHint) {
    els.stealHint.textContent = !userAddress
      ? "连接钱包后查看"
      : !account?.hasGarden
        ? "先购买土地"
        : latestViewState?.inWindow
          ? "卖菜期间暂停"
          : targets.length
            ? "先选目标"
            : "暂无可偷目标";
  }

  if (els.stealRefreshTargetsBtn) els.stealRefreshTargetsBtn.disabled = totalTargets <= stealTargetLimit;
  if (els.stealPlotFilterBtn) {
    els.stealPlotFilterBtn.disabled = !targetAccount;
    els.stealPlotFilterBtn.textContent = stealShowAllPlots ? "只看可偷地块" : "查看全部地块";
  }

  if (els.stealTargetList) {
    els.stealTargetList.innerHTML = targets.length
      ? targets.map(({ address, account, signals }) => `<button class="panel target-card ${address === activeStealTarget ? "is-active" : ""}" data-steal-target="${address}"><div class="module-head"><div class="panel-title">${short(address)}</div><span class="panel-badge">${roleText(account)}</span></div><div class="target-card-meta"><span>${Number(account.plotCount || 0)} 块地</span><span>${signals?.stealableCount ? `可偷 ${signals.stealableCount} 块` : `即将成熟 ${signals?.soonCount || 0} 块`}</span></div></button>`).join("")
      : '<div class="steal-empty">当前没有可偷目标</div>';
  }

  if (els.stealTargetSummary) {
    els.stealTargetSummary.textContent = targetAccount && activeStealTarget
      ? `${short(activeStealTarget)} · 可偷 ${visiblePlots.length} 块`
      : "先选目标";
  }

  if (els.stealPlotGrid) {
    if (!targetAccount) {
      els.stealPlotGrid.innerHTML = '<div class="steal-empty">先选目标</div>';
      return;
    }

    if (!visiblePlots.length) {
      els.stealPlotGrid.innerHTML = `<div class="steal-empty">${stealShowAllPlots ? "暂无地块" : "暂无可偷地块"}</div>`;
      return;
    }

    els.stealPlotGrid.innerHTML = visiblePlots.map(({ plot, index, state }) => {
      const limitReached = Number(account?.stealSuccessCountToday || 0) >= getStealDailyLimit(account || {});
      const costEnough = (latestViewState?.tokenBalance ?? 0n) >= cost;
      const allowanceEnough = (latestViewState?.allowance ?? 0n) >= cost;
      const label = !userAddress ? "连接后偷菜" : !account?.hasGarden ? "先去购买土地" : latestViewState?.inWindow ? "卖菜期间暂停" : limitReached ? "今日次数已满" : !state.canSteal ? state.label : !costEnough ? "代币不足" : !allowanceEnough ? "授权并偷这块" : "偷这块";
      const disabled = !state.canSteal || !userAddress || !account?.hasGarden || latestViewState?.inWindow || limitReached || !costEnough;
      const media = `<div class="plot-card-media plot-card-media--steal"><img src="${getPlantPlotImage(plot.seedType, state.canSteal)}" alt="${state.canSteal ? seedTypeText(plot.seedType) : state.label}" /></div>`;
      const action = `<div class="actions"><button class="btn ${!disabled && allowanceEnough ? "btn-primary" : ""}" data-steal-action="steal" data-plot-id="${index}" ${disabled ? "disabled" : ""}>${label}</button></div>`;
      return `<div class="panel plot-card ${state.cls}"><div class="module-head"><div class="panel-title">${index + 1} 号地</div><span class="panel-badge">${state.label}</span></div>${media}<div class="feature-list"><div>${seedTypeText(plot.seedType)}</div><div>${state.tip}</div></div>${action}</div>`;
    }).join("");
  }
}

function renderPlantingCenter(account = {}, backpack = {}, goldenCornState = {}, plots = []) {
  if (els.seedCountCabbage) els.seedCountCabbage.textContent = String(backpack.cabbage ?? 0);
  if (els.seedCountPotato) els.seedCountPotato.textContent = String(backpack.potato ?? 0);
  if (els.seedCountTomato) els.seedCountTomato.textContent = String(backpack.tomato ?? 0);
  if (els.seedCountPumpkin) els.seedCountPumpkin.textContent = String(backpack.pumpkin ?? 0);
  if (els.seedCountGoldenCorn) els.seedCountGoldenCorn.textContent = String(backpack.goldenCorn ?? 0);
  if (els.seedCountTotal) els.seedCountTotal.textContent = `容量 ${Number(backpack.total ?? 0)}/100`;
  if (els.plantRoleBadge) els.plantRoleBadge.textContent = roleText(account);
  if (els.plantPlotBadge) els.plantPlotBadge.textContent = `${Number(account.plotCount ?? 0)} 地块`;
  if (els.plantGardenSummary) els.plantGardenSummary.textContent = account.hasGarden ? `${levelText(Number(account.level))} · 当前可种植 ${Number(account.plotCount || 0)} 块地` : "先购买土地后再回来种植。";
  if (els.plantGoldenCornSummary) els.plantGoldenCornSummary.textContent = goldenCornState.existsNow ? "你当前已拥有黄金玉米，使用后才能再次购买。" : `黄金玉米库存 ${Number(backpack.goldenCorn ?? 0)} 颗`;
  const harvestablePlotIds = getHarvestablePlotIds(account, plots);
  const emptyPlotIds = getEmptyPlantPlotIds(account, plots);
  const plantableOptions = getPlantableSeedOptions(account, backpack);
  if (els.plantBulkBtn) {
    const canBulkPlant = Boolean(account.hasGarden && emptyPlotIds.length && plantableOptions.length);
    els.plantBulkBtn.disabled = !canBulkPlant;
    els.plantBulkBtn.textContent = !account.hasGarden ? "先购买土地" : !emptyPlotIds.length ? "暂无空地" : !plantableOptions.length ? "背包暂无种子" : "批量种植";
  }
  if (els.plantHarvestAllBtn) {
    els.plantHarvestAllBtn.disabled = harvestablePlotIds.length === 0;
    els.plantHarvestAllBtn.textContent = harvestablePlotIds.length ? `一键收获 ${harvestablePlotIds.length} 块地` : "暂无可收获";
  }
  if (!els.plotGrid) return;
  if (!account.hasGarden) {
    els.plotGrid.innerHTML = '<div class="plot-empty">先购买土地后开启你的种植中心</div>';
    return;
  }
  if (!plots.length) {
    const message = plantPageStatus === "loading"
      ? "种植中心加载中..."
      : plantPageStatus === "error"
        ? "地块加载失败，请点击刷新重试"
        : "进入种植中心后将自动加载地块";
    els.plotGrid.innerHTML = `<div class="plot-empty">${message}</div>`;
    return;
  }
  const now = Math.floor(Date.now() / 1000);
  els.plotGrid.innerHTML = plots.map((plot, index) => {
    const empty = Number(plot.seedType) === 0 || plot.harvested || Number(plot.boundGardenVersion) !== Number(account.gardenVersion);
    const ready = !empty && Number(plot.matureAt) <= now;
    const state = empty ? "空地待种植" : ready ? "可收获" : "成长中";
    const cls = empty ? "is-empty" : ready ? "is-ready" : "is-growing";
    const growCountdownText = !empty && !ready ? `${formatCountdown(Number(plot.matureAt) - now)} 后成熟` : "";
    const isGoldenCornPlot = Number(plot.seedType) === 5;
    const amountText = empty ? "" : ready
      ? `可收获：${formatNum(plot.remainingAmount ?? 0n, 18, 2)} 份${isGoldenCornPlot ? " + 1点幸运点" : ""}`
      : `预计产量：${formatNum(plot.outputAmount ?? 0n, 18, 2)} 份${isGoldenCornPlot ? " + 1点幸运点" : ""}`;
    const media = empty
      ? `<div class="plot-card-media plot-card-media--empty"><button class="plot-empty-trigger" data-plot-action="plant" data-plot-id="${index}" aria-label="${plantableOptions.length ? "选择种子种植" : "先去小卖铺"}">+</button></div>`
      : `<div class="plot-card-media">${!ready ? `<div class="plot-life-particles">${renderGrowingLightParticles(index, plot.seedType)}</div>` : ""}<img src="${getPlantPlotImage(plot.seedType, ready)}" alt="${ready ? seedTypeText(plot.seedType) : "成长中"}" /></div>`;
    const detail = empty
      ? ""
      : `<div class="feature-list"><div>${seedTypeText(plot.seedType)}</div>${amountText ? `<div>${amountText}</div>` : ""}</div>`;
    const action = empty
      ? ""
      : ready
        ? `<div class="actions"><button class="btn btn-primary" data-plot-action="harvest" data-plot-id="${index}">立即收获</button></div>`
        : `<div class="actions"><button class="btn" disabled>${growCountdownText}</button></div>`;
    return `<div class="panel plot-card ${cls}"><div class="module-head"><div class="panel-title">${index + 1} 号地</div><span class="panel-badge">${state}</span></div>${media}${detail}${action}</div>`;
  }).join("");
}

function renderPlantSeedModal() {
  if (!els.plantSeedModal || !els.plantSeedModalOptions || !latestViewState) return;
  const show = activePlantPlotId !== null;
  els.plantSeedModal.hidden = !show;
  if (!show) return;
  const options = getPlantableSeedOptions(latestViewState.account, latestViewState.backpack);
  if (els.plantSeedModalTitle) els.plantSeedModalTitle.textContent = `选择 ${activePlantPlotId + 1} 号地要种植的种子`;
  els.plantSeedModalOptions.innerHTML = options.map((item) => `<button class="plot-seed-option" data-plot-action="plant-seed" data-plot-id="${activePlantPlotId}" data-seed-type="${item.seedType}"><span class="plot-seed-option-media"><img src="${getSeedOptionImage(item.seedType)}" alt="${SEED_LABELS[item.seedType]}" /></span><span class="plot-seed-option-main"><span class="plot-seed-option-name">${SEED_LABELS[item.seedType]}</span><span class="plot-seed-option-count">库存 ${item.count} 颗</span></span></button>`).join("");
}

function renderBulkPlantModal() {
  if (!els.plantBulkModal || !latestViewState) return;
  els.plantBulkModal.hidden = !bulkPlantModalOpen;
  if (!bulkPlantModalOpen) return;
  const options = getPlantableSeedOptions(latestViewState.account, latestViewState.backpack);
  const emptyPlotIds = getEmptyPlantPlotIds(latestViewState.account, latestViewState.plots || []);
  const stock = bulkPlantSeedType ? getBackpackSeedCount(latestViewState.backpack, bulkPlantSeedType) : 0;
  if (els.plantBulkSeedOptions) els.plantBulkSeedOptions.innerHTML = options.map((item) => `<button class="plot-seed-option ${Number(item.seedType) === Number(bulkPlantSeedType) ? "is-active" : ""}" data-bulk-seed-type="${item.seedType}"><span class="plot-seed-option-media"><img src="${getSeedOptionImage(item.seedType)}" alt="${SEED_LABELS[item.seedType]}" /></span><span class="plot-seed-option-main"><span class="plot-seed-option-name">${SEED_LABELS[item.seedType]}</span><span class="plot-seed-option-count">${item.count} 颗</span></span></button>`).join("");
  if (els.plantBulkPlotOptions) els.plantBulkPlotOptions.innerHTML = emptyPlotIds.map((plotId) => `<button class="bulk-plot-chip ${bulkPlantSelectedPlots.includes(plotId) ? "is-active" : ""}" data-bulk-plot-id="${plotId}">${plotId + 1} 号地</button>`).join("");
  if (els.plantBulkStartBtn) {
    const disabled = !bulkPlantSeedType || !bulkPlantSelectedPlots.length || stock < bulkPlantSelectedPlots.length;
    els.plantBulkStartBtn.disabled = disabled;
    els.plantBulkStartBtn.textContent = stock < bulkPlantSelectedPlots.length && bulkPlantSelectedPlots.length ? "种子不足" : `播种${bulkPlantSelectedPlots.length ? ` ${bulkPlantSelectedPlots.length} 块` : ""}`;
  }
}

async function refreshPlantPageData() {
  if (!latestViewState?.account?.hasGarden || !provider || !userAddress) {
    plantPageStatus = "idle";
    plantPlotsCache = [];
    return false;
  }
  if (plantPageStatus === "loading") return false;
  plantPageStatus = plantPlotsCache.length ? "ready" : "loading";
  renderPlantingCenter(latestViewState.account, latestViewState.backpack, latestViewState.goldenCornState, plantPlotsCache);
  try {
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, provider);
    const plots = await Promise.all(Array.from({ length: Number(latestViewState.account.plotCount || 0) }, (_, i) => vault.getPlot(userAddress, i)));
    plantPlotsCache = plots;
    latestViewState = { ...latestViewState, plots };
    plantPageStatus = "ready";
    renderPlantingCenter(latestViewState.account, latestViewState.backpack, latestViewState.goldenCornState, plots);
    return true;
  } catch (err) {
    plantPageStatus = plantPlotsCache.length ? "ready" : "error";
    renderPlantingCenter(latestViewState.account, latestViewState.backpack, latestViewState.goldenCornState, plantPlotsCache);
    log(`种植中心加载失败: ${err.message || err}`);
    return false;
  }
}

function getNextSellWindowStart(startAt, now) {
  let nextStartAt = Number(startAt || 0);
  if (!nextStartAt) return 0;
  while (nextStartAt <= now) nextStartAt += 7 * 24 * 60 * 60;
  return nextStartAt;
}

function getNextFridayLotteryStart(now = Math.floor(Date.now() / 1000)) {
  const day = ((now + 8 * 3600) / 86400 + 4) % 7 | 0;
  const dayStart = (((now + 8 * 3600) / 86400) | 0) * 86400 - 8 * 3600;
  let startAt = dayStart + ((5 - day + 7) % 7) * 86400 + 22 * 3600;
  if (startAt <= now) startAt += 7 * 86400;
  return startAt;
}

function renderLuckyPage(lucky = {}) {
  const now = Math.floor(Date.now() / 1000);
  const nextAt = getNextFridayLotteryStart(now);
  const s = lucky.snapshot || {};
  if (els.luckyCountdownLabel) els.luckyCountdownLabel.textContent = s.lotterySettled ? "本轮幸运土地主已揭晓" : s.lotteryRequested ? "幸运抽奖进行中" : "等待周五开奖";
  if (els.luckyCountdownValue) els.luckyCountdownValue.textContent = s.lotterySettled ? short(s.lotteryWinner || "") : s.lotteryRequested ? "开奖处理中" : formatCountdown(nextAt - now);
  if (els.luckyCountdownHint) els.luckyCountdownHint.textContent = s.lotterySettled ? "本轮幸运抽奖已经结束，可查看下方的幸运土地主。" : `下次开奖时间 ${formatTimePoint(nextAt)}。`;
  const myWeight = Number(lucky.myWeight || 0);
  const totalLuck = Number(s.totalLuckSnapshot || 0n);
  const luckyWinRate = totalLuck > 0 ? (myWeight / totalLuck) * 100 : 0;
  const luckyWinRateText = totalLuck > 0 ? `${parseFloat(luckyWinRate.toFixed(2))}%` : (s.lotterySettled ? "0%" : "开奖时计算");
  if (els.luckyMyWeight) els.luckyMyWeight.textContent = String(myWeight);
  if (els.luckyLotteryBudget) els.luckyLotteryBudget.textContent = `${formatNum(s.lotteryBudget || 0n, 18, 5)} BNB`;
  const isLuckySkipped = Number(s.lotteryStatus || 0) === 3;
  if (els.luckyStatusText) els.luckyStatusText.textContent = luckyWinRateText;
  if (els.luckyWinner) els.luckyWinner.textContent = s.lotterySettled
    ? isLuckySkipped
      ? "本轮跳过"
      : s.lotteryWinner && s.lotteryWinner !== ethers.ZeroAddress
        ? s.lotteryWinner
        : "待开奖"
    : "待开奖";
  if (els.luckyWinnerReward) els.luckyWinnerReward.textContent = s.lotterySettled
    ? isLuckySkipped
      ? "无奖励"
      : `${formatNum(s.lotteryBudget || 0n, 18, 5)} BNB`
    : "开奖后发放";
  if (els.luckyWinnerHint) els.luckyWinnerHint.textContent = s.lotterySettled
    ? isLuckySkipped
      ? "本轮未产生幸运土地主，因此没有对应奖励。"
      : "当前幸运土地主已产生，下方展示本轮中奖地址和获得的 BNB 奖励。"
    : "周五 22:00 达到开奖时间后开始抽奖，每轮只会抽出一位幸运土地主。";
  if (els.luckyRoundBadge) els.luckyRoundBadge.textContent = `第 ${Number(lucky.roundId || 0)} 轮`;
  if (els.luckyHistoryBody) {
    const rows = lucky.history || [];
    const totalPages = Math.max(1, Math.ceil(rows.length / LUCKY_HISTORY_PAGE_SIZE));
    if (luckyHistoryPage >= totalPages) luckyHistoryPage = totalPages - 1;
    const pageRows = rows.slice(luckyHistoryPage * LUCKY_HISTORY_PAGE_SIZE, (luckyHistoryPage + 1) * LUCKY_HISTORY_PAGE_SIZE);
    els.luckyHistoryBody.innerHTML = rows.length
      ? `<div class="activity-board-row is-head"><div>轮次</div><div>幸运土地主</div><div>奖励</div><div>开奖状态</div><div>开奖时间</div></div>${pageRows.map((item) => `<div class="activity-board-row"><div>#${item.roundId}</div><div>${short(item.winner)}</div><div>${formatNum(item.reward || 0n, 18, 5)} BNB</div><div>${item.statusText}</div><div>${item.settledAtText}</div></div>`).join("")}`
      : '<div class="steal-empty">暂时还没有历史幸运土地主</div>';
    if (els.luckyHistoryPageText) els.luckyHistoryPageText.textContent = `第 ${rows.length ? luckyHistoryPage + 1 : 1} / ${totalPages} 页`;
    if (els.luckyHistoryPrevBtn) els.luckyHistoryPrevBtn.disabled = rows.length <= LUCKY_HISTORY_PAGE_SIZE || luckyHistoryPage <= 0;
    if (els.luckyHistoryNextBtn) els.luckyHistoryNextBtn.disabled = rows.length <= LUCKY_HISTORY_PAGE_SIZE || luckyHistoryPage >= totalPages - 1;
  }
  if (els.luckyDrawBtn) {
    const beforeTime = now < nextAt;
    els.luckyDrawBtn.disabled = !userAddress || s.lotteryRequested || s.lotterySettled || beforeTime;
    els.luckyDrawBtn.textContent = !userAddress
      ? "连接后开奖"
      : s.lotteryRequested
        ? "VRF开奖处理中"
        : s.lotterySettled
          ? Number(s.lotteryStatus || 0) === 3 ? "本轮已跳过" : "本轮已开奖"
          : beforeTime
            ? "周五22:00开启开奖"
            : "开始开奖";
  }
}

function renderActivityCenter(activity = {}) {
  const now = Math.floor(Date.now() / 1000);
  const startAt = Number(activity.startAt || 0);
  const closeAt = Number(activity.closeAt || 0);
  const inWindow = !!activity.inWindow;
  const snapshot = activity.snapshot || {};
  const userState = activity.userState || {};
  const account = activity.account || {};
  const nextStartAt = getNextSellWindowStart(startAt, now);

  if (els.activityCountdownLabel && els.activityCountdownValue) {
    if (inWindow && closeAt > now) {
      els.activityCountdownLabel.textContent = "卖菜进行中";
      els.activityCountdownValue.textContent = formatCountdown(closeAt - now);
      if (els.activityCountdownHint) els.activityCountdownHint.textContent = `距离本轮收市还有 ${formatCountdown(closeAt - now)}，请在窗口结束前完成卖菜。`;
    } else {
      els.activityCountdownLabel.textContent = "等待下次开市";
      els.activityCountdownValue.textContent = nextStartAt > now ? formatCountdown(nextStartAt - now) : "--";
      if (els.activityCountdownHint) els.activityCountdownHint.textContent = nextStartAt > now
        ? `下次开市时间 ${formatTimePoint(nextStartAt)}，开市后这里会自动切成卖菜进行中。`
        : "下次开市时间读取中";
    }
  }

  if (els.activityExpectedReward) {
    const userVegetable = userState.frozenPrepared ? (userState.frozenVegetable ?? 0n) : (account.vegetableBalance ?? 0n);
    const totalSnapshot = snapshot.totalVegetableSnapshot ?? 0n;
    const sellBudget = snapshot.sellBudget ?? 0n;
    els.activityExpectedReward.textContent = snapshot.snapshotted && totalSnapshot > 0n && userVegetable > 0n
      ? `${formatNum((sellBudget * userVegetable) / totalSnapshot, 18, 5)} BNB`
      : "开市后生成";
  }

  if (els.activityBoardTitle) els.activityBoardTitle.textContent = `${Number(activity.boardRoundId || 0)} 轮卖菜收益榜`;
  if (els.activityBoardBody) {
    const rows = activity.boardEntries || [];
    els.activityBoardBody.innerHTML = rows.length
      ? `<div class="activity-board-row is-head"><div>排名</div><div>玩家</div><div>卖菜收益</div><div>卖出菜量</div></div>${rows.map((item, index) => `<div class="activity-board-row"><div class="activity-board-rank">#${index + 1}</div><div>${short(item.user)}</div><div>${formatNum(item.rewardAmount, 18, 5)} BNB</div><div>${formatNum(item.frozenVegetable, 18, 2)}</div></div>`).join("")}`
      : '<div class="steal-empty">当前轮次还没有卖菜收益记录</div>';
  }
}

function rerenderLiveState() {
  if (!latestViewState) return;
  updateUtilityShop(latestViewState.account, latestViewState.tokenBalance, latestViewState.allowance, latestViewState.symbol, latestViewState.inWindow);
  renderPlantingCenter(latestViewState.account, latestViewState.backpack, latestViewState.goldenCornState, latestViewState.plots || []);
  renderStealPage(latestViewState.steal || {});
  renderLuckyPage(latestViewState.lucky || {});
  renderActivityCenter(latestViewState.activity || {});
  renderPlantSeedModal();
  renderBulkPlantModal();
}

async function refreshLegendGardenRemain() {
  try {
    if (!window.ethereum) return;
    provider = provider || new ethers.BrowserProvider(window.ethereum);
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, provider);
    const used = await vault.superGardenCount().catch(() => 0);
    if (els.legendGardenRemain) els.legendGardenRemain.textContent = String(Math.max(0, 10 - Number(used || 0)));
  } catch {
    if (els.legendGardenRemain) els.legendGardenRemain.textContent = "-";
  }
}

function setDisconnectedState() {
  signer = undefined;
  userAddress = "";
  latestViewState = null;
  activePlantPlotId = null;
  activeStealTarget = "";
  plantPageStatus = "idle";
  plantPlotsCache = [];
  stealTargetStart = 0;
  stealTargetLimit = 3;
  stealShowAllPlots = false;
  if (els.plantSeedModal) els.plantSeedModal.hidden = true;
  els.connectBtn.textContent = "连接钱包";
  els.userAddress.textContent = "未连接";
  els.gardenUserAddress.textContent = "-";
  els.gardenConnectStatus.textContent = "-";
  updateGardenActionButtons();
  updateSeedShop();
  updateUtilityShop();
  renderPlantingCenter();
  renderStealPage();
  refreshLegendGardenRemain().catch(() => {});
  els.gardenActionTips?.forEach((el) => {
    el.textContent = "";
  });
}

async function tryRestoreSession(refresh = true) {
  if (!window.ethereum) return false;

  provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (!accounts?.length) {
    setDisconnectedState();
    return false;
  }

  userAddress = accounts[0];
  signer = await provider.getSigner(userAddress);
  if (!refresh) {
    els.connectBtn.textContent = short(userAddress);
    return true;
  }
  els.connectBtn.textContent = "同步中...";
  const synced = await refreshAll();
  if (synced) {
    els.connectBtn.textContent = short(userAddress);
    return true;
  }
  els.connectBtn.textContent = "重试同步";
  return false;
}

async function rebuildWalletContext() {
  if (!window.ethereum) return false;
  provider = undefined;
  signer = undefined;
  await wait(180);
  provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (!accounts?.length) {
    setDisconnectedState();
    return false;
  }
  userAddress = accounts[0];
  signer = await provider.getSigner(userAddress);
  return true;
}

function log(msg) {
  const time = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  els.logBox.textContent = `[${time}] ${msg}\n` + els.logBox.textContent;
}

function resetStatusModalConfirmButton() {
  if (!els.statusModalConfirmBtn) return;
  els.statusModalConfirmBtn.disabled = false;
  els.statusModalConfirmBtn.classList.remove("is-loading");
}

function showStatusModal(title, message, confirmTask = null, confirmLabel = "确认继续", options = {}) {
  if (!els.statusModal || !els.statusModalTitle || !els.statusModalMessage) {
    window.alert(message);
    return;
  }
  const isDanger = options.variant === "danger";
  const isConfirm = Boolean(confirmTask) || isDanger;
  statusModalConfirmTask = confirmTask;
  resetStatusModalConfirmButton();
  els.statusModalTitle.textContent = title;
  els.statusModalMessage.textContent = message;
  if (els.statusModalHint) els.statusModalHint.textContent = options.hint || "操作确认";
  if (els.statusModalCard) {
    els.statusModalCard.classList.toggle("is-danger", isDanger);
    els.statusModalCard.classList.toggle("is-confirm", isConfirm);
    els.statusModalCard.classList.toggle("is-compact", !isConfirm);
    els.statusModalCard.classList.remove("is-progress");
  }
  const closeBtn = els.statusModal?.querySelector(".module-head .btn[data-status-action='close']");
  if (closeBtn) closeBtn.hidden = false;
  if (els.statusModalActions) els.statusModalActions.hidden = !confirmTask;
  if (els.statusModalConfirmBtn) els.statusModalConfirmBtn.textContent = confirmLabel;
  els.statusModal.hidden = false;
}

function closeStatusModal() {
  statusModalConfirmTask = null;
  resetStatusModalConfirmButton();
  if (els.statusModalCard) els.statusModalCard.classList.remove("is-danger", "is-progress", "is-confirm", "is-compact");
  if (els.statusModalHint) els.statusModalHint.textContent = "操作确认";
  const closeBtn = els.statusModal?.querySelector(".module-head .btn[data-status-action='close']");
  if (closeBtn) closeBtn.hidden = false;
  if (els.statusModal) els.statusModal.hidden = true;
}

function hideBulkPlantProgress() {
  if (els.bulkProgressToast) els.bulkProgressToast.hidden = true;
  if (els.bulkProgressToastCard) els.bulkProgressToastCard.classList.remove("is-done");
  if (els.bulkProgressSpinner) els.bulkProgressSpinner.hidden = false;
}

function showBulkPlantProgress(seedName, current, total, plotId, stage = "wallet") {
  if (!els.bulkProgressToast || !els.bulkProgressTitle) return;
  const done = stage === "done" && current >= total;
  if (els.bulkProgressTitle) els.bulkProgressTitle.textContent = done ? "批量种植完成" : "正在批量播种中";
  if (els.bulkProgressMeta) els.bulkProgressMeta.textContent = `当前 ${current}/${total}`;
  if (els.bulkProgressState) els.bulkProgressState.textContent = done ? "已全部处理完成" : stage === "chain" ? "链上确认中" : "请在钱包确认";
  if (els.bulkProgressDetail) els.bulkProgressDetail.textContent = done ? `${seedName} · 共 ${total} 块地` : `${plotId + 1} 号地 · ${seedName}`;
  if (els.bulkProgressToastCard) els.bulkProgressToastCard.classList.toggle("is-done", done);
  if (els.bulkProgressSpinner) els.bulkProgressSpinner.hidden = done;
  els.bulkProgressToast.hidden = false;
}

function short(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "-";
}

function formatNum(value, decimals = 18, fixed = 4) {
  const n = ethers.formatUnits(value, decimals);
  const num = Number(n);
  if (!Number.isFinite(num)) return n;
  return num.toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: fixed,
  });
}

function formatCountdown(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (days > 0) return `${days}天 ${hours}小时 ${minutes}分`;
  if (hours > 0) return `${hours}小时 ${minutes}分 ${secs}秒`;
  return `${minutes}分 ${secs}秒`;
}
function formatTimePoint(ts) {
  if (!ts) return "-";
  return new Date(Number(ts) * 1000).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
}

function levelText(level) {
  const map = {
    0: "无土地",
    1: "普通土地",
    2: "优质土地",
    3: "丰收土地",
    4: "超级土地",
  };
  return map[level] ?? String(level);
}

function roleText(account) {
  if (!account?.hasGarden) return "游客";
  if (Number(account.level) === 4) return "超级土地主";
  if (Number(account.level) === 3) return "丰收土地主";
  if (Number(account.level) === 2) return "优质土地主";
  return "普通土地主";
}

function growthValue(account) {
  if (!account?.hasGarden) return "0";
  const score = Number(account.plotCount || 0) * 10 + Number(ethers.formatUnits(account.vegetableBalance || 0n, 18));
  return Math.floor(score).toString();
}
function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function showToast(title, message, duration = 2600) {
  if (!els.toastStack) return;
  const item = document.createElement("div");
  item.className = "toast";
  item.innerHTML = `<div class="toast-title">${title}</div><div class="toast-copy">${message}</div>`;
  els.toastStack.appendChild(item);
  window.setTimeout(() => {
    item.remove();
  }, duration);
}
async function handleSubmittedTx(tx, actionText = "交易", submittedLabel = "链上确认中") {
  activeButtonPhase?.setSubmittedLabel(submittedLabel);
  log(`${actionText}已提交: ${tx.hash}`);
  showToast("链上确认中", `${actionText}已提交，页面会自动同步最新状态。`);
  await tx.wait();
  log(`${actionText}已确认: ${tx.hash}`);
  showToast("交易已确认", `${actionText}已完成，正在刷新页面状态。`, 2200);
  for (const delayMs of [0, 1200, 2500]) {
    if (delayMs) await wait(delayMs);
    await refreshAll().catch(() => {});
  }
}

async function withButtonLoading(btn, task, options = {}) {
  if (!btn) return task();
  const {
    pendingLabel = "请在钱包确认",
    submittedLabel = "链上确认中",
    autoRefresh = true,
    preserveText = false,
  } = options;
  const originalText = btn.textContent;
  activeButtonPhase = {
    setPendingLabel(text = pendingLabel) { btn.textContent = text; },
    setSubmittedLabel(text = submittedLabel) { btn.textContent = text; },
    reset() { btn.textContent = originalText; }
  };
  btn.disabled = true;
  btn.classList.add("is-loading");
  activeButtonPhase.setPendingLabel();
  try {
    return await task();
  } finally {
    btn.classList.remove("is-loading");
    btn.disabled = false;
    if (!preserveText) activeButtonPhase?.reset();
    activeButtonPhase = null;
    if (autoRefresh) await refreshAll().catch(() => {});
  }
}

async function ensureTokenAllowance(requiredStake) {
  const token = new ethers.Contract(CONFIG.tokenAddress, ERC20_ABI, signer);
  const allowance = await token.allowance(userAddress, CONFIG.vaultAddress);
  if (allowance >= requiredStake) return;

  activeButtonPhase?.setPendingLabel("请在钱包确认");
  log(`授权代币中，所需数量: ${formatNum(requiredStake, 18, 2)}`);
  const tx = await token.approve(CONFIG.vaultAddress, ethers.MaxUint256);
  await handleSubmittedTx(tx, "授权交易", "授权确认中");
  activeButtonPhase?.setPendingLabel("请在钱包确认");
}

async function handleGardenAction(level) {
  try {
    await ensureWallet();
    await ensureCorrectChain();

    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, signer);
    const token = new ethers.Contract(CONFIG.tokenAddress, ERC20_ABI, signer);
    const gardenName = GARDEN_LEVEL_LABELS[level] || `等级${level}`;
    const [account, tokenBalance] = await Promise.all([
      vault.getUserAccount(userAddress),
      token.balanceOf(userAddress),
    ]);

    if (!account.hasGarden) {
      const requiredStake = (await vault.previewCreateGardenStake(level))[0];
      if (tokenBalance < requiredStake) throw new Error(`代币不足，购买${gardenName}所需数量不足`);
      await ensureTokenAllowance(requiredStake);
      log(`准备购买: ${gardenName}`);
      const tx = await vault.createGarden(level);
      await handleSubmittedTx(tx, `购买${gardenName}`);
    } else {
      const currentLevel = Number(account.level);
      if (level === currentLevel) throw new Error("当前已是该土地");
      if (level !== nextUpgradeableLevel(currentLevel)) throw new Error("当前只能升级到下一档土地");
      const upgradeCost = await vault.previewUpgradeCost(currentLevel, level);
      if (tokenBalance < upgradeCost) throw new Error(`代币不足，补差价升级到${gardenName}所需数量不足`);
      await ensureTokenAllowance(upgradeCost);
      log(`准备补差价升级到: ${gardenName}`);
      const tx = await vault.upgradeGarden(level);
      await handleSubmittedTx(tx, `升级到${gardenName}`);
    }

    await refreshAll();
  } catch (err) {
    log(`土地操作失败: ${err.shortMessage || err.message || err}`);
  }
}

async function buySeed(seedType) {
  try {
    await ensureWallet();
    await ensureCorrectChain();
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, signer);
    const token = new ethers.Contract(CONFIG.tokenAddress, ERC20_ABI, signer);
    const seedName = SEED_LABELS[seedType] || `种子${seedType}`;
    const [seedConfig, tokenBalance, account, backpack, goldenCornState, currentRoundId, sellWindow] = await Promise.all([
      vault.previewSeedConfig(seedType),
      token.balanceOf(userAddress),
      vault.getUserAccount(userAddress),
      vault.getBackpack(userAddress),
      vault.getGoldenCornState(userAddress),
      vault.currentRoundId(),
      vault.previewCurrentSellWindow(),
    ]);
    if (!account.hasGarden) {
      openGardenSection();
      log("你当前还是游客，已自动跳转到“我的土地”购买区");
      return;
    }
    if (sellWindow[3]) throw new Error("当前是卖菜窗口，暂不可购买种子");
    if (seedType === 5 && Number(account.level) < 3) throw new Error("黄金玉米仅丰收地主及以上可购买");
    if (seedType === 5 && goldenCornState.existsNow) throw new Error("你当前已持有黄金玉米，使用后才能再买");
    if (seedType === 5 && Number(account.level) === 3 && Number(goldenCornState.quotaRoundId) === Number(currentRoundId) && goldenCornState.quotaUsed) {
      throw new Error("丰收地主本轮已购买过黄金玉米");
    }

    const burnCost = seedConfig[0];
    const amount = resolveSeedQuantity(seedType, burnCost, tokenBalance, backpack.total);
    const totalCost = burnCost * BigInt(amount || 0);
    if (Number(backpack.total) >= 100) throw new Error("你的背包已满，最多只能持有 100 枚种子");
    if (amount <= 0) throw new Error(`当前最高可买 0 颗${seedName}`);
    if (tokenBalance < totalCost) throw new Error(`代币不足，购买${amount}颗${seedName}所需数量不足`);
    await ensureTokenAllowance(totalCost);
    log(`准备购买: ${seedName} x ${amount}`);
    const tx = await vault.buySeeds(seedType, amount);
    await handleSubmittedTx(tx, `购买${seedName}`);
  } catch (err) {
    log(`种子购买失败: ${err.shortMessage || err.message || err}`);
  }
}

async function handleUtilityAction(action) {
  try {
    await ensureWallet();
    await ensureCorrectChain();
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, signer);
    const token = new ethers.Contract(CONFIG.tokenAddress, ERC20_ABI, signer);
    const [account, tokenBalance, sellWindow] = await Promise.all([
      vault.getUserAccount(userAddress),
      token.balanceOf(userAddress),
      vault.previewCurrentSellWindow(),
    ]);

    if (!account.hasGarden) {
      openGardenSection();
      log("你当前还是游客，已自动跳转到“我的土地”购买区");
      return;
    }
    if (sellWindow[3]) throw new Error("当前是卖菜窗口，暂不可使用这些功能");

    const now = Math.floor(Date.now() / 1000);
    const cost = action === "accelerate" ? UTILITY_COSTS.accelerate : getAutoHarvestCost(account.level);
    if (action === "accelerate" && Number(account.accelerateCooldownUntil) > now) throw new Error("催化剂冷却中，请稍后再试");
    if (action === "protect" && Number(account.autoHarvestUntil) > now) throw new Error("栅栏仍在生效中");
    if (tokenBalance < cost) throw new Error("代币不足，当前功能无法购买或使用");

    await ensureTokenAllowance(cost);
    const tx = action === "accelerate" ? await vault.useAccelerate() : await vault.buyAutoHarvest();
    await handleSubmittedTx(tx, action === "accelerate" ? "使用催化剂" : "设置栅栏");
  } catch (err) {
    log(`道具操作失败: ${err.shortMessage || err.message || err}`);
  }
}

async function handleHarvestAll() {
  try {
    await ensureWallet();
    await ensureCorrectChain();
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, signer);
    const [account, plots] = await Promise.all([
      vault.getUserAccount(userAddress),
      latestViewState?.account?.hasGarden
        ? Promise.all(Array.from({ length: Number(latestViewState.account.plotCount || 0) }, (_, i) => vault.getPlot(userAddress, i)))
        : [],
    ]);
    if (!account.hasGarden) throw new Error("请先购买土地，再来收获作物");
    const plotIds = getHarvestablePlotIds(account, plots);
    if (!plotIds.length) throw new Error("当前没有成熟地块可一键收获");
    log(`准备一键收获 ${plotIds.length} 块地`);
    const tx = await vault.harvestBatch(plotIds);
    await handleSubmittedTx(tx, `一键收获 ${plotIds.length} 块地`);
  } catch (err) {
    log(`一键收获失败: ${err.shortMessage || err.message || err}`);
  }
}

async function handlePlotAction(plotId, action, seedType) {
  try {
    if (action === "cancel-plant") {
      activePlantPlotId = null;
      rerenderLiveState();
      return;
    }
    if (action === "plant") {
      activePlantPlotId = plotId;
      renderPlantSeedModal();
      return;
    }
    await ensureWallet();
    await ensureCorrectChain();
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, signer);
    const [account, backpack, plot] = await Promise.all([
      vault.getUserAccount(userAddress),
      vault.getBackpack(userAddress),
      vault.getPlot(userAddress, plotId),
    ]);
    if (!account.hasGarden) {
      openGardenSection();
      log("请先购买土地，再进入种植中心");
      return;
    }
    if (action === "harvest") {
      const canHarvest = Number(plot.seedType) !== 0 && !plot.harvested && Number(plot.boundGardenVersion) === Number(account.gardenVersion) && Number(plot.matureAt) <= Math.floor(Date.now() / 1000);
      if (!canHarvest) throw new Error("这块地当前还不能收获");
      activePlantPlotId = null;
      log(`准备收获 ${plotId + 1} 号地`);
      const tx = await vault.harvest(plotId);
      await handleSubmittedTx(tx, `收获 ${plotId + 1} 号地`);
      return;
    }
    const options = getPlantableSeedOptions(account, backpack);
    if (!options.length) {
      openShopSection();
      log("你的背包里还没有可种植种子，已自动跳转到小卖铺");
      return;
    }
    const selected = options.find((item) => item.seedType === Number(seedType));
    if (!selected) throw new Error("当前种子不可种植或库存不足");
    const isEmptyPlot = Number(plot.seedType) === 0 || plot.harvested || Number(plot.boundGardenVersion) !== Number(account.gardenVersion);
    if (!isEmptyPlot) throw new Error("这块地当前不是空地，不能重复种植");
    if (els.plantSeedModalTitle) els.plantSeedModalTitle.textContent = `${plotId + 1} 号地正在准备种植 ${SEED_LABELS[selected.seedType]}`;
    showToast("请在钱包确认", `正在为 ${plotId + 1} 号地种植 ${SEED_LABELS[selected.seedType]}。`);
    log(`准备在 ${plotId + 1} 号地种植 ${SEED_LABELS[selected.seedType]}`);
    const tx = await vault.plant(plotId, selected.seedType);
    activePlantPlotId = null;
    renderPlantSeedModal();
    await handleSubmittedTx(tx, `种植${SEED_LABELS[selected.seedType]}`);
  } catch (err) {
    showToast("地块操作失败", err.shortMessage || err.message || String(err));
    log(`地块操作失败: ${err.shortMessage || err.message || err}`);
  }
}

async function ensureWallet() {
  if (!window.ethereum) {
    throw new Error("未检测到钱包，请使用 MetaMask / 币安钱包浏览器");
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();
}

async function ensureCorrectChain() {
  const network = await provider.getNetwork();
  if (Number(network.chainId) === CONFIG.chainId) return;

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${CONFIG.chainId.toString(16)}` }],
    });
    await wait(400);
    provider = new ethers.BrowserProvider(window.ethereum);
  } catch (err) {
    log(`切换网络失败: ${err.message || err}`);
    throw err;
  }
}

async function connectWallet() {
  try {
    await ensureWallet();
    await ensureCorrectChain();
    els.connectBtn.textContent = "同步中...";
    const synced = await refreshAll();
    if (!synced) {
      els.connectBtn.textContent = "重试同步";
      log(`钱包已连接，但状态同步失败: ${userAddress}`);
      return;
    }
    els.connectBtn.textContent = short(userAddress);
    log(`钱包已连接: ${userAddress}`);
  } catch (err) {
    log(`连接失败: ${err.message || err}`);
  }
}

async function refreshAll(allowRetry = true) {
  try {
    if (!provider || !userAddress) {
      const restored = await tryRestoreSession(false);
      if (!restored) {
        throw new Error("钱包未连接");
      }
    }

    const network = await provider.getNetwork();
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, provider);
    const token = new ethers.Contract(CONFIG.tokenAddress, ERC20_ABI, provider);
    const shouldLoadSteal = currentPageView === "steal";
    const shouldLoadOverview = currentPageView === "overview";
    const shouldLoadShopState = currentPageView === "shop" || currentPageView === "plant";
    const shouldLoadPlant = currentPageView === "plant";
    const shouldLoadActivity = currentPageView === "activity";
    const shouldLoadLucky = currentPageView === "lucky";

    const currentRoundId = await vault.currentRoundId();
    const [
      nativeBalance,
      symbol,
      decimals,
      tokenBalance,
      allowance,
      pendingFridayRoundId,
      dividendPoolReward,
      buybackPool,
      totalTaxReceivedBNB,
      deadTokenBalance,
      sellWindow,
      account,
      backpack,
      goldenCornState,
      luckPoint,
      currentRoundSnapshot,
      currentRoundUserState,
      purchaseStates,
      seedConfigs,
      stealBurnCostOverride,
      superGardenCount,
      activeGardenUserCount,
      stealAddresses
    ] = await Promise.all([
      provider.getBalance(userAddress),
      token.symbol(),
      token.decimals(),
      token.balanceOf(userAddress),
      token.allowance(userAddress, CONFIG.vaultAddress),
      vault.pendingFridayLotteryRoundId(),
      vault.dividendPoolReward(),
      vault.buybackPool(),
      vault.totalTaxReceivedBNB().catch(() => 0n),
      token.balanceOf(DEAD_ADDRESS).catch(() => 0n),
      vault.previewCurrentSellWindow(),
      vault.getUserAccount(userAddress),
      shouldLoadShopState ? vault.getBackpack(userAddress) : (latestViewState?.backpack || {}),
      shouldLoadShopState ? vault.getGoldenCornState(userAddress) : (latestViewState?.goldenCornState || {}),
      shouldLoadLucky ? vault.getRoundLuckWeight(currentRoundId, userAddress).catch(() => 0n) : (latestViewState?.lucky?.myWeight || 0n),
      (shouldLoadActivity || shouldLoadLucky) ? vault.getRoundSnapshot(currentRoundId).catch(() => EMPTY_ROUND_SNAPSHOT) : (latestViewState?.activity?.snapshot || latestViewState?.lucky?.snapshot || EMPTY_ROUND_SNAPSHOT),
      shouldLoadActivity ? vault.getRoundUserState(currentRoundId, userAddress).catch(() => EMPTY_ROUND_USER_STATE) : (latestViewState?.activity?.userState || EMPTY_ROUND_USER_STATE),
      Promise.all([1, 2, 3, 4].map(async (level) => {
        const [requiredStake] = await vault.previewCreateGardenStake(level);
        return { level, requiredStake };
      })),
      Promise.all([1, 2, 3, 4, 5].map(async (seedType) => {
        const [burnCost, outputAmount, growDuration] = await vault.previewSeedConfig(seedType);
        return { seedType, burnCost, outputAmount, growDuration };
      })),
      vault.stealBurnCostOverride().catch(() => 0n),
      vault.superGardenCount().catch(() => 0),
      shouldLoadOverview ? vault.getActiveGardenUserCount().catch(() => 0n) : 0n,
      shouldLoadSteal ? vault.getActiveGardenUsers(stealTargetStart, stealTargetLimit).catch(() => []) : [],
    ]);

    els.factoryAddress.textContent = CONFIG.factoryAddress;
    els.tokenAddress.textContent = CONFIG.tokenAddress;
    els.vaultAddress.textContent = CONFIG.vaultAddress;

    els.userAddress.textContent = userAddress;
    const tokenBalanceText = `${formatNum(tokenBalance, decimals, 0)} ${symbol}`;

    els.userAddress.textContent = userAddress;
    els.gardenUserAddress.textContent = tokenBalanceText;
    els.networkName.textContent = `${CONFIG.chainName} (${network.chainId})`;
    els.nativeBalance.textContent = `${formatNum(nativeBalance, 18, 3)} BNB`;
    els.tokenBalance.textContent = tokenBalanceText;

    if (els.currentRoundId) els.currentRoundId.textContent = currentRoundId.toString();
    if (els.pendingFridayRoundId) els.pendingFridayRoundId.textContent = pendingFridayRoundId.toString();
    if (els.dividendPoolReward) els.dividendPoolReward.textContent = `${formatNum(dividendPoolReward, 18, 5)} BNB`;
    if (els.buybackPool) els.buybackPool.textContent = `${formatNum(buybackPool, 18, 5)} BNB`;
    if (els.vaultTotalTax) els.vaultTotalTax.textContent = `${formatNum(totalTaxReceivedBNB, 18, 5)} BNB`;
    if (els.vaultDividendPool) els.vaultDividendPool.textContent = `${formatNum(dividendPoolReward, 18, 5)} BNB`;
    if (els.vaultTotalBurned) els.vaultTotalBurned.textContent = `${formatNum(deadTokenBalance, decimals, 0)} ${symbol}`;
    if (els.legendGardenRemain) els.legendGardenRemain.textContent = String(Math.max(0, 10 - Number(superGardenCount || 0)));

    if (shouldLoadOverview) {
      const allActiveGardenUsers = Number(activeGardenUserCount) > 0 ? await vault.getActiveGardenUsers(0, activeGardenUserCount).catch(() => []) : [];
      const playerAccounts = (await Promise.all(allActiveGardenUsers.map(async (address) => {
        try {
          return await vault.getUserAccount(address);
        } catch {
          return null;
        }
      }))).filter(Boolean);
      const playerOverview = playerAccounts.reduce((acc, item) => {
        acc.totalStaked += item.stakedAmount ?? 0n;
        const level = Number(item.level || 0);
        if (level === 4) acc.legendUsers += 1;
        else if (level === 3) acc.harvestUsers += 1;
        else if (level === 2) acc.qualityUsers += 1;
        else if (level === 1) acc.normalUsers += 1;
        return acc;
      }, { totalStaked: 0n, legendUsers: 0, harvestUsers: 0, qualityUsers: 0, normalUsers: 0 });

      if (els.playerTotalUsers) els.playerTotalUsers.textContent = `${allActiveGardenUsers.length} 个`;
      if (els.playerTotalStaked) els.playerTotalStaked.textContent = `${formatNum(playerOverview.totalStaked, decimals, 0)} ${symbol}`;
      if (els.playerLegendUsers) els.playerLegendUsers.textContent = `${playerOverview.legendUsers} 个`;
      if (els.playerHarvestUsers) els.playerHarvestUsers.textContent = `${playerOverview.harvestUsers} 个`;
      if (els.playerQualityUsers) els.playerQualityUsers.textContent = `${playerOverview.qualityUsers} 个`;
      if (els.playerNormalUsers) els.playerNormalUsers.textContent = `${playerOverview.normalUsers} 个`;
    }

    const inWindow = sellWindow[3];
    const activityRoundId = Number(pendingFridayRoundId) > 0 && Number(pendingFridayRoundId) !== Number(currentRoundId) ? pendingFridayRoundId : currentRoundId;
    const activityRoundSnapshot = shouldLoadActivity
      ? (Number(activityRoundId) === Number(currentRoundId)
          ? currentRoundSnapshot
          : await vault.getRoundSnapshot(activityRoundId).catch(() => EMPTY_ROUND_SNAPSHOT))
      : (latestViewState?.activity?.snapshot || EMPTY_ROUND_SNAPSHOT);
    const boardRoundId = inWindow ? currentRoundId : (Number(pendingFridayRoundId) > 0 ? pendingFridayRoundId : (currentRoundId > 1n ? currentRoundId - 1n : currentRoundId));
    const activityBoard = shouldLoadActivity
      ? await vault.queryFilter(vault.filters.VegetablesSold(null, boardRoundId)).then((logs) => logs.map((log) => ({ user: log.args.user, frozenVegetable: log.args.frozenVegetable, rewardAmount: log.args.rewardAmount })).sort((a, b) => (a.rewardAmount === b.rewardAmount ? 0 : a.rewardAmount > b.rewardAmount ? -1 : 1)).slice(0, 10)).catch(() => [])
      : (latestViewState?.activity?.boardEntries || []);
    const luckyRoundId = Number(pendingFridayRoundId) > 0 ? pendingFridayRoundId : currentRoundId;
    const luckySnapshot = shouldLoadLucky
      ? (Number(luckyRoundId) === Number(currentRoundId) ? currentRoundSnapshot : await vault.getRoundSnapshot(luckyRoundId).catch(() => EMPTY_ROUND_SNAPSHOT))
      : (latestViewState?.lucky?.snapshot || EMPTY_ROUND_SNAPSHOT);
    const luckyMyWeight = shouldLoadLucky
      ? await vault.getRoundLuckWeight(luckyRoundId, userAddress).catch(() => 0n)
      : (latestViewState?.lucky?.myWeight || 0n);
    const historyStart = Math.max(1, Number(currentRoundId) - 30);
    const luckyHistory = shouldLoadLucky
      ? (await Promise.all(Array.from({ length: Math.max(0, Number(currentRoundId) - historyStart) }, (_, i) => Number(currentRoundId) - 1 - i).map(async (roundId) => {
          const snapshot = await vault.getRoundSnapshot(roundId).catch(() => EMPTY_ROUND_SNAPSHOT);
          if (!snapshot.lotterySettled || !snapshot.lotteryWinner || snapshot.lotteryWinner === ethers.ZeroAddress) return null;
          return {
            roundId,
            winner: snapshot.lotteryWinner,
            reward: snapshot.lotteryBudget ?? 0n,
            statusText: Number(snapshot.lotteryStatus || 0) === 2 ? "已开奖" : "已结算",
            settledAtText: Number(snapshot.settledAt || 0) > 0 ? formatTimePoint(Number(snapshot.settledAt || 0)) : "-",
          };
        }))).filter(Boolean)
      : (latestViewState?.lucky?.history || []);
    if (els.sellWindowState) els.sellWindowState.textContent = inWindow ? "卖菜中" : "未开市";
    const nextSellWindowStart = getNextSellWindowStart(sellWindow[0], Math.floor(Date.now() / 1000));
    if (els.activityWindowTime) els.activityWindowTime.textContent = "";
    if (els.activityRoundStatus) els.activityRoundStatus.textContent = inWindow ? "卖菜进行中" : nextSellWindowStart > 0 ? `下次开市 · 还剩 ${formatCountdown(nextSellWindowStart - Math.floor(Date.now() / 1000))}` : "下次开市";
    if (els.activitySellBudget) els.activitySellBudget.textContent = `${formatNum(activityRoundSnapshot.sellBudget ?? 0n, 18, 5)} BNB`;
    renderActivityCenter({
      startAt: sellWindow[0],
      closeAt: sellWindow[1],
      inWindow,
      pendingFridayRoundId,
      snapshot: activityRoundSnapshot,
      userState: currentRoundUserState,
      account,
    });

    const stakedAmountText = `${formatNum(account.stakedAmount, decimals, 2)} ${symbol}`;

    els.hasGarden.textContent = account.hasGarden ? "是" : "否";
    els.gardenLevel.textContent = levelText(Number(account.level));
    els.plotCount.textContent = account.plotCount.toString();
    els.stakedAmount.textContent = stakedAmountText;
    els.gardenConnectStatus.textContent = stakedAmountText;
    const vegetableBalanceText = formatNum(account.vegetableBalance, 18, 2);
    els.vegetableBalance.textContent = vegetableBalanceText;
    if (els.activityVegetableBalance) els.activityVegetableBalance.textContent = vegetableBalanceText;
    if (els.pendingReward) els.pendingReward.textContent = `${formatNum(account.pendingRewardToken, 18, 5)} BNB`;
    els.myPendingBnb.textContent = `${formatNum(account.pendingRewardToken, 18, 5)} BNB`;
    if (els.sellBtn) {
      const nothingToSell = (account.vegetableBalance ?? 0n) <= 0n;
      els.sellBtn.disabled = !userAddress || !inWindow || currentRoundUserState.sold || nothingToSell;
      els.sellBtn.textContent = !userAddress ? "连接后卖菜" : !inWindow ? "周一20:00开市" : currentRoundUserState.sold ? "本轮已卖出" : nothingToSell ? "暂无可卖菜量" : "卖出全部蔬菜";
    }
    els.myLuckPoint.textContent = luckPoint.toString();
    const upgradeCost = account.hasGarden && nextUpgradeableLevel(Number(account.level))
      ? await vault.previewUpgradeCost(Number(account.level), nextUpgradeableLevel(Number(account.level)))
      : 0n;
    const plots = plantPlotsCache;

    els.roleCard.textContent = roleText(account);
    els.gardenBadge.textContent = account.hasGarden ? levelText(Number(account.level)) : "游客身份";
    els.marketBadge.textContent = inWindow ? "卖菜中" : Number(pendingFridayRoundId) > 0 ? "待开奖" : "准备中";
    els.growthScore.textContent = growthValue(account);
    const stealTargets = shouldLoadSteal
      ? (await Promise.all(
          stealAddresses.filter((addr) => addr.toLowerCase() !== userAddress.toLowerCase()).map(async (address) => {
            try {
              const targetAccount = await vault.getUserAccount(address);
              const targetPlots = await Promise.all(Array.from({ length: Number(targetAccount.plotCount || 0) }, (_, i) => vault.getPlot(address, i)));
              return { address, account: targetAccount, plots: targetPlots, signals: getStealTargetSignals(targetAccount, targetPlots) };
            } catch {
              return null;
            }
          })
        )).filter((item) => item && (item.signals.stealableCount > 0 || item.signals.soonCount > 0))
          .sort((a, b) => b.signals.stealableCount - a.signals.stealableCount || b.signals.soonCount - a.signals.soonCount)
      : (latestViewState?.steal?.targets || []);
    if (shouldLoadSteal && !stealTargets.some((item) => item.address === activeStealTarget)) activeStealTarget = stealTargets[0]?.address || "";
    const selectedStealTarget = shouldLoadSteal
      ? stealTargets.find((item) => item.address === activeStealTarget)
      : latestViewState?.steal?.targets?.find((item) => item.address === activeStealTarget);
    const selectedStealPlots = selectedStealTarget?.plots || latestViewState?.steal?.targetPlots || [];
    latestViewState = {
      account,
      backpack,
      goldenCornState,
      plots,
      tokenBalance,
      allowance,
      symbol,
      inWindow,
      currentRoundId,
      steal: {
        cost: stealBurnCostOverride === 0n ? ethers.parseUnits("500", 18) : stealBurnCostOverride,
        totalTargets: stealTargets.length,
        targets: stealTargets,
        targetAccount: selectedStealTarget?.account || null,
        targetPlots: selectedStealPlots,
      },
      lucky: {
        roundId: luckyRoundId,
        snapshot: luckySnapshot,
        myWeight: Number(luckyMyWeight || 0n),
        history: luckyHistory,
      },
      activity: {
        startAt: sellWindow[0],
        closeAt: sellWindow[1],
        inWindow,
        pendingFridayRoundId,
        snapshot: activityRoundSnapshot,
        userState: currentRoundUserState,
        account,
        boardRoundId,
        boardEntries: activityBoard,
      },
      seedConfigs,
    };

    updateGardenActionButtons(account, { tokenBalance, allowance, purchaseStates, upgradeCost });
    updateSeedShop(account, backpack, goldenCornState, currentRoundId, seedConfigs, tokenBalance, allowance, symbol, inWindow);
    updateUtilityShop(account, tokenBalance, allowance, symbol, inWindow);
    if (!account.hasGarden) {
      plantPageStatus = "idle";
      plantPlotsCache = [];
    } else if (!plantPlotsCache.length) {
      plantPageStatus = "loading";
    }
    renderPlantingCenter(account, backpack, goldenCornState, plantPlotsCache);
    if (shouldLoadPlant && account.hasGarden) refreshPlantPageData().catch(() => {});
    renderStealPage(latestViewState.steal);

    log("状态已刷新");
    return true;
  } catch (err) {
    log(`刷新失败: ${err.message || err}`);
    if (allowRetry && window.ethereum && userAddress) {
      log("检测到钱包会话异常，正在重建连接后重试");
      const rebuilt = await rebuildWalletContext().catch(() => false);
      if (rebuilt) {
        await wait(500);
        return refreshAll(false);
      }
    }
    provider = undefined;
    signer = undefined;
    return false;
  }
}

async function sendTx(fnName) {
  try {
    await ensureWallet();
    await ensureCorrectChain();

    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, signer);
    log(`准备发送交易: ${fnName}`);
    const tx = await vault[fnName]();
    await handleSubmittedTx(tx, fnName);
  } catch (err) {
    log(`交易失败(${fnName}): ${err.shortMessage || err.message || err}`);
  }
}

async function handleClaimRewards(btn) {
  const pendingReward = latestViewState?.account?.pendingRewardToken ?? 0n;
  if (pendingReward <= 0n) {
    showStatusModal("暂无奖励", "当前暂无可领取的 BNB 奖励，请等待分红后再来领取。");
    return;
  }
  return withButtonLoading(btn, () => sendTx("claimRewards"));
}

function handleRedeemGardenConfirm() {
  const account = latestViewState?.account;
  if (!account?.hasGarden) {
    showStatusModal("暂无可卖土地", "你当前还没有可卖出的土地。", null);
    return;
  }
  const stakedText = `${formatNum(account.stakedAmount ?? 0n, 18, 0)} 枚代币`;
  const vegetableText = formatNum(account.vegetableBalance ?? 0n, 18, 2);
  const pendingRewardText = `${formatNum(account.pendingRewardToken ?? 0n, 18, 5)} BNB`;
  showStatusModal(
    "确认卖出土地",
    `卖出后你会立即失去当前土地主身份。\n\n请先确认这 3 件事：\n1. 当前土地和种植位会一并退出，未完成作物会中断。\n2. 当前菜量 ${vegetableText}、待领奖励 ${pendingRewardText}，建议先处理。\n3. 当前质押 ${stakedText} 会按链上规则结算退出。\n\n确认无误后再继续卖出。`,
    () => withButtonLoading(els.statusModalConfirmBtn, async () => {
      closeStatusModal();
      await sendTx("redeemGarden");
    }),
    "确认卖出",
    { variant: "danger", hint: "高风险操作" }
  );
}

els.topbarHomeLink?.addEventListener("click", (event) => {
  event.preventDefault();
  const href = els.topbarHomeLink.getAttribute("href") || "./index.html";
  window.location.href = href;
});
els.scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
els.connectBtn.addEventListener("click", () => withButtonLoading(els.connectBtn, connectWallet, {
  pendingLabel: "同步中...",
  submittedLabel: "同步中...",
  autoRefresh: false,
  preserveText: true,
}));
els.refreshBtn?.addEventListener("click", () => withButtonLoading(els.refreshBtn, refreshAll, { pendingLabel: "刷新中", submittedLabel: "刷新中", autoRefresh: false }));
els.refreshBtnGarden?.addEventListener("click", () => withButtonLoading(els.refreshBtnGarden, refreshAll, { pendingLabel: "刷新中", submittedLabel: "刷新中", autoRefresh: false }));
els.claimBtn?.addEventListener("click", () => handleClaimRewards(els.claimBtn));
els.claimBtnGarden?.addEventListener("click", () => handleClaimRewards(els.claimBtnGarden));
els.luckyDrawBtn?.addEventListener("click", () => withButtonLoading(els.luckyDrawBtn, handleLuckyDraw));
els.luckyHistoryPrevBtn?.addEventListener("click", () => { luckyHistoryPage = Math.max(0, luckyHistoryPage - 1); renderLuckyPage(latestViewState?.lucky || {}); });
els.luckyHistoryNextBtn?.addEventListener("click", () => { luckyHistoryPage += 1; renderLuckyPage(latestViewState?.lucky || {}); });
els.redeemGardenBtn?.addEventListener("click", handleRedeemGardenConfirm);
els.buyGardenBtns?.forEach((btn) => {
  btn.addEventListener("click", () => withButtonLoading(btn, () => handleGardenAction(Number(btn.dataset.gardenLevel))));
});
els.buySeedBtns?.forEach((btn) => {
  btn.addEventListener("click", () => withButtonLoading(btn, () => buySeed(Number(btn.dataset.seedType))));
});
els.seedQtyBtns?.forEach((btn) => {
  btn.addEventListener("click", () => {
    setSeedQuantity(Number(btn.dataset.seedType), btn.dataset.seedQty === "max" ? "max" : Number(btn.dataset.seedQty));
    if (!latestViewState) {
      refreshAll().catch(() => {});
      return;
    }
    updateSeedShop(
      latestViewState.account,
      latestViewState.backpack,
      latestViewState.goldenCornState,
      latestViewState.currentRoundId ?? 0n,
      latestViewState.seedConfigs || [],
      latestViewState.tokenBalance,
      latestViewState.allowance,
      latestViewState.symbol,
      latestViewState.inWindow,
    );
  });
});
els.utilityBtns?.forEach((btn) => {
  btn.addEventListener("click", () => withButtonLoading(btn, () => handleUtilityAction(btn.dataset.utilityAction)));
});
function openBulkPlantModal() {
  if (!latestViewState?.account?.hasGarden) {
    openGardenSection();
    return;
  }
  bulkPlantModalOpen = true;
  activePlantPlotId = null;
  bulkPlantSeedType = 0;
  bulkPlantSelectedPlots = [];
  rerenderLiveState();
}

function closeBulkPlantModal() {
  bulkPlantModalOpen = false;
  bulkPlantSeedType = 0;
  bulkPlantSelectedPlots = [];
  rerenderLiveState();
}

async function handleBulkPlantStart() {
  try {
    if (!bulkPlantSeedType) throw new Error("请先选择一个种子");
    const seedType = Number(bulkPlantSeedType);
    const seedName = SEED_LABELS[seedType] || "该种子";
    const plotIds = [...bulkPlantSelectedPlots].sort((a, b) => a - b);
    if (!plotIds.length) throw new Error("请至少选择一块空地");
    closeBulkPlantModal();
    await ensureWallet();
    await ensureCorrectChain();
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, signer);
    const [account, backpack] = await Promise.all([vault.getUserAccount(userAddress), vault.getBackpack(userAddress)]);
    if (getBackpackSeedCount(backpack, seedType) < plotIds.length) throw new Error(`${seedName}库存不足`);
    for (let i = 0; i < plotIds.length; i += 1) {
      const plotId = plotIds[i];
      const plot = await vault.getPlot(userAddress, plotId);
      const isEmptyPlot = Number(plot.seedType) === 0 || plot.harvested || Number(plot.boundGardenVersion) !== Number(account.gardenVersion);
      if (!isEmptyPlot) throw new Error(`${plotId + 1} 号地已不是空地`);
      showBulkPlantProgress(seedName, i + 1, plotIds.length, plotId, "wallet");
      showToast("请在钱包确认", `正在播种第 ${i + 1}/${plotIds.length} 块地：${plotId + 1} 号地`);
      const tx = await vault.plant(plotId, seedType);
      showBulkPlantProgress(seedName, i + 1, plotIds.length, plotId, "chain");
      await handleSubmittedTx(tx, `播种 ${plotId + 1} 号地`, `播种 ${i + 1}/${plotIds.length} 确认中`);
    }
    showBulkPlantProgress(seedName, plotIds.length, plotIds.length, plotIds[plotIds.length - 1], "done");
    showToast("批量种植完成", `${seedName} 已连续播种 ${plotIds.length} 块地。`);
    window.setTimeout(hideBulkPlantProgress, 1200);
  } catch (err) {
    hideBulkPlantProgress();
    showStatusModal("批量种植失败", err.shortMessage || err.message || String(err), null, "", { hint: "已中断" });
    showToast("批量种植失败", err.shortMessage || err.message || String(err));
    log(`批量种植失败: ${err.shortMessage || err.message || err}`);
  }
}

function onPlotActionClick(event) {
  const btn = event.target.closest("[data-plot-action]");
  if (!btn) return;
  const action = btn.dataset.plotAction;
  if (action === "plant" || action === "cancel-plant") {
    handlePlotAction(Number(btn.dataset.plotId || 0), action, Number(btn.dataset.seedType || 0));
    return;
  }
  withButtonLoading(btn, () => handlePlotAction(Number(btn.dataset.plotId || 0), action, Number(btn.dataset.seedType || 0)));
}

function onBulkPlantModalClick(event) {
  const closeBtn = event.target.closest("[data-bulk-plant-close]");
  if (closeBtn) {
    closeBulkPlantModal();
    return;
  }
  const seedBtn = event.target.closest("[data-bulk-seed-type]");
  if (seedBtn) {
    bulkPlantSeedType = Number(seedBtn.dataset.bulkSeedType || 0);
    renderBulkPlantModal();
    return;
  }
  const plotBtn = event.target.closest("[data-bulk-plot-id]");
  if (plotBtn) {
    const plotId = Number(plotBtn.dataset.bulkPlotId || 0);
    bulkPlantSelectedPlots = bulkPlantSelectedPlots.includes(plotId) ? bulkPlantSelectedPlots.filter((id) => id !== plotId) : [...bulkPlantSelectedPlots, plotId];
    renderBulkPlantModal();
    return;
  }
  if (event.target.closest("[data-bulk-plant-clear]")) {
    bulkPlantSelectedPlots = [];
    renderBulkPlantModal();
    return;
  }
  if (event.target.closest("[data-bulk-plant-start]")) {
    handleBulkPlantStart();
  }
}

function onStatusActionClick(event) {
  const actionBtn = event.target.closest("[data-status-action]");
  if (actionBtn) {
    closeStatusModal();
    return;
  }
  if (event.target === els.statusModalConfirmBtn && statusModalConfirmTask) {
    statusModalConfirmTask();
  }
}

function onStealTargetClick(event) {
  const btn = event.target.closest("[data-steal-target]");
  if (!btn) return;
  activeStealTarget = btn.dataset.stealTarget || "";
  refreshAll();
}

function onStealPlotClick(event) {
  const btn = event.target.closest("[data-steal-action='steal']");
  if (!btn) return;
  withButtonLoading(btn, () => handleStealAction(Number(btn.dataset.plotId || 0)));
}

async function handleStealRefreshTargets() {
  const totalTargets = Number(latestViewState?.steal?.totalTargets || 0);
  const pageSize = 3;
  if (totalTargets <= pageSize) return;
  const batchCount = Math.ceil(totalTargets / pageSize);
  const currentBatch = Math.floor(stealTargetStart / pageSize);
  stealTargetStart = ((currentBatch + 1) % batchCount) * pageSize;
  stealTargetLimit = pageSize;
  activeStealTarget = "";
  await refreshAll();
}

async function handleStealAction(plotId) {
  try {
    await ensureWallet();
    await ensureCorrectChain();
    const target = activeStealTarget;
    if (!target) throw new Error("请先选择一个目标");
    const vault = new ethers.Contract(CONFIG.vaultAddress, VAULT_ABI, signer);
    const token = new ethers.Contract(CONFIG.tokenAddress, ERC20_ABI, signer);
    const [account, tokenBalance, sellWindow, targetAccount, targetPlot, costOverride] = await Promise.all([
      vault.getUserAccount(userAddress),
      token.balanceOf(userAddress),
      vault.previewCurrentSellWindow(),
      vault.getUserAccount(target),
      vault.getPlot(target, plotId),
      vault.stealBurnCostOverride().catch(() => 0n),
    ]);
    if (!account.hasGarden) {
      openGardenSection();
      log("你当前还是游客，已自动跳转到“我的土地”购买区");
      return;
    }
    if (sellWindow[3]) throw new Error("当前是卖菜窗口，暂不可偷菜");
    if (Number(account.stealSuccessCountToday || 0) >= getStealDailyLimit(account)) throw new Error("你今天的偷菜次数已用完");
    if (!getStealPlotState(targetAccount, targetPlot).canSteal) throw new Error("这块地当前还不能偷");
    const cost = costOverride === 0n ? ethers.parseUnits("500", 18) : costOverride;
    if (tokenBalance < cost) throw new Error("代币不足，当前无法偷菜");
    await ensureTokenAllowance(cost);
    const tx = await vault.steal(target, plotId);
    await handleSubmittedTx(tx, `偷取 ${plotId + 1} 号地`);
  } catch (err) {
    log(`偷菜失败: ${err.shortMessage || err.message || err}`);
  }
}

els.stealTargetList?.addEventListener("click", onStealTargetClick);
els.stealRefreshTargetsBtn?.addEventListener("click", () => withButtonLoading(els.stealRefreshTargetsBtn, handleStealRefreshTargets));
els.stealPlotGrid?.addEventListener("click", onStealPlotClick);
els.plotGrid?.addEventListener("click", onPlotActionClick);
els.plantSeedModal?.addEventListener("click", onPlotActionClick);
els.plantBulkBtn?.addEventListener("click", openBulkPlantModal);
els.plantBulkModal?.addEventListener("click", onBulkPlantModalClick);
els.statusModal?.addEventListener("click", onStatusActionClick);
els.plantHarvestAllBtn?.addEventListener("click", () => withButtonLoading(els.plantHarvestAllBtn, handleHarvestAll));
els.sellBtn.addEventListener("click", () => withButtonLoading(els.sellBtn, () => sendTx("sellAllVegetables")));

window.addEventListener("load", async () => {
  els.factoryAddress.textContent = CONFIG.factoryAddress;
  els.tokenAddress.textContent = CONFIG.tokenAddress;
  els.vaultAddress.textContent = CONFIG.vaultAddress;
  initTopNavView();
  togglePageView("main");
  await refreshLegendGardenRemain().catch(() => {});

  try {
    const restored = await tryRestoreSession();
    if (!restored) {
      log("页面已加载，先连接钱包再读取状态");
    }
  } catch (err) {
    log(`自动恢复连接失败: ${err.message || err}`);
  }
});

window.addEventListener("pageshow", async () => {
  if (document.visibilityState !== "hidden") {
    await tryRestoreSession(Boolean(userAddress));
  }
});

window.setInterval(() => {
  rerenderLiveState();
}, 1000);

document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState === "visible") {
    await tryRestoreSession(Boolean(userAddress));
  }
});

if (window.ethereum) {
  window.ethereum.on?.("accountsChanged", async (accounts) => {
    if (!accounts?.length) {
      setDisconnectedState();
      log("钱包已断开连接");
      return;
    }

    log("检测到账户切换，正在刷新");
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      userAddress = accounts[0];
      signer = await provider.getSigner(userAddress);
      els.connectBtn.textContent = short(userAddress);
      await refreshAll();
    } catch (err) {
      log(`账户切换处理失败: ${err.message || err}`);
    }
  });

  window.ethereum.on?.("chainChanged", () => {
    log("检测到网络切换，页面将重新读取状态");
    window.location.reload();
  });
}
