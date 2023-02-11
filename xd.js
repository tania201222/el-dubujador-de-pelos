function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
  }

function predload(){
classier=ml5.imageClassier("DoodleNet");
}

function clearCanvas(){

    background("white");
}

function draw() {

  // Establece stroke weight en 13
  strokeWeight(13);
  // Establece stroke color a black
  stroke(0);
  // Si es mouse está presionado, dibuja una línea entre la posición anterior y actual del mouse
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}


function classifyCanvas(){
classifier.classify(canvas, gotResult);

}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  document.getElementById('label').innerHTML = 'Etiqueta: ' + results[0].label;

  document.getElementById('confidence').innerHTML = 'Precisión: ' + Math.round(results[0].confidence * 100) + '%';

  utterThis = new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterThis);
}
