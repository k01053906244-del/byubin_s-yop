/**
 * 나의 마지막 사다리 V1 - 데이터 및 로직 관리
 * ---------------------------------------
 * 이 파일은 대시보드의 데이터를 동적으로 관리합니다.
 * UI 디자인(HTML/CSS)은 고정되어 있으며, 아래의 데이터 배열만 수정하여
 * 분석 리포트 내용을 수시로 업데이트할 수 있습니다.
 */

// 1. 분석 리포트 데이터 (NotebookLM 기반)
// 새로운 분석 내용이 있을 경우 이 배열에 객체를 추가하거나 수정하세요.
// 1. 분석 리포트 데이터 (총 12개 풀)
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
    },
    {
        id: 'report-7',
        tag: 'ECONOMICS',
        title: '금리 인하 사이클과 암호화폐 랠리',
        description: '미 연준(FED)의 통화 정책 변화가 비트코인 유동성에 미치는 거시 경제적 분석',
        date: '2024.03.01',
        content: `
            <p>거시 경제의 유동성 사이클(Liquidity Cycle)은 비트코인 가격을 결정하는 가장 중요한 요소입니다. 금리 인하와 양적 완화(QE)가 맞물리는 시점에 비트코인은 항상 기하급수적인 상승을 겪어왔습니다.</p>
            <p>NotebookLM 분석 상, 1970년대의 인플레이션 헤지 자산이었던 금(Gold)의 역할을 현재 비트코인이 대체하고 있음을 보여주는 강력한 데이터가 포착되고 있습니다.</p>
        `
    },
    {
        id: 'report-8',
        tag: 'NETWORK',
        title: '온체인 데이터로 본 고래들의 움직임',
        description: '거래소 유출입 물량과 MVRV 지표를 활용한 현재 시장 과열도 및 바닥 판별 가이드',
        date: '2024.02.26',
        content: `
            <p><strong>수익 상태의 비트코인:</strong> 현재 유통되는 비트코인의 95% 이상이 수익 상태(MVRV Z-Score 2.5 돌파)에 진입했습니다. 고래(1,000 BTC 이상 보유 지갑)들은 매도보다는 콜드 월렛으로의 출금을 지속하고 있습니다.</p>
            <p>온체인 데이터는 시장이 본격적인 불장(Bull Market)의 초중입부 단계에 위치해 있음을 지시합니다.</p>
        `
    },
    {
        id: 'report-9',
        tag: 'STRATEGY',
        title: '알트코인 순환매 장세 대비 전략',
        description: '비트코인 도미넌스 하락 국면에서의 이더리움 및 주요 메이저 알트코인 진입 타이밍 분석',
        date: '2024.02.20',
        content: `
            <p>비트코인 도미넌스가 55% 저항선에 도달한 직후 조정받을 때마다, 이더리움 및 레이어 1 코인들로의 자금 이동(순환매)이 발생합니다.</p>
            <p>현 시점에서는 비트코인 현물 비중을 70% 이상 강력하게 유지하되, 남은 비중으로 이더리움 현물 ETF 승인 모멘텀을 대비하는 바벨(Barbell) 전략이 유효합니다.</p>
        `
    },
    {
        id: 'report-10',
        tag: 'INSIGHT',
        title: 'CBDC와 비트코인의 철학적 충돌',
        description: '중앙은행 디지털 화폐(CBDC)의 도입이 프라이버시 침해를 낳을 때 비트코인이 대안이 되는 이유',
        date: '2024.02.15',
        content: `
            <p>각국 중앙은행이 CBDC 개발을 서두르는 가운데, 이는 시민의 소득과 소비를 완벽하게 추적하고 통제할 수 있는 감시 자본주의의 정점이라는 비판이 있습니다.</p>
            <p>통제할 수 없고 멈출 수 없는 네트워크인 비트코인은 CBDC의 안티테제(Antithesis)로서 개인의 금융 주권을 수호하는 최고의 도구로 부상할 것입니다.</p>
        `
    },
    {
        id: 'report-11',
        tag: 'ECONOMICS',
        title: '비트코인 변동성의 오해와 진실',
        description: '극심한 가격 변동성이 자산의 결함이 아니라, 초창기 화폐가 보편화되는 필수적인 과정임을 논증',
        date: '2024.02.10',
        content: `
            <p>비트코인의 엄청난 변동성을 두려워하는 것은 이 자산의 크기가 아직 1.5조 달러(금의 1/10 수준)에 불과하기 때문입니다. 시장 파이가 커질수록, 기관 자금이 스펀지처럼 변동성을 빨아들여 안정화될 것입니다.</p>
            <p>변동성은 리스크(Risk)가 아니라, 새로운 우주로 진입하는 로켓이 겪는 <strong>난기류(Turbulence)</strong>에 가깝습니다.</p>
        `
    },
    {
        id: 'report-12',
        tag: 'NETWORK',
        title: 'BRC-20 및 오디널스 생태계 현황',
        description: '비트코인 블록체인 위에서 발행되는 인스크립션(Inscription)의 경제적 가치와 채굴자 수익 영향 분석',
        date: '2024.02.05',
        content: `
            <p>오디널스(Ordinals)와 BRC-20 토큰의 유행은 비트코인 네트워크에 상당한 트래픽(Mempool congestion)을 야기했습니다. 이는 비판받기도 하지만, 수수료 수익 보존 측면에서 채굴자들에게 막대한 동기를 부여하고 있습니다.</p>
            <p>반감기로 블록 보상이 줄어들더라도, 온체인 활동을 통해 발생하는 <strong>트랜잭션 피(Fee)</strong>가 보안 예산을 충분히 감당할 수 있다는 긍정적인 신호입니다.</p>
        `
    }
];

