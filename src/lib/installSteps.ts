/**
 * Install-guide step content for cozora.org/install.
 *
 * TWO forks:
 *   1. Delivery — how the Cozora skill ships: a downloadable .zip ('file')
 *      or a prompt you paste into Cowork ('prompt'). Most are 'prompt'.
 *   2. Surface — where they use Claude: 'web' (claude.ai) or 'desktop' app.
 *      On desktop the build chat is called "Cowork"; on web it's a Claude chat.
 *
 * Every menu path / button label below is VERIFIED against:
 *   - Anthropic Help Center (support.claude.com, Nov 2026): "Customize → Skills",
 *     "Code execution and file creation", "+ Create skill", "Upload a skill",
 *     .zip < 50 MB.
 *   - Joel's own screenshots + "Leading with Claude" drafts for the Cowork flow:
 *     paste prompt → Claude builds & packages the skill → "Save skill" button.
 *     (~/Documents/Claude/leading-with-claude/screenshots/ss-red-pen-*.png)
 *
 * Do NOT change labels without re-checking those sources — this ships to
 * non-technical members who follow it literally.
 */

export type Surface = 'web' | 'desktop';
export type Delivery = 'file' | 'prompt';
type Chrome = 'browser' | 'app';

export type Scene =
  | { kind: 'download'; postTitle: string; button: string }
  | { kind: 'copyPrompt'; postTitle: string; button: string }
  | { kind: 'menu'; chrome: Chrome; trigger: string; items: string[]; highlight: string }
  | { kind: 'panel'; chrome: Chrome; nav: string[]; highlight: string; heading: string; hint?: string }
  | { kind: 'upload'; chrome: Chrome; button: string; fileName: string }
  | { kind: 'toggle'; chrome: Chrome; label: string; sublabel?: string }
  | { kind: 'paste'; chrome: Chrome; surfaceName: string; prompt: string }
  | { kind: 'answer'; chrome: Chrome; question: string; answer: string }
  | { kind: 'saveSkill'; chrome: Chrome; skillName: string; button: string }
  | { kind: 'chat'; chrome: Chrome; prompt: string; pill: string };

export interface Step {
  id: string;
  title: string;
  body: string;
  tip?: string;
  check: string;
  scene: Scene;
  /** Optional real screenshot in /public/install-shots. Shown only if it loads. */
  screenshot?: string;
}

export const SURFACE_META: Record<
  Surface,
  { name: string; blurb: string; icon: 'browser' | 'app' }
> = {
  web: { name: 'Claude on the web', blurb: 'You use Claude in a browser at claude.ai', icon: 'browser' },
  desktop: { name: 'Claude desktop app', blurb: 'You installed the Claude app on your Mac or PC', icon: 'app' },
};

export const DELIVERY_META: Record<
  Delivery,
  { name: string; blurb: string; icon: 'file' | 'prompt' }
> = {
  file: {
    name: 'A downloadable file',
    blurb: 'The Cozora post has a file (.zip) to download',
    icon: 'file',
  },
  prompt: {
    name: 'A prompt to paste',
    blurb: 'The Cozora post gives you a block of text to copy',
    icon: 'prompt',
  },
};

