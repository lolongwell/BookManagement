// pages/books-list/books-list.js
Page({
    data: {
        bookMsg: {},
        impressions: []
    },
    onLoad: function(option){
        var authorization = getApp().globalData.authorization
        var that = this;
        wx.request({
            url: getApp().globalData.url + '/role/getDetailByBookId',
            data: {isbncode: option.isbncode},
            method: 'GET',
            header: {
                'content-type': 'application/json',
				'authorization': authorization
            },
            success: function (res) {
                if (res.data.success) {
                    that.setData({
                        bookMsg: res.data.data,
                        impressions: res.data.data.dto
                    })
                } else {
                    wx.showToast({
                      title: '书库暂无此书，请核对ISBN码', 
                      icon: 'none',
                      duration: 2000
                    });
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 2000)
                }
            }
        })
    },
    borrowBtn: function () {
        var that = this
        var authorization = getApp().globalData.authorization
        wx.request({
            url: getApp().globalData.url + '/borrow/borrowBook',
            data: {userid: '', isbncode: that.data.bookMsg.isbncode},
            method: 'POST',
            header: {
                'content-type': 'application/json',
				'authorization': authorization
            },
            success: function (res) {
                if (res.data.success) {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'success',
                        duration: 2000
                    })
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        })
                    },2000)
                   
                }
                if (!res.data.success) {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 2000
                    })
                }
            }
        })
    }
})