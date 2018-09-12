Page({
  data: {

  },

  onLoad: function (options) {
    console.log(options.url)
    this.setData({
      src: options.url
    })
  },
})