const cookieName = '建行生活自动签到cookie'
const cookie1 = 'ayane_cookie_jhwm_User-Agent'
const cookie2 = 'ayane_cookie_jhwm_Cookie'
const cookie3 = 'ayane_cookie_jhwm_Referer'
const cookie4 = 'ayane_cookie_jhwm_X-XSRF-TOKEN'

const ayane = init()
const cookieV1 = $request.headers['User-Agent']
const cookieV2 = $request.headers['Cookie']
const cookieV3 = $request.headers['Referer']
const cookieV4 = $request.headers['X-XSRF-TOKEN']
if (cookieVal1, cookieV2, cookieV3, cookieV4) {
  if (ayane.setdata(cookieV1, cookie1) && ayane.setdata(cookieV2, cookie2) && ayane.setdata(cookieV3, cookie3) &&ayane.setdata(cookieV4, cookie4) ) {
    ayane.msg(`${cookieName}`, '获取Cookie: 成功', '')
    ayane.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieV1}`)
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
