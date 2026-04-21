// 네이버 밴드 전용 자동 수집 스크립트 (최신 5일치 정밀 수집 & 필터 강화 버전)

function initBusAppExtension() {
    if (document.getElementById('bus-app-fetch-btn')) return;

    // URL에서 필터 정보를 다시 가져옵니다.
    const urlParams = new URLSearchParams(window.location.search);
    const targetAuthor = urlParams.get('target_author');

    const btn = document.createElement('button');
    btn.id = 'bus-app-fetch-btn';
    btn.innerHTML = '🚌 이번 달 배차 수집 (3개)'; 
    
    btn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; background-color: #00C73C;
        color: white; padding: 16px 24px; border-radius: 50px; font-weight: 900;
        font-size: 16px; z-index: 999999; box-shadow: 0 8px 25px rgba(0, 199, 60, 0.4);
        border: 2px solid white; cursor: pointer; transition: all 0.2s;
    `;
    
    btn.onclick = async () => {
        btn.disabled = true;
        btn.innerHTML = '⏳ 분석 시작...';
        
        const now = new Date();
        const year = now.getFullYear();
        const currentMonthStr = `${year}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const todayDay = String(now.getDate()).padStart(2, '0');
        
        // --- 수집 범위 설정 (전월 1일 ~ 오늘) ---
        const prevMonthDate = new Date();
        prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
        const prevYear = prevMonthDate.getFullYear();
        const prevMonth = String(prevMonthDate.getMonth() + 1).padStart(2, '0');
        const startDate = `${prevYear}-${prevMonth}-01`; // 전월 1일
        const endDate = `${year}-${String(now.getMonth() + 1).padStart(2, '0')}-${todayDay}`; // 오늘

        // --- 로컬 수집 이력 관리 (전체 누적) ---
        const STORAGE_KEY = 'bus_app_sent_history_v2';
        let sentHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"hashes": []}');
        
        // 중복 체크용 Set
        const historyHashes = new Set(sentHistory.hashes);
        const newlySentHashes = [];

        let collectedText = '';
        const foundDates = new Set();
        const processedKeys = new Set(); 
        let isHistoricalFound = false;
        let totalFoundCount = 0;
        
        const dateRegex = /(\d{4}-\d{2}-\d{2})/g;
        
        // --- 최종 수집 로직: 3개 찾으면 즉시 종료 (무한로딩 방지) ---
        for (let attempt = 0; attempt < 5; attempt++) { 
            const posts = document.querySelectorAll('.cappGlobalPost, .postItem, [data-viewname="DPost"], ._postItem');
            console.log(`[안티수집기] ${attempt}차 시도: 글 ${posts.length}개 발견`);
            
            for (let post of posts) {
                const text = post.innerText;
                if (targetAuthor && !text.includes(targetAuthor)) continue;

                // [더보기] 클릭
                const moreBtn = post.querySelector('.postMore, .seeMore, .btnMore, .moreBtn, ._btnMore');
                if (moreBtn && !post.dataset.expanded) {
                    moreBtn.click();
                    post.dataset.expanded = 'true';
                }

                const matches = Array.from(text.matchAll(dateRegex));
                let postDate = '';
                let isRangeValid = false;
                
                for (const match of matches) {
                    const foundDate = match[1];
                    if (foundDate >= startDate && foundDate <= endDate) {
                        postDate = foundDate;
                        isRangeValid = true;
                    }
                }
                
                if (!isRangeValid) continue;

                const body = post.querySelector('[data-viewname="DPostBody"], .postContent, .pText, ._postBody');
                const content = body ? body.innerText : text;
                const contentKey = content.substring(0, 100); 
                
                if (historyHashes.has(contentKey) || processedKeys.has(contentKey)) continue;

                if (content.length > 20) {
                    processedKeys.add(contentKey);
                    newlySentHashes.push(contentKey); 
                    
                    collectedText += `\n\n--- 배차 데이터 (${postDate}) ---\n${content}`;
                    totalFoundCount++;
                    
                    btn.innerHTML = `⏳ 수집됨: ${totalFoundCount}개...`;
                    
                    // 3개가 모이면 즉시 전송하고 '완전 종료'
                    if (totalFoundCount >= 3) {
                        sendDataAndFinish(collectedText, newlySentHashes);
                        return; // 함수 전체 종료 (무한루프 원천 차단)
                    }
                }
            }

            // 만약 이번 페이지에서 3개를 못 채웠다면 스크롤
            window.scrollTo(0, document.body.scrollHeight);
            btn.innerHTML = `⏳ 추가 탐색 중... (${totalFoundCount}/3)`;
            await new Promise(r => setTimeout(r, 1500)); 
        }

        // 3개를 다 못 채웠더라도 찾은 게 있다면 보내고 종료
        if (totalFoundCount > 0) {
            sendDataAndFinish(collectedText, newlySentHashes);
        } else {
            btn.innerHTML = '✅ 수집할 새로운 자료 없음';
            btn.style.backgroundColor = '#9E9E9E';
        }

        function sendDataAndFinish(text, hashes) {
            console.log("[안티수집기] 앱으로 전송 시작:", text.substring(0, 50));
            if (window.opener) {
                window.opener.postMessage({ type: 'BAND_DISPATCH_DATA', text: text }, '*');
            } else {
                navigator.clipboard.writeText(text);
                alert("앱 창을 찾을 수 없어 클립보드에 복사되었습니다. 앱의 분석창에 붙여넣어 주세요.");
            }
            
            // 히스토리 업데이트
            const updatedHashes = [...sentHistory.hashes, ...hashes].slice(-500);
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ hashes: updatedHashes }));
            
            btn.innerHTML = `✅ ${totalFoundCount}개 완료!`;
            btn.style.backgroundColor = '#2196F3';
        }
        
        setTimeout(() => {
            btn.innerHTML = '🚌 이번 달 배차 수집 (3개)';
            btn.style.backgroundColor = '#00C73C';
            btn.disabled = false;
        }, 4000);
    };

    document.body.appendChild(btn);
}

setInterval(initBusAppExtension, 2000);