/* ------------------------------------------------------------------ */
/*  FILE track — download a .zip and upload it                         */
/* ------------------------------------------------------------------ */
function fileSteps(surface: Surface): Step[] {
  const chrome: Chrome = surface === 'web' ? 'browser' : 'app';
  const settingsWhere =
    surface === 'web'
      ? 'Click the gear (Settings) at the bottom-left of the sidebar, then open Capabilities.'
      : 'Open Settings from the sidebar, then go to Capabilities.';

  return [
    {
      id: 'get-file',
      title: 'Download your skill file',
      body: 'Open the skill’s post on the Cozora Substack and download the skill file. It arrives as a .zip — keep it somewhere easy to find, like your Desktop or Downloads.',
      tip: 'Every Cozora skill is packaged and safe to upload — you’re getting it straight from us. Don’t unzip it; upload the .zip as-is.',
      check: 'Got the file — next',
      scene: { kind: 'download', postTitle: 'The Red Pen Review Skill', button: 'Download skill (.zip)' },
      screenshot: '/install-shots/file-1-download.png',
    },
    {
      id: 'enable-code-file',
      title: 'Turn on Code execution',
      body: `Skills need one setting switched on first. ${settingsWhere} Turn on “Code execution and file creation.”`,
      tip: 'This is a one-time switch. Once it’s on, every skill you add just works.',
      check: 'It’s switched on — next',
      scene: { kind: 'toggle', chrome, label: 'Code execution and file creation', sublabel: 'Required for skills to run' },
      screenshot: '/install-shots/capabilities.png',
    },
    {
      id: 'open-skills',
      title: 'Open Customize → Skills',
      body: 'In the left sidebar, click Customize, then open the Skills tab. This is where all of your skills live.',
      check: 'I’m on the Skills tab — next',
      scene: {
        kind: 'panel',
        chrome,
        nav: ['Skills', 'Connectors', 'Plugins'],
        highlight: 'Skills',
        heading: 'Customize',
        hint: 'Skills you add show up here with an on/off switch.',
      },
      screenshot: '/install-shots/file-3-skills.png',
    },
    {
      id: 'upload-skill',
      title: 'Upload the skill file',
      body: 'Click the + button, choose Create skill, then Upload a skill. Pick the .zip you just downloaded. It uploads and appears in your list, switched on automatically.',
      tip: 'If it won’t upload: the file must be a .zip under 50 MB. The one from Cozora already is — just upload it as-is.',
      check: 'My skill is in the list — next',
      scene: { kind: 'upload', chrome, button: 'Upload a skill', fileName: 'red-pen-review.zip' },
      screenshot: '/install-shots/file-4-upload.png',
    },
    {
      id: 'use-skill-file',
      title: 'Put it to work',
      body: 'That’s it — the skill is live. Just ask Claude in plain language and it uses the skill automatically when it fits. Want to trigger it on purpose? Type “/” in the message box and pick it from the list.',
      tip: 'You never have to reinstall it. It’s ready every time you open Claude.',
      check: 'Show me the finish line →',
      scene: { kind: 'chat', chrome, prompt: 'Give my draft the red-pen review.', pill: 'Red Pen Review' },
      screenshot: '/install-shots/use-skill.png',
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  PROMPT track — paste a prompt, let Claude build it, Save skill     */
/* ------------------------------------------------------------------ */
function promptSteps(surface: Surface): Step[] {
  const chrome: Chrome = surface === 'web' ? 'browser' : 'app';
  const surfaceName = surface === 'desktop' ? 'Cowork' : 'a new Claude chat';
  const openWhere =
    surface === 'desktop'
      ? 'Open the Claude desktop app and start a Cowork chat.'
      : 'Open claude.ai and start a new chat.';
  const settingsWhere =
    surface === 'web'
      ? 'Click the gear (Settings) at the bottom-left, then open Capabilities.'
      : 'Open Settings from the sidebar, then go to Capabilities.';

  return [
    {
      id: 'copy-prompt',
      title: 'Copy the skill prompt',
      body: 'Open the skill’s post on the Cozora Substack and copy the whole prompt block — every line, top to bottom.',
      tip: 'Copy all of it, including the first line. That first line tells Claude to turn it into a skill.',
      check: 'Copied it — next',
      scene: { kind: 'copyPrompt', postTitle: 'The Mind Dump Digest Skill', button: 'Copy prompt' },
      screenshot: '/install-shots/prompt-1-copy.png',
    },
    {
      id: 'enable-code-prompt',
      title: 'Turn on Code execution',
      body: `One setting has to be on so Claude can build and save the skill. ${settingsWhere} Turn on “Code execution and file creation.”`,
      tip: 'One-time switch. Leave it on and every future skill will build cleanly.',
      check: 'It’s switched on — next',
      scene: { kind: 'toggle', chrome, label: 'Code execution and file creation', sublabel: 'Lets Claude build & package the skill' },
      screenshot: '/install-shots/capabilities.png',
    },
    {
      id: 'paste-prompt',
      title: `Paste it into ${surfaceName}`,
      body: `${openWhere} Paste the whole prompt into the message box and send it. Claude reads it and starts building your skill.`,
      tip: surface === 'desktop'
        ? 'On the desktop app, this build chat is called Cowork. On the web it’s just a regular Claude chat — either works.'
        : 'On the web it’s a normal Claude chat. (In the desktop app the same thing is called “Cowork.”)',
      check: 'Sent it — next',
      scene: { kind: 'paste', chrome, surfaceName, prompt: 'Turn this into a skill for me. …' },
      screenshot: '/install-shots/prompt-3-paste.png',
    },
    {
      id: 'answer-questions',
      title: 'Answer its questions',
      body: 'Some skills ask you a few quick questions first — to learn your voice, your brand, or how you like things done. Answer them one at a time, in plain language. (If it doesn’t ask anything, it just builds — skip ahead.)',
      tip: 'The more honestly you answer, the better the skill fits you. There are no wrong answers.',
      check: 'Answered — next',
      scene: { kind: 'answer', chrome, question: 'What should we call this skill?', answer: 'My daily idea digest' },
      screenshot: '/install-shots/prompt-4-questions.png',
    },
    {
      id: 'save-skill',
      title: 'Click “Save skill”',
      body: 'When Claude finishes, it shows a skill card with the finished skill. Click Save skill. That’s the moment it becomes a real, reusable skill in your account.',
      tip: 'Before saving, Claude tells you how to trigger the skill — e.g. “say red-pen this.” Worth a quick read.',
      check: 'Saved it — next',
      scene: { kind: 'saveSkill', chrome, skillName: 'mind-dump-digest', button: 'Save skill' },
      screenshot: '/install-shots/prompt-5-save.png',
    },
    {
      id: 'use-skill-prompt',
      title: 'Put it to work',
      body: 'Done — the skill is live. Just ask Claude in plain language and it fires automatically when it fits. Want to trigger it on purpose? Type “/” in the message box and pick it from the list.',
      tip: 'You never rebuild it. It’s saved for good, ready every time you open Claude.',
      check: 'Show me the finish line →',
      scene: { kind: 'chat', chrome, prompt: 'Run my mind dump digest.', pill: 'Mind Dump Digest' },
      screenshot: '/install-shots/use-skill.png',
    },
  ];
}

export function buildSteps(surface: Surface, delivery: Delivery): Step[] {
  return delivery === 'file' ? fileSteps(surface) : promptSteps(surface);
}
