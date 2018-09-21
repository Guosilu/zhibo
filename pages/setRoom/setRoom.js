// pages/setRoom/setRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //画质
    mode: [
      { name: 'SD', value: 'SD（标清）：', checked: ''},
      { name: 'HD', value: 'HD（高清）：', checked: ''},
      { name: 'FHD', value: 'FHD（超清）：', checked: ''},
      { name: 'RTC', value: 'RTC（实时通话）：', checked: ''}
    ],
    autopush: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //画质
    var query = 'SD';
    var mode = that.data.mode;
    //设置选择画质回显
    for (let a = 0; a < mode.length;a++){
      if (mode[a]['name']==query){
        mode[a]['checked'] = 'true';
      }else{
        mode[a]['checked'] = '';
      }
    }




    that.setData({
      mode: mode,    //画质
      autopush:'',   //自动推流
      muted:'',     //是否静音
      //enable-camera:""//开启摄像头
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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