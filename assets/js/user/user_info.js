$(function () {
  let form = layui.form
  let layer = layui.layer
  // 自定义校验
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称在1~6位数之间'
      }
    }
  })
  initUser()
  // 封装一个获取用户基本信息的函数
  function initUser () {
    // 发送ajax请求
    $.ajax({
      url: '/my/userinfo',
      success: res => {
        // 判断状态码是否为0
        if (res.status !== 0) return layer.msg('获取用户信息失败！')
        // 打印data数据
        // console.log(res.data);
        // 调用form.val()快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }
  // 重置表单信息
  $('#btnres').on('click', function (e) {
    // 阻止表单默认行为
    e.preventDefault()
    initUser()
  })
  // 监听表单提交事件
  $('.layui-form').on('submit', function (e) {
    // 阻止表单默认行为
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      // 获取所有表单信息
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) layer.msg('更新用户信息失败！')
        layer.msg('更新用户信息成功')
        window.parent.getUserInfo()
      }
    })
  })
})
