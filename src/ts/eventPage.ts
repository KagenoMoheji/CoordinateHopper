import {
    StorageFormat, InitClickedInfo, InitHopperInfo,
    ScrollInfo
} from "./types";
import {ChromeRuntimeSendMS2BG} from "./commons";
import { SearchHopper } from "./SearchHopper";

// コンテキストメニューのアクションを監視
document.addEventListener("contextmenu", (eve: MouseEvent) => {
    let storageFormat: StorageFormat = InitClickedInfo;
    storageFormat.clickedInfo!.clickedX = eve.pageX; // .offsetX; // .clientX
    storageFormat.clickedInfo!.clickedY = eve.pageY; // .offsetY; // .clientY
    // フラグメント識別子が既にあるなら除去したURIを格納
    let uri: string = location.href,
        hash: string = location.hash;
    storageFormat.clickedInfo!.currentURI = (uri.indexOf(hash) === -1) ? uri : uri.replace(hash, "");
    chrome.storage.local.set(storageFormat!);
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
        if (
            (hash).match(/\[width=([0-9]+)/)
            || (hash).match(/\[height=([0-9]+)/)
        ) { // 複数回呼び出される内に開いているサイトのURIがあるので，それが見つかったら
            const hopper = new SearchHopper(hash);

            let storageFormat: StorageFormat = InitHopperInfo;
            await chrome.storage.local.get(storageFormat, async (data) => {
                if (data.hopperInfo.runRedirect) { // 本アプリからのリダイレクトであるフラグが立っていたら
                    // リンク解析
                    let scrollData: ScrollInfo = hopper.getCoodinate();
                    // スクロール処理を実行
                    hopper.scroll(scrollData);
                    // マーカーの描写
                    // マーカーの位置がサイトによってズレすぎなのでとりあえずパス！！！
                    hopper.drawMarker(scrollData);

                    // リダイレクト終了にストレージクリア→複数回呼び出し防止
                    await chrome.storage.local.remove(["hopperInfo"]);
                }
            });
        }
    },
    false
);