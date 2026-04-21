import pandas as pd
import json
import os
from datetime import datetime

class DispatchAnalyzer:
    def __init__(self, data_path=None):
        self.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.default_path = os.path.join(self.base_dir, 'resources', 'dispatch_data_processed.json')
        self.df = pd.DataFrame()
        
        target_path = data_path or self.default_path
        
        if os.path.exists(target_path):
            with open(target_path, 'r', encoding='utf-8') as f:
                self.raw_data = json.load(f)
        else:
            self.raw_data = {}

    def process_data(self, json_data=None):
        """JSON 데이터를 Pandas 데이터프레임으로 변환 및 전처리"""
        if json_data:
            self.raw_data = json_data
            
        flat_list = []
        for date, logs in self.raw_data.items():
            for member_id, entry in logs.items():
                row = {
                    'date': date,
                    'member_id': member_id,
                    'name': entry.get('name', '미상'),
                    'status': entry.get('status', 'OFF'),
                    'vehicle': entry.get('vehicle', '-'),
                    'sequence': entry.get('sequence', '-'),
                    'consecutive_days': entry.get('consecutive_days', 0),
                    'fatigue_status': entry.get('fatigue_status', 'NORMAL')
                }
                flat_list.append(row)
        
        self.df = pd.DataFrame(flat_list)
        if not self.df.empty:
            self.df['date'] = pd.to_datetime(self.df['date'])
        return self.df

    def generate_ceo_report(self):
        """CEO용 비즈니스 요약 리포트 생성"""
        if self.df.empty:
            return "분석할 데이터가 충분하지 않습니다. 배차표를 먼저 입력해 주세요."

        # 1. 피로도 분석
        danger_drivers = self.df[self.df['fatigue_status'] == 'DANGER']['name'].unique()
        caution_drivers = self.df[self.df['fatigue_status'] == 'CAUTION']['name'].unique()
        
        # 2. 이번 달 가동 현황
        total_shifts = len(self.df[self.df['status'] != 'OFF'])
        unique_drivers = self.df['name'].nunique()
        
        # 3. 차량별 활용도
        top_vehicles = self.df[self.df['vehicle'] != '-']['vehicle'].value_counts().head(3)
        
        report = []
        report.append(f"### 📊 경영 분석 리포트 ({datetime.now().strftime('%Y-%m-%d')})")
        report.append(f"\n#### 🔔 [안전 주의보 - 피로도 관리]")
        if len(danger_drivers) > 0:
            report.append(f"- 🔴 **위험 (7일 이상 연속근무):** {', '.join(danger_drivers)} 기사님 (즉시 휴식 권고)")
        if len(caution_drivers) > 0:
            report.append(f"- 🟡 **주의 (6일 연속근무):** {', '.join(caution_drivers)} 기사님 (내일 휴무 배정 고려)")
        if len(danger_drivers) == 0 and len(caution_drivers) == 0:
            report.append("- ✅ 현재 모든 기사님의 연속 근무 상태가 양호합니다.")

        report.append(f"\n#### 🚌 [운행 및 배차 현황]")
        report.append(f"- 이번 달 총 운행 횟수: {total_shifts}회")
        report.append(f"- 활동 기사 인원: {unique_drivers}명")
        
        report.append(f"\n#### 🛠️ [차량 효율 분석]")
        for v, count in top_vehicles.items():
            report.append(f"- `{v}호` 차량: 총 {count}회 운행 (가동률 상위)")

        report.append("\n\n---\n*본 리포트는 안티-데이터 분석기가 전처리된 배차 정보를 바탕으로 자동 생성했습니다.*")
        
        return "\n".join(report)

if __name__ == "__main__":
    # 샘플 실행 로직 (필요 시)
    analyzer = DispatchAnalyzer()
    # 임시 데이터를 로드하거나 JS에서 호출하는 방식으로 확장 가능
    print("Analyzer ready.")