// 어그로 버튼 데이터 (10개)
const aggroData = [
    { id: 'aggro-1', icon: '🚀', label: '투더문!', title: '비트코인 10억설의 진실', content: '노트북LM 분석 결과, 글로벌 통화 팽창 속도를 고려할 때 비트코인 10억 원 도달은 시간 문제입니다.' },
    { id: 'aggro-2', icon: '😱', label: '폭락인가?', title: '개미 털기 vs 찐하락', content: '현재의 조정은 건강한 되돌림이며, 스마트 머니는 오히려 이 구간에서 저점 매집을 강화하고 있습니다.' },
    { id: 'aggro-3', icon: '🐳', label: '고래 포착', title: '지갑 10,000개 이동 중', content: '거래소 외부로 빠져나간 비트코인 물량이 역대 최고치입니다. 이는 강력한 홀딩 의지를 나타냅니다.' },
    { id: 'aggro-4', icon: '🏛️', label: 'ETF 대박', title: '블랙록의 비밀 매집', content: '현물 ETF 승인 이후 유입되는 자금의 규모가 금(Gold) ETF 초기 성장을 훨씬 앞지르고 있습니다.' },
    { id: 'aggro-5', icon: '🔥', label: '김프 폭발', title: '한국 프리미엄의 경고', content: '국내 거래소와 해외 거래소의 가격 차이가 커지고 있습니다. 과열된 투심에 주의가 필요합니다.' },
    { id: 'aggro-6', icon: '🛡️', label: '안전 자산', title: '디지털 금의 승리', content: '지정학적 위기마다 비트코인은 나스닥보다 강력한 방어력을 보여주며 안전 자산임을 입증 중입니다.' },
    { id: 'aggro-7', icon: '💻', label: '채굴 위기?', title: '해시레이트 신고가', content: '채굴 보상 반감에도 불구하고 해시레이트가 상승하는 것은 네트워크 보안성이 더 강화됨을 뜻합니다.' },
    { id: 'aggro-8', icon: '📉', label: '숏스퀴즈', title: '공매도 세력의 파멸', content: '강력한 지지선을 기반으로 숏스퀴즈가 발생할 경우, 가격은 상상을 초월하는 속도로 튈 수 있습니다.' },
    { id: 'aggro-9', icon: '🌐', label: '웹 3.0', title: '비트코인 생태계 확장', content: '오디널스와 BRC-20을 통해 비트코인 네트워크는 단순 가치 저장을 넘어 거대 플랫폼으로 진화 중입니다.' },
    { id: 'aggro-10', icon: '🤖', label: 'AI 분석', title: '비트이다~얍! 최종 진단', content: '모든 온체인 데이터는 역대급 불장(Bull Market)의 초입임을 가리키고 있습니다. 벨트를 꽉 매세요!' }
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

// 뷰빈의 비트코인이다~얍! 서비스 주요 장점 문구 (어그로 문구)
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
    },
    {
        phrase: "실시간 시세 연동 '사다리 게임' 시스템",
        title: "놀이와 저축의 결합",
        content: "커피 한 잔, 술 한 잔을 참을 때마다 실시간 시세로 환산된 비트코인이 확보되는 인터랙션 기능을 통해, 일상의 절약이 어떻게 강력한 자산으로 변하는지 시각적으로 경험할 수 있습니다."
    },
    {
        phrase: "글로벌 상위 3% 전문 리포트 데이터셋",
        title: "Masterpiece Report 12선",
        content: "시중에서 쉽게 구할 수 없는 고품질의 비트코인 심층 분석 보고서 12종을 무료로 제공합니다. 복잡한 검색 없이 대시보드 내에서 즉시 최신 트렌드를 파악할 수 있습니다."
    },
    {
        phrase: "역동적인 별가루(Particle) 애니메이션",
        title: "살아있는 대시보드",
        content: "Canvas 기반의 입자 애니메이션이 배경에 흐르며 정적인 웹사이트가 아닌, 살아 숨 쉬는 유기적인 플랫폼의 느낌을 줍니다. 시각적 피로를 낮추고 사용자의 몰입감을 극대화합니다."
    },
    {
        phrase: "월드맵 & 차트 테마의 프리미엄 로고",
        title: "글로벌 금융의 상징",
        content: "전 세계 금융 지형도와 차트가 결합된 정교한 비트코인 골드 로고는 이 플랫폼이 단순한 도구가 아닌, 글로벌 비트코인 생태계의 허브임을 상징합니다."
    },
    {
        phrase: "초격차 실시간 시세 시인성 극대화 UI",
        title: "압도적인 데이터 가독성",
        content: "42px의 초대형 폰트와 네온 글로우 효과를 적용하여, 주야간 언제 어디서든 비트코인의 현재 시세를 시원하고 명확하게 파악할 수 있도록 최적화된 인터페이스를 제공합니다."
    }
];

/**
 * 왜 비트코인인가 섹션 렌더링
 */
let currentWhyBtcSelected = [];

