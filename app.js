//app.js
App({
  globalData: {
    hasLogin: false,
    openid: null,
    code:""
  },
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  }
})