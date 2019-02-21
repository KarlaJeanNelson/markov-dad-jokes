This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## mark-HA-ov Dad Joke Generator
Generate hilarious dad jokes using [Markov chains](https://en.wikipedia.org/wiki/Markov_chain)! The generator is seeded with jokes fetched from the wonderful and illustrious [icanhazdadjoke API](https://icanhazdadjoke.com/api), which are saved to a MongoDB database.

## Getting Started

### Prerequisites
To run locally, the following applications must be installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/download-center/community)

### Local Installation
Follow these steps to dadjoke heaven:
1. Clone this GitHub repo in the directory of your choice (`git clone https://github.com/KarlaJeanNelson/markov-dad-jokes.git` or `git clone git@github.com:KarlaJeanNelson/markov-dad-jokes.git`).
2. Navigate into the cloned directory (`cd markov-dad-jokes`).
3. Install dependencies (`npm install` or `yarn`).
4. Make sure mongo is running on your device.
5. Almost there! Back in your terminal, type `npm run server` or `yarn run server` (depending on which package manager you used to install dependencies).
6. Open another terminal (and `cd` to your `markov-dad-joke` directory). Type `npm run client` or `yarn run client`.
7. The app should open in a browser window (localhost:3000).
