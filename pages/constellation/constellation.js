var star, consIcon, consName, consDate
Page({
  data: {
    hidden: false,
    constellation: '',
    consIcon: '',
    consName: '',
    consDate: '',
    love_star: 0,
    money_star: 0,
    summary_star: 0,
    work_star: 0,
    constellation12: [
      { icon: "icon-baiyangzuo", name: "白羊座", date: "3.21-4.19", star: "baiyang" },
      { icon: "icon-jinniuzuo", name: "金牛座", date: "4.20-5.20", star: "jinniu" },
      { icon: "icon-shuangzizuo", name: "双子座", date: "5.21-6.21", star: "shuangzi" },
      { icon: "icon-juxiezuo", name: "巨蟹座", date: "6.22-7.22", star: "juxie" },
      { icon: "icon-shizizuo", name: "狮子座", date: "7.23-8.22", star: "shizi" },
      { icon: "icon-chunvzuo", name: "处女座", date: "8.23-9.22", star: "chunv" },
      { icon: "icon-tianchengzuo", name: "天秤座", date: "9.23-10.23", star: "tiancheng" },
      { icon: "icon-tianhezuo", name: "天蝎座", date: "10.24-11.22", star: "tianxie" },
      { icon: "icon-sheshouzuo", name: "射手座", date: "11.23-12.21", star: "sheshou" },
      { icon: "icon-mojiezuo", name: "摩羯座", date: "12.22-1.19", star: "mojie" },
      { icon: "icon-shuipingzuo", name: "水瓶座", date: "1.20-2.18", star: "shuiping" },
      { icon: "icon-shuangyuzuo", name: "双鱼座", date: "2.19-3.20", star: "shuangyu" },
    ],
    starList: [1, 2, 3, 4, 5]
  },

  onLoad: function (options) {

  },
  constellationMsg(e){
    var that = this
    star = e.currentTarget.dataset.star
    var constellation12 = that.data.constellation12
    for (var i = 0; i < constellation12.length; i++) {
      if (star == constellation12[i].star) {
        consIcon = constellation12[i].icon
        consName = constellation12[i].name
        consDate = constellation12[i].date
        that.setData({
          consIcon: consIcon,
          consName: consName,
          consDate: consDate
        })
      }
    }
  },
  clickConstellation: function (e) {
    // console.log(e)
    // console.log(this)
    var that = this
    var constellation1
    that.constellationMsg(e)
    wx.request({
      url: "https://route.showapi.com/872-1?showapi_appid=55063&showapi_sign=31bd67e13ea14c11b0dbb348655a9a2a&star=" + star,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log('constellation', res.data.showapi_res_body.day)
        constellation1 = res.data.showapi_res_body.day
        var love_star = res.data.showapi_res_body.day.love_star
        var money_star = res.data.showapi_res_body.day.money_star
        var summary_star = res.data.showapi_res_body.day.summary_star
        var work_star = res.data.showapi_res_body.day.work_star
        // console.log(love_star)
        that.setData({
          hidden: true,
          constellation: constellation1,
          love_star: love_star,
          money_star: money_star,
          summary_star: summary_star,
          work_star: work_star,
        })
      }
    })
  },
  // 关闭弹窗
  close: function () {
    var that = this
    var constellation1
    wx.request({
      url: "https://route.showapi.com/872-1?showapi_appid=55063&showapi_sign=31bd67e13ea14c11b0dbb348655a9a2a&star=baiyang",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log('constellation', res)
        constellation1 = res.data.showapi_res_body.day
        // console.log(constellation1.day_notice)
        that.setData({
          hidden: true,
          constellation: constellation1
        })
      }
    })
  },
  // 开弹窗
  open: function () {
    var that = this
    that.setData({
      hidden: false
    })

  },
  detail:function(e){
    // console.log('star:', star)
    console.log(consName)
    wx.navigateTo({
      url: '../cons-detail/cons-detail?star=' + star + '&consName=' + consName + '&consDate=' + consDate
    })
  },
})