export interface ClickedInfo {
    clickedX: number;
    clickedY: number;
    currentURI: string;
}
export interface CacheData {
    cachedGeneratedURIs: string[];
}
export interface StorageFormat {
    clickedInfo?: ClickedInfo;
    cacheData?: CacheData;
}


// キーボード
export const ENTER: number = 13;