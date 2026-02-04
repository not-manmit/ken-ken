# 📖 KenKen Evolution - Official Rulebook

## 🎯 Objective
Fill the entire grid with numbers according to the rules below. Complete all cages correctly to win the game!

---

## 📐 Basic Rules

### 1. Grid Filling Rules
- Fill every cell in the grid with a number
- The numbers range from **1 to N** (where N is the grid size)
  - 4×4 grid uses numbers 1-4
  - 5×5 grid uses numbers 1-5
  - 6×6 grid uses numbers 1-6
  - 7×7 grid uses numbers 1-7

### 2. Row & Column Constraints
- **No Repeating Numbers in Rows**: Each row must contain each number exactly once
- **No Repeating Numbers in Columns**: Each column must contain each number exactly once

### 3. Cage Constraints
- **Cages** are groups of cells outlined with thick colored borders
- Each cage has a **target number** and an **operation** shown in the top-left corner
- The numbers in a cage must produce the target using the specified operation

---

## 🔢 Cage Operations

### Addition (+)
**Example: 7+**
- All numbers in the cage must add up to 7
- Possible combinations: 1+2+4, 3+4, 2+5, etc.

### Subtraction (-)
**Example: 3-**
- The difference between the two numbers must equal 3
- **Only works with 2-cell cages**
- Example: 5 and 2 (5-2=3), or 4 and 1 (4-1=3)

### Multiplication (×)
**Example: 12×**
- All numbers in the cage must multiply to 12
- Possible combinations: 3×4, 2×2×3, 1×12, etc.

### Division (÷)
**Example: 2÷**
- One number divided by the other must equal 2
- **Only works with 2-cell cages**
- Example: 4 and 2 (4÷2=2), or 6 and 3 (6÷3=2)

### Equals (=)
**Example: 4=**
- **Single-cell cage** containing exactly that number
- No calculation needed - just place the number

---

## ⭐ Scoring System

### Star Rewards
Complete cages to earn stars:
- **3 Stars** ⭐⭐⭐: Perfect completion (no mistakes, no hints)
- **2 Stars** ⭐⭐: Completed with 1 mistake
- **1 Star** ⭐: Completed with 2+ mistakes

### Stars Usage
Spend your earned stars on power-ups:
- **Smart Hint** (5⭐): Shows valid numbers for selected cell
- **Cage Validator** (3⭐): Checks if a cage is correctly filled
- **Undo Plus** (2⭐): Unlimited undos for 2 minutes
- **Reveal Region** (10⭐): Unlocks fog-covered areas (Fog Mode only)

---

## 🎮 Game Controls

### Mouse Controls
- **Click a Cell**: Select it for input
- **Click Number Button**: Place number in selected cell
- **Click Same Number**: Clear the cell
- **Click X Button**: Clear selected cell

### Keyboard Controls
- **Number Keys (1-9)**: Enter numbers directly
- **Backspace/Delete**: Clear selected cell
- **Arrow Keys**: Navigate between cells
  - ↑ Up
  - ↓ Down
  - ← Left
  - → Right

---

## 🌫️ Game Modes

### Normal Mode
- All cages visible from the start
- Complete puzzles at your own pace
- Perfect for learning and practice

### Fog of War Mode
- Grid starts mostly hidden (foggy)
- Only a few starting cages are visible
- **Cascade Unlock**: Completing a cage reveals adjacent areas
- **Strategic Challenge**: Choose which cage to solve first
- More difficult but more rewarding!

---

## 🎯 Difficulty Levels

### Easy (1-3)
- Smaller cages (2-3 cells)
- Simple operations (mostly + and ×)
- 4×4 or 5×5 grids
- Good for beginners

### Medium (4-6)
- Mixed cage sizes
- All operation types
- 5×5 or 6×6 grids
- Balanced challenge

### Hard (7-10)
- Larger cages (3-5 cells)
- Complex operations
- 6×6 or 7×7 grids
- Expert level

---

## 💡 Strategy Tips

### For Beginners
1. **Start with Single-Cell Cages**: Look for "=" cages first
2. **Look for Small Cages**: 2-cell cages are easier to solve
3. **Use Process of Elimination**: Cross off impossible numbers
4. **Check Rows and Columns**: Use the no-repeat rule
5. **Don't Rush**: Take your time to think through each move

### Advanced Strategies
1. **Corner Strategy**: Start from corners in Fog Mode
2. **Cage Chaining**: Solve cages that share cells together
3. **Number Frequency**: Track which numbers appear less
4. **Combo Building**: Complete cages consecutively for multipliers
5. **Power-Up Timing**: Save stars for harder puzzles

