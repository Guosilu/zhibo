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
    pagesize: 10,
    history_list: {},
    allList: {},
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
      console.log(action);
      this.getList(action).then((res) => {
        that.setData({
          currentData: e.target.dataset.current
        })
      })
    }
  },

  //列表
  getList: function (action, pages) {
    var action = action || 'collect'; 
    var pages = pages || false;
    let that = this;
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
        let list = pages === true ? that.data.list.concat(res) : res;
        if (res.length > 0) {
          that.setData({
            list: list,
            page: page
          });
        } else {
          that.showTip('已到达末尾');
        }
        that.stopRefresh();
        resolve(1);
      });
    });
  },
  
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getList();
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
