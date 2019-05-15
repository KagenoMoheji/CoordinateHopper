import {StorageFormat} from "./types";


document.addEventListener("contextmenu", async (eve: MouseEvent) => {
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
    await chrome.storage.local.set(storageFormat!);
});


interface Request {
    type: string;
    message?: string;
}
chrome.runtime.onMessage.addListener((request: Request, sender, sendResponse) => {
    switch (request.type){
        case "popupMounted":
            console.log("eventPage notified that Popup.tsx has mounted.");
            break;
        case "alert":
            alert(request.message);
            break;
        default:
            break;
    }
});
