

Page({
  data: {
    hasPassword:false,
    password:"123456",
    list: [
      {
        id: 'function',
        name: '功能选择',
        open: false,
        pages: ['download']
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }, 
  formSubmit: function (e) {
    var that = this;
    var data = that.data;

    if (e.detail.value.password == data.password){
      console.log("密码正确")
      console.log("hello")
      console.log(that.hasPassword)
      that.setData({
        hasPassword: true
      })
    }
  }
})

