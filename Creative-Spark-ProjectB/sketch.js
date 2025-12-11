let mic;
let slider;
let fft;
let bands, bandsw;

function setup() {
  let cnv = createCanvas(500, 500);
  mic = new p5.AudioIn();
  mic.start();

  bands = 16;
  fft = new p5.FFT(0.8, bands);

  // set the input source to the mic
  fft.setInput(mic);

  // largura dos rects de bandas
  bandsw = width / bands;
}

function draw() {
  background(220);
  // display the FFT analysis
  showFFT();
}

function showFFT() {
  // esta análise de FFT usa as bandas do objeto
  let spectrum = fft.analyze();
  console.log(spectrum);

  // outra abordagem possível
  //let waveform = fft.waveform(32);

  // mostrar todas as bandas do FFT
  noStroke();
  fill(255, 100);

  for (let i = 0; i < spectrum.length; i++) {
    // mapear o valor de 8 bit da amostra para a altura 
    let h = map(spectrum[i], 0, 255, 0, height);

    // converter a largura para o total
    let x = i * bandsw;

    // desenha cada banda
    rect(x, height / 2, bandsw, h);
  }

}