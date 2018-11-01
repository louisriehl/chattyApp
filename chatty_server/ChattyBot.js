const chattyBot = {
  regex: new RegExp('^(chattybot\\s)', 'gi'),
  isCalling: (string) => (string.match(chattyBot.regex) !== null ? true : false),
  giveAnswer: (string) => {
    const command = chattyBot.parseString(string);
    let response = "";
    switch(command) {
      case "hello":
        response = "Hello there human!";
        break;
      default:
        response = "I don't recognize that command!";
    }
    return response;
  },
  parseString: (command) => command.replace(chattyBot.regex, "")
};

console.log(chattyBot.regex);
console.log(chattyBot.isCalling('chattybotsays hi!'));
console.log(chattyBot.giveAnswer("chattybot hello"));