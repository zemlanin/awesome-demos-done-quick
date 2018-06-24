module.exports.name = "Safari Timer";

module.exports.action = function() {
  const Safari = Application("Safari");
  const tabs = Safari.windows[0].tabs;
  Safari.activate();
  delay(0.5);

  let initBounds = Safari.windows[0].bounds();
  const targetBounds = {
    x: 0,
    y: 0,
    width: 300,
    height: 200
  };

  while (Math.abs(initBounds.x - targetBounds.x) > 5) {
    Safari.windows[0].bounds = initBounds = {
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
    Safari.windows[0].bounds = initBounds = {
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

  const newTab = new Safari.Tab();

  tabs.push(newTab);
  newTab.url =
    "data:text/html;base64,PGJvZHkgb25sb2FkPSIoKHQsaSxtLGUscj0oKT0+ewplPShuZXcgRGF0ZS1tKS8xZTMKZT1lPGk/ZTppCnQuZFsnc3R5bGUnXS53aWR0aD1gJHsxMDAqKGktZSkvaX0lYAplPWktZXwwCnQudC5pbm5lclRleHQ9YCR7ZS82MHwwfTpgKyhlJTYwPjk/YGA6MCkrZSU2MAplJiZzZXRUaW1lb3V0KHIsMzApCn0pPT5yKCkpKHRoaXMsMzAwLG5ldyBEYXRlKSI+CjxkaXYgc3R5bGU9aGVpZ2h0OjEwJTtiYWNrZ3JvdW5kOiMwMDAgaWQ9ZD4KPHAgc3R5bGU9ImZvbnQ6NzB2aCBmdXR1cmEiIGlkPXQ+";
  Safari.windows[0].currentTab = newTab;
  delay(0.1);
};
