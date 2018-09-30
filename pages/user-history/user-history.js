// pages/user-history/user-history.js
Page({
	data: {
		history: [],
		hasData: false
	},
	onLoad: function (options) {
		var that = this;
		var authorization = getApp().globalData.authorization
		wx.request({
			url: getApp().globalData.url + '/invBookTask/book',
			data: { userid: '' },
			method: 'GET',
			header: {
                'content-type': 'application/json',
				'authorization': authorization
            },
			success: function (res) {
				if (res.data.data.length == 0) {
					that.setData({
						hasData: true
					})
				}
				that.setData({
					history: res.data.data
				})
			},
			fail: function () {
				that.setData({
					hasData: true
				})
			}
		})
	}
})