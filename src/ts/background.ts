import {StorageFormat, InitStorageFormat} from "./types";
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

            let storageFormat: StorageFormat = InitStorageFormat;
            await chrome.storage.local.get(storageFormat, (data) => {
                console.log("==========[BeforeGenerate]========");
                console.log("clickedX: " + data.clickedInfo.clickedX);
                console.log("clickedY: " + data.clickedInfo.clickedY);
                console.log("currentURI: " + data.clickedInfo.currentURI);

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


// chrome.runtime.sendMessageを受け取る
interface Request {
    type: string;
    input?: string;
    message?: string;
}
chrome.runtime.onMessage.addListener(async (request: Request, sender, sendResponse) => {
    switch (request.type) {
        case "uriInputted":
            if (request.input) {
                if (!request.input.match(/(http|https|ftp):\/\/.+/)) {
                    alert('Invalid input.\nInput URI "(http|https|ftp)://~".');
                    return;
                }

                // 本アプリによるリダイレクトであるフラグを立てる
                let storageFormat: StorageFormat = InitStorageFormat;
                await chrome.storage.local.get(storageFormat, async (data) => {
                    console.log("==========[BeforeRedirect]========");
                    console.log("runRedirect: " + data.hopperInfo.runRedirect);

                    if (!data.hopperInfo.runRedirect) {
                        // onLoadedとrunRedirectのみ更新
                        storageFormat = {
                            ...data.clickedInfo,
                            hopperInfo: {
                                onLoaded: true, // リダイレクト前にフラグ立て
                                runRedirect: true
                            }
                        };
                        await chrome.storage.local.set(storageFormat);
                    }
                });

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
