$(function () {
  let layer = layui.layer
  let form = layui.form
  let laypage = layui.laypage
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  template.defaults.imports.one = function (date) {
    // 创建一个时间对象
    const date1 = new Date(date)
    let year = date1.getFullYear()
    let month = (date1.getMonth() + 1).toString().padStart(2, '0')
    let day = date1.getDate().toString().padStart(2, '0')
    let h = date1.getHours().toString().padStart(2, '0')
    let m = date1.getMinutes().toString().padStart(2, '0')
    let s = date1.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day}   ${h}:${m}:${s}`
  }
  // 调用函数
  initTable()
  initCate()
  // 获取文章列表的函数
  function initTable () {
    $.ajax({
      url: '/my/article/list',
      data: q,
      success: res => {
        if (res.status !== 0) return layer.msg('获取文章列表失败！')
        // consolelog(res);
        // 调用模板引擎函数
        let htmlStr = template('tap_table', res)
        // 将数据渲染到页面上
        $('tbody').html(htmlStr)
        // 调用渲染分页函数,将总数传入
        renderPage(res.total)
      }
    })
  }

  // 初始化文章分类的方法
  function initCate () {
    // 发送ajax请求
    $.ajax({
      url: '/my/article/cates',
      success: res => {
        if (res.status !== 0) return layer.msg('获取文章分类失败')
        // 调用模板引擎函数
        let htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 通过 layui 重新渲染表单区域的UI结构
        form.render()
      }
    })
  }
  // 给表单注册submit事件
  $('#form-search').on('submit', function (e) {
    // 阻止默认事件
    e.preventDefault()
    // 定义变量用来接收表单里的值
    let cate_id = $('[name=cate_id]').val()
    let status = $('[name=status]').val()
    // 将接收到的值赋值给q中相应的属性
    q.cate_id = cate_id
    q.state = status
    // 重新获取文章列表
    initTable()
  })

  // 渲染分页
  function renderPage (total) {
    laypage.render({
      elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
      count: total,//数据总数，从服务端得到
      limit: q.pagesize,//每页显示的条数
      curr: q.pagenum,//起始页
      //当分页切换时，会调用jump回调
      // 点击页码的时候回触发jump函数
      // 只要调用了laypage.render函数就会触发
      jump: function (obj, first) {
        // console.log(obj.curr);
        // 将当前的页面赋值给q.pagenum
        q.pagenum = obj.curr
        // console.log(obj.limit);
        // 将最新的条目赋值给q.pagesize
        q.pagesize = obj.limit
        // 根据最新的q渲染页面
        if (!first) {
          initTable()
        }
        // console.log(1);
      }
    });
  }
})