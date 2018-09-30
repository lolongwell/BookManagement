Page({
    data: {
        x: 0,
        y: 0
    },
    gotoMicbooks: () => {
        wx.navigateTo({
            url: '/pages/login/login'
        })
    }
})