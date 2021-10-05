# surge-qx_scripts
一些自制脚本
微信小程序我在校园自动打卡，首次使用需进入签到页面获取cookie（js脚本内有教程）
抵制形式主义，从我做起 : )

2021.10.5 更新：
已将js脚本写入surge模块，添加module后按步骤获取cookie后即可。
获取cookie步骤：
（1）首次使用，要在未打卡的情况下登陆小程序并打卡，若提示获取cookie成功，则完成cookie获取；
（2）根据thor抓包结果分析，cookie中的JWSESSION有效期大约14天，因此需每14天更新一次cookie（进入小程序打卡界面，提示cookie更新成功即可）
