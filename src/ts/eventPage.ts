import {
    StorageFormat, InitClickedInfo, InitHopperInfo
} from "./types";
import {ChromeRuntimeSendMS2BG} from "./commons";

// コンテキストメニューのアクションを監視
document.addEventListener("contextmenu", (eve: MouseEvent) => {
    let storageFormat: StorageFormat = InitClickedInfo;
    // スクロール量も含めるためoffsetを使ってる
    storageFormat.clickedInfo!.clickedX = eve.offsetX; // eve.clientX
    storageFormat.clickedInfo!.clickedY = eve.offsetY; // eve.clientY
    // フラグメント識別子が既にあるなら除去したURIを格納
    let uri: string = location.href,
        hash: string = location.hash;
    storageFormat.clickedInfo!.currentURI = (uri.indexOf(hash) === -1) ? uri : uri.replace(hash, "");
    chrome.storage.local.set(storageFormat);
});


// chrome.tabs.queryを受け取る→アクティブタブへの加工
interface Request {
    type: string;
    message?: string;
    uri?: string;
}
chrome.runtime.onMessage.addListener((request: Request, sender, sendResponse) => {
    switch (request.type) {
        case "popupMounted":
            console.log("eventPage notified that Popup.tsx has mounted.");
            break;
        // case "alert":
        //     if (request.message) {
        //         alert(request.message);
        //     }
        //     break;
        case "redirect":
            if (request.uri) {
                location.href = request.uri;
            } else {
                ChromeRuntimeSendMS2BG(
                    "alertBG",
                    "message",
                    "Error: Empty URI."
                );
            }
            break;
        default:
            break;
    }
});


// ウィンドウ読み込みを監視
window.addEventListener(
    "load",
    async () => {
        let hash: string = location.hash;
        if ((hash).match(/\[width=([0-9]+)/) || (hash).match(/\[height=([0-9]+)/)){ // 複数回呼び出される内に開いているサイトのURIがあるので，それが見つかったら
            let storageFormat: StorageFormat = InitHopperInfo;
            await chrome.storage.local.get(storageFormat, async (data) => {
                if (data.hopperInfo.runRedirect) { // 本アプリからのリダイレクトであるフラグが立っていたら
                    // リンク解析
                    let scrollData: {width?: number; height?: number} = {};
                    switch (true) {
                        case /\[width=([0-9]+)&&height=([0-9]+)\]/.test(hash):
                        case /\[height=([0-9]+)&&width=([0-9]+)\]/.test(hash):
                            let splittedHash: string[] = hash.split("&&");
                            if (splittedHash[0].match(/width/)) {
                                scrollData = {
                                    width: parseInt(splittedHash[0].replace(/[^0-9]/g, ""), 10),
                                    height: parseInt(splittedHash[1].replace(/[^0-9]/g, ""), 10)
                                };
                            } else {
                                scrollData = {
                                    width: parseInt(splittedHash[1].replace(/[^0-9]/g, ""), 10),
                                    height: parseInt(splittedHash[0].replace(/[^0-9]/g, ""), 10)
                                };
                            }
                            break;
                        case /\[height=([0-9]+)\]/.test(hash):
                            scrollData.height = parseInt(hash.replace(/[^0-9]/g, ""), 10);
                            break;
                        case /\[width=([0-9]+)\]/.test(hash):
                            scrollData.width = parseInt(hash.replace(/[^0-9]/g, ""), 10);
                            break;
                        default:
                            break;
                    }

                    // スクロール処理を実行
                    window.scrollTo(0, scrollData.height!);
                    // マーカーの描写
                    // switch (Object.keys(scrollData).length) {
                    //     case 2:
                    //         // 縦横十字
                    //     case 1:
                    //         // 横だけ
                    //     default:
                    //         break;
                    // }

                    // リダイレクト終了にストレージクリア→複数回呼び出し防止
                    await chrome.storage.local.remove(["hopperInfo"]);
                }
            });
        }
    },
    false
);