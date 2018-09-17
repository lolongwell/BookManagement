Page({
    data: {
        userInfo: {},
        username: ''
    },
    onLoad: function (options) {
        var that = this;
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            // var userInfo = res.userInfo;
            // that.setData({ userInfo: userInfo });
          }
        });
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
    }
})
