import os

file_path = r"c:\Users\home\OneDrive\바탕 화면\1인기업만들기\버스기사다~얍 솔루션\resources\채팅봇 주요Q&A.txt"

try:
    with open(file_path, 'r', encoding='cp949') as f:
        content = f.read()
        print("--- CONTENT START ---")
        print(content)
        print("--- CONTENT END ---")
except Exception as e:
    print(f"Error reading with cp949: {e}")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            print("--- CONTENT START (UTF-8) ---")
            print(content)
            print("--- CONTENT END (UTF-8) ---")
    except Exception as e2:
        print(f"Error reading with utf-8: {e2}")
