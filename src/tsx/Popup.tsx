import * as React from "react";
import "./../styles/Popup.css";



interface SearchFormProps {}
interface SearchFormState {}
class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);
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
            </div>
        );
    }
}

export default Popup;