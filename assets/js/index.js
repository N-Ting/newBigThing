$(function () {
  getUserInfo()
})
// 封装一个获取用户信息的函数
function getUserInfo (params) {
  $.ajax({
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    success: res => {
      console.log(res);
    }
  })
}