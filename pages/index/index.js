const config = require("../../config/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],


    rmary: [{
      rmimg: config.img +'rm1.png',
      rmtit: '方法比努力更重要:21堂x小学生……',
      rmcon: '帮助孩子练出最强记忆力'
    }, {
        rmimg: config.img +'rm2.png',
      rmtit: '方法比努力更重要:21堂x小学生……',
      rmcon: '帮助孩子练出最强记忆力'
    }, {
        rmimg: config.img +'rm3.png',
      rmtit: '方法比努力更重要:21堂x小学生……',
      rmcon: '帮助孩子练出最强记忆力'
    }, {
        rmimg: config.img +'rm4.png',
      rmtit: '方法比努力更重要:21堂x小学生……',
      rmcon: '帮助孩子练出最强记忆力'
    }],
    mjary: [{
      mjimg: config.img +'zj1.png',
      mjtit: '曹文轩',
      mjcon: '著名儿童文学家，北京大学教授、博士生导师'
    }, {
        mjimg: config.img +'zj2.png',
      mjtit: '刘心武',
      mjcon: '著名儿童文学家，北京大学教授、博士生导师'
    }, {
        mjimg: config.img +'zj3.png',
      mjtit: '胡萍',
      mjcon: '著名儿童文学家，北京大学教授、博士生导师'
    }],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: config.log
    })
  },

  liveStreamingList: function () {
    var that = this;
    wx.request({
      url: config.coreUrl + 'getRoom.php',
      method: 'POST',
      dataType: 'json',
      data: {
        action: "list",
      },
      success: function (res) {
        that.setData({
          list: res.data
        })
        console.log(res.data);
      }
    })
  },

  pullDownRefreshCustom: function (options) {
    this.liveStreamingList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.liveStreamingList();
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
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://aa.zdcom.net.cn/',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        that.setData({
          moment: res.data.data
        });
        // 设置数组元素
        that.setData({
          moment: that.data.moment
        });
        console.log(that.data.moment);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    wx.request({
      url: 'https://aa.zdcom.net.cn/' + page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 回调函数
        var moment_list = that.data.moment;

        for (var i = 0; i < res.data.data.length; i++) {
          moment_list.push(res.data.data[i]);
        }
        // 设置数据
        that.setData({
          moment: that.data.moment
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})