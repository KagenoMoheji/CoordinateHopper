import * as React from "react";
import "./../styles/Popup.css";



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
        // 入力された値を取得して
        // リンクかを判定して
        // リダイレクトして
        // リダイレクト完了を検出したら
        // ハッシュの位置までスクロール
        let elm = document.getElementById("searchForm");
        if(elm) {
            chrome.runtime.sendMessage(
                {type: "uriInputted", input: elm.getAttribute("value")}
            );
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