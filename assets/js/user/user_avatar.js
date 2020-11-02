$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 给上传按钮设置点击监听事件
  $('#btnSever').on('click', function () {
    // 让文件按钮自动点击
    $('#file').click()
  })

  let layer = layui.layer
  // 为文件绑定change事件
  $('#file').on('change', function (e) {
    // console.log(e);
    let file = e.target.files
    if (file.length === 0) {
      return layer.msg('请选择图片')
    }
    // 将选择的第一个文件转换url
    let newURL = URL.createObjectURL(file[0])
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域   
      .attr('src', newURL)  // 重新设置图片路径   
      .cropper(options)        // 重新初始化裁剪区域
  })
  // 点击确定按钮时将图片上传到服务器
  $('#btnUpload').on('click', function () {
    // 拿到剪裁的图片
    const dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布        
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: res => {
        if (res.status != 0) return layer.msg('更新头像失败')
        layer.msg('更换头像成功')
        console.log(res);
        // 更新用户信息
        window.top.getUserInfo()
      }
    })
  })

})