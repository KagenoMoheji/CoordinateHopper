import {
    ClickedInfo, StorageFormat
} from "./types";

export class URIGenerator {
    private clickedX: number;
    private clickedY: number;
    private currentURI: string;

    constructor(data: ClickedInfo) {
        this.clickedX = data.clickedX;
        this.clickedY = data.clickedY;
        this.currentURI = data.currentURI;
    }

    private getURI(): string {
        return `${this.currentURI}#[width=${this.clickedX}&&height=${this.clickedY}]`;
    }

    async setNewURI(): Promise<void> {
        let storageFormat: StorageFormat = {
            cachedURI: {
                generatedURI: this.getURI()
            }
        };
        await chrome.storage.local.set(storageFormat);
    }
}