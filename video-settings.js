// AI Lab teacher-editable video URL settings
(function(){
  const PIN='7777';
  const STORAGE_KEY='aiLabVideoUrls';
  const defaults={
    1:'https://www.youtube.com/watch?v=JcXKbUIebrU',
    2:'https://www.youtube.com/watch?v=Amow8BJm5Go',
    3:'https://www.youtube.com/watch?v=4t6Vp7uJk_0'
  };
  for(let i=4;i<=10;i++) if(sectionVideos[i]?.url) defaults[i]=sectionVideos[i].url;

  function loadUrls(){
    try{return {...defaults,...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}}catch{return {...defaults}}
  }
  let urls=loadUrls();

  function applyUrls(){
    for(let i=1;i<=10;i++){
      if(sectionVideos[i] && urls[i]) sectionVideos[i].url=urls[i];
    }
  }
  applyUrls();

  function patchVisibleVideoLinks(){
    const id=Number(state.current);
    if(!urls[id]) return;
    document.querySelectorAll('#studentView a.video-button').forEach(a=>a.href=urls[id]);
  }

  const baseRenderLesson=renderLesson;
  renderLesson=function(){
    applyUrls();
    const result=baseRenderLesson();
    setTimeout(patchVisibleVideoLinks,0);
    return result;
  };

  function validUrl(value){
    try{const u=new URL(value);return u.protocol==='https:'||u.protocol==='http:'}catch{return false}
  }

  function showSettings(){
    studentView.classList.add('hidden');
    teacherView.classList.remove('hidden');
    teacherView.innerHTML=`<article class="panel lesson-panel teacher-video-settings"><div class="lesson-top"><div><div class="eyebrow">TEACHER ONLY</div><h2>Video URL Settings</h2><p class="lead">Change the video used for each AI Lab lesson.</p></div><button id="videoSettingsExit" class="secondary">Return to Student View</button></div><div class="chunk-note"><strong>Important:</strong> these changes are saved in this browser only. They are useful for testing and presenting from this device. To make a replacement permanent for every student device, the new URL still needs to be saved into the deployed app.</div><div class="video-settings-list">${Array.from({length:10},(_,k)=>k+1).map(id=>`<div class="mission-card video-setting-row"><div><strong>Lesson ${id}: ${esc((lessons.find(l=>l.id===id)||{}).title||'Video')}</strong><small>Current video URL</small></div><input type="url" data-video-url="${id}" value="${esc(urls[id]||'')}" placeholder="https://www.youtube.com/watch?v=..."><div class="video-setting-actions"><button type="button" class="secondary" data-test-video="${id}">Test video ↗</button><button type="button" class="ghost" data-reset-video="${id}">Reset</button></div></div>`).join('')}</div><div class="micro-actions"><button id="saveVideoSettings" class="primary">Save video URLs</button></div><div id="videoSettingsStatus" class="feedback">Edit any URL, then save.</div></article>`;

    document.getElementById('videoSettingsExit').onclick=()=>{teacherView.classList.add('hidden');studentView.classList.remove('hidden');renderLesson()};
    document.querySelectorAll('[data-test-video]').forEach(b=>b.onclick=()=>{const id=b.dataset.testVideo;const input=document.querySelector(`[data-video-url="${id}"]`);if(validUrl(input.value.trim()))window.open(input.value.trim(),'_blank','noopener');else alert('Please enter a valid web address first.')});
    document.querySelectorAll('[data-reset-video]').forEach(b=>b.onclick=()=>{const id=b.dataset.resetVideo;document.querySelector(`[data-video-url="${id}"]`).value=defaults[id]||''});
    document.getElementById('saveVideoSettings').onclick=()=>{
      const next={};let bad=false;
      document.querySelectorAll('[data-video-url]').forEach(input=>{const v=input.value.trim();if(v&&!validUrl(v)){bad=true;input.classList.add('bad-url')}else{input.classList.remove('bad-url');next[input.dataset.videoUrl]=v}});
      if(bad){videoSettingsStatus.className='feedback bad';videoSettingsStatus.textContent='One or more URLs are not valid. Check the highlighted fields.';return;}
      urls={...defaults,...next};localStorage.setItem(STORAGE_KEY,JSON.stringify(next));applyUrls();videoSettingsStatus.className='feedback good';videoSettingsStatus.textContent='Video URLs saved on this device ✓';
    };
  }

  function requestSettingsPin(){
    if(sessionStorage.getItem('aiLabTeacherUnlocked')==='1'){showSettings();return;}
    const entered=window.prompt('Teacher PIN');
    if(entered===null)return;
    if(entered===PIN){sessionStorage.setItem('aiLabTeacherUnlocked','1');showSettings()}else alert('Incorrect PIN.');
  }

  const settingsButton=document.createElement('button');
  settingsButton.type='button';settingsButton.id='videoSettingsBtn';settingsButton.className='secondary';settingsButton.textContent='Video Settings';settingsButton.onclick=requestSettingsPin;
  const actions=document.querySelector('.sidebar-actions');if(actions)actions.appendChild(settingsButton);

  const style=document.createElement('style');
  style.textContent='.teacher-video-settings{max-width:1050px}.video-settings-list{display:grid;gap:.85rem;margin-top:1rem}.video-setting-row{display:grid;grid-template-columns:minmax(180px,.8fr) minmax(320px,2fr) auto;gap:1rem;align-items:center;margin:0}.video-setting-row small{display:block;margin-top:.25rem;color:var(--muted)}.video-setting-row input{width:100%}.video-setting-actions{display:flex;gap:.5rem}.bad-url{border-color:#c0392b!important;box-shadow:0 0 0 2px rgba(192,57,43,.12)}@media(max-width:850px){.video-setting-row{grid-template-columns:1fr}.video-setting-actions{flex-wrap:wrap}}';
  document.head.appendChild(style);
  setTimeout(()=>{applyUrls();patchVisibleVideoLinks()},0);
})();