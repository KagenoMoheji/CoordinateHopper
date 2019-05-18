# CoordinateHopper
ID属性によるフラグメント識別子を用意できない時もこのChrome拡張でフラグメント識別子を取得します．  
When you can't get a URL with a fragment identifier from an id attribute of HTML tag, you can get it by this chrome-extension.

### Functions
1. Webサイト内で(右)クリックした位置の座標から，フラグメント識別子を付与したURLを生成する．  
You can generate a URL with a fragment identifier based a coordinate which you clicked on a web page.

2. 本アプリの入力フォームからURLを検索すると，座標フラグメント識別子を解析して1.でクリックした位置に自動でスクロールする．  
You can move web page and find the page is automatically scrolled to the location where you clicked before.

### DEMO GIF
![DEMO](https://github.com/KagenoMoheji/CoordinateHopper/blob/media/media/CoordinateHopper.gif)

### Issues
- Cannot redirect from Google home page.
- There are some web pages that can not attach a fragment identifier for example,  Google Drive.