### Fog of War Tactics
1. **Strategic Unlocking**: Choose cages that reveal the most area
2. **Path Planning**: Create a path through the fog
3. **Edge Working**: Work along revealed edges
4. **Save Reveal Power-Up**: Use for critical moments

---

## 🏆 Combo System

### Building Combos
- Place **consecutive correct numbers** without mistakes
- Each correct placement increases your combo
- Combo appears as **×2, ×3, ×4**, etc.

### Combo Benefits
- Visual achievement indicator
- Bragging rights!
- Future feature: Combo bonus stars

### Breaking Combos
- Making a mistake resets combo to 0
- Using hints does NOT break combo
- Switching cells does NOT break combo

---

## ❌ Common Mistakes

### Rule Violations
- ❌ Repeating numbers in same row
- ❌ Repeating numbers in same column
- ❌ Cage doesn't satisfy its operation
- ❌ Numbers outside valid range (1-N)

### Visual Feedback
- **Red Background + Shake**: Invalid placement
- **Green Pulse**: Correct completion
- **Yellow Highlight**: Selected cell
- **Checkmark**: Completed cage

---

## 📊 Stats Tracked

### Game Statistics
- **Time**: How long you've been playing
- **Mistakes**: Total incorrect placements
- **Hints Used**: Number of hints requested
- **Stars Earned**: Total stars collected
- **Combo**: Current combo streak
- **Progress**: Percentage of grid completed

### Puzzle History
- Puzzles completed
- Best completion times
- Average solve time
- Perfect cages achieved

---

## 🎓 Example Puzzle Solution

### Given:
```
4×4 Grid with these cages:
- Cage A (cells 1,2): 3+ 
- Cage B (cells 3,4): 2÷
- Cage C (cells 5,6): 12×
```

### Solution Steps:
1. **Cage B (2÷)**: Must be 4 and 2, or 2 and 4
2. **Cage A (3+)**: Could be 1+2, or just 3 (if single cell)
3. **Check Row/Column**: Ensure no repeats
4. **Cage C (12×)**: Options are 3×4, 2×6, etc.
5. **Solve using constraints**: Use elimination!

---

## 🆘 When You're Stuck

### Free Options
1. **Undo**: Go back and try different approach
2. **Reset Puzzle**: Start fresh with same puzzle
3. **Take a Break**: Come back with fresh eyes

### Power-Up Options
1. **Smart Hint** (5⭐): See valid numbers for one cell
2. **Cage Validator** (3⭐): Verify if cage is correct
3. **Undo Plus** (2⭐): Multiple undos for complex backtracking

### Problem-Solving Approach
1. Look for cages with only one possible solution
2. Use row/column constraints to eliminate options
3. Work backwards from completed cages
4. Try both possibilities for 50/50 situations
5. Check if your assumption creates contradictions

---

## 🎮 Adaptive Difficulty

The game automatically adjusts difficulty based on your performance:

### Gets Easier If:
- Taking too long to complete puzzles
- Using many hints
- Making frequent mistakes

### Gets Harder If:
- Completing puzzles quickly
- Achieving many perfect cages
- Not using hints
- Building high combos

This ensures you're always challenged but never frustrated!

---

## 🏅 Achievement Goals

### Completionist
- Complete all difficulty levels
- Finish Fog of War mode
- Achieve 100 perfect cages

### Speedster
- Complete 4×4 puzzle under 2 minutes
- Complete 5×5 puzzle under 5 minutes
- Complete 7×7 puzzle under 15 minutes

### Expert
- Complete Hard puzzle with no hints
- Achieve combo streak of 10+
- Earn 1000 stars

---

## ❓ FAQ

**Q: Can I use the same number twice in a row?**
A: No! Each number must appear exactly once per row and column.

**Q: Do single-cell cages count as completed?**
A: Yes! Place the specified number to complete them.

**Q: Can I change difficulty mid-game?**
A: You'll need to start a new puzzle with different settings.

**Q: What happens if I run out of stars?**
A: Keep playing! You earn stars by completing cages perfectly.

**Q: Does Undo cost anything?**
A: Basic undo is free! Undo Plus power-up gives unlimited undos for 2 minutes.

**Q: Can I save my progress?**
A: Currently progress is saved in your browser session. Cloud save coming soon!

---

## 🎉 Have Fun!

Remember: KenKen is about logical thinking and problem-solving. Don't worry about mistakes - they're part of learning!

**Good luck and happy puzzling!** 🧮✨

---

*For support or questions, refer to the README.md file or check the in-game instructions.*
