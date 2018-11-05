const config = require("../../config/config.js");
const collectFun = require("../../js/collectFun.js");
const app = getApp();
Page({
  data: {
    id: null,
    collect_status: null,    
    playing: false,
    videoContext: {},
    img:config.img, //图片地址
    fullScreen: false,
    playUrl: "rtmp://118.190.98.53:1935/live/zhibo?roomNum=1",  //播放地址
    orientation: "vertical",
    objectFit: "contain",
    muted: false,
    backgroundMuted: false,
    debug: false,
    exterFlag: false, //为了兼容微信iOS客户端的bug增加的控制字段，打开debug的时候把操作view remove再add
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var that = this;
    that.setData({
      playUrl: "rtmp://118.190.98.53:1935/live/" + options.id,
      id: options.id
    })
    this.is_collect(options.id);
    this.history(options.id);
    console.log("rtmp://118.190.98.53:1935/live/" + options.id)
  },

  //足迹
  history: function (id) {
    var that = this;
    var param = {
      action: 'history',
      post: {
        id: id,
        openId: app.globalData.openId
      }
    }
    collectFun.collect(config.playerUrl, param).then(function (data) {
      console.log(data);
    });
  },
  
  //关注
  is_collect: function (id) {
    var that = this;
    var param = {
      action: 'is_collect',
      post: {
        id: id,
        openId: app.globalData.openId
      }
    }
    collectFun.collect(config.playerUrl, param).then(function (data) {
      that.setData({
        collect_status: data
      })
    });
  },

  //关注
  collect: function () {
    this.collectFunPart('add');
  },
  //关注
  collect_cancel: function () {
    this.collectFunPart('minus');
  },

  //关注
  collectFunPart: function (act) {
    var that = this, collect_status, confirm, tipTitle;
    if (this.data.id == app.globalData.openId) {
      wx.showToast({
        icon: 'none',
        title: '您不能关注自己！'
      });
      return false;
    }
    var param = {
      action: 'collect_add_minus',
      post: {
        id: this.data.id,
        openId: app.globalData.openId,
        act: act
      }
    }
    if (act == 'add') {
      collect_status = 1;
      confirm = '';
      tipTitle = '已关注！';
    } else if (act == 'minus') {
      collect_status = 0;
      confirm = 1;
      tipTitle = '已取消！';
    }
    collectFun.collect(config.playerUrl, param, confirm).then(function (data) {
      if (data.success == 1) {
        that.setData({
          collect_status: collect_status,
        })
        wx.showToast({
          icon: 'none',
          title: tipTitle
        });
      }
    });
  },
  
  //
  onScanQR: function () {
    this.stop();
    this.createContext();
    console.log("onScaneQR");
    var self = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        self.setData({
          playUrl: res.result
        })
      }
    })
  },

  onBlur: function (e) {
    this.setData({
      playUrl: e.detail.value
    })
  },

  onPlayClick: function () {

    var url = this.data.playUrl;
    if (url.indexOf("rtmp:") == 0) {
    } else if (url.indexOf("https:") == 0 || url.indexOf("http:") == 0) {
      if (url.indexOf(".flv") != -1) {
      }
    } else {
      wx.showToast({
        title: '播放地址不合法，目前仅支持rtmp,flv方式!',
        icon: 'loading',
      })
    }

    this.setData({
      playing: !this.data.playing,
    })

    if (this.data.playing) {
      this.data.videoContext.play();
      console.log("video play()");
      wx.showLoading({
        title: '',
      })
    } else {
      this.data.videoContext.stop();
      console.log("video stop()");
      wx.hideLoading();
    }
  },

  onOrientationClick: function () {
    if (this.data.orientation == "vertical") {
      this.data.orientation = "horizontal";
    } else {
      this.data.orientation = "vertical";
    }

    this.setData({
      orientation: this.data.orientation
    })
  },

  onObjectfitClick: function () {
    if (this.data.objectFit == "fillCrop") {
      this.data.objectFit = "contain";
    } else {
      this.data.objectFit = "fillCrop";
    }

    this.setData({
      objectFit: this.data.objectFit
    })
  },

  onLogClick: function () {
    this.setData({
      debug: !this.data.debug
    })
    var that = this;
    setTimeout(() => {
      that.setData({
        exterFlag: !that.data.exterFlag
      })
    }, 10)
  },

  onMuteClick: function () {
    this.setData({
      muted: !this.data.muted
    })
  },

  onFullScreenClick: function () {

    if (!this.data.fullScreen) {
      this.data.videoContext.requestFullScreen({
        direction: 0,

      })

    } else {
      this.data.videoContext.exitFullScreen({

      })
    }
  },

  onPlayEvent: function (e) {
    console.log(e.detail.code);
    if (e.detail.code == -2301) {
      this.stop();
      wx.showToast({
        title: '拉流多次失败',
      })
    }
    if (e.detail.code == 2004) {
      wx.hideLoading();
    }
  },

  onFullScreenChange: function (e) {
    this.setData({
      fullScreen: e.detail.fullScreen
    })
    console.log(e);
    wx.showToast({
      title: this.data.fullScreen ? '全屏' : '退出全屏',
    })
  },

  stop: function () {
    this.setData({
      playing: false,
      // playUrl: "rtmp://2157.liveplay.myqcloud.com/live/2157_wx_live_test1",
      orientation: "vertical",
      objectFit: "contain",
      muted: false,
      fullScreen: false,
      backgroundMuted: false,
      debug: false,
      exterFlag: false,
    })
    this.data.videoContext.stop();
    wx.hideLoading();
  },

  createContext: function () {
    this.setData({
      videoContext: wx.createLivePlayerContext("video-livePlayer")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.createContext();
    console.log(this.data.videoContext);

    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 保持屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.stop();

    wx.setKeepScreenOn({
      keepScreenOn: false,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 发送弹幕
   */

  bindInput: function (e) {
    this.setData({
      msgContent: e.detail.value
    });
  },
  bindSendDanmu: function () {
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 1000) {
      return;
    }
    var self = this;
    var content = self.data.msgContent;
    if (!content.replace(/^\s*|\s*$/g, '')) return;
    webimhandler.onSendMsg(content, function () {
      self.clearInput();
      self.setData({
        'tapTime': new Date()
      });
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // return {
    //   // title: '直播播放器',
    //   // path: '/pages/play/play',
    //   path: '/pages/main/main',
    //   imageUrl: 'https://mc.qcloudimg.com/static/img/dacf9205fe088ec2fef6f0b781c92510/share.png'
    // }
  }


  // onReady(res) {
  //   this.ctx = wx.createLivePlayerContext('player')
  // },
  // statechange(e) {
  //   console.log('live-player code:', e.detail.code)
  // },
  // error(e) {
  //   console.error('live-player error:', e.detail.errMsg)
  // },
  // bindPlay() {
  //   this.ctx.play({
  //     success: res => {
  //       console.log('play success')
  //     },
  //     fail: res => {
  //       console.log('play fail')
  //     }
  //   })
  // },
  // bindPause() {
  //   this.ctx.pause({
  //     success: res => {
  //       console.log('pause success')
  //     },
  //     fail: res => {
  //       console.log('pause fail')
  //     }
  //   })
  // },
  // bindStop() {
  //   this.ctx.stop({
  //     success: res => {
  //       console.log('stop success')
  //     },
  //     fail: res => {
  //       console.log('stop fail')
  //     }
  //   })
  // },
  // bindResume() {
  //   this.ctx.resume({
  //     success: res => {
  //       console.log('resume success')
  //     },
  //     fail: res => {
  //       console.log('resume fail')
  //     }
  //   })
  // },
  // bindMute() {
  //   this.ctx.mute({
  //     success: res => {
  //       console.log('mute success')
  //     },
  //     fail: res => {
  //       console.log('mute fail')
  //     }
  //   })
  // }
})