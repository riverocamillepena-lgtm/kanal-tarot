let CARDS=[];
fetch("cards.json?v=20261112-card-specific-v2").then(r=>{if(!r.ok)throw new Error("Could not load tarot deck");return r.json();}).then(data=>{CARDS=data;initTarot();}).catch(()=>{document.querySelector("#stage-instruction").textContent="The baraha are taking a quick coffee break. Refresh to try again.";});
function initTarot(){
const categoryInfo={
 love:{label:"Love Chika",past:"What shaped your heart",present:"Where your heart is now",future:"The direction love may take",tone:"Sa puso at connections mo"},
 career:{label:"Career Chika",past:"The work that brought you here",present:"Your current career energy",future:"The next professional direction",tone:"Sa trabaho, pera, at ambitions mo"},
 general:{label:"Life Chika",past:"The chapter behind you",present:"Your current life lesson",future:"The road opening ahead",tone:"Sa bigger picture ng buhay mo"},
 chismis:{label:"Chismis Central",past:"The backstory",present:"What is happening beneath the surface",future:"What may come to light",tone:"Sa tea, truth, at mga ganap sa paligid mo"}
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
 const info=categoryInfo[cat];
 const positions=["PAST · PINANGGALINGAN","PRESENT · KASALUKUYAN","FUTURE · SUSUNOD NA DIREKSYON"];
 const name=card.name||"This card";
 const essence=String(card.essence||"").trim();
 const meaning=String(card.meaning||"").trim();
 const guidance=String(card.guidance||"").trim();
 const lens={
  love:"Sa love life at connections mo: ",
  career:"Sa trabaho, pera, at goals mo: ",
  general:"Sa personal na buhay at choices mo: ",
  chismis:"Sa mga tao, usapan, at impormasyong nakapaligid sa'yo: "
 }[cat];
 const stage={
  love:["Balikan kung paano nabuo ang pattern na ito sa puso mo.","Ito ang emotional reality na kailangan mong tingnan ngayon.","Ito ang posibleng direksyon kung kikilos ka ayon sa natutunan mo."],
  career:["Ito ang dating habit o decision na humubog sa work situation mo.","Ito ang kasalukuyang challenge o advantage sa career at finances mo.","Ito ang next move na puwedeng paghandaan sa trabaho at goals."],
  general:["Ito ang dating experience na may epekto pa sa choices mo.","Ito ang lesson na nasa harap mo ngayon.","Ito ang direction na mabubuksan ng susunod mong decision."],
  chismis:["Ito ang backstory na dapat unawain bago maniwala sa kwento.","Ito ang detail na kailangan mong i-verify sa kasalukuyan.","Ito ang maaaring maging resulta kapag lumabas ang buong katotohanan."]
 }[cat][index];
 const title=card.caption||("Ang Ganap ni "+name);
 const savage=String(card.caption||name)+" — hindi ito generic na hula, bes; ito ang specific na tema ng barahang ito.";
 const interpretation=[lens+essence,stage, "Core meaning: "+meaning+"."].filter(Boolean).join(" ");
 const advice=guidance+" "+({
  love:"I-apply ito sa actions at consistency, hindi lang sa kilig o pangako.",
  career:"I-translate ito sa isang practical na hakbang at malinaw na boundary.",
  general:"Pumili ng isang bagay na kaya mong gawin ngayon; huwag puro overthink.",
  chismis:"Ihiwalay ang facts sa haka-haka bago mag-react o mag-share."
 }[cat]);
 return {position:positions[index],categoryLine:stage,interpretation,advice,meaning,title,savage};
}
function getReadingProfile(){
 const birthday=document.querySelector("#birthdate").value;
 const ageInput=document.querySelector("#age").value.trim();
 let age=ageInput?Number(ageInput):null;
 let sign="";
 if(birthday){
  const [y,m,d]=birthday.split("-").map(Number),today=new Date();
  let years=today.getFullYear()-y;
  if(today.getMonth()+1<m||(today.getMonth()+1===m&&today.getDate()<d))years--;
  if(years>=0&&years<=120)age=years;
  const md=m*100+d;
  const signs=[[120,119, "Capricorn"],[120,218,"Aquarius"],[219,320,"Pisces"],[321,419,"Aries"],[420,520,"Taurus"],[521,620,"Gemini"],[621,722,"Cancer"],[723,822,"Leo"],[823,922,"Virgo"],[923,1022,"Libra"],[1023,1121,"Scorpio"],[1122,1221,"Sagittarius"],[1222,1231,"Capricorn"]];
  sign=md>=1222||md<=119?"Capricorn":md<=218?"Aquarius":md<=320?"Pisces":md<=419?"Aries":md<=520?"Taurus":md<=620?"Gemini":md<=722?"Cancer":md<=822?"Leo":md<=922?"Virgo":md<=1022?"Libra":md<=1121?"Scorpio":"Sagittarius";
 }
 const signField=document.querySelector("#horoscope");
 if(signField)signField.value=sign;
 return {age:Number.isFinite(age)&&age>0&&age<=120?age:null,sign,gender:document.querySelector("#gender").value};
}
function profileReadingNote(profile,cat,index){
 const notes={Aries:"bold first moves",Taurus:"steady pace and practical comfort",Gemini:"curiosity and clear conversations",Cancer:"emotional security and care",Leo:"confidence and being seen",Virgo:"details, routines, and discernment",Libra:"balance and mutual effort",Scorpio:"honesty and deeper motives",Sagittarius:"growth and new perspectives",Capricorn:"long-term goals and responsibility",Aquarius:"independence and fresh thinking",Pisces:"intuition and emotional boundaries"};
 const parts=[];
 if(profile.sign)parts.push("Zodiac lens: "+profile.sign+" is traditionally associated with "+notes[profile.sign]+". Use this as a reflection prompt, not a fixed personality label.");
 if(profile.age!==null){const band=profile.age<20?"early-life choices and learning":profile.age<30?"exploration, identity, and building foundations":profile.age<40?"priorities, growth, and sustainable commitments":profile.age<50?"reassessment, stability, and meaningful change":"experience, perspective, and what deserves your energy";parts.push("Life-stage lens: "+band+".");}
 return parts.length?"Personal lens — "+parts.join(" "):"";
}
function renderResults(){const info=categoryInfo[chosenCategory];const readerProfile=getReadingProfile();document.querySelector("#result-category").textContent=info.label+" · "+info.tone;document.querySelector("#result-cards").innerHTML=picked.map((card,i)=>{const r=buildInterpretation(card,i,chosenCategory);return `<article class="result-card reveal-pending"><div class="result-position">${positions[i]}</div><div class="result-art">${artSvg(card)}</div><div><h3>${r.title}</h3><div class="actual-card-name">${card.name}</div><div class="meme-caption">“${r.savage}”</div></div><div class="meaning-label">Tarot meaning, with konting kalat</div><p>${r.meaning}</p><div class="meaning-label">Ang chika ng baraha</div><p>${r.interpretation}</p><div class="meaning-label">Gawin mo 'to, beh</div><p>${r.advice}</p></article>`;}).join("");
const summary=`MGA ACCLA, ETO ANG CHIKA! ${picked.map((c,i)=>`${positions[i]} — ${c.name}: ${c.essence}`).join(" ")} FINAL VERDICT: ${picked[2].guidance} PLOT TWIST: hindi pare-pareho ang ganap ng tatlong baraha—ang unang card ang pinanggalingan, ang pangalawa ang kasalukuyan, at ang pangatlo ang direction na puwede mong piliin.`;
document.querySelector("#summary-text").textContent=summary;document.querySelector("#profile-reading-note").textContent=profileReadingNote(readerProfile,chosenCategory,1);
const q=document.querySelector("#question").value.trim();document.querySelector("#question-echo").textContent=q?`Tanong mo: “${q}” — eto ang baraha’s two cents. Hindi ito court ruling, bes.`:"Disclaimer: tarot lang ito, hindi memo from the universe. Ikaw pa rin ang may final say.";
lastReading={category:info.label,cards:picked.map((c,i)=>({name:c.name,position:positions[i],caption:c.caption,meaning:c.meaning,interpretation:buildInterpretation(c,i,chosenCategory).interpretation,advice:c.guidance})),summary,question:q};
document.querySelector("#results").hidden=false;[...document.querySelectorAll("#result-cards .result-card")].forEach((el,i)=>setTimeout(()=>{el.classList.remove("reveal-pending");el.classList.add("reveal-in");},matchMedia("(prefers-reduced-motion: reduce)").matches?0:650+i*1050));document.querySelector("#results").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});}
reveal.addEventListener("click",renderResults);
document.querySelector("#new-reading-btn").addEventListener("click",()=>{makeDeck();document.querySelector("#question").value="";document.querySelector("#read").scrollIntoView({behavior:"smooth"});});
document.querySelector("#share-btn").addEventListener("click",async()=>{if(!lastReading)return;const text=`KANAL TAROT 🔮\n${lastReading.category}\n${lastReading.cards.map(c=>`${c.position}: ${c.name} — “${c.caption}”`).join("\n")}\n\n${lastReading.summary}\n\nAng sagot ay nasa Baraha bes. ✦`;try{if(navigator.share)await navigator.share({title:"My KANAL TAROT reading",text});else{await navigator.clipboard.writeText(text);document.querySelector("#share-status").textContent="Reading copied, bes! Paste it sa group chat. ✨";}}catch(e){if(e.name!=="AbortError")document.querySelector("#share-status").textContent="Sharing isn't available here—try copying the reading text."; }});
document.querySelector("#deck-grid").innerHTML=CARDS.map((c,i)=>`<article class="mini-card"><span class="mini-number">${c.arcana==="Minor Arcana"?(c.suit.toUpperCase()+" · "+c.number):((c.number??i)+" · MAJOR ARCANA")}</span><div class="mini-art">${artSvg(c)}</div><b>${c.name||"Unknown card"}</b><small>${c.caption||""}</small></article>`).join("");
const menu=document.querySelector(".menu-btn");menu.addEventListener("click",()=>{const nav=document.querySelector(".topbar");const open=nav.classList.toggle("menu-open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".topbar nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".topbar").classList.remove("menu-open");menu.setAttribute("aria-expanded","false");}));
document.querySelector("#year").textContent=new Date().getFullYear();
makeDeck();
}
