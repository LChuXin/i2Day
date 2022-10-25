/****************************************

使用方法：先开脚本再打开App，自动会解锁，如果没效果就关了重开或者按一下恢复购买，在还不行就卸载App重新安装！最后还不行的话就是脚本失效了！

项目名称：Fileball 解锁Pro ✅
下载地址：已下架，已购的还可下载

项目名称：VSCO 解锁Pro功能 ✅
下载地址：http://mtw.so/6kOidj

项目名称：1Blocker 拦截工具✅
下载地址：http://mtw.so/6kU3Y7

项目名称：图图记账 解锁Pro功能 ✅
下载地址：http://mtw.so/5QIv3Y

项目名称：手机硬件管家 解锁高级版 ✅
下载地址：http://mtw.so/6cB8gn

项目名称：Tiao 解锁高级版（1.5.4以下版本）✅
下载地址：自己抓旧版吧，新版不行

项目名称：Pillow 解锁Pro功能 ✅
下载地址：http://mtw.so/6kOqx7

项目名称：Scanner Pro 解锁高级Vip权限
下载地址：http://mtw.so/6bSOyO


*****************************************

# Quantumult X 配置

[rewrite_local]

^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(\$RCAnonymousID%)?(.*?)*$) url script-response-body https://raw.githubusercontent.com/chxm1023/QX/main/Scripts/Reheji.js

^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(\$RCAnonymousID%)?(.*?)*$) url script-request-header https://raw.githubusercontent.com/chxm1023/QX/main/Scripts/Reheji.js

^https:\/\/app-measurement\.com\/config\/app\/1?(.*?)*$ url reject


*****************************************
# Surge, Loon, Shadowrocket配置

[Script]
http-response ^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(\$RCAnonymousID%)?(.*?)*$) requires-body=1,script-path=https://raw.githubusercontent.com/chxm1023/QX/main/Scripts/Reheji.js

http-request ^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(\$RCAnonymousID%)?(.*?)*$) script-path=https://raw.githubusercontent.com/chxm1023/QX/main/Scripts/Reheji.js



[mitm]

hostname = api.revenuecat.com, app-measurement.com

*****************************************/
(function anonymous() {
    const chxm1023 = {};
    const chxm = JSON.parse(typeof $response != "undefined" && $response.body || null);
    const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
    const list = {
        'Fileball': {
            name: 'filebox_pro',
            id: 'com.chxm1023.premium.yearly'
        },
        'VSCO': {
            name: 'membership',
            id: 'com.circles.fin.premium.yearly'
        },
        '1Blocker': {
            name: 'premium',
            id: 'blocker.ios.subscription.yearly'
        },
        'totowallet': {
            name: 'all',
            id: 'com.chxm1023.premium.yearly'
        },
        'CPUMonitor': {
            name: 'Pro',
            id: 'pro_annual'
        },
        'Taio': {
            name: 'full-version',
            id: 'taio_1499_1y_2w0_std_v2'
        },
        'Pillow': {
            name: 'premium',
            id: 'com.neybox.pillow.premium.year'
        },
        'ScannerPro': {
            name: 'plus',
            id: 'com.chxm1023.premium.yearly'
        }
    };
    const data = {
        "warning": "仅供学习，禁止转载或售卖",
        "feedback": "chxm1023",
        "wechat": "chxm1023",
        "expires_date": "2099-10-23T09:09:09Z",
        "original_purchase_date": "2022-02-02T09:09:09Z",
        "purchase_date": "2022-02-02T09:09:09Z"
    };

    if (typeof $response == "undefined") {
        delete $request.headers["x-revenuecat-etag"]; // prevent 304 issues
        delete $request.headers["X-RevenueCat-ETag"];
        chxm1023.headers = $request.headers;
    } else if (chxm && chxm.subscriber) {
        chxm.subscriber.subscriptions = chxm.subscriber.subscriptions || {};
        chxm.subscriber.entitlement = chxm.subscriber.entitlement || {};
        for (const i in list) {
            if (new RegExp(` ^ $ {
                i
            }`, `i`).test(ua)) {
                chxm.subscriber.subscriptions[list[i].id] = data;
                chxm.subscriber.entitlements[list[i].name] = JSON.parse(JSON.stringify(data));
                chxm.subscriber.entitlements[list[i].name].product_identifier = list[i].id;
                break;
            }
        }
        chxm1023.body = JSON.stringify(chxm);
    }

    $done(chxm1023);
})