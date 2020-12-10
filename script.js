const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/migara.PNG',
    text: "This is Migara Raveen"
  },
  {
    image: './img/bryan.PNG',
    text: "This is Bryan De Silva"
  },
  {
    image: './img/sandro.PNG',
    text: "This is Sandro Perera"
  },
  {
    image: './img/munaj.PNG',
    text: "This is Nikie Munaj"
  },
  {
    image: './img/roshan.PNG',
    text: "This is Murugan Roshan"
  },
  {
    image: './img/sahasra.PNG',
    text: "This is Sahasra Pansilu"
  },
  {
    image: './img/aadhil.PNG',
    text: "This is Aadhil Hilmy"
  },
  {
    image: './img/akash1.PNG',
    text: "This is Akash Walker"
  },
  {
    image: './img/azmi.PNG',
    text: 'This is Azmi Kamil'
  },
  {
    image: './img/gimna.png',
    text: 'This is Gimna'
  },
  {
    image: './img/seneka.PNG',
    text: 'This is Seneka Monali'
  },
  {
    image: './img/sahassrika.PNG',
    text: 'This is Sahassrika '
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');
  
    const { image, text } = item;
  
    box.classList.add('box');
  
    box.innerHTML = `
      <img src="${image}" alt="${text}" />
      <p class="info">${text}</p>
    `;
    
    //speak event
    box.addEventListener('click',() =>{
        setTextMessage(text);
        speakText();

        //Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'),800)
    })
  
    main.appendChild(box);
  }

  //Init speech Synth
  const message = new SpeechSynthesisUtterance();


  //Store Voices
  let voices = [];

  function getVoices(){
      voices = speechSynthesis.getVoices();
      
      voices.forEach(voice =>{
          const option = document.createElement('option');

          option.value = voice.name;
          option.innerText = `${voice.name} ${voice.lang}`;

          voicesSelect.appendChild(option)
      })
  }

  //Set text
  function setTextMessage(text){
    message.text = text;
  }

  //Speech text
  function speakText(){
      speechSynthesis.speak(message)
  }

  //Voice Changed 
  function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value)
  }

  //Voices changed
  speechSynthesis.addEventListener('voiceschanged',getVoices);
  
  //toggleBtn
  toggleBtn.addEventListener('click',() => document.getElementById('text-box').classList.toggle('show'));

  //Close btn
  closeBtn.addEventListener('click',() => document.getElementById('text-box').classList.remove('show'));

  //Change voice
  voicesSelect.addEventListener('change',setVoice);

  //Read Text button
  readBtn.addEventListener('click',() => {
      setTextMessage(textarea.value);
      speakText();
  })

  //Init 
  getVoices();