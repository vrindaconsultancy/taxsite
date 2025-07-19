 // fade reveal
 const observer=new IntersectionObserver(entries=>{
   entries.forEach(e=>{
     if(e.isIntersecting){
       e.target.classList.add('show');
       observer.unobserve(e.target);
     }
   });
 },{threshold:.2});
 document.querySelectorAll('.fade').forEach(el=>observer.observe(el));
-document.querySelectorAll('.fade').forEach(el=>el.classList.add('show'));   // ← delete this
+
+// FORCE the hero to show on load
+document.getElementById('home').querySelectorAll('.fade')
+        .forEach(el=>el.classList.add('show'));

// live Indian comma formatting
const incomeInput=document.getElementById('income');
if(incomeInput){
  incomeInput.addEventListener('input',e=>{
    const pos=e.target.selectionStart;
    const raw=e.target.value.replace(/,/g,'');
    const formatted = raw ? Number(raw).toLocaleString('en-IN') : '';
    const diff = formatted.length - e.target.value.length;
    e.target.value=formatted;
    const newPos = Math.max(pos+diff,0);
    e.target.setSelectionRange(newPos,newPos);
  });
}

// burger toggle
const burger=document.getElementById('burger');
const overlay=document.getElementById('overlay');
if(burger){
  burger.addEventListener('click',()=>burger.parentElement.classList.toggle('open'));
  overlay.addEventListener('click',()=>burger.parentElement.classList.remove('open'));
}

// fade reveal
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');observer.unobserve(e.target);}})
},{threshold:.2});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));
document.querySelectorAll('.fade').forEach(el=>el.classList.add('show'));

// calculator
function indianFormat(n){return n.toLocaleString('en-IN');}

const cats=[
  {limit:200000,msg:"😸 No tax due! ✔️ Tap the button and we'll double‑check you’re not missing a single rupee."},
  {limit:Number.MAX_SAFE_INTEGER,msg:"😿 Yikes! Tax bite. Hit ‘Talk to a Pro’ — we’ll walk you through smart deductions that cut it down."}
];

function runCalc(){
  const raw=document.getElementById('income').value.replace(/,/g,'');
  const income=parseFloat(raw)||0;
  if(!income){document.getElementById('calc-out').textContent='Enter income to begin 🐾';return;}
  let tax=0;
  if(income>1000000){tax+=(income-1000000)*0.30;tax+=500000*0.20;tax+=250000*0.05;}
  else if(income>500000){tax+=(income-500000)*0.20;tax+=250000*0.05;}
  else if(income>250000){tax+=(income-250000)*0.05;}
  tax+=tax*0.04;
  const bracket=cats.find(c=>tax<=c.limit);
  document.getElementById('calc-out').innerHTML=
    `<span class="cat-emoji">${bracket.msg.split(' ')[0]}</span>${bracket.msg.split(' ').slice(1).join(' ')}<br>
     <strong>Estimated Tax: ₹${indianFormat(Math.round(tax))}</strong><br>
     <button class="cta" style="margin-top:14px" onclick="location.href='tel:+919779463824'">Talk to a Pro</button>`;
  document.getElementById('income').value=indianFormat(income);
}
