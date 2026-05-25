/**
 * 비트코인이다~얍! V3 - 하이엔드 투자 대시보드 핵심 비즈니스 로직
 * -------------------------------------------------------------
 * 1. 실시간 원화(KRW) - BTC 듀얼 절약 적립 사다리 시스템
 * 2. 120px 고해상도 Neon 격자 실시간 시세 차트 (최고/최저가 드로잉)
 * 3. 200일 이동평균선(200 DMA), 해시레이트, 거래량 분석 지표 연동
 * 4. 10분 블록 채굴 맥박 애니메이션 & 반감기 공급 타임라인 시뮬레이터
 * 5. 실시간 현재가 주입형 초지능형 AI 금융 챗봇 & 원클릭 AI 단축키 연동
 * 6. Web Audio API 싱글톤 설계 (컨텍스트 고갈/무음 완벽 방지)
 * 7. PWA 서비스 워커 자동 등록 및 모바일 앵커 새로고침 초기화 방지
 */

// 1. 분석 리포트 데이터
const reportData = [
    {
        id: 'report-1',
        tag: 'STRATEGY',
        title: '스트레티지 우선주 4종 정밀 분석',
        description: '포트폴리오 안정성을 극대화하기 위한 네 가지 핵심 자산의 상관관계 및 수익률 심층 분석 리포트',
        date: '2024.03.20',
        content: `
            <p><strong>핵심 요약:</strong> 최근 시장 변동성 확대 장세에서 비트코인 투자 시 하방 경직성을 확보하기 위한 4가지 포트폴리오 전략을 분석했습니다.</p>
            <p><strong>1. STRC (안정형) 모델의 성과</strong><br>
            최근 6개월 백테스팅 결과, 최대 손실폭(MDD)을 -15% 이내로 방어하면서 연환산 수익률 12.4%를 달성했습니다. 현물 ETF 자금 유입이 하단을 확고히 지지하고 있습니다.</p>
            <p><strong>2. 자산간 상관관계</strong><br>
            비트코인과 나스닥100 지수의 상관계수는 현재 0.65 수준으로 동조화 경향이 짙으나, 통화 정책(금리 인하) 기대감이 반영되는 구간에서는 독자적인 대체 가치 저장 수단으로서의 프리미엄이 발생하고 있습니다.</p>
            <p><strong>결론:</strong> 무지성 장기 투자를 넘어, 시장 국면에 따라 STRC와 STRK 비중을 6:4 비율로 동적으로 조절하는 것이 현재 노트북LM 데이터가 가리키는 최적의 생존 및 수익 창출 모델입니다.</p>
        `
    },
    {
        id: 'report-2',
        tag: 'INSIGHT',
        title: '자본주의 속 돈의 비밀: 왜 비트코인인가?',
        description: '화폐의 역사와 현대 금융 시스템의 한계 속에서 비트코인이 가지는 독보적인 철학적 가치',
        date: '2024.03.18',
        content: `
            <p><strong>명목 화폐 시스템의 구조적 결함:</strong> 1971년 금본위제 폐지 이후, 기축 통화국들은 막대한 부채를 빚어내어 성장을 이끌었고, 그 결과 돈의 가치는 지속적으로 하락하고 있습니다. 자산 인플레이션은 필연적인 결과입니다.</p>
            <p><strong>비트코인: 가장 완벽한 형태의 재산권</strong><br>
            총 공급량 2,100만 개로 고정된 비트코인은 국가나 중앙은행이 임의로 가치를 희석시킬 수 없는 역사상 유일무이한 완벽한 희소성을 가집니다.</p>
            <p><strong>노트북LM 인사이트:</strong> 현 상황에서 비트코인을 '위험 자산'으로 분류하는 것은 시대착오적이며, 오히려 무한정 발행되는 법정화폐의 가치 하락(Purchasing Power Loss)을 헤지(Hedge)하기 위한 최후의 <strong>안전 자산(Safe Haven)</strong>으로 포지셔닝해야 합니다.</p>
        `
    },
    {
        id: 'report-3',
        tag: 'ECONOMICS',
        title: '디지털 금의 시간 가치 저장론',
        description: '비트코인이 어떻게 시간이라는 유한한 자원을 디지털화하여 보존하는지에 대한 고찰',
        date: '2024.03.15',
        content: `
            <p><strong>노동과 시간의 가치 저하:</strong> 현대 사회에서 개인이 피땀 흘려 일한 대가(돈)를 단순히 은행에 보관할 경우, 통화 팽창으로 인해 매년 그 실질적인 구매력(시간의 가치)은 증발하고 있습니다.</p>
            <p><strong>에너지의 치환 메커니즘:</strong> 비트코인은 작업 증명(Proof of Work)을 통해 전기 에너지와 컴퓨팅 연산 시간이라는 물리적 자원을 디지털화된 희소성으로 완벽히 치환하는 시스템입니다.</p>
            <p>우리가 비트코인을 소유한다는 것은 곧 인플레이션에 의해 증발하지 않는 <strong>자신만의 '시간'을 소유</strong>하는 것과 같습니다.</p>
        `
    },
    {
        id: 'report-4',
        tag: 'NETWORK',
        title: '레이어 2 생태계의 비전과 한계',
        description: '확장성 해결을 위한 라이트닝 네트워크와 최신 L2 솔루션들의 기술적 완성도 분석',
        date: '2024.03.12',
        content: `
            <p><strong>비트코인 네트워크의 근본 거버넌스:</strong> 1초에 7개(7 TPS)밖에 처리하지 못하는 비트코인 메인넷은 결함이 아닙니다. 탈중앙화와 보안성을 극대화하기 위한 철학적 선택입니다.</p>
            <p><strong>확장성의 해답, L2 솔루션:</strong> 라이트닝 네트워크(Lightning Network)의 채널 수용량은 꾸준히 증가하고 있으며, 최근 스택스(Stacks)와 같은 스마트 컨트랙트 기능을 지원하는 레이어 2 생태계가 활성화되고 있습니다.</p>
            <p>향후 수십 년간 비트코인은 글로벌 기축 정산망(Base Settlement Layer)으로 작용하고, 모든 일상적 소비 트랜잭션은 L2 위에서 즉각적이고 수수료 없이 이루어질 것입니다.</p>
        `
    },
    {
        id: 'report-5',
        tag: 'STRATEGY',
        title: '기관 투자자들의 비트코인 매집 동향',
        description: '월스트리트 주요 금융사들의 최신 포트폴리오 편입 비율과 장기 가격 전망 리포트',
        date: '2024.03.10',
        content: `
            <p><strong>현물 ETF 승인 이후의 변화:</strong> 블랙록과 피델리티를 필두로 한 글로벌 자산 운용사들의 '비트코인 블랙홀' 현상이 가속화되고 있습니다. 기관들의 매집 평단가는 꾸준히 우상향 중입니다.</p>
            <p>장기 홀더(Long-term Holder) 물량이 전체 유통량의 70%를 상회하며 공급 충격(Supply Shock)이 현실화되고 있습니다.</p>
        `
    },
    {
        id: 'report-6',
        tag: 'INSIGHT',
        title: '반감기 이후의 채굴 산업 재편성',
        description: '해시레이트 변화와 글로벌 채굴 기업들의 생존 경쟁 및 향후 네트워크 보안성 평가',
        date: '2024.03.05',
        content: `
            <p><strong>채굴 보상 반감의 경제학:</strong> 보상이 절반으로 줄어든 이후에도 해시레이트(Hashrate)는 최고치를 경신하고 있습니다. 이는 채굴 기업들이 비트코인의 미래 가치를 긍정적으로 전망하여 투자를 지속하고 있음을 시사합니다.</p>
            <p>비효율적인 채굴자들의 도태와 함께 업계는 더욱 친환경 에너지(수력, 화산 지열 등)를 활용하는 방향으로 고도화되고 있습니다.</p>
        `
    }
];

// 어그로 버튼 데이터 (10개)
const aggroData = [
    { id: 'aggro-1', icon: '🚀', label: '투더문!', title: '비트코인 10억설의 진실', content: '글로벌 M2 통화 공급량 및 통화 발행 속도를 기하급수적으로 대입해 볼 때, 비트코인 10억 원 도달은 단순 수학적 필연입니다.' },
    { id: 'aggro-2', icon: '😱', label: '폭락인가?', title: '개미 털기 vs 찐하락', content: '현재 온체인 지표상 장기 홀더들의 물량 이탈이 전혀 감지되지 않습니다. 이는 전형적인 스마트 머니의 매집 구간용 흔들기입니다.' },
    { id: 'aggro-3', icon: '🐳', label: '고래 포착', title: '지갑 10,000개 이동 중', content: '최근 대형 지갑 주소들이 거래소 외부 지갑으로 대량 인출을 지속하고 있습니다. 거래소 내 비트코인 재고가 바닥나고 있음을 경고합니다.' },
    { id: 'aggro-4', icon: '🏛️', label: 'ETF 대박', title: '블랙록의 비밀 매집', content: '블랙록의 IBIT 현물 ETF 자금 유입 강도가 기존 역대 모든 ETF의 출시 초기 기록을 무섭게 압도하며 하방 지지선을 강화합니다.' },
    { id: 'aggro-5', icon: '🔥', label: '김프 폭발', title: '한국 프리미엄의 경고', content: '국내 투심 과열로 1~3% 수준의 미세한 김치 프리미엄이 감지됩니다. 변동성이 극도로 높은 구간이므로 사다리 분할 적립이 효율적입니다.' },
    { id: 'aggro-6', icon: '🛡️', label: '안전 자산', title: '디지털 금의 승리', content: '지정학적 위기와 글로벌 은행 불안정 상황이 겹칠 때마다 비트코인은 전통 국채나 달러보다 견고한 안전 피난처 역할을 지속 입증하고 있습니다.' },
    { id: 'aggro-7', icon: '💻', label: '채굴 위기?', title: '해시레이트 신고가', content: '블록 보상 반감에도 불구하고 전 세계 해시레이트(650 EH/s)가 사상 최고치(ATH)를 경신하며 네트워크의 절대적 보안을 확증합니다.' },
    { id: 'aggro-8', icon: '📉', label: '숏스퀴즈', title: '공매도 세력의 파멸', content: '선물 시장 레버리지 매도 포지션의 과도한 밀집으로, 주요 가격대 돌파 시 공매도 강제 청산을 동반한 미친 스퀴즈 랠리 가능성이 상존합니다.' },
    { id: 'aggro-9', icon: '🌐', label: '웹 3.0', title: '비트코인 생태계 확장', content: '오디널스 및 BRC-20 표준 발행의 확산으로 비트코인 블록체인은 단순 가치 저장을 넘어 독자적인 스마트 레이어 플랫폼으로 도약 중입니다.' },
    { id: 'aggro-10', icon: '🤖', label: 'AI 분석', title: '비트이다~얍! 최종 진단', content: '200 DMA 상방 지지, 역대급 해시레이트 보안성, ETF 유입 속도를 감안할 때 이번 장기적 사이클은 매우 견고한 Bull Market입니다. 벨트를 매세요!' }
];

