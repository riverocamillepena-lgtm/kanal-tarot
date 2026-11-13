const PINOY_FACE_IMAGES={
 shock:"assets/memes/memes%20%F0%9F%98%85.jpeg",
 stoic:"assets/memes/Manny%20paqky.jpeg",
 surprised:"assets/memes/meme.jpeg",
 cleaver:"assets/memes/gagi.jpeg",
 sideeye:"assets/memes/261cebd8-28f1-4491-8758-7c628add74ac.jpeg",
 cry:"assets/memes/2a9d5fa7-83ee-488d-97fd-7049407e24ce.jpeg",
 tired:"assets/memes/2bb1414c-c221-43be-8b91-4b7115253328.jpeg"
};
function pinoyFaceForCard(card){const n=(card.name||"").toLowerCase(),m=(card.meaning||"").toLowerCase();
const major={ "the fool":"shock","the magician":"cleaver","the high priestess":"sideeye","the empress":"surprised","the emperor":"stoic","the hierophant":"stoic","the lovers":"surprised","the chariot":"shock","strength":"cleaver","the hermit":"tired","wheel of fortune":"shock","justice":"stoic","the hanged man":"tired","death":"cry","temperance":"surprised","the devil":"sideeye","the tower":"shock","the star":"cry","the moon":"sideeye","the sun":"surprised","judgement":"shock","the world":"surprised"};
if(major[n])return major[n];
if(/heartbreak|grief|loss|sadness|betrayal|pain|regret|sorrow/.test(m))return "cry";
if(/burden|exhaust|rest|pause|withdraw|stagnat|overwhelm|anxiet/.test(m))return "tired";
if(/conflict|defen|boundar|courage|challenge|fight|resist|protect/.test(m))return "cleaver";
if(/secret|deception|illusion|doubt|confus|tempt|avoid|uncertain/.test(m))return "sideeye";
if(/authority|structure|discipline|tradition|responsib|stability|control/.test(m))return "stoic";
if(/speed|sudden|movement|news|change|action|momentum/.test(m))return "shock";
return "surprised";}
let CARDS=[];
fetch("cards.json?v=20261112-kalat-reading-v3").then(r=>{if(!r.ok)throw new Error("Could not load tarot deck");return r.json();}).then(data=>{CARDS=data;initTarot();}).catch(()=>{document.querySelector("#stage-instruction").textContent="The baraha are taking a quick coffee break. Refresh to try again.";});
function initTarot(){
const categoryInfo={
 love:{label:"Love Chika",past:"What shaped your heart",present:"Where your heart is now",future:"The direction love may take",tone:"Sa puso at connections mo"},
 career:{label:"Career Chika",past:"The work that brought you here",present:"Your current career energy",future:"The next professional direction",tone:"Sa trabaho, pera, at ambitions mo"},
 general:{label:"Life Chika",past:"The chapter behind you",present:"Your current life lesson",future:"The road opening ahead",tone:"Sa bigger picture ng buhay mo"},
 chismis:{label:"Chismis Central",past:"The backstory",present:"What is happening beneath the surface",future:"What may come to light",tone:"Sa tea, truth, at mga ganap sa paligid mo"}
};
const positions=["NOON PA ANG KALAT","ITO ANG GANAP NGAYON","NEXT EPISODE: ABANGAN"];
const category=document.querySelectorAll(".category");
const reveal=document.querySelector("#reveal-btn");
let chosenCategory="love",deck=[],picked=[],lastReading=null,revealTimers=[];
const shuffle=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const esc=s=>String(s??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
function artSvg(card){
 const face=pinoyFaceForCard(card),src=PINOY_FACE_IMAGES[face]||PINOY_FACE_IMAGES.surprised;
 return '<div class="tarot-illustration meme-photo pinoy-meme-face"><img src="'+src+'" alt="'+esc(card.name)+' Pinoy meme face" loading="lazy" onerror="this.onerror=null;this.src=\'assets/memes/gagi.jpeg\'"></div>';
}
function makeDeck(){revealTimers.forEach(clearTimeout);revealTimers=[];deck=shuffle([...CARDS]);picked=deck.slice(0,3);document.querySelector("#results").hidden=true;reveal.disabled=false;document.querySelector("#stage-instruction").textContent="Tatlong baraha ang automatic nang nabunot para sa’yo. Piliin ang aspect at pindutin ang REVEAL MY READING!"; }
function renderFan(){fan.innerHTML="";deck.forEach((card,index)=>{const b=document.createElement("button");b.className="tarot-card";b.type="button";b.setAttribute("aria-label",`Face-down tarot card ${index+1}`);b.dataset.index=index;b.addEventListener("click",()=>pickCard(card,b));fan.append(b);});}
function pickCard(card,button){if(picked.length>=3||picked.some(c=>c.id===card.id))return;picked.push(card);button.classList.add("picked");button.disabled=true;button.setAttribute("aria-label",`${card.name} selected`);renderSlots();count.textContent=`${picked.length} / 3 selected`;reveal.disabled=picked.length!==3;if(picked.length===3)document.querySelector("#stage-instruction").textContent="Tatlong baraha na. Naka-ready na ang group chat. 😂"; }
function renderSlots(){selectedRow.innerHTML=positions.map((p,i)=>{const card=picked[i];return card?'<div class="selected-preview"><span class="preview-position">'+esc(p)+'</span><div class="preview-card">'+artSvg(card)+'<b>'+esc(card.name)+'</b></div></div>':'<div class="selected-slot">'+esc(p)+'<b>Awaiting your pick…</b></div>';}).join("");}
category.forEach(btn=>btn.addEventListener("click",()=>{category.forEach(x=>x.classList.remove("active"));btn.classList.add("active");chosenCategory=btn.dataset.category;document.querySelector("#results").hidden=true;reveal.disabled=false;document.querySelector("#stage-instruction").textContent="Aspect selected: "+(categoryInfo[chosenCategory]?.label||"Life Chika")+". Pindutin ang REVEAL MY READING para sa chika mo!";}));
const categoryJokes={
love:{
 scene:["Nag-send ka ng 'ingat ka' tapos siya nag-reply ng thumbs up. Aba, customer service ba 'to?","May ka-talking stage kang parang loading screen: 99% na, ayaw pa ring bumukas.","Nag-story siya ng 'miss ko na' at ikaw naman nag-self nominate. Hindi ikaw ang only applicant, beh.","Ikaw ang may good morning, good night, at emotional support package. Siya? Seen-zoned premium.","May date daw kayo pero ikaw ang nagplano, nag-book, nagbayad ng reservation. Jowa o travel agency?","Nag-away kayo dahil sa tone ng chat. Isang 'k' lang, may season finale na.","May bumalik na ex. Akala mo closure, rerun pala ng basura.","May kilig sa inbox pero pag personalan na, parang multo sa mall.","Relationship status: ikaw ang nagmamahal, siya ang nagre-reply kapag walang magawa."],
 twist:["May effort ka pang pang-Anniversary, ang ambag niya pang-free trial. Sulit na sulit ka, mhie.","Ang tagal mag-reply, baka sinusulat pa sa papel at ipinapadala via kalapati.","Hindi ka tinamaan ng cupid, tinamaan ka ng notification. Magkaiba 'yon.","Ikaw ang jowa, therapist, alarm clock, at taga-order ng food. May 13th month pay ba?","Nag-date kayo pero ikaw ang project manager. Sana may minutes of the meeting.","Nag-type ka ng paragraph, sumagot ng 'haha'. Aba, spoken poetry versus laugh track.","Hindi siya nagbago, nagpalit lang ng profile picture. Character development saan?","Sa chat lang siya consistent. Parang prepaid load: may signal kapag may promo.","Hindi ka option sa menu, pero bakit ikaw ang laging nakaabang sa kanya?"],
 resbak:["I-match ang effort, hindi ang seen status. Hindi ka CCTV ng online activity niya.","Kung loading pa rin after ilang buwan, baka hindi internet ang problema. I-uninstall na, bes.","Huwag mag-apply sa parinig. Walang hiring sa imaginary relationship department.","Ibalik ang energy sa sarili. Hindi ka unlimited data ng taong naka-airplane mode.","Next date, hati sa plano. Hindi ka event coordinator na walang talent fee.","Mag-usap nang normal. Hindi required ang forensic investigation sa bawat 'okay'.","Ex na naman? I-check ang expiration date. Mukhang panis na 'yan.","Kung multo, huwag habulin. Magpa-bless ka na lang ng Wi-Fi router.","Kung ikaw lang ang present, solo performance 'yan. Huwag tawaging relationship."]
},
career:{
 scene:["Ikaw ang taga-Excel, taga-print, taga-follow up, taga-kape. Job title mo ba ay buong opisina?","May boss na nagsabing 'quick task lang' tapos umabot ng tatlong business days. Quick saan banda?","Nag-email ka ng resignation sa isip mo habang nakangiti sa meeting. Corporate acting award!","Sweldo mo dumaan lang para magbayad ng bills. Parang dumaan na bisita, hindi man lang nag-merienda.","May katrabahong 'teamwork' ang tawag kapag ikaw ang gumagawa. Team saan? Ikaw lang ang pawis.","May meeting na ang agenda ay mag-set ng another meeting. Inception pero walang Leonardo DiCaprio.","Nag-apply ka sa trabaho, hinanapan ng 5 years experience para sa entry-level. Time traveler ba ang hanap?","May deadline na bukas pero ngayon lang sinabi. Surprise! Ikaw ang birthday celebrant ng stress.","May bagong task na naman na 'part lang ng role mo' kahit wala sa job description. Multiverse employee ka na."],
 twist:["Ikaw ang buong department sa isang katawan. Kulang na lang ikaw na rin magbukas ng opisina.","Quick task daw, pero pati lunch break mo nag-file na ng leave.","Ang katawan mo nasa office, ang kaluluwa mo nasa jobstreet at naghahanap ng exit.","Hindi sahod ang pumasok sa account mo, dumaan lang ang pera para magpaalam.","May team building pero ikaw pa rin ang taga-buhat. Literal at emotional.","Tatlong oras nag-usap para magdesisyon na mag-usap ulit. Productivity found dead.","Entry-level ang sahod, senior-level ang requirements. Aba, package deal ng kahirapan.","Ang deadline ay bukas, ang instructions ay kahapon, ang pasensya mo ay last seen 2024.","Promotion ang workload, pero salary increase ay naka-private account."],
 resbak:["Ilagay sa job description ang lahat ng ginagawa mo. Baka pati paghinga mo i-assign pa nila.","Kapag 'quick task', itanong ang deadline. Hindi ka microwave na may 30-second setting.","I-update ang resume habang naka-smile sa Zoom. Multitasking with a purpose, beh.","Pag sweldo, unahin ang bills bago ang budol. Kahit masakit, hindi ka anak ni Manny.","Ibalik ang task sa group chat. Hindi ka one-person production company.","Mag-request ng agenda. Hindi ka nagbayad ng tuition para sa meeting na walang plot.","Kung entry-level, entry-level din dapat ang requirements. Hindi ka time traveler.","I-confirm ang deadline in writing. Para may resibo kapag may amnesia ang boss.","Kung dumami ang trabaho, itanong kung kasama sa package ang dagdag-sahod. Hindi ka charity."]
},
chismis:{
 scene:["May nag-message ng 'may sasabihin ako' tapos nag-offline. Cliffhanger na walang budget.","May secret sa GC na mas maraming nakakaalam kaysa sa may-ari ng secret. Public announcement yarn?","May nag-post ng black screen at lyrics. Hindi na My Day, crime scene na.","May nagtanong ng 'sino may alam?' tapos ikaw ang ginawang NBI, CCTV, at Google Maps.","May nag-away sa comments, tapos nag-comment ang tita mong walang context. Guest appearance!","May nagkalat ng screenshot pero crop na crop. Nasaan ang director's cut, mhie?","May nagsabing 'no hate' bago mang-insulto. Parang 'no sugar' sa isang kilong leche flan.","May nag-unfollow, nag-block, nag-follow ulit. Social media ba 'to o MRT beep card?","May chika kang narinig sa taong nagsabing 'huwag mong sasabihin kahit kanino'—sa'yo pang-apat na niya sinabi."],
 twist:["Naghintay ka ng 40 minutes para sa chika na 'basta ganon'. Bitin ang teleserye, bes.","Confidential daw, pero may attendance sheet at snacks na ang audience.","May pinatatamaan pero walang tinatag. Parang darts na nakapiring ang player.","Ikaw na ang detective, prosecutor, at taga-subtitle. Wala bang TF ang serbisyo mo?","Nag-comment pa ang tita ng 'ano meron?' habang siya ang unang nag-share. Plot twist: siya ang source.","Cropping contest ba? Pati context tinanggal, pati katotohanan na-blur.","'No hate' pero may 12 paragraphs na character assassination. Sige, Pulitzer.","Ang relationship nila sa follow button mas complicated pa sa lovelife mo.","May embargo kuno pero mas mabilis pa sa breaking news ang bibig niya."],
 resbak:["Huwag kang mag-investigate nang walang bayad. NBI ka ba o marites intern?","Kung secret, huwag i-forward. Hindi ka group chat distribution center.","I-post mo na lang ang pagkain. Mas masarap pa 'yon kaysa cryptic caption.","Google is free, pero hindi ka rin dapat gawing free investigator.","Huwag makipag-away sa comments. Hindi ka moderator ng barangay Facebook group.","Humingi ng full screenshot. Hindi puwedeng cropped ang ebidensya, parang budget report.","Kapag 'no hate' ang intro, magdala ng helmet. At huwag agad maniwala.","I-mute ang follow-unfollow Olympics. Hindi mo kailangan ng season pass.","Kung may chika, verify muna. Hindi lahat ng bulong ay breaking news."]
},
general:{
 scene:["May 17 tabs kang bukas sa utak pero lahat loading. Multitasking daw, system hang pala.","Plano mong maglinis ng bahay pero nauwi sa pag-aayos ng playlist. Priorities, beh.","Nag-grocery ka para makatipid, umuwi kang may snacks, candle, at bagong basahan. Nasaan ang tipid?","May nagtanong kung anong plano mo sa buhay. Ikaw nga hindi pa alam anong ulam mamaya.","Nagising kang pagod kahit wala ka namang ginawa. Achievement unlocked: pagod premium.","May labada kang mas matagal nang nakatambay kaysa sa ibang relasyon. At least consistent.","Nag-checkout ka ng 'essentials' na hindi mo maalala kung bakit essential. Budolnesia.","Gusto mong maging mysterious pero ang tunay na mystery ay saan napunta ang sweldo mo.","May errands kang lima, energy mo pang-isang pila sa government office."],
 twist:["Ang brain mo may 37 open tabs at may isang tumutugtog ng budots. Hindi mo mahanap kung saan.","Naglinis ka ng isang drawer, nagkalat ang buong bahay. Home makeover: disaster edition.","Ang grocery list mo may bigas at sabon, ang resibo may emotional damage.","Life plan? Makakakain muna tayo bago mag-decide ng future, please.","Wala kang ginawa pero pagod ka. Baka naka-background update ang kaluluwa mo.","May labada nang may sariling barangay at elected officers. Kailan ang fiesta?","Essential daw, pero bakit may tatlong budol na hindi pa nabubuksan?","Nag-sweldo ka, nag-blink ka, zero na. Magic trick ng adulting.","Sa pila mo lang mararamdaman na may lifetime subscription ka sa paghihintay."],
 resbak:["Isara muna ang 36 tabs. Isa-isahin ang problema, hindi ka browser na may 32GB RAM.","Maglinis ng isang sulok. Huwag mag-start ng renovation dahil lang may nakita kang basahan.","Magdala ng listahan sa grocery. Huwag hayaang si budol ang mamili para sa'yo.","Sabihin mong 'next question' sa life audit. Hindi ka press conference.","Kumain at matulog. Baka low battery ka lang, hindi cursed.","Isalang ang labada bago pa sila bumoto ng barangay captain.","Iwan muna sa cart. Kung gusto mo pa rin bukas, saka mo i-checkout.","I-check ang bank app bago mag-checkout. Hindi magic ang sweldo, nauubos talaga.","Magdala ng tubig at pasensya. Parehong mauubos sa pila."]
}
};
function buildInterpretation(card,index,cat){
 const title=card.charotName||card.caption||card.name||"ANG GANAP";
 const oneLiner=card.oneLiner||"May ganap na kailangang tingnan nang mas malinaw.";
 const essence=card.essence||card.meaning||"May bagong anggulo kang puwedeng pag-isipan.";
 const guidance=card.guidance||"Huminga, mag-fact-check, at piliin ang hakbang na kaya mong panindigan.";
 const categoryLabels={
  love:"LOVE LIFE: eto ang resibo sa puso at connections mo.",
  career:"CAREER: eto ang ganap sa trabaho, pera, at ambitions mo.",
  chismis:"CHISMIS: eto ang tea sa social circle at mga taong nakapaligid sa'yo.",
  general:"GENERAL LIFE: eto ang plot ng everyday life at personal choices mo."
 };
 // Keep each card's own meme punchline and interpretation as the main reading.
 // Avoid repeating a generic category speech before every card.
 const interpretation=oneLiner+" "+essence;
 return {
  position:positions[index],
  categoryLine:categoryInfo[cat]?.label||"Life Chika",
  interpretation,
  advice:guidance,
  meaning:card.meaning||"",
  title,
  savage:oneLiner
 };
}
function renderResults(){
 reveal.disabled=true;
 revealTimers.forEach(clearTimeout);revealTimers=[];
 const info=categoryInfo[chosenCategory];
 document.querySelector("#result-category").textContent=info.label+" · "+info.tone;
 const results=document.querySelector("#results");
 results.hidden=false;
 results.style.display="block";
 const host=document.querySelector("#result-cards");
 host.style.display="grid";
 host.innerHTML="";
 document.querySelector("#summary-text").textContent="";
 const q="";
 document.querySelector("#question-echo").textContent=q?`Tanong mo: “${q}” — eto ang baraha’s two cents. Hindi ito court ruling, bes.`:"Disclaimer: tarot lang ito, hindi memo from the universe. Ikaw pa rin ang may final say.";
 lastReading=null;
 const status=document.createElement("p");
 status.className="reveal-status";
 status.setAttribute("role","status");
 status.textContent="Unang baraha muna. May 5 seconds pagitan bago ang kasunod. Hindi ito teleseryeng puwedeng i-fast forward. 😂";
 host.append(status);
 const revealOne=(i)=>{
  const card=picked[i];
  const r=buildInterpretation(card,i,chosenCategory);
  const article=document.createElement("article");
  article.className="result-card reveal-pending";
  article.innerHTML=`<button class="flip-card" type="button" aria-label="Flip card to reveal the reading"><span class="flip-inner"><span class="flip-face flip-front"><span class="front-art">${artSvg(card)}</span><span class="polaroid-caption">${esc(card.name)}</span></span><span class="flip-face flip-back"><span class="back-position">${esc(positions[i])}</span><strong class="back-title">${esc(r.title)}</strong><span class="meaning-label">ETO ANG MEME READING, BES</span><span class="back-copy">${esc(r.interpretation)}</span><span class="meaning-label">HETO ANG RESBAK, BEH</span><span class="back-copy">${esc(r.advice)}</span><span class="flip-hint">TAP MO PARA SA CHIKA ↻</span></span></span></button>`;
  article.querySelector(".flip-card").addEventListener("click",()=>{const flip=article.querySelector(".flip-card");flip.classList.toggle("is-flipped");flip.setAttribute("aria-label",flip.classList.contains("is-flipped")?"Show card artwork":"Flip card to read its meaning");});
  host.insertBefore(article,status);
  article.style.display="block";
  article.style.visibility="visible";
  requestAnimationFrame(()=>{article.classList.remove("reveal-pending");article.classList.add("reveal-in");});
  if(i<2){
   status.textContent=`Card ${i+1} of 3 revealed. Susunod na baraha in 5 seconds… wag magmadali, hindi 'to Shopee checkout. ⏳`;
   revealTimers.push(setTimeout(()=>revealOne(i+1),5000));
  }else{
   status.textContent="Tapos na ang reading! O ayan, may bagong episode na naman ang buhay mo. 😂";
   const summary='ETO ANG RESIBO NG TATLONG BARAHANG BINUNOT MO: '+picked.map((c,i)=>{const r=buildInterpretation(c,i,chosenCategory);return positions[i]+': '+r.title+' — '+r.interpretation+' RESBAK: '+r.advice;}).join(' | ')+' FINAL WORD: '+buildInterpretation(picked[2],2,chosenCategory).advice;
   document.querySelector("#summary-text").textContent=summary;
   lastReading={category:info.label,cards:picked.map((c,i)=>({name:c.charotName||c.name,position:positions[i],interpretation:buildInterpretation(c,i,chosenCategory).interpretation,advice:buildInterpretation(c,i,chosenCategory).advice})),summary,question:q};
  }
 };
 revealOne(0);
 results.hidden=false;
 results.style.display="block";
 results.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
}
reveal.addEventListener("click",renderResults);
document.querySelector("#new-reading-btn").addEventListener("click",()=>{makeDeck();document.querySelector("#read").scrollIntoView({behavior:"smooth"});});
document.querySelector("#share-btn").addEventListener("click",async()=>{if(!lastReading)return;const text=`KANAL TAROT 🔮\n${lastReading.category}\n${lastReading.cards.map(c=>`${c.position}: ${c.name} — “${c.interpretation}” Resbak: ${c.advice}`).join("\n")}\n\n${lastReading.summary}\n\nAng sagot ay nasa Baraha bes. ✦`;try{if(navigator.share)await navigator.share({title:"My KANAL TAROT reading",text});else{await navigator.clipboard.writeText(text);document.querySelector("#share-status").textContent="Reading copied, bes! Paste it sa group chat. ✨";}}catch(e){if(e.name!=="AbortError")document.querySelector("#share-status").textContent="Sharing isn't available here—try copying the reading text."; }});
document.querySelector("#deck-grid").innerHTML=CARDS.map((c,i)=>`<article class="mini-card"><span class="mini-number">${c.arcana==="Minor Arcana"?(c.suit.toUpperCase()+" · "+c.number):((c.number??i)+" · MAJOR ARCANA")}</span><div class="mini-art">${artSvg(c)}</div><b>${c.name||"Unknown card"}</b><small>${c.caption||""}</small></article>`).join("");
const menu=document.querySelector(".menu-btn");menu.addEventListener("click",()=>{const nav=document.querySelector(".topbar");const open=nav.classList.toggle("menu-open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".topbar nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".topbar").classList.remove("menu-open");menu.setAttribute("aria-expanded","false");}));
document.querySelector("#year").textContent=new Date().getFullYear();
makeDeck();
}
