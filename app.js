// --- Master Data (1311 Default Profile) ---
const DEFAULT_1311_MEMBERS = [
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

// --- Multi-Route State Management ---
function getInitialRoutes() {
    const saved = localStorage.getItem('bus_routes_config');
    if (saved) return JSON.parse(saved);
    
    // Initial default state with 1311 route
    return {
        "1311": {
            id: "1311",
            name: "1311번 (표준)",
            members: DEFAULT_1311_MEMBERS,
            config: {
                keyword: "배차표",
                author: ""
            }
        }
    };
}

const state = {
    currentTab: 'calendar',
    routes: getInitialRoutes(),
    activeRouteId: localStorage.getItem('active_route_id') || '1311',
    workLogs: JSON.parse(localStorage.getItem('bus_work_logs_v2') || '{}'),
    manualLogs: JSON.parse(localStorage.getItem('bus_manual_logs_v2') || '{}'),
    recentAnalyses: JSON.parse(sessionStorage.getItem('recent_analyses') || '[]'),
    displayDate: new Date(),
    engine: null,
    manualMode: localStorage.getItem('manual_mode_enabled') === 'true',
    get masterData() {
        return this.routes[this.activeRouteId]?.members || [];
    },
    get activeRoute() {
        return this.routes[this.activeRouteId];
    },
    selectedMemberId: localStorage.getItem('last_selected_member')
};

// Ensure selectedMemberId is valid for the active route
if (!state.selectedMemberId || !state.masterData.find(m => m.member_id === state.selectedMemberId)) {
    state.selectedMemberId = state.masterData[0]?.member_id || "";
}

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
    routeSelector: document.getElementById('route-selector'),
    btnAddRoute: document.getElementById('btn-add-route'),
    configRouteName: document.getElementById('config-route-name'),
    configTeamImport: document.getElementById('config-team-import'),
    manualModal: document.getElementById('manual-modal'),
    modalClose: document.getElementById('modal-close'),
    teamList: document.getElementById('team-list'),
    
    analysisDateDisplay: document.getElementById('analysis-date-display'),
    analysisContainer: document.getElementById('comprehensive-analysis-container'),
    fatigueRankingContainer: document.getElementById('fatigue-ranking-container'),
    fatigueRankingList: document.getElementById('fatigue-ranking-list'),
    
    // Manual & Chat
    manualContent: document.getElementById('manual-content'),
    manualClose: document.getElementById('manual-close'),
    btnToggleManual: document.getElementById('toggle-manual-mode')
};

// --- Initialization ---
async function init() {
    try {
        const mResponse = await fetch('resources/master_members.json');
        if (mResponse.ok) {
            const externalData = await mResponse.json();
            if (state.activeRoute) {
                state.activeRoute.members = externalData;
                saveRoutes();
            }
            console.log("📋 마스터 명부 데이터 로드 완료!");
            
            // Critical: Refresh selected member after data is loaded
            if (!state.selectedMemberId || !state.masterData.find(m => m.member_id === state.selectedMemberId)) {
                state.selectedMemberId = state.masterData[0]?.member_id || "";
                localStorage.setItem('last_selected_member', state.selectedMemberId);
            }
        }
    } catch (e) { console.warn("마스터 데이터 로딩 실패, 로컬 상태 데이터 사용"); }

    state.engine = new window.IntegrityEngine(state.masterData);
    if (!state.displayDate) state.displayDate = new Date();

    if (ui.memberSelect) {
        ui.memberSelect.innerHTML = state.masterData.map(m => 
            `<option value="${m.member_id}" ${m.member_id === state.selectedMemberId ? 'selected' : ''}>${m.name} (#${m.member_id})</option>`
        ).join('');
    }

    bindEvents();
    updateRouteSelector(); // Ensure multi-route UI is ready
    refreshUI();

    if (window.firebaseService) {
        state.workLogs = await window.firebaseService.loadWorkLogs(state.workLogs);
        localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
        refreshUI();
    }

    await loadSavedDispatch();
}


/**
 * Audio Engine: Premium Touch Sound (Web Audio API)
 * Zero external dependencies, minimal latency.
 */
function playTouchSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1500, audioCtx.currentTime); // High frequency for 'tick'
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
        
        // Auto-close context to save resources
        setTimeout(() => audioCtx.close(), 100);
    } catch (e) {
        console.warn('Audio playback failed:', e);
    }
}

