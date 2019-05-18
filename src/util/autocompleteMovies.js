import React, { Component, Fragment } from "react";
import autoCompleteService from "./autocompleteMovies-service";

class Autocomplete extends Component {

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      suggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: this.props.currentInput
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const userInput = e.currentTarget.value;

    this.props.component.addToTitleInput(userInput)

    this.setState({
        userInput: userInput
    })

    if (userInput) {

        autoCompleteService.fetchAutoCompleteMovieSuggestions(userInput)
        //returns up to 6 movie titles with images
        .then(suggestions => {

            // Update the user input and filtered suggestions, reset the active
            // suggestion and make sure the suggestions are shown

            this.setState({
            activeSuggestion: 0,
            suggestions,
            showSuggestions: true,
            userInput: userInput
            });
        })
        .catch(error => {
            console.log(error)
        })
    }
    else {
        this.setState({
            userInput: userInput
        })
    }
  };

  // Event fired when the user clicks on a suggestion
  onClick = title => {
    // Update the user input and reset the rest of the state
    this.props.component.addToTitleInput(title)

    this.setState({
      activeSuggestion: 0,
      suggestions: [],
      showSuggestions: false,
      userInput: title
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, suggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
        e.preventDefault();

        this.props.component.addToTitleInput(suggestions[activeSuggestion].title)

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: suggestions[activeSuggestion].title
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === suggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        suggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (suggestions.length) {
        suggestionsListComponent = (
         <div className="title-suggestions">
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion.title}
                  onClick={() => onClick(suggestion.title)}
                >
                <img className="title-suggest-img" src={suggestion.img} alt={`Poster of ${suggestion.title}`}/>
                {suggestion.title}
                </li>
              );
            })}
          </ul>
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={this.props.currentInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;