import os

files_to_fix = [
    'src/components/DigitalLab/DigitalLab.jsx',
    'src/components/CurrentlyBuilding/CurrentlyBuilding.jsx',
    'src/components/Projects/FraudDetection.jsx',
    'src/components/Contact/Contact.jsx',
    'src/components/Contact/Personality.jsx',
    'src/components/Projects/PhantomPost.jsx',
    'src/components/Projects/FrontendUI.jsx',
    'src/components/Proof/Proof.jsx'
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()
        
    if "import { ScrollTrigger }" not in content:
        # Add import after import gsap from 'gsap';
        content = content.replace("import gsap from 'gsap';", "import gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n\ngsap.registerPlugin(ScrollTrigger);")
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")
