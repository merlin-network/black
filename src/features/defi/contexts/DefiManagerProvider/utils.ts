import { CosmosManager } from 'features/defi/providers/cosmos/components/CosmosManager/CosmosManager'
import { JinxFarmingManager } from 'features/defi/providers/jinx-farming/components/JinxFarmingManager/JinxFarmingManager'
import { JinxyManager } from 'features/defi/providers/jinxy/components/JinxyManager/JinxyManager'
import { IdleManager } from 'features/defi/providers/idle/components/IdleManager/IdleManager'
import { OsmosisManager } from 'features/defi/providers/osmosis/components/OsmosisManager/OsmosisManager'
import { ThorchainSaversManager } from 'features/defi/providers/thorchain-savers/components/ThorchainSaversManager/ThorchainSaversManager'
import { UniV2LpManager } from 'features/defi/providers/univ2/components/UniV2Manager/UniV2LpManager'
import { DefiProvider, DefiType } from 'state/slices/opportunitiesSlice/types'

export const DefiProviderToDefiModuleResolverByDeFiType = {
  [`${DefiProvider.UniV2}`]: {
    [`${DefiType.LiquidityPool}`]: UniV2LpManager,
  },
  [`${DefiProvider.EthJinxStaking}`]: {
    [`${DefiType.Staking}`]: JinxFarmingManager,
  },
  [DefiProvider.Idle]: {
    [`${DefiType.Staking}`]: IdleManager,
  },
  [DefiProvider.ThorchainSavers]: {
    [`${DefiType.Staking}`]: ThorchainSaversManager,
  },
  [DefiProvider.ShapeShift]: JinxyManager,
  [DefiProvider.CosmosSdk]: CosmosManager,
  [DefiProvider.OsmosisLp]: OsmosisManager,
}
// Not curried since we can either have a list of providers by DefiType, or a single one for providers not yet migrated to the abstraction
export const getDefiProviderModulesResolvers = (defiProvider: DefiProvider) =>
  DefiProviderToDefiModuleResolverByDeFiType[defiProvider]