function bindEvents() {
    ui.navItems.forEach(item => {
        item.addEventListener('click', () => {
            playTouchSound();
            const tab = item.dataset.tab;
            if (['dashboard', 'calendar', 'team', 'fetch'].includes(tab)) switchTab(tab);
        });
    });

    document.getElementById('prev-month').addEventListener('click', () => {
        playTouchSound();
        changeMonth(-1);
    });
    document.getElementById('next-month').addEventListener('click', () => {
        playTouchSound();
        changeMonth(1);
    });

    if (ui.memberSelect) {
        ui.memberSelect.addEventListener('change', (e) => {
            state.selectedMemberId = e.target.value;
            localStorage.setItem('last_selected_member', state.selectedMemberId);
            refreshUI();
        });
    }

    ui.modalClose.addEventListener('click', () => ui.modal.classList.add('hidden'));

    document.getElementById('btn-manual')?.addEventListener('click', () => {
        playTouchSound();
        openManual();
    });
    ui.manualClose?.addEventListener('click', () => {
        playTouchSound();
        ui.manualModal?.classList.add('hidden');
        ui.manualModal?.classList.remove('flex');
    });

    document.getElementById('btn-run-analysis')?.addEventListener('click', () => {
        playTouchSound();
        runAIAnalysis();
    });
    document.getElementById('btn-band-config')?.addEventListener('click', () => {
        playTouchSound();
        openBandConfig();
    });
    document.getElementById('btn-config-close')?.addEventListener('click', () => {
        playTouchSound();
        closeBandConfig();
    });
    document.getElementById('btn-config-save')?.addEventListener('click', () => {
        playTouchSound();
        saveBandConfig();
    });

    ui.routeSelector?.addEventListener('change', (e) => {
        playTouchSound();
        switchRoute(e.target.value);
    });

    ui.btnAddRoute?.addEventListener('click', () => {
        playTouchSound();
        addNewRoute();
    });

    ui.btnToggleManual?.addEventListener('click', () => {
        playTouchSound();
        toggleManualMode();
    });

    document.getElementById('btn-am')?.addEventListener('click', () => {
        playTouchSound();
        logWork('AM');
    });
    document.getElementById('btn-pm')?.addEventListener('click', () => {
        playTouchSound();
        logWork('PM');
    });
    document.getElementById('btn-all')?.addEventListener('click', () => {
        playTouchSound();
        logWork('ALL');
    });

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

function showToast(msg) {
    // 토스트 타입/아이콘 자동 분기 (비주얼만)
    let toastType = 'info';
    let icon = 'ℹ️';
    if (/완료|저장|동기화|켜짐|done|success/i.test(msg)) { toastType = 'success'; icon = '✅'; }
    else if (/오류|실패|error|fail/i.test(msg))                                { toastType = 'error';   icon = '❌'; }
    else if (/주의|위험|문제|warn/i.test(msg))                                  { toastType = 'warn';    icon = '⚠️'; }
    else if (/수동|모드/i.test(msg))                                             { toastType = 'manual';  icon = '🔧'; }

    const toast = document.createElement('div');
    toast.className = `premium-toast toast-${toastType}`;
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${msg}</span>`;
    document.body.appendChild(toast);

    // 등장 후 자동 제거
    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 350);
    }, 2200);
}

window.resetAnalysisInput = () => {
    const nextSteps = document.getElementById('analysis-next-steps');
    const input = document.getElementById('analysis-input');
    if (nextSteps) nextSteps.classList.add('hidden');
    if (input) {
        input.value = '';
        input.focus();
    }
};

function refreshUI() {
    if (!state.engine) return;

    // Update Visual Route Badge
    const badgeEl = document.getElementById('route-badge');
    if (badgeEl) {
        badgeEl.innerHTML = `<span class="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full border border-primary/20 tracking-wider uppercase">${state.activeRoute?.name || '기본 노선'}</span>`;
    }

    // Synchronize Member Selector with Active Route
    if (ui.memberSelect) {
        ui.memberSelect.dataset.manualMode = String(state.manualMode);

        if (state.manualMode) {
            // 수동 모드: 본인 이름만 선택하는 드롭다운
            ui.memberSelect.innerHTML = `
                <option value="" disabled ${!state.selectedMemberId ? 'selected' : ''}>-- 본인 이름 선택 (수동모드) --</option>
                ${state.masterData.map(m =>
                    `<option value="${m.member_id}" ${m.member_id === state.selectedMemberId ? 'selected' : ''}>${m.name}</option>`
                ).join('')}
            `;
        } else {
            // 팀원 모드: 전체 명부 (ID 포함)
            ui.memberSelect.innerHTML = `
                <option value="" disabled>수동모드</option>
                ${state.masterData.map(m =>
                    `<option value="${m.member_id}" ${m.member_id === state.selectedMemberId ? 'selected' : ''}>${m.name} (#${m.member_id})</option>`
                ).join('')}
            `;
        }

        // Force the dropdown value to match state
        if (state.selectedMemberId && ui.memberSelect.value !== state.selectedMemberId) {
            ui.memberSelect.value = state.selectedMemberId;
        }
    }

    // Tab-specific rendering
    if (state.currentTab === 'calendar') {
        renderCalendar();
        updateMonthlyStats();
    } else if (state.currentTab === 'dashboard') {
        renderComprehensiveAnalysis();
    } else if (state.currentTab === 'team') {
        renderTeamList();
    } else if (state.currentTab === 'fetch') {
        renderOperationalInsight();
    }
    
    renderRecentAnalyses();
    updateManualModeUI();
}

function toggleManualMode() {
    state.manualMode = !state.manualMode;
    localStorage.setItem('manual_mode_enabled', state.manualMode);

    if (state.manualMode) {
        // 수동 모드 진입 시: 드롭다운 초기화 → 본인 이름 선택 유도
        state.selectedMemberId = '';
        localStorage.setItem('last_selected_member', '');
        showToast('🔧 수동 모드 켜짐 — 본인 이름을 선택하세요');
    } else {
        // 팀원 모드 복귀 시: 첫 번째 멤버로 자동 선택
        state.selectedMemberId = state.masterData[0]?.member_id || '';
        localStorage.setItem('last_selected_member', state.selectedMemberId);
        showToast('👥 팀원 모드 복귀');
    }

    refreshUI();
}

function updateManualModeUI() {
    if (!ui.btnToggleManual) return;

    // 수동모드 상단 컬러바 토글 (시각적 알림)
    let modeBar = document.getElementById('manual-mode-bar');
    if (!modeBar) {
        modeBar = document.createElement('div');
        modeBar.id = 'manual-mode-bar';
        modeBar.className = 'manual-mode-bar';
        modeBar.innerHTML = '<span>🔧 수동 모드 진행 중</span>';
        document.body.prepend(modeBar);
    }
    modeBar.style.display = state.manualMode ? 'flex' : 'none';

    if (state.manualMode) {
        ui.btnToggleManual.innerHTML = `<span class="material-symbols-outlined text-sm">handyman</span> 수동 모드 ON`;
        ui.btnToggleManual.classList.remove('text-outline-variant', 'bg-surface-container-highest');
        ui.btnToggleManual.classList.add('text-primary', 'bg-primary/10', 'ring-primary/40');
    } else {
        ui.btnToggleManual.innerHTML = `<span class="material-symbols-outlined text-sm">edit_note</span> 수동 모드 OFF`;
        ui.btnToggleManual.classList.add('text-outline-variant', 'bg-surface-container-highest');
        ui.btnToggleManual.classList.remove('text-primary', 'bg-primary/10', 'ring-primary/40');
    }
}

function renderRecentAnalyses() {
    const listEl = document.getElementById('recent-analysis-list');
    if (!listEl) return;
    
    if (state.recentAnalyses.length === 0) {
        listEl.innerHTML = '<p class="text-[10px] text-outline-variant italic">최근 저장된 내역이 없습니다.</p>';
        return;
    }
    
    listEl.innerHTML = state.recentAnalyses.slice(-5).reverse().map(item => `
        <div class="flex items-center justify-between p-3 bg-surface-container-highest/20 rounded-xl border border-outline-variant/10">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-primary">check_circle</span>
                <span class="text-[11px] font-bold text-on-surface">${item.date} (${item.count}건)</span>
            </div>
            <span class="text-[9px] text-outline-variant font-medium">${item.time}</span>
        </div>
    `).join('');
}

function renderComprehensiveAnalysis() {
    if (ui.analysisContainer) {
        ui.analysisContainer.innerHTML = `
            <div class="text-center py-10">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                <p class="text-xs text-outline-variant">데이터를 정밀 분석 중입니다...</p>
            </div>`;
    }

    if (!state.engine) return;
    
    // Public Holidays for 2024 South Korea (Relevant for April)
    const holidays2024 = [
        '2024-01-01', '2024-02-09', '2024-02-10', '2024-02-11', '2024-02-12',
        '2024-03-01', '2024-04-10', '2024-05-01', '2024-05-05', '2024-05-06',
        '2024-05-15', '2024-06-06', '2024-08-15', '2024-09-16', '2024-09-17',
        '2024-09-18', '2024-10-03', '2024-10-09', '2024-12-25'
    ];

    const currentYear = state.displayDate.getFullYear();
    const currentMonth = state.displayDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const monthStr = `${currentYear}년 ${currentMonth + 1}월`;
    
    if (ui.analysisDateDisplay) ui.analysisDateDisplay.textContent = monthStr;

    const twoStoryBuses = ['3737', '3733', '1119', '1063'];
    const analysisResults = [];

    // 1. Calculate Stats
    const membersToAnalyze = state.manualMode ? 
        [state.masterData.find(m => m.member_id === state.selectedMemberId)].filter(Boolean) : 
        state.masterData;
    const activeLogs = state.manualMode ? state.manualLogs : state.workLogs;

    membersToAnalyze.forEach(member => {
        let stats = {
            member: member,
            consecutiveCount: 0,
            maxStreak: 0,
            busCount: 0,
            holidayPM: 0,
            offdayBreach: 0,
            riskScore: 0
        };

        let streak = 0;
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const log = activeLogs[dateStr] ? activeLogs[dateStr][member.member_id] : null;
            const dateObj = new Date(currentYear, currentMonth, d);
            const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
            const isPublicHoliday = holidays2024.includes(dateStr);
            const isHoliday = isWeekend || isPublicHoliday;
            const dayName = dateObj.toLocaleDateString('ko-KR', { weekday: 'short' });

            if (log && log.status !== 'OFF') {
                // Streak
                streak++;
                if (streak > stats.maxStreak) stats.maxStreak = streak;
                
                // 2-Story Bus
                if (log.vehicle && twoStoryBuses.includes(log.vehicle.slice(-4))) {
                    stats.busCount++;
                }

                // Holiday PM (Weekends OR Public Holidays)
                if (isHoliday && log.status === 'PM') {
                    stats.holidayPM++;
                }

                // Off-day Breach
                if (member.fixed_off === dayName) {
                    stats.offdayBreach++;
                }
            } else {
                if (streak >= 6) stats.consecutiveCount++;
                streak = 0;
            }
        }
        if (streak >= 6) stats.consecutiveCount++;

        // Calculate Risk Score (Excluding doubleShift)
        // Weighting: Consecutive(6+)=10, Streak(per day over 5)=2, 2story=3, HolidayPM=4, Breach=10
        stats.riskScore = (stats.consecutiveCount * 10) + 
                          (stats.maxStreak > 6 ? (stats.maxStreak - 5) * 2 : 0) + 
                          (stats.busCount * 2) + 
                          (stats.holidayPM * 3) + 
                          (stats.offdayBreach * 10);
        
        if (stats.maxStreak >= 6 || stats.busCount > 0 || stats.holidayPM > 0 || stats.offdayBreach > 0) {
            analysisResults.push(stats);
        }
    });

    // 2. Render Main Analysis Table
    if (ui.analysisContainer) {
        if (analysisResults.length === 0) {
            ui.analysisContainer.innerHTML = `
                <div class="text-center py-10">
                    <span class="material-symbols-outlined text-4xl text-outline-variant opacity-20">verified</span>
                    <p class="text-xs text-outline-variant mt-2 font-medium">이번 달은 특이 분석 사항이 없습니다.</p>
                </div>`;
        } else {
            // Sort by Risk Score descending
            const sortedResults = [...analysisResults].sort((a, b) => b.riskScore - a.riskScore);

            ui.analysisContainer.innerHTML = `
                <div class="overflow-x-auto -mx-6 px-6">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-outline-variant/10">
                                <th class="py-3 text-[10px] font-black text-outline-variant uppercase tracking-wider">순위</th>
                                <th class="py-3 text-[10px] font-black text-outline-variant uppercase tracking-wider">기사명</th>
                                <th class="py-3 text-[10px] font-black text-outline-variant uppercase tracking-wider text-center">최대연속</th>
                                <th class="py-3 text-[10px] font-black text-outline-variant uppercase tracking-wider text-center">2층버스</th>
                                <th class="py-3 text-[10px] font-black text-outline-variant uppercase tracking-wider text-center">휴일오후</th>
                                <th class="py-3 text-[10px] font-black text-outline-variant uppercase tracking-wider text-center text-error border-l border-outline-variant/5">휴무위반</th>
                                <th class="py-3 text-[10px] font-black text-primary uppercase tracking-wider text-right">관리지수</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-outline-variant/5">
                            ${sortedResults.map((r, idx) => `
                                <tr class="hover:bg-surface-container-low/30 transition-colors group ${r.riskScore > 50 ? 'dash-risk-critical' : r.riskScore > 30 ? 'dash-risk-warn' : ''}">
                                    <td class="py-4 text-[10px] font-bold text-outline-variant">${idx + 1}</td>
                                    <td class="py-4 font-bold text-xs text-on-surface">
                                        <div class="flex items-center gap-2">
                                            ${r.member.name}
                                            ${r.riskScore > 30 ? '<span class="inline-block w-1.5 h-1.5 bg-error rounded-full animate-pulse"></span>' : ''}
                                        </div>
                                    </td>
                                    <td class="py-4 text-center">
                                        <span class="text-xs font-bold ${r.maxStreak >= 7 ? 'text-error' : 'text-on-surface'}">${r.maxStreak}</span>
                                        <span class="text-[9px] text-outline-variant">일</span>
                                    </td>
                                    <td class="py-4 text-center">
                                        <span class="text-xs font-bold text-secondary">${r.busCount}</span>
                                        <span class="text-[9px] text-outline-variant">회</span>
                                    </td>
                                    <td class="py-4 text-center">
                                        <span class="text-xs font-bold text-amber-600">${r.holidayPM}</span>
                                        <span class="text-[9px] text-outline-variant">회</span>
                                    </td>
                                    <td class="py-4 text-center border-l border-outline-variant/5">
                                        <span class="text-xs font-black ${r.offdayBreach > 0 ? 'text-error' : 'text-outline-variant/30'}">${r.offdayBreach}</span>
                                        <span class="text-[9px] ${r.offdayBreach > 0 ? 'text-error' : 'text-outline-variant/30'}">건</span>
                                    </td>
                                    <td class="py-4 text-right">
                                        <div class="flex flex-col items-end">
                                            <span class="text-sm font-black text-primary">${Math.round(r.riskScore)}</span>
                                            <div class="w-12 h-1 bg-surface-container-high rounded-full mt-1 overflow-hidden">
                                                <div class="h-full dash-risk-bar" style="width: ${Math.min(100, r.riskScore * 2)}%; background: ${r.riskScore > 50 ? 'linear-gradient(90deg,#f97316,#ef4444)' : r.riskScore > 25 ? 'linear-gradient(90deg,#fbbf24,#f97316)' : 'linear-gradient(90deg,#34d399,#059669)'}; transition: width 0.8s ease;"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
    }

    // 3. Update Fatigue Ranking (Top 3 simple summary)
    if (ui.fatigueRankingContainer && ui.fatigueRankingList) {
        const topRisk = analysisResults.sort((a,b) => b.riskScore - a.riskScore).slice(0, 3);
        if (topRisk.length > 0 && topRisk[0].riskScore > 10) {
            ui.fatigueRankingContainer.classList.remove('hidden');
            ui.fatigueRankingList.innerHTML = topRisk.map((r, idx) => `
                <div class="flex items-center justify-between bg-white/40 p-3 rounded-2xl border border-error/10">
                    <div class="flex items-center gap-3">
                        <div class="w-6 h-6 flex items-center justify-center rounded-full bg-error/10 text-[10px] font-black text-error">
                            ${idx + 1}
                        </div>
                        <span class="text-xs font-bold text-on-surface">${r.member.name}</span>
                    </div>
                    <div class="flex gap-1">
                        ${r.maxStreak >= 7 ? '<span class="text-[9px] bg-error/10 text-error px-1.5 py-0.5 rounded-lg font-bold">장기연속</span>' : ''}
                        ${r.offdayBreach > 0 ? '<span class="text-[9px] bg-error text-white px-1.5 py-0.5 rounded-lg font-bold">휴무위반</span>' : ''}
                        ${r.holidayPM >= 4 ? '<span class="text-[9px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-lg font-bold">휴일편중</span>' : ''}
                    </div>
                </div>
            `).join('');
        } else {
            ui.fatigueRankingContainer.classList.add('hidden');
        }
    }
}

function openBandConfig() {
    const route = state.activeRoute;
    if (!route) return;
    
    ui.configRouteName.value = route.name || "";
    document.getElementById('config-band-keyword').value = route.config.keyword || "";
    
    // Fill team import text area with current members
    ui.configTeamImport.value = (route.members || []).map(m => 
        `${m.name},${m.member_id},${m.phone},${m.fixed_off},${m.fixed_vehicle}`
    ).join('\n');

    updateRouteSelector();
    document.getElementById('band-config-modal').classList.remove('hidden');
    document.getElementById('band-config-modal').querySelector('div').classList.remove('translate-y-full');
}

function updateRouteSelector() {
    if (!ui.routeSelector) return;
    ui.routeSelector.innerHTML = Object.values(state.routes).map(r => 
        `<option value="${r.id}" ${r.id === state.activeRouteId ? 'selected' : ''}>${r.name}</option>`
    ).join('');
}

function switchRoute(routeId) {
    if (!state.routes[routeId]) return;
    state.activeRouteId = routeId;
    localStorage.setItem('active_route_id', routeId);
    
    // Reset selected member to the first one in the new route
    state.selectedMemberId = state.masterData[0]?.member_id || "";
    localStorage.setItem('last_selected_member', state.selectedMemberId);
    
    // Re-initialize engine with new master data
    state.engine = new window.IntegrityEngine(state.masterData);
    
    refreshUI();
    openBandConfig(); // Stay in settings but refresh fields
}

function addNewRoute() {
    const name = prompt("새로운 노선명을 입력하세요:", "신도시 노선");
    if (!name) return;
    
    const id = "route_" + Date.now();
    state.routes[id] = {
        id: id,
        name: name,
        members: [],
        config: { keyword: "배차표", author: "" }
    };
    
    saveRoutes();
    switchRoute(id);
}

function saveRoutes() {
    localStorage.setItem('bus_routes_config', JSON.stringify(state.routes));
}

function saveBandConfig() {
    const route = state.activeRoute;
    if (!route) return;

    route.name = ui.configRouteName.value;
    route.config.keyword = document.getElementById('config-band-keyword').value;

    // Parse Team Import
    const rawMembers = ui.configTeamImport.value.split('\n').filter(line => line.trim().length > 0);
    const parsedMembers = rawMembers.map(line => {
        const [name, id, phone, off, vehicle] = line.split(',').map(s => s.trim());
        return { 
            name: name || "이름없음", 
            member_id: id || "ID없음", 
            phone: phone || "번호없음", 
            fixed_off: off || "미정", 
            fixed_vehicle: vehicle || "스피아" 
        };
    });

    if (parsedMembers.length > 0) {
        route.members = parsedMembers;
    }

    saveRoutes();
    
    // Update active engine
    state.engine = new window.IntegrityEngine(state.masterData);
    
    closeBandConfig();
    refreshUI();
    alert(`노선 '${route.name}' 설정 및 팀원(${route.members.length}명)이 저장되었습니다.`);
}

function closeBandConfig() {
    const modal = document.getElementById('band-config-modal');
    modal.querySelector('div').classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
}


async function runAIAnalysis() {
    const input = document.getElementById('analysis-input').value;
    if (!input.trim()) return alert('분석할 내용을 입력해주세요.');
    
    const runBtn = document.getElementById('btn-run-analysis');
    const originalText = runBtn.innerHTML;
    runBtn.disabled = true;
    runBtn.innerHTML = '<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> 분석 중...';

    try {
        const results = state.engine.parseBandText(input, state.displayDate);
        if (results.length === 0) {
            runBtn.disabled = false;
            runBtn.innerHTML = originalText;
            showToast('데이터를 인식하지 못했습니다. 형식을 확인해주세요.');
            return;
        }

        // 가장 마지막으로 인식된 날짜를 기준으로 달력 이동 (보통 최신 배차가 뒤에 있으므로)
        const lastEntry = results[results.length - 1];
        const targetDate = new Date(lastEntry.date);
        
        // 현재 보고 있는 달과 다르면 자동 전환
        if (state.displayDate.getMonth() !== targetDate.getMonth() || 
            state.displayDate.getFullYear() !== targetDate.getFullYear()) {
            state.displayDate = targetDate;
            console.log(`[UI] 분석된 날짜에 맞춰 달력을 ${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월로 이동합니다.`);
        }

        // 증분 저장을 위한 맵 생성
        const incrementalLogs = {};

        results.forEach(entry => {
            if (!state.workLogs[entry.date]) state.workLogs[entry.date] = {};
            state.workLogs[entry.date][entry.member_id] = entry;
            
            // 증분 저장 데이터 구성
            if (!incrementalLogs[entry.date]) incrementalLogs[entry.date] = {};
            incrementalLogs[entry.date][entry.member_id] = entry;
        });

        localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
        
        // 클라우드 동기화 (Firebase) - 최적화: 전체가 아닌 방금 분석된 데이터만 전송
        if (window.firebaseService) {
            window.firebaseService.saveWorkLogs(incrementalLogs);
        }

        // "안티"의 전처리 결과 요약 (인식 로그)
        const summary = results.summary;
        const analysisDate = summary.dates.length > 1 
            ? `${summary.dates[0]} 외 ${summary.dates.length - 1}일` 
            : summary.dates[0] || "알 수 없는 날짜";

        // 최근 내역 추가 (요약 정보 포함)
        state.recentAnalyses.unshift({
            date: analysisDate,
            count: results.length,
            memberCount: summary.memberCount,
            errorCount: summary.errorCount,
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        });
        if (state.recentAnalyses.length > 10) state.recentAnalyses.pop();
        sessionStorage.setItem('recent_analyses', JSON.stringify(state.recentAnalyses));

        showToast(`${results.length}건 누적 및 클라우드 동기화 완료!`);
        
        // [자동화] 입력란 초기화 및 다음 입력을 위한 포커스 (연속 입력 지원)
        const inputArea = document.getElementById('analysis-input');
        if (inputArea) {
            console.log('[UI] 입력창 초기화');
            inputArea.value = '';
            inputArea.focus();
        }

        // 캘린더 탭으로 자동 전환 및 해당 월 렌더링 강제 실행
        console.log('[UI] 캘린더 탭으로 전환');
        switchTab('calendar');
        
        // state.displayDate가 변경되었으므로 캘린더를 새로 그림
        if (typeof renderCalendar === 'function') {
            renderCalendar();
        }
        refreshUI();

        runBtn.disabled = false;
        runBtn.innerHTML = originalText;
    } catch (e) { 
        runBtn.disabled = false;
        runBtn.innerHTML = originalText;
        showModal('오류: ' + e.message, false, true); 
    }
}

function switchTab(tabId) {
    // 탭 순서: dashboard(0) calendar(1) team(2) fetch(3)
    const TAB_ORDER = ['dashboard', 'calendar', 'team', 'fetch'];
    const prevIdx = TAB_ORDER.indexOf(state.currentTab);
    const nextIdx = TAB_ORDER.indexOf(tabId);
    const dir = nextIdx > prevIdx ? 'left' : 'right'; // 오른쪽 = 슬라이드 왼쪽으로

    state.currentTab = tabId;
    ui.navItems.forEach(item => item.classList.toggle('active', item.dataset.tab === tabId));
    ui.tabContents.forEach(tab => {
        const isActive = tab.id === `tab-${tabId}`;
        tab.classList.toggle('active', isActive);
        if (isActive) {
            tab.style.setProperty('--slide-dir', dir === 'left' ? '30px' : '-30px');
            tab.classList.add('tab-slide-in');
            setTimeout(() => tab.classList.remove('tab-slide-in'), 400);
        }
    });
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

    // 수동모드: 달력 상단에 본인 이름 고정 표시
    let calNameTag = document.getElementById('cal-member-name-tag');
    if (!calNameTag) {
        calNameTag = document.createElement('div');
        calNameTag.id = 'cal-member-name-tag';
        calNameTag.className = 'cal-member-name-tag';
        ui.calendarGrid.parentElement.insertBefore(calNameTag, ui.calendarGrid);
    }
    if (state.manualMode && state.selectedMemberId) {
        const me = state.masterData.find(m => m.member_id === state.selectedMemberId);
        calNameTag.style.display = 'flex';
        calNameTag.innerHTML = `<span class="cal-avatar">${me?.name?.[0] || '?'}</span><span>${me?.name || ''} 님의 개인 스케줄</span>`;
    } else {
        calNameTag.style.display = 'none';
    }

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
        if (dateStr === todayStr) dayEl.classList.add('bg-primary-fixed', 'border-2', 'border-primary', 'shadow-sm', 'cal-today');
        // 주말 클래스 추가 (시각적 목적)
        const dow = (firstDay + d - 1) % 7;
        if (dow === 0) dayEl.classList.add('cal-sunday');
        if (dow === 6) dayEl.classList.add('cal-saturday');
        
        dayEl.innerHTML = `<span class="text-sm font-bold ${ dow === 0 ? 'text-error' : (dow === 6 ? 'text-secondary' : '') }">${d}</span>`;
        dayEl.onclick = () => openEditSheet(dateStr);

        const activeLogs = state.manualMode ? state.manualLogs : state.workLogs;
        const log = activeLogs[dateStr]?.[state.selectedMemberId];
        if (log) {
            const badge = document.createElement('span');
            badge.className = 'cal-status-emoji';
            badge.textContent = log.status === 'AM' ? '🌅' : (log.status === 'PM' ? '🌆' : '⭐');
            dayEl.appendChild(badge);
        }
        ui.calendarGrid.appendChild(dayEl);
    }
}

function updateMonthlyStats() {
    const year = state.displayDate.getFullYear();
    const month = state.displayDate.getMonth() + 1;
    let am = 0, pm = 0;
    const activeLogs = state.manualMode ? state.manualLogs : state.workLogs;
    Object.keys(activeLogs).forEach(date => {
        const [y, m] = date.split('-').map(Number);
        if (y === year && m === month && activeLogs[date][state.selectedMemberId]) {
            const s = activeLogs[date][state.selectedMemberId].status;
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

    // 수동 모드 배너
    if (state.manualMode) {
        const banner = document.createElement('div');
        banner.className = 'flex items-center gap-2 px-4 py-3 mb-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-xs font-black';
        banner.innerHTML = `<span class="material-symbols-outlined text-sm">handyman</span> 수동 모드 — 본인 기록만 표시됩니다`;
        listEl.appendChild(banner);
    }

    const membersToDisplay = state.manualMode ? 
        [state.masterData.find(m => m.member_id === state.selectedMemberId)].filter(Boolean) : 
        state.masterData;

    // 수동 모드인데 기사님 미선택 시 안내
    if (state.manualMode && membersToDisplay.length === 0) {
        const guide = document.createElement('div');
        guide.className = 'text-center py-10';
        guide.innerHTML = `
            <span class="material-symbols-outlined text-4xl text-outline-variant opacity-30">person_search</span>
            <p class="text-xs text-outline-variant mt-3 font-medium">상단 드롭다운에서 본인 이름을 선택하세요</p>
            <p class="text-[10px] text-outline-variant/60 mt-1">선택 후 개인 근무 기록을 확인할 수 있습니다</p>
        `;
        listEl.appendChild(guide);
        return;
    }

    membersToDisplay.forEach((member, index) => {
        const flatLogs = [];
        const activeLogs = state.manualMode ? state.manualLogs : state.workLogs;
        Object.keys(activeLogs).forEach(date => {
            if (activeLogs[date][member.member_id]) flatLogs.push({ date, status: activeLogs[date][member.member_id].status });
        });
        const stats = state.engine ? state.engine.calculateStats(member.member_id, flatLogs) : { consecutive_days: 0, status: 'NORMAL' };

        // 아바타 색상: 이름 첫 글자 기반 해시
        const avatarColors = ['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#6366f1'];
        const avatarColor = avatarColors[(member.name.charCodeAt(0) || 0) % avatarColors.length];
        const initial = member.name?.[0] || '?';

        // 상태 배지 이모지
        const statusEmoji = stats.consecutive_days >= 7 ? '🔴' : stats.consecutive_days >= 4 ? '🟡' : '🟢';
        const statusLabel = stats.consecutive_days >= 7 ? '위험' : stats.consecutive_days >= 4 ? '주의' : '정상';
        
        const card = document.createElement('div');
        card.className = `glass-panel p-5 rounded-3xl border border-white/40 shadow-sm mb-4 animate-in fade-in slide-in-from-bottom duration-500 ${member.member_id === state.selectedMemberId ? 'ring-2 ring-primary ring-offset-2' : ''}`;
        card.style = `animation-delay: ${index * 80}ms`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="flex items-center gap-3">
                    <div class="team-avatar" style="background:${avatarColor}">${initial}</div>
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <h4 class="font-black text-on-surface text-lg text-primary">${member.name}</h4>
                            <span class="text-[9px] font-black px-2 py-0.5 bg-primary/10 text-primary rounded-full uppercase">사번 ${member.member_id}</span>
                        </div>
                        <p class="text-xs text-on-surface-variant font-bold flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px]">call</span> ${member.phone}
                        </p>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1">
                    <span class="team-status-badge ${stats.consecutive_days >= 7 ? 'badge-danger' : stats.consecutive_days >= 4 ? 'badge-warn' : 'badge-safe'}">
                        ${statusEmoji} ${statusLabel}
                    </span>
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
    const activeLogs = state.manualMode ? state.manualLogs : state.workLogs;
    if (!activeLogs[dateStr]) activeLogs[dateStr] = {};
    if (status === 'DELETE') delete activeLogs[dateStr][state.selectedMemberId];
    else activeLogs[dateStr][state.selectedMemberId] = { status, vehicle: 'manual' };
    
    // 로컬 저장소 업데이트 및 동기화 (수동 모드와 팀 모드 분리)
    if (state.manualMode) {
        localStorage.setItem('bus_manual_logs_v2', JSON.stringify(state.manualLogs));
    } else {
        localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
        if (window.firebaseService) {
            window.firebaseService.saveWorkLogs(state.workLogs);
        }
    }
    
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

    const membersToAnalyze = state.manualMode ? 
        [state.masterData.find(m => m.member_id === state.selectedMemberId)].filter(Boolean) : 
        state.masterData;

    membersToAnalyze.forEach(m => {
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
