import { Button, Link } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslate } from 'react-polyglot'
import { Card } from 'components/Card/Card'
import { Text } from 'components/Text'
import { useFeatureFlag } from 'hooks/useFeatureFlag/useFeatureFlag'
import { getMixPanel } from 'lib/mixpanel/mixPanelSingleton'
import { MixPanelEvents } from 'lib/mixpanel/types'

export const DappBack = () => {
  const translate = useTranslate()
  const isJinxBondCTAEnabled = useFeatureFlag('JinxBondCTA')

  const handleClick = useCallback(() => {
    getMixPanel()?.track(MixPanelEvents.Click, { element: 'Dappback Button' })
  }, [])
  if (!isJinxBondCTAEnabled) return null
  return (
    <Card>
      <Card.Header>
        <Card.Heading>
          <Text translation='plugins.jinxPage.dappBack.title' />
        </Card.Heading>
      </Card.Header>
      <Card.Body display='flex' gap={6} flexDirection='column'>
        <Text color='gray.500' translation='plugins.jinxPage.dappBack.body' />
        <Button
          as={Link}
          href='https://dappback.com/shapeshift'
          isExternal
          colorScheme='blue'
          onClick={handleClick}
        >
          {translate('plugins.jinxPage.dappBack.cta')}
        </Button>
      </Card.Body>
    </Card>
  )
}
