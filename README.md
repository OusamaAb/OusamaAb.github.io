# Portfolio Adventure Game 🎮

An interactive portfolio website built as a retro-style platformer game! Jump over obstacles to learn about the developer's background, education, projects, experience, and certifications.

## 🎯 Features

- **Retro Game Style**: Mario/T-Rex inspired platformer gameplay
- **Interactive Portfolio**: Each obstacle represents a different section of your portfolio
- **5 Portfolio Sections**:
  - About Me (👋)
  - Education & Coursework (🎓)
  - Projects (🚀)
  - Experience (💼)
  - Certifications (🏆)
- **Game Mechanics**: 3 lives, jump mechanics, collision detection
- **Sound Effects**: Retro-style audio using Web Audio API
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Touch Controls**: Mobile-friendly jump button for touch devices
- **Win Screen**: Contact information, resume download, and social media links

## 🚀 How to Play

1. **Start**: Click "Start Adventure" to begin
2. **Jump**: Use SPACE, ↑ arrow key, or click/tap to jump
3. **Land on Obstacles**: Jump on top of obstacles to read portfolio sections
4. **Avoid Collisions**: Don't hit obstacles from the side or below (you'll lose a life)
5. **Complete All Sections**: Collect all 5 portfolio sections to win
6. **Contact**: After winning, access contact information and resume download

## 📝 Customization Guide

### 1. Personal Information

Update the following sections in `index.html`:

#### About Me Section
```html
<div class="portfolio-content">
    <p>Hello! I'm [Your Name], a passionate developer...</p>
    <p>Add your personal story, interests, and what makes you unique!</p>
</div>
```

#### Education Section
```html
<h3>[Your University Name]</h3>
<p><strong>Degree:</strong> [Your Degree]</p>
<p><strong>Graduation:</strong> [Your Graduation Year]</p>
<p><strong>GPA:</strong> [Your GPA]</p>
```

#### Projects Section
```html
<div class="project">
    <h3>[Project Name]</h3>
    <p>[Project description and what you learned]</p>
    <p><strong>Technologies:</strong> [Technologies used]</p>
</div>
```

#### Experience Section
```html
<div class="experience">
    <h3>[Job Title] - [Company Name]</h3>
    <p><strong>Duration:</strong> [Start Date] - [End Date]</p>
    <ul>
        <li>[Key achievement or responsibility]</li>
        <li>[Another key achievement]</li>
    </ul>
</div>
```

#### Certifications Section
```html
<div class="certification">
    <h3>[Certification Name]</h3>
    <p><strong>Issuing Organization:</strong> [Organization]</p>
    <p><strong>Date:</strong> [Date]</p>
    <p><strong>Credential ID:</strong> [ID if applicable]</p>
</div>
```

### 2. Contact Information

Update the contact links in the win screen:

```html
<a href="mailto:your.email@example.com" class="contact-btn email">📧 Email Me</a>
<a href="https://github.com/yourusername" target="_blank" class="contact-btn github">💻 GitHub</a>
<a href="https://linkedin.com/in/yourusername" target="_blank" class="contact-btn linkedin">💼 LinkedIn</a>
<a href="resume.pdf" download class="contact-btn resume">📄 Download Resume</a>
```

### 3. Resume File

1. Add your resume PDF file to the project root
2. Name it `resume.pdf` or update the link in the HTML

### 4. Customization Options

#### Game Difficulty
In `script.js`, you can adjust:
```javascript
// Make game easier/harder
gameState.gameSpeed = 2; // Increase for faster obstacles
player.jumpPower = 12; // Increase for higher jumps
player.gravity = 0.6; // Increase for faster falling
```

#### Colors and Styling
In `styles.css`, customize:
- Background colors in the `#gameCanvas` and body gradients
- Player color: `#FF6B6B`
- Obstacle color: `#8B4513`
- Button colors: `#4CAF50`

#### Sound Effects
In `script.js`, modify the `createSounds()` function to change:
- Jump sound frequency and duration
- Collect sound frequency and duration
- Game over and win sounds

## 🛠️ Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Game Engine**: Custom-built using HTML5 Canvas
- **Audio**: Web Audio API for retro sound effects
- **Responsive**: CSS Grid and Flexbox for mobile compatibility
- **Font**: Press Start 2P (Google Fonts) for retro aesthetic

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Philosophy

The game combines:
- **Retro Gaming Aesthetics**: Pixelated fonts, simple graphics, classic game mechanics
- **Modern Web Standards**: Responsive design, accessibility, clean code
- **Interactive Storytelling**: Each obstacle reveals part of your professional story
- **Gamification**: Makes portfolio browsing engaging and memorable

## 🚀 Deployment

1. Upload all files to your web server
2. Ensure `resume.pdf` is in the root directory
3. Update all personal information and links
4. Test on different devices and browsers

## 🎮 Game Mechanics

- **Player**: Red circle with person emoji
- **Obstacles**: Brown blocks with section emojis
- **Physics**: Gravity, jumping, collision detection
- **Lives System**: 3 lives before game over
- **Progress Tracking**: Visual progress indicator
- **Pause System**: Game pauses when reading portfolio sections

## 💡 Tips for Success

1. **Customize Thoroughly**: Replace all placeholder content with your real information
2. **Test Extensively**: Try the game on different devices and browsers
3. **Optimize Resume**: Keep your PDF resume under 2MB for fast loading
4. **Update Regularly**: Keep your projects and experience current
5. **Share Widely**: The unique format will make you memorable to employers!

## 📄 License

This project is open source and available under the MIT License.

---

**Happy coding and good luck with your job search!** 🎯
