const genExcelUrl = require('../../config').genExcelUrl
const downloadUrl = require('../../config').downloadUrl

Page({
  data:{
  }, 
  onLoad:function (){

  },
  download: function(){
    var that = this;

    //将数据库中的数据导出成excel表格形式
    wx.request({
      url:genExcelUrl, 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    });
    //将服务器总导出成功的表格文件下载到本地临时路径进行存储
    wx.downloadFile({
      url:downloadUrl, 
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          //将下载到临时路径中的文件保存到指定的位置
          var tempFilePaths = res.tempFilePaths
          wx.saveFile({
            tempFilePath: tempFilePaths[0],
            success: function (res) {
              var savedFilePath = res.savedFilePath
            }
          })
        }
      }
    });
  }
})