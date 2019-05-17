export interface ClickedInfo {
    clickedX: number;
    clickedY: number;
    currentURI: string;
}
export interface HopperData {
    // frameやimgとかがあるたびにリダイレクト後の
    // window.addEventListener("load")が複数回
    // 呼び出されてしまうのでその防止
    runRedirect: boolean;
}
export interface StorageFormat {
    clickedInfo?: ClickedInfo;
    hopperInfo?: HopperData;
}
// export const InitStorageFormat: StorageFormat = {
//     clickedInfo: {
//         clickedX: 0,
//         clickedY: 0,
//         currentURI: ""
//     },
//     hopperInfo: {
//         runRedirect: false
//     }
// };
export const InitClickedInfo = {
    clickedInfo: {
        clickedX: 0,
        clickedY: 0,
        currentURI: ""
    }
};
export const InitHopperInfo = {
    hopperInfo: {
        runRedirect: false
    }
};


// キーボード
export const ENTER: number = 13;

