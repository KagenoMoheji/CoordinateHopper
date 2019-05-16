import {StorageFormat, InitStorageFormat} from "./types";
import {ChromeRuntimeSendMS2BG} from "./commons";

// コンテキストメニューのアクションを監視
document.addEventListener("contextmenu", (eve: MouseEvent) => {
    let storageFormat: StorageFormat = InitStorageFormat;
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
            ChromeRuntimeSendMS2BG(
                "alertBG",
                "message",
                "Hello!"
            );
            break;
        // case "alert":
        //     if (request.message) {
        //         alert(request.message);
        //     }
        //     break;
        case "redirect":
            if (request.uri) {
                let scroll: string = "#<width=30&&height=140>"; /////////////////////////////////// テスト
                location.href = request.uri + scroll;
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
        // ロードが完全に完了したら


        let storageFormat: StorageFormat = InitStorageFormat;
        await chrome.storage.local.get(storageFormat, async (data) => {
            console.log("==========[Loaded]========");
            console.log("runRedirect: " + data.hopperInfo.runRedirect);

            if (data.hopperInfo.runRedirect) { // 本アプリからのリダイレクトであるフラグが立っていたら
                // スクロール処理を実行
            }
        });
    },
    false
);