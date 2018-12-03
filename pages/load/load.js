const config = require('../../config/config.js');
const commonFun = require("../../js/commonFun.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loadingComplate: 0,
    page: 1,
    pagesize: 10
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.showLoading('正在加载...');
    this.getList();
  },

  //列表
  getList: function (pages) {
    var pages = pages || false; 
    let that = this;
    let optnId = app.globalData.openId;
    let page = (pages === true) ? this.data.page + 1 : 1;
    let pagesize = this.data.pagesize;
    commonFun.request({
      url: config.myUrl,
      data: {
        action: 'my_video',
        page: page,
        pagesize: pagesize,
        post: { openId: optnId },
      }
    }).then(res => {
      let list = pages === true ? that.data.list.concat(res) : res;
      if(res.length > 0) {
        that.setData({
          list: list,
          page: page
        });
      }else{
        that.showTip('已到达末尾');
      }
      that.stopRefresh();
    });
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getList();
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    this.showLoading('正在加载...', true);
    this.getList(true);
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

  onShow: function (options) {

  }
})