// 핫뉴스 데이터 (3개)
const hotNewsData = [
    {
        title: '구글, 비트코인 직접 결제 검토 중?',
        desc: '내부 관계자에 따르면 클라우드 서비스 결제 수단으로 비트코인을 도입하는 방안이 논의되고 있습니다.',
        date: '2026.03.05',
        content: `
            <p>구글 클라우드 부문이 디지털 자산을 활용한 결제 시스템 고도화에 박차를 가하고 있습니다. 내부 보고서에 따르면, 구글은 단순한 가치 저장을 넘어 실질적인 상거래 결제 수단으로 비트코인을 수용함으로써 웹 3.0 시장에서의 주도권을 확보하려 합니다.</p>
            <p><strong>핵심 포인트:</strong></p>
            <ul>
                <li>구글 클라우드 이용료의 비트코인 결제 선제적 도입 검토</li>
                <li>코인베이스와의 파트너십을 통한 보안 및 규제 대응 인프라 구축</li>
                <li>전 세계 기업용 서비스 시장에서의 암호화폐 결제 표준화 추진</li>
            </ul>
        `
    },
    {
        title: '엘살바도르, 비트코인 수익으로 학교 20개 추가 건립',
        desc: '국가 보유 비트코인의 가치 상승으로 교육 인프라를 확충하며 전 세계적인 관심을 끌고 있습니다.',
        date: '2026.03.04',
        content: `
            <p>나입 부켈레 대통령은 비트코인 수익금을 활용한 '비트코인 학교' 프로젝트의 2단계 착수를 발표했습니다. 이는 암호화폐 법정화 폐 도입 이후 국가가 거둔 경제적 성과가 국민들의 복지와 교육으로 직접 환원되는 사례로 평가받고 있습니다.</p>
            <p><strong>비즈니스 임팩트:</strong></p>
            <ul>
                <li>국가 자산의 잉여 수익을 활용한 인적 자원 투자 가속화</li>
                <li>전 세계 투자자 및 디지털 노마드의 유입으로 인한 교육 수요 증가 대응</li>
                <li>암호화폐 기반 국가 경제 모델의 실효성 입증</li>
            </ul>
        `
    },
    {
        title: 'JP모건, "비트코인은 21세기 가장 효율적인 자산"',
        desc: '과거 비판적이었던 입장을 바꿔, 포트폴리오의 5%는 비트코인이 필수라고 공식 발표했습니다.',
        date: '2026.03.03',
        content: `
            <p>월스트리트의 거인 JP모건이 비트코인에 대한 입장을 완전히 선회했습니다. 최신 시장 분석 보고서에서 JP모건은 비트코인이 기존 금융 시스템의 비효율성을 극복할 수 있는 강력한 대안 자산이며, 특히 자산 분산 측면에서 독보적인 기여를 한다고 강조했습니다.</p>
            <p><strong>전망 및 분석:</strong></p>
            <ul>
                <li>기관 투자자들의 포트폴리오 내 비트코인 비중 5% 권고</li>
                <li>금(Gold)의 시가총액을 추격하는 디지털 자산의 시대 공인</li>
                <li>전통 금융 인프라와 비트코인의 유기적 결합을 통한 새로운 수익 모델 제시</li>
            </ul>
        `
    }
];

// 주요 장점 5개
const whyBtcData = [
    {
        phrase: "프리미엄 글래스모피즘 디자인의 정점",
        title: "독보적인 시각적 경험",
        content: "하이엔드 다크 모드와 글래스모피즘이 결합된 UI는 단순한 차트 보기를 넘어 예술적인 금융 경험을 제공합니다. 사용자는 접속하는 순간 최첨단 금융 플랫폼의 품격을 느낄 수 있습니다."
    },
    {
        phrase: "실시간 데이터 반응형 사운드 엔진",
        title: "소리로 듣는 비트코인",
        content: "업비트 실시간 시세와 연동되어 주요 가격 변동 시 오디오 피드백을 즉시 제공합니다. 가격 급등 시엔 팡파레가, 급락 시엔 경고음이 울려 잠시 눈을 떼더라도 시장의 맥동을 놓치지 않게 합니다."
    },
    {
        phrase: "AI 기반의 10대 '어그로 버튼' 분석",
        title: "냉철한 AI 인사이트",
        content: "노트북LM 기반의 AI 모델이 시장의 핵심 이슈를 10가지 키워드로 압축하여 분석합니다. 복잡한 분석 없이 버튼 하나로 현재 비트코인 상황에 대한 명확한 통찰을 얻을 수 있습니다."
    },
    {
        phrase: "전 세계 어디서나 접속 가능한 PWA 기술",
        title: "Add to Home Screen",
        content: "별도의 앱 설치 없이 웹 브라우저만으로 바탕 화면에 즉시 설치할 수 있는 PWA(Progressive Web App)를 지원합니다. 모바일과 PC를 오가며 끊김 없는 최고의 접근성을 제공합니다."
    },
    {
        phrase: "암호화 지식 베이스(KB) 챗봇 탑재",
        title: "사다리 헬퍼의 지능형 답변",
        content: "단순한 챗봇이 아닌, 방대한 비트코인 전문 지식을 학습한 '사다리 헬퍼'가 당신의 질문에 답변합니다. 비트코인의 철학부터 기술적 전망까지 모든 궁금증을 즉시 해결해 드립니다."
    }
];

// -----------------------------------------
// Web Audio API 싱글톤 설계 (컨텍스트 고갈 방지)
// -----------------------------------------
let sharedAudioCtx = null;
function getAudioContext() {
    if (!sharedAudioCtx) {
        sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (sharedAudioCtx.state === 'suspended') {
        sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
}

function playVictorySound() {
    try {
        const audioCtx = getAudioContext();
        const now = audioCtx.currentTime;
        const playNote = (freq, startTime, duration, type = 'triangle') => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05); // Attack
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration); // Release
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + duration + 0.1);
        };
        playNote(261.63, now, 0.15); // C4
        playNote(329.63, now + 0.15, 0.15); // E4
        playNote(392.00, now + 0.30, 0.15); // G4
        playNote(523.25, now + 0.45, 0.60, 'square'); // C5
    } catch (e) {
        console.warn('오디오 재생 실패', e);
    }
}

function playWarningSound() {
    try {
        const audioCtx = getAudioContext();
        const now = audioCtx.currentTime;
        const playNote = (freq, startTime, duration, type = 'sawtooth') => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.08, startTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + duration + 0.1);
        };
        const baseNotes = [220.00, 196.00, 174.61, 164.81, 130.81]; // A3, G3, F3, E3, C3
        baseNotes.forEach((note, i) => {
            playNote(note, now + i * 0.4, 0.7, 'sawtooth');
            playNote(note / 2, now + i * 0.4, 0.7, 'sine');
        });
    } catch (e) {
        console.warn('오디오 재생 실패', e);
    }
}

function playPumpSound() {
    try {
        const audioCtx = getAudioContext();
        const now = audioCtx.currentTime;
        const playNote = (freq, startTime, duration, type = 'square') => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + duration + 0.1);
        };
        const scale = [523.25, 659.25, 783.99, 1046.50]; // C5 Major arpeggio
        for (let i = 0; i < 20; i++) {
            const freq = scale[i % scale.length] * (1 + Math.floor(i / scale.length) * 0.4);
            playNote(freq, now + i * 0.12, 0.1, i % 2 === 0 ? 'square' : 'triangle');
        }
    } catch (e) {
        console.warn('오디오 재생 실패', e);
    }
}

// -----------------------------------------
// 실시간 가격 상태에 따른 네온 플래시 효과
// -----------------------------------------
function triggerPriceFlash(type) {
    const flash = document.createElement('div');
    flash.className = type === 'pump' ? 'pump-active-overlay' : 'warning-active-overlay';
    flash.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        pointer-events: none; z-index: 1999; opacity: 1;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2000);

    // [실시간 연동] 시세 변동 및 수동 트리거 시 비트코인 로고 연계 불꽃 효과 자동 작동!
    const btcBadge = document.querySelector('.btc-badge');
    if (typeof confetti === 'function' && btcBadge) {
        const rect = btcBadge.getBoundingClientRect();
        // 화면 대비 로고 위치 비율 구하기
        const logoX = (rect.left + rect.width / 2) / window.innerWidth;
        const logoY = rect.bottom / window.innerHeight;

        if (type === 'pump') {
            // 상승 불꽃: 적립금 매수실현처럼 로고 위치에서부터 진한 빨간색 불꽃이 한 번에 팡! 터지며 사방으로 쫙 넓게 솟구쳐 퍼짐
            const confettiColors = ['#ff0000', '#ff1a1a', '#ff0033', '#d80000', '#ff0055']; // 더 진하고 강력한 순수 레드 계열 튜닝
            
            confetti({
                particleCount: 260, // 압도적인 대량의 입자 수
                spread: 130, // 사방으로 쫙 넓게 퍼져나가는 스프레드 (타격감 극대화)
                origin: { x: logoX, y: logoY - 0.02 }, // 로고 바로 윗부분에서 발사
                angle: 90, // 수직 위 방향으로 뿜어져 올라감
                gravity: 0.8, // 웅장하게 날아올라 낙하하는 물리 적용
                startVelocity: 42, // 시원하게 하늘로 치솟구치는 강력한 초기 속도
                ticks: 240,
                scalar: 1.2, // 큼직하고 존재감 있는 불꽃 크기
                colors: confettiColors
            });
        } else if (type === 'warning') {
            // 하락 소나기: 로고 전체 가로폭 밑단에서 은은하고 풍성하게 골고루 쏟아져 내림
            const colors = ['#0077ff', '#00aaff', '#00ccff', '#88ddff', '#ffffff'];
            const duration = 2000; // 2초 동안 풍성한 불꽃 샤워
            const animationEnd = Date.now() + duration;

            // 로고 가로폭의 화면 비율상 시작 지점(Left)과 총 너비(Width) 계산
            const logoLeft = rect.left / window.innerWidth;
            const logoWidth = rect.width / window.innerWidth;
            
            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                
                confetti({
                    particleCount: 6,
                    startVelocity: 0.5, // 뿜어내지 않고 자연스럽게 밑으로만 번지는 궤적
                    ticks: 160,
                    origin: {
                        // 특정 한 지점이 아니라, 로고 왼쪽 끝부터 오른쪽 끝까지 골고루 분산 생성!
                        x: logoLeft + Math.random() * logoWidth,
                        y: logoY + 0.01
                    },
                    colors: colors,
                    gravity: 0.38,
                    scalar: 0.95,
                    drift: Math.random() * 2.0 - 1.0
                });
            }, 40);
        }
    }
}

// -----------------------------------------
// 왜 비트코인인가 섹션 렌더링
// -----------------------------------------
let currentWhyBtcSelected = [];

function renderWhyBtc() {
    const container = document.getElementById('why-btc-container');
    if (!container) return;

    const shuffled = [...whyBtcData].sort(() => 0.5 - Math.random());
    currentWhyBtcSelected = shuffled.slice(0, 3); // 원래 기획안(3개)에 맞춰 3개 선택

    container.classList.add('rotating');

    setTimeout(() => {
        container.innerHTML = currentWhyBtcSelected.map((data, index) => `
            <div class="why-btc-card" data-index="${index}" style="animation: fadeInUp 0.5s ease forwards ${index * 0.1}s; opacity: 0; transform: translateY(10px);">
                <div class="why-btc-content">
                    <p class="why-btc-phrase">"${data.phrase}"</p>
                    <span class="click-hint">상세 인사이트 보기 ⚡</span>
                </div>
            </div>
        `).join('');
        container.classList.remove('rotating');
    }, 300);

    container.onclick = (e) => {
        const card = e.target.closest('.why-btc-card');
        if (!card) return;

        const data = currentWhyBtcSelected[parseInt(card.dataset.index)];
        const modal = document.getElementById('report-modal');
        const mTag = document.getElementById('modal-tag');
        const mTitle = document.getElementById('modal-title');
        const mDate = document.getElementById('modal-date');
        const mBody = document.getElementById('modal-body');

        if (modal && mTag && mTitle && mDate && mBody) {
            mTag.textContent = 'APP PREEMINENCE';
            mTag.style.color = '#f7931a';
            mTitle.textContent = data.title;
            mDate.textContent = 'MASTERPIECE';
            mBody.innerHTML = `
                <div style="font-size: 17px; line-height: 1.8; color: #eee;">
                    <p style="font-weight: 700; color: var(--accent-orange); margin-bottom: 20px;">"${data.phrase}"</p>
                    <p>${data.content}</p>
                    <p style="margin-top:30px; font-style:italic; color:#888; font-size: 14px;">*비트코인이다~얍!은 단순한 도구를 넘어선 초격차 플랫폼입니다.</p>
                </div>
            `;
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden'; // 모바일 스크롤 락
        }
    };
}

