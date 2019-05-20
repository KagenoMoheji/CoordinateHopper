import {
    StorageFormat, InitClickedInfo, InitHopperInfo
} from "./types";
import {BG2EventChromeTabsQuery} from "./commons";
import {URIGenerator} from "./URIGenerator";

chrome.contextMenus.create(
    {
        title: "Generate Link of Here",
        id: "CEFIwC",
        contexts: ["all"],
        onclick: async (info) => {
            let storageFormat: StorageFormat = InitClickedInfo;
            await chrome.storage.local.get(storageFormat, (data) => {
                console.log(`(x, y): (${data.clickedInfo.clickedX}, ${data.clickedInfo.clickedY})`);
                console.log(`currentURI: ${data.clickedInfo.currentURI}`);

                if (
                    data.clickedInfo.clickedX === 0
                    && data.clickedInfo.clickedY === 0
                    && !data.clickedInfo.currentURI
                ) {
                    alert('Error: Failed in getting coordinate.\n          Try again after reloading web page.');
                } else {
                    // Popup.tsxに生成したURIを渡す
                    const generator = new URIGenerator(data.clickedInfo);
                    generator.setNewURI();
                }
            });
            await chrome.storage.local.remove(["clickedInfo"]);
        }
    }
);


// chrome.runtime.sendMessageを受け取る
interface Request {
    type: string;
    redirectInfo?: {
        uri: string;
        willNewTabOpen: boolean;
    };
    message?: string;
}
chrome.runtime.onMessage.addListener(async (request: Request, sender, sendResponse) => {
    switch (request.type) {
        case "redirect":
            if (request.redirectInfo) {
                if (!request.redirectInfo.uri.match(/(http|https|ftp):\/\/.+/)) {
                    alert('Error: Invalid input.\n          Input URI "(http|https|ftp)://~".');
                    return;
                }

                // 本アプリによるリダイレクトであるフラグを立てる
                let storageFormat: StorageFormat = InitHopperInfo;
                await chrome.storage.local.get(storageFormat, async (data) => {
                    if (!data.hopperInfo.runRedirect) {
                        // onLoadedとrunRedirectのみ更新
                        storageFormat = {
                            hopperInfo: {
                                runRedirect: true // リダイレクト前にフラグ立て
                            }
                        };
                        await chrome.storage.local.set(storageFormat);
                    }
                });

                // BG2EventChromeTabsQuery(
                //     "redirect",
                //     "uri",
                //     request.input
                // );
                if (!request.redirectInfo.willNewTabOpen) {
                    chrome.tabs.update({url: request.redirectInfo.uri}); // アクティブにしているタブを更新
                } else {
                    chrome.tabs.create({url: request.redirectInfo.uri}); // 新しくタブを作成
                }
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
