export function pronounceWord(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);

  // Configure speech synthesis settings
  utterance.lang = "en-US"; // Set the language (change as needed)
  utterance.volume = 1; // Set the volume (0 to 1)
  utterance.rate = 0.8; // Set the rate (0.1 to 10)
  utterance.pitch = 1; // Set the pitch (0 to 2)

  // Speak the word
  speechSynthesis.speak(utterance);
}
