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
    displayDate: new Date(), // Current Year and Month
    engine: null
};

// --- UI Elements ---
const ui = {
    memberSelect: document.getElementById('member-select'), // May be null in new UI
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
    
    // Dashboard Elements
    dashTotalDays: document.getElementById('dash-total-days'),
    ratioAMBar: document.getElementById('ratio-am-bar'),
    ratioPMBar: document.getElementById('ratio-pm-bar'),
    dashAMCount: document.getElementById('dash-am-count'),
    dashPMCount: document.getElementById('dash-pm-count'),
    fatigueLevel: document.getElementById('fatigue-level'),
    dashConsecutive: document.getElementById('dash-consecutive'),
    monthlyTrendList: document.getElementById('monthly-trend-list')
};

// --- Initialization ---
async function init() {
    // [추가] 마스터 데이터 최신화 시도
    try {
        const mResponse = await fetch('resources/master_members.json');
        if (mResponse.ok) {
            const latestMaster = await mResponse.json();
            state.masterData = latestMaster;
            console.log("📋 마스터 명부 데이터 로드 완료!");
        }
    } catch (e) { console.warn("마스터 데이터 로딩 실패, 하드코딩된 데이터 사용"); }

    state.engine = new window.IntegrityEngine(state.masterData);
    
    // Auto-set current month if not set
    if (!state.displayDate) state.displayDate = new Date();

    // Member dropdown (only if exists)
    if (ui.memberSelect) {
        ui.memberSelect.innerHTML = state.masterData.map(m => 
            `<option value="${m.member_id}" ${m.member_id === state.selectedMemberId ? 'selected' : ''}>${m.name} (#${m.member_id})</option>`
        ).join('');
    }

    bindEvents();
    refreshUI();

    // Firebase Cloud Hydration
    if (window.firebaseService) {
        state.workLogs = await window.firebaseService.loadWorkLogs(state.workLogs);
        localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
        refreshUI();
    }

    // [강화] 로컬 보존 데이터 자동 수혈 (전처리 우선)
    await loadSavedDispatch();
}

function bindEvents() {
    // Nav
    ui.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            if (['dashboard', 'calendar', 'team', 'fetch'].includes(tab)) {
                switchTab(tab);
            }
        });
    });

    // Month Navigation
    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));

    // Selection (only if exists)
    if (ui.memberSelect) {
        ui.memberSelect.addEventListener('change', (e) => {
            state.selectedMemberId = e.target.value;
            localStorage.setItem('last_selected_member', state.selectedMemberId);
            refreshUI();
        });
    }

    // Action Buttons
    ui.modalClose.addEventListener('click', () => ui.modal.classList.add('hidden'));

    // Analysis View & Auto Fetch Buttons
    document.getElementById('btn-run-analysis')?.addEventListener('click', runAIAnalysis);
    document.getElementById('btn-band-config')?.addEventListener('click', openBandConfig);
    document.getElementById('btn-config-close')?.addEventListener('click', closeBandConfig);
    document.getElementById('btn-config-save')?.addEventListener('click', saveBandConfig);
    document.getElementById('btn-auto-fetch')?.addEventListener('click', runAutoFetch);

    // Work Logging Buttons
    document.getElementById('btn-am')?.addEventListener('click', () => logWork('AM'));
    document.getElementById('btn-pm')?.addEventListener('click', () => logWork('PM'));
    document.getElementById('btn-all')?.addEventListener('click', () => logWork('ALL'));

    // Safety Checks
    const safetyChecks = document.querySelectorAll('.safety-check');
    const btnSafetyComplete = document.getElementById('btn-safety-complete');

    if (safetyChecks.length && btnSafetyComplete) {
        // [추가] 근무현황분석 단축 버튼 연결
        document.getElementById('btn-ceo-report-op')?.addEventListener('click', generateCEOReport);

        safetyChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                const allChecked = Array.from(safetyChecks).every(c => c.checked);
                if (allChecked) {
                    btnSafetyComplete.disabled = false;
                    btnSafetyComplete.classList.remove('bg-slate-200', 'text-slate-500');
                    btnSafetyComplete.classList.add('bg-primary', 'text-on-primary', 'shadow-md');
                } else {
                    btnSafetyComplete.disabled = true;
                    btnSafetyComplete.classList.add('bg-slate-200', 'text-slate-500');
                    btnSafetyComplete.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
                }
            });
        });

        btnSafetyComplete.addEventListener('click', () => {
            showModal('점검 완료! 오늘도 안전운전 하세요.', false, true);
            safetyChecks.forEach(c => c.checked = false);
            btnSafetyComplete.disabled = true;
            btnSafetyComplete.classList.add('bg-slate-200', 'text-slate-500');
            btnSafetyComplete.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
        });
    }

