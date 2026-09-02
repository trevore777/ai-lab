// AI Lab extension: in-app video worksheets
(function(){
  // Requested replacement for Lesson 3 (Build Your AI).
  if(sectionVideos[3]){
    sectionVideos[3].title='Build Your AI — video introduction';
    sectionVideos[3].source='YouTube';
    sectionVideos[3].length='Watch the first 10 minutes';
    sectionVideos[3].url='https://www.youtube.com/watch?v=4t6Vp7uJk_0';
    sectionVideos[3].watchFor='While watching, identify what AI does, what information it needs, and one limitation or risk that people should check.';
  }

  defaultState.videoWorksheets={};
  if(!state.videoWorksheets) state.videoWorksheets={};

  const worksheets={
    1:{title:'What is AI? — Video Worksheet',questions:[
      ['short','In your own words, what is artificial intelligence?'],
      ['short','Write one example of AI from the video or from everyday life.'],
      ['choice','Which description best matches AI?',['A tool that can use patterns in data to produce predictions or outputs','A computer that is always correct','Any device that uses electricity'],0],
      ['short','What is one thing a human should check when using AI?'],
      ['short','ASK + CHECK: Write one question you still have about AI.']
    ]},
    2:{title:'Inside an AI Data Centre — Video Worksheet',questions:[
      ['short','What is a data centre?'],['short','Name two types of equipment you might find inside a data centre.'],
      ['choice','Why do servers need cooling?',['They produce heat while computing','The internet only works in cold rooms','Cooling creates training data'],0],
      ['short','Why can AI require a large amount of computing power?'],['short','DECIDE: Suggest one way a data centre could reduce its environmental impact.']
    ]},
    3:{title:'Build Your AI — First 10 Minutes Worksheet',questions:[
      ['short','What is one main idea about AI explained in the first 10 minutes?'],
      ['short','What information, data or instructions does an AI system need to produce a useful result?'],
      ['short','Record one example of AI mentioned or demonstrated in the video.'],
      ['short','What is one limitation, error or risk that a person should be aware of when using AI?'],
      ['short','How is an AI system different from a program that only follows fixed rules?'],
      ['short','Write one new AI term from the video and explain what you think it means.'],
      ['short','APPLY: What job will your AI assistant do, and what information will it need?']
    ]},
    4:{title:'Teach Your AI — Video Worksheet',questions:[
      ['short','Why does the information supplied to an AI affect its response?'],['short','What makes a source trustworthy?'],
      ['choice','What should an AI do when reliable information is missing?',['State uncertainty or ask for more information','Invent a likely fact','Hide the problem'],0],
      ['short','Give one example of knowledge your AI assistant would need.'],['short','CHECK: How could you verify that knowledge?']
    ]},
    5:{title:'Prompt Engineering — Video Worksheet',questions:[
      ['short','What is a prompt?'],['short','Why does adding context usually improve a prompt?'],
      ['choice','Which prompt is more useful?',['Tell me stuff','Act as a revision coach and create five Year 9 questions about renewable energy with answers'],1],
      ['short','Identify one constraint you could add to a prompt.'],['short','CREATE: Write one improved prompt for your AI assistant.']
    ]},
    6:{title:'AI Mistakes — Video Worksheet',questions:[
      ['short','What does it mean when an AI hallucinates?'],['short','Why can an incorrect AI answer still sound convincing?'],
      ['choice','What is the safest response to an important AI claim?',['Check it using reliable evidence','Assume confidence means accuracy','Share it immediately'],0],
      ['short','Describe one way you could deliberately test an AI for mistakes.'],['short','CHALLENGE: What evidence would convince you an answer is reliable?']
    ]},
    7:{title:'Bias in AI — Video Worksheet',questions:[
      ['short','What does bias mean in an AI system?'],['short','How can training data contribute to unfair results?'],
      ['choice','Which action can help identify bias?',['Test the system with varied examples and compare outcomes','Only test one easy example','Ignore unexpected results'],0],
      ['short','Give one situation where biased AI could affect people.'],['short','DECIDE: What should humans do if an AI system appears unfair?']
    ]},
    8:{title:'Responsible AI — Video Worksheet',questions:[
      ['short','Identify one principle of responsible AI.'],['short','Why does privacy matter when using AI?'],
      ['choice','Who should remain accountable for a high-impact decision supported by AI?',['A responsible human or organisation','Nobody','The computer hardware'],0],
      ['short','Give one example where human oversight is important.'],['short','Write one responsible-use rule for your AI assistant.']
    ]},
    9:{title:'AI Safeguards — Video Worksheet',questions:[
      ['short','What is an AI safeguard or guardrail?'],['short','Give one example of a safeguard.'],
      ['choice','What should happen after adding a safeguard?',['Retest the system','Assume it can never fail','Stop recording evidence'],0],
      ['short','Which weakness in your AI would you most like to reduce?'],['short','IMPROVE: Describe the change you would make.']
    ]},
    10:{title:'Testing AI — Video Worksheet',questions:[
      ['short','Why is one successful test not enough to prove an AI is reliable?'],['short','What kinds of normal and unusual inputs should be tested?'],
      ['choice','Which provides stronger evidence?',['A planned set of different tests','One question that worked','Asking the AI if it is reliable'],0],
      ['short','What evidence should be recorded during testing?'],['short','EVALUATE: What result would make you recommend or reject your AI for its intended purpose?']
    ]}
  };

  function ensureLesson(id){if(!state.videoWorksheets[id]) state.videoWorksheets[id]={answers:{},complete:false,score:null};return state.videoWorksheets[id]}
  function worksheetHtml(id){const w=worksheets[id];if(!w)return '';const d=ensureLesson(id);return `<div class="mission-card video-worksheet"><div class="worksheet-head"><div><span class="eyebrow">VIDEO WORKSHEET</span><h3>📝 ${esc(w.title)}</h3></div>${d.complete?'<span class="pill good">Complete ✓</span>':'<span class="pill">In progress</span>'}</div><p>Watch the video as directed, then answer these questions. Your answers save automatically on this iPad.</p>${w.questions.map((q,i)=>{const v=d.answers[i]??'';if(q[0]==='choice')return `<div class="worksheet-q"><strong>${i+1}. ${esc(q[1])}</strong>${q[2].map((o,j)=>`<label class="option"><input type="radio" name="vw${id}_${i}" value="${j}" ${String(v)===String(j)?'checked':''}> ${esc(o)}</label>`).join('')}</div>`;return `<div class="field worksheet-q"><label>${i+1}. ${esc(q[1])}</label><textarea data-vw-text="${id}:${i}" rows="3">${esc(v)}</textarea></div>`}).join('')}<button type="button" class="primary" data-vw-complete="${id}">${d.complete?'Worksheet complete ✓':'Mark worksheet complete'}</button><div class="chunk-note"><strong>Before continuing:</strong> make sure your answers show what you learned from the video, not just one-word responses.</div></div>`}
  function bindWorksheet(id){const d=ensureLesson(id);document.querySelectorAll(`[data-vw-text^="${id}:"]`).forEach(t=>t.oninput=e=>{const i=e.target.dataset.vwText.split(':')[1];d.answers[i]=e.target.value;save()});document.querySelectorAll(`input[name^="vw${id}_"]`).forEach(r=>r.onchange=e=>{const i=e.target.name.split('_')[1];d.answers[i]=e.target.value;save()});const b=document.querySelector(`[data-vw-complete="${id}"]`);if(b)b.onclick=()=>{d.complete=true;save();renderLesson()}}

  // Add worksheet below the video on the first mission of video-led lessons.
  const baseShell=shell;
  shell=function(l,step,total,body,opts={}){
    const hasWorksheet=step===0 && worksheets[l.id];
    if(hasWorksheet) body=body+worksheetHtml(l.id);
    const oldBind=opts.bind;
    opts.bind=()=>{if(oldBind)oldBind();if(hasWorksheet)bindWorksheet(l.id)};
    return baseShell(l,step,total,body,opts);
  };

  // Lesson 1 inserts its video itself, so the worksheet still appears in Mission 1 via the wrapper above.
  // Data-centre Lesson 2 uses its own video/search card; its worksheet is likewise attached to Mission 1.

  const style=document.createElement('style');style.textContent='.video-worksheet{margin-top:1rem}.worksheet-head{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start}.worksheet-q{padding:1rem 0;border-bottom:1px solid var(--line)}.worksheet-q:last-of-type{border-bottom:0}.video-worksheet textarea{min-height:78px}';document.head.appendChild(style);
  save();renderLesson();
})();