const config = require("../../config/config.js");
const commonFun = require("../../js/commonFun.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 4,//显示数据量 
    loadingComplate: 0,
    allList: []
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.showLoading('正在加载...');
    this.getList();
  },

  //列表
  getList: function () {
    let that = this;
    let dataObjList = [
      {
        name: 'free_video_list',
        url: config.videoUrl,
        data: {
          action: "list", post: {
            pagesize: 4,
            where: {
              charge: 0
            }
          }
        }
      },
      {
        name: 'charge_video_list',
        url: config.videoUrl,
        data: {
          action: "list", post: {
            pagesize: 4,
            where:{
              charge: 1
            }
          }
        }
      }
    ];
    commonFun.getList(dataObjList).then(function (res) {
      that.setData({
        allList: res
      });
      that.stopRefresh();
      that.setData({
        loadingComplate: 1
      })
      console.log(res);
    });
  },

  stopRefresh: function () {
    wx.hideLoading();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getList();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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