import urllib.request
import os

def download_html(url, filename):
    try:
        tmp_dir = '.tmp'
        if not os.path.exists(tmp_dir):
            os.makedirs(tmp_dir)
        
        path = os.path.join(tmp_dir, filename)
        print(f"Downloading from {url} to {path}...")
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        req = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(req) as response:
            with open(path, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

if __name__ == "__main__":
    main_url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY0ZmNhZThiNDNjOWQwNTNiNjNjM2JlMjQ5MTk2EgsSBxCgvtfYngEYAZIBIwoKcHJvamVjdF9pZBIVQhMyMzMxMTA4MjUyNTIyODQyNTgw&filename=&opi=89354086"
    analysis_url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQzYjM0MDMzMjA3YjQ4N2E4MzZkYzRhZjg3NDk5ZjQ1EgsSBxCgvtfYngEYAZIBIwoKcHJvamVjdF9pZBIVQhMyMzMxMTA4MjUyNTIyODQyNTgw&filename=&opi=89354086"
    
    download_html(main_url, "main_stitch.html")
    download_html(analysis_url, "analysis_stitch.html")
