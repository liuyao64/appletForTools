var startX,moveX
Page({
  data: {
    contentArr:[],
    sliding:1
  },

  onLoad: function (options) {
  
  },

  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'contentArr',
      success: function(res) {
        that.setData({
          contentArr:res.data,
          sliding:1
        })
      },
    })
  },

  // 新建备忘录
  addNew:function(e){
    // var editObj = {}
    wx.navigateTo({
      url: "../newMemo/newMemo?",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 删除备忘录
  deleteContent:function(e){
    var that = this
    var tapIndex = e.currentTarget.dataset.index
    wx.getStorage({
      key: 'contentArr',
      success: function(res) {
        var tempArr = res.data
        tempArr.splice(tapIndex,1)
        wx.setStorageSync("contentArr", tempArr)
        that.onShow()
      },
    })
  },

  // 编辑内容
  editContent:function(e){
    var tapIndex = e.currentTarget.dataset.index
    wx.getStorage({
      key: 'contentArr',
      success: function(res) {
        var tempArr = res.data
        var editObj = tempArr[tapIndex]
        editObj = JSON.stringify(editObj)
        wx.navigateTo({
          url: '../newMemo/newMemo?tapIndex=' + tapIndex + '&editObj=' + editObj,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 长按删除
  longTapDelete:function(e){
    var tapIndex = e.currentTarget.dataset.index
    var sliding = this.data.sliding;
    console.log("index", e)
    this.setData({
      sliding: 0,
      tapIndex: tapIndex
    })
  },

  touchS:function(e){
    startX = e.touches[0].clientX
  },
  touchM:function(e){
    var that = this
    var tapIndex = e.currentTarget.dataset.index
    moveX = e.touches[0].clientX
    var distenceX = startX - moveX
    if(distenceX<0){ //右滑
      that.setData({
        sliding:1
      })
    }else{ //左滑
      that.setData({
        sliding: 1,
        tapIndex: tapIndex
      })
    }
  },

})