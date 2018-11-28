const app = getApp();
const config = require('../../config/config.js');
const commonFun = require("../../js/commonFun.js");
const payFile = require("../../js/pay.js");
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data: {
    detail: {},
    inputValue: '',
    src: '',
    watchPower: null,
    duration: 5,
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ]
  },

  //生命周期函数onReady
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },

  //生命周期函数onLoad
  onLoad: function (options) {
    this.showLoading('正在加载...');
    let itemid = options.itemid
    this.getDetail(itemid);
  },

  //详情
  getDetail: function (itemid) {
    let that = this;
    let watchPower;
    let dataObj = {
      url: config.videoUrl,
      data: {
        action: 'detail',
        post: {
          itemid: itemid,
          openId: app.globalData.openId,
        },
      }
    }
    commonFun.request(dataObj).then(res => {
      wx.hideLoading();
      watchPower = res.is_charge == 1 && res.power == 0 ? false : true;
      console.log(watchPower);
      that.setData({
        detail: res,
        watchPower: watchPower
      })
    });
  },

  //提示支付
  payTip: function (e) {
    let that = this;
    let watchPower = this.data.watchPower;
    let currentTime = e.detail.currentTime;
    let duration = this.data.duration;
    let money = this.data.detail.charge;
    console.log(currentTime)
    if (watchPower === false && currentTime >= duration) {
      this.videoContext.stop();//终止视频播放
      wx.showModal({
        title: '提示',
        content: '试看还满意吗？' + money + '元支持一下把！',
        confirmText: "好的",
        cancelText: "不了",
        success(res) {
          if (res.confirm) {
            that.wxPay();//调起支付
          } else if (res.cancel) {}
        }
      });
    }
  },

  //调起支付
  wxPay: function () {
    let that = this;
    let total_fee = parseFloat(this.data.detail.charge) * 100;
    payFile.pay({
      body: "山东正大视频消费",
      total_fee: total_fee,
      openId: app.globalData.openId,
      onExec: (res) => {
        if (res.errMsg == "requestPayment:ok") {
          console.log("存储数据")
          that.showLoading('正在处理数据...');
          that.addData();
        }
      }
    });
  },

  //支付成功后添加数据
  addData: function () {
    let that = this;
    let itemid = that.data.detail.itemid;
    let openId = app.globalData.openId;
    let money = this.data.detail.charge;
    let dataObj = {
      url: config.videoUrl,
      data: {
        action: "pay",
        post: {
          itemid: itemid,
          openId: openId,
          money: money
        }
      }
    }
    commonFun.request(dataObj).then(function (res) {
      wx.showToast({
        icon: "none",
        title: res,
      })
      that.setData({
        watchPower: true,
        'detail.power': 1
      })
    });
  },
  
  //提示方法
  showTip: function (msg) {
    wx.showToast({
      icon: 'none',
      title: msg,
    })
  },

  //加载方法
  showLoading: function (msg, mask) {
    var mask = mask || false;
    wx.showLoading({
      mask: mask,
      title: msg,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getRandomColor: function () {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },

  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  // bindButtonTap: function () {
  //   var that = this
  //   wx.chooseVideo({
  //     sourceType: ['album', 'camera'],
  //     maxDuration: 60,
  //     camera: ['front', 'back'],
  //     success: function (res) {
  //       that.setData({
  //         src: res.tempFilePath
  //       })
  //     }
  //   })
  // },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  }
})