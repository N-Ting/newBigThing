$(function () {
  let form = layui.form
  let layer = layui.layer
  // 自定义校验
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    newpwd: function (value) {
      if (value === $('.layui-form [name=oldPwd]').val()) return '两次密码一样'
    },
    repwd: function (value) {
      if (value !== $('.layui-form [name=newPwd]').val()) return '两次密码不一致'
    }
  })
  // 监听表单提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    // 获取ajax请求
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg('修改密码失败')
        layer.msg('修改密码成功！')
        // 清空表单
        $('.layui-form')[0].reset()
      }
    })
  })
})