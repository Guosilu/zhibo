function fileUpload(paramObj) {
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: paramObj.url,
      filePath: paramObj.filePath,
      name: paramObj.name,
      formData: paramObj.formData,
      success: function (res) {
        let data = JSON.parse(res.data);
        let success = data.success;
        console.log(data);
        if (success == 1) {
          resolve(data.file_url);
        } else {
          resolve(0);
        }
      }
    });
  });
}

module.exports = {
  fileUpload: fileUpload
}