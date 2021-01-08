let form = layui.form;
let layer = layui.layer;

// 去注册
$(".gotoregi > a").on("click", function () {
  // 表单区域
  $("#login").hide();
  $("#registered").show();
  // 注册/登录索引
  $(".gotoregi > a").hide();
  $(".gotologin >a").show();
});

// 去登录
$(".gotologin > a").on("click", function () {
  // 表单区域
  $("#login").show();
  $("#registered").hide();
  // 注册/登录索引
  $(".gotoregi > a").show();
  $(".gotologin >a").hide();
});
