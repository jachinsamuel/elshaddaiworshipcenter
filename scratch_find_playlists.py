import re

path = r'C:\Users\jachi\.gemini\antigravity\brain\458e74cc-7b83-4205-86cb-79e4339a0e32\.system_generated\steps\1517\content.md'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Find matches for playlist and title
pattern = re.compile(r'\"playlistId\":\"(PL[a-zA-Z0-9_-]+)\".*?\"title\":\{\"runs\":\[\{\"text\":\"(.*?)\"\}', re.DOTALL)
seen = set()
for match in pattern.finditer(text):
    pl_id, title = match.group(1), match.group(2)
    if (pl_id, title) not in seen:
        seen.add((pl_id, title))
        print(f"{pl_id} | {title}")
