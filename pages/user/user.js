var authorization = getApp().globalData.authorization
Page({
    data: {
        userInfo: {},
        username: ''
    },
    userHistoryBtn: function() {
        wx.navigateTo({
          url: '/pages/user-history/user-history'
        })
    },
    userCommentBtn: function() {
        wx.navigateTo({
          url: '/pages/user-comment/user-comment'
        })
    },
    exitBtnOnClick () {
        authorization = ''
        wx.reLaunch({ url: '/pages/index/index' });
    }
})
