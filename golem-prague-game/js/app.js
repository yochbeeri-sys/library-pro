/* ===========================================================
   בְּעִקְבוֹת הַגּוֹלֶם וְגַלְגַּלֵּי הַשִּׁנַּיִם - לוֹגִיקַת הַמִּשְׂחָק
   =========================================================== */
(function () {
  let progress = GameStorage.load();
  let current = { stageIdx: null, riddleIdx: null, shuffled: null };

  const el = (sel) => document.querySelector(sel);
  const els = (sel) => Array.from(document.querySelectorAll(sel));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showScreen(id) {
    els('.screen').forEach((s) => s.classList.remove('active'));
    el('#' + id).classList.add('active');
  }

  function stageCompletedCount(stageIdx) {
    return progress[stageIdx].completed.filter(Boolean).length;
  }
  function isStageDone(stageIdx) {
    return stageCompletedCount(stageIdx) === 5;
  }
  function areAllStagesDone() {
    return progress.every((_, i) => isStageDone(i));
  }

  /* ── מסך הבית ── */
  function renderHome() {
    const wrap = el('#homeStages');
    wrap.innerHTML = '';

    const allDone = areAllStagesDone();
    el('#grandBanner').style.display = allDone ? 'block' : 'none';

    STAGES.forEach((stage, idx) => {
      const done = isStageDone(idx);
      const count = stageCompletedCount(idx);
      const card = document.createElement('div');
      card.className = 'stage-card' + (done ? ' done' : '');
      card.innerHTML = `
        ${done ? '<div class="stage-check">🌟</div>' : ''}
        <div class="stage-icon-circle">${Illustrations.stageIcon(stage.key)}</div>
        <div class="stage-card-text">
          <div class="stage-card-title">${stage.title}: ${stage.subtitle}</div>
          <div class="stage-card-sub">${stage.place}</div>
          <div class="stage-dots">
            ${new Array(5).fill(0).map((_, i) => `<span class="stage-dot${i < count ? ' filled' : ''}"></span>`).join('')}
          </div>
        </div>
      `;
      card.addEventListener('click', () => enterStage(idx));
      wrap.appendChild(card);
    });
  }

  /* ── כניסה לשלב ── */
  function enterStage(stageIdx) {
    current.stageIdx = stageIdx;
    const completed = progress[stageIdx].completed;
    let startIdx = completed.findIndex((c) => !c);
    if (startIdx === -1) {
      showStageSummary(stageIdx);
      return;
    }
    goToRiddle(stageIdx, startIdx);
  }

  function goToRiddle(stageIdx, riddleIdx) {
    current.stageIdx = stageIdx;
    current.riddleIdx = riddleIdx;
    const stage = STAGES[stageIdx];
    const riddle = stage.riddles[riddleIdx];
    current.shuffled = shuffle(riddle.options);

    el('#riddleScene').innerHTML = Illustrations.stageScene(stage.key);
    el('#riddlePlace').textContent = `${stage.title} · ${stage.place}`;
    el('#riddleText').textContent = riddle.q;
    el('#toast').textContent = '';
    el('#toast').classList.remove('show');

    const optWrap = el('#optionsList');
    optWrap.innerHTML = '';
    current.shuffled.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.t;
      btn.addEventListener('click', () => onAnswer(btn, opt));
      optWrap.appendChild(btn);
    });

    renderTrail(stageIdx, riddleIdx);
    showScreen('questionScreen');
  }

  function renderTrail(stageIdx, riddleIdx) {
    const trail = el('#stageTrail');
    trail.innerHTML = '';
    const completed = progress[stageIdx].completed;
    for (let i = 0; i < 5; i++) {
      const stop = document.createElement('div');
      stop.className = 'trail-stop';
      if (completed[i]) stop.classList.add('filled');
      if (i === riddleIdx) stop.classList.add('current');
      stop.textContent = completed[i] ? '✓' : (i + 1);
      trail.appendChild(stop);
    }
  }

  /* ── מענה על חידה ── */
  function onAnswer(btn, opt) {
    const optWrap = el('#optionsList');
    if (opt.correct) {
      els('.option-btn', optWrap).forEach((b) => (b.disabled = true));
      btn.classList.add('correct-flash');
      progress[current.stageIdx].completed[current.riddleIdx] = true;
      GameStorage.save(progress);
      setTimeout(() => openCelebration(), 320);
    } else {
      btn.classList.add('wrong-flash');
      btn.disabled = true;
      setTimeout(() => {
        btn.classList.remove('wrong-flash');
        btn.disabled = false;
      }, 550);
      const toast = el('#toast');
      toast.textContent = Reinforcement.encourageRetry();
      toast.classList.add('show');
    }
  }

  /* ── שכבת חגיגה אחרי תשובה נכונה ── */
  function openCelebration() {
    const overlay = el('#celebrationOverlay');
    const charWrap = el('#celebrationCharacter');
    const useGolem = Math.random() < 0.5;
    charWrap.innerHTML = useGolem ? Illustrations.golem('happy') : Illustrations.gear('happy');
    const phrase = Reinforcement.celebrate(el('#confettiLayer'));
    el('#celebrationPhrase').textContent = phrase;
    overlay.classList.add('show');
  }

  function closeCelebrationAndAdvance() {
    el('#celebrationOverlay').classList.remove('show');
    el('#confettiLayer').innerHTML = '';
    const stageIdx = current.stageIdx;
    const nextRiddleIdx = current.riddleIdx + 1;
    if (nextRiddleIdx < 5) {
      goToRiddle(stageIdx, nextRiddleIdx);
    } else {
      showStageSummary(stageIdx);
    }
  }

  /* ── מסך סיכום שלב ── */
  function showStageSummary(stageIdx) {
    const stage = STAGES[stageIdx];
    el('#summaryScene').innerHTML = Illustrations.stageScene(stage.key);
    el('#summaryTitle').textContent = `כֹּל הַכָּבוֹד! סִיַּמְתָּ אֶת ${stage.subtitle}`;
    el('#summarySub').textContent = `עָבַרְתָּ בְּהַצְלָחָה בֵּין חִידוֹת ${stage.place} - אוֹרִי הַגָּדוֹל מַמָּשׁ!`;

    const isLast = stageIdx === STAGES.length - 1;
    const nextBtn = el('#summaryNextBtn');
    if (!isLast && !areAllStagesDone()) {
      nextBtn.style.display = 'inline-block';
      nextBtn.onclick = () => enterStage(stageIdx + 1);
    } else {
      nextBtn.style.display = 'none';
    }

    showScreen('stageSummaryScreen');

    if (areAllStagesDone()) {
      setTimeout(() => showFinalSummary(), 900);
    }
  }

  /* ── מסך סיום כללי ── */
  function showFinalSummary() {
    showScreen('finalSummaryScreen');
    Reinforcement.celebrate(el('#finalConfettiLayer'));
  }

  /* ── כפתור השתקה ── */
  function initMute() {
    const btn = el('#muteBtn');
    function refresh() {
      btn.textContent = GameStorage.isMuted() ? '🔇' : '🔊';
    }
    refresh();
    btn.addEventListener('click', () => {
      GameStorage.setMuted(!GameStorage.isMuted());
      refresh();
    });
  }

  /* ── אתחול ── */
  function init() {
    initMute();
    renderHome();
    showScreen('homeScreen');

    el('#celebrationNextBtn').addEventListener('click', closeCelebrationAndAdvance);
    els('.back-home-link').forEach((link) =>
      link.addEventListener('click', () => {
        renderHome();
        showScreen('homeScreen');
      })
    );
    el('#playAgainBtn').addEventListener('click', () => {
      progress = STAGES.map(() => ({ completed: new Array(5).fill(false) }));
      GameStorage.save(progress);
      renderHome();
      showScreen('homeScreen');
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
