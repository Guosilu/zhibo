const config = require("../../config/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: 0,
    allList: {},
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

  getListFun: function (url , data, name) {
    var that = this;
    var ret = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: data,
        success: function (res) {
          let resol = {
            name: name,
            data: res.data,
          };
          resolve(resol)
        }
      })
    });
    return ret;
  },

  getList: function (options) {
    var that = this;
    var dataList = [
      {
        name: 'startTimeList',
        url: config.coreUrl + 'getRoom.php',
        data: {
        action: "list", order: '`start_time` DESC', pagesize: 2,
        }
      },
      {
        name: 'hotList',
        url: config.coreUrl + 'getRoom.php',
        data: {
          action: "list", order: '`collect` DESC', pagesize: 4,
        }
      },
      {
        name: 'newList',
        url: config.coreUrl + 'getRoom.php',
        data: {
          action: "list", order: '`createTime` DESC', pagesize: 3,
        }
      }
    ]
    let promiseArr = [];
    for (let i = 0; i < dataList.length; i++) {
      let promise = this.getListFun(dataList[i].url, dataList[i].data, dataList[i].name);
      promiseArr.push(promise)
    }
    Promise.all(promiseArr).then(function (res) {
      let allList = {};
      for (let i = 0; i < res.length; i++) {
        allList[res[i].name] = res[i].data
      }
      that.setData({
        allList: allList
      });
      that.stopRefresh();
      console.log(allList);
    });
  },
  stopRefresh: function() {
    this.setData({
      loading: 1,
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