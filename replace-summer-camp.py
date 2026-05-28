#!/usr/bin/env python3
"""Replace massive summer camp section with modular import"""

# Read the file
with open('/home/user/webapp/src/index.tsx', 'r') as f:
    lines = f.readlines()

# Find the start and end of summer camp section
start_line = 12050  # Line 12051 (0-indexed: 12050)
end_line = 13678    # Line before admin route

# Create the new compact section
new_section = '''// Summer Drone Camp Page - Modular Version
import { getSummerCampPage } from './summer-camp/index'

app.get('/summer-camp', (c) => {
  return c.html(renderPage('Summer Drone Camp 2026 | FLYQ Drones', getSummerCampPage()));
});

'''

# Replace the section
new_lines = lines[:start_line] + [new_section] + lines[end_line:]

# Write back
with open('/home/user/webapp/src/index.tsx', 'w') as f:
    f.writelines(new_lines)

print(f"✅ Replaced {end_line - start_line} lines with {len(new_section.split(chr(10)))} lines")
print(f"Old file: {len(lines)} lines")
print(f"New file: {len(new_lines)} lines")
print(f"Reduced by: {len(lines) - len(new_lines)} lines ({100 * (len(lines) - len(new_lines)) / len(lines):.1f}%)")
