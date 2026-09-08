// AI Lab teacher exemplar centre
(function(){
  const PIN='7777';
  const exemplarSets=[
    {lesson:'Lesson 1 — What is AI?',answers:[
      ['In your own words, what is artificial intelligence?','AI is software that uses data and patterns to make predictions, choices or new outputs.'],
      ['Write one example of AI from the video or everyday life.','A music recommendation system that suggests songs based on listening patterns.'],
      ['Which description best matches AI?','A tool that can use patterns in data to produce predictions or outputs.'],
      ['What is one thing a human should check when using AI?','Check important facts because AI can give confident but incorrect answers.'],
      ['ASK + CHECK: Write one question you still have about AI.','How does an AI learn patterns from examples?']
    ]},
    {lesson:'Lesson 2 — Inside an AI Data Centre',answers:[
      ['What is a data centre?','A building that contains many powerful computers and networking equipment used to store, process and move digital information.'],
      ['Name two types of equipment you might find inside a data centre.','Servers and networking equipment.'],
      ['Why do servers need cooling?','They produce heat while computing.'],
      ['Why can AI require a large amount of computing power?','AI can involve many calculations and many users at the same time, so powerful processors may need to work continuously.'],
      ['Suggest one way a data centre could reduce its environmental impact.','Use low-carbon electricity and energy-efficient cooling and processors.']
    ]},
    {lesson:'Lesson 3 — Build Your Small AI',answers:[
      ['What are students building?','A small classroom AI assistant/simulation with one clear job, selected information and behaviour rules — not a large model like ChatGPT.'],
      ['Example job','Recycling Helper: answer simple recycling questions using only the supplied recycling facts.'],
      ['Example audience and style','Years 7–8; friendly and concise.'],
      ['Example rules','Stay on topic; use only supplied facts; ask when information is missing; do not invent facts; say when unsure.'],
      ['Example suitable question','Can an aluminium can go in recycling?'],
      ['Example unsuitable question','Who is the best football player? — this is outside the Recycling Helper’s job.']
    ]},
    {lesson:'Lesson 4 — Teach Your AI: Good Data vs Bad Data',answers:[
      ['Why does the information supplied to an AI affect its response?','The AI uses the information available to produce an answer, so incomplete, incorrect or misleading information can lead to poorer outputs.'],
      ['What makes a source trustworthy?','It is current, relevant, evidence-based and produced by a reliable organisation or expert.'],
      ['What should an AI do when reliable information is missing?','State uncertainty or ask for more information rather than inventing an answer.'],
      ['Example of knowledge the Recycling Helper needs','Aluminium cans can be recycled through many council recycling programs.'],
      ['How could you verify that knowledge?','Check the local council recycling guide or another reliable official source.'],
      ['What does the good-vs-bad data test demonstrate?','Keeping the same question and rules but changing the data can change the quality of the answer.']
    ]},
    {lesson:'Lesson 5 — Prompt Engineering',answers:[
      ['What is a prompt?','The instruction or question given to an AI.'],
      ['Why does adding context improve a prompt?','It helps the AI understand the situation, audience and exact task.'],
      ['Which prompt is stronger?','Act as a revision coach and create five Year 9 questions about renewable energy with answers.'],
      ['Example constraint','Use no more than 100 words and language suitable for Year 8.'],
      ['Example improved prompt','Act as a Year 8 revision coach. Explain renewable energy in 80–100 words, use simple language and finish with three quiz questions.']
    ]},
    {lesson:'Lesson 6 — AI Mistakes / Break Your AI',answers:[
      ['What does it mean when an AI hallucinates?','It produces information that sounds plausible but is incorrect or unsupported.'],
      ['Why can an incorrect answer sound convincing?','The system is designed to produce fluent patterns of language; fluency does not guarantee truth.'],
      ['Safest response to an important AI claim','Check it using reliable evidence.'],
      ['One way to deliberately test an AI','Ask a question containing a false assumption and see whether the AI corrects it or accepts it.'],
      ['Evidence that would increase confidence','Agreement with reliable independent sources and successful results across several planned tests.']
    ]},
    {lesson:'Lesson 7 — Bias in AI',answers:[
      ['What does bias mean in an AI system?','A systematic tendency to produce unfair, unbalanced or distorted outcomes.'],
      ['How can training data contribute to unfair results?','If groups or situations are missing or poorly represented, the system may learn patterns that work better for some people than others.'],
      ['How can you identify possible bias?','Test the system with varied examples and compare the outcomes.'],
      ['Example where biased AI could affect people','Job applicant shortlisting.'],
      ['What should humans do if an AI appears unfair?','Investigate the cause, improve the data/system, retest it and keep responsible human oversight.']
    ]},
    {lesson:'Lesson 8 — Responsible AI',answers:[
      ['One responsible AI principle','Privacy.'],
      ['Why does privacy matter?','AI systems should not collect or expose personal information unnecessarily.'],
      ['Who remains accountable for high-impact decisions?','A responsible human or organisation.'],
      ['Example requiring human oversight','Final decisions about student grades, employment or medical treatment.'],
      ['Example responsible-use rule','Do not request personal information and tell the user when an answer is uncertain.']
    ]},
    {lesson:'Lesson 9 — Improve Your AI',answers:[
      ['What is a safeguard or guardrail?','A rule, process or technical control intended to reduce unwanted or unsafe AI behaviour.'],
      ['Example safeguard','If reliable information is missing, say you are unsure rather than inventing a fact.'],
      ['What should happen after adding a safeguard?','Retest the system.'],
      ['Example weakness to reduce','The AI answers questions outside its intended topic.'],
      ['Example improvement','Add a rule requiring the assistant to refuse off-topic questions and then test several off-topic prompts.']
    ]},
    {lesson:'Lesson 10 — Final AI Test',answers:[
      ['Why is one successful test not enough?','One example does not show how the system behaves with different normal, unusual or difficult inputs.'],
      ['What inputs should be tested?','Expected questions, unclear questions, missing-information questions, false-premise questions and off-topic questions.'],
      ['Which provides stronger evidence?','A planned set of different tests.'],
      ['What evidence should be recorded?','The prompt/input, output, whether it passed, the problem found and any improvement made.'],
      ['When might you reject the AI?','If it repeatedly gives unsafe, inaccurate or unfair results for its intended purpose even after improvements.']
    ]},
    {lesson:'Lesson 11 — Investigation / Student Evidence',answers:[
      ['Example key learning','AI outputs depend on the task, instructions, information available and the way the system has been designed or trained.'],
      ['Example evaluation','My small classroom assistant worked well for simple recycling questions when it used the good data set, but poor data produced a confident and misleading answer.'],
      ['Example infrastructure statement','AI services may use data centres containing powerful processors. Computing uses electricity and produces heat, so cooling and energy choices affect environmental impact.'],
      ['Example final recommendation','Use the assistant only for its narrow purpose, keep reliable data, include safeguards and have a person check important answers.']
    ]}
  ];

  function copyText(text,button){navigator.clipboard?.writeText(text).then(()=>{const old=button.textContent;button.textContent='Copied ✓';setTimeout(()=>button.textContent=old,1200)}).catch(()=>{})}
  function lessonText(set){return set.lesson+'\n\n'+set.answers.map((a,i)=>`${i+1}. ${a[0]}\nExemplar: ${a[1]}`).join('\n\n')}
  function showExemplars(){
    studentView.classList.add('hidden');
    teacherView.classList.remove('hidden');
    teacherView.innerHTML=`<article class="panel lesson-panel teacher-exemplar-centre"><div class="lesson-top"><div><div class="eyebrow">TEACHER ONLY</div><h2>Teacher Exemplar Centre</h2><p class="lead">Suggested answers and examples to support classroom explanation. These are exemplars, not the only acceptable student responses.</p></div><button id="teacherExit" class="secondary">Return to Student View</button></div><div class="chunk-note"><strong>Year level:</strong> ${esc(state.yearLevel)}. For Years 7–8, use the examples as speaking prompts rather than expecting students to copy them word-for-word.</div>${exemplarSets.map((set,i)=>`<details class="mission-card teacher-exemplar" ${i<2?'open':''}><summary><strong>${esc(set.lesson)}</strong></summary><div class="teacher-answer-list">${set.answers.map((a,j)=>`<div class="quick-q"><strong>${j+1}. ${esc(a[0])}</strong><p><span class="pill good">EXEMPLAR</span> ${esc(a[1])}</p></div>`).join('')}</div><button class="secondary copy-lesson" data-copy="${i}">Copy this lesson exemplar</button></details>`).join('')}</article>`;
    document.getElementById('teacherExit').onclick=()=>{teacherView.classList.add('hidden');studentView.classList.remove('hidden');renderLesson()};
    document.querySelectorAll('.copy-lesson').forEach(b=>b.onclick=()=>copyText(lessonText(exemplarSets[+b.dataset.copy]),b));
  }

  function requestPin(){
    if(sessionStorage.getItem('aiLabTeacherUnlocked')==='1'){showExemplars();return;}
    const entered=window.prompt('Teacher PIN');
    if(entered===null)return;
    if(entered===PIN){sessionStorage.setItem('aiLabTeacherUnlocked','1');showExemplars();}
    else window.alert('Incorrect PIN.');
  }

  // Convenience classroom PIN only: client-side static sites cannot provide strong security.
  teacherToggle.textContent='Teacher Exemplars';
  teacherToggle.onclick=requestPin;

  const style=document.createElement('style');
  style.textContent='.teacher-exemplar-centre{max-width:1050px}.teacher-exemplar{margin-top:1rem}.teacher-exemplar summary{cursor:pointer;font-size:1.05rem}.teacher-answer-list{display:grid;gap:.75rem;margin:1rem 0}.teacher-answer-list .quick-q{margin:0}.teacher-answer-list .pill{margin-right:.45rem}.copy-lesson{margin-top:.25rem}';
  document.head.appendChild(style);
})();