import { node_caches } from './cache'
const timeoutRq = 3456;

// Fetch Cache Request
async function fetchRequestWithCache(url: string, options: any, timeout: any, proxy: string): Promise<any> {
    let key = typeof options.data === 'object' && Object.values(options.data).length > 0 ? url + encodeURIComponent(options.data) : url + (encodeURIComponent(options.data) ?? '');
    // set options
    if (!options.headers) options.headers = {};
    if (!timeout) timeout = timeoutRq;
    if (!options.method) options.method = 'GET';
    if (!options.url) options.url = url;
    if (options.data) {
        options.body = options.data;
        delete options.data;
    }
    options.timeout = timeout;

    try {
        const response = await fetch(options.url, options);
        // Sử dụng hàm handleResponse
        let response_data = {
            headers: response?.headers,
            status: response?.status,
            proxyUrl: options?.proxy,
            responseUrl: response?.url,
            data: response.ok ? await response?.json() ?? response?.text() : ''
        };
        // Save cache + return data
        node_caches.set(key, response_data);
        return response_data;
    }
    catch (error: any) {
        if (error?.response?.status === 401) {
            // console.log('\x1b[1;33mAuthentication failed. Please log in.\x1b[1;37m');
        }
        throw new Error(error)
    }
}
// Fetch Proxy Request
async function fetchRequestWithProxy(url: string, options: any, timeout: any, proxy: string): Promise<any> {
    try {
        let timeoutId: any;

        if (!timeout) timeout = timeoutRq;
        options.proxy = proxy;

        const timeoutPromise = new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => {
                console.log('\x1b[1;31m proxy:', proxy, '\x1b[1;37m');
                clearTimeout(timeoutId);
                reject(new Error(`\x1b[1;31m➱ Request timed out: ${timeout}ms\x1b[1;37m`));
            }, timeout);
        });
        const fetchPromise: any = fetchRequestWithCache(url, options, timeout, proxy)
            .then(response => response)
            .catch(error => { throw new Error(error) })
            .finally(() => { clearTimeout(timeoutId); });
        return Promise.race([fetchPromise, timeoutPromise]);
    }
    catch (error: any) {
        throw new Error(error)
    }
}

export default async function fetchFunction(url: string, options: any, timeout: Number, proxy: string, type: string): Promise<any> {
    const requestFunctions: any = {
        'fetch:cache': fetchRequestWithCache, 'fetch:proxy': fetchRequestWithProxy,
    }

    const requestFunction = requestFunctions[type] || fetchRequestWithCache

    return await requestFunction(url, options, timeout, proxy)
}