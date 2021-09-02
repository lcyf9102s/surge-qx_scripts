/*
我在校园自动打卡cookie版 v1.0

功能：解放双手，抵制形式主义

1.配置：
(1) Surge

[Script]
我在校园cookie更新 = type=http-request,pattern=^https:\/\/student\.wozaixiaoyuan\.com\/?.?,script-path=https://raw.githubusercontent.com/lcyf9102s/surge-qx_scripts/main/wzxycookie_update.js,script-update-interval=0
我在校园自动打卡cookie版 = type=cron,cronexp=0 0-16/4 * * *,wake-system=1,script-path=https://raw.githubusercontent.com/lcyf9102s/surge-qx_scripts/main/wozxy_final.js,script-update-interval=0
我在校园cookie获取(body,header) = type=http-request,pattern=^https:\/\/student\.wozaixiaoyuan\.com\/health\/save\.json\/?.?,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/lcyf9102s/surge-qx_scripts/main/wozxy_cookieff.js,script-update-interval=0

[MITM]
hostname=student.wozaixiaoyuan.com



(2)Quantumult X

[rewirte_local]
^https:\/\/student\.wozaixiaoyuan\.com\/health\/save\.json\/?.? url script-request-body https://raw.githubusercontent.com/lcyf9102s/surge-qx_scripts/main/wozxy_cookieff.js
^https:\/\/student\.wozaixiaoyuan\.com\/?.? url script-request-header https://raw.githubusercontent.com/lcyf9102s/surge-qx_scripts/main/wzxycookie_update.js

[task_local]
0 0 * * * https://raw.githubusercontent.com/lcyf9102s/surge-qx_scripts/main/wozxy_final.js, tag=我在校园自动打卡, img-url=https://github.com/lcyf9102s/surge-qx_scripts/raw/main/382B6BBA-1669-4C43-840E-DCE317761DB9.png, enabled=true
[MITM]
hostname = student.wozaixiaoyuan.com

2.获取cookie
（1）首次使用，要在未打卡的情况下登陆小程序并打卡，若提示获取cookie成功，则完成cookie获取；
（2）根据thor抓包结果分析，cookie中的JWSESSION有效期大约14天，因此需每14天更新一次cookie（进入小程序打卡界面，提示cookie更新成功即可）


*/



const cookieName = '我在校园cookie'
const cookieKey1 = 'ayane_cookie_wzxy_JWSESSION'
const cookieKey2 = 'ayane_cookie_wzxy_Referer'
const cookieKey3 = 'ayane_cookie_wzxy_User-Agent'
const cookieKey4 = 'ayane_cookie_wzxy_body'
const ayane = init()
const cookieVal1 = ayane.getdata(cookieKey1)
const cookieVal2 = ayane.getdata(cookieKey2)
const cookieVal3 = ayane.getdata(cookieKey3)
const cookieVal4 = ayane.getdata(cookieKey4)

const url1 = `https://student.wozaixiaoyuan.com/health/save.json`;
const method2 = `POST`;
const headers3 = {
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip,compress,br,deflate`,
'JWSESSION' : cookieVal1,
'Content-Type' : `application/x-www-form-urlencoded`,
'User-Agent' : cookieVal3,
'token' : ``,
'Cookie' : ``,
'Referer' : cookieVal2,
'Host' : `student.wozaixiaoyuan.com`,
'Accept-Language' : `en-us`,
'Accept' : `*/*`
};
const body4 = cookieVal4;

const urlu = {
    url: url1,
    method: method2,
    headers: headers3,
    body: body4
};

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}

ayane.post(urlu, (error, response, data) => {
    let result = JSON.parse(data)
    let title = `我在尼玛校园自动打卡`
    // 签到成功
    if (result && result.code == 0) {
      let subTitle = `签到结果: 成功`
      let detail = `自动打卡已完成`
      ayane.msg(title, subTitle, detail)
    }
    // 签到失败
    else {
      let subTitle = `签到结果: 失败`
      let detail = `说明: ${result.message}`
      ayane.msg(title, subTitle, detail)
    }
     ayane.done()
  })

	
