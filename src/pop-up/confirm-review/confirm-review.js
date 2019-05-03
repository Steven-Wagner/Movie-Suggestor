import React, {Component} from 'react';



export default class ConfirmReviewPopUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hidden: false
        }
    }

    handleReviewIt = () => {
        // this.props.props.history.push(`/newreview/${this.props.user_id}/${this.props.movie}`)

        window.open(`/newreview/${this.props.user_id}/${this.props.movie}`, "_blank")
    }

    handleMaybeLater = () => {
        this.props.removeReviewPopup()
    }

    render() {
        return (
            <div className={"confirm-review-popup"} hidden={this.state.hidden}>
                <p>Would you like to review {this.props.movie}</p>
                <button className="remote-button" type="button" onClick={() => this.handleReviewIt()}>Review It</button>
                <button className="remote-button" type="button" onClick={this.handleMaybeLater}>Maybe Later</button>
            </div>
        )
    }
}