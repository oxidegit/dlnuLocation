/**
 * 小程序配置文件
 */

// 后台服务器域名：https://www.dlnuwx.club

var host = "www.dlnuwx.club"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 用于上传用户填写的信息以及code，同时在服务器获取openid，然后存储在数据库表中
  uploadUrl: `https://${host}/upload`,

  // 管理员将数据库中的数据生成表格文件，存储在服务器中的指定位置

  genExcelUrl: `https://${host}/genExcel`,

  // 下载已经生成好的表格文件
  downloadUrl: `https://${host}/root/wx/studentInfo`,
};

module.exports = config
