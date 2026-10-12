# Grammar Master: Subject & Predicate Quest ✍️📚

An interactive, gamified educational web application designed to help players master **Subjects and Predicates** across 4 difficulty tiers.

🎮 **Live GitHub Pages URL**: [https://krishna-chug.github.io/grammar_master/](https://krishna-chug.github.io/grammar_master/)

---

## 🎯 Gameplay & Objective

In every sentence, players identify:
- ⭕ **The Complete Subject**: **Circle** who or what the sentence is about (noun phrase + modifiers).
- 〰️ **The Complete Predicate**: **Underline** what the subject does or is (verb phrase + objects/adverbs).

### Protected Tool System
- **⭕ Circle Tool**: Circles words with a sketchy red oval and `⭕ SUBJECT` badge.
- **〰️ Underline Tool**: Underlines words with a blue wavy underline and `〰️ PREDICATE` badge.
- **🧹 Eraser Tool**: The only tool that clears markings—protecting players from accidentally overwriting their work while dragging or clicking!
- **Idempotent Selections**: Clicking a selected word twice does not clear it; marks remain locked until erased.

---

## 🏆 Levels & Scoring System

The game features sequential progression across 4 tiers with 5 questions each (20 total questions):

| Tier | Questions | Points Each | Tier Total | Challenge Level |
| :--- | :---: | :---: | :---: | :--- |
| **Level Easy** | 5 | **2 pts** | 10 pts | Clear simple subjects and everyday action verbs. |
| **Level Medium** | 5 | **5 pts** | 25 pts | Compound subjects, auxiliary verbs, and descriptive phrases. |
| **Level Hard** | 5 | **10 pts** | 50 pts | Inverted sentence structures, gerunds, and prepositional chains. |
| **Level Impossible** | 5 | **15 pts** | 75 pts | Discontinuous split predicates, noun clauses, and negative fronting inversion. |
| **TOTAL** | **20** | — | **160 pts** | **Grammar Detective Grand Master 🏆** |

---

## ⌨️ Controls & Shortcuts

- <kbd>S</kbd> — Select **⭕ Circle Subject**
- <kbd>P</kbd> — Select **〰️ Underline Predicate**
- <kbd>E</kbd> — Select **🧹 Eraser**
- <kbd>Enter</kbd> — Submit Answer / Proceed to Next Question
- <kbd>Escape</kbd> — Pause / Resume Game

---

## 🎵 Audio Features

- Procedural Web Audio API background music generator with upbeat chords, bassline, and kalimba melody.
- Volume slider and music toggle.
- Sound effects for word clicks, correct answers, errors, and level completion fanfare.
- Confetti celebration particle engine.

---

## 🚀 Running Locally

No dependencies or build steps required. Simply open `index.html` in any modern web browser:

```bash
open index.html
```

Or run a local static server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.
