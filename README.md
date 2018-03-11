# Typicode / Photos api consuming app

This app connects to the typicode public api and pulls all the photos. It displays them in a friendly grid list. It uses:

* [create-react-app](https://github.com/facebook/create-react-app)
* [Redux](https://redux.js.org/)
* [Blueprint](http://blueprintjs.com/docs/v2/)
* [lazysizes](https://github.com/aFarkas/lazysizes)
* [Jest](https://facebook.github.io/jest/)

## Installation

To try the application at home, clone the repo to your computer or download the zip and extract it. Open a terminal in the project directory and type:

```
npm i

npm start
```

If a browser window does not automatically open, please open a browser and navigate to `localhost:3000`.

## Testing

This application has been built using standard style and test driven development. You can run the tests supplied using the commands:

### Run Jest tests
```
npm test
```

### Run Jest coverage
```
npm run coverage
```

### Run eslint lint
```
npm run lint
```

## Approaches and tradeoffs

The goal was to make a responsive app that handled a 5000 resource REST call with no pagination appear lightning fast.

I used create react app and the blueprintjs UI library to get up and running and looking good with minimal configuration. I really enjoy the simple skeleton api of blueprintjs to suggest what data will be displayed on the page once it has been gathered.

I included lazysizes so that I could load the thumbnails in the list. Lazysizes keeps all 5000 from attempting to load at once. Instead only the visible elements load their images and the others are loaded as you scroll. Without lazy loading the images, the entire app comes crashing to a halt while it loads all 5000 thumbnails.

I used Redux to manage the state of the application. I chose to use [thunk](https://github.com/gaearon/redux-thunk) instead of [saga](https://redux-saga.js.org/) because:
*  the requirements of the application are simple,
* thunk could handle the required use cases, and
* saga applies many extra concepts including generators on top of Redux that I did not need.

I stuck with css rather than implementing a css-in-js library as the css requirements were very minor for this application. The most important piece of css was setting up the Grid.

I prefer to keep my unit tests with the elements they are testing. It keeps the app easier to navigate and maintain by keeping all files responsible for a domain together.
