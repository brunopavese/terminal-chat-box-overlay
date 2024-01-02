var chat = document.querySelector("#chat>ul");

const flagMapping = {
  broadcaster: {
    flagIcon: " ",
    flagIconColor: "rgb(254, 0, 0)",
    flagLabel: "root"
  },
  mod: {
    flagIcon: "󱢾 ",
    flagIconColor: "rgb(255, 255, 0)",
    flagLabel: "mod"
  },
  highlighted: {
    flagIcon: " ",
    flagIconColor: "rgb(0, 0, 255)",
    flagLabel: "user"
  },
  subscriber: {
    flagIcon: " ",
    flagIconColor: "rgb(255, 0, 255)",
    flagLabel: "sub"
  },
  vip: {
    flagIcon: "󰇈 ",
    flagIconColor: "rgb(0, 255, 255) ",
    flagLabel: "vip"
  },
  default: {
    flagIcon: "~",
    flagIconColor: "rgb(128, 128, 128)",
    flagLabel: "user"
  }
};

function determineFlag(flags) {
  const flagPriority = ["broadcaster", "mod", "subscriber", "vip", "highlighted"];
  for (const flag of flagPriority) {
    if (flags[flag]) {
      return flag;
    }
  }

  return "default";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const writer = async (textElement, message) => {
  for (let i = 0; i < message.length; i++) {
    textElement.textContent += message[i];
    await sleep(12);
  }
}

ComfyJS.onChat = async (user, message, flags, self, extra) => {
  var newMessage = document.createElement("li");
  var userName = document.createElement("span");
  var caracteres = document.createElement("span");
  var textMessage = document.createElement("span");

  var flag = determineFlag(flags);

  userName.innerText = `${user}@${flagMapping[flag].flagLabel}`
  userName.classList.add("user-name");

  caracteres.innerHTML = `:<span class="flag-icon">${flagMapping[flag].flagIcon}</span>$ `

  const flagColor = flagMapping[flag].flagIconColor;
  const flagColorWithOpacity = `${flagColor.slice(0, -1)}, 0.5)`;
  
  const flagIconElement = caracteres.querySelector('.flag-icon');
  flagIconElement.style.color = flagColor;
  flagIconElement.style.textShadow = `0px 0px 20px ${flagColorWithOpacity}`;
  
  
  newMessage.appendChild(userName);
  newMessage.appendChild(caracteres);
  newMessage.appendChild(textMessage);

  chat.appendChild(newMessage);

  await writer(textMessage, message);
}

ComfyJS.Init('oPaveZ');
