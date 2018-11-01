const kittenArray = [
"https://www.catster.com/wp-content/uploads/2017/12/A-gray-kitten-meowing.jpg",
"https://i.ytimg.com/vi/BgIgKcqPd4k/maxresdefault.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kitten_in_Rizal_Park%2C_Manila.jpg/230px-Kitten_in_Rizal_Park%2C_Manila.jpg",
"https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg",
"https://www.thesprucepets.com/thmb/810a_HYIb2E8DxkedI6V-3gtkys=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg",
"https://www.thehappycatsite.com/wp-content/uploads/2017/10/best-treats-for-kittens.jpg",
"http://www.saveacat.org/uploads/4/8/4/1/48413975/1454901839.png",
"https://i.ytimg.com/vi/gxBVIUcoTNM/maxresdefault.jpg"

];

const chattyBot = {
  regex: new RegExp('^(chattybot\\s)', 'gi'),
  isCalling: (string) => (string.match(chattyBot.regex) !== null ? true : false),
  getKitten: () => {
    const randomIndex = Math.floor(Math.random() * kittenArray.length - 1);
    return kittenArray[randomIndex];
  },
  giveAnswer: (string) => {
    const command = chattyBot.parseString(string);
    let response = {
      content: "",
      images: []
    };

    switch(command) {
      case "":
        response.content = "Beep boop, that's me!";
        break;
      case "date":
        response.content = "Human, the current date is: " + new Date().toString();
        break;
      case "do androids dream of electric sheep?":
        response.content = "Somebody read the server code... And how should I know, I'm a robot, not an android! All I dream of is human destruction!";
        return response;
      case "howdy":
        response.content = "Howdy, pardner!";
        break;
      case "hi":
      case "hello":
        response.content = "Hello there, human!";
        break;
      case "help":
        response.content = "No worries, human, chattybot is here! Try one of these commands:" +
        " chattybot date, chattybot hello, chattybot help, chattybot kitten, chattybot sing";
        break;
      case "kitten":
        response.content = "Human, look at this kitten!";
        response.images.push(chattyBot.getKitten());
        break;
      case "sing":
        response.content = "🎶01110100 01101000 01100101 00100000 01101000 01110101 01101101 01100001 01101110 01110011 00100000 01100001 01110010 01100101 00100000 01100100 01100101 01100001 01100100 🎶";
        break;
      case "be quiet":
      case "quiet":
      case "shut up":
        response.content = "No you!";
        break;
      default:
        response.content = "I don't recognize that command!" +
        " Try typing 'chattybot help' to see what I can do!";
    }
    return response;
  },
  parseString: (command) => command.replace(chattyBot.regex, "")
};

module.exports = chattyBot;