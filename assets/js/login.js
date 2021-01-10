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

// 配置密码的输入规则
form.verify({
  username: function (value, item) {
    //value：表单的值、item：表单的DOM对象
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
      return "用户名不能有特殊字符";
    }
    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
      return "用户名首尾不能出现下划线'_'";
    }
    if (/^\d+\d+\d$/.test(value)) {
      return "用户名不能全为数字";
    }

    //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
    if (value === "xxx") {
      alert("用户名不能为敏感词");
      return true;
    }
  },

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  // 验证两次输入的密码是否一致
  resetPwd: function (value) {
    let pwd = $("#pwd").val();
    // console.log(pwd);
    if (value !== pwd) {
      return "两次输入的密码不一致，请重新输入";
    }
  },
});

// 配置ajax请求的默认项
$.ajaxPrefilter(function (options) {
  // options.url = "http://ajax.frontend.itheima.net" + options.url;
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
});

// 登录
$("#login").on("submit", function (e) {
  // 阻止默认行为
  e.preventDefault();
  // 获取数据
  let data = $(this).serialize();
  // console.log(data);

  // 发送登录请求
  $.ajax({
    type: "POST",
    url: "/api/login",
    data,
    success: function (result) {
      // 判断是否登录成功
      if (result.status !== 0) {
        // 登录失败
        layer.msg(result.message);
      }
      // 登录成功
      localStorage.setItem("token", result.token);
      layer.msg(
        result.message,
        {
          time: 2000, //2秒关闭（如果不配置，默认是3秒）
        },
        function () {
          //do something
          location.href = "/home/dashboard.html";
        }
      );
      // console.log(result);
    },
  });
});
// 注册
$("#registered > form").on("submit", function (e) {
  // 阻止默认行为
  e.preventDefault();
  // 获取表单数据
  let data = $(this).serialize();
  // console.log(data);

  // 发送注册请求
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data,
    success: function (result) {
      // 判断是否注册成功
      if (result.status !== 0) {
        layer.msg(result.message);
      }
      // 注册成功，直接跳转到登录区域
      $(".gotologin > a").click();
      // console.log(result);
    },
  });
});
