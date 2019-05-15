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

export function AlertChromeTabsQuery(message: string) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        tabs => {
            if (tabs[0].id) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                        type: "alert",
                        message: message
                    }
                );
            }
        }
    );
}