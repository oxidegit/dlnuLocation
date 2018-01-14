/**
 * @file 微信小程序JSAPI
 * @author 邹成 1042071454@qq.com 2017.12.24
 */

/**
 * 百度地图微信小程序API类
 *
 * @class
 */
class BMapWX {

  /**
   * 百度地图微信小程序API类
   *
   * @constructor
   */
  constructor(param) {
    this.ak = param["ak"];
    this.result = {}
    this.loc = {}
  }

  /**
   * 使用微信接口进行定位
   *
   * @param {string} type 坐标类型
   * @param {Function} success 成功执行
   * @param {Function} fail 失败执行
   * @param {Function} complete 完成后执行
   */
  getWXLocation(type, success, fail, complete) {
    type = type || 'gcj02',
      success = success || function () { };
    fail = fail || function () { };
    complete = complete || function () { };
    wx.getLocation({
      type: type,
      success: success,
      fail: fail,
      complete: complete
    });
  }

  getRes() {
    console.log(this.result)
    if (!this.result) {
      regeocoding()
    }

    return this.result
  }

  /**
   * rgc检索（坐标->地点描述）
   *
   * @param {Object} param 检索配置
   * 参数对象结构可以参考
   * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
   */
  regeocoding(param) {
    var that = this;
    param = param || {};
    let regeocodingparam = {
      coordtype: param["coordtype"] || 'gcj02ll',
      pois: param["pois"] || 0,
      output: param["output"] || 'json',
      ak: that.ak,
      sn: param["sn"] || '',
      timestamp: param["timestamp"] || '',
      ret_coordtype: 'gcj02ll'
    };
    let otherparam = {
      iconPath: param["iconPath"],
      iconTapPath: param["iconTapPath"],
      width: param["width"],
      height: param["height"],
      alpha: param["alpha"] || 1,
      success: param["success"] || function () { },
      fail: param["fail"] || function () { }
    };
    let type = 'gcj02';
    //当微信获取经纬度成功时
    let locationsuccess = function (result) {
      console.log(result)
      that.loc = result
      regeocodingparam["location"] = result["latitude"] + ',' + result["longitude"];
      //构造请求，利用从微信获取的信息进行逆地址解析
      wx.request({
        url: 'https://api.map.baidu.com/geocoder/v2/',
        data: regeocodingparam,
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        //解析成功时调用
        success(data) {//data 为 
          let res = data['data'];
          console.log("解析成功")

          //所需的信息
          result = res['result']
          let info = result["addressComponent"]

          console.log(info)

          if (res['status'] === 0) {
            //let poiObj = res["result"];
            // outputRes 包含两个对象，
            // originalData为百度接口返回的原始数据
            // wxMarkerData为小程序规范的marker格式
            let outputRes = {};
            outputRes["originalData"] = res;
            //outputRes["wxMarkerData"] = [];
            outputRes["wxMarkerData"] = {
              formatter_address: result['formatter_address'],
              confidence: result['confidence'],
              addressComponent: result['addressComponent'],
              province: info['province'],
              city: info['city'],
              district: info['district'],
              town: info['town'],
              street: info['street'],
              street_number: info['street_number'],

            };


            that.result = outputRes
            console.log("that.result")
            console.log(that.result)
            //利用回调函数将结果传出
            otherparam.success(outputRes, that.loc);
          } else {
            otherparam.fail({
              errMsg: res["message"],
              statusCode: res["status"]
            });
          }
        },
        fail(data) {
          otherparam.fail(data);
        }
      });
    };
    //当微信获取经纬度失败时
    let locationfail = function (result) {
      otherparam.fail(result);
    }
    //当微信获取经纬度完成时
    let locationcomplete = function (result) {
    };
    if (!param["location"]) {//如果无location参数，则调用微信请求
      that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
    } else {
      let longitude = param.location.split(',')[1];
      let latitude = param.location.split(',')[0];
      let errMsg = 'input location';
      let res = {
        errMsg: errMsg,
        latitude: latitude,
        longitude: longitude
      };
      locationsuccess(res);
    }
  }
}

module.exports.BMapWX = BMapWX;