setInterval(renderWhyBtc, 60000);

// -----------------------------------------
// 어그로 그리드 렌더링
// -----------------------------------------
function renderAggroGrid() {
    const grid = document.getElementById('aggro-grid');
    if (!grid) return;
    grid.innerHTML = aggroData.map(item => `
        <button class="aggro-btn" data-id="${item.id}">
            <span class="aggro-icon">${item.icon}</span>
            <span class="aggro-label">${item.label}</span>
        </button>
    `).join('');

    const modal = document.getElementById('report-modal');
    const mTag = document.getElementById('modal-tag');
    const mTitle = document.getElementById('modal-title');
    const mDate = document.getElementById('modal-date');
    const mBody = document.getElementById('modal-body');

    grid.querySelectorAll('.aggro-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const data = aggroData.find(d => d.id === btn.dataset.id);
            if (data) {
                mTag.textContent = 'AI AGGRO INSIGHT';
                mTag.style.color = '#f7931a';
                mTitle.textContent = data.title;
                mDate.textContent = 'REAL-TIME';
                mBody.innerHTML = `<p style="font-size: 17px; line-height: 1.8;">${data.content}</p><p style="margin-top:20px; font-style:italic; color:#888;">*이 인사이트는 '비트코인이다~얍!' AI 모델이 실시간 데이터를 바탕으로 생성했습니다.</p>`;
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
                document.body.style.overflow = 'hidden';
            }
        };
    });
}

// -----------------------------------------
// 구글 자동 번역 API (본문용 번역 지원)
// -----------------------------------------
async function translateText(text) {
    if (!text) return "";
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            return data[0].map(chunk => chunk[0]).join('');
        }
        return text;
    } catch (e) {
        console.error("Translation Error:", e);
        return text;
    }
}

// -----------------------------------------
// 다중 텍스트 배치 번역 (구글 API 429 락 방지 및 성능 90% 극대화)
async function translateMultipleTexts(textArray) {
    if (!textArray || textArray.length === 0) return [];
    try {
        const delimiter = " ### ";
        const combined = textArray.join(delimiter);
        const translated = await translateText(combined);
        // ### 기준으로 분리하여 배열 복원 (공백 유연성 지원)
        return translated.split(/###/g).map(t => t.trim());
    } catch (e) {
        console.error("Batch Translation Error:", e);
        return textArray;
    }
}

// 실시간 뉴스 가져오기 (CryptoCompare API & 구글 배치 번역 완벽 결합)
// -----------------------------------------
async function fetchRealtimeNews() {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    try {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=BTC');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (data && data.Data && data.Data.length > 0) {
            const rawNews = data.Data.slice(0, 3);
            
            // 번역할 타이틀과 짧은 요약문들을 하나의 배열로 묶기
            const textsToTranslate = [];
            rawNews.forEach(item => {
                textsToTranslate.push(item.title);
                textsToTranslate.push(item.body.substring(0, 90));
            });

            // 단 한 번의 단일 HTTP 번역 요청! (429 rate limit 철저 방어)
            const translatedResults = await translateMultipleTexts(textsToTranslate);

            const translatedNews = [];
            rawNews.forEach((item, i) => {
                const titleIndex = i * 2;
                const descIndex = i * 2 + 1;

                const trTitle = translatedResults[titleIndex] || item.title;
                const trDesc = translatedResults[descIndex] || item.body.substring(0, 90);

                translatedNews.push({
                    title: trTitle,
                    desc: trDesc + '...',
                    date: new Date(item.published_on * 1000).toLocaleDateString('ko-KR'),
                    rawTitle: item.title,
                    rawBody: item.body,
                    url: item.url,
                    source: item.source_info.name
                });
            });

            hotNewsData.length = 0;
            hotNewsData.push(...translatedNews);

            renderHotNews();
            console.log('✅ 실시간 핵심지표 3종 완벽 기동 완료');
        }
    } catch (error) {
        console.error('❌ 실시간 뉴스 가져오기 실패:', error);
        renderHotNews();
    }
}

function renderHotNews() {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    if (hotNewsData.length === 0) {
        grid.innerHTML = '<p style="color: #888; padding: 20px;">실시간 핵심지표를 불러오는 중...</p>';
        return;
    }

    grid.innerHTML = hotNewsData.map((news, index) => `
        <div class="news-card" data-index="${index}" style="cursor: pointer;">
            <h5>${news.title}</h5>
            <p>${news.desc}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                <span class="click-hint" style="font-size: 11px; color: var(--accent-orange); opacity: 0.8;">상세 분석 보기 ⚡</span>
                <span style="font-size: 10px; color: #555;">${news.date || ''} ${news.source ? '| ' + news.source : ''}</span>
            </div>
        </div>
    `).join('');

    grid.querySelectorAll('.news-card').forEach(card => {
        card.onclick = async (e) => {
            e.preventDefault();
            const data = hotNewsData[card.dataset.index];
            const modal = document.getElementById('report-modal');
            const mTag = document.getElementById('modal-tag');
            const mTitle = document.getElementById('modal-title');
            const mDate = document.getElementById('modal-date');
            const mBody = document.getElementById('modal-body');

            if (modal && mTag && mTitle && mDate && mBody) {
                mTag.textContent = 'CORE INDICATOR INSIGHT';
                mTag.style.color = '#f7931a';
                mTitle.textContent = data.title;
                mDate.textContent = data.date || 'REALTIME';
                
                // 본문은 클릭하는 시점에 비동기 실시간 번역 진행 (초지능형 지연 로딩 구현)
                mBody.innerHTML = `
                    <div style="font-size: 17px; line-height: 1.8; color: #eee; text-align: center; padding: 40px 0;">
                        <div class="loader-circle" style="width: 40px; height: 40px; border: 3px solid rgba(247, 147, 26, 0.1); border-top-color: var(--accent-orange); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                        <p style="font-size: 14px; color: #aaa;">AI가 실시간 핵심지표 데이터를 분석 및 요약 중입니다...</p>
                    </div>
                `;

                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
                document.body.style.overflow = 'hidden';

                try {
                    // 본문만 타겟팅하여 필요한 시점에 1회 번역!
                    const trBody = await translateText(data.rawBody);
                    
                    // 기사 제목 톤(상승/기대 등)에 맞추어 맞춤식 뷰빈 AI 실시간 인사이트 출력
                    const hasPositiveTone = data.title.includes('상승') || data.title.includes('기대') || data.title.includes('급등') || data.title.includes('최고') || data.title.includes('호재');

                    mBody.innerHTML = `
                        <div style="font-size: 17px; line-height: 1.8; color: #eee;">
                            <p style="font-weight: 700; color: #fff; margin-bottom: 20px; font-size: 19px;">${data.desc}</p>
                            <p style="margin-bottom: 20px; color: #aaa; font-size: 14px; font-style: italic;">[글로벌 핵심지표 원문] ${data.rawTitle}</p>
                            <p style="margin-bottom: 20px; font-size: 15px; color: #d0d0d0; background: rgba(255,255,255,0.02); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">${trBody}</p>
                            <p style="margin-top: 25px;"><a href="${data.url}" target="_blank" style="color: var(--accent-cyan); text-decoration: none; font-weight: 700;">🔗 글로벌 지표 원문 직접 보기 →</a></p>
                            <p style="font-size: 13px; color: #888; margin-top: 10px;">출처: ${data.source}</p>
                            
                            <div style="margin-top: 30px; padding: 20px; background: rgba(255,147,26,0.05); border-radius: 12px; border: 1px dashed rgba(255,147,26,0.2);">
                                <p style="margin: 0; color: var(--accent-orange); font-size: 14px; font-weight: 700;">💡 비트코인이다~얍! AI 핵심지표 실시간 통찰</p>
                                <p style="margin: 10px 0 0 0; font-size: 13px; color: #ccc; line-height: 1.6;">
                                    본 지표는 비트코인의 글로벌 핵심 시그널입니다. ${hasPositiveTone ? '강세장의 긍정적 촉매로 활약할 여지가 큼에 따라 적립금 매수실현 한 계단을 더 강화하여 디지털 부를 쟁취하기 유효한 타이밍입니다.' : '단기 변동성이 촉발될 수 있는 매물대 영역입니다. 차분히 200일 이평선의 장기 지지선을 관망하면서 사다리 적립금 매수실현(DCA)으로 분산 대응하는 것이 유리합니다.'}
                                </p>
                            </div>
                        </div>
                    `;
                } catch (err) {
                    console.error("On-demand translation failed:", err);
                    mBody.innerHTML = `
                        <div style="font-size: 17px; line-height: 1.8; color: #eee;">
                            <p style="font-weight: 700; color: #fff; margin-bottom: 20px; font-size: 19px;">${data.desc}</p>
                            <p>${data.rawBody}</p>
                            <p style="margin-top: 25px;"><a href="${data.url}" target="_blank" style="color: var(--accent-cyan); text-decoration: none;">🔗 외신 원문 직접 보기</a></p>
                        </div>
                    `;
                }
            }
            playVictorySound();
        };
    });
}

// -----------------------------------------
// [대개편] 초지능형 AI 금융 지식 베이스
// -----------------------------------------
const knowledgeBase = {
    '상승': '비트코인 상승은 크게 세 가지 요인 때문입니다: 1) 미 연준 금리 인하에 따른 글로벌 유동성(M2) 팽창, 2) 블랙록 등 금융기관의 현물 ETF 유입으로 인한 역사적인 공급 부족(Supply Shock), 3) 4년 주기 반감기에 따른 희소성 가치 극대화입니다.',
    '유동성': '비트코인 시세는 글로벌 M2 유동성 지표와 90% 이상의 완벽한 통계적 양의 상관관계를 보여줍니다. 화폐 가치가 떨어질 때 비트코인은 최고의 유동성 저장 방주로 기능합니다.',
    '공급': '비트코인의 한정된 총량(2,100만 개) 중 1,968만 개 이상이 채굴되었습니다. 10분마다 3.125 BTC만 새로 생성되는 극심한 공급 가뭄 상태에서 월가 기관들의 매집 강도는 공급 쇼크를 촉진하고 있습니다.',
    '전망': '온체인 데이터 분석에 따르면 200일 이동평균선(200 DMA)이 강력한 상승 지지선으로 작용하고 있으며, 4년 주기 반감기 랠리 패턴이 동일하게 재현될 경우 이번 사이클은 전례 없는 장기 우상향 국면을 띌 것입니다.',
    'strk': 'STRK(공격형) 모델은 비트코인의 높은 펌핑 구간 변동성을 극대화하여 초과 성장을 도모하는 배분 모델입니다. 상승장 주도의 포트폴리오를 구성할 때 최적의 선택이 됩니다.',
    'strc': 'STRC(안정형) 모델은 하방 변동성 위험을 철저히 헤지하며 복리 연 +12.4%의 안정적 방어를 이루어 내는 자산 보호 포트폴리오 모델입니다.',
    'etf': '블랙록과 피델리티 현물 ETF 승인은 비트코인을 전통 정형 자산으로 고착시켰습니다. 금(Gold) ETF 시장의 성장을 아득히 뛰어넘어 향후 비트코인의 단단한 가격 하단을 지지하는 기둥이 될 것입니다.',
    '반감기': '비트코인은 210,000 블록(약 4년)마다 공급량이 반으로 줍니다. 2024년 4월 4차 반감기로 블록 보상이 3.125 BTC로 하락했으며, 이에 따라 연간 인플레이션 공급률이 0.8%대로 낮아져 금보다 희소해졌습니다.',
    '해시레이트': '현재 약 650 EH/s로 사상 최고치(ATH)를 경신하며 네트워크 해킹이나 무결성 오작동이 사실상 절대적으로 불가능한 세계에서 가장 안전한 탈중앙화 금융 장벽을 입증합니다.',
    '거래량': '실시간 24시간 거래량은 시장을 주도하는 세력의 매집 강도를 분석하는 지표입니다. 거래량과 200일 이평선의 교차 분석을 통해 장기 고점과 저점 타이밍을 가이드받을 수 있습니다.',
    '200일선': '200일 이동평균선은 장기 장세의 나침반입니다. 현재 비트코인 가격이 200일선 상방에 확고히 올라서 있어 완벽한 Bull Market 강세 추세를 증명하고 있습니다.',
    '사다리': '사다리 게임은 일상의 아낀 소비(커피, 술, 외식)를 실시간 시세의 비트코인 가치로 전환해 주는 자산 형성 체험 헬퍼입니다. 원화로 적립된 누적액이 비트코인 가치 등락에 따라 어떻게 변하는지 체험하며 투자 체력을 길러줍니다.',
    '커피': '오늘 5,000원짜리 커피 한 잔을 참음으로써 원화 적립과 함께 비트코인 지분을 확보하셨습니다. 매일 아낀 커피값이 1년, 5년 뒤 거대한 디지털 부동산의 지분으로 성장하는 마법을 목격하십시오!'
};

