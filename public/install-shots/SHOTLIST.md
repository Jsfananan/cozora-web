# Install-guide screenshots — drop them here

Save screenshots in this folder (`cozora-web/public/install-shots/`) using the
EXACT filenames below. Once a file is present, Alfred wires it into the matching
step as a "See the real screen" reveal under the animation. Any missing file
just falls back to the animation — nothing breaks.

PNG preferred. Crop tight to the relevant UI. **No private/client skill names
visible** (use a clean or blurred account — do NOT reuse the raw
`ss-list-of-my-skills.png`, it lists wr-*/caio-*/client skills).

## FILE track (skill ships as a .zip)
| Filename | What to capture |
|----------|-----------------|
| `file-1-download.png`   | A Cozora Substack post showing the skill's downloadable file (the download link / attachment). |
| `capabilities.png`      | Settings → Capabilities with **"Code execution and file creation"** toggled ON. (shared with prompt track) |
| `file-3-skills.png`     | **Customize → Skills** — a clean skills list with the **"+"** button visible (no client names). |
| `file-4-upload.png`     | The **"+" → Create skill → Upload a skill** dialog, and/or the file picker with a `.zip` selected. |

## PROMPT track (skill ships as a prompt for Cowork)
| Filename | What to capture |
|----------|-----------------|
| `prompt-1-copy.png`     | A Cozora Substack post showing the prompt block to copy. |
| `prompt-3-paste.png`    | Cowork / a Claude chat with the prompt pasted in the composer (like `ss-red-pen-skill-creation-request.png`). |
| `prompt-4-questions.png`| Cowork asking its setup questions (voice/brand), if the skill has them. |
| `prompt-5-save.png`     | The finished skill card with the **"Save skill"** button (like `ss-red-pen-skill-ready-to-save.png` — that one's usable, `red-pen-review-lic` is fine). |

## SHARED (both tracks)
| Filename | What to capture |
|----------|-----------------|
| `use-skill.png`         | A skill firing in a chat (`ss-08-skill-fires.png` is usable as-is). |

Reusable right now from ~/Documents/Claude/leading-with-claude/screenshots/:
- `ss-08-skill-fires.png`            → `use-skill.png`
- `ss-red-pen-skill-ready-to-save.png` → `prompt-5-save.png`
- `ss-red-pen-skill-creation-request.png` → `prompt-3-paste.png`
