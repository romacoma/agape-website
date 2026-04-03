import os
import re

def add_animations_to_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Move animate-on-scroll from <div class="container animate-on-scroll"> to inner elements if they are bento-grids.
    # Actually, simpler: just find bento-card, highlight-box, service-icon-box, resource-card, testimonial-bento-card
    # and add animate-on-scroll.
    
    classes_to_animate = [
        'bento-card', 'highlight-box', 'service-icon-box', 
        'resource-card', 'testimonial-bento-card', 'info-item',
        'donate-block', 'card--news'
    ]
    
    modified = False
    
    for cls in classes_to_animate:
        # Avoid double adding
        pattern = re.compile(fr'class="([^"]*\b{cls}\b[^"]*)"')
        
        def replacer(match):
            class_str = match.group(1)
            if 'animate-on-scroll' not in class_str:
                return f'class="{class_str} animate-on-scroll"'
            return match.group(0)
            
        new_content = pattern.sub(replacer, content)
        if new_content != content:
            content = new_content
            modified = True

    # Also stagger delays for items inside grid or bento-grid
    # For simplicity, we just look for animate-on-scroll and sequentially add data-delay if there are multiple together.
    # Doing that via purely regex is hard. Let's do a simple approach.
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Modified: {filepath}")

html_files = []
for root, dirs, files in os.walk('.'):
    if '.git' in root or '.agents' in root or '.tmp' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

for file in html_files:
    add_animations_to_file(file)

print("Done.")
