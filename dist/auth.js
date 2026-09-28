'use strict';
const storageKey='bottega-portfolio-v1';
let startupError='';
try{window.bottegaInitialState=JSON.parse(localStorage.getItem(storageKey)||'null')}catch{startupError='Non è stato possibile recuperare la prova precedente.';window.bottegaInitialState=null}
window.bottegaApi=async(url,options={})=>{if(url!=='/api/state')throw Error('Funzione non disponibile nella demo pubblica.');if(options.method==='PUT'){try{localStorage.setItem(storageKey,options.body)}catch{throw Error('Il browser non può salvare: esporta un backup prima di chiudere.')}return {saved:true}}return JSON.parse(localStorage.getItem(storageKey)||'null')};
document.body.classList.add('authenticated');
document.getElementById('auth-screen').remove();
async function launch(){for(const src of ['app.js','electrician.js','portfolio.js'])await new Promise((resolve,reject)=>{const el=document.createElement('script');el.src=src;el.onload=resolve;el.onerror=reject;document.body.append(el)});if(startupError)toast(startupError)}
launch().catch(()=>{document.body.insertAdjacentHTML('afterbegin','<p role="alert">Caricamento incompleto. Ricarica la pagina per riprovare.</p>')});
