import { TransactionRequest } from '@ethersproject/providers';
import { Fuse } from '@midas-capital/sdk';
import { ethers } from 'ethers';

export async function fetchGasLimitForTransaction(
  fuse: Fuse,
  method: string,
  tx: TransactionRequest
) {
  try {
    return await fuse.provider.estimateGas(tx);
  } catch (error) {
    throw `Failed to estimate gas before signing and sending ${method} transaction: ${error}`;
  }
}

export async function getPriceOracle(fuse: Fuse) {
  const uniswapTwap = fuse.chainDeployment.UniswapTwapPriceOracleV2Root;
  console.log(uniswapTwap.address);
  return new ethers.Contract(uniswapTwap.address, uniswapTwap.abi, fuse.provider.getSigner());
}
