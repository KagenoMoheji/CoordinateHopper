// export function ChromeTabsQuery(func: () => void) {
//     chrome.tabs.query(
//         {
//             active: true,
//             currentWindow: true
//         },
//         tabs => {
//             func;
//         }
//     );
// }

export function BG2EventChromeTabsQuery(type: string, key: string, val: string) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {
            if (tabs[0].id) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                        type: type,
                        [key]: val
                    }
                );
            }
        }
    );
}

// background.ts内で使うとダメで普通にalert使う．
// eventPage→backgroundまたはTSX→backgroundのときに使う．
export function ChromeRuntimeSendMS2BG(
    type: string,
    key: string,
    val: string | { // この書き方は良くないな…．
            uri: string;
            willNewTabOpen: boolean;
        }
) {
    chrome.runtime.sendMessage(
        {
            type: type,
            [key]: val
        }
    );
}