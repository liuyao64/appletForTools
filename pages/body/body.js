var BMI, weight, stature, stature1, bmi//BMI用的数据
var date, gender, BFR, bfr, BMR, bmrType, id, currentTab
var OtherHeightInt, OtherWeight, OtherHeight
var OtherGender, OtherAge, OtherWeightM, OtherHeightM, OtherHeightIntM, BFROther
var bmrSex, bmrAge, bmrHeight, bmrWeight, counterBMR
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: '',
    indicatorDots: true,
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    height: '',
    checkbmr: 'flase',
    bmrHeight: '',
    bmiDetail: '',
    bmrWeight: '',
    bmrAge: '',
    bmrSex: '',
    mybmr: '',
    bmrType: '',
    OtherHeightM: '',
    OtherWeightM: '',
    OtherGender: '',
    OtherAge: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    date = options.date;
    gender = options.gender;
    stature = options.stature;
    weight = options.weight;
    BMI = options.BMI;
    // console.log(date)
    // console.log(gender)
    // console.log(stature)
    // console.log(weight)
    // console.log(BMI )
  

    //BMI
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: 'https://qingteng.net.cn/api/login/person',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        app.globalData.stature = res.data.stature
        app.globalData.weight = res.data.weight
        weight = parseInt(app.globalData.weight)
        stature1 = parseInt(app.globalData.stature)
        stature = stature1 / 100
        // console.log(weight)
        // console.log(stature)
        BMI = weight / (stature * stature)
        //   console.log(BMI)
        BMI = BMI.toFixed(1);
        that.setData({
          dd: res.data,
          weight: app.globalData.weight,
          // date: app.globalData.date,
          stature: app.globalData.stature,
          // BMI: BMI,
          BMI: BMI,
          date: date,
          gender: gender,
          BFR: BFR


        })
        // 判断用户BMI的值在哪个范围内
        if (BMI <= 18) {
          if (BMI > 13 && BMI <= 18) {
            bmi = (BMI - 13) * 8 / 60 * 100
            console.log(bmi)
            that.setData({
              type: '1',
              bmi: bmi,
              bmiDetail: '您的BMI指数已经偏低了，属于偏瘦。沐熙健康建议您饮食方面不要偏食和挑食，可以适量增加高蛋白食物（鸡蛋，牛奶，花生等）。摄入足够蛋白质的情况下，宜多进食一些含脂肪、碳水化合物（即淀粉、糖类）较丰富的食物。每天都应抽出一定的时间来锻炼，这不仅有利于改善食欲，也能使肌肉强壮、体魄健美。'
            })
          }
          else {
            that.setData({
              type: '1',
              bmi: '0',
              bmiDetail: '您的BMI指数已经偏低了，属于偏瘦。沐熙健康建议您饮食方面不要偏食和挑食，可以适量增加高蛋白食物（鸡蛋，牛奶，花生等）。摄入足够蛋白质的情况下，宜多进食一些含脂肪、碳水化合物（即淀粉、糖类）较丰富的食物。每天都应抽出一定的时间来锻炼，这不仅有利于改善食欲，也能使肌肉强壮、体魄健美。'
            })
          }
        }
        else if (BMI > 18 && BMI <= 24) {
          bmi = (BMI - 18) * 8 / 70 * 100
          console.log(bmi)
          that.setData({
            type: '2',
            bmi: bmi,
            bmiDetail: '您的BMI指数正常，是最好的身体状态。建议您还是要通过适当的健身来继续保持这种fit身材，当然男性朋友如果想练出性感人鱼线和健美八块腹肌，女性朋友想拥有前凸后翘S型曼妙身材的话，可以通过专业的运动完善身材的线条及健康的质量。'
          })
        }
        else if (BMI > 24 && BMI <= 28) {
          bmi = (BMI - 24) * 8 / 50 * 100
          console.log(bmi)
          that.setData({
            type: '3',
            bmi: bmi,
            bmiDetail: '您的BMI指数已经超重了，就是说您稍微有点胖了。沐熙健康建议您实行“管得住嘴迈得开腿”的健康方法，少吃零食、甜腻、油炸、油煎之类高热量食物，多吃蔬菜水果和膳食纤维及富含营养但是低热量的食品，同时开始做有氧运动，比如跑步、游泳、健身等，提高新陈代谢率，加速消耗替你的脂肪和热量。'
          })
        }
        else {
          if (BMI > 28 && BMI <= 33) {
            bmi = (BMI - 28) * 8 / 60 * 100
            console.log(bmi)
            that.setData({
              type: '4',
              bmi: bmi,
              bmiDetail: '您的BMI指数已经超标了，您已经达到肥胖的标准了。沐熙健康建议不能吃垃圾食品和过于油腻的食物，多吃富含营养并且低热量的食物，例如大豆、绿色蔬菜、无脂或低脂的牛奶。不喝酒、不喝饮料，每天坚持1小时以上的中等或高等强度运动，例如跑步、游泳、跳绳、登山等，根据个人实际身体情况进行。'
            })
          }
          else {
            // bmi = '100'
            that.setData({
              type: '4',
              bmi: '100',
              bmiDetail: '您的BMI指数已经超标了，您已经达到肥胖的标准了。沐熙健康建议不能吃垃圾食品和过于油腻的食物，多吃富含营养并且低热量的食物，例如大豆、绿色蔬菜、无脂或低脂的牛奶。不喝酒、不喝饮料，每天坚持1小时以上的中等或高等强度运动，例如跑步、游泳、跳绳、登山等，根据个人实际身体情况进行。'
            })
          }
        }


      }


    })

    //BMR
    if (gender == '女') {
      BMR = 655 + (9.6 * weight) + (1.8 * stature * 100) - (4.7 * date)
      BMR = BMR.toFixed(1);
      // console.log(BMR)
    }
    else {
      BMR = 66 + (13.7 * weight) + (5 * stature * 100) - (6.8 * date)
      BMR = BMR.toFixed(1);
      //console.log(BMR)
    }
    that.setData({
      mybmr: BMR
    })
    // 体脂率
    if (gender == '男') {                                   //男性 
      BFR = 1.2 * BMI + 0.23 * date - 5.4 - 10.7 - 0.1
      BFR = BFR.toFixed(1);
      //console.log(BFR)
      if (date < 40) {
        //18-39岁 
        if (BFR <= 10.5 && BFR >= 0) {
          bfr = (BFR - 0) / 12.5 * 100
          that.setData({
            type1: '11',
            bfr: bfr,
            bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
          })
          console.log("偏瘦")
        }
        else if (BFR >= 10.5 && BFR < 21.5) {
          bfr = (BFR - 10.5) / 15 * 100
          that.setData({
            type1: '22',
            bfr: bfr,
            gender: '男',
            bfrDetail: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'

          })
          console.log("健康")
        }
        else if (BFR >= 21.5 && BFR < 26.5) {
          bfr = (BFR - 21.5) / 7 * 100
          that.setData({
            type1: '33',
            bfr: bfr,
            bfrDetail: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })
          console.log("超重")
        }
        else if (BFR >= 26.5) {
          if (BFR >= 26.5 && BFR < 48.5) {
            bfr = (BFR - 26.5) / 12 * 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })
          }
          else {
            bfr: 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'

            })
          }
          console.log('肥胖')
        }
      }
      else if (date >= 40 && date < 60) {                             //40-59
        if (BFR <= 11.5 && BFR >= 0) {
          bfr = (BFR - 0) / 11.5 * 100
          that.setData({
            type1: '11',
            bfr: bfr, bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
          })

          console.log("偏瘦")
        }
        else if (BFR >= 11.5 && BFR < 22.5) {
          bfr = (BFR - 11.5) / 11 * 100
          that.setData({
            type1: '22',
            bfr: bfr,
            bfrDetail: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'

          })
          console.log("健康")
        }
        else if (BFR >= 22.5 && BFR < 27.5) {
          bfr = (BFR - 22.5) / 5 * 100
          that.setData({
            type1: '33',
            bfr: bfr,
            bfrDetail: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })

          console.log("超重")
        }
        else if (BFR >= 27.5) {
          if (BFR >= 27.5 && BFR >= 39.5) {
            bfr = (BFR - 27.5) / 10 * 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })

          }
          console.log('肥胖')
        }

      }
      else if (date >= 60) {                             //60以上 

        if (BFR <= 13.5) {
          if (BFR < 13.5 && BFR >= 2) {
            bfr = (BFR - 2) / 11.5 * 100
            that.setData({
              type1: '11',
              bfr: bfr,
              bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
            })
          }
          else {
            bfr: 8
            that.setData({
              type1: '11',
              bfr: bfr,
              bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
            })
          }
          console.log("偏瘦")
        }
        else if (BFR >= 13.5 && BFR < 24.5) {
          bfr = (BFR - 13.5) / 11 * 100
          that.setData({
            type1: '22',
            bfr: bfr,
            bfrDetail: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'
          })
          console.log("健康")
        }
        else if (BFR >= 24.5 && BFR < 29.5) {
          bfr = (BFR - 24.5) / 5 * 100
          that.setData({
            type1: '33',
            bfr: bfr,
            bfrDetail: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })

          console.log("超重")
        }
        else if (BFR >= 29.5) {
          if (BFR >= 29.5 && BFR <= 41.5) {
            bfr = (BFR - 27.5) / 10 * 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })

          }
          else {
            bfr = 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'

            })

            console.log('肥胖')
          }
        }
      }
    }
    else {                                               //女性 
      BFR = 1.2 * BMI + 0.23 * date - 5.4
      BFR = BFR.toFixed(1);
      /// console.log(BFR)
      if (date < 40) {               //18-39岁 

        if (BFR <= 20.5) {
          if (BFR <= 20.5 && BFR >= 5) {
            bfr = (BFR - 5) / 19.5 * 100
            that.setData({
              type1: '11',
              bfr: bfr,
              bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
            })
          }
          else {
            bfr = 8
            that.setData({
              type1: '11',
              bfr: bfr,
              bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
            })
          }
          console.log("偏瘦")
        }
        else if (BFR >= 20.5 && BFR < 34.5) {
          bfr = (BFR - 20.5) / 18 * 100
          that.setData({
            type1: '22',
            bfr: bfr,
            bfrDetail: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'

          })
          console.log("健康")
        }
        else if (BFR >= 34.5 && BFR < 39.5) {
          bfr = (BFR - 34.5) / 9 * 100
          that.setData({
            type1: '33',
            bfr: bfr,
            bfrDetail: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })
          console.log("超重")
        }
        else if (BFR >= 39.5) {
          if (BFR >= 39.5 && BFR < 51.5) {
            bfr = (BFR - 39.5) / 14 * 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })
          }
          else {
            bfr = 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })
          }
          console.log("肥胖")
        }
      }
      else if (date >= 40 && date < 60) {                          //40-59
        if (BFR <= 21.5) {
          if (BFR <= 21.5 && BFR >= 6) {
            bfr = (BFR - 6) / 15.5 * 100
            that.setData({
              type1: '11',
              bfr: bfr,
              bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
            })
          }
          else {
            bfr = 8
            that.setData({
              type1: '1',
              bfr: bfr,
              bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
            })
          }
          console.log('偏瘦')
        }
        else if (BFR >= 21.5 && BFR < 35.5) {
          bfr = (BFR - 21.5) / 14 * 100
          that.setData({
            type1: '22',
            bfr: bfr,
            bfrDetail: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'
          })
          console.log("健康")
        }
        else if (BFR >= 35.5 && BFR < 40.5) {
          bfr = (BFR - 35.5) / 5 * 100
          that.setData({
            type1: '33',
            bfr: bfr,
            bfrDetail: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })
          console.log("超重")
        }
        else if (BFR >= 40.5) {
          if (BFR >= 40.5 && BFR <= 52.5) {
            bfr = (BFR - 40.5) / 12 * 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })
          }
          else {
            bfr: 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })
          }
          console.log('肥胖')
        }
      }
      else if (date >= 60) {                      //60以上 

        if (BFR <= 22.5) {
          if (BFR <= 22.5 && BFR >= 7) {
            bfr = (BFR - 7) / 15.5 * 100
            that.setData({
              type1: '11',
              bfr: bfr,
              bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
            })
          }
          else {
            bfr = 8
            that.setData({
              type1: '11',
              bfr: bfr,
              bfrDetail: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'

            })
          }
          console.log("偏瘦")
        }
        else if (BFR >= 22.5 && BFR < 36.5) {
          bfr = (BFR - 22.5) / 14 * 100
          that.setData({
            type1: '22',
            bfr: bfr,
            bfrDetail: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'
          })
          console.log("健康")
        }
        else if (BFR >= 36.5 && BFR < 41.5) {
          bfr = (BFR - 36.5) / 5 * 100
          that.setData({
            type1: '33',
            bfr: bfr,
            bfrDetail: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })
          console.log("超重")
        }
        else if (BFR >= 41.5) {
          if (BFR >= 41.5 && BFR <= 53.5) {
            bfr = (BFR - 41.5) / 12 * 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })
          }
          else {
            bfr: 100
            that.setData({
              type1: '44',
              bfr: bfr,
              bfrDetail: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
            })
          }
          console.log('肥胖')
        }
      }
    }

    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight - 55
        that.setData({
          height: res.windowHeight - 34
        })
        console.log(height)
      }
    })
  },

  //  获取BMI其他用户输入数据的
  bindinput1: function (e) {
    OtherHeight = e.detail.value
    OtherHeightInt = OtherHeight / 100
    //console.log(OtherHeight)
  },
  bindinput2: function (e) {
    OtherWeight = e.detail.value
    //console.log(OtherWeight)
  },
  //什么是BMI
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */ // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 300, //动画时长 
      timingFunction: "step-start", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({ animationData: animation.export() })
    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({ animationData: animation })
      //关闭 
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    // 显示 
    if (currentStatu == "open") {
      this.setData({ showModalStatus: true });
    }
  },
  //BMI计算器 
  powerDrawerI1: function (e) {
    var currentStatuI1 = e.currentTarget.dataset.statu; this.utilI1(currentStatuI1)
    var BMICounter = OtherWeight / (OtherHeightInt * OtherHeightInt)
    BMICounter = BMICounter.toFixed(1);
    this.setData({
      BMIOther: BMICounter,
      OtherHeight: OtherHeight,
      OtherWeight: OtherWeight
    })
    OtherHeight = '',
      OtherWeight = ''
    console.log(BMICounter)

  },
  utilI1: function (currentStatuI1) {
    /* 动画部分 */ // 第1步：创建动画实例  
    var animationI1 = wx.createAnimation({
      duration: 300, //动画时长   
      timingFunction: "step-start", //线性  
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animationI1;
    // 第3步：执行第一组动画
    animationI1.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({ animationDataI1: animationI1.export() })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画 
      animationI1.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({ animationDataI1: animationI1 })
      //关闭  
      if (currentStatuI1 == "close") {
        this.setData({
          showModalStatusI1: false
        });

      }
    }.bind(this), 200)
    // 显示 
    if (currentStatuI1 == "open") {
      this.setData({ showModalStatusI1: true });
    }
  },


  //BMR其他用户输入的信息 
  bindinputR1: function (e) {
    bmrSex = e.detail.value
    console.log(bmrSex)
  },
  bindinputR2: function (e) {
    bmrAge = e.detail.value
    console.log(bmrAge)

  },
  bindinputR3: function (e) {
    bmrHeight = e.detail.value
    console.log(bmrHeight)
  },
  bindinputR4: function (e) {
    bmrWeight = e.detail.value
    console.log(bmrWeight)
  },
  powerDrawer2: function (e) {
    var currentStatu2 = e.currentTarget.dataset.statu;
    this.util2(currentStatu2)
  },

  util2: function (currentStatu2) {
    /* 动画部分 */ // 第1步：创建动画实例  
    var animation2 = wx.createAnimation({
      duration: 300, //动画时长   
      timingFunction: "step-start", //线性  
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation2;
    // 第3步：执行第一组动画
    animation2.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({ animationData2: animation2.export() })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画 
      animation2.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({ animationData2: animation2 })
      //关闭  
      if (currentStatu2 == "close") {
        this.setData({
          showModalStatus2: false
        });
      }
    }.bind(this), 200)
    // 显示 
    if (currentStatu2 == "open") {
      this.setData({ showModalStatus2: true });
    }
  },

  //
  powerDrawerR2: function (e) {
    var that = this
    var currentStatuR2 = e.currentTarget.dataset.statu;
    this.utilR2(currentStatuR2)
    console.log('nihao')
    if (bmrSex == '女' && bmrWeight != '' && bmrHeight != '') {
      console.log(bmrHeight)
      console.log(bmrWeight)
      console.log(bmrAge)
      counterBMR = 655 + (9.6 * bmrWeight) + (1.8 * bmrHeight) - (4.7 * bmrAge)
      counterBMR = counterBMR.toFixed(1);
      //  console.log(counterBMR)
      that.setData({
        counterBMR: counterBMR,
        bmrType: '1'
      })
    } else if (bmrSex == '男' && bmrWeight != '' && bmrHeight != '') {
      counterBMR = 66 + (13.7 * bmrWeight) + (5 * bmrHeight) - (6.8 * bmrAge)
      counterBMR = counterBMR.toFixed(1);
      //console.log(counterBMR)
      that.setData({
        bmrType: '1',
        counterBMR: counterBMR,
      })

    } else {
      that.setData({
        bmrType: 3
      })
    }
    that.setData({
      bmrHeight: bmrHeight,
      bmrWeight: bmrWeight,
      bmrAge: bmrAge,
      bmrSex: bmrSex
    })
    bmrHeight = ''
    bmrWeight = ''
    bmrAge = ''
    bmrSex = ''
  },
  utilR2: function (currentStatuR2) {
    console.log('你好吗')
    /* 动画部分 */ // 第1步：创建动画实例 
    var animationR2 = wx.createAnimation({
      duration: 300, //动画时长 
      timingFunction: "step-start", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animationR2;
    // 第3步：执行第一组动画
    animationR2.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({ animationDataR2: animationR2.export() })
    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animationR2.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({ animationDataR2: animationR2 })
      //关闭 
      if (currentStatuR2 == "close") {
        this.setData({
          showModalStatusR2: false
        });

      }
    }.bind(this), 200)
    // 显示 
    if (currentStatuR2 == "open") {
      this.setData({ showModalStatusR2: true });
    }
  },

  //BMR
  powerDrawer3: function (e) {
    var currentStatu3 = e.currentTarget.dataset.statu;
    this.util3(currentStatu3)
  },
  util3: function (currentStatu3) {
    /* 动画部分 */ // 第1步：创建动画实例 
    var animation3 = wx.createAnimation({
      duration: 300, //动画时长 
      timingFunction: "step-start", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation3;
    // 第3步：执行第一组动画
    animation3.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({ animationData3: animation3.export() })
    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation3.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({ animationData3: animation3 })
      //关闭 
      if (currentStatu3 == "close") {
        this.setData({
          showModalStatus3: false
        });
      }
    }.bind(this), 200)
    // 显示 
    if (currentStatu3 == "open") {
      this.setData({ showModalStatus3: true });
    }
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  bindinputm1: function (e) {
    OtherGender = e.detail.value
    //console.log(OtherGender)

  },
  bindinputm2: function (e) {
    OtherAge = e.detail.value
    //  console.log(OtherAge)


  },
  bindinputm3: function (e) {
    OtherHeightM = e.detail.value
    OtherHeightIntM = OtherHeightM / 100
    this.setData({
      OtherHeightM: OtherHeightM
    })
    //console.log(OtherHeightM)
  },
  bindinputm4: function (e) {
    OtherWeightM = e.detail.value
    this.setData({
      OtherWeightM: OtherWeightM
    })
    //console.log(OtherWeightM)
  },
  powerDrawerR3: function (e) {
    var currentStatuR3 = e.currentTarget.dataset.statu;
    this.utilR3(currentStatuR3)
    console.log(currentStatuR3)
    console.log(OtherAge)
    var BFRBMI = OtherWeightM / (OtherHeightIntM * OtherHeightIntM)
    BFRBMI = BFRBMI.toFixed(1);
    var that = this

    //BFR = 1.2 * BMI + 0.23 * date - 5.4 - 10.8 * age
    if (OtherGender == '男' && BFRBMI != '') {                                   //男性 
      BFROther = 1.2 * BFRBMI + 0.23 * OtherAge - 5.4 - 10.8
      BFROther = BFROther.toFixed(1);
      //console.log(BFROther)
      if (OtherAge >= 18 && OtherAge < 39) {
        //18-39岁 
        if (BFROther <= 10.5 && BFROther >= 0) {
          that.setData({
            BFRType: '1',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
          })
          console.log("偏瘦")
        }
        else if (BFROther >= 10.5 && BFROther < 21.5) {
          that.setData({
            BFRType: '2',
            BFROther: BFROther,
            gender: '男',
            bfrDetailM: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'

          })
          console.log("健康")
        }
        else if (BFROther >= 21.5 && BFROther < 26.5) {
          that.setData({
            BFRType: '3',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，提高人的基础代谢率，让人瘦得更快。'
          })
          console.log("超重")
        }
        else if (BFROther >= 26.5) {
          that.setData({
            BFRType: '4',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
          })

          console.log('肥胖')
        }
      }
      else if (OtherAge >= 40 && OtherAge < 59) {                             //40-59
        if (BFROther <= 11.5 && BFROther >= 0) {
          that.setData({
            BFRType: '1',
            BFROther: BFROther, bfrDetailM: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
          })

          console.log("偏瘦")
        }
        else if (BFROther >= 11.5 && BFROther < 22.5) {
          that.setData({
            BFRType: '2',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'

          })
          console.log("健康")
        }
        else if (BFROther >= 22.5 && BFROther < 27.5) {
          that.setData({
            BFRType: '3',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })

          console.log("超重")
        }
        else if (BFROther >= 27.5) {
          that.setData({
            BFRType: '4',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
          })
          console.log('肥胖')
        }

      }
      else if (OtherAge >= 60) {                             //60以上 

        if (BFROther <= 13.5) {
          that.setData({
            BFRType: '1',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
          })
          console.log("偏瘦")
        }
        else if (BFROther >= 13.5 && BFROther < 24.5) {
          that.setData({
            BFRType: '2',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'
          })
          console.log("健康")
        }
        else if (BFROther >= 24.5 && BFROther < 29.5) {
          that.setData({
            BFRType: '3',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })

          console.log("超重")
        }
        else if (BFROther >= 29.5) {
          that.setData({
            BFRType: '4',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
          })
          console.log('肥胖')
        }
      }

    }
    else if (OtherGender == '女' && BFRBMI != '') {
      BFROther = 1.2 * BFRBMI + 0.23 * OtherAge - 5.4
      BFROther = BFROther.toFixed(1);                                //女性 
      console.log(BFR)
      if (OtherAge >= 18 && OtherAge < 39) {               //18-39岁 

        if (BFROther <= 20.5) {
          that.setData({
            BFRType: '1',
            bfr: bfr,
            bfrDetailM: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
          })
          console.log("偏瘦")
        }
        else if (BFROther >= 20.5 && BFROther < 34.5) {
          that.setData({
            BFRType: '2',
            bfr: bfr,
            bfrDetailM: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'

          })
          console.log("健康")
        }
        else if (BFROther >= 34.5 && BFROther < 39.5) {
          bfr = (BFROther - 34.5) / 5 * 100
          that.setData({
            BFRType: '3',
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })
          console.log("超重")
        }
        else if (BFROther >= 39.5) {
          that.setData({
            BFRType: '4',
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
          })

          console.log("肥胖")
        }
      }
      else if (OtherAge >= 40 && OtherAge < 59) {                          //40-59
        if (BFROther <= 21.5) {
          that.setData({
            BFRType: '1',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
          })
          console.log('偏瘦')
        }
        else if (BFROther >= 21.5 && BFROther < 35.5) {
          that.setData({
            BFRType: '2',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'
          })
          console.log("健康")
        }
        else if (BFROther >= 35.5 && BFROther < 40.5) {

          that.setData({
            BFRType: '3',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })
          console.log("超重")
        }
        else if (BFR >= 40.5) {
          that.setData({
            BFRType: '4',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
          })
          console.log('肥胖')
        }
      }
      else if (OtherAge >= 60) {                      //60以上 

        if (BFROther <= 22.5) {
          that.setData({
            BFRType: '1',
            bfrDetailM: '您属于体脂率偏瘦人群，沐熙健康建议您饮食上高蛋白、较高碳水、较高脂肪的饮食原则。增加全天能量的摄入，配合合理的运动，机械运动非常适合偏瘦的人群，进行运动时重量要大，组数不必特别多，但训练要密集，同时补充充足的休息与睡眠。'
          })
          console.log("偏瘦")
        }
        else if (BFROther >= 22.5 && BFROther < 36.5) {
          that.setData({
            BFRType: '2',
            bfr: bfr,
            bfrDetailM: '您属于体脂率正常人群，沐熙健康建议您继续保持好目前良好的生活习惯，保证足够的水分和和充足的睡眠，及时宣泄消极情绪，保持积极的心态，在饮食上还是坚持高蛋白、高纤、低脂的饮食原则，坚持每天运动，运动以有氧运动为主。'
          })
          console.log("健康")
        }
        else if (BFROther >= 36.5 && BFROther < 41.5) {
          that.setData({
            BFRType: '3',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您饮食控油脂，食物的烹饪方式尽量采用蒸煮的方式，少油炸或煎炒。同时配合有氧运动燃脂，还要增加身体的肌肉量，力量训练可以锻炼人的肌肉，提高人的基础代谢率，让人瘦得更快。'
          })
        }
        else if (BFROther >= 41.5) {

          that.setData({
            BFRType: '4',
            BFROther: BFROther,
            bfrDetailM: '您属于体脂率超重人群，沐熙健康建议您限制每天的食物摄入量和摄入食物的种类，以便减少摄入的能量。减脂期间，改掉暴饮暴食、偏食等不良的饮食习惯，同时加强体育运动，提高人的基础代谢率，让人瘦得更快，但不宜运动过量，由于体脂率高，身体体重过重，运动能力也会随之下降，运动过量会使身体受伤的风险增高。'
          })

        }
      }
    }
    else { }
    that.setData({
      BFROther: BFROther,
      OtherHeightM: OtherHeightM,
      OtherWeightM: OtherWeightM,
      OtherAge: OtherAge,
      OtherGender: OtherGender,
    })
    console.log(OtherAge)
    OtherHeightM = ''
    OtherWeightM = ''
    OtherGender = ''
    OtherAge = ''
    BFRBMI = ''
  },

  utilR3: function (currentStatuR3) {

    /* 动画部分 */ // 第1步：创建动画实例  
    var animationR3 = wx.createAnimation({
      duration: 300, //动画时长   
      timingFunction: "step-start", //线性  
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animationR3;
    // 第3步：执行第一组动画
    animationR3.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({ animationDataR3: animationR3.export() })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画 
      animationR3.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({ animationDataR3: animationR3 })
      //关闭  
      if (currentStatuR3 == "close") {
        this.setData({
          showModalStatusR3: false
        });

      }
    }.bind(this), 200)
    // 显示 
    if (currentStatuR3 == "open") {
      this.setData({ showModalStatusR3: true });
    }
  },

})