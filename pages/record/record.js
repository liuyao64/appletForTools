var util = require('../../utils/util.js')
var recordArr = []
var currentTab
Page({
  data: {
    clickIndex:0,
    currentTab:0,
    //moneyType:0, //0：支出，1：收入
    addObj: { category: "haofangtuo400iconfont2meishi", bgcolor: "#fdd692", name: "吃喝" },
    getObj: { category: "gongzi", bgcolor: "#d3e0f7", name: "工资" },
    payIcon:[
      { category: "haofangtuo400iconfont2meishi", bgcolor: "#fdd692" ,name:"吃喝"},
      { category: "riyongpin", bgcolor: "#aacfd0", name: "日用品"},
      { category: "yule", bgcolor: "#f1bbba", name: "娱乐" },
      { category: "fushi", bgcolor: "#AAABD3", name: "服饰" },
      { category: "jiaotong", bgcolor: "#F7AA97", name: "交通" },
      { category: "yiliao", bgcolor: "#a5d296", name: "医疗" },
      { category: "huafei", bgcolor: "#8EC0E4", name: "话费" },
      { category: "tuikuan", bgcolor: "#e85a71", name: "红包" },
      { category: "meironghufu", bgcolor: "#D09E88", name: "美妆" },
      { category: "iconxuexinor", bgcolor: "#fd999a", name: "学习" },
      { category: "liwu", bgcolor: "#f9cdad", name: "礼物" },
    ],
    getIcon: [
      { category: "gongzi", bgcolor: "#d3e0f7", name: "工资" },
      { category: "jianzhi", bgcolor: "#a8dba8", name: "兼职" },
      { category: "touzilicai", bgcolor: "#ffda8e", name: "投资" },
      { category: "jiangli2", bgcolor: "#CBA6C3", name: "奖金" },
      { category: "tuikuan", bgcolor: "#EE7785", name: "红包" },
    ],
  },

  onLoad: function (options) {
    
  },

  onShow: function () {
  
  },

  //切换tab页
  clickTab: function (e) {
    console.log('clickTab:', e.currentTarget.dataset.current)
    currentTab = e.currentTarget.dataset.current
    this.setData({
      currentTab: currentTab
    })
  },

  //选择
  chooseType:function(e){
    var index = e.currentTarget.dataset.index

    if(this.data.currentTab == 0){ //支出
      var list = this.data.payIcon
      var tempObj = list[index]
      this.setData({
        addObj: tempObj, 
        clickIndex: index
      })
    }else{ //收入
      var list = this.data.getIcon
      var tempObj = list[index]
      this.setData({
        getObj: tempObj,
        clickIndex: index
      })
    }
  },

  //保存
  formSubmit: function (e) {
    var date = util.formatTime(new Date());
    console.log("currentTab", this.data.currentTab)
    var cost = parseFloat(e.detail.value.cost)
    var moneyType = this.data.currentTab
    console.log("收入还是支出===",moneyType)
    var obj
    if(moneyType == 0){
      obj = this.data.addObj
    }else{
      obj = this.data.getObj
    }
    if(e.detail.value.cost == ""){
      wx.showModal({
        title: '提示',
        content: '请输入金额',
      })
    } else {
      cost = cost.toFixed(2)
      var recordObj = {
        category: obj.category, 
        bgcolor: obj.bgcolor, 
        name: obj.name,
        money: cost,
        date:date,
        moneyType:moneyType
      }
      wx.getStorage({
        key: 'recordMsg',
        success: function(res) {
          console.log(1111,res.data)
          recordArr = res.data
          recordArr.push(recordObj)
          wx.setStorageSync("recordMsg", recordArr)
          wx.navigateBack({})
        },
        fail: function (e) {
          recordArr.push(recordObj)
          wx.setStorageSync("recordMsg",recordArr)
          wx.navigateBack({})
        }
      })
    }
  },
})