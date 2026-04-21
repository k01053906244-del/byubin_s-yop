/**
 * 통합 운행 무결성 엔진 (Unified Operator Integrity Engine - v2.0)
 * 가변적인 기사 명부 및 범용 배차표 분석 지원
 */

class IntegrityEngine {
    constructor(masterData) {
        this.masterData = masterData;
        this.rules = {
            maxConsecutiveDays: 6,
            similarNames: [
                ['박노종', '박재홍'],
                ['이영철', '박영철'],
                ['권기수', '이기수']
            ],
            recognition: {
                AM: 2, // 2회 = 1일
                PM_NORMAL: 3, // 일반 오후 3회 = 1일
                PM_2STORY: { weekday: 2, holiday: 3 } // 2층버스 오후: 평2/휴3 = 1일
            }
        };
        // For debugging
        window.activeEngine = this;
    }

    /**
     * 밴드 텍스트 지능형 파싱 로직 (Robust Name-Based Parser)
     * - 마스터 데이터에 있는 성함을 우선적으로 찾음
     * - 띄어쓰기나 컬럼 형식을 유연하게 대응
     * - 명부에 없는 인물은 무시
     */
    parseBandText(text, referenceDate = new Date()) {
        const results = [];
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        
        // 날짜 및 월 식별용 패턴 (더욱 강화)
        const monthHeaderRegex = /(\d{1,2})\s*월\s*(?:배차|근무|운행|스케줄|현황|표|관리|스케쥴)/i; 
        const monthOnlyRegex = /^\s*(\d{1,2})\s*월\s*$/; // "5월" 만 있는 행 대응
        const dateTagRegex = /(?:\[|\b)(\d{4}[-./]\d{2}[-./]\d{2})(?:\]|\b)/; 
        const fullDateRegex = /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/; // "2024년 5월 1일"
        // 일자 패턴: "1일", "1일 (수)", "1/수", "1.수", "1-수", "1/일" 등 지원 (더 유연하게)
        const dayOnlyRegex = /(?:^|\s)(\d{1,2})\s*(?:일\s*(?:\([월화수목금토일]\))?|[\/.\-][월화수목금토일]?)(?:\s|$)/; 
        
        let year = referenceDate.getFullYear();
        let month = referenceDate.getMonth() + 1;
        let lastDayMatched = 0;
        let currentDate = '';

        console.log(`[엔진] 분석 시작 (기준: ${year}-${month}), 텍스트 길이: ${text.length}`);

        // 0. 전역 월 헤더 우선 탐색 (여러 형식 지원)
        const globalMonthMatch = text.match(monthHeaderRegex);
        if (globalMonthMatch) {
            month = parseInt(globalMonthMatch[1]);
            console.log(`[엔진] 헤더 감지 -> ${month}월로 설정`);
        } else {
            const simpleMonthMatch = text.match(monthOnlyRegex);
            if (simpleMonthMatch) {
                month = parseInt(simpleMonthMatch[1]);
                console.log(`[엔진] 단순 월 텍스트 감지 -> ${month}월`);
            } else {
                const firstLine = lines[0] || "";
                const firstLineMonth = firstLine.match(/^(\d{1,2})\s*월/);
                if (firstLineMonth) {
                    month = parseInt(firstLineMonth[1]);
                    console.log(`[엔진] 첫 줄 월 감지 -> ${month}월`);
                } else {
                    console.log(`[엔진] 명확한 월 헤더 없음. 기준 월 사용: ${month}월`);
                }
            }
        }

        lines.forEach((line, lineIdx) => {
            // 1. "X월" 단독 행 확인
            const mOnlyMatch = line.match(monthOnlyRegex);
            const mHeaderMatch = line.match(monthHeaderRegex);
            if (mOnlyMatch || mHeaderMatch) {
                month = parseInt((mOnlyMatch || mHeaderMatch)[1]);
                console.log(`[엔진] 라인(${lineIdx}) 내 월 감지 -> ${month}월`);
                return;
            }

            // 2. 구체적인 날짜 태그 확인 [2024-04-01]
            const dateMatch = line.match(dateTagRegex);
            const fullMatch = line.match(fullDateRegex);
            
            if (dateMatch || fullMatch) {
                if (dateMatch) {
                    currentDate = dateMatch[1].replace(/[./]/g, '-');
                } else {
                    currentDate = `${fullMatch[1]}-${fullMatch[2].padStart(2, '0')}-${fullMatch[3].padStart(2, '0')}`;
                }

                const parsed = new Date(currentDate);
                if (!isNaN(parsed.getTime())) {
                    year = parsed.getFullYear();
                    month = parsed.getMonth() + 1;
                    lastDayMatched = parsed.getDate();
                }
                console.log(`[엔진] 날짜 태그 감지 -> ${currentDate}`);
            } else {
                // 3. "1일" 또는 "1/수" 형식 확인
                const dayMatch = line.match(dayOnlyRegex);
                if (dayMatch) {
                    const day = parseInt(dayMatch[1]);
                    
                    // [지능형 롤오버] 이전 날짜보다 작아지면 (예: 31일 다음 1일) 월 가산
                    if (lastDayMatched > 0 && lastDayMatched > 22 && day < 10) {
                        month++;
                        if (month > 12) {
                            month = 1;
                            year++;
                        }
                        console.log(`[엔진] 월 롤오버 감지 (${lastDayMatched}일 -> ${day}일) -> ${year}년 ${month}월`);
                    }
                    
                    lastDayMatched = day;
                    currentDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    console.log(`[엔진] 날짜 설정 (${lineIdx}): ${currentDate}`);
                }
            }

            // 추가: "[2026-04-23 (목) ...]" 같은 복합 포맷 대응 (currentDate가 아직 없을 때)
            if (!currentDate) {
                const altMatch = line.match(/(\d{4})[-./](\d{1,2})[-./](\d{1,2})/);
                if (altMatch) {
                    currentDate = `${altMatch[1]}-${altMatch[2].padStart(2, '0')}-${altMatch[3].padStart(2, '0')}`;
                    lastDayMatched = parseInt(altMatch[3]);
                }
            }

            if (!currentDate) return;

            // 3. 컬럼형(오전 오후 차량) 또는 인라인형 분석
            // 명부에 있는 모든 이름을 순회하며 현재 라인에 있는지 확인
            this.masterData.forEach(member => {
                const name = member.name;
                // 이름 앞뒤에 숫자나 기호가 붙어 있어도 찾을 수 있도록 함 (예: 1차신조)
                if (line.includes(name)) {
                    // 위치와 주변 키워드로 근무 형태(AM/PM) 판별
                    let status = 'AM'; // 기본값
                    
                    // 문맥 분석: '오전','오후' 헤더가 있는 라인 이후의 위치나 키워드 확인
                    // 대표님 예시처럼 "이름 이름 차량" 순서면 첫번째가 오전, 두번째가 오후
                    const tokens = line.split(/\s+/).filter(t => t.length > 0);
                    const nameIdx = tokens.findIndex(t => t.includes(name));
                    
                    if (nameIdx === 0) status = 'AM';
                    else if (nameIdx === 1) status = 'PM';
                    
                    // 차량번호 추출 (라인 내 4자리 숫자)
                    const vehicleMatch = line.match(/\b\d{4}\b/);
                    const vehicle = vehicleMatch ? vehicleMatch[0] : '';
                    
                    // [전처리] 요일 계산
                    const dayOfWeek = new Date(currentDate).toLocaleDateString('ko-KR', { weekday: 'short' });

                    const validation = this.validateEntry(member.member_id, name, currentDate, vehicle, status);
                    
                    results.push({
                        date: currentDate,
                        day_of_week: dayOfWeek, // 전처리: 요일
                        sequence: lineIdx + 1,  // 전처리: 순번
                        member_id: member.member_id,
                        name: name,
                        status: status,
                        vehicle: vehicle,
                        fixed_off: member.fixed_off,      // 전처리: 고정휴무
                        fixed_vehicle: member.fixed_vehicle, // 전처리: 고정차량
                        ...validation
                    });
                }
            });
        });

        // 중복 처리 로직 개선: 
        // 한 명의 기사가 동일한 날짜에 두 번(AM/PM) 나타나면 'ALL'(종일)로 통합하거나 기록 유지
        const processedResults = [];
        const seen = new Map(); // key: date_memberId, value: existing index in processedResults

        results.forEach(res => {
            const key = `${res.date}_${res.member_id}`;
            if (seen.has(key)) {
                // 이미 존재한다면 (예: 하나는 AM, 새로 들어온게 PM이면) -> 'ALL'로 격상
                const idx = seen.get(key);
                const existing = processedResults[idx];
                
                // 만약 기존 것과 현재 것의 status가 다르면 'ALL'로 표시
                if (existing.status !== res.status) {
                    existing.status = 'ALL';
                    existing.vehicle = `${existing.vehicle || ''}${res.vehicle ? ' / ' + res.vehicle : ''}`;
                    existing.source = 'MULTIPLE'; // 복수 분석 감지용 플래그
                }
                // 기존 데이터 유지 (검증 정보 등 합치기 가능)
            } else {
                seen.set(key, processedResults.length);
                processedResults.push(res);
            }
        });

        const uniqueResults = processedResults;
        const stats = {
            total_matched: uniqueResults.length,
            vehicles_found: new Set(uniqueResults.map(r => r.vehicle).filter(v => v)),
            dates_processed: new Set(uniqueResults.map(r => r.date)),
            errors_detected: uniqueResults.filter(r => !r.is_verified).length
        };

        // 결과 배열에 요약 메타데이터 부착 (하위 호환성 유지)
        uniqueResults.summary = {
            memberCount: stats.total_matched,
            vehicleCount: stats.vehicles_found.size,
            dateCount: stats.dates_processed.size,
            errorCount: stats.errors_detected,
            dates: Array.from(stats.dates_processed).sort()
        };

        return uniqueResults;
    }

