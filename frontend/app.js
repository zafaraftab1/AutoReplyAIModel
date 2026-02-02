async function sendMessage() {
  let input = document.getElementById("userInput");
  let message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("Typing...", "bot");

  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();

    removeLastBotMessage();

    if (data.reply) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("Error: " + data.error, "bot");
    }

  } catch (err) {
    removeLastBotMessage();
    addMessage("Server error: " + err.message, "bot");
  }
}

function addMessage(text, sender) {
  let chatBox = document.getElementById("chatBox");

  let msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLastBotMessage() {
  let chatBox = document.getElementById("chatBox");
  let messages = chatBox.getElementsByClassName("bot");
  if (messages.length > 0) {
    messages[messages.length - 1].remove();
  }
}