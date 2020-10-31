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
  var layer = layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $('.reg_box [name=password]').val()
      // console.log(pwd);
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  var BASE = 'http://ajax.frontend.itheima.net'
  //监听注册表单的事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: BASE + '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: res => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功')
        $('#link_login').click()
      }
    })
  })
  // 登录

  $('#form_login').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      type: 'post',
      url: BASE + '/api/login',
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg('登陆失败')
        layer.msg('登陆成功')
        // localStorage.setItem('token', res.token)
        location.href = './index.html'
      }
    })
  })
})  