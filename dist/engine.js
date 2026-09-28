(function(root){
'use strict';
const groups={socket:'Presa • serie demo A • 2P+T 16 A',switch:'Interruttore • serie demo A • unipolare',plate:'Placca • serie demo A • 3 moduli',support:'Supporto • serie demo A • 3 moduli',connector:'Morsetto • demo • 3 poli',lamp:'Apparecchio LED • demo • 230 V'};
const recipes=[
 {id:'socket',name:'Sostituzione presa esistente',description:'Punto esistente, cablaggio riutilizzabile. Verificare serie, moduli, caratteristiche e stato dei conduttori.',hours:0.75,parts:[['socket',1]],accessories:[['support',1],['plate',1]]},
 {id:'switch',name:'Sostituzione interruttore esistente',description:'Comando semplice esistente. Esclusi deviatori, invertitori e nuovi cablaggi. Verificare serie e caratteristiche.',hours:0.6,parts:[['switch',1]],accessories:[['support',1],['plate',1]]},
 {id:'lamp',name:'Sostituzione apparecchio illuminante',description:'Punto luce esistente accessibile. Verificare fissaggi, alimentazione, ambiente e connessioni.',hours:1,parts:[['lamp',1],['connector',1]],accessories:[]}
];
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
function demoCatalog(){return Object.entries(groups).flatMap(([group,name],g)=>[0,1,2].map((v)=>({id:`demo-${group}-${v}`,sku:`DEMO-${group.toUpperCase()}-${v+1}`,name:`${name} / variante ${v+1}`,unit:'pz',group,price:round([6,4,3,2,1,20][g]*[1,1.6,2.4][v]),source:'Dataset sintetico Bottega, non un listino commerciale',demo:true})));}
function choices(catalog,group,unit){const a=catalog.filter(c=>c.group===group&&c.unit===unit).slice().sort((a,b)=>a.price-b.price||a.id.localeCompare(b.id));if(!a.length)return [];return [...new Set([0,Math.floor((a.length-1)/2),a.length-1])].map(i=>({item:a[i],label:i===0?'Economica':i===a.length-1?'Costosa':'Mediana'}));}
function select(catalog,group,policy,unit='pz'){if(!group)return undefined;const a=catalog.filter(c=>c.group===group&&c.unit===unit).slice().sort((a,b)=>a.price-b.price||a.id.localeCompare(b.id));return a[policy==='high'?a.length-1:policy==='median'?Math.floor((a.length-1)/2):0];}
function key(id,a){return JSON.stringify([id,Number(a.count),a.accessories,a.access]);}
function pricing(c,markup=0){return {price:c.salePrice??round(c.price*(1+markup/100)),costPrice:c.price,...(c.salePrice!==undefined?{salePrice:c.salePrice}:{})}}
function generate(recipeId,a,catalog,settings,memory){const r=recipes.find(r=>r.id===recipeId);if(!r)throw Error('Ricetta sconosciuta');const count=Number(a.count);if(!Number.isInteger(count)||count<1||count>1000)throw Error('Numero punti non valido');const remembered=memory?.[key(recipeId,a)];let lines;
 if(remembered){lines=remembered.lines.map(l=>{const c=l.group?select(catalog,l.group,settings.policy,l.unit):catalog.find(c=>c.id===l.catalogId&&c.unit===l.unit);return {...l,...(c?{name:c.name,...pricing(c,settings.markupPercent),catalogId:c.id,demo:!!c.demo}:{price:0,missing:true}),id:crypto.randomUUID(),missing:!c}})}
 else{lines=[...r.parts,...(a.accessories==='yes'?r.accessories:[])].map(([group,qty])=>{const c=select(catalog,group,settings.policy);return {id:crypto.randomUUID(),name:c?.name||groups[group],unit:'pz',group,qty:qty*count,...(c?pricing(c,settings.markupPercent):{price:0}),catalogId:c?.id||'',missing:!c,demo:!!c?.demo}})}
 return {lines,hours:remembered?.hours??round(r.hours*count*(a.access==='difficult'?1.5:1)),remembered:!!remembered,description:r.description};}
function totals(q){const materials=round(q.lines.reduce((s,l)=>s+round(l.qty*l.price),0));const labor=round(q.laborMode==='hourly'?q.hours*q.hourlyRate:materials*q.labor/100);const net=round(materials+labor),vat=round(net*q.vat/100);return {materials,labor,net,vat,total:round(net+vat)}}
function number(value){if(typeof value==='number')return value;let s=String(value??'').trim().replace(/[€\s]/g,'');if(!s)return NaN;if(s.includes(',')&&s.includes('.'))s=s.lastIndexOf(',')>s.lastIndexOf('.')?s.replace(/\./g,'').replace(',','.'):s.replace(/,/g,'');else if(s.includes(','))s=s.replace(',','.');return Number(s)}
const api={groups,recipes,demoCatalog,choices,select,key,generate,totals,number,pricing};if(typeof module!=='undefined')module.exports=api;else root.BottegaEngine=api;
})(globalThis);
