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
        
        // 날짜 식별용 (예: [2024-04-01] 또는 1일 수)
        const dateTagRegex = /\[(\d{4}-\d{2}-\d{2})\]/;
        const dayOnlyRegex = /^\s*(\d{1,2})\s*([일\s]|$)/; // '일'이 생략되어도 숫자면 인식
        
        let year = referenceDate.getFullYear();
        let month = referenceDate.getMonth() + 1;
        let currentDate = '';

        console.log(`[엔진] 분석 시작 - 기준 날짜: ${year}년 ${month}월`);

        lines.forEach((line, lineIdx) => {
            // 1. 날짜 태그 확인 [2024-04-01]
            const dateMatch = line.match(dateTagRegex);
            if (dateMatch) {
                currentDate = dateMatch[1];
            } else {
                // 2. "1일 수" 형식 확인 -> 앱의 현재 달 기준으로 연도/월 보정
                const dayMatch = line.match(dayOnlyRegex);
                if (dayMatch) {
                    const day = dayMatch[1].padStart(2, '0');
                    currentDate = `${year}-${String(month).padStart(2, '0')}-${day}`;
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

        // 중복 제거 (이름+날짜가 겹치면 뒤에 나온 것을 우선)
        const uniqueResults = [];
        const seen = new Set();
        for (let i = results.length - 1; i >= 0; i--) {
            const key = `${results[i].date}_${results[i].member_id}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueResults.unshift(results[i]);
            }
        }

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
