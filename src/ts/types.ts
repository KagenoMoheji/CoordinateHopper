export interface ClickedInfo {
    clickedX: number;
    clickedY: number;
    currentURI: string;
}
export interface HopperData {
    runRedirect: boolean;
}
export interface StorageFormat {
    clickedInfo: ClickedInfo;
    hopperInfo: HopperData;
}
export const InitStorageFormat: StorageFormat = {
    clickedInfo: {
        clickedX: 0,
        clickedY: 0,
        currentURI: ""
    },
    hopperInfo: {
        runRedirect: false
    }
};


// キーボード
export const ENTER: number = 13;

