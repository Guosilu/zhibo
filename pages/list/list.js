const config = require("../../config/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 4,//显示数据量
    list: [],
    page: 1,
    pagesize: 10,
  },
  getList: function (refresh) {
    var that = this;
    var refresh = refresh || '';
    if (refresh == 1) {
      var page = 1;
      var pagesize = this.data.pagesize;
    } else {
      var page = this.data.page;
      var pagesize = this.data.pagesize;
    }
    wx.request({
      url: config.coreUrl + 'getRoom.php',
      method: 'POST',
      dataType: 'json',
      data: {
        action: "list",
        order: '`start_time` DESC',
        page: page,
        pagesize: pagesize,
      },
      success: function (res) {
        if (res.data.length > 0) {
          if (refresh == 1) {
            that.setData({
              list: res.data,
              page: 1,
            })
          } else {
            that.setData({
              list: that.data.list.concat(res.data),
              page: page + 1,
            })
          }
          console.log(res.data);
        } else {
          wx.showToast({
            icon: 'none',
            title: '到底了~',
          })
        }
      },
      complete: function () {
        that.stopRefresh();
      }
    })
  },
  stopRefresh: function () {
    wx.hideLoading();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
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
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getList(1);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})