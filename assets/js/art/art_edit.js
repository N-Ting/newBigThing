$(function () {
  let layer = layui.layer
  let form = layui.form
  initCate()
  function initCate () {
    // 发送ajax请求
    $.ajax({
      url: '/my/article/cates',
      success: res => {
        if (res.status !== 0) return layer.msg('发布文章失败')
        // 调用模板引擎函数
        let htmlStr = template('add_cate', res)
        // 渲染到页面上
        $('[name=cate_id]').html(htmlStr)
        // 重新调用form.render渲染
        form.render()
      }
    })
  }
  // 初始化富文本编辑器
  initEditor()
  // // 1. 初始化图片裁剪器
  // var $image = $('#image')

  // // 2. 裁剪选项
  // var options = {
  //   aspectRatio: 400 / 280,
  //   preview: '.img-preview'
  // }

  // // 3. 初始化裁剪区域
  // $image.cropper(options)
  // 给选择图片设置点击事件
  $('#files').on('click', function () {
    $('[type=file]').click()
  })
  $('#coverFile').on('change', function (e) {
    // 将选择的文件赋值给变量file
    let file = e.target.files[0]
    // 根据选择的文件创建url地址
    let newImgURL = URL.createObjectURL(file)
    $image.cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径   
      .cropper(options)        // 重新初始化裁剪区域
  })

  // 定义文章发布的状态
  let art_cate = '已发布'
  // 当点击草稿按钮时，文章状态为草稿
  $('#btnSave2').on('click', function () {
    art_cate = '草稿'
  })

  // 为表单绑定submit事件
  $('#form_pub').on('submit', function (e) {
    // 阻止表单默认提交事件
    e.preventDefault()
    let fd = new FormData(this)
    fd.append('state', art_cate)
    $image.cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布    
      width: 400,
      height: 280
    })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象    
        // 得到文件对象后，进行后续的操作  
        // 将图片添加到formDate对象里
        fd.append('cover_img', blob)
        // 将formData对象作为参数传入pubFd函数中
        pubFd(fd)
      })
  })
  // 封装一个发送请求的函数
  function pubFd (fd) {
    $.ajax({
      type: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: res => {
        if (res.status !== 0) layer.msg('发布文章失败')
        layer.msg('发布文章成功')
        // 跳转到文章列表页面
        location.href = '/art/art_list.html'
        // 让文章列表高亮
        window.parent.document.querySelector('[href="/art/art_list.html"]').click()
      }
    })
  }

  // 通过location.search获取到url里的查询字符串
  // console.log(location.search);
  let idx = location.search.substring(1).split('=')[1]
  // console.log(idx);
  // 发送ajax请求
  $.ajax({
    url: '/my/article/' + idx,
    data: {
      Id: idx
    },
    success: res => {
      console.log(res);
      // 使用form.val()将获取到的数据赋值给表单,需要给form设置lay-filter
      form.val('article-form', res.data);
      setTimeout(function () {
        $('[name=cate_id]').find(`option[value=${res.data.cate_id}]`).prop('selected', true);
        form.render();
        // 将获取到的图片路径赋值给#image
        $('#image').prop('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img)
        // 1. 初始化图片裁剪器
        var $image = $('#image')

        // 2. 裁剪选项
        var options = {
          aspectRatio: 400 / 280,
          preview: '.img-preview'
        }
        // 3. 初始化裁剪区域
        $image.cropper(options);
      }, 1000);

    }
  })
})