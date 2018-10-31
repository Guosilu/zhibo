const config = require("../../config/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    startTimeList: [],
    hotList: [],
    newList: [],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: config.log
    })
  },

  getListFun: function (url , data) {
    var that = this;
    var ret = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: data,
        success: function (res) {
          resolve(res.data)
        }
      })
    });
    return ret;
  },

  getList: function (options) {
    var that = this;
    let promise1 = function () {
      let startTimeData = {
        action: "list", order: '`start_time` DESC', pagesize: 2,
      };
      return new Promise(function (resolve, reject) {
        that.getListFun(config.coreUrl + 'getRoom.php', startTimeData).then(function (res) {
          console.log(res);
          that.setData({
            startTimeList: res
          })
        });
      })
    }
    let promise2 = function () {
      var hotData = {
        action: "list", order: '`collect` DESC', pagesize: 4,
      };
      return new Promise(function (resolve, reject) {
        that.getListFun(config.coreUrl + 'getRoom.php', hotData).then(function (res) {
          console.log(res);
          that.setData({
            hotList: res
          })
        });
      })
    }
    let promise3 = function () {
      var newData = {
        action: "list", order: '`createTime` DESC', pagesize: 3,
      };
      return new Promise(function (resolve, reject) {
        that.getListFun(config.coreUrl + 'getRoom.php', newData).then(function (res) {
          console.log(res);
          that.setData({
            newList: res
          })
        });
      })
    }
    let exec = function() {
      promise1()
      promise2()
      promise3()
    }
    exec();
  },
  stopRefresh: function() {
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getList();
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
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})