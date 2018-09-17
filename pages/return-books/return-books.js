var app = getApp()
var sum = 0       // 勾选的数量
Page({
    data: {
        bookList: [],           // 初始所有已借的书
        returnBooks: [],        // 要还的书
        checkStyle: 'icon'      // 全选的样式
    },
    onShow () {
        var that = this;
        wx.request({
            url: getApp().globalData.url + '/return/restMessage',
            data: {userid: 'xiongt'},
            method: 'GET',
            success: function (res) {
                // 遍历所有已借的书，添加字段checkStyle,用于控制自身的选中样式
                var bookList = res.data.data
                for (var i = 0; i < bookList.length; i++) {
                    bookList[i].checkStyle = 'icon'
                }
                that.setData({
                    bookList: bookList
                })
            }
        })
    },
    onHide () {
        this.setData({
            returnBooks: [],
            checkStyle: 'icon'
        })
    },
    changeStatus: function (e) {
        /**
         * 每一次点击，状态取反
         * 判断勾选状态。
         * 1、已勾选，将该书信息item添加到数组returnBooks中
         * 2、取消勾选，将该书信息item从数组returnBooks中移除
         * 判断勾选的条数，如果全部勾选，全选按钮的状态变成已勾选，否则未勾选
         * 更新data的数据
         */
        var {bookList, returnBooks} = this.data
        var index = e.target.dataset.index
        var item = e.target.dataset.item
        
        bookList[index].checkStyle = item.checkStyle == 'icon' ? 'icon-active' : 'icon'
        // 计数
        if (item.checkStyle == 'icon') {  // 选中状态
            sum++
            returnBooks.push(item)
        } else {     // 未选中状态
            sum--
            // 获得当前item在数组returnBooks中的下标
            returnBooks.forEach((v,i) => {
                if (v.isbncode == item.isbncode) {
                    returnBooks.splice(i, 1)
                }
            });
        }
        // 全部选中
        if (sum == bookList.length) {
            this.setData({
                checkStyle: 'icon-active'
            })
        } else {
            this.setData({
                checkStyle: 'icon'
            })
        }
        this.setData({
            bookList: bookList,
            returnBooks: returnBooks
        })
    },
    allCheck () {
        var {checkStyle, bookList, returnBooks} = this.data
        this.setData({
            checkStyle: checkStyle == 'icon' ? 'icon-active' : 'icon'
        }, () => {
            bookList.forEach((v, i) => {
                if (this.data.checkStyle == 'icon') {
                    v.checkStyle = 'icon'
                    returnBooks = []
                } else {
                    v.checkStyle = 'icon-active'
                    returnBooks[i] = v
                }
            })
            this.setData({
                bookList: bookList,
                returnBooks: returnBooks
            })
        })
    },
    giveBack () {
        var {bookList, returnBooks} = this.data
        var that = this
        var indexs = []
        var param = []
        for (var i = 0; i < returnBooks.length; i++) {
            param[i] = {
                "bookid": returnBooks[i].bookid,
                "isbncode": returnBooks[i].isbncode,
                "userid": returnBooks[i].userid,
                "type": returnBooks[i].type
            }
        }
        wx.request({
            url: getApp().globalData.url + '/return/returnBook',
            data: param,
            method: 'POST',
            success: function (res) {
                if (res.data.success) {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'success',
                        duration: 2000
                    })
                    // 在循环的过程中删除数组元素的解决方案：1、保存要删除元素的下标，2、删除时记下删除次数值，用下标值减去次数值就等于当前数组的实际下标值
                    bookList.forEach((v,i) => {
                        if (v.checkStyle == 'icon-active') {
                            indexs.push(i)    // 保存需要删除元素的下标
                        }
                    });
                    var deltimes = 0      // 删除次数
                    indexs.forEach((v) => {
                        bookList.splice(v - deltimes, 1)
                        deltimes++
                    })
                    that.setData({
                        bookList: bookList,
                        returnBooks: []
                    })
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'success',
                        duration: 2000
                    })
                }
            }
        })
    }
})