    /**
     * [무결성 검증 프로세스 - 범용 모드]
     */
    validateEntry(id, name, date, vehicle, shift) {
        // 1. 이름 또는 사번으로 검색
        const member = this.masterData.find(m => (id && m.member_id === id) || m.name === name);
        const errors = [];
        const warnings = [];

        if (!member) {
            // [유연성 부여] 마스터 데이터에 없으면 신규 기사로 처리
            return { 
                is_verified: true, 
                is_new_driver: true,
                validation_error: '신규/외부 기사 감지', 
                warnings: ['확정 DB에 등록되지 않은 성함입니다.'] 
            };
        }

        // 2. 기본 정보 대조
        if (id && member.member_id !== id) {
            errors.push(`사번 불일치(DB: ${member.member_id})`);
        }

        // 3. 차량 대조
        if (shift !== '휴무') {
            const inputVehicle = vehicle ? vehicle.replace(/[^0-9]/g, '').slice(-4) : '';
            const masterVehicle = member.fixed_vehicle === '스피아' ? '스피아' : member.fixed_vehicle.slice(-4);
            
            if (masterVehicle !== '스피아' && inputVehicle && masterVehicle !== inputVehicle) {
                errors.push(`차량 불일치(고정: ${member.fixed_vehicle})`);
            }
        }

        // 4. 휴무일 대조
        const dayOfWeek = new Date(date).toLocaleDateString('ko-KR', { weekday: 'short' });
        if (shift !== '휴무' && member.fixed_off === dayOfWeek) {
            errors.push(`고정 휴무일(${member.fixed_off}) 근무 감지`);
        }

        return {
            is_verified: errors.length === 0,
            is_new_driver: false,
            validation_error: errors.join(', ') || '정상',
            warnings: warnings
        };
    }

    /**
     * [연속 근무 및 근무인정 판정]
     */
    calculateStats(memberId, allLogs) {
        const logs = allLogs
            .filter(l => l.member_id === memberId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        let consecutive = 0;
        let counters = { AM: 0, PM: 0, ALL: 0, OFF: 0 };
        
        logs.forEach((log) => {
            if (log.status === 'OFF') {
                consecutive = 0;
                counters.OFF++;
            } else {
                consecutive++;
                if (counters[log.status] !== undefined) counters[log.status]++;
            }
        });

        let status = 'NORMAL';
        if (consecutive >= 7) status = 'DANGER';
        else if (consecutive >= 6) status = 'CAUTION';

        return {
            consecutive_days: consecutive,
            total_days: counters.AM + counters.PM + counters.ALL,
            am_count: counters.AM,
            pm_count: counters.PM,
            all_count: counters.ALL,
            status: status
        };
    }
}

// Global Export
window.IntegrityEngine = IntegrityEngine;
