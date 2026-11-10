Kegely for Men

A free, private pelvic floor (Kegel) trainer for men, built as a Progressive Web App. It gives you a guided squeeze-and-relax timer, a set of supporting exercises, progress tracking and a plain-language guide. Install it on your phone and it works offline.


Features
Guided timer: a breathing orb shrinks as you squeeze and grows as you relax, with a progress ring and a countdown.
Levels: Beginner, Intermediate, Advanced, or Custom (squeeze, relax, reps, break and quick squeezes).
Each session is slow holds followed by quick squeezes.
Cues by sound, voice and vibration, each switchable.
Keeps the screen awake during a session and switches to a distraction-free focus view.
Daily reminders: add several reminder times for different parts of the day, with an on/off switch for each.
Voices: choose from six named guide voices (Aria, Nora, Maya, Leo, Ethan, Kai) and tap one to hear it.
Exercises: ten gentle supporting moves (squats, glute bridge, bird dog, child's pose and more) with animated figures.
Progress: sessions, day streak, sessions this week, time trained, a 7-day chart and a 5-week calendar. Tap the Today pill to change your daily goal (1 to 6 sessions).
Guide: how to find the right muscles, common mistakes, how to build up gradually, the knack, and when to see a professional.
Installable and offline: add it to your home screen and use it without a connection.
Light and dark themes: follows your device setting.
Privacy

There is no backend, account, tracking or analytics. Your sessions, settings and reminders are stored in your browser's localStorage on your own device. The only external request is Google Fonts (Bricolage Grotesque); the app falls back to system fonts if it can't load.

Getting started

There is no build step and there are no dependencies. The app is plain HTML, CSS and JavaScript.

Service workers need https or localhost, so serve the folder rather than opening index.html directly:

bash
git clone <your-repo-url>
cd <your-repo>
python3 -m http.server 8080

Then open http://localhost:8080.

Deploy to GitHub Pages
Push the files to the root of your repository.
Go to Settings → Pages.
Under Build and deployment, choose Deploy from a branch, then pick your branch and / (root).

All paths in the app and manifest are relative, so it also works when hosted under a sub-path like https://<user>.github.io/<repo>/.

Install on your phone
Android (Chrome): open the site and tap Install app (or use the menu → Install app).
iPhone (Safari): tap Share → Add to Home Screen.
Reminders: how they work

Reminders use the browser's Notifications API and need permission when you first add one.

They show while Kegely is open or running in the background.
A plain web app can't wake itself when the phone has fully closed it. Reliable alerts in that case need a push server, which this project deliberately doesn't have.
For exact-time alerts, use Add to calendar on the reminders page. It exports your reminders as repeating daily events that your phone's calendar app will notify you about.
Voice guidance

Voices use the browser's built-in speech synthesis, so the sound depends on the voices installed on the device. Male and female options are matched by name where the device exposes it. Android doesn't label voices by gender, so there the personas may share an underlying voice and differ mainly in pitch and pace. In-app browsers (for example from social apps) often block speech; open the site in Chrome or Safari instead.

Project structure
.
├── index.html              # The whole app: markup, styles and logic
├── sw.js                   # Service worker: offline cache and notification clicks
├── manifest.webmanifest    # PWA manifest
├── icon-192.png
├── icon-512.png
├── icon-maskable-512.png
└── apple-touch-icon.png
Development notes
Updating the cache: when you change any file, bump the cache name in sw.js (const V='kegely-v4') so installed copies pick up the update. Close and reopen the installed app to apply it.
Stored data: saved under the localStorage key kegel-clone-v1. It holds sessions, level, custom timings, sound, voice and vibration choices, selected voice, daily goal and reminders.
Workout levels: defined in the LEVELS object near the top of the script in index.html.
Voices: defined in the PERS array; adjust a voice's pitch and rate to taste.
Medical disclaimer

Kegely is educational and is not medical advice. Kegels help many people but not everyone. If you have pelvic pain, pain during sex, trouble relaxing these muscles, or have had prostate or pelvic surgery, check with a doctor or pelvic floor physiotherapist first. Stop if anything hurts.

The routines follow the pattern in NHS physiotherapy leaflets (slow holds, then quick squeezes, about three times a day) and NICE's advice to train for at least three months.

