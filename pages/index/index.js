Page({
  data: {
    navList: [
      { title: "记账本", icon: 'jizhang' ,navTo:'tallyBook' },
      { title: "身体指数计算器", icon: 'jiankang', navTo: 'body'  },
      { title: "备忘录", icon: 'beiwanglu', navTo: 'memo'  },
      { title: "星座运势", icon: 'xingzuo1', navTo: 'constellation' },
      { title: "今日新闻", icon: 'xinwen', navTo: 'news' },
      { title: "2048小游戏", icon: 'tubiao_youxi', navTo: 'game'  },
    ]
  },

  onLoad: function (options) {
    
  },
  tallyBook:function(e){
    wx.navigateTo({
      url: '../tally-book/tally-book',
    })
  },
  body: function (e) {
    wx.navigateTo({
      url: '../body/body',
    })
  },
  memo: function (e) {
    wx.navigateTo({
      url: '../memo/memo',
    })
  },
  constellation: function (e) {
    wx.navigateTo({
      url: '../constellation/constellation',
    })
  },
  news:function(){
    wx.navigateTo({
      url: '../news/news',
    })
  },
  game: function () {
    wx.navigateTo({
      url: '../2048/2048',
    })
  },
  onShareAppMessage: function (res) {
    
  }
})