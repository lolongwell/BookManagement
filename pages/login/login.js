    // pages/login/login.js
var app = getApp()

Page({
	data: {
		percent: 0,
		errorStatus: false
	},
	formSubmit: (e) => {
		var username = e.detail.value.username
		var password = e.detail.value.password
		if (!username) {
			wx.showToast({
				title: '请输入用户名',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		if (!password) {
			wx.showToast({
				title: '请输入密码',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		wx.showLoading({
			title: '正在登陆...',
			mask: true,
			success: res => { }
		});
		wx.request({
			url: getApp().globalData.url + '/auth/login',
			data: {
				"username": username,
				"password": password
			},
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'authorization': ''
			},
			success: function (res) {
				if (res.data.success) {
					app.globalData.authorization = "Bearer " + res.data.data.token
					wx.switchTab({ url: '/pages/main/main' });
				} else {
					wx.showToast({
						title: '请检查用户名或密码是否正确！',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	}
})