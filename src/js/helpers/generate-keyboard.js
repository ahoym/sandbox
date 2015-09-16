import QwertyHancock from 'qwerty-hancock';


export default function generateQwertyHancock() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  let context = new AudioContext();
  let settings = {
    id: 'keyboard',
    width: 600,
    height: 150,
    startNote: 'A2',
    whiteNotesColour: '#fff',
    blackNotesColour: '#000',
    borderColour: '#000',
    activeColour: 'yellow',
    octaves: 2
  };
  let keyboard = new QwertyHancock(settings);
  let masterGain = context.createGain();
  let nodes = [];

  masterGain.gain.value = 0.3;
  masterGain.connect(context.destination);

  keyboard.keyDown = function (note, frequency) {
    let oscillator = context.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    oscillator.connect(masterGain);
    oscillator.start(0);
    nodes.push(oscillator);
  };
  keyboard.keyUp = function (note, frequency) {
    let newNodes = [];

    nodes.forEach((node) => {
      if (Math.round(node.frequency.value) === Math.round(frequency)) {
        node.stop(0);
        node.disconnect();
      } else {
        newNodes.push(node);
      }
    });

    nodes = newNodes;
  };

  return keyboard;
}
