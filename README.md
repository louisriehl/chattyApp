# ChattyApp

Chatty App is a single page live chat application! Set your username, post image urls, and even give commands to the chatbot! Anyone can join the server and start chatting straightaway.

Focusing on a clean and simple UI, the app is designed to be lightweight and intuitive to use.

## Screenshots

![interact with chattybot](https://github.com/louisriehl/chattyApp/blob/master/build/chattybot.png?raw=true)
![chat with other users](https://github.com/louisriehl/chattyApp/blob/master/build/chattybot_images.png?raw=true)
![chatty bot features](https://github.com/louisriehl/chattyApp/blob/master/build/chattybot_images.png?raw=true)

## Features

* Chat with several people at once with WebSockets
* Change your username on the fly
* Server notifications when users connect/disconnect/change their username
* A chatbot with several commands
* A sleek, intuitive interface

## Getting Started
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the npm install command.
3. In one terminal, run `npm start` from the root directory of the project to start the react server
4. In another terminal window, navigate to `chatty_server/` and run `npm start` again to start the websocket server.
5. Go to `http://localhost:3000/` and start chatting! Don't forget that you can open several tabs to simulate multiple users.

### Dependencies

* react
* react-dom
* babel-core
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* babel-loader
* webpack
* webpack-dev-server

-- For the WebSocket Server

* ws
* express
* uuid
* randomcolor
