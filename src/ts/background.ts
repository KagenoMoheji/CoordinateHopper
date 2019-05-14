import {StorageFormat} from "./types";
import {URIGenerator} from "./URIGenerator";

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
                console.log("==========[Storage]========");
                console.log(data.clickedInfo.clickedX);
                console.log(data.clickedInfo.clickedY);
                console.log(data.clickedInfo.currentURI);

                // ここで取得したマウス座標を活用（URIジェネレータへ引き渡し）
                // const generator = new URIGenerator(data.clickedInfo);
            });
            chrome.storage.local.remove("clickedInfo");
        }
    }
);


interface Request {
    type: string;
    input: string;
}
chrome.runtime.onMessage.addListener((request: Request, sender, sendResponse) => {
    switch (request.type){
        case "uriInputted":
            console.log("Input: " + request.input);
            break;
    }
});
