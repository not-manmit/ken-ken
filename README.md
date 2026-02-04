# KenKen Evolution 🎮

A modern, skill-based mathematical puzzle game built with React, TypeScript, and innovative game mechanics.

## 🎯 Features

### Core Gameplay
- **Dynamic KenKen Puzzles**: Classic math logic puzzles with progressive difficulty (4×4 to 7×7 grids)
- **Cascade Mode**: Unlock grid regions by solving adjacent cages (Fog of War mechanic)
- **Real-time Validation**: Instant feedback on moves with visual indicators
- **Combo System**: Build multipliers with consecutive correct placements

### Power-Up Economy
Earn stars by completing cages perfectly and spend them on:
- 💡 **Smart Hint** (5★): Shows valid numbers for selected cell
- ✓ **Cage Validator** (3★): Verify if a cage is correctly filled
- ↶ **Undo Plus** (2★): Unlimited undos for 2 minutes
- 👁 **Reveal Region** (10★): Unlock fog-covered areas

### Progressive Difficulty
- Adaptive AI adjusts puzzle complexity based on:
  - Completion time
  - Hint usage
  - Perfect cage rate
  - Mistake frequency

## 🛠️ Tech Stack

- **Frontend**: React 18.3+ with TypeScript
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Audio**: Howler.js
- **Build Tool**: Vite
- **Puzzle Generation**: Custom constraint satisfaction algorithm

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🎮 How to Play

1. **Fill the Grid**: Each row and column must contain numbers 1 through N (where N = grid size)
2. **Satisfy Cages**: Groups of cells (cages) must satisfy their operation
   - `12×` means cells multiply to 12
   - `5+` means cells add to 5
   - `2÷` means cells divide to 2
   - `3-` means cells subtract to 3
3. **No Repeats**: Numbers cannot repeat in rows or columns
4. **Earn Stars**: Complete cages without mistakes to earn 3★
5. **Use Power-ups**: Spend stars strategically to overcome challenges

## 🎨 Game Modes

- **Normal Mode**: Standard KenKen gameplay
- **Fog of War**: Unlock grid regions by solving cages
- **Time Attack**: Race against the clock (coming soon)
- **Minimal Moves**: Complete with fewest changes (coming soon)
- **Daily Forge**: Unique daily puzzle with global leaderboard (coming soon)

## 📁 Project Structure

```
kenken-evolution/
├── src/
│   ├── components/
│   │   ├── Grid/           # Grid, Cell, and rendering components
│   │   ├── UI/             # UI components (PowerUpPanel, ProgressBar, etc.)
│   │   └── Game/           # Game controller and logic
│   ├── engine/
│   │   ├── puzzleGenerator.ts  # Puzzle generation algorithm
│   │   ├── validator.ts        # Game validation logic
│   │   └── cascadeLogic.ts     # Cascade unlock system
│   ├── stores/
│   │   └── gameStore.ts        # Zustand state management
│   ├── types/
│   │   └── game.types.ts       # TypeScript interfaces
│   └── utils/
│       ├── soundManager.ts     # Audio management
│       └── powerUps.ts         # Power-up utilities
├── public/
└── package.json
```

## 🎓 Design Thinking Framework

This game was built following the Design Thinking methodology:

1. **Empathize**: Identified pain points in traditional puzzle games
2. **Define**: Established need for adaptive, engaging progression
3. **Ideate**: Created innovative Cascade Mode and Power-up Economy
4. **Prototype**: Built functional web-based game
5. **Test**: Integrated analytics for continuous improvement

## 🔧 Configuration

### Difficulty Settings
Adjust difficulty calculation in `src/utils/powerUps.ts`:
```typescript
calculateDifficultyAdjustment(
  completionTime,
  hintsUsed,
  perfectCages,
  totalCages
)
```

### Puzzle Generation
Customize puzzle parameters in `src/engine/puzzleGenerator.ts`:
- Grid sizes: 4×4, 5×5, 6×6, 7×7
- Cage sizes: 1-5 cells
- Operations: +, -, ×, ÷, =

## 🎯 Roadmap

- [ ] User authentication and cloud save
- [ ] Multiplayer competitive mode
- [ ] Achievement system
- [ ] Custom puzzle creator
- [ ] Mobile app (React Native)
- [ ] Leaderboards
- [ ] Tutorial mode
- [ ] Accessibility improvements

## 📊 Analytics

Built-in tracking for:
- Completion times
- Hint usage patterns
- Difficulty curves
- Rage-quit detection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by the classic KenKen puzzle game
- Built with modern web technologies
- Designed with player engagement in mind

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Enjoy mastering mathematical logic! 🧮✨**
