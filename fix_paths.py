import os
import re

def fix_paths(directory):
    html_pattern = re.compile(r'(href|src)="/(css|js|assets)/')
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check if it's in a subfolder (en/ or news/)
                is_subfolder = any(sub in root for sub in ['\\en', '/en', '\\news', '/news'])
                prefix = '../' if is_subfolder else ''
                
                # We want to replace /css/ with css/ (or ../css/ if in subfolder)
                def replace_match(match):
                    return f'{match.group(1)}="{prefix}{match.group(2)}/'
                
                new_content = html_pattern.sub(replace_match, content)
                
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed paths in: {file_path}")

if __name__ == "__main__":
    fix_paths(".")
