module.exports.name = "Safari Timer";

// https://zemlan.in/tweetimer-minification.html
// '\u{1F37B}' == '🍻'
const timerSrc = `
<body onload="((t,i,m,e,r=()=>{
e=(new Date-m)/1e3
e=e<i?e:i
t.d['style'].width=\`$\{100*(i-e)/i}%\`
e=i-e|0
t.t.innerText=e?\`$\{e/60|0}:\`+(e%60>9?'':0)+e%60:t.s0||'\\u{1F37B}'
e&&setTimeout(r,30)
})=>r())(this,300,new Date)">
<div style=height:10%;background:#000 id=d>
<p style="font:70vh futura" id=t>
`;

module.exports.action = function() {
  const Safari = Application("Safari");

  const newDoc = Safari.Document().make();
  const newWindow = Safari.windows[newDoc.name()];
  newWindow.currentTab.url = "data:text/html," + encodeURIComponent(timerSrc);
  Safari.activate();

  let initBounds = newWindow.bounds();
  const targetBounds = {
    x: 0,
    y: 0,
    width: 300,
    height: 200
  };

  while (Math.abs(initBounds.x - targetBounds.x) > 5) {
    newWindow.bounds = initBounds = {
      ...initBounds,
      x:
        initBounds.x -
        Math.sign(initBounds.x - targetBounds.x) *
          Math.sqrt(Math.abs(initBounds.x - targetBounds.x)),
      y:
        initBounds.y -
        Math.sign(initBounds.y - targetBounds.y) *
          Math.sqrt(Math.abs(initBounds.y - targetBounds.y))
    };
  }

  while (Math.abs(initBounds.width - targetBounds.width) > 5) {
    newWindow.bounds = initBounds = {
      ...initBounds,
      width:
        initBounds.width -
        Math.sign(initBounds.width - targetBounds.width) *
          Math.pow(Math.abs(initBounds.width - targetBounds.width), 0.7),
      height:
        initBounds.height -
        Math.sign(initBounds.height - targetBounds.height) *
          Math.pow(Math.abs(initBounds.height - targetBounds.height), 0.7)
    };
  }
  delay(1);
};
