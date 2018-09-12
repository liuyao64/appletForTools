const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //用户昵称头像
    recordMsg: [],
    spendPrice: 0, //支出总计
    getPrice: 0, //收入总计
    surplus: 0, //结余
  },

  onLoad: function (options) {
    var that = this
    //获取用户昵称头像
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.getUserInfo({
        success: res => {
          console.log("userInfo::",res.userInfo)
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo
          })
        },
        fail:function(err) {
          var userInfo = {
            nickName:"未登录",
            avatarUrl:'../../images/icon-default.png'
          }
          that.setData({
            userInfo: userInfo
          })
        }
      })
    }
  },

  onShow: function () {
    var that = this
    var tempArr = []
    wx.getStorage({
      key: 'recordMsg',
      success: function (res) {
        console.log("获取账本信息：", res.data)
        tempArr = res.data
        var spendPrice = 0
        var getPrice = 0
        for (var i = 0; i < tempArr.length; i++) { //遍历账本中所有数据
          if (tempArr[i].moneyType == 0) {
            spendPrice += parseInt(tempArr[i].money)
          }else{
            getPrice += parseFloat(tempArr[i].money)
          }
        }
        console.log(spendPrice, getPrice)
        var surplus = getPrice - spendPrice //结余
        console.log("jieyu ===", surplus)
        that.setData({
          recordMsg: res.data,
          spendPrice: spendPrice.toFixed(2),
          getPrice:getPrice.toFixed(2),
          surplus: surplus.toFixed(2)
        })
      },
      fail: function (err) {
        var surplus = 0
        that.setData({
          surplus: surplus.toFixed(2)
        })
      }
    })
  },


  record: function (e) {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },

  authorization:function(e){
    var that = this
    wx.openSetting({
      success:res =>{
        console.log(res)
        that.onLoad()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})