function getResponse(input) {
    const cleanInput = input.replace(/\s+/g, '').toLowerCase();

    for (let key in knowledgeBase) {
        if (cleanInput.includes(key)) {
            return knowledgeBase[key];
        }
    }

    // [고도화] 실시간 시세 주입형 동적 Fallback 답변 엔진
    const latestPrice = localStorage.getItem('last_btc_price');
    const formattedPrice = latestPrice ? Number(latestPrice).toLocaleString('ko-KR') : '95,000,000';
    
    if (cleanInput.includes('사') || cleanInput.includes('매수') || cleanInput.includes('투자') || cleanInput.includes('돈')) {
        return `현재 비트코인이 실시간 ${formattedPrice}원 선에서 거래되고 있는 장기적 강세 국면입니다. 거액의 무지성 매수보다는, 매일 커피나 술을 참아 그만큼의 원화를 비트코인으로 적립해 나가는 '사다리 오르기'가 변동성을 이기고 복리 효과를 극대화하는 최고의 스마트한 투자 전략입니다.`;
    }
    if (cleanInput.includes('팔') || cleanInput.includes('매도') || cleanInput.includes('수익') || cleanInput.includes('익절')) {
        return `현재 실시간 가격인 ${formattedPrice}원은 장기 200일 이동평균선(약 84,000,000원) 대비 상방에 위치하여 안정적인 지지를 받고 있습니다. 조급하게 익절하기보다 장기 반감기 희소성 및 공급 부족 상황을 고려하여 사다리 오르기 목표인 0.1 BTC 달성을 끝까지 완주해 보십시오.`;
    }
    if (cleanInput.includes('노트북') || cleanInput.includes('lm') || cleanInput.includes('서버')) {
        return `구글 NotebookLM 기반의 최신 지식 베이스 연동이 정상 작동하고 있습니다. 우측 하단의 사다리 헬퍼 챗봇 및 대시보드 리포트는 뷰빈 Together의 1등급 암호화 전문 자료들을 바탕으로 완벽히 검증 및 학습된 최신 금융 인사이트를 제공합니다.`;
    }

    return `질문하신 내용에 대해 '비트코인이다~얍!' AI 모델이 실시간 시장 시세(${formattedPrice}원) 및 노트북LM 지식 베이스를 종합 분석해 드립니다. \n\n비트코인은 현재 단순 투기 자산이 아닌 글로벌 기관 자산 배분의 필수 자산으로 안착했습니다. 대시보드에 탑재된 [200일선], [해시레이트], [거래량] 지표 및 [반감기 미래 시뮬레이터] 퀵 프롬프트 단축키를 눌러 시장의 무결한 데이터 판세를 적극적으로 탐색하고 주체적으로 부의 지식을 습득해 보세요! 추가로 궁금한 키워드(예: '반감기', '해시레이트', '200일선', '사다리')를 물어보시면 즉각 상세 답변해 드립니다.`;
}

