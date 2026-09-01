// AI Lab extension: Lesson 2 — Inside an AI Data Centre
(function(){
  const migrationKey='aiLabDataCentreLessonV1';

  // Insert the new lesson and shift the original lessons down by one.
  if(!lessons.some(l=>l.title==='Inside an AI Data Centre')){
    lessons.forEach(l=>{ if(l.id>=2) l.id+=1; });
    lessons.splice(1,0,{id:2,title:'Inside an AI Data Centre',short:'Compute, power & cooling',lead:'Follow an AI prompt into the physical computers that make AI possible.'});
  }

  // Shift section-video mappings to match the new lesson numbers.
  for(let i=9;i>=2;i--){ if(sectionVideos[i]){ sectionVideos[i+1]=sectionVideos[i]; delete sectionVideos[i]; } }

  defaultState.dataCentre={users:1000,task:'text',model:'medium',decision:'',reflection:''};
  if(!state.dataCentre) state.dataCentre={...defaultState.dataCentre};

  // Migrate locally saved progress once so existing demo progress still points to the right lessons.
  if(!localStorage.getItem(migrationKey)){
    if(Array.isArray(state.complete)) state.complete=state.complete.map(id=>id>=2?id+1:id);
    const shifted={}; Object.keys(state.lessonStep||{}).forEach(k=>{const n=Number(k);shifted[n>=2?n+1:n]=state.lessonStep[k]}); state.lessonStep=shifted;
    if(state.current>=2) state.current+=1;
    localStorage.setItem(migrationKey,'1');
    save();
  }

  // Add a data-centre question into the shared quiz bank.
  if(!quizBank.some(q=>String(q[0]).includes('data centres require cooling'))){
    quizBank.splice(8,0,['Why do AI data centres require cooling?',['Servers and processors convert electrical energy into heat while computing','Cooling makes internet cables longer','AI models only work below freezing','Cooling creates the training data'],0]);
  }

  // Updated lesson shell: 11 lessons and section videos through Lesson 10.
  shell=function(l,step,total,body,opts={}){
    if(step===0 && l.id>=3 && l.id<=10) body=sectionVideo(l.id)+body;
    const pct=Math.round(((step+1)/total)*100);
    studentView.innerHTML=`<article class="panel lesson-panel"><div class="lesson-top"><div><div class="eyebrow">Lesson ${l.id} of 11 • Mission ${step+1} of ${total}</div><h2>${l.title}</h2><p class="lead">${l.lead}</p></div><div class="mission-badge">${pct}%</div></div><div class="micro-progress"><span style="width:${pct}%"></span></div><div class="chunk-note">${isJunior()?'Small steps: complete this mission, check your thinking, then continue.':'Complete one focused task at a time. Your evidence saves as you go.'}</div><div class="lesson-body">${body}</div><div class="micro-actions"><button type="button" id="prevStep" class="secondary" ${step===0?'disabled':''}>← Back</button>${step<total-1?'<button type="button" id="nextStep" class="primary">Next mission →</button>':'<button type="button" id="finishLesson" class="primary">Finish lesson ✓</button>'}</div></article>`;
    const prev=document.getElementById('prevStep'); if(prev)prev.addEventListener('click',()=>setStep(l.id,step-1));
    const next=document.getElementById('nextStep'); if(next)next.addEventListener('click',()=>setStep(l.id,step+1));
    const finish=document.getElementById('finishLesson'); if(finish)finish.addEventListener('click',()=>completeLesson(l.id));
    if(opts.bind) setTimeout(opts.bind,0);
  };

  completeLesson=function(id){
    if(!state.complete.includes(id)) state.complete.push(id);
    if(id<11){state.current=id+1;state.lessonStep[state.current]=0}
    save();renderLesson();
  };

  window.renderDataCentre=function(l,s){
    const total=5,d=state.dataCentre;
    if(s===0)return shell(l,s,total,`<div class="mission-card spotlight"><span class="pill good">PHYSICAL AI</span><h3>Where does AI actually happen?</h3><p>When you type a prompt on an iPad, most of the heavy AI computation happens on computers in a <strong>data centre</strong>.</p><div class="dc-flow"><div>📱 Your device</div><b>→</b><div>🌐 Internet</div><b>→</b><div>🏢 Data centre</div><b>→</b><div>🖥️ GPUs / servers</div><b>→</b><div>💬 Response</div></div><div class="chunk-note"><strong>Think:</strong> What is happening inside the data centre while AI creates your answer?</div><p><a class="video-button" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=inside+AI+data+center+servers+GPUs+explained">Watch: inside an AI data centre ↗</a></p></div>`);
    if(s===1)return shell(l,s,total,`<div class="mission-card"><h3>⚙️ What are the computers doing?</h3><p>Your words are converted into <strong>tokens</strong> and numbers. GPUs perform enormous numbers of mathematical operations using the model's learned numerical parameters to calculate likely next tokens.</p><div class="grid three"><div class="card"><strong>1. INPUT</strong><p>Prompt → tokens/numbers.</p></div><div class="card"><strong>2. COMPUTE</strong><p>GPUs perform many calculations in parallel.</p></div><div class="card"><strong>3. OUTPUT</strong><p>The model repeatedly predicts tokens to construct a response.</p></div></div><div class="feedback"><strong>${isJunior()?'Years 7–8 version:':'Technical term:'}</strong> ${isJunior()?'Think of thousands of very fast calculators working together on patterns.':'Using an already-trained model to answer prompts is called inference. Training is the larger process used to adjust model parameters from data.'}</div></div>`);
    if(s===2)return shell(l,s,total,`<div class="mission-card"><h3>⚡ Why so much electricity?</h3><div class="grid two"><div class="card"><h4>🧮 Processing</h4><p>CPUs, GPUs and accelerators perform calculations.</p></div><div class="card"><h4>🧠 Memory + storage</h4><p>Model data is stored and moved rapidly.</p></div><div class="card"><h4>🌐 Networking</h4><p>Fast networks connect servers and processor clusters.</p></div><div class="card"><h4>❄️ Cooling</h4><p>Electrical equipment produces heat. Fans, pumps, chillers or liquid cooling move heat away.</p></div></div><div class="chunk-note"><strong>Key idea:</strong> intensive computation needs electrical energy and creates heat that must be managed.</div></div>`);
    if(s===3){
      const tf={text:1,image:2.3,video:4}[d.task],mf={small:.7,medium:1,large:1.7}[d.model];
      const load=Math.min(100,Math.round((Math.log10(Math.max(100,d.users))-1)*12*tf*mf)),heat=Math.min(100,Math.round(load*.88+8)),cool=Math.min(100,Math.round(load*.7+15));
      return shell(l,s,total,`<div class="mission-card"><h3>🎛️ Run a mini data-centre simulation</h3><p><strong>Classroom simulation:</strong> relative demand only, not a measurement of a real facility.</p><div class="field"><label>Simultaneous users: <strong>${d.users.toLocaleString()}</strong></label><input id="dcUsers" type="range" min="100" max="10000" step="100" value="${d.users}"></div><div class="field"><label>Model size</label><select id="dcModel"><option value="small" ${d.model==='small'?'selected':''}>Small</option><option value="medium" ${d.model==='medium'?'selected':''}>Medium</option><option value="large" ${d.model==='large'?'selected':''}>Large</option></select></div><div class="field"><label>Task</label><select id="dcTask"><option value="text" ${d.task==='text'?'selected':''}>Text</option><option value="image" ${d.task==='image'?'selected':''}>Image generation</option><option value="video" ${d.task==='video'?'selected':''}>Video generation</option></select></div><div class="dc-gauge"><strong>🖥️ Relative compute ${load}%</strong><div><span style="width:${load}%"></span></div></div><div class="dc-gauge"><strong>🌡️ Relative heat ${heat}%</strong><div><span style="width:${heat}%"></span></div></div><div class="dc-gauge"><strong>❄️ Relative cooling ${cool}%</strong><div><span style="width:${cool}%"></span></div></div></div>`,{bind:()=>{dcUsers.oninput=e=>{d.users=+e.target.value;save();renderLesson()};dcModel.onchange=e=>{d.model=e.target.value;save();renderLesson()};dcTask.onchange=e=>{d.task=e.target.value;save();renderLesson()}}});
    }
    return shell(l,s,total,`<div class="mission-card"><h3>🏗️ The engineering challenge</h3><p>Your community is considering a new AI data centre. It could support digital services and jobs, but needs reliable electricity, cooling, land and network infrastructure.</p><div class="choice-grid"><button type="button" class="choice" data-dc="renewables">Build near reliable low-carbon/renewable energy</button><button type="button" class="choice" data-dc="efficient">Require efficient processors and cooling</button><button type="button" class="choice" data-dc="heat">Explore reuse of waste heat</button><button type="button" class="choice" data-dc="no">Do not build it</button></div><div class="field"><label>Should it be built? What conditions would you require?</label><textarea id="dcReflection">${esc(d.reflection)}</textarea></div><div class="feedback good"><strong>Future skill: DECIDE.</strong> Consider benefits, electricity source, efficiency, cooling, water where relevant, grid capacity and community impacts.</div></div>`,{bind:()=>{document.querySelectorAll('[data-dc]').forEach(b=>b.onclick=()=>{d.decision=b.dataset.dc;save()});dcReflection.oninput=e=>{d.reflection=e.target.value;save()}}});
  };

  renderLesson=function(){
    teacherView.classList.add('hidden');studentView.classList.remove('hidden');
    const l=lessons.find(x=>x.id===state.current),s=stepFor(l.id);
    if(l.id===1)return renderIntro(l,s); if(l.id===2)return renderDataCentre(l,s); if(l.id===3)return renderBuild(l,s); if(l.id===4)return renderTeach(l,s); if(l.id===5)return renderPrompt(l,s); if(l.id===6)return renderBreak(l,s); if(l.id===7)return renderBias(l,s); if(l.id===8)return renderEthics(l,s); if(l.id===9)return renderImprove(l,s); if(l.id===10)return renderFinal(l,s); if(l.id===11)return renderReport(l,s);
  };

  // Add infrastructure/sustainability evidence to the generated Student Evidence response.
  const oldStudentEvidenceBody=studentEvidenceBody;
  studentEvidenceBody=function(){
    let html=oldStudentEvidenceBody();
    const insert=`<h3>6. AI infrastructure and sustainability</h3><p>${esc(state.dataCentre.reflection||'Explain what happens in a data centre when AI is used, why computing requires electricity and cooling, and one way impacts could be reduced.')}</p>`;
    html=html.replace('<h3>6. Bias and ethical considerations</h3>',insert+'<h3>7. Bias and ethical considerations</h3>');
    html=html.replace('<h3>7. Evaluation</h3>','<h3>8. Evaluation</h3>').replace('<h3>8. AI and my future</h3>','<h3>9. AI and my future</h3>');
    return html;
  };

  renderTeacher=function(){
    studentView.classList.add('hidden');teacherView.classList.remove('hidden');const pct=Math.round(state.complete.length/11*100);
    teacherView.innerHTML=`<article class="panel"><div class="eyebrow">Teacher dashboard — MVP</div><h2>AI Lab progress</h2><p class="lead">Tracks lesson completion and the current micro-mission.</p><div class="grid three"><div class="metric"><strong>${pct}%</strong><span>Overall completion</span></div><div class="metric"><strong>${state.vulnerabilities.length}</strong><span>Tests logged</span></div><div class="metric"><strong>${state.finalScore?.overall||'—'}${state.finalScore?'%':''}</strong><span>Reliability score</span></div></div><div class="card"><h3>${esc(state.studentName)} — Year ${esc(state.yearLevel)}</h3><div class="table-wrap"><table><thead><tr><th>Lesson</th><th>Current mission</th><th>Status</th></tr></thead><tbody>${lessons.map(x=>`<tr><td>${x.id}. ${x.title}</td><td>${(state.lessonStep[x.id]||0)+1}</td><td>${state.complete.includes(x.id)?'<span class="pill good">Complete</span>':'<span class="pill">In progress</span>'}</td></tr>`).join('')}</tbody></table></div></div></article>`;
  };

  const style=document.createElement('style');
  style.textContent='.dc-flow{display:flex;align-items:center;justify-content:center;gap:.6rem;flex-wrap:wrap;margin:1.2rem 0}.dc-flow>div{padding:.8rem;border:1px solid var(--line);border-radius:12px;background:var(--panel);font-weight:700}.dc-gauge{margin:1rem 0}.dc-gauge>div{height:16px;background:var(--line);border-radius:999px;overflow:hidden;margin-top:.35rem}.dc-gauge span{display:block;height:100%;background:var(--accent);border-radius:999px;transition:width .2s}';
  document.head.appendChild(style);
  renderNav();renderProgress();renderLesson();
})();
