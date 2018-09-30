// pages/user-comment/user-comment.js
Page({
	data: {
		comments: [],		// 所有说说
		comment: ''	,		// 添加说说
		isShow: false,
		borrowaccno: '',		// 存储临时的流水号
		hasData: false
	},
	onLoad: function (options) {
		var that = this;
		var authorization = getApp().globalData.authorization
		wx.request({
			url: getApp().globalData.url + "/invBookTask/read",
			data: {userid: ''},
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
					comments: res.data.data
				})
			},
			fail: function () {
				that.setData({
					hasData: true
				})
			}
		})
	},
	editBtn (e) {
		this.setData({
			isShow: true,
			borrowaccno: e.target.dataset.item.BORROWACCNO
		})
	},
	editcomment (e) {
		this.setData({
			comment: e.detail.value
		})
	},
	addComment () {
		var {comment, borrowaccno, comments} = this.data
		if (!comment) {
			wx.showToast({
				title: '请输入内容！',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		var that = this
		var authorization = getApp().globalData.authorization
		wx.request({
			url: getApp().globalData.url + "/invBookTask/updateImpressions",
			data: {borrowaccno: borrowaccno, impressions: comment},
			method: 'PUT',
			header: {
                'content-type': 'application/json',
				'authorization': authorization
            },
			success: function (res) {
				if (res.data.data) {
					wx.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 2000
					})
					comments.forEach((v, i) => {
						if (v.BORROWACCNO == borrowaccno) {
							v.IMPRESSIONS = comment
						}
					});
					that.setData({
						isShow: false,
						comments: comments
					})
				}
			}
		})
	},
	cancelBtn () {
		this.setData({
			isShow: false,
			comment: '',
			borrowaccno: ''
		})
	}
})