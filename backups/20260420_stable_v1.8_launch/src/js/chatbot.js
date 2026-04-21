const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

let currentApiKey = localStorage.getItem('bus_gemini_api_key') || '';

function initChatbot() {
    const btnChatbot = document.getElementById('btn-chatbot');
    const chatModal = document.getElementById('chat-modal');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const btnSend = document.getElementById('btn-send-chat');
    const btnConfig = document.getElementById('btn-api-config');
    const chatLog = document.getElementById('chat-log');

    if (!btnChatbot) return;

    // FAQ 칩들을 렌더링합니다.
    function renderFaqChips() {
        const container = document.getElementById('faq-chips-container');
        if (!container || !window.FAQ_DATA) return;

        container.innerHTML = window.FAQ_DATA.map(faq => `
            <button class="flex-shrink-0 bg-white dark:bg-slate-800 border border-primary/20 text-on-surface text-[11px] font-bold px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all hover:border-primary/50" 
                    onclick="window.selectFaq('${faq.question.replace(/'/g, "\\'")}')">
                ${faq.question}
            </button>
        `).join('');
    }

    btnChatbot.addEventListener('click', () => {
        chatModal.classList.remove('hidden');
        setTimeout(() => chatModal.firstElementChild.classList.remove('translate-y-full'), 10);
        
        // 칩 렌더링 실행
        renderFaqChips();

        if (chatLog.children.length === 0) {
            appendMessage('bot', `안녕합니까, 기사님! 무엇을 도와드릴까요?<br><span class="text-[11px] opacity-70">궁금하신 내용을 입력하거나 아래 핵심 질문들을 클릭해 보세요.</span>`);
        }
    });

    window.selectFaq = function(question) {
        const faq = window.FAQ_DATA.find(f => f.question === question);
        if (faq) {
            appendMessage('user', question);
            const loadingId = appendMessage('bot', '<span class="animate-pulse">내용을 확인하고 있습니다...</span>');
            setTimeout(() => {
                updateMessage(loadingId, faq.answer.replace(/\n/g, '<br>'));
            }, 300);
        }
    };

    chatClose.addEventListener('click', () => {
        chatModal.firstElementChild.classList.add('translate-y-full');
        setTimeout(() => chatModal.classList.add('hidden'), 300);
    });

    btnConfig.addEventListener('click', () => {
        window.chatbot.openConfig();
    });

    btnSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        appendMessage('user', text);
        chatInput.value = '';
        
        const loadingId = appendMessage('bot', '<span class="animate-pulse">데이터를 분석 중입니다...</span>');

        // 1. 로컬 FAQ 데이터에서 먼저 검색 (키워드 기반)
        const matchedFaq = window.FAQ_DATA.find(f => 
            text.includes(f.question) || f.question.includes(text) || 
            (f.category && text.includes(f.category))
        );

        if (matchedFaq) {
            setTimeout(() => {
                updateMessage(loadingId, `${matchedFaq.answer.replace(/\n/g, '<br>')}<br><br><small class="opacity-50">#매뉴얼 기반 답변입니다.</small>`);
            }, 400);
            return;
        }

        // 2. 만약 FAQ에 없으면 Gemini AI에게 물어봄 (선택 사항)
        if (!currentApiKey) {
            updateMessage(loadingId, "죄송합니다. 해당 질문에 대한 정확한 매뉴얼을 찾지 못했습니다. 아래의 자주 묻는 질문 버튼을 이용하시거나 관리자에게 문의해 주세요.");
            return;
        }

        try {
            const answer = await requestGemini(text);
            updateMessage(loadingId, answer);
        } catch (error) {
            console.error('Gemini 에러:', error);
            updateMessage(loadingId, `<span class="text-error">정보를 찾을 수 없습니다. (${error.message})</span><br><small class="text-outline">아래 나열된 주요 질문에서 선택해 보시기 바랍니다.</small>`);
        }
    }

    // Bind to window so suggested chips can call it
    window.handleChatSend = handleSend;

    function appendMessage(sender, text) {
        const id = 'msg-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = `p-3 rounded-xl max-w-[85%] text-sm leading-relaxed ${sender === 'user' ? 'bg-primary text-on-primary ml-auto shadow-sm rounded-br-sm' : 'bg-surface-container-low text-on-surface mr-auto shadow-sm border border-outline-variant/30 rounded-bl-sm'}`;
        div.innerHTML = text;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight;
        return id;
    }

    function updateMessage(id, text) {
        const div = document.getElementById(id);
        if (div) {
            div.innerHTML = text;
            chatLog.scrollTop = chatLog.scrollHeight;
        }
    }
}

