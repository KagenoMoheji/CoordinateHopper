interface ClickedInfo {
    clickedX: number;
    clickedY: number;
    currentURI: string;
}
interface CacheData {
    cachedGeneratedURIs: string[];
}
export interface StorageFormat {
    clickedInfo?: ClickedInfo;
    cacheData?: CacheData;
}