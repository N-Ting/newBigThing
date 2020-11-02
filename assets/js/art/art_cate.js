$(function () {
  init()
  // 渲染页面的函数
  function init () {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: res => {
        // 调用模板引擎函数
        let html = template('db', res)
        // 渲染页面
        $('tbody').html(html)
      }
    })
  }
  let layer = layui.layer
  let form = layui.form
  // 定义一个变量表示下标
  let indexAdd = null
  // 给添加按钮设置点击监听事件
  $('#btnAdd').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $("#id1").html() //这里content是一个普通的String
    });
  })

  // 因为弹出层不是在html原有的，而是在后面拼接的，所以用事件委托
  $('body').on('submit', '#form_Add', function (e) {
    // 阻止默认行为
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: "POST",
      url: '/my/article/addcates',
      // 获取表单数据
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg('添加失败')
        // 重新获取分类信息
        init()
        layer.msg('添加成功')
        // 关闭弹出层
        layer.close(indexAdd)
      }
    })
  })
  let indexEdit = null

  // 点击编辑按钮
  $('tbody').on('click', '#btn_edit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $("#tilog_edit").html() //这里content是一个普通的String
    });

    // 获取当前分类的数据
    let id = $(this).attr('data-id')
    // console.log(id);
    // 发送ajax请求
    $.ajax({
      type: "GET",
      url: '/my/article/cates/' + id,
      success: res => {
        // 成功后，将数据赋值上form表单
        form.val('form_edit', res.data)
      }
    })
  })
  // 通过代理的形式，修改表单的数据
  $('body').on('submit', '#form_edit', function (e) {
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      // 获取表单数据
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg('修改分类信息失败')
        layer.msg('修改分类成功')
        // 关闭弹出层
        layer.close(indexEdit)
        // 重新获取分类信息
        init()
      }
    })
  })

  // 通过事件委托给删除按钮绑定点击事件
  $('tbody').on('click', '#btnDel', function () {
    // 定义一个变量获取自定义属性
    let id = $(this).attr('data-id')
    // 提示用户是否删除
    layer.confirm('确认删除?',
      {
        icon: 3,
        title: '提示'
      },
      function (index) {
        // 发送ajax请求
        $.ajax({
          url: '/my/article/deletecate/' + id,
          success: res => {
            if (res.status !== 0) return layer.msg('删除失败！')
            layer.msg('删除成功')
            // 关闭询问框
            layer.close(index);
            init()
          }

        })

      });

  })
})


