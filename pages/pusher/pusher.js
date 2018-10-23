const config = require("../../config/config.js");
const app = getApp();
Page({
  data: {
    pusherUrl: "rtmp://118.190.98.53:1935/live/test",
    pusherContext: null,
    playerContext: null,
    linkedPlayerContext: null,
    linkPusherInfo: {
      url: '11',
      loading: true,
      debug: true,
    },
    img: config.img,
  },

  onLoad: function () {
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    var that = this;

      // wx.request({
      //   url: config.coreUrl + 'getLiveUrl.php',
      //   method: 'POST',
      //   header: {
      //     // 'content-type': 'application/json'
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   data: {
      //     type: "pusher",
      //     openId: ''
      //   },
      //   success: function (data) {
      //     console.log(data);
      //     that.setData({
      //       pusherUrl:data.data
      //     })
      //   },
      //   fail: function (res) {
      //     console.log(res)
      //   }
      // })

  },
  onReady(res) {
    this.ctx = wx.createLivePusherContext('pusher')
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  bindStart() {
    this.ctx.start({
      success: res => {
        console.log('start success')
      },
      fail: res => {
        console.log('start fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindSwitchCamera() {
    this.ctx.switchCamera({
      success: res => {
        console.log('switchCamera success')
      },
      fail: res => {
        console.log('switchCamera fail')
      }
    })
  },
  toggleDebug() {
    var self = this;
    self.setData({
      debug: !self.data.debug
    }, () => {
      console.log('>> Debug: ', self.data.debug);
    })
  },

  toggleBeauty() {
    var self = this;
    var bty = self.data.beauty == 5 ? 0 : 5;
    self.setData({
      beauty: bty
    }, () => {
      console.log(bty > 0 ? '开启美颜' : '关闭美颜')
    })

  },
  toggleMuted() {
    var self = this;
    self.setData({
      muted: !self.data.muted
    }, () => {
      console.log(self.data.muted ? '静音' : '非静音')
    })
  },
  switchCamera() {
    var self = this;
    console.log('切换摄像头: ', self.data.pusherContext)
    self.data.pusherContext && self.data.pusherContext.switchCamera({});
  },
})