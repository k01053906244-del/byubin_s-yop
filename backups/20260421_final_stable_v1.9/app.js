// --- Master Data (From 1311 Manual) ---
const MASTER_DATA = [
  {"name": "박태일", "member_id": "1100733", "phone": "010-3653-8348", "fixed_off": "토", "fixed_vehicle": "3733"},
  {"name": "박영철", "member_id": "1301161", "phone": "010-6340-7518", "fixed_off": "금", "fixed_vehicle": "3733"},
  {"name": "이영철", "member_id": "1400279", "phone": "010-3835-9103", "fixed_off": "월", "fixed_vehicle": "1325"},
  {"name": "강부구", "member_id": "700295", "phone": "010-6221-1251", "fixed_off": "월", "fixed_vehicle": "3737"},
  {"name": "최민수", "member_id": "1500426", "phone": "010-3147-5570", "fixed_off": "목", "fixed_vehicle": "3740"},
  {"name": "설수길", "member_id": "1701037", "phone": "010-7189-1618", "fixed_off": "수", "fixed_vehicle": "3744"},
  {"name": "권기수", "member_id": "1400120", "phone": "010-6294-7803", "fixed_off": "수", "fixed_vehicle": "스피아"},
  {"name": "박재홍", "member_id": "1901046", "phone": "010-3313-1916", "fixed_off": "월", "fixed_vehicle": "3737"},
  {"name": "김찬기", "member_id": "1300473", "phone": "010-5390-6244", "fixed_off": "화", "fixed_vehicle": "1119"},
  {"name": "이호재", "member_id": "1001571", "phone": "010-5520-3174", "fixed_off": "일", "fixed_vehicle": "3739"},
  {"name": "박노종", "member_id": "1901490", "phone": "010-7194-9081", "fixed_off": "목", "fixed_vehicle": "1119"},
  {"name": "정정섭", "member_id": "100340", "phone": "010-2260-3790", "fixed_off": "일", "fixed_vehicle": "1063"},
  {"name": "황민", "member_id": "1200722", "phone": "010-5396-0232", "fixed_off": "토", "fixed_vehicle": "1063"},
  {"name": "김동원", "member_id": "2100539", "phone": "010-5029-0739", "fixed_off": "일", "fixed_vehicle": "1325"},
  {"name": "이근배", "member_id": "1901295", "phone": "010-5392-9148", "fixed_off": "목", "fixed_vehicle": "1023"},
  {"name": "최정운", "member_id": "1100695", "phone": "010-9282-6571", "fixed_off": "일", "fixed_vehicle": "1325"},
  {"name": "신태호", "member_id": "900754", "phone": "010-8484-0149", "fixed_off": "토", "fixed_vehicle": "3740"},
  {"name": "이기수", "member_id": "1200454", "phone": "010-9590-7759", "fixed_off": "금", "fixed_vehicle": "3744"},
  {"name": "이승옥", "member_id": "600789", "phone": "010-3800-8498", "fixed_off": "일", "fixed_vehicle": "3739"},
  {"name": "육일주", "member_id": "500365", "phone": "010-3781-3987", "fixed_off": "화", "fixed_vehicle": "스피아"},
  {"name": "김용화", "member_id": "2501595", "phone": "010-9148-4300", "fixed_off": "화", "fixed_vehicle": "1023"},
  {"name": "우병재", "member_id": "2100227", "phone": "010-7154-1226", "fixed_off": "수", "fixed_vehicle": "스피아"},
  {"name": "차신조", "member_id": "1500360", "phone": "010-5593-6848", "fixed_off": "금", "fixed_vehicle": "스피아"},
  {"name": "최재선", "member_id": "2502102", "phone": "010-7576-9051", "fixed_off": "고정없음", "fixed_vehicle": "스피아"},
  {"name": "곽노", "member_id": "NEW_곽노", "phone": "미등록", "fixed_off": "미정", "fixed_vehicle": "3740"},
  {"name": "김성진", "member_id": "NEW_김성진", "phone": "미등록", "fixed_off": "미정", "fixed_vehicle": "스피아"}
];

