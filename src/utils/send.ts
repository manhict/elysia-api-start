export function isUrlValid(url: any) { try { new URL(url); return true } catch (err) { return false } }

export function sendDataAuto(data: any, status: any, url: any) {
    if (status == true && data != null) {
        return ({ error: true, status: 200, message: 'ok', data: data });
    }
    else if (data) {
        // console.log('\x1b[1;32m〉========================= DONE 200 =========================');
        // console.log("\x1b[1;34m〉AllInOneCtrl URL: " + '\x1b[1;37m' + url);
        if (typeof data === 'object') {
            if (!data?.error) data.error = false;
            if (!data?.url) data.url = url;
            return (data);
        }
        return ({ error: true, status: 203, message: data });
    }
    if (!data || data == null) {
        console.log('\x1b[1;31m〉========================= DONE 404 =========================');
        console.log("\x1b[1;34m〉AllInOneCtrl URL: " + '\x1b[1;37m' + url);
        return ({
            error: true,
            status: 404,
            message: 'Not found data'
        });
    }
    else {
        console.log('\x1b[1;31m〉========================= DONE 500 =========================');
        console.log("\x1b[1;34m〉AllInOneCtrl URL: " + '\x1b[1;37m' + url);
        return ({
            error: true,
            status: 500,
            message: 'Internal Server Error'
        });
    }
}
