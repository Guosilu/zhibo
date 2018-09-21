const config = require("../../config/config.js");

Page({
  data: {
    pusherUrl:""
  },

  onLoad: function () {
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    var that = this;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        if (res.data!='') {
          console.log(res);
          wx.request({
            url: config.coreUrl + 'getLiveUrl.php',
            method: 'POST',
            header: {
              // 'content-type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              type: "pusher",
              openId: res.data
            },
            success: function (data) {
              console.log(data);
              that.setData({
                pusherUrl:data.data
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })



        } else {
          wx.showToast({
            title: "请先登录",
            icon: 'none',
            mask: "true",
            success:function(){
              setTimeout(function(){
                wx.switchTab({
                  url: config.my
                })
              },1000)
              
            }
          })
          
        }
      },
    })
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
  }
})