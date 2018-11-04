
//收藏方法
function collect(url, param, confirm) {
  var confirm = confirm || '';
  if (confirm) {
    return new Promise(function (resolve, reject) {
      wx.showModal({
        title: '提示',
        content: '确定取消关注吗？',
        success: function (confirm) {
          if (confirm.confirm) {
            wx.request({
              url: url,
              method: "POST",
              data: param,
              success: function (res) {
                resolve(res.data);
              }
            });
          }
        }
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        method: "POST",
        data: param,
        success: function (res) {
          resolve(res.data);
        }
      });
    });
  }
}


module.exports = {
  collect: collect,
}