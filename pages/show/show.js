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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showLoading('正在加载...');
    let itemid = options.itemid
    this.getDetail(itemid);
    console.log(itemid);
  },

  reward: function () {
    payFile.pay({
      body: "直播",
      total_fee: '1',
      openId: app.globalData.openId,
      onExec: (res) => {
        console.log(res);
      } 
    });
  },

  reward1: function (e) {
    var randa = new Date().getTime().toString();
    var randb = Math.round(Math.random() * 10000).toString();
    var that = this;
    wx.request({
      url: config.payApi,
      dataType: "json",
      method: "post",
      data: {
        action: "unifiedOrder",
        out_trade_no: randa + randb, //商户订单号
        body: "赛脉平台赏金", //商品描述
        total_fee: that.data.money, //金额 单位:分
        trade_type: "JSAPI", //交易类型
        openId: app.globalData.openId
      },
      success: function (res) {
        console.log(res.data);
        var data = res.data;
        //生成签名
        wx.request({
          url: config.payApi,
          dataType: "json",
          method: "post",
          data: {
            "action": "getSign",
            'package': "prepay_id=" + data.prepay_id
          },
          success: function (res) {
            var signData = res.data;
            console.log(res.data);
            wx.requestPayment({
              'timeStamp': signData.timeStamp,
              'nonceStr': signData.nonceStr,
              'package': signData.package,
              'signType': "MD5",
              'paySign': signData.sign,
              success: function (res) {
                console.log(res);
                // 添加数据库信息
                wx.request({
                  url: config.payApi,
                  dataType: "json",
                  method: "post",
                  data: {
                    "action": "AddData",
                    "total_fee": that.data.money,
                    "type": 'activity_order',
                    "id": that.data.detail.id
                  },
                  success: function (res) {
                    wx.showToast({
                      title: '赞赏成功',
                    })
                  }
                })
                that.setData({
                  payOpen: false
                })
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }
        })
      }
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
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
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

  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
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