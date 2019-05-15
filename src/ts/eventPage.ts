import {StorageFormat} from "./types";
import {ChromeRuntimeSendMS2BG} from "./commons";

document.addEventListener("contextmenu", (eve: MouseEvent) => {
    let storageFormat: StorageFormat = {
        clickedInfo: {
            clickedX: 0,
            clickedY: 0,
            currentURI: ""
        }
    };
    // スクロール量も含めるためoffsetを使ってる
    storageFormat.clickedInfo!.clickedX = eve.offsetX; // eve.clientX
    storageFormat.clickedInfo!.clickedY = eve.offsetY; // eve.clientY
    // フラグメント識別子が既にあるなら除去したURIを格納
    let uri: string = location.href,
        hash: string = location.hash;
    storageFormat.clickedInfo!.currentURI = (uri.indexOf(hash) === -1) ? uri : uri.replace(hash, "");
    chrome.storage.local.set(storageFormat!);
});


// chrome.tabs.queryを受け取る
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
