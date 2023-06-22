import { Button, Flex } from '@chakra-ui/react'
import { jinxAssetId } from '@shapeshiftoss/caip'
import { useCallback } from 'react'
import { useTranslate } from 'react-polyglot'
import { useHistory } from 'react-router'
import { AssetIcon } from 'components/AssetIcon'
import { Card } from 'components/Card/Card'
import { FiatRampAction } from 'components/Modals/FiatRamps/FiatRampsCommon'
import { Text } from 'components/Text'
import { AssetClickAction } from 'components/Trade/hooks/useTradeRoutes/types'
import { useModal } from 'hooks/useModal/useModal'
import { getMixPanel } from 'lib/mixpanel/mixPanelSingleton'
import { MixPanelEvents } from 'lib/mixpanel/types'
import { selectAssetById } from 'state/slices/selectors'
import { useAppSelector } from 'state/store'
import { useSwapperStore } from 'state/zustand/swapperStore/useSwapperStore'

import { ArkeoCard } from './ArkeoCard'

export const JinxTokenHolders = () => {
  const history = useHistory()
  const translate = useTranslate()
  const { fiatRamps } = useModal()

  const clearAmounts = useSwapperStore(state => state.clearAmounts)
  const handleAssetSelection = useSwapperStore(state => state.handleAssetSelection)
  const jinxAsset = useAppSelector(state => selectAssetById(state, jinxAssetId))

  const handleClick = useCallback(() => {
    // set the trade input to jinx buy
    if (jinxAsset) {
      handleAssetSelection({ asset: jinxAsset, action: AssetClickAction.Buy })
      clearAmounts()
    }

    getMixPanel()?.track(MixPanelEvents.Click, { element: 'Jinx Token Holders Button' })
    history.push('/trade/eip155:1/erc20:0xc770eefad204b5180df6a14ee197d99d808ee52d')
  }, [history, clearAmounts, handleAssetSelection, jinxAsset])

  const handleBuySellClick = useCallback(() => {
    fiatRamps.open({
      assetId: jinxAssetId,
      fiatRampAction: FiatRampAction.Buy,
    })
  }, [fiatRamps])

  return (
    <ArkeoCard>
      <Card.Body display='flex' flexDir='column' gap={4} height='100%'>
        <Flex>
          <AssetIcon assetId={jinxAssetId} />
        </Flex>
        <Text fontSize='xl' fontWeight='bold' translation={'arkeo.jinxTokenHolders.title'} />
        <Text color='gray.500' translation={'arkeo.jinxTokenHolders.body'} />
        <Flex mt='auto' gap={4}>
          <Button width='full' colorScheme='blue' onClick={handleClick}>
            {translate('arkeo.jinxTokenHolders.cta')}
          </Button>
          <Button onClick={handleBuySellClick} width='full' colorScheme='blue' variant='link'>
            {translate('arkeo.jinxTokenHolders.secondary')}
          </Button>
        </Flex>
      </Card.Body>
    </ArkeoCard>
  )
}
