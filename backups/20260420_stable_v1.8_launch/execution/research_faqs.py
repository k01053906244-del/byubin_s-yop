import os
import json
import re

def find_faq_file(directory):
    for filename in os.listdir(directory):
        if 'Q&A' in filename.upper() or '상담' in filename:
            return os.path.join(directory, filename)
    return None

def extract_faqs(file_path):
    try:
        # Try CP949 first (standard Korean in Windows)
        with open(file_path, 'r', encoding='cp949') as f:
            content = f.read()
    except Exception:
        # Fallback to UTF-8
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    
    # Simple parsing: Q. ... A. ... or similar patterns
    # Looking at the previous output, it seems to have Q1. ... A. ... or Q1 ... A.
    faqs = []
    # Pattern to match Q... A...
    # Questions often start with Q and a number
    parts = re.split(r'Q\d*[\.\s]*', content)
    for part in parts:
        if not part.strip(): continue
        # Split by A.
        if 'A.' in part:
            q_part, a_part = part.split('A.', 1)
            faqs.append({
                "question": q_part.strip(),
                "answer": a_part.strip()
            })
        elif 'A' in part:
             # Try split by lone A if A. is not found
             q_part, a_part = part.split('A', 1)
             faqs.append({
                "question": q_part.strip(),
                "answer": a_part.strip()
            })

    return faqs

res_dir = r"c:\Users\home\OneDrive\바탕 화면\1인기업만들기\버스기사다~얍 솔루션\resources"
faq_file = find_faq_file(res_dir)

if faq_file:
    data = extract_faqs(faq_file)
    print(json.dumps(data, ensure_ascii=False, indent=2))
else:
    print("FAQ file not found.")
