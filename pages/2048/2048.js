var app = getApp()
Page({
  data: {
    score: 0,
    maxscore: 0,
    startx: 0,
    starty: 0,
    endx: 0,
    endy: 0,
    direction: '',
    numbers: [[0, 2, 2, 0], [4, 2, 0, 0], [0, 4, 0, 0], [0, 0, 0, 0]], //初始化棋盘数据 4*4
    modalHidden: true,
  },
  onLoad: function () {
    //调用API从本地缓存中获取数据
    var maxscore = wx.getStorageSync('maxscore')
    if (!maxscore) maxscore = 0
    this.setData({
      maxscore: maxscore
    })
  },

  //下拉刷新
  // onPullDownRefresh:function(){
  //   this.mergebottom();
  //   wx.stopPullDownRefresh();
  // },

  // 保存分数
  storeScore: function () {
    console.log(this.data.maxscore, this.data.score)
    if (this.data.maxscore < this.data.score) {
      this.setData({
        maxscore: this.data.score
      })
      wx.setStorageSync('maxscore', this.data.maxscore)
    }
  },

  // 监测手指滑动
  tapStart: function (event) {
    this.setData({
      startx: event.touches[0].pageX,
      starty: event.touches[0].pageY
    })
  },
  tapMove: function (event) {
    this.setData({
      endx: event.touches[0].pageX,
      endy: event.touches[0].pageY
    })
  },
  tapEnd: function (event) {
    //水平移动距离
    var horizon = this.data.endx - this.data.startx
    //垂直移动距离
    var vertical = this.data.endy - this.data.starty
    console.log(horizon, vertical);
    if (Math.abs(horizon) > 5 || Math.abs(vertical) > 5) {
      var direction = this.computeDir(horizon, vertical)
      this.setData({
        startx: 0,
        starty: 0,
        endx: 0,
        endy: 0
      })
      this.mergeAll(direction) && this.randInsert();
    }
  },

  //判断滑动的方向
  computeDir: function (horizon, vertical) {
    if (Math.abs(horizon) > Math.abs(vertical)) {
      return (horizon > 0) ? 'right' : 'left'
    } else {
      return (vertical > 0) ? 'bottom' : 'top'
    }
  },

  //合并全部
  mergeAll: function (dir) {
    this.checkGame();
    switch (dir) {
      case 'left':
        return this.mergeleft();
        break;
      case 'right':
        return this.mergeright();
        break;
      case 'top':
        return this.mergetop();
        break;
      case 'bottom':
        return this.mergebottom();
        break;
      default:
    }
  },

  //左滑
  mergeleft: function () {
    var change = false;
    var arr = this.data.numbers;


    for (var i = 0; i < 4; i++) {
      //merge first
      //计算左滑是否合并数值
      for (var j = 0; j < 3; j++) {
        if (arr[i][j] == 0) continue;
        for (var k = 1; k < 4 - j; k++) {
          if (arr[i][j] != 0 && arr[i][j + k] != 0) {
            if (arr[i][j] != arr[i][j + k]) break;   //判断一个数和它右边的那个数是否相同，不相同则直接跳过
            arr[i][j] = arr[i][j] * 2;
            arr[i][j + k] = 0;
            change = true;
            // this.setData({
            // score: this.data.score + arr[i][j]/2
            // })
            if (this.data.score < arr[i][j]) { //判断是否超过历史最高分数，赋值
              this.setData({ score: arr[i][j] })
            }
            break;
          }
        }
      }

      //左滑移动
      for (var j = 0; j < 3; j++) {
        if (arr[i][j] == 0) {
          for (var k = 1; k < 4 - j; k++) {
            //如果这个数是0也就是空的，并且后边的数不为0，就把后一个数的值赋给前一个数，后一个数置为0
            if (arr[i][j + k] != 0) {
              arr[i][j] = arr[i][j + k];
              arr[i][j + k] = 0;
              change = true;
              break;
            }
          }
        }
      }

    }
    this.setData({
      numbers: arr //把计算后的新数组赋值给number
    })
    this.storeScore() //计算历史最高分
    return change
  },


  //右滑
  mergeright: function () {
    var change = false
    var arr = this.data.numbers;

    //数值计算
    for (var i = 0; i < 4; i++) {
      //merge first
      for (var j = 3; j > 0; j--) {
        if (arr[i][j] == 0) continue;
        for (var k = 1; k <= j; k++) {
          if (arr[i][j] != 0 && arr[i][j - k] != 0) {
            if (arr[i][j] != arr[i][j - k]) break;
            arr[i][j] = arr[i][j] * 2;
            arr[i][j - k] = 0;
            change = true;
            // this.setData({
            // score: this.data.score + arr[i][j]/2
            // })
            if (this.data.score < arr[i][j]) {
              this.setData({ score: arr[i][j] })
            }
            break;
          }
        }
      }
      //移动
      for (var j = 3; j > 0; j--) {
        if (arr[i][j] == 0) {
          for (var k = 1; k <= j; k++) {
            if (arr[i][j - k] != 0) {
              arr[i][j] = arr[i][j - k];
              arr[i][j - k] = 0;
              change = true;
              break;
            }
          }
        }
      }
    }
    this.setData({
      numbers: arr
    })
    this.storeScore()
    return change
  },

  //下滑
  mergebottom: function () {
    var change = false
    var arr = this.data.numbers;

    //数值计算
    for (var i = 0; i < 4; i++) {
      //merge first
      for (var j = 3; j > 0; j--) {
        if (arr[j][i] == 0) continue;
        for (var k = 1; k <= j; k++) {
          if (arr[j][i] != 0 && arr[j - k][i] != 0) {
            if (arr[j][i] != arr[j - k][i]) break;
            arr[j][i] = arr[j][i] * 2;
            arr[j - k][i] = 0;
            change = true
            // this.setData({
            // score: this.data.score + arr[j][i]/2
            // })
            if (this.data.score < arr[j][i]) {
              this.setData({ score: arr[j][i] })
            }
            break;
          }
        }
      }
      //移动
      for (var j = 3; j > 0; j--) {
        if (arr[j][i] == 0) {
          for (var k = 1; k <= j; k++) {
            if (arr[j - k][i] != 0) {
              arr[j][i] = arr[j - k][i];
              arr[j - k][i] = 0;
              change = true
              break;
            }
          }
        }
      }
    }
    this.setData({
      numbers: arr
    })
    this.storeScore()
    return change
  },

  //上滑
  mergetop: function () {
    var change = false
    var arr = this.data.numbers;

    for (var i = 0; i < 4; i++) {
      //merge first
      for (var j = 0; j < 3; j++) {
        if (arr[j][i] == 0) continue;
        for (var k = 1; k < 4 - j; k++) {
          if (arr[j][i] != 0 && arr[j + k][i] != 0) {
            if (arr[j][i] != arr[j + k][i]) break;
            arr[j][i] = arr[j][i] * 2;
            arr[j + k][i] = 0;
            change = true
            // this.setData({
            // score: this.data.score + arr[j][i]/2
            // })
            if (this.data.score < arr[j][i]) {
              this.setData({ score: arr[j][i] })
            }
            break;
          }
        }
      }
      //movemove
      for (var j = 0; j < 3; j++) {
        if (arr[j][i] == 0) {
          for (var k = 1; k < 4 - j; k++) {
            if (arr[j + k][i] != 0) {
              arr[j][i] = arr[j + k][i];
              arr[j + k][i] = 0;
              change = true
              break;
            }
          }
        }
      }
    }
    this.setData({
      numbers: arr
    })
    this.storeScore()
    return change
  },


  //随机插入
  randInsert: function () {
    var arr = this.data.numbers
    //随机2或4
    //Math.random()是令系统随机选取大于等于 0.0 且小于 1.0 的伪随机数
    var num = Math.random() < 0.8 ? 2 : 4
    //计算随机位置
    var zeros = [];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (arr[i][j] == 0) {
          zeros.push([i, j]); //循环找出所有的0
        }
      }
    }
    // Math.floor()求一个最接近它的整数，它的值小于或等于这个浮点数
    var position = zeros[Math.floor(Math.random() * zeros.length)]; //选定一个位置
    arr[position[0]][position[1]] = num //把之前生成的随机数放到这个位置
    this.setData({
      numbers: arr //更新number
    })
    //this.checkGame()
  },


  checkGame: function () {
    var arr = this.data.numbers
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (arr[i][j] == 0) return;
      }
    }
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (arr[i][j] == 0) {
          wx.showModal({
            title: '恭喜',
            content: '挑战成功',
          })
        }
      }
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (arr[i][j] == arr[i + 1][j] || arr[i][j] == arr[i][j + 1]) return;
      }
    }

    for (var j = 0; j < 3; j++) {
      if (arr[3][j] == arr[3][j + 1]) return;
      if (arr[j][3] == arr[j + 1][3]) return;
    }
    this.setData({
      modalHidden: false,
    })
  },
  //重新开始
  modalChange: function () {
    this.setData({
      score: 0,
      numbers: [[0, 0, 2, 2], [0, 2, 4, 0], [0, 4, 0, 0], [0, 0, 0, 0]],
      modalHidden: true,
    })
  },
  modalCancle: function () {
    this.setData({
      modalHidden: true,
    })
  },
})
