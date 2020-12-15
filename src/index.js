import React, { Component } from "react";
import ReactDOM from "react-dom";
import card from "./cards.json";

import "./styles.css";
import Card from "./components/card";

class App extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    let cards = [...card.cards];

    let randomIds = [...Array(cards.length / 2).keys()]
      .map(k => k + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    cards = cards.filter(c => randomIds.includes(c.id));
    cards.forEach(card => (card.show = true));
    cards.sort(() => Math.random() - 0.5);
    this.state = {
      canplay: true,
      opencards: [],
      cards,
      time: 0
    };
    setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
  }

  reset() {
    let cards = [...card.cards];

    let randomIds = [...Array(cards.length / 2).keys()]
      .map(k => k + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    cards = cards.filter(c => randomIds.includes(c.id));
    cards.forEach(card => (card.show = true));
    cards.sort(() => Math.random() - 0.5);
    this.setState({
      canplay: true,
      opencards: [],
      cards,
      time: 0
    });
  }

  render() {
    return (
      <div className="App">
        <h1>משחק זיכרון על בריאת העולם</h1>
        <p>מגישים: עמית נווה, דן בן נון, שגיא לוי, עידן שמי</p>

        <h2>זמן: {this.state.time}</h2>

        <button onClick={this.reset}>איפוס</button>
        <div className="cards">
          {this.state.cards.map((card, i) => (
            <Card
              text={card.text}
              key={i}
              show={card.show}
              open={this.state.opencards.includes(i)}
              onclick={() => {
                if (!this.state.canplay) return;
                if (this.state.opencards.includes(i)) return;
                let opencards = [...this.state.opencards, i];
                let cards = [...this.state.cards];
                this.setState({ opencards });
                if (opencards.length === 2) {
                  this.setState({ canplay: false });
                  setTimeout(() => {
                    let card1 = cards[opencards[0]];
                    let card2 = cards[opencards[1]];
                    if (card1.id === card2.id) {
                      card1.show = false;
                      card2.show = false;
                      this.setState({ cards });
                    }
                    this.setState({ opencards: [], canplay: true });
                  }, 1000);
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
