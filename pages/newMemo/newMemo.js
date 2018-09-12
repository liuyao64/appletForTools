var util = require('../../utils/util.js')
var contentArr = []
var index
Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.editObj) {
      var editObj = JSON.parse(options.editObj)
      index = options.tapIndex
      console.log(options)
      this.setData({
        editObj: editObj
      })
    }
  },

  onShow: function () {
    this.getTime()
  },

  // 保存
  saveContent: function (e) {
    console.log("edit save ==>", this.data)
    var editContent = this.data.editObj
    var content = e.detail.value.content
    var date = util.formatTime(new Date());
    if (e.detail.value = "") {
      wx.navigateBack({})
    } else if (this.data.editObj) {
      console.log("editObj::", editContent)
      // editContent = content
      wx.getStorage({
        key: 'contentArr',
        success: function (res) {
          var tempArr = res.data
          tempArr[index].content = content
          tempArr[index].date = date
          wx.setStorageSync("contentArr", tempArr)
          wx.navigateBack({})
        },
      })
    } else {
      var tempObj = {
        content: content,
        date: date
      }
      wx.getStorage({
        key: 'contentArr',
        success: function (res) {
          contentArr = res.data
          contentArr.unshift(tempObj)
          wx.setStorageSync("contentArr", contentArr)
        },
        fail: function (err) {
          contentArr.unshift(tempObj)
          wx.setStorageSync("contentArr", contentArr)
        }
      })
      wx.navigateBack({})
    }
  },

  //获取当前时间
  getTime: function () {
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);

    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    //分  
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    //秒  
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    var time = Y + "年" + M + "月" + D + "日 " + h + ":" + m + ":" + s
    console.log("当前时间：", time);
    this.setData({
      time: time
    })
  },
})