// Safety Manual Modal Dynamic Rendering
    const btnManual = document.getElementById('btn-manual');
    const manualModal = document.getElementById('manual-modal');
    const manualClose = document.getElementById('manual-close');
    const manualContent = document.getElementById('manual-content');

    window.renderManualList = function() {
        let html = '<div class="space-y-3">';
        if (window.MANUALS_DATABASE && window.MANUALS_DATABASE.length > 0) {
            window.MANUALS_DATABASE.forEach(m => {
                html += `
                    <button class="w-full text-left p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl flex justify-between items-center shadow-sm active:scale-95 transition-transform" onclick="window.renderManualDetail('${m.id}')">
                        <span class="font-bold text-on-surface text-base"><span class="material-symbols-outlined text-primary align-middle mr-2">menu_book</span> ${m.title}</span>
                        <span class="material-symbols-outlined text-outline">chevron_right</span>
                    </button>
                `;
            });
        } else {
            html += '<p class="text-center py-8 text-outline">데이터베이스에 매뉴얼이 없습니다.</p>';
        }
        html += '</div>';
        manualContent.innerHTML = html;
    };

    window.renderManualDetail = function(manualId) {
        const manual = window.MANUALS_DATABASE.find(m => m.id === manualId);
        if (!manual) return;

        let html = `
            <button class="mb-4 flex items-center font-bold text-primary active:opacity-70 transition-opacity" onclick="window.renderManualList()">
                <span class="material-symbols-outlined mr-1">arrow_back</span> 목차로 돌아가기
            </button>
            <h4 class="font-black text-on-surface text-xl mb-4 border-b pb-4 border-outline-variant/30">${manual.title}</h4>
            <div class="space-y-4">
        `;

        manual.sections.forEach((sec, idx) => {
            html += `
                <details class="group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm" ${idx === 0 ? 'open' : ''}>
                    <summary class="font-bold text-on-surface p-4 cursor-pointer flex justify-between items-center group-open:bg-surface-container-low transition-colors list-none [&::-webkit-details-marker]:hidden">
                        <span class="pr-4 leading-tight">${sec.subtitle}</span>
                        <span class="material-symbols-outlined text-outline transition-transform group-open:rotate-180 flex-shrink-0">expand_more</span>
                    </summary>
                    <div class="p-4 border-t border-outline-variant/30 whitespace-pre-wrap leading-relaxed text-sm text-on-surface-variant bg-surface">
                        ${sec.content}
                    </div>
                </details>
            `;
        });

        html += '</div>';
        manualContent.innerHTML = html;
    };

    if (btnManual && manualModal) {
        btnManual.addEventListener('click', () => {
            window.renderManualList();
            manualModal.classList.remove('hidden');
            // Animate
            setTimeout(() => {
                manualModal.firstElementChild.classList.add('translate-y-0');
                manualModal.firstElementChild.classList.remove('translate-y-full');
            }, 10);
        });

        manualClose.addEventListener('click', () => {
            manualModal.firstElementChild.classList.add('translate-y-full');
            manualModal.firstElementChild.classList.remove('translate-y-0');
            setTimeout(() => {
                manualModal.classList.add('hidden');
            }, 300);
        });
    }
}

// --- Logic Update ---

function refreshUI() {
    renderCalendar();
    updateMonthlyStats();
    if (state.currentTab === 'dashboard') renderAnalysisView();
    if (state.currentTab === 'team') renderTeamList();
    if (state.currentTab === 'fetch') renderOperationalInsight(); // [추가] 운행/배차 탭 현황판 연동
}

function renderAnalysisView() {
    // Analysis View initialization if needed
}

// --- BAND AUTO-FETCH & CONFIG LOGIC ---

