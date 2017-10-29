# Codescape

[See it in action](https://youtu.be/0o3B_MksvMk)

Improve and compete at your everyday programming job
![Alt text](demo/short_demo.gif?raw=true "Title")

Level Up!
![Alt text](demo/short_lvl_up.gif?raw=true "Title")

Buy cool XP boosting items!
![Alt text](demo/short_store.gif?raw=true "Title")

## Elevator Pitch
Like Runescape but with less woodcutting and more coding.

## Its built with
Electron (nodejs, chromium, html, css, js), Python (pylint), RPC (talking python inside of javascript), bootstrap3, jquery

## The whole story
### Inspiration
Programming can be challenging enough, and having another person (or even worse a computer! eww) grading your code can be very stressful. I hate holding my breath when I run linters of any sort on my code. Waiting for that possible bad grade has never been fun. What if we made conforming to coding standards a competition-like event, much like you'd see in a role-playing game.
### What it does
CodeScape watches for changes to specific programming-related files in a folder of your choice (we suggest per project). When you make changes, CodeScape runs the most up-to-date linters and grades your code and awards (or punishes) you for the work you've done by rewarding both pizza rolls AND experience points. Get enough pizza rolls, buy that gold-trimmed laptop to earn XP even quicker. Reach a new level in CodeScape and be showered by delicious (cooled off) pizza rolls.
### How I built it
Electron documentation, npm, stackoverflow questions, and microsoft visual studio code.
### Challenges I ran into
Difficulties in unique execution and environment of Electron applications. Working with Javascript for the first time (one of the team members). The usual challenges of making a UI not extremely ugly.
### Accomplishments that I'm proud of
A working product that does what it says!
### What I learned
Javascript, Electron interprocess communication, file system protocols, the feeling of something that works.
### What's next for CodeScape
Leaderboards (with AWS), special events, more items, quests, more pizza rolls. (Also checkout the backlog)

## Project Phases

### Phase 1
- [ ] Watch for changes to *.py files in a selected directory
- [ ] On file change event, analyze file and experience
    - [ ] Overall linter score
    - [ ] Lines added (keep track of previous)
    - [ ] Add experience to user
- [ ] Display experience on UI (log)

### To Do Before Submission
- [ ] Screenshots
- [ ] Video demo 
- [ ] Upload to YouTube
- [ ] Submit!


### Backlog
- [ ] Leaderboard (AWS)
- [ ] Special events 
- [ ] Create a setup page***
- [ ] Persist watching files
- [ ] Tracking of time spent coding
- [ ] Reporting of areas doing well/bad
- [ ] Graphs for where errors come from
- [ ] Graphs for improvement over time
