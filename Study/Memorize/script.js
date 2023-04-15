let flg = false

$.each($("span"), (index, value) => {
  let s = $(value)
  s.on("click", e => {
    s.css("background-color", flg? "#15202B":"white")
    setTimeout(() => {s.css("background-color", flg? "#D88":"red")}, s.text().length*300+500)
  })
})

$(() => {
  let topBtn = $("#pageTop")
  let darkBtn = $("#pageDark")
  topBtn.hide()

  $(window).scroll(() => {
    if ($(this).scrollTop() > 80) topBtn.fadeIn()
    else topBtn.fadeOut()
  })

  topBtn.click(e => {
    $("body, html").animate({"scrollTop": 0}, 500)
    return false
  })

  darkBtn.click(e => {
    flg = flg? false : true
    $("body, html").css("background-color", flg? "#15202B":"white")
    $("body, html").css("color", flg? "#FEFFFE":"black")
    $("#table").css("background-color", flg? "#679":"#DEF")
    $("#replaces").css("background-color", flg? "#966":"#FCC")
    $("span").css("background-color", flg? "#D88":"red")
    $("span").css("color", flg? "#D88":"red")
    return false
  })
})

