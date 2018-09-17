// pages/login/login.js
var md5 = require('../../utils/md5')
Page({
	data: {
		logginStatus: 0    // 自定义登录状态：0，未登录；1，已登录
	},
	formSubmit: (e) => {
				wx.switchTab({
						url: '/pages/main/main'
					})
		// var username = e.detail.value.username
		// var password = e.detail.value.password
		// if (!username) {
		// 	wx.showToast({
		// 		title: '请输入用户名',
		// 		icon: 'none',
		// 		duration: 2000
		// 	})
		// 	return;
		// }
		// if (!password) {
		// 	wx.showToast({
		// 		title: '请输入密码',
		// 		icon: 'none',
		// 		duration: 2000
		// 	})
		// 	return;
		// } else {
		// 	password = md5.hexMD5(password)
		// }
		// // console.log(username)
		// // console.log(password)
		// wx.request({
		// 	url: 'http://192.168.10.81:8810/main/login',
		// 	data: { username, password },
		// 	method: 'POST',
		// 	success: function (res) {
		// 		console.log(res)
				
		// 		// if (res.data.userId != null) {
		// 		// 	console.log(res.data);
		// 		// 	//登录成功
		// 		// 	//微信端登录
		// 		// 	var app = getApp();
		// 		// 	app.getUserInfo();
		// 		// 	getApp().globalData.user = res.data;
		// 		// 	wx.switchTab({
		// 		// 		url: '/pages/books/books'
		// 		// 	})
		// 		// } else {
		// 		// 	//登录失败
		// 		// 	wx.redirectTo({
		// 		// 		url: '/pages/main/main?logginStatus=1'
		// 		// 	})
		// 		// }
		// 	}
		// });
	}
})