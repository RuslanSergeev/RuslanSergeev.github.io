function menu_enter(event) {
  this.style.backgroundColor="#4CAF50";
}

function menu_leave(event) {
  this.style.backgroundColor="#444";
}

function tit_enter(event) {
  this.style.backgroundColor = "#444";
  var main_area = document.querySelector('.mn');
  main_area.innerHTML = loadPage("tasks/subwords.html");;
  // this.innerHTML = loadPage('tasks/subwords.html');
}

function tit_leave(event) {
  this.style.backgroundColor = "#111";
}

var menu_btns = document.querySelectorAll(".had > a");
for (var i = 0; i < menu_btns.length; i++) {
    menu_btns[i].onmouseenter = menu_enter;
}

for (var i = 0; i < menu_btns.length; i++) {
    menu_btns[i].onmouseleave = menu_leave;
}

var titles = document.querySelectorAll(".title");
for (var i = 0; i < titles.length; i++) {
    titles[i].onmouseenter = tit_enter;
}

for (var i = 0; i < titles.length; i++) {
    titles[i].onmouseleave = tit_leave;
}
