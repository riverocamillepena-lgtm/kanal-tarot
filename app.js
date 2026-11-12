let CARDS=[];
fetch("cards.json?v=20261112-kanal-bardagulan-v7").then(r=>{if(!r.ok)throw new Error("Could not load tarot deck");return r.json();}).then(data=>{CARDS=data;initTarot();}).catch(()=>{document.querySelector("#stage-instruction").textContent="The baraha are taking a quick coffee break. Refresh to try again.";});
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
let chosenCategory="love",deck=[],picked=[],lastReading=null,revealTimers=[];
const shuffle=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function artSvg(card){
 const esc=s=>String(s||"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
 if(card.image){
  return '<div class="tarot-illustration meme-photo"><img src="'+esc(card.image)+'" alt="'+esc(card.name)+' meme image" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.classList.add(\'image-failed\');this.remove()"><a class="image-credit" href="'+esc(card.imageSource||"#")+'" target="_blank" rel="noopener noreferrer" aria-label="Open original image source">source</a></div>';
 }
 return '<div class="tarot-illustration"><span>'+esc(card.emoji||"🔮")+'</span></div>';
}
function makeDeck(){revealTimers.forEach(clearTimeout);revealTimers=[];deck=shuffle([...CARDS]);picked=[];renderFan();renderSlots();document.querySelector("#results").hidden=true;reveal.disabled=true;count.textContent="0 / 3 selected";document.querySelector("#stage-instruction").textContent="Take a breath, bes. Tap a card and choose three—trust the chismis of the cosmos."; }
function renderFan(){fan.innerHTML="";deck.forEach((card,index)=>{const b=document.createElement("button");b.className="tarot-card";b.type="button";b.setAttribute("aria-label",`Face-down tarot card ${index+1}`);b.dataset.index=index;b.addEventListener("click",()=>pickCard(card,b));fan.append(b);});}
function pickCard(card,button){if(picked.length>=3||picked.some(c=>c.id===card.id))return;picked.push(card);button.classList.add("picked");button.disabled=true;button.setAttribute("aria-label",`${card.name} selected`);renderSlots();count.textContent=`${picked.length} / 3 selected`;reveal.disabled=picked.length!==3;if(picked.length===3)document.querySelector("#stage-instruction").textContent="Three cards selected. The universe has entered the group chat."; }
function renderSlots(){selectedRow.innerHTML=positions.map((p,i)=>`<div class="selected-slot">${p}<b>${picked[i]?picked[i].name:"Awaiting your pick…"}</b></div>`).join("");}
shuffleBtn.addEventListener("click",()=>{fan.querySelectorAll(".tarot-card").forEach((c,i)=>{c.classList.remove("shuffle");void c.offsetWidth;c.style.animationDelay=`${i*12}ms`;c.classList.add("shuffle");});setTimeout(makeDeck,560);});
category.forEach(btn=>btn.addEventListener("click",()=>{category.forEach(x=>x.classList.remove("active"));btn.classList.add("active");chosenCategory=btn.dataset.category;}));
function buildInterpretation(card,index,cat){
 const name=card.name||"Itong baraha";
 const essence=String(card.essence||"").trim();
 const guidance=String(card.guidance||"").trim();
 const title=card.caption||("Ang ganap ni "+name);
 const roasts=[
  "Nag-start ka agad kahit wala pang terms and conditions. Kalma, hindi lahat ng pinto dapat pasukin.",
  "Ang dami mong talent, mhie. Sayang kung hanggang aesthetic notes app lang ang ambag.",
  "May kutob ka na, pero detective ka ba o gumagawa ka lang ng sariling teleserye?",
  "Ikaw ang nagbibigay ng alaga sa lahat. Sino ang mag-aalaga sa'yo, teh?",
  "Hindi ka CEO ng pagkatao ng ibang tao. Ibalik ang control freak sa packaging.",
  "May advice ang lahat, pati kapitbahay na hindi mo kilala. Piliin ang may utak at resibo.",
  "Kilig is temporary, consistency ang tunay na pogi. Huwag bumili ng trailer na walang pelikula.",
  "Ang bilis mong mag-move, parang may hinahabol na libreng pamasahe. May direksyon ba?",
  "Mabait ka, oo. Pero hindi ka basahan na may feelings, mhie.",
  "Nag-airplane mode ka na naman? Sige, basta huwag mong tawaging healing ang pag-iwas sa lahat.",
  "Plot twist na naman? Parang ikaw ang subscription ng universe sa drama.",
  "Resibo o wala. Hindi puwedeng 'trust me, bro' ang evidence sa buhay.",
  "Naka-loading ka, pero hindi ibig sabihin sira ka. Baka kailangan mo lang mag-restart.",
  "Tapos na ang season, teh. Huwag nang i-renew ang kontratang ikaw lang ang lugi.",
  "Hindi ka Swiss Army knife. Hindi lahat ng problema ikaw ang sasalo.",
  "Red flag na may LED lights, pero pinili mo pa ring i-follow. Gising, accla.",
  "Gumuho ang delulu condo mo. At least wala nang monthly amortization sa kasinungalingan.",
  "May liwanag sa dulo, bes. Huwag mo lang harangan ng sarili mong kalat.",
  "Overthink ka nang overthink, may writers' room ka na sa utak pero walang matinong script.",
  "Finally, may panalo! Screenshot mo, deserve mong ipamukha sa mga nang-down.",
  "Ilang beses ka na bang binalikan ng lesson na 'to? May loyalty card ka na yata.",
  "Achievement unlocked. Puwede nang magyabang nang konti, earned naman.",
  "May apoy ka, pero nasaan ang gawa? Hindi project ang pag-iisip ng project.",
  "Planning ka nang planning, beh. May deadline ba o pang-display lang ang vision board?",
  "May nasimulan ka na. Huwag mong iwan sa ere na parang ka-talking stage.",
  "May dahilan para mag-celebrate. Huwag hintaying may magbigay ng permission.",
  "Lahat gustong bida. Ikaw, gusto mo ba ng result o dagdag episode ng away?",
  "May recognition na possible. Huwag mong i-deny ang galing mo para lang humble kuno.",
  "Ipaglaban mo ang sarili mo, pero hindi bawat comment section kailangan mong gawing boxing ring.",
  "Sunod-sunod ang ganap. Paki-charge ang sarili bago ka tuluyang maging low-batt na marites.",
  "Pagod ka na, pero hindi ka kailangang maging security guard ng buong mundo.",
  "Ikaw na naman ang taga-buhat? May mga kamay din yang mga kasama mo, gamitin nila.",
  "Excited ka sa bagong idea. Sana hindi ito maging folder number 48 na 'final_final_v3'.",
  "Ang tapang mong sumugod. Sana may plano ka rin pagdating, hindi puro entrance.",
  "May dating ka, mhie. Gamitin sa sariling glow-up, hindi sa pag-aagawan ng spotlight.",
  "Leader ka, hindi megaphone. Hindi kailangang naka-all caps para sundin ka.",
  "May bagong kilig. Huwag munang maghanap ng wedding venue sa isang 'good morning'.",
  "Pareho kayong may feelings? Ay wow. Ngayon, pareho rin ba kayong marunong mag-effort?",
  "Lumabas ka naman sa bahay. Hindi lahat ng chika makukuha sa pag-stalk ng stories.",
  "Baka hindi ka cold, baka pagod ka lang sa paulit-ulit na kabobohan. Valid, mhie.",
  "Umiyak kung iiyak. Hindi ka press release na kailangang laging presentable.",
  "Nagparamdam ang past. Huwag agad mag-reply na parang may 24-hour promo.",
  "Ang daming choices, pero puro fantasy. Pumili base sa gawa, hindi sa imaginary wedding vows.",
  "Kung aalis ka, umalis nang may plano. Hindi kailangang gawing dramatic exit ang self-respect.",
  "May wish na natupad. Huwag mong sirain sa kakahanap ng bagong problema.",
  "Hindi lahat ng happy ending may matching surname. Minsan peace lang, panalo na.",
  "Cute ang apology, pero nasaan ang pagbabago? Hindi collectible ang sorry.",
  "Romantic ka nga, pero huwag mong gawing free trial ang standards mo.",
  "Empathy mo pang-unli. Pero hindi ka customer support ng buong barangay.",
  "Kalmado ka sa labas, pero sabihin mo rin ang kailangan mo. Hindi mind reader ang mga tao.",
  "May katotohanang gustong pumasok. Buksan ang pinto, huwag puro subtweet.",
  "Ayaw mong pumili? Sige, pero huwag kang magulat kung ang buhay ang pumili para sa'yo.",
  "Masakit ang truth, pero hindi ka naman ginawa para maging permanenteng tanga sa sitwasyon.",
  "Pahinga muna, mhie. Hindi ka required sumagot sa lahat ng taong walang ambag.",
  "Gusto mong manalo sa argumento, pero magkano ang peace of mind mo ngayon?",
  "Umaalis ka na sa gulo. Huwag mong isama ang buong GC sa evacuation.",
  "May tinatago o kulang ang kwento. Huwag magtiwala sa taong puro 'secret lang natin'.",
  "Hindi ka nakakulong sa sitwasyon; baka takot lang ang ginawang rehas.",
  "Alas-dose na, beh. Hindi ito oras para gumawa ng 17 alternate endings.",
  "Tapos na. Huwag nang mag-appeal sa taong matagal nang nag-file ng resignation sa buhay mo.",
  "Marami kang tanong, Sherlock. Pero huwag gawing background check ang first date.",
  "Mabilis ka kumilos, pero minsan utak mo naiwan sa loading screen.",
  "Matalas ka, mhie. Hindi kailangang gawing kutsilyo ang bawat sentence.",
  "Hindi porke tama ka, kailangan mong gawing courtroom ang bawat usapan.",
  "May chance kumita. Huwag ubusin sa checkout bago pa dumating ang sweldo.",
  "Multitasking ka nang multitasking, pati stress mo naka-premium subscription na.",
  "May team pala. I-delegate mo naman, hindi ka one-person production house.",
  "Nag-iipon ka o nagtatago sa takot? Magkaiba 'yon, accla.",
  "Hindi ka kulang bilang tao dahil kapos ang budget. Huwag mong i-gaslight ang sarili mo.",
  "Give and take dapat. Hindi ikaw ang GCash ng lahat ng tao.",
  "May progress kahit mabagal. Huwag mong hukayin ang tanim kada limang minuto.",
  "Practice makes better, mhie. Hindi sapat ang tutorial na naka-save pero never pinanood.",
  "Pinaghirapan mo 'yan. I-enjoy mo, hindi puro guilt ang kasama sa success.",
  "Mag-isip pangmatagalan. Hindi lahat ng deserve mo kailangang i-checkout today.",
  "Beginner ka pa lang, hindi ka failure. Huwag mong i-speedrun ang mastery.",
  "Hindi flashy pero consistent. Sana all, pati mga ka-talking stage mo ganyan.",
  "Alagaan ang pera at sarili. Hindi ka walking ayuda station.",
  "Mayaman sa potential, pero dapat may utak din sa paghawak ng resources."
 ];
 const id=Number.isInteger(card.id)?card.id:0;
 const savage=roasts[((id%roasts.length)+roasts.length)%roasts.length];
 const interpretation=essence||"Walang nakalagay na chika sa barahang ito—pakicheck ang card data.";
 const advice=guidance||"Walang advice na nakalagay. Huwag magdesisyon base sa hula lang.";
 return {position:positions[index],categoryLine:"",interpretation,advice,meaning:card.meaning||"",title,savage};
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
function renderResults(){
 reveal.disabled=true;
 revealTimers.forEach(clearTimeout);revealTimers=[];
 const info=categoryInfo[chosenCategory];
 const readerProfile=getReadingProfile();
 document.querySelector("#result-category").textContent=info.label+" · "+info.tone;
 const results=document.querySelector("#results");
 results.hidden=false;
 results.style.display="block";
 const host=document.querySelector("#result-cards");
 host.style.display="grid";
 host.innerHTML="";
 document.querySelector("#summary-text").textContent="";
 document.querySelector("#profile-reading-note").textContent=profileReadingNote(readerProfile,chosenCategory,1);
 const q=document.querySelector("#question").value.trim();
 document.querySelector("#question-echo").textContent=q?`Tanong mo: “${q}” — eto ang baraha’s two cents. Hindi ito court ruling, bes.`:"Disclaimer: tarot lang ito, hindi memo from the universe. Ikaw pa rin ang may final say.";
 lastReading=null;
 const status=document.createElement("p");
 status.className="reveal-status";
 status.setAttribute("role","status");
 status.textContent="Unang baraha muna. Pagkatapos nito, 5 seconds ang pagitan bago ang kasunod. Huminga ka muna, mhie. 😂";
 host.append(status);
 const revealOne=(i)=>{
  const card=picked[i];
  const r=buildInterpretation(card,i,chosenCategory);
  const article=document.createElement("article");
  article.className="result-card reveal-pending";
  article.innerHTML=`<div class="result-position">${esc(positions[i])}</div><div class="result-art">${artSvg(card)}</div><div><h3>${esc(r.title)}</h3><div class="actual-card-name">${esc(card.name)}</div><div class="meme-caption">“${esc(r.savage)}”</div></div><div class="meaning-label">ANO’NG KALAT ANG DALA NITO?</div><p>${esc(r.interpretation)}</p><div class="meaning-label">SAMPAL NG REALIDAD, WITH LOVE</div><p>${esc(r.advice)}</p>`;
  host.insertBefore(article,status);
  article.style.display="block";
  article.style.visibility="visible";
  requestAnimationFrame(()=>{article.classList.remove("reveal-pending");article.classList.add("reveal-in");});
  if(i<2){
   status.textContent=`Card ${i+1} of 3 revealed. Susunod na baraha in 5 seconds… wag magmadali, hindi 'to Shopee checkout. ⏳`;
   revealTimers.push(setTimeout(()=>revealOne(i+1),5000));
  }else{
   status.textContent="Kompleto na ang tatlong baraha. O ayan, lumabas na ang buong kalat. 😂";
   const summary='ETO ANG RESIBO NG TATLONG BARAHANG BINUNOT MO: '+picked.map((c,i)=>positions[i]+': '+c.name+' — '+c.essence).join(' | ')+' FINAL WORD: '+picked[2].guidance;
   document.querySelector("#summary-text").textContent=summary;
   lastReading={category:info.label,cards:picked.map((c,i)=>({name:c.name,position:positions[i],caption:c.caption,meaning:c.meaning,interpretation:buildInterpretation(c,i,chosenCategory).interpretation,advice:c.guidance})),summary,question:q};
  }
 };
 revealOne(0);
 results.hidden=false;
 results.style.display="block";
 results.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
}
reveal.addEventListener("click",renderResults);
document.querySelector("#new-reading-btn").addEventListener("click",()=>{makeDeck();document.querySelector("#question").value="";document.querySelector("#read").scrollIntoView({behavior:"smooth"});});
document.querySelector("#share-btn").addEventListener("click",async()=>{if(!lastReading)return;const text=`KANAL TAROT 🔮\n${lastReading.category}\n${lastReading.cards.map(c=>`${c.position}: ${c.name} — “${c.caption}”`).join("\n")}\n\n${lastReading.summary}\n\nAng sagot ay nasa Baraha bes. ✦`;try{if(navigator.share)await navigator.share({title:"My KANAL TAROT reading",text});else{await navigator.clipboard.writeText(text);document.querySelector("#share-status").textContent="Reading copied, bes! Paste it sa group chat. ✨";}}catch(e){if(e.name!=="AbortError")document.querySelector("#share-status").textContent="Sharing isn't available here—try copying the reading text."; }});
document.querySelector("#deck-grid").innerHTML=CARDS.map((c,i)=>`<article class="mini-card"><span class="mini-number">${c.arcana==="Minor Arcana"?(c.suit.toUpperCase()+" · "+c.number):((c.number??i)+" · MAJOR ARCANA")}</span><div class="mini-art">${artSvg(c)}</div><b>${c.name||"Unknown card"}</b><small>${c.caption||""}</small></article>`).join("");
const menu=document.querySelector(".menu-btn");menu.addEventListener("click",()=>{const nav=document.querySelector(".topbar");const open=nav.classList.toggle("menu-open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".topbar nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".topbar").classList.remove("menu-open");menu.setAttribute("aria-expanded","false");}));
document.querySelector("#year").textContent=new Date().getFullYear();
makeDeck();
}
