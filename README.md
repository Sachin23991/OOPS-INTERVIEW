# C++ OOP Interview Quiz

🚀 **Interactive C++ Object-Oriented Programming MCQ quiz** built with vanilla HTML/CSS and React, deployed as a single `index.html` file.

This is a comprehensive, interview-grade practice tool designed to deepen your understanding of C++ OOP fundamentals—from constructors and destructors to virtual tables and RTTI.

---

## ✨ Features

### 📚 Question Bank
- **55+ interview-grade MCQs** carefully curated to cover real C++ OOP concepts (not generic trivia)
- **5 Topic Clusters** + **Bonus Round**:
  - ✅ Foundational OOP Semantics (Objects, Classes, Access Control, Abstraction)
  - ✅ Constructors & Destructors (Initialization, Copy Semantics, Inheritance Order)
  - ✅ Inheritance Architecture (Multiple Inheritance, Diamond Problem, Virtual Inheritance)
  - ✅ Polymorphism & Virtual Tables (v-tables, vptr, Pure Virtual Functions, Abstract Classes)
  - ✅ Static, Friends & RTTI (Static Members, Friend Functions, dynamic_cast, typeid)
  - ⭐ Bonus Interview Questions (Rule of Three/Five, Placement New, Interfaces)

### 🎨 Beautiful UI
- **Dark glassmorphism design** with gradient accents and smooth animations
- **Responsive** grid layout that adapts from desktop to mobile
- **Visual feedback**: Color-coded clusters, live progress bar, streak tracking
- **Polished components**: Stat cards, cluster chips, timer pills, explanation boxes

### ⏱️ Interactive Quiz Mechanics
- **Per-question timer** (default 30 seconds) with visual danger state
- **Instant feedback**: Green for correct, red for incorrect answers
- **Detailed explanations**: Every question displays a compiler-style explanation after answering
- **Current streak & max streak tracking** to gamify learning

### 📊 Scoring & Analytics
- **Live score display** during the quiz
- **Progress bar** showing your position through the quiz
- **Comprehensive result screen** with:
  - Final grade (S/A/B/C/F) + personalized label ("C++ Master", "Senior Dev", etc.)
  - Accuracy percentage
  - Per-question breakdown showing correct answer vs. your answer
  - Cluster-based organization for targeted review

### 🎯 Flexible Practice Modes
- **Quiz All**: Shuffle through all 55+ questions
- **Cluster-based filtering**: Practice specific topics:
  - Select a cluster on the home screen before starting
  - Shuffle only questions from that topic
  - Ideal for focused learning and gap filling

---

## 🛠️ Tech Stack

- **HTML/CSS**: Single-file deployment, custom responsive styling (no frameworks)
- **JavaScript**: React & ReactDOM via CDN (development + production builds)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Build**: None required—open `index.html` in any modern browser

---

## 🚀 Quick Start

### Option 1: Direct Browser
1. **Download or clone** this repository
2. **Open** `index.html` in your web browser (Chrome, Firefox, Safari, Edge)
3. **Start practicing!** No build process or local server required

### Option 2: Live Demo (GitHub Pages)
The quiz is deployed to GitHub Pages:
```
https://sachin23991.github.io/OOPS-INTERVIEW/
```

### Option 3: Local Server (Recommended)
For optimal performance, serve via a local HTTP server:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (http-server)
npx http-server
```
Then navigate to `http://localhost:8000`

---

## 📖 How It Works

### Home Screen
- **Stats**: Total question count, difficulty level (Mid → Senior)
- **Cluster Navigation**: Click any cluster chip to filter questions
- **Start Button**: Begins the quiz with shuffled questions

### Quiz Screen
- **Meta Info**: Question ID, cluster name, timer
- **Progress Bar**: Visual indicator of quiz completion
- **Options**: A/B/C/D buttons (color-coded feedback)
- **Explanation Box**: Revealed after answering or timeout
- **Controls**: "Exit" to go back, "Next" to continue

### Result Screen
- **Grade Pill**: Your performance grade (S/A/B/C/F) with emoji + description
- **Analytics Grid**: Accuracy %, max streak, question attempts
- **Question Breakdown**: All attempted questions with correct vs. your answer
- **Actions**: Back to home or retry the full quiz

---

## 📋 Question Structure

Each question object contains:
```javascript
{
  id: "Q01",                    // Unique identifier
  cluster: "Foundational OOP Semantics",  // Topic category
  q: "Question text here?",     // The actual question
  options: ["A", "B", "C", "D"], // 4 multiple-choice options
  answer: 2,                    // Index of correct option (0-3)
  explanation: "Why this is correct..." // Detailed explanation
}
```

---

## 🎓 Learning Path

### Beginner
1. Start with **Foundational OOP Semantics** to solidify core concepts
2. Then move to **Constructors & Destructors** (critical for interviews)

### Intermediate
3. Tackle **Inheritance Architecture** (understand the Diamond Problem)
4. Master **Polymorphism & Virtual Tables** (the core of runtime C++)

### Advanced
5. Deep dive into **Static, Friends & RTTI**
6. Challenge yourself with the **Bonus Round** (tricky interview edge cases)

---

## 🏆 Grading System

| Grade | Accuracy | Level | Label |
|-------|----------|-------|-------|
| S | ≥90% | Expert | "C++ Master" 🏆 |
| A | ≥75% | Advanced | "Senior Dev" 🎯 |
| B | ≥60% | Intermediate | "Mid-Level Dev" 💪 |
| C | ≥40% | Beginner | "Junior Dev" 📚 |
| F | <40% | Novice | "Keep Practicing" 🔁 |

---

## 📁 File Structure

```
OOPS-INTERVIEW/
├── index.html          # Complete quiz application (single file)
└── README.md          # This file
```

---

## 🔧 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Sample Questions

**Q: What is the minimum memory size for an object from a completely empty class in C++?**
- A) 0 bytes
- B) **1 byte** ✓
- C) 4 bytes
- D) 8 bytes

**Explanation**: The C++ standard requires a non-zero size (1 byte) so every object has a unique memory address. Zero bytes would destroy pointer arithmetic.

---

**Q: What is the strict order of execution for destructors in an inheritance hierarchy?**
- A) Base to Derived
- B) **Derived to Base** ✓
- C) Random order
- D) Parallel execution

**Explanation**: Destructors run bottom-up (Derived → Base), the reverse of construction. This ensures derived resources are cleaned up before the base is destroyed.

---

## 💡 Pro Tips

1. **Practice by Cluster**: Master one area before moving to the next
2. **Review Explanations**: Every explanation is a mini-lesson—read them carefully
3. **Track Your Streak**: Aim for consistency. Five in a row? You're on fire! 🔥
4. **Retry After Learning**: Take notes on wrong answers, then retry the quiz
5. **Prep for Interviews**: This quiz covers topics that appear in real C++ interviews

---

## 🤝 Contributing

Found an issue or have a suggestion?
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add new questions or fix explanation'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 👨‍💻 Author

**Sachin Sharma** | [GitHub](https://github.com/Sachin23991) | [LinkedIn](https://linkedin.com)

---

## 🎯 What's Next?

- [ ] Add more questions (target 100+ questions)
- [ ] Implement spaced repetition algorithm
- [ ] Add difficulty level filtering
- [ ] Export results as PDF
- [ ] Dark/Light theme toggle
- [ ] Leaderboard integration

---

**Ready to master C++ OOP? Start the quiz now!** 🚀

### [🎮 Open Quiz](#)
