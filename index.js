let wpm = document.getElementById("wpm");
let cpm = document.getElementById("cpm");
let accuracy = document.getElementById("accuracy");
let error_text = document.getElementById("error");
let current_time = document.getElementById("time");
let task = document.getElementById("task");
let input_area = document.getElementById("inputarea");
let restart =document.getElementById("restart");

const TIME_LIMIT=60;
let text = "about|above|add|after|again|air|all|almost|along|also|always|America|an|and|animal|another|answer|any|are|around|as|ask|at|away|back|be|because|been|before|began|begin|being|below|between|big|book|both|boy|but|by|call|came|can|car|carry|change|children|city|close|come|could|country|cut|day|did|different|do|does|don't|down|each|earth|eat|end|enough|even|every|example|eye|face|family|far|father|feet|few|find|first|follow|food|for|form|found|four|from|get|girl|give|go|good|got|great|group|grow|had|hand|hard|has|have|he|head|hear|help|her|here|high|him|his|home|house|how|idea|if|important|in|Indian|into|is|it|its|it's|just|keep|kind|know|land|large|last|later|learn|leave|left|let|letter|life|light|like|line|list|little|live|long|look|made|make|man|many|may|me|mean|men|might|mile|miss|more|most|mother|mountain|move|much|must|my|name|near|need|never|new|next|night|no|not|now|number|of|off|often|oil|old|on|once|one|only|open|or|other|our|out|over|own|page|paper|part|people|picture|place|plant|play|point|put|question|quick|quickly|quite|read|really|right|river|run|said|same|saw|say|school|sea|second|see|seem|sentence|set|she|should|show|side|small|so|some|something|sometimes|song|soon|sound|spell|start|state|still|stop|story|study|such|take|talk|tell|than|that|the|their|them|then|there|these|they|thing|think|this|those|thought|three|through|time|to|together|too|took|tree|try|turn|two|under|until|up|us|use|very|walk|want|was|watch|water|way|we|well|went|were|what|when|where|which|while|white|who|why|will|with|without|word|work|world|would|write|year|you|young|your";
text=text.split('|');
// console.log(text);

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracyScore = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    task.textContent = null;
    current_quote = text[quoteNo];

    current_quote.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char
      task.appendChild(charSpan)
    //   console.log(task.textContent);
    })

    if (quoteNo < text.length - 1)
      quoteNo++;
    else
      quoteNo = 0;
}

function processCurrentText() {
    curr_input = input_area.value;
    // console.log(curr_input);
    curr_input_array = curr_input.split('');
  
    characterTyped++;
  
    errors = 0;
  
    quoteSpanArray = task.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
      let typedChar = curr_input_array[index]
  
      if (typedChar == null) {
        char.classList.remove('correct_char');
        char.classList.remove('incorrect_char');
  
      } else if (typedChar === char.innerText) {
        char.classList.add('correct_char');
        char.classList.remove('incorrect_char');
  
      } else {
        char.classList.add('incorrect_char');
        char.classList.remove('correct_char');
  
        errors++;
      }
    });
  
    error_text.textContent = total_errors + errors;
  
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    // console.log(Math.round(accuracyVal));
    accuracy.textContent = Math.round(accuracyVal);
    // console.log("characterTyped:",characterTyped);
    // console.log("correctCharacters:",correctCharacters);
    // console.log("accuracy:",  (correctCharacters / characterTyped)*100);
  
    if (curr_input.length == current_quote.length) {
      updateQuote();
      total_errors += errors; 
      input_area.value = "";
    }
  }

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracyScore = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;
  
    input_area.value = "";
    task.textContent = 'Click on the area below to start the game.';
    accuracy.textContent = 0;
    current_time.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart.style.display = "none";
    cpm.style.display = "none";
    wpm.style.display = "none";
  }
  
  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timeElapsed++;
  
      current_time.textContent = timeLeft + "s";
    }
    else {
      finishGame();
    }
  }
  function finishGame() {
    clearInterval(timer);
  
    input_area.disabled = true;
  
    task.textContent = "Click on restart to start a new game.";
  
    restart.style.display = "block";
  
    cpm_val = Math.round(((characterTyped / timeElapsed) * 60));
    wpm_val = Math.round((((characterTyped / 5) / timeElapsed) * 60));
  
    cpm.textContent = cpm_val;
    wpm.textContent = wpm_val;
  
    cpm.style.display = "block";
    wpm.style.display = "block";
  }
  
  function startGame() {

    resetValues();
    updateQuote();
  
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }