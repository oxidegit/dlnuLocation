var bmap = require('../../mylib/MapWx.js');
const uploadUrl = require('../../config').uploadUrl
const app = getApp()

Page({
  data:{
    hasLocation:false,
    studentName:"",
    studentNum:"",
    location: {},
    address:"",
    coordinates:{},
    code:""//
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
    var fail = function (data) {//获取信息失败时
      console.log(data)
    };
    var success = function (data, loc) {//获取位置成功时
      that.setData({
        hasLocation: true,
        location: data,//地址信息
        address:data.originalData.result.sematic_description, //详细地址 
        coordinates:loc//当前经纬度坐标
      })
      console.log("success")
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
    var that = this;
    var curData = that.data;

    if (e.detail.value.studentName == "" || e.detail.value.studentNum == "" || curData.hasLocation==false){//当用户信息没有填写完全时
      this.setData({
        address: "请填写所有信息"
      })
    }else{//用户信息填写完整

      //调用登录接口，获取 code
      wx.login({
        success: function (res) {
          that.code = res.code
          console.log(that.code)

          wx.getSetting({
            success(setRes) {
              // 判断是否已授权
              if (!setRes.authSetting['scope.userInfo']) {
                // 授权访问
                wx.authorize({
                  scope: 'scope.userInfo',
                  success() {
                    //获取用户信息
                    wx.getUserInfo({
                      lang: "zh_CN",
                      success: function (userRes) {
                        //发起网络请求

                        console.log("获取openid")

                      }
                    })
                  }
                })
              } else {
                //获取用户信息
                wx.getUserInfo({
                  lang: "zh_CN",
                  success: function (userRes) {
                    //发起网络请求
                    console.log("已经授权，获取用户的openid")
                  }
                })
              }
            }
          })
        }
      })

      //上传用户填写的信息和code
      wx.request({
        url: uploadUrl, 
        data: {
          studentName: e.detail.value.studentName,
          studentNum: e.detail.value.studentNum,
          address:curData.address,
          code:that.code
        },
        method:"POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            address: "提交成功"
          })
          console.log(res.data)
        }
      })

    }

  }
})