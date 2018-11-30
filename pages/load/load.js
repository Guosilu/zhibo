const config = require('../../config/config.js');
const commonFun = require("../../js/commonFun.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loadingComplate: 0
  },

  //列表
  getList: function () {
    let that = this;
    let optnId = app.globalData.openId;
    commonFun.request({
      url: config.myUrl,
      data: {
        action: 'my_video',
        pagesize: 111,
        post: { openId: optnId },
      }
    }).then(res => {
      that.setData({
        list: res
      });
      wx.hideLoading();
    });
  },

  stopRefresh: function () {
    this.setData({
      loadingComplate: 1,
    })
    wx.hideLoading();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    this.getList();
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getList();
  },

  onShow: function (options) {

  }
})
