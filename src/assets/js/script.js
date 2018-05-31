$(document).ready(function () {
  $(".pagination > li").on("click", function () {
    $(".pagination > li.active").removeClass("active");
    $(this).addClass("active");
  });
});
