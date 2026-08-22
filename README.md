Cottagecore Quiz 

A dreamy, multi-step quiz built to help you discover your cottagecore aesthetic — now with real scoring, animated transitions, and shareable results.

Live Demo

View Live

Features

Two quiz tracks

Cottagecore Style — 5 questions about your ideal day, accessories, seasons, drinks, and favorite sounds
Cottagecore Home — 5 questions about decor preferences, textures, kitchens, and evening rituals
Pick your track from a landing screen before starting

Real persona scoring

Every answer maps to one of 4 personas: Meadow Dreamer , Hearth Keeper , Forest Wanderer , and Golden Harvest
Results are tallied from actual answers (previously hardcoded to always show the same result)
A "Your Blend" breakdown shows the percentage match for all 4 personas, not just the winner, plus a note on which answer sealed it
Option order is randomized each time so repeat takers can't just memorize the "right" answers

Animated & accessible

Smooth slide/fade transitions between questions, with a bounce-in effect on the results screen
Option cards give a quick "pop" on selection; the progress bar animates with a slight overshoot as it fills
Answers persist when navigating back and forth between questions
A small illustrated garden scene blooms progressively as you answer
All animations respect prefers-reduced-motion
Tap targets audited for mobile (44×44px minimum)

Shareable results

"Copy shareable link" generates a URL with the result baked in (?result=hearth) — opening that link jumps straight to the persona result, no backend required
"Download my result card" renders a 1080×1080 PNG you can share directly
Open Graph / Twitter Card meta tags update dynamically based on the shared result, so links preview nicely in iMessage, Discord, and Twitter
Page <title> updates to reflect your result once the quiz is complete
Built With
React
Tailwind CSS
lucide-react (icons)
Canvas API (result card image generation)

Getting Started
git clone https://github.com/maziz6/cottagecore-quiz.git
cd cottagecore-quiz
npm install
npm start

Notes

Originally a static HTML/CSS quiz with a single hardcoded result. Rebuilt as a React app with real scoring logic, animation, and no-backend sharing via URL params.

Made by @maziz6
