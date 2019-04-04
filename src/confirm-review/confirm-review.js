import React, {Component} from 'react';



export default class ConfirmReviewPopUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hidden: false
        }
    }

    handleReviewIt = () => {
        this.props.props.history.push(`/newreview/${this.props.props.user}/${this.props.movie}`)
    }

    handleMaybeLater = () => {
        this.props.removeReviewPopup()
    }

    render() {
        return (
            <div className={"confirm-review-popup"} hidden={this.state.hidden}>
                <p>Would you like to review {this.props.movie}</p>
                <button type="button" onClick={() => this.handleReviewIt()}>Review It</button>
                <button type="button" onClick={this.handleMaybeLater}>Maybe Later</button>
            </div>
        )
    }
}