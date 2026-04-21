import json
import os
import re
from datetime import datetime

class DispatchPreprocessor:
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.master_path = os.path.join(self.base_dir, 'resources', 'master_members.json')
        self.raw_path = os.path.join(self.base_dir, 'resources', 'band_dispatch_raw.json')
        self.output_path = os.path.join(self.base_dir, 'resources', 'dispatch_data_processed.json')
        
        self.master_data = self._load_json(self.master_path)
        self.raw_data = self._load_json(self.raw_path)

    def _load_json(self, path):
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []

    def parse_text(self, text, reference_date_str):
        results = []
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        
        # JS 엔진의 로직 이식
        ref_date = datetime.strptime(reference_date_str, '%Y-%m-%d')
        year = ref_date.year
        month = ref_date.month
        
        current_date_str = reference_date_str
        
        for idx, line in enumerate(lines):
            # 1. 날짜 식별 (JS: [YYYY-MM-DD] 또는 D일)
            date_tag = re.search(r'\[(\d{4}-\d{2}-\d{2})\]', line)
            day_only = re.match(r'^\s*(\d{1,2})\s*([일\s]|$)', line)
            
            if date_tag:
                current_date_str = date_tag.group(1)
            elif day_only:
                day = day_only.group(1).zfill(2)
                current_date_str = f"{year}-{str(month).zfill(2)}-{day}"
            
            # 2. 명부 대조 (Name-based parsing)
            for member in self.master_data:
                name = member['name']
                if name in line:
                    status = 'AM'
                    tokens = line.split()
                    try:
                        # 이름이 나타나는 위치로 판단 (JS와 동일 로직)
                        name_idx = -1
                        for i, t in enumerate(tokens):
                            if name in t:
                                name_idx = i
                                break
                        
                        if name_idx == 0: status = 'AM'
                        elif name_idx == 1: status = 'PM'
                        # 그 외는 AM 기본값
                    except:
                        pass
                    
                    # 차량번호 (4자리 숫자)
                    vehicle_match = re.search(r'\b\d{4}\b', line)
                    vehicle = vehicle_match.group(0) if vehicle_match else ""
                    
                    # 무결성 검증 (정상 여부)
                    validation = self.validate_entry(member, current_date_str, vehicle, status)
                    
                    results.append({
                        "date": current_date_str,
                        "member_id": member['member_id'],
                        "name": name,
                        "status": status,
                        "vehicle": vehicle,
                        "is_verified": validation['is_verified'],
                        "validation_error": validation['validation_error']
                    })
        
        return results

    def validate_entry(self, member, date_str, vehicle, status):
        errors = []
        dt = datetime.strptime(date_str, '%Y-%m-%d')
        days = ['월', '화', '수', '목', '금', '토', '일']
        day_of_week = days[dt.weekday()]
        
        # 차량 대조
        if member['fixed_vehicle'] != '스피아' and vehicle:
            if member['fixed_vehicle'][-4:] != vehicle[-4:]:
                errors.append(f"차량불일치(고정:{member['fixed_vehicle']})")
        
        # 휴무일 근무
        if member['fixed_off'] == day_of_week:
            errors.append(f"고정휴무일({day_of_week}) 근무")
            
        return {
            "is_verified": len(errors) == 0,
            "validation_error": ", ".join(errors) if errors else "정상"
        }

    def run(self):
        processed_logs = {}
        
        for item in self.raw_data:
            results = self.parse_text(item['content'], item['date'])
            for res in results:
                date = res['date']
                mid = res['member_id']
                if date not in processed_logs:
                    processed_logs[date] = {}
                processed_logs[date][mid] = res

        with open(self.output_path, 'w', encoding='utf-8') as f:
            json.dump(processed_logs, f, ensure_ascii=False, indent=2)
        
        print(f"Pre-processing complete: {self.output_path}")
        return len(processed_logs)

if __name__ == "__main__":
    preprocessor = DispatchPreprocessor()
    count = preprocessor.run()
    print(f"총 {count}일 분량의 데이터가 정형화되었습니다.")