// --- State ---
const state = {
    currentTab: 'calendar',
    workLogs: JSON.parse(localStorage.getItem('bus_work_logs_v2') || '{}'),
    masterData: MASTER_DATA,
    selectedMemberId: localStorage.getItem('last_selected_member') || MASTER_DATA[0].member_id,
    displayDate: new Date(),
    engine: null
};

// --- UI Elements ---
const ui = {
    memberSelect: document.getElementById('member-select'),
    calendarGrid: document.getElementById('calendar-grid'),
    displayYearMonth: document.getElementById('display-year-month'),
    countAM: document.getElementById('count-am'),
    countPM: document.getElementById('count-pm'),
    tabContents: document.querySelectorAll('.tab-content'),
    navItems: document.querySelectorAll('.nav-item'),
    modal: document.getElementById('modal-overlay'),
    modalMsg: document.getElementById('modal-message'),
    modalClose: document.getElementById('modal-close'),
    teamList: document.getElementById('team-list'),
    
    dashTotalDays: document.getElementById('dash-total-days'),
    ratioAMBar: document.getElementById('ratio-am-bar'),
    ratioPMBar: document.getElementById('ratio-pm-bar'),
    dashAMCount: document.getElementById('dash-am-count'),
    dashPMCount: document.getElementById('dash-pm-count'),
    fatigueLevel: document.getElementById('fatigue-level'),
    dashConsecutive: document.getElementById('dash-consecutive'),
    monthlyTrendList: document.getElementById('monthly-trend-list'),
    
    // Manual & Chat
    manualModal: document.getElementById('manual-modal'),
    manualContent: document.getElementById('manual-content'),
    manualClose: document.getElementById('manual-close')
};

// --- Initialization ---
async function init() {
    try {
        const mResponse = await fetch('resources/master_members.json');
        if (mResponse.ok) {
            state.masterData = await mResponse.json();
            console.log("📋 마스터 명부 데이터 로드 완료!");
        }
    } catch (e) { console.warn("마스터 데이터 로딩 실패, 하드코딩된 데이터 사용"); }

    state.engine = new window.IntegrityEngine(state.masterData);
    if (!state.displayDate) state.displayDate = new Date();

    if (ui.memberSelect) {
        ui.memberSelect.innerHTML = state.masterData.map(m => 
            `<option value="${m.member_id}" ${m.member_id === state.selectedMemberId ? 'selected' : ''}>${m.name} (#${m.member_id})</option>`
        ).join('');
    }

    bindEvents();
    refreshUI();

    if (window.firebaseService) {
        state.workLogs = await window.firebaseService.loadWorkLogs(state.workLogs);
        localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
        refreshUI();
    }

    await loadSavedDispatch();
}

function bindEvents() {
    ui.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            if (['dashboard', 'calendar', 'team', 'fetch'].includes(tab)) switchTab(tab);
        });
    });

    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));

    if (ui.memberSelect) {
        ui.memberSelect.addEventListener('change', (e) => {
            state.selectedMemberId = e.target.value;
            localStorage.setItem('last_selected_member', state.selectedMemberId);
            refreshUI();
        });
    }

    ui.modalClose.addEventListener('click', () => ui.modal.classList.add('hidden'));

    document.getElementById('btn-manual')?.addEventListener('click', openManual);
    ui.manualClose?.addEventListener('click', () => {
        ui.manualModal?.classList.add('hidden');
        ui.manualModal?.classList.remove('flex');
    });

    document.getElementById('btn-run-analysis')?.addEventListener('click', runAIAnalysis);
    document.getElementById('btn-band-config')?.addEventListener('click', openBandConfig);
    document.getElementById('btn-config-close')?.addEventListener('click', closeBandConfig);
    document.getElementById('btn-config-save')?.addEventListener('click', saveBandConfig);
    document.getElementById('btn-auto-fetch')?.addEventListener('click', runAutoFetch);

    document.getElementById('btn-am')?.addEventListener('click', () => logWork('AM'));
    document.getElementById('btn-pm')?.addEventListener('click', () => logWork('PM'));
    document.getElementById('btn-all')?.addEventListener('click', () => logWork('ALL'));

    const safetyChecks = document.querySelectorAll('.safety-check');
    const btnSafetyComplete = document.getElementById('btn-safety-complete');

    if (safetyChecks.length && btnSafetyComplete) {
        document.getElementById('btn-ceo-report-op')?.addEventListener('click', generateCEOReport);

        safetyChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                const allChecked = Array.from(safetyChecks).every(c => c.checked);
                btnSafetyComplete.disabled = !allChecked;
                btnSafetyComplete.className = allChecked ? 
                    'w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 bg-primary text-on-primary shadow-md' :
                    'w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 bg-slate-200 text-slate-500 cursor-not-allowed';
            });
        });

        btnSafetyComplete.addEventListener('click', () => {
            showModal('점검 완료! 오늘도 안전운전 하세요.', false, true);
            safetyChecks.forEach(c => c.checked = false);
            btnSafetyComplete.disabled = true;
            btnSafetyComplete.className = 'w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 bg-slate-200 text-slate-500 cursor-not-allowed';
        });
    }
}

