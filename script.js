const pf = { passive: false };

const get = id => document.getElementById(id);

document.addEventListener(
  "touchstart", startTF, pf
);
document.addEventListener(
  "touchmove", moveTF, pf
);

function startTF(e) { e.preventDefault(); }
function moveTF(e) { e.preventDefault(); }

for ( let a of document.getElementsByTagName("a") ) {
  for ( let k of ["click", "touchend"] ) {
    a.addEventListener(k, function() {
      location.assign(a.href);
    });
  }
}

for ( let s of ["study", "game", "lab", "data"] ) {
  for ( let id of ["menu_" + s, s + "_back"] ) {
    for ( let k of ["click", "touchend"] ) {
      get(id).addEventListener(k, moveScene);
    }
  }
}

for ( let s of ["study", "game", "lab", "data"] ) {
  for ( let num of ["_0", "_1", "_2"] ) {
    for ( let k of ["click", "touchend"] ) {
      if ( !get(s+num) ) continue;
      get(s+num).addEventListener(k, dispHelp);
      get("over_"+s+num).addEventListener(k, dispHelp);
    }
  }
}

function moveScene(e) {
  let touch = e.changedTouches;
  let id = (touch? touch[0] : e).target.id;
  if(id.indexOf("menu_") != -1) {
    let obj = get(id.replace("menu_", "")+"_scr");
    obj.style.left = 0;
    obj.style.opacity = 1;
  } else {
    let obj = get(id.replace("_back", "")+"_scr");
    obj.style.left = "100vw";
    obj.style.opacity = 0;
  }
}
function dispHelp(e) {
  let touch = e.changedTouches;
  let id = (touch? touch[0] : e).target.id;
  if(id.indexOf("over_") == -1) {
    let over = get("over_" + id).style;
    let help = get("help_" + id).style;
    over.display = "block";
    help.pointerEvents = "auto";
    help.opacity = 1;
  } else {
    id = id.replace("over_", "");
    let over = get("over_" + id).style;
    let help = get("help_" + id).style;
    over.display = "none";
    help.pointerEvents = "none";
    help.opacity = 0;
  }
}