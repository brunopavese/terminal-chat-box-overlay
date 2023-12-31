var chat = document.querySelector("#chat>ul");

const flagMapping = {
  broadcaster: {
    flagIcon: " ",
    flagIconColor: "#ff5555",
    flagLabel: "root"
  },
  mod: {
    flagIcon: "󱢾 ",
    flagIconColor: "#ffb86c",
    flagLabel: "mod"
  },
  highlighted: {
    flagIcon: " ",
    flagIconColor: "#f1fa8c",
    flagLabel: "user"
  },
  subscriber: {
    flagIcon: " ",
    flagIconColor: "#ff79c6",
    flagLabel: "sub"
  },
  vip: {
    flagIcon: "󰇈 ",
    flagIconColor: "#bd93f9",
    flagLabel: "vip"
  },
  default: {
    flagIcon: "~",
    flagIconColor: "#8be9fd",
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

  caracteres.querySelector('.flag-icon').style.color = flagMapping[flag].flagIconColor;

  newMessage.appendChild(userName);
  newMessage.appendChild(caracteres);
  newMessage.appendChild(textMessage);

  chat.appendChild(newMessage);

  await writer(textMessage, message);
}

ComfyJS.Init('oPaveZ');
