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
const fan=document.querySelector("#card-fan"),selectedRow=document.querySelector("#selected-row"),count=document.querySelector("#pick-count");
const reveal=document.querySelector("#reveal-btn"),shuffleBtn=document.querySelector("#shuffle-btn");
let chosenCategory="love",deck=[],picked=[],lastReading=null,revealTimers=[];
const shuffle=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const esc=s=>String(s??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
function artSvg(card){
 const esc=s=>String(s||"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
 if(card.image){
  return '<div class="tarot-illustration meme-photo"><img src="'+esc(card.image)+'" alt="'+esc(card.name)+' meme image" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.classList.add(\'image-failed\');this.remove()"><a class="image-credit" href="'+esc(card.imageSource||"#")+'" target="_blank" rel="noopener noreferrer" aria-label="Open original image source">source</a></div>';
 }
 return '<div class="tarot-illustration"><span>'+esc(card.emoji||"🔮")+'</span></div>';
}
function makeDeck(){revealTimers.forEach(clearTimeout);revealTimers=[];deck=shuffle([...CARDS]);picked=[];renderFan();renderSlots();document.querySelector("#results").hidden=true;reveal.disabled=true;count.textContent="0 / 3 selected";document.querySelector("#stage-instruction").textContent="Take a breath, bes. Tap a card and choose three—trust the chismis of the cosmos."; }
function renderFan(){fan.innerHTML="";deck.forEach((card,index)=>{const b=document.createElement("button");b.className="tarot-card";b.type="button";b.setAttribute("aria-label",`Face-down tarot card ${index+1}`);b.dataset.index=index;b.addEventListener("click",()=>pickCard(card,b));fan.append(b);});}
function pickCard(card,button){if(picked.length>=3||picked.some(c=>c.id===card.id))return;picked.push(card);button.classList.add("picked");button.disabled=true;button.setAttribute("aria-label",`${card.name} selected`);renderSlots();count.textContent=`${picked.length} / 3 selected`;reveal.disabled=picked.length!==3;if(picked.length===3)document.querySelector("#stage-instruction").textContent="Tatlong baraha na. Naka-ready na ang group chat. 😂"; }
function renderSlots(){selectedRow.innerHTML=positions.map((p,i)=>{const card=picked[i];return card?'<div class="selected-preview"><span class="preview-position">'+esc(p)+'</span><div class="preview-card">'+artSvg(card)+'<b>'+esc(card.name)+'</b></div></div>':'<div class="selected-slot">'+esc(p)+'<b>Awaiting your pick…</b></div>';}).join("");}
shuffleBtn.addEventListener("click",()=>{fan.querySelectorAll(".tarot-card").forEach((c,i)=>{c.classList.remove("shuffle");void c.offsetWidth;c.style.animationDelay=`${i*12}ms`;c.classList.add("shuffle");});setTimeout(makeDeck,560);});
category.forEach(btn=>btn.addEventListener("click",()=>{category.forEach(x=>x.classList.remove("active"));btn.classList.add("active");chosenCategory=btn.dataset.category;}));
const categoryJokes={
love:[
["Ikaw na naman ang nagbubuhat ng usapan. Parang ikaw ang Wi-Fi: kapag nawala ka, wala ring connection.","Tigilan ang good morning sa taong good night lang ang ambag. Hindi ka alarm clock."],
["May pa-sweet sa chat pero pag usapang label, biglang under processing. Ilang working days pa ba, accla?","Tanungin kung ano kayo. Hindi ka forever naka-queue sa customer service."],
["Nagparamdam ang ex na parang subscription na nakalimutang i-cancel. Hello ngayon, vanish bukas.","I-archive ang chat kung puro rerun. Hindi kailangan ng bagong season ng lumang problema."],
["Ikaw ang laging nag-aadjust ng oras at lugar. Date ba ito o ikaw ang travel coordinator?","Hayaang siya naman ang magplano. Hindi ka event organizer ng sariling lovelife."],
["May kilig, pero mas mabilis ang heartbeat mo sa pag-check kung nag-view siya ng story kaysa sa actual na usapan.","Heart reaction lang 'yan, hindi marriage contract. Enjoy the kilig pero gamitin ang utak."],
["May selos na walang label at tampo na walang usapan. May season pass ka sa drama pero wala kang official role.","Linawin ang status. Hindi ka nag-a-audition para sa girlfriend/boyfriend position."],
["Puro pangako, walang follow-through. Parang trailer na paulit-ulit pero walang pelikula.","Tingnan ang gawa, hindi ang paragraph. Hindi commitment ang typing bubble."],
["Baka ikaw ang nag-iisip ng future habang siya nag-iisip kung anong ulam. Magkaiba kayo ng tab na bukas.","I-match ang effort. Huwag mong akuin pati role niya."]
],
career:[
["Ikaw ang taga-salo ng tasks habang ang iba taga-react ng thumbs up. Unofficial department mo na ang buong opisina.","Ibalik ang task sa may-ari. Hindi ka paid extra sa lahat ng department."],
["May boss o katrabahong mahilig sa 'quick favor' na umaabot ng kalahating araw. Quick para kanino?","Linawin ang priority at deadline bago umoo. Hindi lahat ng urgent ay trabaho mo."],
["Sweldo ang hinihintay mo pero bills ang unang nag-hi. Dumaan lang ang sahod para mag-attendance.","Unahin ang bills at budget. Hindi salary increase ang sale sa online shop."],
["May opportunity sa work pero kailangan ng output, hindi puro 'willing to learn' sa interview.","I-update ang resume at mag-apply. Hindi ka mapo-promote ng vision board."],
["Group project ang opisina: ikaw gumawa ng report, sila nag-present, lahat may credit. Aba, share naman sa labor.","I-document ang contributions at linawin ang roles. Hindi charity ang trabaho."],
["May meeting na puwedeng email na lang pero lahat kayo nakaupo habang binabasa ang agenda.","Humingi ng malinaw na next steps. Hindi attendance ang achievement."],
["May sideline na mukhang promising. Basahin muna ang terms bago mag-celebrate sa imaginary payout.","I-check ang legitimacy, oras, at bayad. Hindi lahat ng easy money ay easy."],
["Ang dami mong trabaho pero pang-isang tao lang ang job title. May hidden expansion pack ba ang contract?","Pag-usapan ang workload at scope. Hindi unlimited plan ang employment."]
],
chismis:[
["May nagkuwento ng 'secret' pero naka-CC ang buong barangay. Public announcement na, mhie.","Ihiwalay ang narinig sa may resibo. Huwag magkalat ng haka-haka."],
["Tahimik ang GC kapag may tanong pero buhay na buhay kapag may screenshot.","Huwag mag-forward ng private messages. Kausapin ang taong involved."],
["Mabait sa harap pero may sariling director's cut sa likod. Dalawang version ang teleserye.","Mag-observe muna. Hintayin ang buong kuwento, hindi teaser."],
["May parinig na may quote at black background. Sana nag-message na lang kaysa nag-premiere sa My Day.","Huwag patulan ang cryptic post. Kung kailangan, kausapin nang diretso."],
["Ikaw ang ginawang search engine, witness, at legal counsel. Wala bang honorarium?","Mag-share lang ng alam mong totoo. Hindi mo trabaho buuin ang puzzle."],
["Lumaki ang issue dahil may nagdagdag ng 'sabi raw'. Isang chika, limang narrator, sampung plot twist.","I-check ang source. Ang 'sabi raw' ay hindi resibo."],
["Biglang sweet ang kaibigan kapag may kailangan. Parang pop-up ad na may hinihinging favor.","Pansinin kung mutual ang friendship. Hindi ka help desk."],
["Parehong may screenshot ang dalawang kampo pero parehong cropped. Nasaan ang full context?","Humingi ng buong context. Huwag maglabas ng verdict sa kalahating resibo."]
],
general:[
["May plano kang maging productive pero nauwi sa paghiga habang hawak ang phone. Consistent ang attendance sa kama.","Pumili ng isang maliit na gawain at tapusin. Hindi kailangang ayusin ang buong buhay ngayong gabi."],
["Sweldo o allowance pa lang, may bills nang nakaabang sa pinto. Family reunion ng due dates mo.","Unahin ang essentials at magtabi kahit kaunti. Huwag ubusin sa budol."],
["May kamag-anak na may tanong tungkol sa buhay mo na parang quarterly performance review sa hapag-kainan.","Maghanda ng maikling sagot at palitan ang topic. Hindi public property ang timeline mo."],
["Tatlong errands ang kailangan pero pang-isang tricycle ride lang ang energy mo. Adulting, bes.","Isa-isahin ang kailangan. Hindi ka robot na may fast-charge."],
["May bibilhin ka raw na kailangan pero nasa cart na ang tatlong bagay na di mo alam saan gagamitin.","Maghintay bago mag-checkout. Iwan ang budol sa cart hanggang bukas."],
["May labada na may sariling ecosystem at pinggan na parang may reunion sa lababo.","Pumili ng isang area at simulan doon. Hindi kailangan ng full house makeover."],
["Gusto mong gumala pero mas gusto ng katawan mo ang kumot at walang kausap. Valid, mhie.","Magpahinga kung kailangan at mag-confirm nang maayos. Huwag mag-ghost ng plano."],
["Sabay-sabay ang gutom, init, traffic, at low battery. Triple threat ang Pilipinas.","Kumain, uminom ng tubig, saka magdesisyon. Huwag mag-resolve ng life crisis nang gutom."]
]};
function buildInterpretation(card,index,cat){
 const title=card.charotName||card.caption||"ANG GANAP";
 const bank=categoryJokes[cat]||categoryJokes.general;
 const pair=bank[(Number(card.id)||0)%bank.length];
 return {position:positions[index],categoryLine:categoryInfo[cat]?.label||"",interpretation:"Ang chika ng "+title+": "+pair[0],advice:pair[1],meaning:"",title,savage:""};
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
 const q=document.querySelector("#question").value.trim();
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
  article.innerHTML=`<button class="flip-card" type="button" aria-label="Flip card to reveal the reading"><span class="flip-inner"><span class="flip-face flip-front"><span class="front-art">${artSvg(card)}</span></span><span class="flip-face flip-back"><span class="back-position">${esc(positions[i])}</span><strong class="back-title">${esc(r.title)}</strong><span class="meaning-label">ETO ANG MEME READING, BES</span><span class="back-copy">${esc(r.interpretation)}</span><span class="meaning-label">HETO ANG RESBAK, BEH</span><span class="back-copy">${esc(r.advice)}</span><span class="flip-hint">TAP MO PARA SA CHIKA ↻</span></span></span></button>`;
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
document.querySelector("#new-reading-btn").addEventListener("click",()=>{makeDeck();document.querySelector("#question").value="";document.querySelector("#read").scrollIntoView({behavior:"smooth"});});
document.querySelector("#share-btn").addEventListener("click",async()=>{if(!lastReading)return;const text=`KANAL TAROT 🔮\n${lastReading.category}\n${lastReading.cards.map(c=>`${c.position}: ${c.name} — “${c.interpretation}” Resbak: ${c.advice}`).join("\n")}\n\n${lastReading.summary}\n\nAng sagot ay nasa Baraha bes. ✦`;try{if(navigator.share)await navigator.share({title:"My KANAL TAROT reading",text});else{await navigator.clipboard.writeText(text);document.querySelector("#share-status").textContent="Reading copied, bes! Paste it sa group chat. ✨";}}catch(e){if(e.name!=="AbortError")document.querySelector("#share-status").textContent="Sharing isn't available here—try copying the reading text."; }});
document.querySelector("#deck-grid").innerHTML=CARDS.map((c,i)=>`<article class="mini-card"><span class="mini-number">${c.arcana==="Minor Arcana"?(c.suit.toUpperCase()+" · "+c.number):((c.number??i)+" · MAJOR ARCANA")}</span><div class="mini-art">${artSvg(c)}</div><b>${c.name||"Unknown card"}</b><small>${c.caption||""}</small></article>`).join("");
const menu=document.querySelector(".menu-btn");menu.addEventListener("click",()=>{const nav=document.querySelector(".topbar");const open=nav.classList.toggle("menu-open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".topbar nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".topbar").classList.remove("menu-open");menu.setAttribute("aria-expanded","false");}));
document.querySelector("#year").textContent=new Date().getFullYear();
makeDeck();
}
