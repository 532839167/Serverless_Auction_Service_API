 import createError from 'http-errors';
 import { getEndedAuctions } from '../lib/getEndedAuctions';
 import { closeAuction } from '../lib/closeAuction';

async function processAuctions(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions();
    // loop through auctionsToClose. For each auction, apply closeAuction()
    const closePromises = auctionsToClose.map(auction => closeAuction(auction));
    await Promise.all(closePromises);
    return { closed: closePromises.length }; // return the amount of promises closed
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
//  console.log('processing auctions!');
}

export const handler = processAuctions;