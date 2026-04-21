import os
import json
import glob

def compile_manuals():
    resources_dir = "../resources"
    output_dir = "../.tmp"
    output_file = os.path.join(output_dir, "manuals_data.json")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    manuals = []
    
    txt_files = glob.glob(os.path.join(resources_dir, "*.txt"))
    for file_path in txt_files:
        filename = os.path.basename(file_path)
        title = filename.replace('.txt', '')
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                if content: # Skip empty files like 운전자 메뉴얼.txt
                    manuals.append({
                        "id": title.replace(' ', '_'),
                        "title": title,
                        "content": content
                    })
        except Exception as e:
            print(f"Error reading {filename}: {e}")
            
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(manuals, f, ensure_ascii=False, indent=2)
        
    print(f"Compiled {len(manuals)} manuals into {output_file}")

if __name__ == "__main__":
    compile_manuals()
