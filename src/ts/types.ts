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
export interface CachedURI {
    generatedURI: string;
}
export interface StorageFormat {
    clickedInfo?: ClickedInfo;
    hopperInfo?: HopperData;
    cachedURI?: CachedURI;
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
export const InitCachedURI = {
    cachedURI: {
        generatedURI: ""
    }
};

export interface ScrollInfo {
    width?: number;
    height?: number;
}


// キーボード
export const ENTER: number = 13;

