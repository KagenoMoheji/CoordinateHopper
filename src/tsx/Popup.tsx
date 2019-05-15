import * as React from "react";
import "./../styles/Popup.css";
import {ChromeRuntimeSendMS2BG} from "./../ts/commons";


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

    handleChange(eve: React.ChangeEvent<HTMLInputElement>) {
        this.setState({uriValue: eve.target.value});
    }

    handleClick() {
        // 入力された値を取得して |実装済み
        // リンクかを判定して |実装済み
        // リダイレクトして |実装済み
        // リダイレクト完了を検出したら |実装済み
        // ハッシュの位置までスクロールして
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

    render() {
        return (
            <div className="forms">
                <input
                    type="text"
                    id="searchForm"
                    value={this.state.uriValue}
                    placeholder="Input URI and click Go"
                    onChange={(eve) => {this.handleChange(eve); }}
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
interface CopyURIFormState {}
class CopyURIForm extends React.Component<CopyURIFormProps, CopyURIFormState> {
    constructor(props: CopyURIFormProps) {
        super(props);
    }

    handleClick() {
        // クリップボードコピー処理
    }

    render() {
        return (
            <div className="forms">
                <input type="text" id="copyForm" placeholder="Generated URI will display here" disabled></input>
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

    componentDidMount() {
        if (this.props.tabs[0].id) {
            chrome.tabs.sendMessage(
                this.props.tabs[0].id,
                {type: "popupMounted"}
            );
        }
    }

    render() {
        return (
            <div className="popupContainer">
                <SearchForm />
                <CopyURIForm />
            </div>
        );
    }
}

export default Popup;