function openBandConfig() {
    const config = JSON.parse(localStorage.getItem('band_config') || '{}');
    document.getElementById('config-route-name').value = config.route || '';
    document.getElementById('config-band-url').value = config.url || '';
    document.getElementById('config-band-keyword').value = config.keyword || '';
    const authorElem = document.getElementById('config-band-author');
    if (authorElem) authorElem.value = config.author || '';
    
    const modal = document.getElementById('band-config-modal');
    modal.classList.remove('hidden');
    // Animate up
    setTimeout(() => {
        modal.querySelector('div').classList.remove('translate-y-full');
    }, 10);
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
    const authorElem = document.getElementById('config-band-author');
    const author = authorElem ? authorElem.value.trim() : '';

    if (!url) {
        alert('네이버 밴드 주소는 필수입니다.');
        return;
    }

    localStorage.setItem('band_config', JSON.stringify({ route, url, keyword, author }));
    closeBandConfig();
    showModal('설정이 저장되었습니다. 이제 자동 수집이 지원됩니다.', false, true);
}

async function runAutoFetch() {
    const config = JSON.parse(localStorage.getItem('band_config') || '{}');
    
    if (!config.url) {
        showModal('밴드 주소가 설정되지 않았습니다. 우측 ⚙️ 설정에서 정보를 등록해주세요.', false, true);
        return;
    }

    showModal('밴드에서 지난달부터의 자료를 3개씩 누적으로 수집 중입니다...', true);

    // 3개 단위 연쇄 수집을 위해 타겟 URL 오픈
    let targetUrl = config.url;
    if (config.author) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl += `${sep}target_author=${encodeURIComponent(config.author)}`;
    }
    
    window.open(targetUrl, 'band_fetch_window', 'width=1100,height=850');
    
    // 사용자가 '수집 취소' 버튼을 누르면 대기 모달을 끌 수 있도록 처리
    const closeBtn = document.getElementById('modal-close');
    closeBtn.textContent = '수집 취소/닫기';
    closeBtn.classList.remove('hidden');
    
    const origHandler = closeBtn.onclick;
    closeBtn.onclick = () => {
        ui.modal.classList.add('hidden');
        closeBtn.onclick = origHandler;
    };
}

// 크롬 플러그인(content.js)에서 보내는 데이터 수신 귀대기 (Listener)
window.addEventListener('message', async (event) => {
    // 밴드(플러그인)에서 넘어온 데이터인지 검증
    if (event.data && event.data.type === 'BAND_DISPATCH_DATA') {
        const text = event.data.text;
        
        // 가져온 텍스트를 분석 입력창에 자동 삽입
        const inputElem = document.getElementById('analysis-input');
        if(inputElem) {
            inputElem.value = text;
            showModal('밴드 배차 데이터를 성공적으로 수신했습니다! 즉시 분석을 시작합니다...', true);
            
            // 데이터 수신 완료 확인 후, 분석기(범용 엔진) 논스톱 자동 실행
            await new Promise(r => setTimeout(r, 1000));
            runAIAnalysis();
        }
    }
});

// --- ANALYSIS VIEW LOGIC --

async function runAIAnalysis() {
    const input = document.getElementById('analysis-input').value;
    const resultsContainer = document.getElementById('analysis-results');
    
    if (!input.trim()) {
        alert('분석할 배차표 텍스트를 입력해주세요.');
        return;
    }

    showModal('통합 엔진으로 즉시 분석 중...', true);
    await new Promise(r => setTimeout(r, 400)); // 로컬은 빠르므로 지연 시간 단축

    try {
        const results = state.engine.parseBandText(input, state.displayDate);
        
        if (results.length === 0) {
            showModal('유효한 배차 데이터를 찾지 못했습니다. 형식을 확인해 주세요.', false, true);
            return;
        }

        // [팀원 전체 누적 관리 관리 및 내 근무 분리]
        let syncCount = 0;
        let totalSyncCount = 0;
        const myName = (state.masterData.find(m => m.member_id === state.selectedMemberId) || {}).name;

        results.forEach(entry => {
            // 본인 식별: 사번 일치 또는 이름+임시ID(NEW_) 일치
            const isMe = (entry.member_id === state.selectedMemberId) || (entry.member_id.startsWith('NEW_') && entry.name === myName);
            
            if (!state.workLogs[entry.date]) state.workLogs[entry.date] = {};
            
            // 본인이면 대표 사번으로 통합, 아니면 추출된 member_id 유지
            const targetId = isMe ? state.selectedMemberId : entry.member_id;
            
            if (!state.workLogs[entry.date]) state.workLogs[entry.date] = {};
            
            // [전처리 데이터 포함 저장]
            state.workLogs[entry.date][targetId] = { 
                name: entry.name,
                status: entry.status, 
                vehicle: entry.vehicle,
                sequence: entry.sequence,
                day_of_week: entry.day_of_week,
                fixed_off: entry.fixed_off,
                fixed_vehicle: entry.fixed_vehicle,
                is_verified: entry.is_verified,
                validation_error: entry.validation_error
            };
            
            totalSyncCount++;
            if (isMe) syncCount++;
        });

        if (totalSyncCount > 0) {
            localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
            if (window.firebaseService) window.firebaseService.saveWorkLogs(state.workLogs);
        }

        renderAnalysisTable(results);
        resultsContainer.classList.remove('hidden');
        
        // [안정성 강화: 분석 즉시 달력 및 통계 새로고침]
        refreshUI();
        updateMonthlyStats();

        // [대표님 요청 사항: 입력창 비우기 및 날짜 안내]
        const dates = results.map(r => r.date).sort();
        const rangeMsg = dates.length > 0 ? 
            `${dates[0]} ~ ${dates[dates.length - 1]}` : '데이터';
        
        // 입력창 비우기 및 포커스
        const inputElem = document.getElementById('analysis-input');
        if (inputElem) {
            inputElem.value = '';
            inputElem.placeholder = '다음 배차를 입력해 주세요.';
            inputElem.focus();
        }

        showModal(`${rangeMsg} 저장 완료! \n다음 배차를 입력해 주세요.`, false, true);
        
    } catch (e) {
        showModal('분석 중 오류 발생: ' + e.message, false, true);
    }
}

