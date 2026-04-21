import os
import shutil
from datetime import datetime

def backup_project():
    # Define source and destination
    src_dir = os.getcwd()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_root = os.path.join(src_dir, "backups")
    backup_name = f"stable_v1.8_{timestamp}_launch"
    dest_dir = os.path.join(backup_root, backup_name)
    
    # Files/Dirs to exclude
    exclude = {".tmp", ".gemini", "backups", ".git", "node_modules"}
    
    if not os.path.exists(backup_root):
        os.makedirs(backup_root)
        
    print(f"Starting backup to {dest_dir}...")
    
    try:
        if not os.path.exists(dest_dir):
            os.makedirs(dest_dir)
            
        for item in os.listdir(src_dir):
            if item in exclude:
                continue
                
            s = os.path.join(src_dir, item)
            d = os.path.join(dest_dir, item)
            
            if os.path.isdir(s):
                shutil.copytree(s, d, dirs_exist_ok=True)
            else:
                shutil.copy2(s, d)
                
        print(f"Successfully backed up current state to: {dest_dir}")
        return dest_dir
    except Exception as e:
        print(f"Error during backup: {e}")
        return None

if __name__ == "__main__":
    backup_project()
