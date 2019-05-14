import {ClickedInfo} from "./types";

export class URIGenerator {
    private clickedX: number;
    private clickedY: number;
    private currentURI: string;

    constructor(data: ClickedInfo) {
        this.clickedX = data.clickedX;
        this.clickedY = data.clickedY;
        this.currentURI = data.currentURI;
    }
}