function renderAnalysisTable(results) {
    const tableBody = document.getElementById('analysis-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = results.map(r => {
        const statusColor = r.is_verified ? (r.is_new_driver ? 'text-secondary' : 'text-primary') : 'text-error';
        const shiftBadge = r.status === 'AM' ? 'bg-error' : (r.status === 'PM' ? 'bg-[#00BFA5]' : 'bg-primary');
        const driverTag = r.is_new_driver ? '<span class="ml-1 px-1 bg-outline-variant/20 rounded text-[8px] text-outline">신규/외부</span>' : '';
        
        return `
            <tr class="border-b border-outline-variant/10">
                <td class="px-4 py-4">
                    <div class="font-bold text-[13px] flex items-center">${r.name} ${driverTag}</div>
                    <div class="text-[10px] text-outline-variant">#${r.member_id === '9999999' ? '미식별' : r.member_id}</div>
                </td>
                <td class="px-4 py-4">
                    <span class="px-2 py-0.5 rounded-full text-white font-bold text-[10px] ${shiftBadge}">${r.status}</span>
                </td>
                <td class="px-4 py-4 font-mono text-outline text-[11px]">${r.vehicle || '-'}</td>
                <td class="px-4 py-4">
                    <div class="font-bold text-[11px] ${statusColor}">${r.is_new_driver ? '신규발견' : (r.is_verified ? '정상' : '검토필요')}</div>
                    <div class="text-[9px] text-outline-variant truncate max-w-[80px]" title="${r.validation_error}">${r.validation_error}</div>
                </td>
            </tr>
        `;
    }).join('');
}

function switchTab(tabId) {
    state.currentTab = tabId;
    ui.navItems.forEach(item => item.classList.toggle('active', item.dataset.tab === tabId));
    ui.tabContents.forEach(tab => tab.classList.toggle('active', tab.id === `tab-${tabId}`));
    
    // 핵심 버그 수정: 탭 전환 시 화면을 다시 그려줘야 데이터가 나타납니다.
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
    
    // Headers (Stitch style colored)
    const headers = `
        <div class="text-center text-sm font-bold text-error opacity-70">일</div>
        <div class="text-center text-sm font-bold text-on-surface-variant">월</div>
        <div class="text-center text-sm font-bold text-on-surface-variant">화</div>
        <div class="text-center text-sm font-bold text-on-surface-variant">수</div>
        <div class="text-center text-sm font-bold text-on-surface-variant">목</div>
        <div class="text-center text-sm font-bold text-on-surface-variant">금</div>
        <div class="text-center text-sm font-bold text-secondary-container">토</div>
    `;
    ui.calendarGrid.innerHTML = headers;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Padding empty days
    for (let i = 0; i < firstDay; i++) {
        const d = document.createElement('div');
        d.className = 'flex flex-col items-center py-3 opacity-30 text-base';
        ui.calendarGrid.appendChild(d);
    }

    // Actual days
    for (let d = 1; d <= lastDate; d++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'flex flex-col items-center py-3 relative cursor-pointer active:scale-95 transition-transform hover:bg-surface-container-lowest rounded-xl';
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        
        let dayClass = "text-base font-bold mb-2";
        const currentDayOfWeek = (firstDay + d - 1) % 7;
        if (currentDayOfWeek === 0) dayClass += " text-error";
        if (currentDayOfWeek === 6) dayClass += " text-secondary-container";

        if (dateStr === todayStr) {
            dayEl.classList.add('bg-primary-fixed', 'rounded-2xl', 'border-2', 'border-primary', 'scale-110', 'shadow-lg', 'z-10');
            dayClass = "text-base font-extrabold mb-2 text-primary";
        }

        // Add Click Listener for editing
        dayEl.addEventListener('click', () => {
            openEditSheet(dateStr);
        });

        dayEl.innerHTML = `<span class="${dayClass}">${d}</span>`;

        const log = state.workLogs[dateStr]?.[state.selectedMemberId];
        if (log) {
            const dot = document.createElement('div');
            const bgClass = log.status === 'AM' ? 'bg-error' : (log.status === 'ALL' ? 'bg-primary' : 'bg-tertiary-container');
            const sizeClass = dateStr === todayStr ? 'w-2.5 h-2.5' : 'w-2 h-2';
            dot.className = `${sizeClass} rounded-full ${bgClass}`;
            dayEl.appendChild(dot);
        }

        ui.calendarGrid.appendChild(dayEl);
    }
}

