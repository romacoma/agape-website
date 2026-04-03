import os

en_dir = 'en'
files = [f for f in os.listdir(en_dir) if f.endswith('.html')]

replacements = [
    ('href="/css/', 'href="../css/'),
    ('href="/assets/', 'href="../assets/'),
    ('src="/assets/', 'src="../assets/'),
    ('src="/js/', 'src="../js/'),
    ('href="/en/', 'href="'),
]

for filename in files:
    filepath = os.path.join(en_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filename}")
    else:
        print(f"No changes for {filename}")
