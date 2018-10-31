function collectFun(url, param, confirm) {
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
}

function indexListFun (dataObj) {
  let that = this;
  return new Promise(function (resolve, reject) {
    wx.request({
      url: dataObj.url,
      method: 'POST',
      dataType: 'json',
      data: dataObj.data,
      success: function (res) {
        let resol = {
          name: dataObj.name,
          data: res.data,
        };
        resolve(resol)
      }
    })
  });
}

module.exports = {
  collectFun: collectFun,
  indexListFun: indexListFun,
}