function updateMonthlyStats() {
    const year = state.displayDate.getFullYear();
    const month = state.displayDate.getMonth() + 1;
    
    let am_count = 0;
    let pm_count = 0;

    Object.keys(state.workLogs).forEach(date => {
        const [y, m, d] = date.split('-').map(Number);
        if (y === year && m === month && state.workLogs[date][state.selectedMemberId]) {
            const status = state.workLogs[date][state.selectedMemberId].status;
            if (status === 'AM') am_count++;
            else if (status === 'PM') pm_count++;
            else if (status === 'ALL') { am_count++; pm_count++; }
        }
    });

    ui.countAM.textContent = am_count;
    ui.countPM.textContent = pm_count;
}

function renderTeamList() {
    const listEl = document.getElementById('team-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    
    // Flat logs for engine
    const flatLogs = [];
    Object.keys(state.workLogs).forEach(date => {
        Object.keys(state.workLogs[date]).forEach(mid => {
            flatLogs.push({ date, member_id: mid, status: state.workLogs[date][mid].status });
        });
    });

    // 누적 데이터 처리를 위해 기존 마스터와 workLogs 내의 신규 기사를 병합
    const mergedMembers = [...state.masterData];
    const knownIds = new Set(mergedMembers.map(m => m.member_id));

    Object.keys(state.workLogs).forEach(date => {
        Object.keys(state.workLogs[date]).forEach(mid => {
            if (!knownIds.has(mid)) {
                knownIds.add(mid);
                const name = mid.startsWith('NEW_') ? mid.replace('NEW_', '') : `비등록(${mid})`;
                mergedMembers.push({
                    member_id: mid,
                    name: name,
                    phone: '미등록',
                    fixed_vehicle: '스피아',
                    fixed_off: '없음'
                });
            }
        });
    });

    mergedMembers.forEach((member, index) => {
        let stats = { consecutive_days: 0, status: 'NORMAL' };
        if (state.engine) {
            stats = state.engine.calculateStats(member.member_id, flatLogs);
        }

        const isActive = member.member_id === state.selectedMemberId;
        const card = document.createElement('div');
        card.className = `member-card fade-in ${isActive ? 'active-target' : ''}`;
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="member-header">
                <div>
                    <div class="member-name">${member.name}</div>
                    <div class="member-meta">${member.phone} | ${member.fixed_vehicle}호 | ${member.fixed_off} 휴무</div>
                </div>
                ${isActive ? '<span class="material-symbols-outlined text-primary text-xl">verified</span>' : ''}
            </div>
            
            <div class="member-stats-row">
                <div class="stat-chip ${stats.status === 'DANGER' ? 'stat-danger' : (stats.consecutive_days >= 4 ? 'stat-info' : 'stat-safe')}">
                    <span class="material-symbols-outlined text-xs">timer</span>
                    ${stats.consecutive_days}일째 운행중
                </div>
                <div class="stat-chip stat-info">
                    <span class="material-symbols-outlined text-xs">badge</span>
                    사번 ${member.member_id}
                </div>
            </div>

            <div class="member-actions">
                <button class="btn-member-action btn-call" onclick="window.callMember('${member.phone}')">
                    <span class="material-symbols-outlined text-sm">call</span> ${member.phone}
                </button>
                ${isActive ? `
                    <button class="btn-member-action btn-selected" disabled>
                        <span class="material-symbols-outlined text-sm">check</span> 관리중
                    </button>
                ` : `
                    <button class="btn-member-action btn-select shadow-md shadow-primary/20" onclick="window.selectMember('${member.member_id}', '${member.name}')">
                        <span class="material-symbols-outlined text-sm">sync_alt</span> 데이터 보기
                    </button>
                `}
            </div>
        `;
        listEl.appendChild(card);
    });
}

window.selectMember = function(memberId, name) {
    state.selectedMemberId = memberId;
    localStorage.setItem('last_selected_member', memberId);
    
    // Switch to Dashboard and refresh
    switchTab('dashboard');
    refreshUI();
    
    // Toast-like notification (optional but nice)
    alert(`${name} 기사님의 데이터로 전환되었습니다.`);
};

window.callMember = function(phone) {
    if (phone) window.location.href = `tel:${phone}`;
};

// --- Background Data Handlers ---

async function handleAutoFetch() {
    showModal('밴드 데이터 수집 중...', true);
    try {
        const res = await fetch('resources/band_dispatch_raw.json');
        const data = await res.json();
        if (data && data.length > 0) {
            ui.bandInput.value = data[0].content;
            showModal('데이터 수집 완료!', false, true);
        }
    } catch (e) {
        showModal('오류: ' + e.message, false, true);
    }
}

function handleManualPaste() {
    const text = ui.bandInput.value.trim();
    if (!text) return alert('내용이 없습니다.');
    
    showModal('배차 데이터 분석 중...', true);
    setTimeout(() => {
        const results = state.engine.parseBandText(text);
        results.forEach(res => {
            if (!state.workLogs[res.date]) state.workLogs[res.date] = {};
            state.workLogs[res.date][res.member_id] = {
                status: res.status,
                vehicle: res.vehicle,
                is_verified: res.is_verified
            };
        });
        localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
        if (window.firebaseService) window.firebaseService.saveWorkLogs(state.workLogs);
        refreshUI();
        showModal(`${results.length}개의 데이터가 업데이트되었습니다.`, false, true);
    }, 1000);
}

function logWorkForDate(dateStr, status) {
    if (!state.workLogs[dateStr]) state.workLogs[dateStr] = {};
    
    if (status === 'DELETE') {
        delete state.workLogs[dateStr][state.selectedMemberId];
    } else {
        state.workLogs[dateStr][state.selectedMemberId] = { status, vehicle: 'manual' };
    }
    
    localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
    if (window.firebaseService) window.firebaseService.saveWorkLogs(state.workLogs);
    refreshUI();
}

function logWork(status) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    logWorkForDate(dateStr, status);
    alert(`${status} 근무가 오늘 날짜에 체크되었습니다.`);
}

let activeEditDate = null;
function openEditSheet(dateStr) {
    activeEditDate = dateStr;
    const modal = document.getElementById('edit-sheet-modal');
    document.getElementById('edit-sheet-title').textContent = `${dateStr} 근무 변경`;
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.firstElementChild.classList.add('translate-y-0');
        modal.firstElementChild.classList.remove('translate-y-full');
    }, 10);
    
    // Setup action buttons if not already done
    if (!modal.dataset.initialized) {
        document.querySelectorAll('.btn-edit-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const status = e.currentTarget.dataset.status;
                if (!status) return; // '취소' button or similar
                if (activeEditDate) {
                    logWorkForDate(activeEditDate, status);
                }
                closeEditSheet();
            });
        });
        document.getElementById('edit-sheet-close').addEventListener('click', closeEditSheet);
        modal.dataset.initialized = 'true';
    }
}

function closeEditSheet() {
    const modal = document.getElementById('edit-sheet-modal');
    modal.firstElementChild.classList.add('translate-y-full');
    modal.firstElementChild.classList.remove('translate-y-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        activeEditDate = null;
    }, 300);
}

function showModal(msg, spin = true, close = false) {
    ui.modal.classList.remove('hidden');
    ui.modalMsg.textContent = msg;
    document.getElementById('modal-spinner').classList.toggle('hidden', !spin);
    ui.modalClose.classList.toggle('hidden', !close);
}

/**
 * [추가] 경영진(대표님)을 위한 실시간 근무현황분석 리포트를 생성합니다.
 */
/**
 * [완전 로컬화] 경영진(대표님)을 위한 실시간 근무현황분석 리포트를 생성합니다. (API 없이 작동)
 */
async function generateCEOReport() {
    const chatModal = document.getElementById('chat-modal');
    const chatLog = document.getElementById('chat-log');
    
    chatModal.classList.remove('hidden');
    setTimeout(() => {
        chatModal.firstElementChild.classList.remove('translate-y-full');
        chatModal.firstElementChild.classList.add('translate-y-0');
    }, 10);
    
    // 초기 분석 시작
    chatLog.innerHTML = `
        <div class="flex gap-3 animate-fade-in">
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                <span class="material-symbols-outlined text-sm">analytics</span>
            </div>
            <div class="flex flex-col gap-1">
                <div class="bg-primary text-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm">
                    <p class="font-bold text-base">📊 로컬 근무현황 분석 리포트</p>
                    <p class="text-xs opacity-90 mt-1">저장된 배차 데이터를 바탕으로 실시간 현황을 계산 중입니다...</p>
                </div>
            </div>
        </div>
    `;

    await new Promise(r => setTimeout(r, 600));

    try {
        // 1. 데이터 집계
        const totalDrivers = state.masterData.length;
        const logDates = Object.keys(state.workLogs).sort();
        const latestDate = logDates.length > 0 ? logDates[logDates.length - 1] : '데이터 없음';
        
        // 2. 연속 근무자(피로도) 및 가동차량 계산
        let fatigueDrivers = [];
        let todayLog = state.workLogs[latestDate] || {};
        let activeVehicles = new Set();
        
        state.masterData.forEach(m => {
            const stats = state.engine.calculateStats(m.member_id, 
                logDates.map(d => ({ date: d, status: (state.workLogs[d][m.member_id] || {}).status || 'OFF' }))
            );
            if (stats.consecutive_days >= 6) {
                fatigueDrivers.push({ name: m.name, days: stats.consecutive_days });
            }
            if (todayLog[m.member_id] && todayLog[m.member_id].vehicle) {
                activeVehicles.add(todayLog[m.member_id].vehicle);
            }
        });

        const fatigueHtml = fatigueDrivers.length > 0 
            ? fatigueDrivers.map(d => `<span class="text-error font-bold">${d.name}(${d.days}일)</span>`).join(', ')
            : '<span class="text-secondary font-bold">없음 (양호)</span>';

        // 3. 리포트 생성 (AI 없이 로컬 통계로 서술)
        const reportContent = `
안녕하십니까, 대표님. **로컬 데이터 분석기**입니다.

📅 **데이터 기준**: ${latestDate}
👥 **전체 관리 인원**: ${totalDrivers}명
🚍 **현재 가동 차량**: ${activeVehicles.size}대

⚠️ **주요 특이사항 (피로도 체크)**:
현재 6일 이상 연속 근무 중인 기사는 [ ${fatigueHtml} ] 입니다. 안전 운행을 위해 배차 일정 조정 검토를 권장합니다.

✅ **브리핑**: 
현재 배차 데이터가 정상적으로 동기화되어 있으며, 모든 운행 일정이 달력에 반영되었습니다. 추가 분석이 필요하시면 언제든 배차표를 입력해 주세요.
        `;

        chatLog.innerHTML += `
            <div class="flex gap-3 animate-fade-in mt-4">
                <div class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                    <span class="material-symbols-outlined text-sm">assignment</span>
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <div class="bg-surface-container-high p-4 rounded-2xl rounded-tl-none border border-outline-variant/20 text-sm whitespace-pre-wrap leading-relaxed shadow-sm">
                        ${reportContent}
                    </div>
                </div>
            </div>
        `;
    } catch (e) {
        console.error('Report Error:', e);
        chatLog.innerHTML += `<div class="p-4 text-error text-xs">분석 오류: ${e.message}</div>`;
    }
}

/**
 * [추가] 저장된 로우(Raw) 배차 데이터를 불러와 자동 분석합니다.
 */
/**
 * [운행/배차 탭 전용] 실시간 근무현황 인사이트를 화면에 직접 매립합니다.
 */
function renderOperationalInsight() {
    const display = document.getElementById('local-ceo-report-display');
    if (!display) return;

    try {
        const logDates = Object.keys(state.workLogs).sort();
        const latestDate = logDates.length > 0 ? logDates[logDates.length - 1] : '데이터 없음';
        
        let fatigueDrivers = [];
        let todayLog = state.workLogs[latestDate] || {};
        let activeVehicles = new Set();
        
        state.masterData.forEach(m => {
            const stats = state.engine.calculateStats(m.member_id, 
                logDates.map(d => ({ date: d, status: (state.workLogs[d][m.member_id] || {}).status || 'OFF' }))
            );
            if (stats.consecutive_days >= 6) {
                fatigueDrivers.push({ name: m.name, days: stats.consecutive_days });
            }
            if (todayLog[m.member_id] && todayLog[m.member_id].vehicle) {
                activeVehicles.add(todayLog[m.member_id].vehicle);
            }
        });

        const fatigueColor = fatigueDrivers.length > 0 ? 'text-error' : 'text-secondary';
        
        display.innerHTML = `
            <div class="w-full grid grid-cols-2 gap-3 animate-fade-in">
                <div class="bg-surface p-3 rounded-xl border border-outline-variant/20 shadow-sm">
                    <p class="text-[9px] text-outline uppercase font-bold mb-1">오늘의 가동 차량</p>
                    <p class="text-xl font-black text-primary">${activeVehicles.size}<span class="text-[10px] font-normal ml-1 text-on-surface">대</span></p>
                </div>
                <div class="bg-surface p-3 rounded-xl border border-outline-variant/20 shadow-sm">
                    <p class="text-[9px] text-outline uppercase font-bold mb-1">피로도 주의 인원</p>
                    <p class="text-xl font-black ${fatigueColor}">${fatigueDrivers.length}<span class="text-[10px] font-normal ml-1 text-on-surface">명</span></p>
                </div>
                <div class="col-span-2 bg-primary/5 p-3 rounded-xl border border-primary/10">
                    <p class="text-[9px] text-primary uppercase font-bold mb-1">실시간 관제 브리핑 (${latestDate})</p>
                    <p class="text-[11px] leading-relaxed text-on-surface-variant font-medium">
                        ${fatigueDrivers.length > 0 
                            ? `⚠️ 연속 근무 ${fatigueDrivers[0].days}일째인 <span class="bg-error/10 text-error px-1 rounded">${fatigueDrivers[0].name}</span> 기사님을 포함하여 총 ${fatigueDrivers.length}명의 피로도가 높습니다.`
                            : '✅ 현재까지 6일 이상 연속 근무자가 발견되지 않은 안전한 상태입니다.'}
                    </p>
                </div>
            </div>
        `;
    } catch (e) {
        display.innerHTML = `<p class="text-[10px] text-error">인사이트 생성 중 오류: ${e.message}</p>`;
    }
}

/**
 * [강화] 저장된 로우(Raw) 또는 전처리된(Processed) 배차 데이터를 불러옵니다.
 */
async function loadSavedDispatch() {
    try {
        // [A] 우선 전처리된 정형 데이터(Processed) 로딩 시도
        const procResponse = await fetch('resources/dispatch_data_processed.json');
        if (procResponse.ok) {
            const processedData = await procResponse.json();
            // 병합 (기존 state.workLogs에 덮어쓰기)
            state.workLogs = { ...state.workLogs, ...processedData };
            console.log("🚀 정형 배차 데이터(Processed) 로드 성공!");
            refreshUI();
            return;
        }

        // [B] 정형 데이터가 없을 경우만 Raw 텍스트 파싱 (하위 호환)
        console.log("⚠️ 정형 데이터가 없어 Raw 데이터를 직접 분석합니다.");
        const response = await fetch('resources/band_dispatch_raw.json');
        if (!response.ok) return;
        
        const rawData = await response.json();
        let newLogs = { ...state.workLogs };
        let totalCount = 0;

        rawData.forEach(item => {
            const results = state.engine.parseBandText(item.content, new Date(item.date));
            results.forEach(entry => {
                const targetId = entry.member_id;
                if (!newLogs[entry.date]) newLogs[entry.date] = {};
                newLogs[entry.date][targetId] = {
                    name: entry.name,
                    status: entry.status,
                    vehicle: entry.vehicle,
                    sequence: entry.sequence,
                    day_of_week: entry.day_of_week,
                    fixed_off: entry.fixed_off,
                    fixed_vehicle: entry.fixed_vehicle,
                    is_verified: entry.is_verified,
                    validation_error: entry.validation_error
                };
                totalCount++;
            });
        });

        if (totalCount > 0) {
            state.workLogs = newLogs;
            localStorage.setItem('bus_work_logs_v2', JSON.stringify(state.workLogs));
            refreshUI();
        }
    } catch (e) {
        console.error('[오류] 저장 데이터 로딩 실패:', e);
    }
}

init();
