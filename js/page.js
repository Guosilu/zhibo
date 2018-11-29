class pages {
  constructor({url, action, data, onExec }) {
    this.url = url || null;
    this.action = action || null;
    this.data = data || {};
    this.onExec = onExec;
  }

  exec() {
    //console.log(this.body);
    this.request()
      .catch(function (error) {
        console.log('error: ' + error);
      })
      .then(this.onExec);//支付成功回调函数
  }

  //请求
  request() {
    this.showLoading({ title: "正在搜索..." });
    let url = this.url;
    let action = this.action;
    let data = this.data;
    console.log(data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        dataType: "json",
        method: "post",
        data: data,
        success: (res) => {
          wx.hideLoading();
          resolve(res.data);
        }
      })
    })
  }

  showLoading({ title, mark }) {
    mark = mark || true;
    wx.showLoading({
      mark: mark,
      title: title
    })
  }
}

var doPages = (opt) => {
  return new pages(opt).exec();
}
module.exports = {
  pages: doPages
}