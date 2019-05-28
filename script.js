
const socket = io();

// Invoking SpeechRecognition instance
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Set language and only allow 
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Initialize SpeechRegonition upon button click
document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

// Use result event to retrieve what the user said
recognition.addEventListener('result', (event) => {
  let last = event.results.length - 1
  let text = event.results[last][0].transcript;

  console.log('Confidence: ' + event.results[0][0].confidence);
  socket.emit('chat message', text);
});

recognition.addEventListener('speechend', () => {
	recognition.stop();
});

// Give the chatbot a voice
function synthVoice(text) {
	const synth = window.speechSynthesis;
	const utterance = new SpeechSynthesisUtterance();
	utterance.text = text;
	synth.speak(utterance);
}

// Retrieve response from server and invoke response
socket.on('bot reply', function(replyText) {
	synthVoice(replyText);
});
