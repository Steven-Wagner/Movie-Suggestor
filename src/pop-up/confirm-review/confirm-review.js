import React, {Component} from 'react';



export default class ConfirmReviewPopUp extends Component {

    handleReviewIt = () => {

        window.open(`/#/newreview/${this.props.user}/${this.props.movie}`, "_blank")
    }

    handleMaybeLater = () => {
        this.props.removeReviewPopup()
    }

    render() {
        return (
            <div className={"confirm-review-popup"}>
                <p className="popup-content">Would you like to review {this.props.movie}</p>
                <button className="remote-button" type="button" 
                    onClick={() => this.handleReviewIt()}>
                    Review It
                </button>
                <button className="remote-button" type="button" 
                    onClick={this.handleMaybeLater}>
                    Maybe Later
                </button>
            </div>
        )
    }
}