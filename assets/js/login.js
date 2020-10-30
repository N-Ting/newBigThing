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
  // 自定义校验
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $('.reg_box[name=password]').val()
      if (pwd != value) {
        return '两次密码不一致'
      }
    }
  })
})