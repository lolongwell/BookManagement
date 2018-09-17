// pages/books-list/books-list.js
Page({
    data: {
        bookMsg: {},
        impressions: []
    },
    onLoad: function(option){
        // console.log(option)
        var that = this;
        wx.request({
            url: getApp().globalData.url + '/role/getDetailByBookId',
            data: {isbncode: option.isbncode},
            method: 'GET',
            success: function (res) {
                // console.log(res)
                that.setData({
                    bookMsg: res.data.data,
                    impressions: res.data.data.dto
                })
            }
        })
    },
    borrowBtn: function () {
        var that = this
        wx.request({
            url: getApp().globalData.url + '/borrow/borrowBook',
            data: {userid: 'xiongt', isbncode: that.data.bookMsg.isbncode},
            method: 'POST',
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