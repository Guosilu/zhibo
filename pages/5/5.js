// pages/5/5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    limit: 4,//显示数据量
    list: '',
    page: 1,//当前页
    load: true,
    loading: false,//加载动画的显示

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载

    wx.request({
      url: 'https://aa.zdcom.net.cn/',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("123123123")
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