Page({
  data: {
    currentTab:0,
    starList:[1,2,3,4,5]
  },

  onLoad: function (options) {
    var star = options.star
    var that = this
    console.log('star:',star)
    wx.request({
      url: "https://route.showapi.com/872-1?showapi_appid=55063&showapi_sign=31bd67e13ea14c11b0dbb348655a9a2a&needTomorrow=1&needWeek=1&needMonth=1&needYear=1&star="+star, 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res){
        console.log(res.data.showapi_res_body)
        var tomorrow = res.data.showapi_res_body.tomorrow
        var week = res.data.showapi_res_body.week
        var month = res.data.showapi_res_body.month
        var year = res.data.showapi_res_body.year
        that.setData({
          tomorrow: tomorrow,
          week: week,
          month: month,
          year: year, 
          consName : options.consName,
          consDate : options.consDate
        })
      }
    })
  },
  clickTab:function(e){
    console.log('clickTab:',e.currentTarget.dataset.current)
    var currentTab = e.currentTarget.dataset.current
    this.setData({
      currentTab: currentTab
    })
  },

})