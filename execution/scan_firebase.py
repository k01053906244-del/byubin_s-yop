import firebase_admin
from firebase_admin import credentials, firestore, db as rtdb
import json

# 이 스크립트는 사용자가 "저장되었다"고 믿는 데이터를 찾기 위해 파이어베이스 전체를 스캔합니다.
def scan_firebase():
    project_id = "byubinfutureworks"
    print(f"--- Scanning Project: {project_id} ---")
    
    # 1. Firestore 스캔
    try:
        # Default credentials should work if authenticated via CLI
        if not firebase_admin._apps:
            firebase_admin.initialize_app(options={'projectId': project_id})
        
        client = firestore.client()
        collections = client.collections()
        
        found_any = False
        for coll in collections:
            found_any = True
            docs = list(coll.limit(5).stream())
            print(f"Found Collection: {coll.id} ({len(docs)} sample docs)")
            for doc in docs:
                print(f"  - Doc ID: {doc.id}")
                # print(f"    Data: {doc.to_dict()}")
        
        if not found_any:
            print("No Firestore collections found.")
            
    except Exception as e:
        print(f"Firestore Scan Error: {e}")

    # 2. Realtime Database 스캔
    try:
        # Note: Needs databaseURL, usually project-id.firebaseio.com
        db_url = f"https://{project_id}-default-rtdb.firebaseio.com/"
        print(f"Scanning RTDB: {db_url}")
        
        # We might need to re-init with db_url
        # firebase_admin.delete_app(firebase_admin.get_app())
        # firebase_admin.initialize_app(options={'databaseURL': db_url, 'projectId': project_id})
        
        ref = rtdb.reference("/", url=db_url)
        data = ref.get()
        if data:
            print(f"Found RTDB Data: {json.dumps(data)[:200]}...")
        else:
            print("No RTDB data found.")
    except Exception as e:
        print(f"RTDB Scan Error: {e}")

if __name__ == "__main__":
    scan_firebase()
