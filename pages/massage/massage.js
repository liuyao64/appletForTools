var data
const app = getApp()
Page({
  data: {
    // content: '',
    // msgData: [],
    userInfo: {},
    messageList:[]
  },
  submit: function (e) {
    var that = this
    var message = e.detail.value.msg
    if (message == ''){
      wx.showToast({
        title: '请输入留言内容',
      })
    }else{
      this.setData({
        content: message
      })
      wx.request({
        url: 'https://api.it120.cc/b1f089f1b1186e37b60fb2cd1e1bbb94/comment/add',
        data: {
          refId: 0,
          type: 0,
          content: message
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("haaaa", res)
          //留言提交成功后清除掉文本框中内容
          that.setData({
            content:''
          })
          wx.request({
            url: 'https://api.it120.cc/b1f089f1b1186e37b60fb2cd1e1bbb94/comment/list',
            data: {
              pageSize: 10,
              type: 0
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("enenene", res.data)
              var messageList = res.data.data
              console.log('mess', messageList)
              that.setData({
                messageList: messageList
              })
            }
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
    // e.detail.value.msg = ''
    // var list = this.data.msgData;
    // console.log(list)
    // list.push({
    //   msg: this.data.content
    // });
    // //console.log(this.data)
    // this.setData({
    //   msgData: list,
    //   content: ''
    // })

    // wx.setStorage({
    //   key: "msgData",
    //   data: list
    // })
    
    
  },
  onLoad: function (options) {
    var that = this
    // wx.getStorage({
    //   key: 'msgData',
    //   success: function (e) {
    //     data = e.data;
    //     console.log(e)
    //     that.setData({
    //       msgData: data
    //     })
    //   }
    // })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow:function(e){
    var that = this
    wx.request({
      url: 'https://api.it120.cc/b1f089f1b1186e37b60fb2cd1e1bbb94/comment/list', 
      data: {
        pageSize:10,
        type:0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("enenene",res.data)
        var messageList = res.data.data
        console.log('mess',messageList)
        that.setData({
          messageList: messageList
        })
      }
    })
  },

  deleteMsg: function (e) {
    var n = e.target.dataset.indexa;
    console.log(e)
    var list = this.data.msgData;
    var that = this
    list.splice(n, 1)
    that.setData({
      msgData: list
    })

  }
})