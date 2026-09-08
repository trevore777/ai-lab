// AI Lab extension: Year 7-8 foundations and researched opening videos
(function(){
  const junior=()=>String(state.yearLevel)==='7'||String(state.yearLevel)==='8';

  // Researched opening video choices.
  if(sectionVideos[1]){
    sectionVideos[1].title='What Is AI? | Learn all about artificial intelligence';
    sectionVideos[1].source='Learn Bright';
    sectionVideos[1].length='Short introduction';
    sectionVideos[1].url='https://www.youtube.com/watch?v=JcXKbUIebrU';
    sectionVideos[1].watchFor='Listen for everyday examples such as Siri or Alexa, and for the ideas of data/information and problem solving.';
  }

  // Lesson 2 previously used a YouTube search. Replace it with Google Data Centers' short animated explainer.
  const originalRenderDataCentre=window.renderDataCentre;
  window.renderDataCentre=function(l,s){
    if(s!==0)return originalRenderDataCentre(l,s);
    const total=5;
    return shell(l,s,total,`<div class="mission-card spotlight"><span class="pill good">PHYSICAL AI</span><h3>${junior()?'Where does your AI question go?':'Where does AI actually happen?'}</h3>${junior()?`<div class="junior-story"><h4>Imagine this:</h4><p>You ask an AI on your iPad: <strong>“Give me three ideas for a recycling poster.”</strong></p><p>Your iPad does not do all of the hard AI work by itself. It sends the request across the internet to powerful computers in a <strong>data centre</strong>. Those computers process the request and send an answer back.</p></div>`:`<p>When you type a prompt on an iPad, most of the heavy AI computation happens on computers in a <strong>data centre</strong>.</p>`}<div class="dc-flow"><div>📱 1. Ask</div><b>→</b><div>🌐 2. Send</div><b>→</b><div>🏢 3. Compute</div><b>→</b><div>💬 4. Answer</div></div><div class="junior-example"><strong>Real-life connection:</strong> Streaming a video, saving a cloud document, playing an online game and asking an online AI all rely on computers somewhere else.</div><div class="video-card"><span class="eyebrow">WATCH • SHORT ANIMATED EXPLAINER</span><h3>What is a data center?</h3><p><strong>Google Data Centers</strong></p><p>Watch for three things: <strong>computers/servers, electricity and cooling.</strong></p><a class="video-button" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=Amow8BJm5Go">Watch video on YouTube ↗</a></div></div>`);
  };

  // Add a junior primer before the existing Lesson 1 content. This deliberately uses concrete examples before terminology.
  const oldRenderIntro=renderIntro;
  renderIntro=function(l,s){
    if(!junior())return oldRenderIntro(l,s);
    if(s===0){
      return shell(l,s,5,`<div class="mission-card spotlight"><span class="pill good">START HERE</span><h3>AI is already around you</h3><p>Before learning a definition, look at these examples.</p><div class="grid two"><div class="card"><h4>🎵 Music suggestions</h4><p>A music app notices what you listen to and suggests songs you might like.</p></div><div class="card"><h4>📷 Photo search</h4><p>A photo app can find pictures of dogs, beaches or food without you naming every photo.</p></div><div class="card"><h4>🎮 Games</h4><p>A game can change what computer-controlled characters do depending on what happens.</p></div><div class="card"><h4>💬 Chatbots</h4><p>You type a question and the system creates a response based on patterns it learned.</p></div></div><div class="chunk-note"><strong>Simple idea:</strong> AI is software that uses information and patterns to help make a prediction, choice or new output.</div><div class="junior-story"><strong>Try this comparison:</strong><p>🧮 A calculator follows fixed maths rules. If you type 2 + 2, it follows the rule and gives 4.</p><p>🎵 A music recommender looks at patterns in listening data and predicts a song you may enjoy. It might be right — or wrong.</p></div></div>`);
    }
    if(s===1){
      return shell(l,s,5,`<div class="mission-card"><span class="eyebrow">SMALL CHUNK 2</span><h3>Three words to remember</h3><div class="grid three"><div class="card"><h4>1. INPUT 📥</h4><p>What goes in.</p><p><strong>Example:</strong> your question, a photo, a voice recording.</p></div><div class="card"><h4>2. PATTERN 🧩</h4><p>What the AI has learned to notice.</p><p><strong>Example:</strong> features often seen in pictures of cats.</p></div><div class="card"><h4>3. OUTPUT 📤</h4><p>What comes back.</p><p><strong>Example:</strong> “This picture probably contains a cat.”</p></div></div><div class="junior-example"><strong>Football example:</strong> Input = match statistics → patterns = what usually happens → output = a prediction about performance.</div><div class="junior-example"><strong>School example:</strong> Input = your prompt → patterns learned by the AI → output = a suggested explanation or set of ideas.</div></div>`);
    }
    if(s===2){
      return shell(l,s,5,`<div class="mission-card"><span class="eyebrow">SMALL CHUNK 3</span><h3>AI or ordinary computer rule?</h3><p>Ask yourself: <strong>Is it following a fixed rule, or using patterns to make a prediction/output?</strong></p><div class="grid two"><div class="card"><h4>⏰ Alarm at 7:00 am</h4><p><strong>Fixed rule.</strong> When the clock reaches 7:00, sound the alarm.</p></div><div class="card"><h4>📺 Video recommendations</h4><p><strong>AI-type system.</strong> It uses patterns from viewing behaviour to predict what may interest you.</p></div><div class="card"><h4>🚦 Pedestrian button</h4><p><strong>Fixed programmed behaviour.</strong> Pressing the button triggers a programmed sequence.</p></div><div class="card"><h4>🗣️ Speech recognition</h4><p><strong>AI.</strong> It uses learned patterns to work out which words were spoken.</p></div></div><div class="chunk-note">Important: <strong>not everything on a computer is AI.</strong></div></div>`);
    }
    if(s===3){
      return shell(l,s,5,`<div class="mission-card"><span class="eyebrow">SMALL CHUNK 4 • WATCH</span><h3>Now watch the idea in a video</h3><p><strong>Learn Bright — What Is AI?</strong></p><p>While watching, listen for:</p><div class="grid three"><div class="card">👂 One everyday AI example</div><div class="card">📚 Why information/data matters</div><div class="card">⚠️ One reason people still need to think and check</div></div><p><a class="video-button" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=JcXKbUIebrU">Watch What Is AI? ↗</a></p><div class="chunk-note">You do not need to remember every technical word. Focus on the big idea: <strong>information + patterns + a useful output.</strong></div></div>`);
    }
    return shell(l,s,5,`<div class="mission-card"><span class="eyebrow">SMALL CHUNK 5 • CHECK</span><h3>Can you explain it simply?</h3><div class="junior-story"><p>Imagine a Year 5 student asks you: <strong>“What is AI?”</strong></p><p>A useful answer might be: “AI is computer software that learns or uses patterns in information to make predictions or create useful outputs. It can be helpful, but it can make mistakes, so people still need to check it.”</p></div><div class="grid two"><div class="card"><h4>Remember</h4><p>AI can <strong>recognise, recommend, predict or generate</strong>.</p></div><div class="card"><h4>Also remember</h4><p>AI does not automatically <strong>know that its answer is true</strong>.</p></div></div><div class="feedback good"><strong>Ready for Lesson 2:</strong> Next you will find out where the powerful computers that run online AI actually live.</div></div>`);
  };

  const style=document.createElement('style');
  style.textContent='.junior-story,.junior-example{margin:1rem 0;padding:1rem 1.1rem;border:1px solid var(--line);border-radius:14px;background:var(--panel)}.junior-story p:last-child,.junior-example p:last-child{margin-bottom:0}.video-card{margin-top:1.2rem;padding:1.25rem;border-radius:16px;background:#111827;color:#f8fafc}.video-card p{color:#d7deea}.video-card .eyebrow{color:#8b7cff}';
  document.head.appendChild(style);
  renderLesson();
})();