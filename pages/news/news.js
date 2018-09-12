// pages/news/news.js
Page({
  data: {
    news_list:'',
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: "https://v.juhe.cn/toutiao/index?key=2a11c7fab5354e9c92ffaad80e345754",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.result.data)
        var news_list = res.data.result.data
        that.setData({
          news_list:news_list
        })
      }
    })
  },
  clickNews:function(e){
    console.log(e.currentTarget.dataset.url)//取到当前点击的新闻的url
    var currentUrl = e.currentTarget.dataset.url
    console.log(this.data.news_list)//当前数组
    var news_list = this.data.news_list
    for(var i = 0; i<news_list.length;i++){
      if(news_list[i].url == currentUrl){
        wx.navigateTo({
          url: '../detail/detail?url='+currentUrl,
        })
      }
    }
  },
})