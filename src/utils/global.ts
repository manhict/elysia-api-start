import { URL } from 'url'
import { node_caches } from './cache'
import fetchFunction from './fetch'
import proxyModel from '../models/proxyModel'
import settingModel from '../models/settingModel'


// Get List Proxy Mongoose
async function allProxyDb() {
    try {
        let status = await checkStatusProxy()
        if (status) {
            let doc = await proxyModel.find().exec();

            // get the status_proxy for v4 and v6
            let v4Status = status.status_proxy_v4;
            let v6Status = status.status_proxy_v6;

            let arrayProxy = []
            if (doc && doc.length > 0) {
                doc.forEach(element => {
                    // only add v4 proxy if status_proxy_v4 is true
                    if (element.status_all && element.type === 'v4' && v4Status) {
                        if (element.status_proxy) {
                            arrayProxy.push(element.url)
                        }
                    }
                    // only add v6 proxy if status_proxy_v6 is true
                    if (element.status_all && element.type === 'v6' && v6Status) {
                        if (element.status_proxy) {
                            arrayProxy.push(element.url)
                        }
                    }
                });
            }
            // console.log(arrayProxy);

            return arrayProxy
        } else {
            return []
        }
    } catch (err) {
        console.error("Error fetching proxies:", err.stack)
        return []
    }
}
// Check status_proxy condition
function checkStatusProxy() {
    try {
        return settingModel.find().exec()
            .then(response => {
                if (response && response.length > 0) {
                    let v4Status = response[0].proxy?.status_proxy_v4;
                    let v6Status = response[0].proxy?.status_proxy_v6;

                    // return the status of v4 and v6
                    return { status_proxy_v4: v4Status, status_proxy_v6: v6Status };
                }
                else {
                    // if no response or response is empty, return true for both
                    return { status_proxy_v4: false, status_proxy_v6: false };
                }
            })
            .catch(err => {
                console.error("Error checking proxy status:", err.stack)
                // if an error occurs, return true for both
                return { status_proxy_v4: false, status_proxy_v6: false };
            });
    } catch (error) {
        // if an error occurs, return true for both
        return { status_proxy_v4: false, status_proxy_v6: false };
    }
}

function serverProxyRandom(allProxy: any) { return getRandomService(allProxy); }
function getRandomService(services: any) { const randomIndex = Math.floor(Math.random() * services.length); return services[randomIndex]; }
function isValidURL(str: any) { try { new URL(str); return true; } catch (error) { return false; } }

// Request
export async function requestData(url: string, options: any, timeout: number, proxy: string, type: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            // Get key cache
            const key = typeof options.data === 'object' && Object.values(options.data).length > 0
                ? url + encodeURIComponent(JSON.stringify(options.data))
                : url + encodeURIComponent(String(options.data));

            const cachedResponse = node_caches.get(key);
            if (cachedResponse) {
                return resolve(cachedResponse);
            }

            // Check Proxy
            if (proxy) {
                if (!isValidURL(proxy)) {
                    return reject(`Invalid PROXY URL: ${proxy}`);
                }
            } else {
                if (['axios:proxy', 'miniget:proxy', 'fetch:proxy'].includes(type)) {
                    const proxyList = await allProxyDb();
                    proxy = serverProxyRandom(proxyList);
                } else {
                    proxy = '';
                }
            }

            // START FETCH
            const response = await fetchFunction(url, options, timeout, proxy, type);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

// Global options
(globalThis as any).requestData = requestData;

//======= EXAMPLE =======//
// test()
async function test() {
    try {
        const response = await requestData('http://103.20.103.180:4002/', {}, 5000, '', 'fetch:proxy');
        console.log(response);
        return response
    } catch (error) {
        console.error(error);
        return error;
    }
}