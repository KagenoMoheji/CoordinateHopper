import * as React from "react";
import "./../styles/Popup.css";
import {ChromeRuntimeSendMS2BG} from "./../ts/commons";
import {ENTER, StorageFormat, InitCachedURI} from "./../ts/types";

interface SearchFormProps {}
interface SearchFormState {
    uriValue: string;
}
class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);

        this.state = {
            uriValue: ""
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

    handleClick(): void {
        // 入力された値を取得して |実装済み
        // リンクかを判定して |実装済み
        // リダイレクトして |実装済み
        // リダイレクト完了を検出したら |実装済み
        // ハッシュの位置までスクロールして |実装済み
        // heightの位置一帯に横帯(または十字)の黄色マーカーみたいなのをフェードイン・フェードアウトさせる
        let elm: HTMLElement | null = document.getElementById("searchForm");
        if (elm) {
            let val: string | null = elm.getAttribute("value");
            if (val) {
                // chrome.runtime.sendMessage(
                //     {type: "uriInputted", input: val}
                // );
                ChromeRuntimeSendMS2BG(
                    "uriInputted",
                    "input",
                    val
                );
            }
        }
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
                "Empty URI."
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