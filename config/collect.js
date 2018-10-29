// interface
const baseUrl = 'https://aa.zdcom.net.cn/';
const playerUrl = baseUrl + 'wechatProgram/api/playerApi.php';
const collectUrl = baseUrl + 'wechatProgram/api/collectApi.php';
function requestFun(url, param, confirm) {
  var confirm = confirm || '';
  if (confirm) {
    var promise = new Promise(function (resolve, reject) {
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
    var promise = new Promise(function (resolve, reject) {
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
  return promise;
}

module.exports = {
  requestFun: requestFun,
  playerUrl: playerUrl,
  collectUrl: collectUrl
}