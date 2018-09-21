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
    autopush: '',   //自动推流
    muted: '',     //是否静音
    camera: "",     //开启摄像头
    focus: "",       //自动聚集 
    orientation: [    //方向 vertical=>垂直 horizontal=>水平
      { name: 'vertical', value: '垂直', checked: ''},
      { name: 'horizontal', value: '水平', checked: ''}
    ],
    beauty: "",     //美颜
    whiteness: "", //美白
    aspect: [    //宽高比  9:16  3:4
      { name: '3:4', value: '3:4', checked: '' },
      { name: '9:16', value: '9:16', checked: '' }
    ],
    min_bitrate: "", //最小码率
    max_bitrate: "", //最大码率
    waiting_image: "",//进入后台时推流的等待画面
    waiting_image_hash: "",//等待画面资源的MD5值
    zoom: "",           //调整焦距
    device_position: [ //前置或后置，值为front, back
      { name: 'front', value: '前置', checked: '' },
      { name: 'back', value: '后置', checked: '' }
    ],
    background_mute: "",//进入后台时是否静音
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //画质
    var mode = that.setSth('mode', 'RTC');
    //自动推流
    var autopush = true;
    //是否静音
    var muted = true;
    //开启摄像头
    var camera = true;
    //自动聚集
    var focus = true;
    //方向
    var orientation = that.setSth('orientation', 'vertical');
    //美颜
    var beauty = 2;
    //美白
    var whiteness = 3;
    //宽高比
    var aspect = that.setSth('aspect','3:4');
    //最小码率
    var min_bitrate = 200;
    //最大码率
    var max_bitrate = 1000;
    //进去后台时推流的等待画面
    var waiting_image = '';
    //等待画面资源的MD5值
    var waiting_image_hash = '';
    //调整焦距
    var zoom = true;
    //前置或后置 device_position
    var device_position = that.setSth('device_position', 'back');
    //进入后台时是否静音
    var background_mute = true;
    that.setData({
      mode: mode,    //画质
      autopush: autopush,   //自动推流
      muted: muted,     //是否静音
      camera: camera,     //开启摄像头
      focus: focus,       //自动聚集 
      orientation: orientation,  //方向 vertical=>垂直 horizontal=>水平
      beauty: beauty,     //美颜
      whiteness: whiteness, //美白
      aspect: aspect,  //宽高比  9:16  3:4
      min_bitrate: min_bitrate, //最小码率
      max_bitrate: max_bitrate, //最大码率
      waiting_image: waiting_image,//进入后台时推流的等待画面
      waiting_image_hash: waiting_image_hash,//等待画面资源的MD5值
      zoom: zoom,           //调整焦距
      device_position: device_position, //前置或后置，值为front, back
      background_mute: background_mute,//进入后台时是否静音
    })
  },
  /**
   * 自定义方法区域
   */
  // 表单提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
  },
  //设置单选
  setSth: function (datas,param){
    var that = this;
    var data = that.data[datas];
    for (let b = 0; b < data.length; b++) {
      if (data[b]['name'] == param) {
        data[b]['checked'] = 'true';
      } else {
        data[b]['checked'] = '';
      }
    }
    return data;
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