async function requestGemini(userMessage) {
    // 1. 최적화된 시스템 컨텍스트 생성
    let systemContext = "너는 버스 회사의 관리자이자 기사들의 실무 비서야. 매뉴얼 데이터에 근거해 친절한 전문가 말투로 답변해. 매뉴얼에 없으면 정중히 없다고 해.\n\n[매뉴얼 핵심 요약]\n";
    
    if (window.MANUALS_DATABASE) {
        window.MANUALS_DATABASE.forEach(m => {
            systemContext += `### ${m.title}\n`;
            m.sections.slice(0, 15).forEach(s => {
                systemContext += `- ${s.subtitle}: ${s.content.substring(0, 500)}\n`;
            });
        });
    }

    // [보강] 시도할 모델 및 엔드포인트 리스트 (호환성 극대화)
    const configurations = [
        { ver: 'v1beta', model: 'gemini-1.5-flash' },
        { ver: 'v1', model: 'gemini-1.5-flash' },
        { ver: 'v1beta', model: 'gemini-1.5-flash-latest' },
        { ver: 'v1', model: 'gemini-pro' }
    ];

    const activeKey = currentApiKey || localStorage.getItem('bus_gemini_api_key');
    let lastError = null;

    for (const config of configurations) {
        try {
            const url = `https://generativelanguage.googleapis.com/${config.ver}/models/${config.model}:generateContent?key=${activeKey}`;
            
            const payload = {
                contents: [{
                    parts: [{ text: systemContext + `\n\n기사님 질문: ${userMessage}` }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!text) continue; // 다음 설정으로 시도
                return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
            } else {
                // 404나 지원하지 않는 모델 오류인 경우 다음 설정으로 넘어감
                console.warn(`모델 ${config.model} (${config.ver}) 실패:`, data.error?.message);
                lastError = data.error?.message;
                continue;
            }
        } catch (err) {
            console.error('Fetch 에러:', err);
            lastError = err.message;
            continue;
        }
    }

    throw new Error(lastError || '모든 AI 엔진 호출에 실패했습니다. API 키와 네트워크 상태를 다시 확인해주세요.');
}

// --- Global Interface for app.js ---
window.chatbot = {
    /**
     * app.js에서 분석 리포트를 요청할 때 사용하는 공용 인터페이스
     */
    askGemini: async function(prompt, context) {
        // [강력 보강] 호출 시점에 저장소에서 직접 키를 확인
        const savedKey = localStorage.getItem('bus_gemini_api_key');
        if (savedKey) currentApiKey = savedKey;

        if (!currentApiKey) {
            throw new Error('API 키가 등록되지 않았습니다. 메인 화면의 [AI 비서 설정] 버튼을 눌러 키를 먼저 등록해주세요.');
        }
        return await requestGemini(`${prompt}\n\n[추가 컨텍스트]\n${context}`);
    },
    
    /**
     * API 키 등록 창을 엽니다 (고급 모달 방식)
     */
    openConfig: function() {
        const modal = document.getElementById('api-config-modal');
        const status = document.getElementById('api-key-status');
        const input = document.getElementById('input-api-key');
        
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => modal.firstElementChild.classList.remove('translate-y-full'), 10);
            
            // 현재 설정 상태 표시
            if (currentApiKey) {
                const masked = currentApiKey.substring(0, 6) + '***' + currentApiKey.substring(currentApiKey.length - 4);
                status.textContent = `설정됨 (${masked})`;
                status.className = "text-[10px] text-green-500 font-bold";
            } else {
                status.textContent = "미설정";
                status.className = "text-[10px] text-primary font-bold";
            }
            input.value = '';
            input.focus();
        }
    },

    /**
     * API 키 등록 창을 닫습니다.
     */
    hideConfig: function() {
        const modal = document.getElementById('api-config-modal');
        if (modal) {
            modal.firstElementChild.classList.add('translate-y-full');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    },

    /**
     * 입력된 API 키가 유효한지 실시간으로 테스트합니다.
     */
    testApiKey: async function() {
        const input = document.getElementById('input-api-key');
        const btn = document.getElementById('btn-test-key');
        const status = document.getElementById('api-key-status');
        
        // [강력 보강] 모든 비 알파벳/숫자 캐릭터 제거 (숨겨진 제어 문자 등 방지)
        let key = input.value ? input.value.trim().replace(/[^a-zA-Z0-9_-]/g, '') : '';

        if (!key) {
            alert('테스트할 API 키를 먼저 입력해주세요.');
            return;
        }

        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined text-sm">sync</span> 통신 확인 중...';
        btn.className = btn.className.replace('text-primary', 'text-outline-variant');

        try {
            // [보강] 실제 requestGemini와 동일한 멀티 모델/엔드포인트 테스트
            const configurations = [
                { ver: 'v1beta', model: 'gemini-1.5-flash' },
                { ver: 'v1', model: 'gemini-1.5-flash' },
                { ver: 'v1', model: 'gemini-pro' }
            ];

            let success = false;
            let errorMsg = '';

            for (const config of configurations) {
                const testUrl = `https://generativelanguage.googleapis.com/${config.ver}/models/${config.model}:generateContent?key=${key}`;
                const testPayload = { contents: [{ parts: [{ text: "hi" }] }] };
                
                const response = await fetch(testUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(testPayload)
                });

                const data = await response.json();
                if (response.ok) {
                    success = true;
                    break;
                } else {
                    errorMsg = data.error?.message || '통신 오류';
                }
            }

            if (success) {
                btn.innerHTML = '<span class="material-symbols-outlined text-sm">check_circle</span> 확인 완료! (정상 작동)';
                btn.className = btn.className.replace('bg-surface-container-high', 'bg-green-50 text-green-600 border-green-200');
                
                const masked = key.substring(0, 4) + '...' + key.substring(key.length - 4);
                status.textContent = `검증됨 (${masked})`;
                status.className = "text-[10px] text-green-600 font-extrabold";
                alert('✅ 완벽합니다! 키가 정상적으로 인증되었습니다. 이제 [설정 저장]을 눌러주세요.');
            } else {
                throw new Error(errorMsg);
            }
        } catch (err) {
            console.error('API Test Error:', err);
            btn.innerHTML = '<span class="material-symbols-outlined text-sm">error</span> 검증 실패 (키를 확인하세요)';
            btn.className = btn.className.replace('bg-surface-container-high', 'bg-red-50 text-red-600 border-red-200');
            status.textContent = "진입 거부";
            status.className = "text-[10px] text-red-600 font-extrabold";
            alert(`❌ 키 검증 실패: ${err.message}\n\n키를 정확히 복사하셨는지 확인하시고, 만약 계속 실패한다면 구글 계정이 'Generative Language API' 권한을 가지고 있는지 확인해 주세요.`);
        } finally {
            setTimeout(() => {
                btn.disabled = false;
                if (!btn.className.includes('bg-green-50') && !btn.className.includes('bg-red-50')) {
                    btn.innerHTML = originalText;
                }
            }, 3000);
        }
    },

    /**
     * 입력된 API 키를 저장합니다.
     */
    saveApiKey: function() {
        const input = document.getElementById('input-api-key');
        // [강력 보강] 입력을 완벽하게 정제함
        let key = input.value ? input.value.trim().replace(/[^a-zA-Z0-9_-]/g, '') : '';
        
        if (!key) {
            alert('등록할 API 키를 입력해주세요.');
            return;
        }

        // 1. 변수 및 저장소 즉시 갱신 (Critical Sync)
        currentApiKey = key;
        localStorage.setItem('bus_gemini_api_key', key);
        
        // 2. 전역 상태 강제 주입 (Scoping Fix)
        window.currentApiKey = key; 

        // 3. 시각적 피드백
        const status = document.getElementById('api-key-status');
        if (status) {
            const masked = key.substring(0, 4) + '...' + key.substring(key.length - 4);
            status.textContent = `저장됨 (${masked})`;
            status.className = "text-[10px] text-green-500 font-extrabold animate-bounce";
        }
        
        alert(`성공! API 키(${key.substring(0,4)}...${key.substring(key.length-4)})가 즉시 등록되었습니다.\n이제 [근무현황분석 바로보기]를 누르시면 안티 비서의 브리핑이 시작됩니다.`);
        
        // 4. 모달 닫기
        setTimeout(() => this.hideConfig(), 500);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // initialize after a slight delay to ensure HTML loads
    setTimeout(initChatbot, 500);
});
