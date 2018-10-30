const config = require("../../config/config.js");
const app = getApp();
Page({
  data: {
    pusherUrl: "rtmp://118.190.98.53:1935/live/test",
    show: true,
    img: config.img,
    setting:{
    },
    device_position: 'back'                                                   //wx.getStorageSync('device_position')

  },

  onLoad: function () {
    var that = this;
    console.log(that.data.setting.device_position);
    console.log(wx.getStorageSync('device_position'));
    var openId = app.globalData.openId ? app.globalData.openId : ""
    that.query(openId);
  }, 
  query: function (openId) {
    var that = this;
    wx.request({
      url: config.coreUrl + 'getRoom.php',
      method: 'post',
      dataType: "JSON",
      data: {
        action: "show",
        openId: openId
      },
      success: function (res) {
        console.log(JSON.parse(res.data));
        that.setData({
          setting: JSON.parse(res.data),
          pusherUrl: "rtmp://118.190.98.53:1935/live/" + openId
        })
        console.log(that.data.pusherUrl)
      }
    })
  },
  onReady(res) {
    this.ctx = wx.createLivePusherContext('pusher');
    console.log(this.ctx)
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
    this.ctx.switchCamera({
      success: res => {
        console.log('switchCamera success')
      },
      fail: res => {
        console.log('switchCamera fail')
      }
    })

  }, 
  pause() {
    this.ctx.pause({
      success: res => {
        wx.showToast({
          title: '暂停直播',
        })
      },
      fail: res => {
        console.log('snapshot fail')
      }
    })
  },
  resume() {
    this.ctx.resume({
      success: res => {
        wx.showToast({
          title: '恢复直播',
        })
      },
      fail: res => {
        console.log('snapshot fail')
      }
    })
  },
/**
 * 设置页面
 */
  move: function(e){
    wx.navigateTo({
      url: '../setRoom/setRoom?id='+this.data.setting.openId,
    })
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.request({
      url: config.coreUrl + 'getRoom.php',
      method: 'post',
      dataType: "JSON",
      data: {
        action: "unset",
        openId: app.globalData.openId
      }
    })
  },
  onHide:function(){
    wx.request({
      url: config.coreUrl + 'getRoom.php',
      method: 'post',
      dataType: "JSON",
      data: {
        action: "unset",
        openId: app.globalData.openId
      }
    })
  },
  onShow(){
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    var that = this;
    var openId = app.globalData.openId ? app.globalData.openId : ""
    that.query(openId);
  }
})