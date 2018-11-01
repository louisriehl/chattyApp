const chattyBot = {
  regex: new RegExp('^(chattybot\\s)', 'gi'),
  isCalling: (string) => (string.match(chattyBot.regex) !== null ? true : false),
  giveAnswer: (string) => {
    const command = chattyBot.parseString(string);
    let response = "";
    switch(command) {
      case "howdy":
      case "hi":
      case "hello":
        response = "Hello there human!";
        break;
      case "help":
        response = "No worries, human, chattybot is here! Try one of these commands:" +
        "\n chattybot hello";
        break;
      default:
        response = "I don't recognize that command!" +
        "Try typing 'chattybot help' to see what I can do!";
    }
    return response;
  },
  parseString: (command) => command.replace(chattyBot.regex, "")
};

module.exports = chattyBot;