const cookieName = '我在校园cookie更新'
const cookieKey1 = 'ayane_cookie_wzxy_JWSESSION'
const cookieKey2 = 'ayane_cookie_wzxy_Referer'
const cookieKey3 = 'ayane_cookie_wzxy_User-Agent'
const cookieKey4 = 'ayane_cookie_wzxy_body'

const ayane = init()
const cookieVal1 = $request.headers['JWSESSION']
const cookieVal2 = $request.headers['Referer']
const cookieVal3 = $request.headers['User-Agent']
const cookieVal4 = ayane.getdata(cookieKey4)
if ((cookieVal4 == null) || (cookieVal4 == 'null4')) {ayane.done()} else (cookieVal1, cookieVal2, cookieVal3) {
  if (ayane.setdata(cookieVal1, cookieKey1) && ayane.setdata(cookieVal2, cookieKey2) &&ayane.setdata(cookieVal3, cookieKey3)) {
    ayane.msg(`${cookieName}`, '更新Cookie: 成功', '')
    ayane.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieVal1}`)
  }
}
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
ayane.done()