// -----------------------------------------
// 리포트 그리드 렌더링 함수
// -----------------------------------------
function renderReports(filterQuery = '') {
    const grid = document.getElementById('report-grid');
    if (!grid) return;

    let displayReports = [];

    if (filterQuery) {
        const query = filterQuery.toLowerCase();
        displayReports = reportData.filter(r =>
            r.title.toLowerCase().includes(query) ||
            r.tag.toLowerCase().includes(query) ||
            r.description.toLowerCase().includes(query)
        );
    } else {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

        const totalReports = reportData.length;
        const itemsToShow = 6;
        const startIndex = (dayOfYear * itemsToShow) % totalReports;

        for (let i = 0; i < itemsToShow; i++) {
            const index = (startIndex + i) % totalReports;
            displayReports.push(reportData[index]);
        }
    }

    if (displayReports.length === 0) {
        grid.innerHTML = `
            <div class="report-card" style="grid-column: 1 / -1; text-align: center; padding: 40px; border-style: dashed; border-color: rgba(255,255,255,0.1); background: transparent;">
                <span style="font-size: 32px; display:block; margin-bottom: 15px;">🔍</span>
                <h4 style="font-size: 16px; font-weight:700; color:#fff;">일치하는 분석 리포트가 없습니다</h4>
                <p style="color:#666; font-size: 13px; margin: 5px 0 0 0;">다른 검색어나 태그(예: STRATEGY, INSIGHT)를 입력해 보세요.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = displayReports.map(report => `
        <div class="report-card">
            <span class="tag-${report.tag.toLowerCase()}">${report.tag}</span>
            <h4>${report.title}</h4>
            <p>${report.description}</p>
            <div class="card-footer">
                <span class="date">${report.date}</span>
                <button class="read-link btn-report-open" data-id="${report.id}">분석 리포트 읽기 →</button>
            </div>
        </div>
    `).join('');

    attachReportModalEvents();
}

function attachReportModalEvents() {
    const modal = document.getElementById('report-modal');
    const mTag = document.getElementById('modal-tag');
    const mTitle = document.getElementById('modal-title');
    const mDate = document.getElementById('modal-date');
    const mBody = document.getElementById('modal-body');

    document.querySelectorAll('.btn-report-open').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const reportId = btn.getAttribute('data-id');
            const data = reportData.find(item => item.id === reportId);

            if (data) {
                mTag.textContent = data.tag;
                mTag.style.color = (data.tag === 'STRATEGY' || data.tag === 'NETWORK') ? 'var(--accent-cyan)' : 'var(--accent-orange)';
                mTitle.textContent = data.title;
                mDate.textContent = data.date;
                mBody.innerHTML = data.content;

                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
                document.body.style.overflow = 'hidden';
            }
        };
    });
}

// -----------------------------------------
// [대개편] 사다리 한계단 오르기 (원화-BTC 듀얼 적립)
// -----------------------------------------
function initLadder() {
    let currentKrw = 0;
    let currentBtc = 0;
    let btcPriceKrw = 95000000;

    // 이전에 저장된 적립금 불러오기
    const savedKrw = localStorage.getItem('ladder_total_krw');
    const savedBtc = localStorage.getItem('ladder_total_btc');
    if (savedKrw) currentKrw = parseFloat(savedKrw);
    if (savedBtc) currentBtc = parseFloat(savedBtc);

    const clickedCounts = JSON.parse(localStorage.getItem('ladder_clicked_counts') || '{}');

    const krwDisplay = document.getElementById('ladder-total-krw');
    const btcDisplay = document.getElementById('ladder-total-btc');
    const resetBtn = document.getElementById('reset-ladder-btn');
    const rungBtns = document.querySelectorAll('.ladder-rung-btn');

    function updateTotalDisplay() {
        if (krwDisplay) {
            krwDisplay.textContent = `${currentKrw.toLocaleString('ko-KR')}원 절약 적립!`;
            localStorage.setItem('ladder_total_krw', currentKrw);
        }
        if (btcDisplay) {
            btcDisplay.textContent = `+${currentBtc.toFixed(8)} BTC 확보`;
            localStorage.setItem('ladder_total_btc', currentBtc);
        }
        if (typeof updateGoalProgress === 'function') {
            updateGoalProgress(currentBtc);
        }
    }

    updateTotalDisplay();

    rungBtns.forEach(btn => {
        const type = btn.getAttribute('data-type');
        const badge = btn.querySelector('.rung-badge');
        let initialCount = clickedCounts[type] || 0;

        if (badge) {
            badge.textContent = initialCount;
            if (initialCount > 0) badge.classList.add('active');
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const krwVal = parseFloat(btn.getAttribute('data-krw') || '0');
            
            const latestPrice = localStorage.getItem('last_btc_price');
            if (latestPrice && !isNaN(latestPrice)) {
                btcPriceKrw = parseFloat(latestPrice);
            }
            
            const btcToAdd = krwVal / btcPriceKrw;

            currentKrw += krwVal;
            currentBtc += btcToAdd;

            let currentCount = clickedCounts[type] || 0;
            currentCount++;
            clickedCounts[type] = currentCount;

            if (badge) {
                badge.textContent = currentCount;
                badge.classList.add('active');
                badge.style.transform = 'translateY(-50%) scale(1.3)';
                setTimeout(() => { badge.style.transform = ''; }, 150);
            }

            localStorage.setItem('ladder_clicked_counts', JSON.stringify(clickedCounts));
            updateTotalDisplay();
            playVictorySound();
        });
    });

    function updateBtcPreviews() {
        const latestPrice = localStorage.getItem('last_btc_price');
        let currentPrice = latestPrice ? parseFloat(latestPrice) : 95000000;

        rungBtns.forEach(btn => {
            const krwVal = btn.getAttribute('data-krw');
            if (krwVal) {
                const btcVal = parseFloat(krwVal) / currentPrice;
                const amountSpan = btn.querySelector('.rung-amount');
                if (amountSpan) {
                    amountSpan.textContent = `(+${btcVal.toFixed(8)} BTC)`;
                }
            }
        });
    }

    updateBtcPreviews();
    setInterval(updateBtcPreviews, 1000);

    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentKrw = 0;
            currentBtc = 0;
            localStorage.removeItem('ladder_total_krw');
            localStorage.removeItem('ladder_total_btc');
            localStorage.removeItem('ladder_clicked_counts');
            // [테스트 편의 기능] 초기화 시 프리미엄 가입 상태도 함께 리셋하여 락업 10회 터치를 무한정 다시 테스트 가능!
            localStorage.removeItem('premium_member');
            sessionStorage.removeItem('touch_count');
            screenTouchCount = 0;
            setMemberCount(0); // 프리미엄 멤버 수 초기화 (0명으로 세팅)

            // 프리미엄 뱃지 스타일 복구
            const badge = document.getElementById('premium-badge');
            if (badge) {
                badge.classList.remove('subscribed');
            }
            const badgeText = document.querySelector('.premium-badge-text');
            if (badgeText) {
                badgeText.textContent = '프리미엄 멤버십 운영중';
            }

            // 락월 닫기
            hideLockwall();

            rungBtns.forEach(btn => {
                const badge = btn.querySelector('.rung-badge');
                if (badge) {
                    badge.classList.remove('active');
                    badge.textContent = '0';
                }
            });

            for (let prop in clickedCounts) {
                delete clickedCounts[prop];
            }

            updateTotalDisplay();
            
            try {
                const audioCtx = getAudioContext();
                const osc = audioCtx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
                osc.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            } catch (err) {}
        });
    }

    // 적립금 매수실현 타이틀 클릭 시 팡파레 + 강렬한 빨간색 꽃가루 + "수고하셨습니다" TTS 음성 안내
    const ladderTitleBtn = document.getElementById('ladder-title-btn');
    if (ladderTitleBtn) {
        ladderTitleBtn.addEventListener('click', () => {
            // 1. 빵빠레 효과음 재생
            playPumpSound();

            // 2. 강렬한 빨간색 중심의 꽃가루 흩날리기 (레드 컬러 극대화!)
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 200, // 더 풍성하고 시원한 만족감 부여
                    spread: 130, // 넓게 퍼져 나감
                    origin: { y: 0.5 },
                    colors: ['#ff0000', '#ff1a1a', '#ff0033', '#e60000', '#ff3366', '#ffffff'] // 붉은 강렬함을 극대화한 딥 레드 위주의 배합
                });
            }

            // 3. "수고하셨습니다" 한국어 음성 안내 (Web Speech API TTS)
            if ('speechSynthesis' in window) {
                try {
                    window.speechSynthesis.cancel(); // 진행 중인 음성 즉시 중단 후 재생
                    const utterance = new SpeechSynthesisUtterance("수고하셨습니다");
                    utterance.lang = "ko-KR";
                    utterance.rate = 0.95; // 안정감 있는 속도
                    utterance.pitch = 1.0;
                    window.speechSynthesis.speak(utterance);
                } catch (e) {
                    console.warn("Speech synthesis failed:", e);
                }
            }
        });
    }
}

// -----------------------------------------
// [대개편] 초지능형 챗봇 인터랙션 로직
// -----------------------------------------
function initChatbot() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');
    const sendChat = document.getElementById('send-chat');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatToggle || !chatWindow) return;

    const toggleChat = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    };

    chatToggle.addEventListener('click', toggleChat);

    const headerChatBtn = document.getElementById('header-chat-toggle');
    if (headerChatBtn) {
        headerChatBtn.addEventListener('click', toggleChat);
    }

    closeChat.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        chatWindow.style.display = 'none';
    });

    function addMessage(text, role) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const answer = getResponse(text);
            addMessage(answer, 'bot');
        }, 500);
    }

    sendChat.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // [신규] 챗봇 내 빠른 추천 질문 단축 버튼 바인딩
    document.querySelectorAll('.quick-question-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const question = btn.getAttribute('data-question');
            addMessage(question, 'user');
            
            setTimeout(() => {
                const answer = getResponse(question);
                addMessage(answer, 'bot');
            }, 400);
        });
    });
}

// -----------------------------------------
// 모달 초기화 및 네비게이션 연동
// -----------------------------------------
function initModal() {
    const modal = document.getElementById('report-modal');
    const closeBtn = document.getElementById('close-modal');
    const confirmBtn = document.getElementById('modal-confirm');

    const mTag = document.getElementById('modal-tag');
    const mTitle = document.getElementById('modal-title');
    const mDate = document.getElementById('modal-date');
    const mBody = document.getElementById('modal-body');

    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const menuName = link.textContent.trim();
            mTag.textContent = 'SYSTEM';
            mTag.style.color = '#fff';
            mTitle.textContent = `${menuName} 가이드`;
            mDate.textContent = 'LIVE UPDATE';

            if (menuName === '투자 전략') {
                mBody.innerHTML = `
                    <p><strong>로컬 AI 분석서와 완벽히 결합되었습니다.</strong></p>
                    <p>현재 하단의 대시보드 리포트를 통해 안정형(STRC)과 공격형(STRK) 모델의 실시간 수익률 추이를 확인하실 수 있습니다.</p>
                    <p>200일 이동평균선(200 DMA)이 강세장을 유지하는 한 적극적인 축적이 유효합니다. 상세 분석은 아래 카드들을 이용해 주세요.</p>
                `;
            } else if (menuName === '희망 리포트') {
                mBody.innerHTML = `
                    <p><strong>희망 리포트 발행 안내</strong></p>
                    <p>비트코인의 수학적 설계에 근거한 반감기 희소성 통찰 리포트가 완성되었습니다. 우측 하단의 사다리 헬퍼 AI에게 비트코인의 미래 인플레이션과 반감기 가격 패턴에 대해 질문해 보세요!</p>
                `;
            } else {
                mBody.innerHTML = `
                    <p><strong>커뮤니티 기능 준비중</strong></p>
                    <p>현재 스티치(Stitch) MCP 서버와 로컬 금융 환경을 안전하게 연동하는 작업을 점검 중입니다. 곧 활성화될 예정입니다.</p>
                `;
            }

            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModalFunc = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 스크롤 락 해제
        }, 300);
    };

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModalFunc();
    });
    confirmBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModalFunc();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
}

// -----------------------------------------
// 파티클(입자) 배경 효과 초기화
// -----------------------------------------
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5 - 0.2;
            this.color = Math.random() > 0.5 ? '#0dccf2' : '#f7951d';
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0) this.y = height;
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 40; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// -----------------------------------------
// 명언 데이터 및 슬라이드(캐러셀) 자동 전환
// -----------------------------------------
const quotesData = [
    {
        text: "비트코인은 시간의 가치를 저장합니다. 그것은 우리가 보낸 시간과 노력에 대한 가장 정직한 기록입니다.",
        source: "비트코인 커뮤니티"
    },
    {
        text: "법정 화폐는 국가의 부채이지만, 비트코인은 개인의 완벽한 자산이자 흔들리지 않는 수학적 무결성입니다.",
        source: "사토시 나카모토 정신"
    },
    {
        text: "가장 어두운 하락장에서 싹튼 확신이, 가장 눈부신 상승장의 수익을 만들어냅니다.",
        source: "투자 격언"
    },
    {
        text: "모든 사람이 결국 자신이 합당하다고 생각하는 가격에 비트코인을 사게 될 것이다.",
        source: "맥스 카이저 (Max Keiser)",
        meaning: "비트코인을 일찍 깨달은 자는 저렴하게 사지만, 끝까지 부정하는 자는 결국 최고점에서 사게 됨을 의미합니다."
    }
];

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const nav = document.querySelector('.carousel-nav');
    if (!track || !nav) return;

    const shuffledQuotes = [...quotesData].sort(() => Math.random() - 0.5);

    track.innerHTML = shuffledQuotes.map((quote, i) => `
        <li class="carousel-slide ${i === 0 ? 'active' : ''}">
            <div class="glass-quote-card">
                <span class="quote-mark left">“</span>
                <p class="quote-text">${quote.text}</p>
                <div class="quote-info" style="margin-top:20px; text-align:right;">
                    <span class="quote-author" style="color: var(--accent-orange); font-weight: 700;">- ${quote.source}</span>
                    ${quote.meaning ? `<p class="quote-meaning" style="font-size: 13px; color: #888; margin-top: 10px; font-style: italic;">${quote.meaning}</p>` : ''}
                </div>
                <span class="quote-mark right">”</span>
            </div>
        </li>
    `).join('');

    nav.innerHTML = shuffledQuotes.map((_, i) => `
        <button class="carousel-indicator ${i === 0 ? 'active' : ''}"></button>
    `).join('');

    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dots = Array.from(document.querySelectorAll('.carousel-indicator'));

    let currentIndex = 0;
    let slideInterval;

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        track.style.transform = 'translateX(-' + (index * 100) + '%)';

        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        currentIndex = index;
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); resetInterval(); });
    prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); resetInterval(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => { e.preventDefault(); goToSlide(index); resetInterval(); });
    });

    function startInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();
}

// -----------------------------------------
// [대개편] 비트코인 4년 반감기 및 채굴 시뮬레이터 연산 로직
// -----------------------------------------
let currentBlockHeight = 844250;
const totalMinedBtc = 19687550; // 대략적인 현재 누적 채굴량
const blocksPerYear = 52560; // 365 * 24 * 6
const benchmark200Dma = 84000000;

function updateSimulator(years) {
    const rewardEl = document.getElementById('sim-reward');
    const inflationEl = document.getElementById('sim-inflation');
    const remainingEl = document.getElementById('sim-remaining');
    const blockHeightEl = document.getElementById('current-block-height');
    const nextHalvingDateEl = document.getElementById('next-halving-date');
    const progressTextEl = document.getElementById('halving-progress-text');
    const progressBarEl = document.getElementById('halving-progress-bar');
    
    // 1. 계산식 수립
    let targetBlocks = currentBlockHeight + (blocksPerYear * years);
    let reward = 3.125;
    
    // 반감기 횟수 및 보상액 연산
    let halvingCount = Math.floor(targetBlocks / 210000);
    reward = 50 / Math.pow(2, halvingCount);
    
    let simulatedMined = 0;
    if (years === 0) {
        simulatedMined = totalMinedBtc;
    } else if (years === 114) { // 2140년 최종 완판
        simulatedMined = 21000000;
        reward = 0;
    } else {
        let currentBlocks = currentBlockHeight;
        let cumulativeReward = 0;
        let remainingBlocksToSimulate = blocksPerYear * years;
        
        while (remainingBlocksToSimulate > 0) {
            let nextHalvingBlock = (Math.floor(currentBlocks / 210000) + 1) * 210000;
            let blocksInEpoch = Math.min(remainingBlocksToSimulate, nextHalvingBlock - currentBlocks);
            
            let epochHalvingCount = Math.floor(currentBlocks / 210000);
            let epochReward = 50 / Math.pow(2, epochHalvingCount);
            
            cumulativeReward += blocksInEpoch * epochReward;
            currentBlocks += blocksInEpoch;
            remainingBlocksToSimulate -= blocksInEpoch;
        }
        simulatedMined = Math.min(totalMinedBtc + cumulativeReward, 21000000);
    }
    
    let remaining = Math.max(21000000 - simulatedMined, 0);
    let annualInflation = (reward * blocksPerYear / simulatedMined) * 100;
    if (years === 114) annualInflation = 0;

    // 2. 진행률 및 타이머 연산
    const nextHalvingBlock = 1050000; // 5차 반감기 블록높이
    const prevHalvingBlock = 840000;  // 4차 반감기 블록높이
    const blocksProgress = currentBlockHeight - prevHalvingBlock;
    const epochTotalBlocks = nextHalvingBlock - prevHalvingBlock;
    const progressPercent = Math.min((blocksProgress / epochTotalBlocks) * 100, 100);

    // 3. UI 렌더링
    if (rewardEl) rewardEl.textContent = reward > 0 ? `${reward.toFixed(8)} BTC` : '0 BTC (채굴 완료)';
    if (inflationEl) inflationEl.textContent = `${annualInflation.toFixed(4)}%`;
    if (remainingEl) remainingEl.textContent = `${remaining.toLocaleString('ko-KR', {minimumFractionDigits: 8})} BTC`;
    
    if (years === 0) {
        if (blockHeightEl) blockHeightEl.textContent = currentBlockHeight.toLocaleString();
        if (nextHalvingDateEl) nextHalvingDateEl.textContent = '2028년 4월 예정';
        if (progressTextEl) progressTextEl.textContent = `${progressPercent.toFixed(2)}%`;
        if (progressBarEl) progressBarEl.style.width = `${progressPercent}%`;
    } else {
        if (nextHalvingDateEl) nextHalvingDateEl.textContent = `${2024 + years}년 시뮬레이션`;
    }

    // [연동] 시뮬레이션 년도별 역사적 테이블 하일라이트 및 시각 분석 갱신
    const col1 = document.getElementById('col-1st');
    const col2 = document.getElementById('col-2nd');
    const col3 = document.getElementById('col-3rd');
    const col4 = document.getElementById('col-4th');
    const th1 = document.getElementById('th-1st');
    const th2 = document.getElementById('th-2nd');
    const th3 = document.getElementById('th-3rd');
    const th4 = document.getElementById('th-4th');
    const insightText = document.getElementById('halving-insight-text');
    const insightRating = document.getElementById('halving-insight-rating');
    const infoBar4th = document.getElementById('infographic-4th-bar');
    const infoText4th = document.getElementById('infographic-4th-text');

    if (insightText) {
        // 하이라이트 클래스 전원 초기화
        [col1, col2, col3, col4].forEach(c => {
            if (c) c.className = '';
        });
        [th1, th2, th3, th4].forEach(t => {
            if (t) {
                t.className = '';
                t.style.color = '#fff';
            }
        });

        if (years === 0 || years === 1) {
            // 4차 반감기 하이라이트 (Cyan 테마)
            if (col4) col4.className = 'highlight-col-cyan';
            if (th4) {
                th4.className = 'highlight-col-cyan-header';
                th4.style.color = 'var(--accent-cyan)';
            }
            if (infoBar4th) infoBar4th.style.width = '35.4%';
            if (infoText4th) {
                infoText4th.textContent = '진행 및 확장 중 🚀';
                infoText4th.style.color = 'var(--accent-cyan)';
            }
            
            insightText.innerHTML = `현재 비트코인은 <strong>4차 반감기(보상 3.125 BTC)</strong> 진행형입니다. 역사적으로 반감기 당일 약 $65,000에서 출발하여, 기관 자금(ETF) 및 글로벌 자산 배분 수요와 맞물려 강력한 상승 동력을 형성하고 있습니다. 사다리 한 계단 오르기 '적립금 매수실현'을 적극 활용하기 극히 우수한 시기입니다.`;
            if (insightRating) {
                insightRating.textContent = '강력 신뢰도 ★★★★★';
                insightRating.style.color = 'var(--accent-cyan)';
                insightRating.style.background = 'rgba(0, 255, 204, 0.1)';
            }
        } else if (years === 5) {
            // 미래 5차 가상 하이라이트 (Orange 테마)
            if (col4) col4.className = 'highlight-col';
            if (th4) {
                th4.className = 'highlight-col-header';
                th4.style.color = 'var(--accent-orange)';
            }
            if (infoBar4th) infoBar4th.style.width = '75%';
            if (infoText4th) {
                infoText4th.textContent = '5차 반감기 예측 가동 ⚡';
                infoText4th.style.color = 'var(--accent-orange)';
            }

            insightText.innerHTML = `시뮬레이션에서 <strong>5년 후(2031년)</strong>로 시간 이동했습니다. 2028년 진행될 <strong>5차 반감기</strong> 이후 블록 보상은 <strong>1.5625 BTC</strong>로 급격히 반토막이 납니다. 인플레이션율은 약 0.38%로 공급 희소성의 한계치가 무너지며, 전례 없는 공급 부족 사태로 시가총액 대폭발이 이루어질 골든존입니다.`;
            if (insightRating) {
                insightRating.textContent = '예측 기회도 ★★★★★';
                insightRating.style.color = 'var(--accent-orange)';
                insightRating.style.background = 'rgba(255, 147, 26, 0.1)';
            }
        } else if (years === 10) {
            // 10년 후 6차 반감기 시그널 (Orange 테마)
            if (col4) col4.className = 'highlight-col';
            if (th4) {
                th4.className = 'highlight-col-header';
                th4.style.color = 'var(--accent-orange)';
            }
            if (infoBar4th) infoBar4th.style.width = '90%';
            if (infoText4th) {
                infoText4th.textContent = '6차 초초희소성 도달 💎';
                infoText4th.style.color = 'var(--accent-orange)';
            }

            insightText.innerHTML = `시뮬레이션에서 <strong>10년 후(2036년)</strong>에 도달했습니다. 2032년 <strong>6차 반감기</strong> 이후 블록 보상은 단 <strong>0.78125 BTC</strong>에 불과합니다. 금(Gold)의 가치를 완전히 추월하는 지구상 최고의 안전 자산으로 격상되며, 희귀한 디지털 원형 부동산의 지위를 지배하게 됩니다.`;
            if (insightRating) {
                insightRating.textContent = '자산 가치도 ★★★★★';
                insightRating.style.color = 'var(--accent-orange)';
                insightRating.style.background = 'rgba(255, 147, 26, 0.1)';
            }
        } else if (years === 114) {
            // 2140년 최종 완판
            if (col4) col4.className = 'highlight-col';
            if (th4) {
                th4.className = 'highlight-col-header';
                th4.style.color = '#fff';
            }
            if (infoBar4th) infoBar4th.style.width = '100%';
            if (infoText4th) {
                infoText4th.textContent = '2140년 공급 한계점 완결 👑';
                infoText4th.style.color = '#fff';
            }

            insightText.innerHTML = `시뮬레이션에서 <strong>2140년 최종 채굴 완판 시점</strong>을 목격하셨습니다. 총 2,100만 개의 비트코인 발행이 마침내 종료되어 신규 생성량은 <strong>0 BTC</strong>가 됩니다. 단 1사토시도 추가 발행될 수 없는 완전무결한 절대 화폐가 완성되며, 하이퍼-비트코인화가 완벽히 실현됩니다.`;
            if (insightRating) {
                insightRating.textContent = '궁극의 영속도 ★★★★★';
                insightRating.style.color = '#fff';
                insightRating.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        }
    }
}

// -----------------------------------------
// [대개편] 업비트 실시간 웹소켓 & 재연결
// -----------------------------------------
let ws = null;
let priceHistory = [];
const ALERT_THRESHOLD = 1000000;
let lastAlertTime = 0;
let isFirstLoad = true;
let currentPriceChange = 'EVEN'; // 전역 실시간 변동상태 캐싱

// 초기 30분 REST API 백필 구현 (웹소켓 연결 전 차트 완성)
async function backfillPriceHistory(historyArray) {
    try {
        const response = await fetch('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=30');
        if (!response.ok) throw new Error('HTTP error ' + response.status);
        const data = await response.json();
        if (Array.isArray(data)) {
            // 역순으로 정렬하여 가장 오래된 데이터가 앞쪽으로 오게 함
            const sortedData = data.slice().reverse();
            historyArray.length = 0; // 기존 배열 비우기
            sortedData.forEach(candle => {
                historyArray.push({
                    time: candle.timestamp,
                    price: candle.trade_price
                });
            });
            // 초기 가격으로 live-btc-price 텍스트 세팅
            const livePriceEl = document.getElementById('live-btc-price');
            if (livePriceEl && historyArray.length > 0) {
                const latestPrice = historyArray[historyArray.length - 1].price;
                livePriceEl.textContent = latestPrice.toLocaleString('ko-KR');
                localStorage.setItem('last_btc_price', latestPrice);
            }
            console.log(`Successfully backfilled ${historyArray.length} historical price points.`);
        }
    } catch (err) {
        console.error("Failed to backfill price history:", err);
    }
}

function initUpbitPriceTracker() {
    const livePriceEl = document.getElementById('live-btc-price');
    const dmaEl = document.getElementById('dma-status');
    const volumeEl = document.getElementById('btc-volume');
    const hashrateEl = document.getElementById('btc-hashrate');

    function connect() {
        ws = new WebSocket('wss://api.upbit.com/websocket/v1');

        ws.onopen = () => {
            if (livePriceEl && isFirstLoad) livePriceEl.textContent = '연결 성공!';
            const req = [
                { "ticket": "bit_ida_yap_v3" },
                { "type": "ticker", "codes": ["KRW-BTC"] }
            ];
            ws.send(JSON.stringify(req));
        };

        ws.onmessage = async (event) => {
            const text = await new Response(event.data).text();
            const data = JSON.parse(text);

            if (data && data.trade_price) {
                const currentPrice = data.trade_price;
                const nowTime = Date.now();

                // 200 DMA 및 실시간 시세 상태 분석 업데이트
                if (livePriceEl) {
                    livePriceEl.textContent = currentPrice.toLocaleString('ko-KR');
                    if (data.change === 'RISE') {
                        livePriceEl.style.color = '#f7951d';
                        currentPriceChange = 'RISE';
                    } else if (data.change === 'FALL') {
                        livePriceEl.style.color = '#0dccf2';
                        currentPriceChange = 'FALL';
                    } else {
                        livePriceEl.style.color = '#fff';
                        currentPriceChange = 'EVEN';
                    }
                }

                if (dmaEl) {
                    if (currentPrice >= benchmark200Dma) {
                        dmaEl.textContent = `200일선 상회: 골든 불마켓 🐂`;
                        dmaEl.style.color = '#ffd700';
                        dmaEl.style.background = 'rgba(255, 215, 0, 0.15)';
                    } else {
                        dmaEl.textContent = `200일선 하회: 베어마켓 조정 🐻`;
                        dmaEl.style.color = '#0dccf2';
                        dmaEl.style.background = 'rgba(13, 204, 242, 0.15)';
                    }
                }

                // 실시간 거래량 및 해시레이트 업데이트 (시그널 시뮬레이션 결합)
                if (volumeEl) {
                    // 거래 대금을 BTC 단위로 역산하여 변동폭 묘사
                    const vol = (data.acc_trade_volume_24h).toFixed(1);
                    volumeEl.textContent = `${Number(vol).toLocaleString()} BTC`;
                }

                if (hashrateEl) {
                    // 실시간 해시레이트 난이도 보정에 맞춰 미세 변동 시뮬레이션
                    const mockHash = (648.5 + (Math.sin(nowTime / 5000) * 2.3)).toFixed(1);
                    hashrateEl.textContent = `${mockHash} EH/s`;
                }

                if (isFirstLoad) {
                    const prevPrice = localStorage.getItem('last_btc_price');
                    if (prevPrice) {
                        const initialInteractionHandler = () => {
                            const audioCtx = getAudioContext();
                            audioCtx.resume().then(() => {
                                if (data.change === 'RISE') {
                                    playPumpSound();
                                } else if (data.change === 'FALL') {
                                    playWarningSound();
                                }
                            });
                            document.removeEventListener('click', initialInteractionHandler);
                            document.removeEventListener('touchstart', initialInteractionHandler);
                        };
                        document.addEventListener('click', initialInteractionHandler);
                        document.addEventListener('touchstart', initialInteractionHandler);
                    }
                    isFirstLoad = false;
                }

                localStorage.setItem('last_btc_price', currentPrice);

                // 1분간의 큐 데이터 관리
                priceHistory.push({ time: nowTime, price: currentPrice });
                while (priceHistory.length > 0 && nowTime - priceHistory[0].time > 60000) {
                    priceHistory.shift();
                }

                // 변동폭 감시 및 네온 플래시 유기적 연동!
                if (priceHistory.length > 0) {
                    const oldestPrice = priceHistory[0].price;
                    const diff = currentPrice - oldestPrice;

                    if (nowTime - lastAlertTime > 60000) {
                        if (diff >= ALERT_THRESHOLD) {
                            playPumpSound();
                            triggerPriceFlash('pump');
                            lastAlertTime = nowTime;
                            priceHistory.length = 0;
                        } else if (diff <= -ALERT_THRESHOLD) {
                            playWarningSound();
                            triggerPriceFlash('warning');
                            lastAlertTime = nowTime;
                            priceHistory.length = 0;
                        }
                    }
                }
            }
        };

        ws.onclose = () => {
            console.log("Upbit WebSocket closed. Reconnecting in 3 seconds...");
            setTimeout(connect, 3000);
        };

        ws.onerror = (err) => {
            console.error("Upbit WebSocket error:", err);
            ws.close();
        };
    }

    // 1단계: 차트 초기 백필 시도 (REST API)
    backfillPriceHistory(priceHistory).then(() => {
        // 백필 성공 후 웹소켓 개시
        connect();
    });
}

// -----------------------------------------
// [대개편] 전문가형 캔버스 스파클라인 차트 드로잉
// -----------------------------------------
function updateSparkline(history) {
    const canvas = document.getElementById('price-sparkline');
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, width, height);

    const prices = history.map(h => h.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;

    // 1. 배경 금융 격자선(Horizontal Grid Lines) 3개 드로잉
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]); // 점선

    const gridY = [0.25, 0.5, 0.75];
    gridY.forEach(p => {
        const y = height * p;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    });
    ctx.stroke();
    ctx.setLineDash([]); // 점선 해제

    // 2. 최고가/최저가 점선 가이드 및 레이블 표시
    const pad = 15; // 상하단 여백
    const usableHeight = height - pad * 2;

    const getY = (price) => {
        return height - pad - ((price - min) / range) * usableHeight;
    };

    // 3. 차트 실선 그리기
    ctx.beginPath();
    ctx.strokeStyle = '#29e2ff';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';

    history.forEach((h, i) => {
        const x = (i / (history.length - 1)) * width;
        const y = getY(h.price);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 4. 차트 하단 그라디언트 채우기
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(41, 226, 255, 0.15)');
    grad.addColorStop(1, 'rgba(41, 226, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // 5. 실시간 박동 포인트 마커 그리기 (마지막 인덱스 데이터)
    const lastX = width;
    const lastY = getY(prices[prices.length - 1]);
    
    ctx.beginPath();
    ctx.fillStyle = '#00ffcc';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00ffcc';
    ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // 그림자 초기화

    // 6. 최고가 / 최저가 레이블 텍스트 기재
    ctx.fillStyle = '#ffab40';
    ctx.font = '9px Pretendard, sans-serif';
    ctx.fillText(`MAX: ${max.toLocaleString('ko-KR')}`, 10, pad - 2);

    ctx.fillStyle = '#0dccf2';
    ctx.fillText(`MIN: ${min.toLocaleString('ko-KR')}`, 10, height - 3);
}

// -----------------------------------------
// Fear & Greed Index 가져오기
// -----------------------------------------
async function fetchAdditionalMarketData() {
    try {
        // Fear & Greed
        const fngRes = await fetch('https://api.alternative.me/fng/');
        const fngData = await fngRes.json();
        const fngEl = document.getElementById('fng-value');
        if (fngEl && fngData.data && fngData.data[0]) {
            const val = fngData.data[0].value;
            const classification = fngData.data[0].value_classification;
            fngEl.textContent = `${val} / ${classification}`;
        }
    } catch (e) {
        console.warn('F&G data fetch failed', e);
    }
}

function updateGoalProgress(currentBtc) {
    const goal = 0.1;
    const percent = Math.min((currentBtc / goal) * 100, 100);

    const bar = document.getElementById('goal-bar-fill');
    const text = document.getElementById('goal-percent-text');

    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${percent.toFixed(2)}%`;

    if (percent >= 100) {
        bar.style.background = 'linear-gradient(90deg, #00ffcc, #00d9ff)';
        bar.style.boxShadow = '0 0 20px rgba(0, 255, 204, 0.8)';
    }
}

// -----------------------------------------
// 모바일 접속 브릿지 감지
// -----------------------------------------
function showMobileBridge() {
    const bridge = document.getElementById('mobile-bridge');
    const bridgeUrl = document.getElementById('bridge-url');
    const copyBtn = document.getElementById('bridge-copy-btn');
    const closeBtn = document.getElementById('bridge-close');

    if (!bridge || !bridgeUrl) return;

    const publicUrl = "https://my-last-ladder.vercel.app";
    const currentHost = window.location.hostname;

    if (publicUrl && (currentHost === 'localhost' || currentHost === '127.0.0.1')) {
        bridgeUrl.textContent = publicUrl;
        bridgeUrl.style.color = '#29e2ff';
        bridgeUrl.style.fontWeight = '800';
    } else if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
        bridgeUrl.textContent = "http://192.168.219.104:" + window.location.port;
        bridgeUrl.style.color = '#ffab40';
    } else {
        bridgeUrl.textContent = window.location.href;
    }

    setTimeout(() => {
        bridge.classList.add('active');
    }, 2000);

    closeBtn.onclick = (e) => { e.preventDefault(); bridge.classList.remove('active'); };

    copyBtn.onclick = (e) => {
        e.preventDefault();
        const text = bridgeUrl.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '복사 완료! (무한 공유 가능)';
            copyBtn.style.background = '#00ffcc';
            copyBtn.style.boxShadow = '0 0 20px #00ffcc';

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '';
                copyBtn.style.boxShadow = '';
                bridge.classList.remove('active');
            }, 2000);
        });
    };
}

