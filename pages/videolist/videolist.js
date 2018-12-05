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
    list: [],
    catid: '',
    category: [
      { catid: '', catname: '全部' },
      { catid: 'free', catname: '免费' },
      { catid: 'charge', catname: '收费' }
    ],
    currentTab: 0
  },


  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.showLoading('正在加载...')
    let promistAll = [];
    promistAll.push(this.getCat(), this.getList());
    console.log(promistAll);
    Promise.all(promistAll).then(() => {
      this.stopRefresh();
    })
  },

  //tab切换
  navbarTap: function (e) {
    let that = this;
    let currentTab = e.currentTarget.dataset.idx;
    let catid = e.currentTarget.dataset.catid;
    if (currentTab === this.data.currentTab) {
      return false;
    } else {
      //this.showLoading('正在加载...')
      this.setData({
        catid: catid,
        page: 1
      })
      this.getList().then(() => {
        that.setData({
          currentTab: currentTab
        })
      })
    }
  },

  //列表
  getList: function (pages) {
    let that = this;
    let loadingComplate = this.data.loadingComplate;
    let catid = this.data.catid;
    console.log(catid);
    var pages = pages || false;
    let openId = app.globalData.openId;
    let page = (pages === true) ? this.data.page + 1 : 1;
    let pagesize = this.data.pagesize;
    return new Promise((resolve) => {
      commonFun.request({
        url: config.videoUrl,
        data: {
          action: 'list',
          post: {
            page: page,
            pagesize: pagesize,
            where: {
              catid: catid
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
          that.showTip('搜不到了~');
          if (page == 1) {
            that.setData({
              list: []
            });
          }
        }
        if (loadingComplate == 1) that.stopRefresh();
        resolve(true);
      });
    });
  },

  //tab切换
  getCat: function () {
    let that = this;
    return new Promise((resolve) => {
      commonFun.request({
        url: config.videoUrl,
        data: {
          action: 'category'
        }
      }).then(res => {
        if (res.length > 0) {
          console.log(res);
          that.setData({
            category: that.data.category.concat(res)
          });
        }
        resolve(true);
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
    this.getList();
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    let action = this.data.action;
    this.showLoading('正在加载...', true);
    this.getList(true);
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})