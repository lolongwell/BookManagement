// pages/books/books.js
Page({
    data: {
        inputSel: '',
	    classifyOnes: 
            ["计算机与互联网", "经济", "文学", "小说", "情感", "社会科学", "大中专教材教辅", "管理", "健身与 保健", "文化", "中小学教辅", "医学", "理想", "科技", "童书", "绘画", "书法", "心理学", "历史", "传记", "工业技术", "法律", "温暖", "金融与投资", "婚恋与两性", "科普读物", "音乐", "家居", "艺术", "动漫", "建筑", "摄影", "外语学习", "考试", "电子与通信"],
        listName: '全部分类',
        booklist: [],
        pageSize: 10,
	    isShow: false
    },
    onLoad: function () {
        var {pageSize} = this.data
        var authorization = getApp().globalData.authorization
        var that = this;
        wx.request({
            url: getApp().globalData.url + '/role/queryBookList',
            data: {param: '', pageNum: 1, pageSize: pageSize},
            header: {
                'content-type': 'application/json',
				'authorization': authorization
            },
            method: 'GET',
            success: function (res) {
                that.setData({
                    booklist: res.data.data.list
                })
            }
        })
    },
    onReachBottom() {
        var {pageSize} = this.data
        pageSize = pageSize + 10
        var that = this;
        var authorization = getApp().globalData.authorization
        wx.request({
            url: getApp().globalData.url + '/role/queryBookList',
            data: {param: that.data.inputSel, pageNum: 1, pageSize: pageSize},
            header: {
                'content-type': 'application/json',
				'authorization': authorization
            },
            method: 'GET',
            success: function (res) {
                that.setData({
                    booklist: res.data.data.list,
                    pageSize: pageSize
                })
            }
        })
    },
    searchBook: function () {
        var authorization = getApp().globalData.authorization
        var that = this;
        wx.request({
            url: getApp().globalData.url + '/role/likeQueryBook',
            data: {param: that.data.inputSel},
            method: 'GET',
            header: {
                'content-type': 'application/json',
				'authorization': authorization
            },
            success: function (res) {
                that.setData({
                    booklist: res.data.data
                })
            }
        })
    },
    bindInputSel: function (e) {
        this.setData({
			inputSel: e.detail.value
		})
    },
	viewAllList: function () {
        var isShow = this.data.isShow
		this.setData({
            isShow: isShow ? false : true
        })
	},
    bookDetail: function (e) {
        var bookMsg = e.currentTarget.dataset.msg
        var {isbncode} = bookMsg
        wx.navigateTo({
            url: '/pages/books-detail/books-detail?isbncode=' + isbncode
        })
    },
    booksListBtn: function (e) {
       
    },
    chooseClassify: function (e) {
        var index = e.target.offsetTop / 31
        this.setData({
            listName: this.data.classifyOnes[index],
            isShow: false
        })
    },
    turnOff: function () {
        this.setData({
            isShow: false
        })
    }
  })