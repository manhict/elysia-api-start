// @ts-ignore
import NodeCache from 'nodecache.js';

// Cache Request
const cacheTime = 2000;
export const node_caches = new NodeCache({ stdTTL: cacheTime, forceString: false, type: "dev env logs" })