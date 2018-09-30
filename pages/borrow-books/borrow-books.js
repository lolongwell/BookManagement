Page({
	data: {
		isShow: false,
		isbncode: ''
	},
	scanBtnOnClick: function () {
		var that = this;
		wx.scanCode({
			// onlyFromCamera: true,
			success: function (res) {
				wx.navigateTo({
					url: '/pages/books-detail/books-detail?isbncode=' + res.result
				})
			}
		})
	},
	inputBtn: function () {
		this.setData({
			isShow: true
		})
	},
	makeSure: function () {
		this.setData({
			isShow: false
		})
	},
	cancelBtn: function () {
		this.setData({
			isShow: false
		})
	},
	bindIsbncode: function (e) {
		this.setData({
			isbncode: e.detail.value
		})
	},
	makeSure: function () {
		var isbncode = this.data.isbncode
		if (isbncode) {
			wx.navigateTo({
				url: '/pages/books-detail/books-detail?isbncode=' + isbncode
			})
			this.setData({
				isShow: false
			})
		} else {
			wx.showToast({
				title: '请先输入ISBN码',
				icon: 'none',
				duration: 2000
			})
		}
	}
})