function refreshUI() {
    renderCalendar();
    updateMonthlyStats();
    if (state.currentTab === 'dashboard') renderAnalysisView();
    if (state.currentTab === 'team') renderTeamList();
    if (state.currentTab === 'fetch') renderOperationalInsight();
}

function renderAnalysisView() {
    if (!state.engine || !state.selectedMemberId) return;

    const flatLogs = [];
    Object.keys(state.workLogs).forEach(date => {
        if (state.workLogs[date][state.selectedMemberId]) {
            flatLogs.push({ date, status: state.workLogs[date][state.selectedMemberId].status });
        }
    });

    const stats = state.engine.calculateStats(state.selectedMemberId, flatLogs);
    
    if (ui.dashTotalDays) ui.dashTotalDays.textContent = stats.total_days;
    if (ui.dashAMCount) ui.dashAMCount.textContent = stats.am_count;
    if (ui.dashPMCount) ui.dashPMCount.textContent = stats.pm_count;
    if (ui.dashConsecutive) ui.dashConsecutive.textContent = stats.consecutive_days;

    if (ui.ratioAMBar && ui.ratioPMBar) {
        const total = stats.am_count + stats.pm_count || 1;
        ui.ratioAMBar.style.width = `${(stats.am_count / total) * 100}%`;
        ui.ratioPMBar.style.width = `${(stats.pm_count / total) * 100}%`;
    }

    if (ui.fatigueLevel) {
        let levelText = stats.status === 'DANGER' ? "위험 (휴식 권고)" : (stats.status === 'CAUTION' ? "주의 (피로 누적)" : "정상 (쾌적)");
        let colorClass = stats.status === 'DANGER' ? "text-error" : (stats.status === 'CAUTION' ? "text-amber-500" : "text-secondary");
        ui.fatigueLevel.textContent = levelText;
        ui.fatigueLevel.className = `text-sm font-black transition-colors ${colorClass}`;
    }

    if (ui.monthlyTrendList) {
        const recentLogs = flatLogs.slice(-10).reverse();
        ui.monthlyTrendList.innerHTML = recentLogs.length === 0 ? 
            '<p class="text-[11px] text-outline-variant text-center py-4">최근 데이터가 없습니다.</p>' :
            recentLogs.map(log => `
                <div class="flex items-center justify-between p-3 bg-surface rounded-xl border border-outline-variant/10 shadow-sm animate-slideUpFade">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg ${log.status === 'AM' ? 'bg-error/10 text-error' : (log.status === 'PM' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary')} flex items-center justify-center">
                            <span class="material-symbols-outlined text-sm">${log.status === 'AM' ? 'wb_sunny' : 'dark_mode'}</span>
                        </div>
                        <div>
                            <p class="text-[11px] font-bold text-on-surface">${log.date}</p>
                            <p class="text-[9px] text-outline-variant">${log.status === 'AM' ? '오전 조' : (log.status === 'PM' ? '오후 조' : '종일 근무')}</p>
                        </div>
                    </div>
                </div>
            `).join('');
    }
}

