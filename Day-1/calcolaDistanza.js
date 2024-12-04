const fs = require("fs");

// Prima parte

//1- leggere il file di input
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Errore durante la lettura del file:", err);
    return;
  }
  // 2- dichiarate due array per contenere il risultato della lettura
  const righe = data.trim().split("\n");
  const listaSinistra = [];
  const listaDestra = [];
  // 3- separare i numeri nelle due liste sopra dichiarate
  righe.forEach((riga) => {
    const [sinistra, destra] = riga.split(/\s+/).map(Number);
    listaSinistra.push(sinistra);
    listaDestra.push(destra);
  });
  // 4- ordinare le liste in modo crescente
  const listaSinistraOrdinata = listaSinistra.sort((a, b) => a - b);
  const listaDestraOrdinata = listaDestra.sort((a, b) => a - b);
  // 5- sommare la distanza totale
  const distanzaTotale = listaSinistraOrdinata.reduce((somma, valore, indice) => somma + Math.abs(valore - listaDestraOrdinata[indice]), 0);

  console.log(`La distanza totale è: ${distanzaTotale}`);

  const conteggioDestra = listaDestra.reduce((conteggio, numero) => {
    conteggio[numero] = (conteggio[numero] || 0) + 1;
    return conteggio;
  }, {});

  // Calcolare il punteggio di similarità
  const punteggioSimilarita = listaSinistra.reduce((punteggio, numero) => {
    const occorrenze = conteggioDestra[numero] || 0;
    return punteggio + numero * occorrenze;
  }, 0);

  console.log(`Il punteggio di similarità è: ${punteggioSimilarita}`);
});
