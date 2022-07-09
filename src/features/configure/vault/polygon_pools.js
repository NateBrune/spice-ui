export const polygonPools = [
  {
    id: 'arrakis-usdt-usdc',
    //id: 'quick-aave-eth',
    logo: 'usdt-pairs/USDC-USDT.png',
    name: 'Polygon USDT-USDC',
    token: 'USDT-USDC',
    tokenDescription: 'Arrakis USDC/USDT Pool',
    tokenAddress: '0x2817e729178471dbac8b1fc190b4fd8e6f3984e3',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'bvRAKIS-13',
    earnedTokenAddress: '0x59D7B8861Ce2E71cff5C012BAb5e010826ef5b61',
    earnContractAddress: '0x59D7B8861Ce2E71cff5C012BAb5e010826ef5b61', // Could be wrong
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'lps',
    oracleId: 'arrakis-usdt-usdc',
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'Arrakis.finance',
    assets: ['USDC', 'USDT'],
    callFee: 0.05,
    withdrawalFee: '0.00%',
    buyTokenUrl:
      'https://beta.arrakis.finance/vaults/137/0x2817E729178471DBAC8b1FC190b4fd8e6F3984e3',
  },
];
