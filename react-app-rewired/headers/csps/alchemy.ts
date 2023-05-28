import type { Csp } from '../types'

export const csp: Csp = {
  'connect-src': [
    // Alchemy SDK NFT resolution on Polygon mainnet
    'https://polygon-mainnet.g.alchemy.com/nft/v2/',
    // Alchemy SDK NFT resolution on Ethereum mainnet
    'https://eth-mainnet.g.alchemy.com/nft/v2/',
  ],
}
