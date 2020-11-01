$(function () {
  getUserInfo()
  // 给退出设置点击监听事件
  $('.tuichu').on('click', function () {
    // 提示用户是否退出
    layui.layer.confirm('是否退出?', { icon: 3, title: '提示' }, function (index) {
      // 移除本地存储里的内容
      localStorage.removeItem('token')
      location.href = './login.html'
      layui.layer.close(index);
    });

  })
})
// 封装一个获取用户信息的函数
function getUserInfo (params) {
  $.ajax({
    url: '/my/userinfo',
    // 请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: res => {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }
      // 调用渲染页面的函数
      renderAvatar(res.data)
    }
  })
}
function renderAvatar (user) {
  // 有昵称就用昵称，没有就用用户名
  let name = user.nickname || user.username
  // 渲染welcome里面的结构
  $('.welcome').html('欢迎&nbsp;' + name)
  // 判断是否用图片
  if (user.user_pic !== null) {
    // 渲染图片
    $('.layui-nav-img').attr('src', user.user_pic).show()
    // 隐藏文字头像
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name.charAt(0).toUpperCase()
    $('.text-avatar').html(first).show()
  }
}