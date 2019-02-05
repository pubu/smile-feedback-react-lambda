import React, { Component } from 'react';
import Footer from '../../organisms/Footer';
import Header from '../../organisms/Header';
import { Redirect } from 'react-router';
import './index.css';

class VoteForm extends Component {
  constructor(props) {
    super(props);
    
    const { token } = this.props.match.params

    let voteData = localStorage.getItem('fC-data-vote');

    let canVote = false;
    if(token){
      canVote = true;
    }

    if(token && voteData){
      let voteDataObj = JSON.parse(voteData);
      let voteItem = voteDataObj[token];

      if(voteItem){
        canVote = false;
      }
    }
    


    this.state = {
      loading: false,
      canVote: canVote, 
      voteValue:null,
      token: token
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = val => e => {
    e.preventDefault();
    this.setState({ loading: true, voteValue: val}); 
    /* send to service */
    let baseUrl = "https://vps11954.alfahosting-vps.de/"
    fetch(baseUrl + "vote", {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: this.state.token, vote: val})
    }
    )
    .then(response => response.json())
    .then(json => { 
      // save data
      let voteData = localStorage.getItem('fC-data-vote') || "{}";
      voteData = JSON.parse(voteData);
      voteData[this.state.token] = {
        voteValue:this.state.voteValue, 
      }

      localStorage.setItem('fC-data-vote', JSON.stringify(voteData));
      this.setState({ loading: false, canVote: false}); 
    });
  }

  render() {
    const { loading, canVote} = this.state;

    if (loading){
      return (
          <p>bitte warten</p>
      );
    }else if(canVote){
      return (
        <div className="row">
            <div className="col s12 l6 offset-l3 vote-link-wrapper">
            <a className="vote-link" onClick={this.handleItemClick(5)}><i className="large material-icons">sentiment_very_satisfied</i></a>
            <a className="vote-link" onClick={this.handleItemClick(4)}><i className="large material-icons">sentiment_satisfied</i></a>
            <a className="vote-link" onClick={this.handleItemClick(3)}><i className="large material-icons">sentiment_neutral</i></a>
            <a className="vote-link" onClick={this.handleItemClick(2)}><i className="large material-icons">sentiment_dissatisfied</i></a>
            <a className="vote-link" onClick={this.handleItemClick(1)}><i className="large material-icons">sentiment_very_dissatisfied</i></a>
            </div>
        </div>
      );
    }else if (!this.state.token){
      return <Redirect to={{
          pathname: "/"
        }}
      />
    }else{
      return (
        <div className="">
          <h1>Vielen Dank!</h1>
          <p>Dein Feedback wurde erfolgreich übertragen.</p>
        </div>
      );
    }
  }
}

class VotePage extends Component {
  render() {
    return (
      <div>
      <Header />
      <div className="VotePage row">
        <div className="col s12 l6 offset-l3">
          <VoteForm {...this.props} />
        </div>
      </div>
      <Footer />
      </div>
    );
  }
}

export default VotePage