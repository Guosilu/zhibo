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
    console.log(itemid);
  },

  //详情
  getDetail: function (itemid) {
    let that = this;
    let dataObj = {
      url: config.videoUrl,
      data: {
        action: 'detail',
        post: {
          itemid: itemid,
        },
      }
    }
    commonFun.request(dataObj).then(res => {
      wx.hideLoading();
      console.log(res);
      that.setData({
        detail: res,
      })
    });
  },

  //提示支付
  payTip: function (e) {
    let currentTime = e.detail.currentTime;
    if(currentTime > 5) {
      this.videoContext.stop();
      //this.videoContext.pause();
      wx.showModal({
        title: '进度条没了~',
        content: '是否要付费观看？',
        confirmText: "买吧",
        cancelText: "算了",
        success(res) {
          if (res.confirm) {
            console.log('支付成功')
          } else if (res.cancel) {
          }
        }
      })
    }
  },

  //调起支付
  wxPay: function () {
    payFile.pay({
      body: "山东正大视频消费",
      total_fee: '1',
      openId: app.globalData.openId,
      onExec: (res) => {
        if (res.errMsg == "requestPayment:ok") {
          console.log("存储数据")
        }
      }
    });
  },

  //支付成功后操作
  addData: function () {
    let dataObj = {
      url: config.payApi,
      data: {
        action: "AddData",
        "id": that.data.detail.id
      }
    }
    commonFun.request(dataObjList).then(function (res) {
      wx.showToast({
        title: '赞赏成功！',
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