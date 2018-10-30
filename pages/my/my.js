
const app = getApp();
const config = require("../../config/config.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: config.img,
    motto: 'Hello World',
    userInfo: {}
  },
  /**
   * 获取缓存,判断是否登录
   */
  gotozb: function () {
    /**
     * 获取PusherUrl
     * 如果有跳转到直播页面
     * 否则调转到创建直播页面
     */
    wx.request({
      url: config.coreUrl + 'getLiveUrl.php',
      method: 'POST',
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        type: "isRoom",
        openId: app.globalData.openId
      },
      success: function (data) {
        if (data.data != ''){
          //跳转直播页面
          wx.navigateTo({
            url: config.pusher
          })
        } else {
          //跳转创建直播页面
          wx.navigateTo({
            url: config.setRoom
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: "请先登录",
          icon: 'none',
          mask: "true"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getUserInfo: function () {
    let that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.hideLoading();
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.hideLoading();
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.hideLoading();
        }
      })
    }
  },
  onLoad: function () {
    wx.getStorageSync('device_position','back')
  },
  onShow: function () {
    this.getUserInfo();
  }
})