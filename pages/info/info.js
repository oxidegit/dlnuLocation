var bmap = require('../../mylib/MapWx.js');
const app = getApp()

Page({
  data:{
    hasLocation:false,
    studentName:"",
    studentNum:"",
    location: {},
    coordinates:{}
  },
  onLoad: function () {
    this.setData({
      location:"请先获取位置"
    })
  },
  showLocation: function (e) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'TzTUw23drPv64v71RMu2dne1xIEPbI3u'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data, loc) {
      that.setData({
        hasLocation: true,
        location: data,
        coordinates:loc
      })

      console.log("loc")
      console.log(loc)
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
    });
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：')
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})