function openBandConfig() {
    const config = JSON.parse(localStorage.getItem('band_config') || '{}');
    document.getElementById('config-route-name').value = config.route || '';
    document.getElementById('config-band-url').value = config.url || '';
    document.getElementById('config-band-keyword').value = config.keyword || '';
    const modal = document.getElementById('band-config-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.querySelector('div').classList.remove('translate-y-full'), 10);
}

function closeBandConfig() {
    const modal = document.getElementById('band-config-modal');
    modal.querySelector('div').classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function saveBandConfig() {
    const route = document.getElementById('config-route-name').value;
    const url = document.getElementById('config-band-url').value;
    const keyword = document.getElementById('config-band-keyword').value;
    if (!url) return alert('네이버 밴드 주소는 필수입니다.');
    localStorage.setItem('band_config', JSON.stringify({ route, url, keyword }));
    closeBandConfig();
}

async function runAutoFetch() {
    const config = JSON.parse(localStorage.getItem('band_config') || '{}');
    if (!config.url) return showModal('밴드 주소가 설정되지 않았습니다.', false, true);
    showModal('데이터 수집 중...', true);
    window.open(config.url, 'band_fetch_window', 'width=1100,height=850');
}

window.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'BAND_DISPATCH_DATA') {
        const inputElem = document.getElementById('analysis-input');
        if(inputElem) {
            inputElem.value = event.data.text;
            showModal('데이터 수신 완료! 즉시 분석 중...', true);
            await new Promise(r => setTimeout(r, 800));
            runAIAnalysis();
        }
    }
});

async function runAIAnalysis() {
    const input = document.getElementById('analysis-input').value;
    if (!input.trim()) return alert('분석할 내용을 입력해주세요.');
    showModal('데이터 분석 중...', true);
    try {
        const results = state.engine.parseBandText(input, state.displayDate);
        if (results.length === 0) return showModal('데이터를 찾지 못했습니다.', false, true);

        results.forEach(entry => {
            if (!state.workLogs[entry.date]) state.workLogs[entry.date] = {};
            state.workLogs[entry.date][entry.member_id] = entry;
        });

        localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
        refreshUI();
        showModal('분석 및 저장 완료!', false, true);
        document.getElementById('analysis-input').value = '';
    } catch (e) { showModal('오류: ' + e.message, false, true); }
}

function switchTab(tabId) {
    state.currentTab = tabId;
    ui.navItems.forEach(item => item.classList.toggle('active', item.dataset.tab === tabId));
    ui.tabContents.forEach(tab => tab.classList.toggle('active', tab.id === `tab-${tabId}`));
    refreshUI();
}

function changeMonth(offset) {
    const d = state.displayDate;
    state.displayDate = new Date(d.getFullYear(), d.getMonth() + offset, 1);
    refreshUI();
}

function renderCalendar() {
    const year = state.displayDate.getFullYear();
    const month = state.displayDate.getMonth();
    ui.displayYearMonth.textContent = `${year}년 ${month + 1}월`;
    
    ui.calendarGrid.innerHTML = `
        <div class="text-center text-sm font-bold text-error opacity-70">일</div>
        <div class="text-center text-sm font-bold opacity-70">월</div>
        <div class="text-center text-sm font-bold opacity-70">화</div>
        <div class="text-center text-sm font-bold opacity-70">수</div>
        <div class="text-center text-sm font-bold opacity-70">목</div>
        <div class="text-center text-sm font-bold opacity-70">금</div>
        <div class="text-center text-sm font-bold text-secondary opacity-70">토</div>
    `;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 0; i < firstDay; i++) ui.calendarGrid.appendChild(document.createElement('div'));

    for (let d = 1; d <= lastDate; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayEl = document.createElement('div');
        dayEl.className = 'flex flex-col items-center py-3 relative cursor-pointer active:scale-95 rounded-xl hover:bg-surface-container-lowest';
        if (dateStr === todayStr) dayEl.classList.add('bg-primary-fixed', 'border-2', 'border-primary', 'shadow-sm');
        
        dayEl.innerHTML = `<span class="text-sm font-bold ${ (firstDay + d - 1) % 7 === 0 ? 'text-error' : ((firstDay + d - 1) % 7 === 6 ? 'text-secondary' : '') }">${d}</span>`;
        dayEl.onclick = () => openEditSheet(dateStr);

        const log = state.workLogs[dateStr]?.[state.selectedMemberId];
        if (log) {
            const dot = document.createElement('div');
            dot.className = `w-1.5 h-1.5 rounded-full mt-1 ${log.status === 'AM' ? 'bg-error' : (log.status === 'PM' ? 'bg-secondary' : 'bg-primary')}`;
            dayEl.appendChild(dot);
        }
        ui.calendarGrid.appendChild(dayEl);
    }
}

