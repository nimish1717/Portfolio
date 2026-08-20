import os
import re
import glob

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find where gsap.context is called
    match = re.search(r'const ctx = gsap\.context\(\(\) => \{', content)
    if not match:
        match = re.search(r'let ctx = gsap\.context\(\(\) => \{', content)
    
    if not match:
        return

    # Find the scope argument at the end of the context
    scope_match = re.search(r'\}, (\w+Ref)(?:\.current)?\);', content)
    if not scope_match:
        return
        
    scope_var = scope_match.group(1)
    
    if f"if (!{scope_var}.current) return;" in content:
        return

    # Replace the start
    old_start = match.group(0)
    indent = old_start[:len(old_start) - len(old_start.lstrip())]
    
    # Actually the match won't have indentation because we used re.search without ^
    # Let's find the exact line
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'ctx = gsap.context(() => {' in line:
            indent = line[:len(line) - len(line.lstrip())]
            lines.insert(i, f"{indent}if (!{scope_var}.current) return;")
            break
            
    with open(filepath, 'w') as f:
        f.write('\n'.join(lines))
    print(f"Fixed {filepath}")

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.jsx'):
            fix_file(os.path.join(root, file))

