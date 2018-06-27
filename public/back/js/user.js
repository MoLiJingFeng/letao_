$(function () {

  var curpage = 1; // 当前页
  var pageSize = 5; // 每页多少条

  var currentId, isDelete; // 声明变量, 标记当前选中的用户

  // 1. 一进入页面, 发送 ajax 请求, 从后台获取数据, 通过模板引擎渲染
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: curpage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('tbody').html(template("tpl", info));

        //分页插件bootstrapPaginator
        //初始化 (根据文档添加配置项)
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //需要定义版本号, 在结构中使用  ul
          currentPage: info.page, //当前第几页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          //为按钮绑定点击事件 page:表示当前点击的页码
          onPageClicked: function (a, b, c, page) {
            curpage = page; // 更新当前页
            render(); // 重新调用 render
          }
        })
      }
    })
  }

  //2.启用禁用按钮功能
  /**点击按钮, 弹出模态框(复用, 用的是同一个模态框)
   *通过事件委托来注册点击事件, 效率更高
   */
  $('tbody').on('click', '.btn', function () {
    $('#userModal').modal('show'); // 让模态框显示
    // 点击时候, 将当前选中的用户 id 记录在 全局 currentId
    currentId = $(this).parent().data('id');
    // 点击禁用按钮, 让用户变成禁用状态, 让 isDelete变成 0 => 将来传给后台就传 0
    //hasClass()是否拥有类名,三元表达式判断
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

  })

  //3. 点击确认按钮, 需要根据 id 和 isDelete 发送 ajax 请求, 修改用户状态
  $('#submitBtn').click(function () {
    console.log(currentId);
    console.log(isDelete);
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function () {
        $('#userModal').modal('hide');// 1. 关闭模态框
        render();// 2. 重新渲染数据
      }
    })
  })


})