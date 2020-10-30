$(function () {
  //点击去注册账号链接
  $('#link_reg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })
  //点击去登录链接
  $('#link_login').on('click', function () {
    $('.reg_box').hide()
    $('.login_box').show()
  })
})