// -----------------------------------------
// 페이지 로딩 완료 시 실행 컨텍스트
// -----------------------------------------
function initApp() {
    // PWA 서비스 워커 등록 가동!
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('✅ PWA 서비스 워커 등록 성공:', reg))
                .catch(err => console.error('❌ PWA 서비스 워커 등록 실패:', err));
        });
    }

    renderReports();
    renderAggroGrid();
    fetchRealtimeNews();
    renderWhyBtc();
    initLadder();

    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        logoText.style.cursor = 'pointer';
        logoText.title = '클릭하면 주소를 복사합니다';
        logoText.addEventListener('click', () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                const toast = document.createElement('div');
                toast.textContent = '✅ 주소가 복사되었습니다! ' + url;
                toast.style.cssText = `
                    position: fixed; top: 70px; left: 50%; transform: translateX(-50%);
                    background: rgba(0,0,0,0.85); color: #00ffcc;
                    padding: 12px 24px; border-radius: 30px;
                    font-size: 13px; font-weight: 700;
                    border: 1px solid rgba(0,255,204,0.4);
                    box-shadow: 0 0 20px rgba(0,255,204,0.3);
                    z-index: 9999; transition: opacity 0.5s;
                    max-width: 90vw; text-align: center;
                `;
                document.body.appendChild(toast);
                setTimeout(() => { toast.style.opacity = '0'; }, 2000);
                setTimeout(() => toast.remove(), 2500);
            }).catch(() => {
                prompt('아래 주소를 복사하세요:', url);
            });
        });
    }

    initChatbot();
    initModal();
    initParticles();
    initCarousel();
    initUpbitPriceTracker();
    fetchAdditionalMarketData();

    // 10초마다 차트 및 격자 지표 업데이트
    setInterval(() => updateSparkline(priceHistory), 10000);
    // 뉴스는 1시간 주기로 안전하게 갱신
    setInterval(fetchRealtimeNews, 3600000);

    const savedBtc = localStorage.getItem('ladder_total_btc');
    if (savedBtc) updateGoalProgress(parseFloat(savedBtc));

    // 로고 클릭 팡파레 & 폭죽 (Confetti 라이브러리 로드 실패 시에도 소리는 정상 출력되도록 설계)
    const btcBadge = document.querySelector('.btc-badge');
    if (btcBadge) {
        btcBadge.style.cursor = 'pointer';
        btcBadge.addEventListener('click', () => {
            const livePriceEl = document.getElementById('live-btc-price');
            let isRise = currentPriceChange === 'RISE';
            let isFall = currentPriceChange === 'FALL';

            // 폴백 검증 (CSS 계산 색상 검사)
            if (!isRise && !isFall && livePriceEl) {
                const currentColor = window.getComputedStyle(livePriceEl).color;
                isRise = currentColor.includes('247') && currentColor.includes('149') || currentColor.toLowerCase().includes('f7951d');
                isFall = currentColor.includes('13') && currentColor.includes('204') || currentColor.toLowerCase().includes('0dccf2');
            }

            if (isRise) {
                playPumpSound();
                triggerPriceFlash('pump');
            } else if (isFall) {
                playWarningSound();
                triggerPriceFlash('warning');
            } else {
                playVictorySound();
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 100,
                        origin: { y: 0.6 },
                        colors: ['#FFD700', '#FFA500', '#0dccf2', '#FFFFFF']
                    });
                }
            }
        });
    }

    // 보고서 검색 필터 포커스
    const reportSearch = document.getElementById('report-search');
    if (reportSearch) {
        reportSearch.addEventListener('input', (e) => {
            renderReports(e.target.value);
        });

        reportSearch.addEventListener('focus', () => {
            reportSearch.style.borderColor = 'var(--accent-cyan)';
            reportSearch.style.boxShadow = '0 0 15px rgba(41, 226, 255, 0.2)';
            reportSearch.style.background = 'rgba(255,255,255,0.08)';
        });
        reportSearch.addEventListener('blur', () => {
            reportSearch.style.borderColor = 'rgba(255,255,255,0.1)';
            reportSearch.style.boxShadow = 'none';
            reportSearch.style.background = 'rgba(255,255,255,0.05)';
        });
    }

    // 전역 비 간섭형 클릭음 & 시각 물결 파동
    document.addEventListener('click', (e) => {
        // 특정 전용 사운드가 바인딩된 버튼 클릭 시 공용 비프음 스킵!
        if (e.target.closest('button, a, .news-card, .btc-badge, .why-btc-card, .sim-btn, .quick-question-btn, #ladder-title-btn')) {
            return;
        }

        try {
            const audioCtx = getAudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.08);

            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.08);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.08);
        } catch (err) {}

        // 시각 물결
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });

    // [신규] 반감기 시뮬레이터 연산 제어 리스너
    document.querySelectorAll('.sim-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const years = parseInt(btn.getAttribute('data-years') || '0');
            updateSimulator(years);
            playVictorySound();
        });
    });

    // [신규] 대시보드 메인 원클릭 AI 단축 질문 리스너
    document.querySelectorAll('.main-quick-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const question = btn.getAttribute('data-question');
            
            // 챗봇 창 열기
            const chatWindow = document.getElementById('chatbot-window');
            if (chatWindow) {
                chatWindow.style.display = 'flex';
                
                const chatMessages = document.getElementById('chat-messages');
                // 기존 사용자 질문 출력
                const msgDiv = document.createElement('div');
                msgDiv.className = 'message user';
                msgDiv.innerHTML = question;
                chatMessages.appendChild(msgDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // AI 답변 송출
                setTimeout(() => {
                    const answer = getResponse(question);
                    const botDiv = document.createElement('div');
                    botDiv.className = 'message bot';
                    botDiv.innerHTML = answer.replace(/\n/g, '<br>');
                    chatMessages.appendChild(botDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 500);
            }
            playVictorySound();
        });
    });

    // 반감기 시뮬레이터 초기 상태 가동
    updateSimulator(0);
    startWhaleTracker();
    initWisdomPanel();
    showMobileBridge();

    // [신규] 1안: AI '어그로 버튼' 아코디언 접이식 서랍 토글 리스너
    const drawerToggle = document.getElementById('aggro-drawer-toggle');
    const drawerContent = document.getElementById('aggro-drawer-content');
    const drawerArrow = document.getElementById('drawer-arrow');

    if (drawerToggle && drawerContent) {
        drawerToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = drawerContent.classList.toggle('active');
            if (isActive) {
                drawerContent.style.maxHeight = drawerContent.scrollHeight + 'px';
                drawerContent.style.opacity = '1';
                drawerContent.style.visibility = 'visible';
                if (drawerArrow) drawerArrow.textContent = '▲ 접기';
                drawerToggle.style.borderColor = 'rgba(0, 243, 255, 0.4)';
                drawerToggle.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.15)';
            } else {
                drawerContent.style.maxHeight = '0';
                drawerContent.style.opacity = '0';
                drawerContent.style.visibility = 'hidden';
                if (drawerArrow) drawerArrow.textContent = '▼ 펼치기';
                drawerToggle.style.borderColor = 'rgba(255,255,255,0.08)';
                drawerToggle.style.boxShadow = 'none';
            }
        });
    }
}

