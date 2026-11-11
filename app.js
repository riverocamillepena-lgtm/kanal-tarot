let CARDS=[];
fetch("cards.json").then(r=>{if(!r.ok)throw new Error("Could not load tarot deck");return r.json();}).then(data=>{CARDS=data;initTarot();}).catch(()=>{document.querySelector("#stage-instruction").textContent="The baraha are taking a quick coffee break. Refresh to try again.";});
function initTarot(){
const categoryInfo={
 love:{label:"Love Reading",past:"What shaped your heart",present:"Where your heart is now",future:"The direction love may take",tone:"Sa puso at connections mo"},
 career:{label:"Career Reading",past:"The work that brought you here",present:"Your current career energy",future:"The next professional direction",tone:"Sa trabaho, pera, at ambitions mo"},
 general:{label:"General Life Reading",past:"The chapter behind you",present:"Your current life lesson",future:"The road opening ahead",tone:"Sa bigger picture ng buhay mo"},
 chismis:{label:"Chismis Reading",past:"The backstory",present:"What is happening beneath the surface",future:"What may come to light",tone:"Sa tea, truth, at mga ganap sa paligid mo"}
};
const positions=["PAST · PINANGGALINGAN","PRESENT · KASALUKUYAN","FUTURE · SUSUNOD NA DIREKSYON"];
const category=document.querySelectorAll(".category");
const fan=document.querySelector("#card-fan"),selectedRow=document.querySelector("#selected-row"),count=document.querySelector("#pick-count");
const reveal=document.querySelector("#reveal-btn"),shuffleBtn=document.querySelector("#shuffle-btn");
let chosenCategory="love",deck=[],picked=[],lastReading=null;
const shuffle=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function artSvg(card){
 const esc=s=>String(s||"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
 if(card.image){
  return '<div class="tarot-illustration meme-photo"><img src="'+esc(card.image)+'" alt="'+esc(card.name)+' meme image" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.classList.add(\'image-failed\');this.remove()"><a class="image-credit" href="'+esc(card.imageSource||"#")+'" target="_blank" rel="noopener noreferrer" aria-label="Open original image source">source</a></div>';
 }
 return '<div class="tarot-illustration"><span>'+esc(card.emoji||"🔮")+'</span></div>';
}
function makeDeck(){deck=shuffle([...CARDS]);picked=[];renderFan();renderSlots();document.querySelector("#results").hidden=true;reveal.disabled=true;count.textContent="0 / 3 selected";document.querySelector("#stage-instruction").textContent="Take a breath, bes. Tap a card and choose three—trust the chismis of the cosmos."; }
function renderFan(){fan.innerHTML="";deck.forEach((card,index)=>{const b=document.createElement("button");b.className="tarot-card";b.type="button";b.setAttribute("aria-label",`Face-down tarot card ${index+1}`);b.dataset.index=index;b.addEventListener("click",()=>pickCard(card,b));fan.append(b);});}
function pickCard(card,button){if(picked.length>=3||picked.some(c=>c.id===card.id))return;picked.push(card);button.classList.add("picked");button.disabled=true;button.setAttribute("aria-label",`${card.name} selected`);renderSlots();count.textContent=`${picked.length} / 3 selected`;reveal.disabled=picked.length!==3;if(picked.length===3)document.querySelector("#stage-instruction").textContent="Three cards selected. The universe has entered the group chat."; }
function renderSlots(){selectedRow.innerHTML=positions.map((p,i)=>`<div class="selected-slot">${p}<b>${picked[i]?picked[i].name:"Awaiting your pick…"}</b></div>`).join("");}
shuffleBtn.addEventListener("click",()=>{fan.querySelectorAll(".tarot-card").forEach((c,i)=>{c.classList.remove("shuffle");void c.offsetWidth;c.style.animationDelay=`${i*12}ms`;c.classList.add("shuffle");});setTimeout(makeDeck,560);});
category.forEach(btn=>btn.addEventListener("click",()=>{category.forEach(x=>x.classList.remove("active"));btn.classList.add("active");chosenCategory=btn.dataset.category;}));
function buildInterpretation(card,index,cat){
 const info=categoryInfo[cat],position=info[["past","present","future"][index]];
 const categoryLines={
 love:["Past love life mo: may lesson na sana natutunan mo na bago pa nagkaroon ng sequel. Balikan ang pattern, hindi ang ex.","Present love life: kilig is free, consistency ang premium subscription. Tingnan ang actions, hindi ang online status.","Future love life: may chance sa mas maayos na connection. Hindi mo kailangang mag-audition para sa role na dapat kusang ibigay."],
 career:["Career backstory: may skills kang naipon kahit minsan feeling mo extra ka lang sa office sitcom.","Work ngayon: maraming ganap, pero hindi lahat urgent. Hindi ka printer na kailangang laging online.","Career ahead: may opportunity kung kikilos ka. Update CV muna bago mag-manifest ng CEO era."],
 general:["Past chapter: character development ang tawag dito, hindi free trial ng stress. May natutunan ka kahit ayaw mo sa episode.","Present energy: check mo kung pagod ka ba o bored lang. Magkaiba ang kailangan nilang remedy.","Future: hindi man instant ang plot twist, may progress kung tuloy-tuloy ang small moves."],
 chismis:["Backstory: may history ang ganap, pero huwag gawing fact ang sabi-sabi ng kapitbahay.","Current chika: observe muna. Hindi lahat ng cryptic post ay tungkol sa'yo—main character ka, pero may ibang cast din.","Next episode: may puwedeng luminaw. Hintayin ang resibo bago mag-drop ng exposé."]
 };
 const meaningLabels={love:"Love life, bes",career:"Trabaho at adulting",general:"Life update",chismis:"Chika check"};
 return {position,categoryLine:categoryLines[cat][index],interpretation:card.essence+" "+categoryLines[cat][index],advice:card.guidance,meaning:card.meaning};
}
function renderResults(){const info=categoryInfo[chosenCategory];document.querySelector("#result-category").textContent=info.label+" · "+info.tone;document.querySelector("#result-cards").innerHTML=picked.map((card,i)=>{const r=buildInterpretation(card,i,chosenCategory);return `<article class="result-card"><div class="result-position">${positions[i]}</div><div class="result-art">${artSvg(card)}</div><div><h3>${card.name}</h3><div class="meme-caption">“${card.caption}”</div></div><div class="meaning-label">Tarot meaning, with konting kalat</div><p>${r.meaning}</p><div class="meaning-label">Ang chika ng baraha</div><p>${r.interpretation}</p><div class="meaning-label">Gawin mo 'to, beh</div><p>${r.advice}</p></article>`;}).join("");
const summary=`ANG MARITES REPORT: ${picked[0].name} ang backstory; ${picked[1].name} ang current ganap; ${picked[2].name} ang possible next episode. ${picked[1].guidance} ${chosenCategory==="chismis"?"Reminder: chika pa lang ito, hindi sworn affidavit. Verify bago magkalat.":"Take the advice, leave the drama. Ikaw pa rin ang director ng buhay mo, bes."}`;
document.querySelector("#summary-text").textContent=summary;
const q=document.querySelector("#question").value.trim();document.querySelector("#question-echo").textContent=q?`Tanong mo: “${q}” — eto ang baraha’s two cents. Hindi ito court ruling, bes.`:"Disclaimer: tarot lang ito, hindi memo from the universe. Ikaw pa rin ang may final say.";
lastReading={category:info.label,cards:picked.map((c,i)=>({name:c.name,position:positions[i],caption:c.caption,meaning:c.meaning,interpretation:buildInterpretation(c,i,chosenCategory).interpretation,advice:c.guidance})),summary,question:q};
document.querySelector("#results").hidden=false;document.querySelector("#results").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});}
reveal.addEventListener("click",renderResults);
document.querySelector("#new-reading-btn").addEventListener("click",()=>{makeDeck();document.querySelector("#question").value="";document.querySelector("#read").scrollIntoView({behavior:"smooth"});});
document.querySelector("#share-btn").addEventListener("click",async()=>{if(!lastReading)return;const text=`KANAL TAROT 🔮\n${lastReading.category}\n${lastReading.cards.map(c=>`${c.position}: ${c.name} — “${c.caption}”`).join("\n")}\n\n${lastReading.summary}\n\nAng sagot ay nasa Baraha bes. ✦`;try{if(navigator.share)await navigator.share({title:"My KANAL TAROT reading",text});else{await navigator.clipboard.writeText(text);document.querySelector("#share-status").textContent="Reading copied, bes! Paste it sa group chat. ✨";}}catch(e){if(e.name!=="AbortError")document.querySelector("#share-status").textContent="Sharing isn't available here—try copying the reading text."; }});
document.querySelector("#deck-grid").innerHTML=CARDS.map((c,i)=>`<article class="mini-card"><span class="mini-number">${c.number??i} · MAJOR ARCANA</span><div class="mini-art">${artSvg(c)}</div><b>${c.name||"Unknown card"}</b><small>${c.caption||""}</small></article>`).join("");
const menu=document.querySelector(".menu-btn");menu.addEventListener("click",()=>{const nav=document.querySelector(".topbar");const open=nav.classList.toggle("menu-open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".topbar nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".topbar").classList.remove("menu-open");menu.setAttribute("aria-expanded","false");}));
document.querySelector("#year").textContent=new Date().getFullYear();
makeDeck();
}
