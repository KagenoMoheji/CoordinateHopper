import {StorageFormat} from "./types";

chrome.contextMenus.create(
    {
        title: "Generate Link of Here",
        id: "CEFIwC",
        contexts: ["all"],
        onclick: info => {
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
            chrome.storage.local.get(storageFormat, (data) => {
                // ここで取得したマウス座標を活用（URIジェネレータへ引き渡し）
                console.log("==========[Storage]========");
                console.log(data.clickedInfo.clickedX);
                console.log(data.clickedInfo.clickedY);
                console.log(data.clickedInfo.currentURI);
            });
            chrome.storage.local.remove("clickedInfo");
        }
    }
);