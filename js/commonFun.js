
//请求方法
function request(dataObj) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: dataObj.url,
      method: 'POST',
      dataType: 'json',
      data: dataObj.data,
      success: function (res) {
        resolve(res.data)
      }
    })
  });
}


//获取列表方法
function getList(dataObjList) {
  return new Promise(function (resolve, reject) {
    let promiseArr = [];
    for (let i = 0; i < dataObjList.length; i++) {
      let promise = promiseFun(dataObjList[i]);
      promiseArr.push(promise)
    }
    Promise.all(promiseArr).then(function (res) {
      let allList = {};
      for (let i = 0; i < res.length; i++) {
        allList[res[i].name] = res[i].data
      }
      resolve(allList);
    });
  });
}

//获取列表方法-1
function promiseFun(dataObj) {
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
  request: request,
  getList: getList,
}