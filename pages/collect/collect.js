const config = require('../../config/config.js');
const commonFun = require("../../js/commonFun.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingComplate: 0,
    page: 1,
    pagesize: 10,
    history_list: {},
    list: {
      collect: [],
      history: []
    },
    currentData: 0,
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

  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    let that = this;
    let currentData = that.data.currentData;
    let current = e.target.dataset.current;
    let action = current == 1 ? 'history' : 'collect';
    if (currentData === current) {
      return false;
    } else {
      this.data.page = 1;
      this.getList(action).then((res) => {
        that.setData({
          currentData: e.target.dataset.current
        })
      })
    }
  },

  //列表
  getList: function (action, pages) {
    let that = this;
    var action = action || 'collect'; 
    var pages = pages || false;
    let optnId = app.globalData.openId;
    let page = (pages === true) ? this.data.page + 1 : 1;
    let pagesize = this.data.pagesize;
    return new Promise((resolve) => {
      commonFun.request({
        url: config.collectUrl,
        data: {
          action: action,
          post: {
            page: page,
            pagesize: pagesize,
            where: {
              openId: optnId
            }
          }
        }
      }).then(res => {
        that.stopRefresh();
        let listName = action === 'collect' ? 'list.collect' : 'list.history';
        let list = pages === true ? (action === 'collect' ? that.data.list.collect.concat(res) : that.data.list.history.concat(res)) : res;
        console.log(that.data.list);
        console.log(listName);
        if (res.length > 0) {
          that.setData({
            [listName]: list,
            page: page,
            action: action
          });
        } else {
          that.showTip('已到达末尾');
        }
        resolve(1);
      });
    });
  },
  
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    let action = this.data.action;
    this.setData({
      page: 1
    })
    wx.showNavigationBarLoading();
    this.getList(action);
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    let action = this.data.action;
    this.showLoading('正在加载...', true);
    this.getList(action, true);
  },

  stopRefresh: function () {
    this.setData({
      loadingComplate: 1
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
    
  },

  player:function(){
    wx.navigateTo({
      url: config.player,
    })
  },

  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
})
