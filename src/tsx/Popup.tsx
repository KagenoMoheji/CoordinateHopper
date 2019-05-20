import * as React from "react";
import "./../styles/Popup.css";
import {ChromeRuntimeSendMS2BG} from "./../ts/commons";
import {ENTER, StorageFormat, InitCachedURI} from "./../ts/types";

interface SearchFormProps {}
interface SearchFormState {
    uriValue: string;
    willNewTabOpen: boolean;
}
class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);

        this.state = {
            uriValue: "",
            willNewTabOpen: false
        };
    }

    handleChange(eve: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({uriValue: eve.target.value});
    }
    handleCommand(eve: React.KeyboardEvent<HTMLInputElement>): void {
        if (eve.keyCode === ENTER) {
            // ボタンクリックと同じ処理をさせる
            this.handleClick();
        }
    }

    handleIconClick(eve: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
        // アイコンの色を変える(面倒なので２つの画像を使ってる)
        let icon: HTMLElement | null = document.querySelector("#newTabOpenIcon img");
        if (eve.currentTarget.checked) {
            icon!.setAttribute("src", "images/newWindowOpen_on.png");
            this.setState({willNewTabOpen: true});
        } else {
            icon!.setAttribute("src", "images/newWindowOpen_off.png");
            this.setState({willNewTabOpen: false});
        }
    }

    handleClick(): void {
        // let elm: HTMLElement | null = document.getElementById("searchForm");
        // if (elm) {
        //     let val: string | null = elm.getAttribute("value");
        //     if (val) {
        //         // chrome.runtime.sendMessage(
        //         //     {type: "uriInputted", input: val}
        //         // );
                // ChromeRuntimeSendMS2BG(
                //     "uriInputted",
                //     "input",
                //     this.state.uriValue
                // );
        //     }
        // }

        if (!this.state.uriValue) {
            ChromeRuntimeSendMS2BG(
                "alertBG",
                "message",
                "Error: Empty URI."
            );
            return;
        }
        ChromeRuntimeSendMS2BG(
            "redirect",
            "redirectInfo",
            {uri: this.state.uriValue, willNewTabOpen: this.state.willNewTabOpen}
        );
    }

    render(): JSX.Element {
        return (
            <div className="forms">
                <input
                    type="text"
                    id="searchForm"
                    value={this.state.uriValue}
                    placeholder="Input URI and click Go"
                    onChange={(eve) => {this.handleChange(eve); }}
                    onKeyDown={(eve) => {this.handleCommand(eve); }}
                ></input>
                <button
                    onClick={() => {this.handleClick(); }}
                >
                    Go
                </button>
                <label id="newTabOpenIcon">
                    <input type="checkbox" onClick={(eve) => {this.handleIconClick(eve); }} />
                    <img src="images/newWindowOpen_off.png" />
                    {/* <object type="image/svg+xml" data="images/newWindowOpen1.svg"></object> */}
                    {/*
                    【SVGファイルを扱う際のよく分からんところ．】
                    ●objectタグで入れたとして，チェックボックスとズレてしまうやん…
                    ●objectタグに対しCSSで"cursor:pointer"できないやん…
                    ●objectタグに対して色変えにくいやん…
                    →"svg > defs > style"内の".cls-1,.cls-2{fill:none;}.cls-2{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px;}"の.cls-2{stroke}を変えれば良さそうなので，"componentDidMount(){window.addEventListener('load')}"で変更すれば良い？
                    ●svgタグ使えって，訳わからんわあんなもん．グラフィックデザイナーに頼むわ
                    */}
                </label>
            </div>
        );
    }
}

interface CopyURIFormProps {}
interface CopyURIFormState {
    uriValue: string;
}
class CopyURIForm extends React.Component<CopyURIFormProps, CopyURIFormState> {
    constructor(props: CopyURIFormProps) {
        super(props);

        this.state = {
            uriValue: ""
        };
    }

    async componentDidMount(): Promise<void> {
        // コンポーネント描写後に生成URIが無いか確認．あれば表示．
        let storageFormat: StorageFormat = InitCachedURI;
        await chrome.storage.local.get(storageFormat, async (data) => {
            if (data.cachedURI) {
                this.setState({uriValue: data.cachedURI.generatedURI});
                await chrome.storage.local.remove(["cachedURI"]);
            }
        });
    }

    handleClick(): void {
        // クリップボードコピー処理
        if (!this.state.uriValue) {
            ChromeRuntimeSendMS2BG(
                "alertBG",
                "message",
                "Error: Empty URI."
            );
            return;
        }

        (document.getElementById("copyForm")! as HTMLInputElement).select();
        document.execCommand("copy");
    }

    render(): JSX.Element {
        return (
            <div className="forms">
                <input
                    type="text"
                    id="copyForm"
                    value={this.state.uriValue}
                    placeholder="Generated URI will display here"
                    readOnly
                ></input>
                <button onClick={() => {this.handleClick(); }}>Copy</button>
            </div>
        );
    }
}

interface PopupProps {
    tabs: chrome.tabs.Tab[];
}
interface PopupState {}
class Popup extends React.Component<PopupProps, PopupState> {
    constructor(props: PopupProps) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.tabs[0].id) {
            chrome.tabs.sendMessage(
                this.props.tabs[0].id,
                {type: "popupMounted"}
            );
        }
    }

    render(): JSX.Element {
        return (
            <div className="popupContainer">
                <SearchForm />
                <CopyURIForm />
            </div>
        );
    }
}

export default Popup;