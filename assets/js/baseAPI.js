$.ajaxPrefilter(function (options) {
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  //  判断路径里是否包含my
  if (options.url.indexOf('/my/') !== -1) {
    // 设置请求头
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  options.complete = function (res) {
    // console.log(res);
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      // 清空本地存储里的token
      localStorage.removeItem('token')
      location.href = './login.html'

    }
  }
})