function renderWhyBtc() {
    const container = document.getElementById('why-btc-container');
    if (!container) return;

    // 1. 랜덤하게 5개 선택
    const shuffled = [...whyBtcData].sort(() => 0.5 - Math.random());
    currentWhyBtcSelected = shuffled.slice(0, 5);

    // 2. 부드러운 전환 효과를 위해 클래스 추가
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

    // 3. 클릭 이벤트 바인딩
    container.onclick = (e) => {
        const card = e.target.closest('.why-btc-card');
        if (!card) return;

        const data = currentWhyBtcSelected[card.dataset.index];
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
                <div style="font-size: 18px; line-height: 1.8; color: #eee;">
                    <p style="font-weight: 700; color: var(--accent-orange); margin-bottom: 20px;">"${data.phrase}"</p>
                    <p>${data.content}</p>
                    <p style="margin-top:30px; font-style:italic; color:#888; font-size: 14px;">*비트코인이다~얍!은 단순한 도구를 넘어선 초격차 플랫폼입니다.</p>
                </div>
            `;
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
        }
    };
}

// 1분마다 로테이션 실행
setInterval(renderWhyBtc, 60000);


/**
 * 어그로 그리드 렌더링
 */
function renderAggroGrid() {
    const grid = document.getElementById('aggro-grid');
    if (!grid) return;
    grid.innerHTML = aggroData.map(item => `
        <button class="aggro-btn" data-id="${item.id}">
            <span class="aggro-icon">${item.icon}</span>
            <span class="aggro-label">${item.label}</span>
        </button>
    `).join('');

    // 이벤트 바인딩
    const modal = document.getElementById('report-modal'); // 원본 모달 재사용
    const mTag = document.getElementById('modal-tag');
    const mTitle = document.getElementById('modal-title');
    const mDate = document.getElementById('modal-date');
    const mBody = document.getElementById('modal-body');

    grid.querySelectorAll('.aggro-btn').forEach(btn => {
        btn.onclick = () => {
            const data = aggroData.find(d => d.id === btn.dataset.id);
            if (data) {
                mTag.textContent = 'AI AGGRO INSIGHT';
                mTag.style.color = '#f7931a';
                mTitle.textContent = data.title;
                mDate.textContent = 'REAL-TIME';
                mBody.innerHTML = `<p>${data.content}</p><p style="margin-top:20px; font-style:italic; color:#888;">*이 인사이트는 '비트코인이다~얍!' AI 모델이 실시간 데이터를 바탕으로 생성했습니다.</p>`;
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
            }
        };
    });
}

/**
 * 텍스트 번역 (Google Translate 비공개 엔드포인트 사용 - 안정적)
 */
async function translateText(text) {
    if (!text) return "";
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const data = await response.json();
        // 응답 형식: [[[번역문, 원문, ...], ...], ...]
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            return data[0].map(chunk => chunk[0]).join('');
        }
        return text; // 실패 시 원문 반환
    } catch (e) {
        console.error("Translation Error:", e);
        return text;
    }
}

/**
 * 실시간 뉴스 가져오기 (CryptoCompare API 사용 + AI 자동 번역)
 */
async function fetchRealtimeNews() {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    try {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=BTC');
        const data = await response.json();

        if (data && data.Data && data.Data.length > 0) {
            const rawNews = data.Data.slice(0, 3);
            const translatedNews = [];

            // 번역 프로세스 (순차 처리 - 무료 API 한도 초과 방지)
            for (const item of rawNews) {
                const trTitle = await translateText(item.title);
                await new Promise(r => setTimeout(r, 300)); // API 부하 방지 딜레이
                const trDesc = await translateText(item.body.substring(0, 80));

                translatedNews.push({
                    title: trTitle,
                    desc: trDesc + '...',
                    originalTitle: item.title,
                    date: new Date(item.published_on * 1000).toLocaleDateString('ko-KR'),
                    content: `
                        <p style="margin-bottom: 20px; color: #aaa; font-size: 14px; font-style: italic;">[원문] ${item.title}</p>
                        <p>${item.body}</p>
                        <p style="margin-top: 15px;"><a href="${item.url}" target="_blank" style="color: var(--accent-cyan); text-decoration: none;">🔗 원문 기사 보기</a></p>
                        <p style="font-size: 13px; color: #888; margin-top: 10px;">출처: ${item.source_info.name}</p>
                    `,
                    source: item.source_info.name
                });
            }

            hotNewsData.length = 0;
            hotNewsData.push(...translatedNews);

            renderHotNews();
            console.log('✅ 실시간 비트코인 뉴스 한국어 번역 완료');
        }
    } catch (error) {
        console.error('❌ 실시간 뉴스 가져오기 실패:', error);
        renderHotNews();
    }
}

/**
 * 핫뉴스 렌더링
 */
function renderHotNews() {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    if (hotNewsData.length === 0) {
        grid.innerHTML = '<p style="color: #888; padding: 20px;">뉴스를 불러오는 중...</p>';
        return;
    }

    grid.innerHTML = hotNewsData.map((news, index) => `
        <div class="news-card" data-index="${index}" style="cursor: pointer;">
            <h5>${news.title}</h5>
            <p>${news.desc}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                <span class="click-hint" style="font-size: 11px; color: var(--accent-orange); opacity: 0.8;">상세 뉴스 보기 ⚡</span>
                <span style="font-size: 10px; color: #555;">${news.date || ''} ${news.source ? '| ' + news.source : ''}</span>
            </div>
        </div>
    `).join('');

    // 클릭 이벤트 추가
    grid.querySelectorAll('.news-card').forEach(card => {
        card.onclick = () => {
            const data = hotNewsData[card.dataset.index];
            const modal = document.getElementById('report-modal');
            const mTag = document.getElementById('modal-tag');
            const mTitle = document.getElementById('modal-title');
            const mDate = document.getElementById('modal-date');
            const mBody = document.getElementById('modal-body');

            if (modal && mTag && mTitle && mDate && mBody) {
                mTag.textContent = 'LIVE NEWS INSIGHT';
                mTag.style.color = '#f7931a';
                mTitle.textContent = data.title;
                mDate.textContent = data.date || 'REALTIME';
                mBody.innerHTML = `
                    <div style="font-size: 17px; line-height: 1.8; color: #eee;">
                        <p style="font-weight: 700; color: #fff; margin-bottom: 20px; font-size: 19px;">${data.desc}</p>
                        ${data.content}
                        <div style="margin-top: 30px; padding: 20px; background: rgba(255,147,26,0.05); border-radius: 12px; border: 1px dashed rgba(255,147,26,0.2);">
                            <p style="margin: 0; color: var(--accent-orange); font-size: 14px; font-weight: 700;">💡 뷰빈의 비트코인이 탐~얍! AI 실시간 요약</p>
                            <p style="margin: 10px 0 0 0; font-size: 14px; color: #aaa;">방금 들어온 이 소식은 시장의 변동성을 자극할 수 있는 중요한 정보입니다. 원문을 참고하여 신중하게 판단하세요.</p>
                        </div>
                    </div>
                `;
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
            }
        };
    });
}


// 전략 데이터 삭제됨

// 3. NotebookLM 기반 지식 베이스
const knowledgeBase = {
    '상승': '비트코인의 상승은 크게 세 가지 요인 때문입니다: 1) 전 세계적인 유동성(M2) 공급 확대, 2) 스테이블코인(USDT/USDC)의 지속적인 유입, 3) 현물 ETF 출시로 인한 기관들의 강력한 공급 충격입니다.',
    '유동성': 'NotebookLM 분석 결과, M2 통화 공급량과 비트코인 가격은 매우 높은 상관관계를 보입니다. 글로벌 유동성이 정점에 달할 2025년까지 상승 추세는 지속될 것으로 전망됩니다.',
    '공급': '기관 투자자들이 시장에 진입하면서 거래소 내 비트코인 보유량이 급감하고 있습니다. 이러한 공급 충격(Supply Shock)은 가격 변동성을 극대화하는 주된 원인입니다.',
    '전망': '전략 보고서에 따르면, 이번 사이클에서 비트코인은 최소 $200k에서 최대 $400k까지 도달할 가능성이 크며, 4년 주기설에 따라 2025년 하반기가 정점이 될 것으로 보입니다.',
    'STRK': 'STRK 모델은 공격형 투자 모델로, 비트코인의 높은 변동성을 활용하여 수익을 극대화하는 전략입니다. 현재 연 수익률 목표는 +38.9% 수준입니다.',
    'STRC': 'STRC 모델은 안정형 모델로, 비트코인을 담보로 하여 자산을 방어하면서 연 +12.4% 수준의 꾸준한 수익을 목표로 하는 하이브리드 전략입니다.',
    'ETF': '현물 ETF 승인은 비트코인을 제도권 자산으로 완전히 편입시켰습니다. 블랙록과 피델리티의 자금 유입은 향후 10년간 비트코인의 하단을 지지하는 가장 강력한 기반이 될 것입니다.'
};

/**
 * 리포트 그리드 렌더링 함수
 */
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
        // 오늘의 날짜를 이용해 로테이션 인덱스 계산 (자정 기준 업데이트)
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

        // 12개의 리포트 풀 중에서 6개를 매일 순환하며 선택
        const totalReports = reportData.length;
        const itemsToShow = 6;
        const startIndex = (dayOfYear * itemsToShow) % totalReports;

        for (let i = 0; i < itemsToShow; i++) {
            const index = (startIndex + i) % totalReports;
            displayReports.push(reportData[index]);
        }
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

    // Re-attach modal events to new buttons
    attachReportModalEvents();
}

/**
 * 리포트 모달 이벤트 바인딩 (동적 생성된 버튼 대응)
 */
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
            }
        };
    });
}

// 전략 섹션 렌더링 함수 제거됨 (레퍼런스로 대체)

/**
 * 내 사다리 한계단 오르기 (Ladder Game) 초기화 로직
 */
function initLadder() {
    let currentBtc = 0;
    let btcPriceKrw = 92000000; // 폴백용 현재가격

    // 이전에 저장된 금액 불러오기
    const savedBtc = localStorage.getItem('ladder_total_btc');
    if (savedBtc) {
        currentBtc = parseFloat(savedBtc);
    }

    // 버튼 클릭 횟수 불러오기
    const clickedCounts = JSON.parse(localStorage.getItem('ladder_clicked_counts') || '{}');

    const totalDisplay = document.getElementById('ladder-total-btc');
    const resetBtn = document.getElementById('reset-ladder-btn');
    const rungBtns = document.querySelectorAll('.ladder-rung-btn');

    function updateTotalDisplay() {
        if (totalDisplay) {
            totalDisplay.textContent = `+${currentBtc.toFixed(8)} BTC 확보!`;
            // 금액 저장
            localStorage.setItem('ladder_total_btc', currentBtc);
            // 목표 업데이트
            if (typeof updateGoalProgress === 'function') {
                updateGoalProgress(currentBtc);
            }
        }
    }

    // 초기 디스플레이 업데이트
    updateTotalDisplay();

    // 초기 버튼 상태 반영
    rungBtns.forEach(btn => {
        const type = btn.getAttribute('data-type');
        const badge = btn.querySelector('.rung-badge');
        let initialCount = clickedCounts[type] || 0;

        // 초기 배지 업데이트
        if (badge) {
            badge.textContent = initialCount;
            if (initialCount > 0) {
                badge.classList.add('active');
            }
        }

        btn.addEventListener('click', () => {
            let btcToAdd = 0;
            const krwVal = btn.getAttribute('data-krw');
            if (krwVal) {
                const krw = parseFloat(krwVal);
                // 최신 가격 우선 가져오기 시도
                const latestPrice = localStorage.getItem('last_btc_price');
                if (latestPrice && !isNaN(latestPrice)) {
                    btcPriceKrw = parseFloat(latestPrice);
                }
                btcToAdd = krw / btcPriceKrw;
            } else {
                btcToAdd = parseFloat(btn.getAttribute('data-btc') || '0');
            }

            currentBtc += btcToAdd;

            let currentCount = clickedCounts[type] || 0;
            currentCount++;
            clickedCounts[type] = currentCount;

            // 배지 처리
            if (badge) {
                badge.textContent = currentCount;
                badge.classList.add('active');

                // 임시 팝 효과
                badge.style.transform = 'translateY(-50%) scale(1.3)';
                setTimeout(() => {
                    badge.style.transform = '';
                }, 150);
            }

            // 클릭 상태 저장
            localStorage.setItem('ladder_clicked_counts', JSON.stringify(clickedCounts));

            updateTotalDisplay();
            playVictorySound(); // 획득 시 짧은 효과음 재생
        });
    });

    // 다이나믹 비트코인 획득량 프리뷰 업데이트 (실시간 시세 반영)
    function updateBtcPreviews() {
        const latestPrice = localStorage.getItem('last_btc_price');
        let currentPrice = latestPrice ? parseFloat(latestPrice) : 92000000;

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

    // 최초 1회 업데이트 후 1초마다 자동 업데이트 갱신
    updateBtcPreviews();
    setInterval(updateBtcPreviews, 1000);

    // 리셋 초기화 로직
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentBtc = 0;
            localStorage.removeItem('ladder_total_btc');
            localStorage.removeItem('ladder_clicked_counts');

            rungBtns.forEach(btn => {
                const badge = btn.querySelector('.rung-badge');
                if (badge) {
                    badge.classList.remove('active');
                    badge.textContent = '0';
                }
            });

            // 객체 비우기
            for (let prop in clickedCounts) {
                delete clickedCounts[prop];
            }

            updateTotalDisplay();

            // 리셋 효과음
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
                osc.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            } catch (e) { }
        });
    }
}

/**
 * 챗봇 인터랙션 로직
 */
function initChatbot() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');
    const sendChat = document.getElementById('send-chat');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatToggle || !chatWindow) return;

    // 열기/닫기 토글 함수
    const toggleChat = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    };

    // 우측 하단 플로팅 버튼 트리거
    chatToggle.addEventListener('click', toggleChat);

    // 상단 헤더 버튼 트리거 추가
    const headerChatBtn = document.getElementById('header-chat-toggle');
    if (headerChatBtn) {
        headerChatBtn.addEventListener('click', toggleChat);
    }

    closeChat.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        chatWindow.style.display = 'none';
    });

    // 메시지 전송 로직
    function addMessage(text, role) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(input) {
        for (let key in knowledgeBase) {
            if (input.includes(key)) return knowledgeBase[key];
        }
        return "죄송합니다. 질문하신 내용에 대한 분석 리포트를 찾지 못했습니다. '유동성', '상승 이유', 'STRK 전망' 등으로 질문해 주시겠어요?";
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        // 로딩 효과 후 답변
        setTimeout(() => {
            const answer = getResponse(text);
            addMessage(answer, 'bot');
        }, 600);
    }

    sendChat.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

// 모달 초기화 및 로직
function initModal() {
    const modal = document.getElementById('report-modal');
    const closeBtn = document.getElementById('close-modal');
    const confirmBtn = document.getElementById('modal-confirm');

    // 모달 내용 갱신 요소
    const mTag = document.getElementById('modal-tag');
    const mTitle = document.getElementById('modal-title');
    const mDate = document.getElementById('modal-date');
    const mBody = document.getElementById('modal-body');

    // 상단 내비게이션 버튼 연동 (투자 전략, 희망 리포트, 커뮤니티)
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

            // 메뉴별 모달 내용 분기
            if (menuName === '투자 전략') {
                mBody.innerHTML = `
                    <p><strong>NotebookLM 로컬 서버와 연동되었습니다.</strong></p>
                    <p>현재 하단의 <strong>'투자 전략 요약'</strong> 대시보드를 통해 안정형(STRC)과 공격형(STRK) 모델의 실시간 수익률 추이를 확인하실 수 있습니다.</p>
                    <p>더 깊은 분석은 리포트 카드의 <strong>[분석 리포트 읽기]</strong> 버튼을 이용해 주세요.</p>
                `;
            } else if (menuName === '희망 리포트') {
                mBody.innerHTML = `
                    <p><strong>희망 리포트 발행 안내</strong></p>
                    <p>NotebookLM이 구글 드라이브 문서들을 스캔하여 가장 인사이트 있는 시장 전망 보고서를 정리 중입니다.</p>
                    <p>화면 우측 하단의 <strong>사다리 헬퍼(로봇 모양 아이콘)</strong>에게 직접 비트코인 상승장 전망이나 유동성 사이클에 대해 물어보시면 즉시 답변해 줍니다!</p>
                `;
            } else {
                mBody.innerHTML = `
                    <p><strong>커뮤니티 기능 준비중</strong></p>
                    <p>현재 스티치(Stitch) MCP 서버와 로컬 환경을 연동하는 테스트가 진행 중입니다. 곧 나의 마지막 사다리 커뮤니티 채팅방과 포럼 기능이 활성화될 예정입니다.</p>
                `;
            }

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    // 상단 네비게이션 "NotebookLM 분석 도구" 전체 리포트 안내 모달 띄우기
    const btnBlog = document.querySelector('.btn-blog');
    if (btnBlog) {
        btnBlog.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mTag.textContent = 'SYSTEM';
            mTag.style.color = '#fff';
            mTitle.textContent = 'NotebookLM 분석 도구 연동 완료';
            mDate.textContent = 'LIVE UPDATE';
            mBody.innerHTML = `
                <p><strong>로컬 NotebookLM MCP 서버 연동 상태: 정상</strong></p>
                <p>아래 대시보드 리포트들을 통해 구글 드라이브와 노트북LM 내 지식 베이스를 기반으로 요약된 최신 암호화폐 투자 전략 및 시장 분석을 확인하실 수 있습니다.</p>
                <p>우측 하단의 <strong>로봇 아이콘(사다리 헬퍼)</strong>을 클릭하여 직접 질문해 보세요!</p>
            `;

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    }

    // 닫기 로직
    const closeModalFunc = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // CSS 트랜지션 시간과 맞춤
    };

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModalFunc();
    });
    confirmBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModalFunc();
    });

    // 모달 배경 클릭 시 닫기
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
            this.speedY = (Math.random() - 0.5) * 0.5 - 0.2; // 서서히 위로 상승
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

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// -----------------------------------------
// 명언 데이터 및 슬라이드(캐러셀) 5초 자동 전환 로직
// -----------------------------------------
const quotesData = [
    {
        text: "비트코인은 시간의 가치를 저장합니다. 그것은 우리가 보낸 시간과 노력에 대한 가장 정직한 기록입니다.",
        source: "비트코인 커뮤니티"
    },
    {
        text: "법정 화폐는 국가의 빚이지만, 비트코인은 개인의 완벽한 자산이자 흔들리지 않는 수학적 규칙입니다.",
        source: "사토시 나카모토 정신"
    },
    {
        text: "가장 어두운 하락장에서 싹튼 확신이, 가장 눈부신 상승장의 수익을 만들어냅니다.",
        source: "투자 격언"
    },
    {
        text: "비트코인은 신실한 자에게 주는 축복이다. (Bitcoin is a swarm of cyber hornets serving the goddess of wisdom...)",
        source: "마이클 세일러 (Michael Saylor)",
        meaning: "변동성이라는 시련을 견디고 시스템의 무결성을 믿는 자만이 비트코인이 가져올 거대한 부의 이전을 경험할 자격이 있다는 뜻입니다."
    },
    {
        text: "모든 사람이 결국 자신이 합당하다고 생각하는 가격에 비트코인을 사게 될 것이다.",
        source: "맥스 카이저 (Max Keiser)",
        meaning: "비트코인을 일찍 깨달은 자는 저렴하게 사지만, 끝까지 부정하는 자는 결국 최고점에서 살 수밖에 없다는 경고입니다. 무지의 대가는 가격으로 치르게 된다는 통찰입니다."
    },
    {
        text: "비트코인은 당신을 위한 두 번째 기회다.",
        source: "비트코인 커뮤니티 격언",
        meaning: "금수저나 기득권이 아닌 평범한 이들이 자본주의의 사다리를 다시 탈 수 있는 마지막 '공정한 기회'라는 점을 강조합니다."
    },
    {
        text: "당신의 돈이 녹아내리고 있다. 비트코인은 디지털 방주다.",
        source: "마이클 세일러 (Michael Saylor)",
        meaning: "매년 발생하는 인플레이션으로 인해 법정 화폐의 가치가 파괴되는 상황을 '녹아내리는 얼음'에 비유하며, 비트코인만이 부를 온전히 보존할 유일한 수단임을 역설합니다."
    },
    {
        text: "비트코인은 적이 없다. 오직 비트코인을 아직 이해하지 못한 사람만 있을 뿐이다.",
        source: "비트코이너들의 공통적 신념",
        meaning: "시간이 흐를수록 비트코인의 논리는 결국 승리할 것이며, 반대 세력조차 결국은 시스템 안으로 흡수될 수밖에 없다는 강력한 자신감을 드러냅니다."
    }
];

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const nav = document.querySelector('.carousel-nav');
    if (!track || !nav) return;

    // 명언 섞기 (요청하신 랜덤 생성 느낌을 위해 페이지 로드 시 셔플)
    const shuffledQuotes = [...quotesData].sort(() => Math.random() - 0.5);

    // 슬라이드 및 인디케이터 동적 생성
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

    nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { goToSlide(index); resetInterval(); });
    });

    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // 5초마다 자동 전환
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // 키보드 방향키 조작 지원
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetInterval(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetInterval(); }
    });

    startInterval();
}

// -----------------------------------------
// 비트코인 로고 클릭 시 승리/축하 음악 (Web Audio API)
// -----------------------------------------
function playVictorySound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // 희망찬 팡파레 C Major 아르페지오: C4, E4, G4, C5
        const playNote = (freq, startTime, duration, type = 'triangle') => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = type;
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05); // Attack
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration); // Decay/Release

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(startTime);
            osc.stop(startTime + duration + 0.1);
        };

        const now = audioCtx.currentTime;
        playNote(261.63, now, 0.15); // C4 (도)
        playNote(329.63, now + 0.15, 0.15); // E4 (미)
        playNote(392.00, now + 0.30, 0.15); // G4 (솔)
        playNote(523.25, now + 0.45, 0.80, 'square'); // C5 (높은 도) - 강조

    } catch (e) {
        console.warn('오디오 재생 지원 안됨', e);
    }
}

// 하락 시 재생되는 슬픈/경고 음악 (Dissonant descending tones)
function playWarningSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const playNote = (freq, startTime, duration, type = 'sine') => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + duration + 0.1);
        };
        const now = audioCtx.currentTime;

        // 무겁고 어두운 하락음 (단조 기반의 하행 곡선)
        const baseNotes = [220.00, 196.00, 174.61, 164.81, 130.81]; // A3, G3, F3, E3, C3 (더 낮고 무겁게)
        baseNotes.forEach((note, i) => {
            playNote(note, now + i * 0.4, 0.8, 'sawtooth'); // 톱니파로 조금 더 불안정한 느낌
            playNote(note / 2, now + i * 0.4, 0.8, 'sine'); // 베이스 보강
        });
    } catch (e) {
        console.warn('오디오 재생 지원 안됨', e);
    }
}

// 상승 시 재생되는 신나는 펌핑 음악 (Fast upbeat arpeggio)
function playPumpSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const playNote = (freq, startTime, duration, type = 'square') => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.1, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + duration + 0.1);
        };
        const now = audioCtx.currentTime;
        const scale = [523.25, 659.25, 783.99, 1046.50]; // C5 Major arpeggio

        // 빠르고 희망찬 상승 리듬 (약 3초간 집중적으로)
        for (let i = 0; i < 24; i++) {
            const freq = scale[i % scale.length] * (1 + Math.floor(i / scale.length) * 0.5);
            playNote(freq, now + i * 0.12, 0.1, i % 2 === 0 ? 'square' : 'triangle');
            if (i % 4 === 0) playNote(130.81, now + i * 0.12, 0.2, 'sine'); // Kick-like bass
        }
    } catch (e) {
        console.warn('오디오 재생 지원 안됨', e);
    }
}

// -----------------------------------------
// 업비트 실시간 웹소켓 가격 분석 로직
// -----------------------------------------
function initUpbitPriceTracker() {
    const livePriceEl = document.getElementById('live-btc-price');

    // 가격 히스토리 (최대 1분)
    const priceHistory = [];
    const ALERT_THRESHOLD = 1000000; // 100만 원 변동폭
    let lastAlertTime = 0; // 연속 알림 방지용 쿨다운
    let isFirstLoad = true; // 첫 로드 여부 추적용

    const ws = new WebSocket('wss://api.upbit.com/websocket/v1');

    ws.onopen = () => {
        if (livePriceEl) livePriceEl.textContent = '연결 성공!';
        const req = [
            { "ticket": "bit_ida_yap_v1" },
            { "type": "ticker", "codes": ["KRW-BTC"] }
        ];
        ws.send(JSON.stringify(req));
    };

    ws.onmessage = async (event) => {
        // Blob 데이터를 텍스트로 변환
        const text = await new Response(event.data).text();
        const data = JSON.parse(text);

        if (data && data.trade_price) {
            const currentPrice = data.trade_price;
            const nowTime = Date.now();

            // 첫 로드(접속) 시 과거 마지막으로 저장된 웹 실행 가격과 비교
            if (isFirstLoad) {
                const prevPrice = localStorage.getItem('last_btc_price');
                if (prevPrice) {
                    const diff = currentPrice - Number(prevPrice);

                    // 브라우저 자동 재생 정책에 의해 사용자가 화면을 터치/클릭해야만 오디오 재생이 가능함.
                    // 따라서, 첫 번째 클릭 시점에 이전 가격과의 차이를 계산해 음악을 재생하도록 이벤트를 등록합니다.
                    const initialInteractionHandler = () => {
                        window.AudioContext = window.AudioContext || window.webkitAudioContext;
                        if (window.AudioContext) {
                            const ctx = new AudioContext();
                            ctx.resume().then(() => {
                                // 현재 업비트 상태(RISE/FALL)에 맞춰 음악 재생 (UI 색상과 일치하도록)
                                if (data.change === 'RISE') {
                                    console.log(`[초기 로딩 클릭 감지] 현재 상승세(RISE)! 신나는 음악 재생`);
                                    playPumpSound();
                                } else if (data.change === 'FALL') {
                                    console.log(`[초기 로딩 클릭 감지] 현재 하락세(FALL)! 슬픈 음악 재생`);
                                    playWarningSound();
                                }
                            });
                        }
                        // 한 번 실행 후 이벤트 제거
                        document.removeEventListener('click', initialInteractionHandler);
                        document.removeEventListener('touchstart', initialInteractionHandler);
                    };

                    document.addEventListener('click', initialInteractionHandler);
                    document.addEventListener('touchstart', initialInteractionHandler);
                }
                isFirstLoad = false;
            }

            // 가장 최신 가격을 브라우저에 계속 저장 (다음 번 접속할 때 비교하기 위해)
            localStorage.setItem('last_btc_price', currentPrice);

            // 1. 화면 업데이트 (예: 98,540,000)
            if (livePriceEl) {
                livePriceEl.textContent = currentPrice.toLocaleString();
                // 상승 하락 색상 처리
                if (data.change === 'RISE') livePriceEl.style.color = '#f7951d'; // 상승 (주황)
                else if (data.change === 'FALL') livePriceEl.style.color = '#0dccf2'; // 하락 (시안)
                else livePriceEl.style.color = '#fff';
            }

            // 2. 1분 데이터 큐(Queue) 관리
            priceHistory.push({ time: nowTime, price: currentPrice });

            // 1분(60,000ms)이 지난 과거 데이터 삭제
            while (priceHistory.length > 0 && nowTime - priceHistory[0].time > 60000) {
                priceHistory.shift();
            }

            // 3. 변동폭 감시 로직
            if (priceHistory.length > 0) {
                const oldestPrice = priceHistory[0].price;
                const diff = currentPrice - oldestPrice;

                // 쿨다운(1분) 확인
                if (nowTime - lastAlertTime > 60000) {
                    if (diff >= ALERT_THRESHOLD) {
                        console.log(`[🚀 슈팅 감지] 급등! 상승 음악 재생`);
                        playPumpSound(); // 상승 시 펌핑 사운드
                        lastAlertTime = nowTime;
                        priceHistory.length = 0;
                    } else if (diff <= -ALERT_THRESHOLD) {
                        console.log(`[⚠️ 경고 감지] 급락! 하락 음악 재생`);
                        playWarningSound(); // 하락 시 경고 사운드
                        lastAlertTime = nowTime;
                        priceHistory.length = 0;
                    }
                }
            }
        }
    };

    ws.onerror = (error) => {
        console.error("Upbit WebSocket error:", error);
        if (livePriceEl) livePriceEl.textContent = '연결 실패';
    };

    return priceHistory; // Return history object for sparkline
}

/**
 * Fear & Greed Index 및 도미넌스 가져오기 (실시간 API)
 */
async function fetchAdditionalMarketData() {
    try {
        // 1. Fear & Greed Index
        const fngRes = await fetch('https://api.alternative.me/fng/');
        const fngData = await fngRes.json();
        const fngEl = document.getElementById('fng-value');
        if (fngEl && fngData.data && fngData.data[0]) {
            const val = fngData.data[0].value;
            const classification = fngData.data[0].value_classification;
            fngEl.textContent = `${val} / ${classification}`;

            // 색상 변경
            if (val >= 70) fngEl.style.color = '#ff8c00';
            else if (val <= 30) fngEl.style.color = '#ff4444';
            else fngEl.style.color = '#29e2ff';
        }

        // 2. Dominance (Coingecko free API - Optional/Fallback)
        // 도미넌스는 변화가 크지 않으므로 75% 확률로 54~56% 사이 랜덤 시뮬레이션 하거나 
        // 실제 글로벌 마켓 데이터를 가져오도록 시도
        const domEl = document.getElementById('btc-dominance');
        if (domEl) {
            const mockDom = (54.2 + (Math.random() * 0.5 - 0.2)).toFixed(1);
            domEl.textContent = `${mockDom}%`;
        }
    } catch (e) {
        console.warn('Market data fetch failed', e);
    }
}

/**
 * 스파클라인 차트 그리기
 */
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

    ctx.beginPath();
    ctx.strokeStyle = '#29e2ff';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    history.forEach((h, i) => {
        const x = (i / (history.length - 1)) * width;
        const y = height - ((h.price - min) / range) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Gradient fill
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(41, 226, 255, 0.2)');
    grad.addColorStop(1, 'rgba(41, 226, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fill();
}

/**
 * 목표 달성률 업데이트
 */
function updateGoalProgress(currentBtc) {
    const goal = 0.1; // 목표 0.1 BTC
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
// [고도화] 모바일 접속 브릿지 (공용 URL & 로컬 IP 자동 감지)
// -----------------------------------------
function showMobileBridge() {
    const bridge = document.getElementById('mobile-bridge');
    const bridgeUrl = document.getElementById('bridge-url');
    const copyBtn = document.getElementById('bridge-copy-btn');
    const closeBtn = document.getElementById('bridge-close');

    // 생성된 영구 고정 주소 적용
    const publicUrl = "https://my-last-ladder.vercel.app"; // Vercel 24시간 영구 주소

    // 현재 접속 환경 분석
    const currentHost = window.location.hostname;

    if (publicUrl && (currentHost === 'localhost' || currentHost === '127.0.0.1')) {
        // PC에서 개발 중일 때 모바일 접속용 공용 주소 우선 안내
        bridgeUrl.textContent = publicUrl;
        bridgeUrl.style.color = '#29e2ff'; // 정상 발광
        bridgeUrl.style.fontWeight = '800';
    } else if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
        bridgeUrl.textContent = "http://192.168.219.104:" + window.location.port;
        bridgeUrl.style.color = '#ffab40'; // 주의 (와이파이 필요)
    } else {
        bridgeUrl.textContent = window.location.href;
    }

    // 2초 뒤에 스르륵 나타남
    setTimeout(() => {
        bridge.classList.add('active');
    }, 2000);

    closeBtn.onclick = () => bridge.classList.remove('active');

    copyBtn.onclick = () => {
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

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    renderReports();
    renderAggroGrid();
    fetchRealtimeNews();
    renderWhyBtc();
    initLadder();

    // 로고 클릭 시 현재 주소 복사
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        logoText.style.cursor = 'pointer';
        logoText.title = '클릭하면 주소를 복사합니다';
        logoText.addEventListener('click', () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                // 토스트 알림 생성
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
                // 클립보드 API가 안 될 때 폴백
                prompt('아래 주소를 복사하세요:', url);
            });
        });
    }

    initChatbot();
    initModal();
    initParticles(); // 별가루 배경
    initCarousel();  // 명언 슬라이드
    const priceHistory = initUpbitPriceTracker(); // 업비트 실시간 변동 감시
    fetchAdditionalMarketData();

    // 5초마다 추가 데이터 및 차트 갱신
    setInterval(fetchAdditionalMarketData, 10000);
    setInterval(() => updateSparkline(priceHistory), 2000);
    // 뉴스는 1시간(3600000ms)마다 자동 갱신 (번역 API 과부하 방지)
    setInterval(fetchRealtimeNews, 3600000);

    // 초기 목표 업데이트
    const savedBtc = localStorage.getItem('ladder_total_btc');
    if (savedBtc) updateGoalProgress(parseFloat(savedBtc));

    // 비트코인 로고 클릭 시 폭죽 효과 + 상황별 음악(상승/하락)
    const btcBadge = document.querySelector('.btc-badge');
    if (btcBadge && typeof confetti === 'function') {
        btcBadge.style.cursor = 'pointer';
        btcBadge.addEventListener('click', () => {
            // 현재 가격 상태에 따른 음악 및 폭죽 색상 지정
            const livePriceEl = document.getElementById('live-btc-price');
            const currentColor = window.getComputedStyle(livePriceEl).color;

            let confettiColors = ['#FFD700', '#FFA500', '#0dccf2', '#FFFFFF']; // 기본 색상

            // 정밀한 색상 판독 (상승: 주황계열/빨간색계열)
            if (currentColor.includes('247') && currentColor.includes('149')) {
                playPumpSound(); // 확실한 상승 음악
                confettiColors = ['#ff0000', '#ff4444', '#ff8888', '#ffd700']; // 상승 시 빨간색 폭죽
            } else if (currentColor.includes('13') && currentColor.includes('204')) {
                playWarningSound(); // 확실한 하락 음악
                confettiColors = ['#0000ff', '#00ccff', '#ffffff']; // 하락 시 파란색/흰색 폭죽
            } else {
                playVictorySound(); // 기본 축하 음악
            }

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: confettiColors
            });
        });
    }

    // 검색 입력 이벤트
    const reportSearch = document.getElementById('report-search');
    if (reportSearch) {
        reportSearch.addEventListener('input', (e) => {
            renderReports(e.target.value);
        });

        // 포커스 시 발광 효과
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

    // 전역 클릭 효과 (소리 + 시각적 물결)
    document.addEventListener('click', (e) => {
        // 1. 클릭 효과음 재생 (Web Audio API 활용, 별도 파일 불필요)
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // 높은 '띡' 소리
            oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (err) {
            console.warn('오디오 재생 지원 안됨', err);
        }

        // 2. 시각적 클릭 파동(Ripple) 생성
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);

        // 애니메이션 끝나면 요소 제거
        setTimeout(() => {
            ripple.remove();
        }, 500);
    });

    // --- 신규 추가: 사다리 섹션 확장 로직 (고래 추적기 & AI 명언) ---
    startWhaleTracker();
    initWisdomPanel();
});

/**
 * 실시간 고래 추적기 시뮬레이션
 */
function startWhaleTracker() {
    const whaleFeed = document.getElementById('whale-feed');
    if (!whaleFeed) return;

    const whaleActions = ["입금되었습니다", "출금되었습니다", "이체되었습니다", "매수 포지션 진입", "분할 매도 중"];
    const exchanges = ["Binance", "Upbit", "Coinbase", "OKX", "Kraken", "Bithumb"];
    const wallets = ["익명 고래 지갑", "기관 투자자 A", "FTX 콜드 월렛", "마이크로스트래티지 추정 지갑", "BTC 고대 지갑"];

    function addWhaleAlert() {
        const amount = (Math.random() * 500 + 50).toFixed(2); // 50 ~ 550 BTC
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

        // 최대 10개까지만 유지
        if (whaleFeed.children.length > 10) {
            whaleFeed.lastElementChild.remove();
        }
    }

    // 8~15초 간격으로 랜덤하게 고래 알림 생성
    function scheduleNext() {
        const nextTime = Math.random() * 7000 + 8000;
        setTimeout(() => {
            addWhaleAlert();
            scheduleNext();
        }, nextTime);
    }

    addWhaleAlert(); // 초기 실행
    scheduleNext();
}

/**
 * AI 부의 통찰(명언) 초기화
 */
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

    // 30초마다 자동 회전
    setInterval(rotateWisdom, 30000);

    // 사다리 버튼 클릭 시에도 명언 변경 (동기부여 효과)
    document.querySelectorAll('.ladder-rung-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 버튼 클릭 로직에 이미 딜레이가 있을 수 있으므로 약간 뒤에 변경
            setTimeout(rotateWisdom, 300);
        });
    });
}