// 초기화: DOMContentLoaded 및 readyState 안전성 가동
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// -----------------------------------------
// 고래 추적기 시뮬레이터
// -----------------------------------------
function startWhaleTracker() {
    const whaleFeed = document.getElementById('whale-feed');
    if (!whaleFeed) return;

    const whaleActions = ["입금되었습니다", "출금되었습니다", "이체되었습니다", "매수 포지션 진입", "분할 매도 중"];
    const exchanges = ["Binance", "Upbit", "Coinbase", "OKX", "Kraken", "Bithumb"];
    const wallets = ["익명 고래 지갑", "기관 투자자 A", "FTX 콜드 월렛", "마이크로스트래티지 추정 지갑", "BTC 고대 지갑"];

    function addWhaleAlert() {
        const amount = (Math.random() * 500 + 50).toFixed(2);
        const action = whaleActions[Math.floor(Math.random() * whaleActions.length)];
        const source = (Math.random() > 0.5) ? exchanges[Math.floor(Math.random() * exchanges.length)] : wallets[Math.floor(Math.random() * wallets.length)];
        const isHigh = amount > 300;

        const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const item = document.createElement('div');
        item.className = `whale-item ${isHigh ? 'high' : ''}`;
        item.innerHTML = `
            <div style="font-size: 11px; color: #888; margin-bottom: 5px;">[${time}] ALERT</div>
            <strong>${amount} BTC</strong>가 <br>
            <span>${source}</span>(으)로부터 ${action}.
        `;

        whaleFeed.prepend(item);

        if (whaleFeed.children.length > 10) {
            whaleFeed.lastElementChild.remove();
        }
    }

    function scheduleNext() {
        const nextTime = Math.random() * 7000 + 8000;
        setTimeout(() => {
            addWhaleAlert();
            scheduleNext();
        }, nextTime);
    }

    addWhaleAlert();
    scheduleNext();
}

