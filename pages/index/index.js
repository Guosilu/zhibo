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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.load) {//全局标志位，方式请求未响应是多次触发
      if (that.data.list.length < that.data.count) {
        that.setData({
          load: false,
          loading: true,//加载动画的显示
        })
        wx.request({
          url: 'url',
          data: {
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var content = that.data.list.concat(res.data.data.list)//将放回结果放入content
            that.setData({
              list: content,
              page: that.data.page * 1 + 1,
              load: true,
              loading: false,
            })
          },
          fail: function (res) {
            that.setData({
              loading: false,
              load: true,
            })
            wx.showToast({
              title: '数据异常',
              icon: 'none',
              duration: 2000,
            })
          },
          complete: function (res) { },
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})