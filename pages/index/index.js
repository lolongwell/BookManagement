Page({
    data: {
        x: 40,
        y: 100
    },
    gotoMicbooks: () => {
        wx.navigateTo({
            url: '/pages/login/login'
        })
    }
})