function updateMonthlyStats() {
    const year = state.displayDate.getFullYear();
    const month = state.displayDate.getMonth() + 1;
    let am = 0, pm = 0;
    Object.keys(state.workLogs).forEach(date => {
        const [y, m] = date.split('-').map(Number);
        if (y === year && m === month && state.workLogs[date][state.selectedMemberId]) {
            const s = state.workLogs[date][state.selectedMemberId].status;
            if (s === 'AM') am++; else if (s === 'PM') pm++; else if (s === 'ALL') { am++; pm++; }
        }
    });
    ui.countAM.textContent = am;
    ui.countPM.textContent = pm;
}

function renderTeamList() {
    const listEl = document.getElementById('team-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    
    state.masterData.forEach((member, index) => {
        const flatLogs = [];
        Object.keys(state.workLogs).forEach(date => {
            if (state.workLogs[date][member.member_id]) flatLogs.push({ date, status: state.workLogs[date][member.member_id].status });
        });
        const stats = state.engine ? state.engine.calculateStats(member.member_id, flatLogs) : { consecutive_days: 0, status: 'NORMAL' };
        
        const card = document.createElement('div');
        card.className = `glass-panel p-5 rounded-3xl border border-white/40 shadow-sm mb-4 animate-in fade-in slide-in-from-bottom duration-500 ${member.member_id === state.selectedMemberId ? 'ring-2 ring-primary ring-offset-2' : ''}`;
        card.style = `animation-delay: ${index * 80}ms`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <h4 class="font-black text-on-surface text-lg text-primary">${member.name}</h4>
                        <span class="text-[9px] font-black px-2 py-0.5 bg-primary/10 text-primary rounded-full uppercase">사번 ${member.member_id}</span>
                    </div>
                    <p class="text-xs text-on-surface-variant font-bold flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px]">call</span> ${member.phone}
                    </p>
                </div>
                <div class="flex flex-col items-end">
                    <span class="px-3 py-1 rounded-full text-[10px] font-black ${stats.status === 'DANGER' ? 'bg-error text-white' : 'bg-primary/10 text-primary'} mb-2">
                        ${stats.consecutive_days}일 연속 운행중
                    </span>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="bg-surface-container-high/50 p-3 rounded-2xl border border-white/60">
                    <p class="text-[9px] font-black text-outline-variant uppercase mb-1">고정 차량</p>
                    <p class="text-sm font-black text-on-surface">${member.fixed_vehicle}호</p>
                </div>
                <div class="bg-surface-container-high/50 p-3 rounded-2xl border border-white/60">
                    <p class="text-[9px] font-black text-outline-variant uppercase mb-1">고정 휴무</p>
                    <p class="text-sm font-black text-on-surface text-secondary">${member.fixed_off}</p>
                </div>
            </div>

            <div class="flex gap-2">
                <button class="flex-1 h-12 rounded-xl bg-primary text-on-primary font-black text-xs shadow-md active:scale-95 transition-transform" onclick="window.selectMember('${member.member_id}', '${member.name}')">데이터 분석 리포트</button>
                <a href="tel:${member.phone}" class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center active:scale-90 transition-transform">
                    <span class="material-symbols-outlined text-outline">call</span>
                </a>
            </div>
        `;
        listEl.appendChild(card);
    });
}

window.selectMember = (id, name) => {
    state.selectedMemberId = id;
    localStorage.setItem('last_selected_member', id);
    switchTab('dashboard');
};

function logWorkForDate(dateStr, status) {
    if (!state.workLogs[dateStr]) state.workLogs[dateStr] = {};
    if (status === 'DELETE') delete state.workLogs[dateStr][state.selectedMemberId];
    else state.workLogs[dateStr][state.selectedMemberId] = { status, vehicle: 'manual' };
    localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
    refreshUI();
}

function logWork(status) {
    const today = new Date().toISOString().split('T')[0];
    logWorkForDate(today, status);
    alert(`${status} 근무 체크 완료!`);
}

function openEditSheet(dateStr) {
    const modal = document.getElementById('edit-sheet-modal');
    document.getElementById('edit-sheet-title').textContent = `${dateStr} 변경`;
    modal.classList.remove('hidden');
    setTimeout(() => modal.firstElementChild.classList.remove('translate-y-full'), 10);
    
    const actions = modal.querySelectorAll('.btn-edit-action');
    actions.forEach(btn => {
        btn.onclick = () => {
            const s = btn.dataset.status;
            if (s) logWorkForDate(dateStr, s);
            closeEditSheet();
        };
    });
}

function closeEditSheet() {
    const modal = document.getElementById('edit-sheet-modal');
    modal.firstElementChild.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function showModal(msg, spin = true, close = false) {
    ui.modal.classList.remove('hidden');
    ui.modalMsg.textContent = msg;
    document.getElementById('modal-spinner').classList.toggle('hidden', !spin);
    ui.modalClose.classList.toggle('hidden', !close);
}

async function generateCEOReport() {
    const chatModal = document.getElementById('chat-modal');
    const chatLog = document.getElementById('chat-log');
    chatModal.classList.remove('hidden');
    setTimeout(() => chatModal.firstElementChild.classList.remove('translate-y-full'), 10);
    
    chatLog.innerHTML = `<div class="p-4 bg-primary text-white rounded-2xl rounded-tl-none text-sm font-bold">📊 운영 분석 리포트 생성 중...</div>`;
    await new Promise(r => setTimeout(r, 1000));

    const logDates = Object.keys(state.workLogs).sort();
    const latestDate = logDates.length > 0 ? logDates[logDates.length - 1] : '데이터 없음';
    let fatigue = [], activeCars = new Set();

    state.masterData.forEach(m => {
        const stats = state.engine.calculateStats(m.member_id, logDates.filter(d => state.workLogs[d][m.member_id]).map(d => ({ date: d, status: state.workLogs[d][m.member_id].status })));
        if (stats.consecutive_days >= 6) fatigue.push(`${m.name}(${stats.consecutive_days}일)`);
        if (state.workLogs[latestDate]?.[m.member_id]?.vehicle) activeCars.add(state.workLogs[latestDate][m.member_id].vehicle);
    });

    chatLog.innerHTML += `
        <div class="mt-4 p-5 bg-surface-container-high rounded-2xl rounded-tl-none border border-outline-variant/20 text-sm whitespace-pre-wrap leading-relaxed shadow-sm">
대표님, 현재 로컬 데이터 분석 결과입니다.

📅 기준일: ${latestDate}
🚍 가동차량: ${activeCars.size}대
⚠️ 연속근무: ${fatigue.length > 0 ? fatigue.join(', ') : '전원 양호'}

안전 규정을 준수하며 운행 중입니다.
        </div>
    `;
}

function renderOperationalInsight() {
    const display = document.getElementById('local-ceo-report-display');
    if (!display || !state.engine) return;

    const logDates = Object.keys(state.workLogs).sort();
    const latestDate = logDates.length > 0 ? logDates[logDates.length - 1] : '데이터 없음';
    let fatigue = [], offIssues = [], cars = new Set();

    state.masterData.forEach(m => {
        const logs = logDates.filter(d => state.workLogs[d]?.[m.member_id]).map(d => ({ date: d, status: state.workLogs[d][m.member_id].status }));
        const stats = state.engine.calculateStats(m.member_id, logs);
        if (stats.consecutive_days >= 6) fatigue.push({ name: m.name, days: stats.consecutive_days });
        logs.forEach(l => {
            if (m.fixed_off === new Date(l.date).toLocaleDateString('ko-KR', { weekday: 'short' }) && l.status !== 'OFF') offIssues.push(m.name);
        });
        if (state.workLogs[latestDate]?.[m.member_id]?.vehicle) cars.add(state.workLogs[latestDate][m.member_id].vehicle);
    });

    const isRisk = fatigue.some(f => f.days >= 7) || offIssues.length > 0;
    display.innerHTML = `
        <div class="w-full ${isRisk ? 'bg-error/10 border-error/20' : 'bg-secondary/10 border-secondary/20'} p-5 rounded-3xl border space-y-4">
            <div class="flex justify-between items-center">
                <h4 class="font-black text-on-surface">종합 운영 브리핑</h4>
                <span class="px-2 py-1 rounded-lg text-[9px] font-black ${isRisk ? 'bg-error text-white' : 'bg-secondary text-white'}">${isRisk ? 'CRITICAL' : 'SAFE'}</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-white/50 p-3 rounded-2xl border border-white/80 shadow-sm">
                    <p class="text-[9px] font-bold text-outline-variant uppercase">Fleet Active</p>
                    <p class="text-xl font-black text-on-surface">${cars.size}대</p>
                </div>
                <div class="bg-white/50 p-3 rounded-2xl border border-white/80 shadow-sm">
                    <p class="text-[9px] font-bold text-outline-variant uppercase">Issues Flagged</p>
                    <p class="text-xl font-black text-on-surface">${fatigue.length + offIssues.length}건</p>
                </div>
            </div>
            <div class="space-y-2">
                ${fatigue.length === 0 ? '<p class="text-[11px] font-bold text-secondary">✅ 연속 근무 위반 없음</p>' : fatigue.map(f => `<div class="p-2 bg-white/40 rounded-xl text-[11px] font-bold flex justify-between"><span>${f.name}</span><span class="text-error">${f.days}일째</span></div>`).join('')}
            </div>
        </div>
    `;
}

async function loadSavedDispatch() {
    try {
        const response = await fetch('resources/dispatch_data_processed.json');
        if (response.ok) {
            state.workLogs = { ...state.workLogs, ...(await response.json()) };
            refreshUI();
        }
    } catch (e) { console.error(e); }
}

init();

function openManual() {
    if (!ui.manualModal || !ui.manualContent) return;

    if (!window.MANUALS_DATABASE) {
        ui.manualContent.innerHTML = '<p class="text-error text-center py-10 font-bold">매뉴얼 데이터를 로드할 수 없습니다.</p>';
    } else {
        const iconMap = {
            'M001': 'verified_user',
            'M002': 'emergency',
            'M003': 'gavel',
            'M004': 'contact_support'
        };

        ui.manualContent.innerHTML = window.MANUALS_DATABASE.map(manual => `
            <div class="mb-10 animate-in fade-in slide-in-from-bottom duration-700">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <span class="material-symbols-outlined text-[28px]">${iconMap[manual.id] || 'menu_book'}</span>
                    </div>
                    <div>
                        <h4 class="text-xl font-black text-on-surface leading-none mb-1">${manual.title}</h4>
                        <p class="text-[10px] font-bold text-outline-variant uppercase tracking-widest">${manual.id}</p>
                    </div>
                </div>
                <div class="space-y-4">
                    ${manual.sections.map(section => `
                        <div class="group p-6 bg-surface-container-lowest rounded-[32px] border border-outline-variant/10 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                            <div class="flex items-center gap-2 mb-3">
                                <div class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                                <p class="text-xs font-black text-primary uppercase tracking-tighter">${section.subtitle}</p>
                            </div>
                            <p class="text-[14px] text-on-surface-variant leading-relaxed whitespace-pre-line font-medium opacity-90">${section.content}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('<div class="h-[1px] bg-outline-variant/10 my-10 relative"><div class="absolute inset-0 bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent"></div></div>');
    }

    ui.manualModal.classList.remove('hidden');
    ui.manualModal.classList.add('flex');
}
