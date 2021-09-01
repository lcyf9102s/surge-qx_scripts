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
    let title = `我在校园自动打卡`
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

	