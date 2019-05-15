import {StorageFormat} from "./types";
import {BG2EventChromeTabsQuery} from "./commons";
import {URIGenerator} from "./URIGenerator";

chrome.contextMenus.create(
    {
        title: "Generate Link of Here",
        id: "CEFIwC",
        contexts: ["all"],
        onclick: async (info) => {
            console.log(info);

            let uri: string = location.href;
            console.log(uri);

            let storageFormat: StorageFormat = {
                clickedInfo: {
                    clickedX: 0,
                    clickedY: 0,
                    currentURI: ""
                }
            };
            await chrome.storage.local.get(storageFormat, (data) => {
                console.log("==========[Storage]========");
                console.log(data.clickedInfo.clickedX);
                console.log(data.clickedInfo.clickedY);
                console.log(data.clickedInfo.currentURI);

                if (
                    data.clickedInfo.clickedX === 0
                    && data.clickedInfo.clickedY === 0
                    && !data.clickedInfo.currentURI
                ) {
                    alert('Failed to get coordinate.\nRetry after reloading web page.');
                } else {
                    // ここで取得したマウス座標を活用（URIジェネレータへ引き渡し）
                    // const generator = new URIGenerator(data.clickedInfo);
                    alert("yes!");
                }
            });
            await chrome.storage.local.remove("clickedInfo");
        }
    }
);


interface Request {
    type: string;
    input?: string;
    message?: string;
}
chrome.runtime.onMessage.addListener((request: Request, sender, sendResponse) => {
    switch (request.type) {
        case "uriInputted":
            if (request.input) {
                if (!request.input.match(/(http|https|ftp):\/\/.+/)) {
                    alert('Invalid input.\nInput URI "(http|https|ftp)://~".');
                    return;
                }
                BG2EventChromeTabsQuery(
                    "redirect",
                    "uri",
                    request.input
                );
            }
            break;
        case "alertBG":
            if (request.message) {
                alert(request.message);
            }
            break;
        default:
            break;
    }
});
