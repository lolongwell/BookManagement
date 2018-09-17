// pages/user-history/user-history.js
Page({
	data: {
		history: []
	},
	onLoad: function (options) {
		var that = this;
		wx.request({
			url: getApp().globalData.url + '/invBookTask/book',
			data: { userid: 'xiongt' },
			method: 'GET',
			success: function (res) {
				that.setData({
					history: res.data.data
				})
			}
		})
	}
})