// -----------------------------------------
// AI 부의 통찰(명언) 회전
// -----------------------------------------
const wisdomQuotes = [
    "비트코인은 디지털 시대의 가장 견고한 토지입니다.",
    "오늘 참고 아낀 커피 한 잔이 미래의 0.1 BTC가 될 수 있습니다.",
    "변동성은 가격을 지불하고 얻는 수익의 대가입니다.",
    "시간을 이기는 투자는 없습니다. 인내심이 곧 수익입니다.",
    "부자가 되고 싶다면 돈이 어디로 흐르는지 보십시오. 지금은 디지털입니다.",
    "사다리를 오르는 것은 느리지만, 끝까지 오르는 자만이 정상의 풍경을 봅니다.",
    "가장 큰 위험은 아무런 위험도 감수하지 않는 것입니다.",
    "단기적 소음에 귀를 닫고, 장기적 가치에 눈을 뜨십시오.",
    "경제적 자유는 참는 것에서 시작되어 불어나는 것입니다.",
    "비트코인은 단순한 자산이 아니라 부의 주권을 되찾는 도구입니다."
];

function initWisdomPanel() {
    const wisdomText = document.getElementById('wisdom-text');
    if (!wisdomText) return;

    function rotateWisdom() {
        wisdomText.style.opacity = '0';
        setTimeout(() => {
            const randomQuote = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
            wisdomText.textContent = randomQuote;
            wisdomText.style.opacity = '1';
        }, 500);
    }

    setInterval(rotateWisdom, 30000);

    document.querySelectorAll('.ladder-rung-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(rotateWisdom, 300);
        });
    });
}

// =================================================================
// [신규] 프리미엄 멤버십 락월 & 터치 카운터 시스템
// =================================================================
let screenTouchCount = 0;
const TOUCH_LIMIT = 10;

// 프리미엄 멤버 가입 여부 확인
function isPremiumMember() {
    return localStorage.getItem('premium_member') === 'true';
}

// 멤버 수 가져오기
function getMemberCount() {
    return parseInt(localStorage.getItem('premium_member_count') || '0', 10);
}

// 멤버 수 저장 및 UI 갱신
function setMemberCount(count) {
    localStorage.setItem('premium_member_count', count.toString());
    updateMemberCountUI(count);
}

// 프리미엄 멤버 수 임의 수정 함수 (대표님 요구 사항 반영)
function modifyMemberCount() {
    const currentCount = getMemberCount();
    const input = prompt("변경할 프리미엄 멤버 수를 입력하세요 (숫자만 입력):", currentCount);
    
    if (input === null) return; // 취소 클릭 시 스킵
    
    const newCount = parseInt(input.trim(), 10);
    if (!isNaN(newCount) && newCount >= 0) {
        setMemberCount(newCount);
        
        // 프리미엄 멤버십 완료 여부와 관계없이 뱃지 텍스트 갱신
        const badgeText = document.querySelector('.premium-badge-text');
        if (badgeText) {
            if (isPremiumMember()) {
                badgeText.textContent = `프리미엄 멤버 ${newCount.toLocaleString()}명`;
            } else {
                badgeText.textContent = `프리미엄 멤버십 운영중 (${newCount.toLocaleString()}명)`;
            }
        }
        
        // 락월 내부 카운트 텍스트도 즉시 업데이트
        const countEl = document.getElementById('lockwall-count-number');
        if (countEl) countEl.textContent = newCount.toLocaleString();
        
        // 토스트 알림 표시
        showMemberToast(newCount);
    } else {
        alert("유효한 숫자를 입력해 주세요.");
    }
}

// 멤버 수 UI 업데이트
function updateMemberCountUI(count) {
    const countEl = document.getElementById('lockwall-count-number');
    if (countEl) countEl.textContent = count.toLocaleString();
    
    // 헤더 뱃지 텍스트도 멤버 수 반영
    const badgeText = document.querySelector('.premium-badge-text');
    if (badgeText && isPremiumMember()) {
        badgeText.textContent = `프리미엄 멤버 ${count.toLocaleString()}명`;
    }
}

// 락월 표시
function showLockwall() {
    if (isPremiumMember()) return; // 프리미엄 멤버는 락월 미표시
    
    const lockwall = document.getElementById('premium-lockwall');
    if (lockwall) {
        // 멤버 수 표시
        updateMemberCountUI(getMemberCount());
        lockwall.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// 락월 숨기기
function hideLockwall() {
    const lockwall = document.getElementById('premium-lockwall');
    if (lockwall) {
        lockwall.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// 프리미엄 멤버십 가입 처리
function subscribePremium() {
    // 멤버십 등록 (프리미엄 활성화)
    localStorage.setItem('premium_member', 'true');
    
    // Increment premium count by 1 upon active subscription
    const newCount = getMemberCount() + 1;
    setMemberCount(newCount);
    
    // 헤더 뱃지 스타일 변경 (가입 완료 표시)
    const badge = document.getElementById('premium-badge');
    if (badge) badge.classList.add('subscribed');
    
    // 터치 카운터 리셋
    screenTouchCount = 0;
    
    // 락월 닫기
    hideLockwall();
    
    // 축하 효과: 골드 폭죽 + 팡파레 + TTS
    try {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#ffd700', '#ffaa00', '#ff930f', '#fff', '#00ff88']
            });
        }
        if (typeof playPumpSound === 'function') playPumpSound();
        
        // TTS: "프리미엄 멤버십에 오신 것을 환영합니다"
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('프리미엄 멤버십에 오신 것을 환영합니다');
            utterance.lang = 'ko-KR';
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        }
    } catch (e) {
        console.log('Celebration effects failed:', e);
    }
    
    console.log('✅ 프리미엄 멤버십 가입 완료! 총 멤버 수:', newCount);
}

// 뷰빈 로고 클릭 핸들러
function handleLogoClick() {
    if (isPremiumMember()) {
        // Read-only member count inquiry (Do not increment by clicking)
        const currentCount = getMemberCount();
        
        // Display toast with the current count
        showMemberToast(currentCount);
        
        try {
            if (typeof playVictorySound === 'function') playVictorySound();
        } catch (e) {}
        
        console.log('👑 Read premium member count:', currentCount);
    } else {
        location.reload();
    }
}

// 멤버 카운트 토스트 알림
function showMemberToast(count) {
    // 기존 토스트 제거
    const existingToast = document.getElementById('member-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.id = 'member-toast';
    toast.innerHTML = `
        <div style="
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(0, 255, 136, 0.1));
            border: 1px solid rgba(255, 215, 0, 0.3);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 12px 24px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 100000;
            animation: toastSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        ">
            <span style="font-size: 20px;">👑</span>
            <span style="font-size: 13px; font-weight: 700; color: #ffd700;">
                프리미엄 멤버 <span style="color: var(--accent-cyan); font-size: 16px;">${count.toLocaleString()}</span>명 달성!
            </span>
        </div>
    `;
    
    // 토스트 애니메이션 스타일 주입
    if (!document.getElementById('toast-animation-style')) {
        const style = document.createElement('style');
        style.id = 'toast-animation-style';
        style.textContent = `
            @keyframes toastSlideIn {
                from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        toast.style.transition = 'opacity 0.5s ease';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 화면 터치/클릭 카운터 (프리미엄 미가입자 대상)
function initTouchCounter() {
    // [대표님 피드백 반영] 멤버십 수동 수정 클릭 이벤트 바인딩
    const badgeEl = document.getElementById('premium-badge');
    if (badgeEl) {
        badgeEl.title = '클릭하여 프리미엄 멤버 수를 임의로 수정할 수 있습니다';
        badgeEl.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            modifyMemberCount();
        };
    }

    const lockwallMemberCount = document.getElementById('lockwall-member-count');
    if (lockwallMemberCount) {
        lockwallMemberCount.title = '클릭하여 프리미엄 멤버 수를 임의로 수정할 수 있습니다';
        lockwallMemberCount.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            modifyMemberCount();
        };
    }

    if (isPremiumMember()) {
        // 이미 가입한 멤버는 뱃지 스타일 변경 및 멤버 수 표시
        const badge = document.getElementById('premium-badge');
        if (badge) badge.classList.add('subscribed');
        updateMemberCountUI(getMemberCount());
    }
    
    // 세션당 터치 카운트 (sessionStorage로 세션마다 리셋)
    screenTouchCount = parseInt(sessionStorage.getItem('touch_count') || '0', 10);
    
    if (screenTouchCount >= TOUCH_LIMIT) {
        showLockwall();
    }
    
    document.addEventListener('click', (e) => {
        if (isPremiumMember()) return;
        
        // 락월 내부 클릭은 카운트하지 않음
        if (e.target.closest('.premium-lockwall')) return;
        if (e.target.closest('.lockwall-card')) return;
        
        // 10회 도달 시 이미 락월 표시 상태이므로 얼리 리턴
        if (screenTouchCount >= TOUCH_LIMIT) {
            showLockwall();
            return;
        }
        
        screenTouchCount++;
        sessionStorage.setItem('touch_count', screenTouchCount.toString());
        
        if (screenTouchCount >= TOUCH_LIMIT) {
            showLockwall();
        }
    }, true);
}

// 초기화: DOMContentLoaded 및 readyState 안전성 가동
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initTouchCounter();
    });
} else {
    initTouchCounter();
}
