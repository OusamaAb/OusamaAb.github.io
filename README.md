# Portfolio Adventure Game 🎮

An interactive portfolio website built as a retro-style platformer game. Instead of a traditional resume, visitors can play a game where jumping on obstacles reveals different sections of my background, education, projects, experience, and certifications.

## About This Project

I've always found traditional resumes boring. So I built this portfolio website as a fun, interactive game that showcases my work while keeping visitors engaged. It combines my love for retro gaming aesthetics with modern web development to create something memorable and unique.

## Features

- **Retro Game Style**: Classic platformer gameplay inspired by Mario and T-Rex Runner games
- **Interactive Portfolio**: Each obstacle represents a different portfolio section
- **5 Portfolio Sections**:
  - About Me (👋)
  - Education & Coursework (🎓)
  - Projects (🚀)
  - Experience (💼)
  - Certifications (🏆)
- **Game Mechanics**: 3 lives, smooth jump physics, and collision detection
- **Sound Effects**: Retro-style audio created with Web Audio API
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Touch Controls**: Mobile-friendly jump button for touch devices
- **Contact Integration**: Win screen with contact information, resume download, and social media links

## How to Play

1. Click "Start Adventure" to begin
2. Use SPACE or ↑ arrow key to jump (or tap on mobile)
3. Land on top of obstacles to unlock portfolio sections
4. Avoid hitting obstacles from the side or below—you'll lose a life!
5. Collect all 5 portfolio sections to win
6. Access contact information and resume download after completing the game

You can also click the MENU button at any time to browse portfolio sections directly without playing the game.

## Technical Stack

I built this project using:

- **HTML5 Canvas**: For the game rendering and graphics
- **Vanilla JavaScript (ES6+)**: Custom game engine with physics, collision detection, and game state management
- **CSS3**: Modern styling with CSS variables, flexbox, and responsive design
- **Web Audio API**: For generating retro-style sound effects programmatically
- **Google Fonts**: Press Start 2P for that authentic retro gaming feel

The codebase is clean, well-organized, and follows modern JavaScript best practices. All game logic is contained in a single JavaScript file, making it easy to understand and modify.

## Project Structure

```
Portfolio Website/
├── index.html          # Main HTML structure and portfolio content
├── styles.css          # All styling and responsive design
├── script.js           # Game engine and logic
├── resources/          # Game assets (character images, block sprites, resume, certificates)
└── README.md           # This file
```

## Customization

This project is open source and available for others to use. Here are some areas you might want to customize:

### Personal Information

Update the portfolio sections in `index.html`:
- **About Me**: Personal introduction and story
- **Education**: University, degree, coursework
- **Experience**: Job history with detailed bullet points
- **Projects**: Your projects with descriptions and GitHub links
- **Certifications**: Your certifications and credentials

### Contact Information

Update the contact links in the win screen modal with your:
- Email address
- GitHub profile
- LinkedIn profile
- Resume PDF file path

### Game Settings

In `script.js`, you can adjust:
- `gameState.gameSpeed`: Speed of obstacles (default: 2)
- `player.jumpPower`: Jump height (default: 14)
- `player.gravity`: Falling speed (default: 0.6)
- `gameState.lives`: Number of lives (default: 3)

### Styling

The color scheme and styling can be customized in `styles.css`:
- CSS variables are defined at the top for easy theme changes
- Button colors, modal styles, and responsive breakpoints are all adjustable
- The game canvas background gradient can be modified to match your preferences

## Browser Compatibility

This project works on:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Game Mechanics

The game uses a custom physics engine built with JavaScript:
- **Player Movement**: Gravity-based physics with jumping mechanics
- **Collision Detection**: Pixel-perfect collision detection for obstacle interaction
- **State Management**: Tracks game state, lives, progress, and player position
- **Animation**: Smooth animations for player movement, clouds, and visual effects
- **Modal System**: Pause and resume functionality for reading portfolio content

## Design Philosophy

I wanted to create something that stands out from typical portfolio websites. This project combines:

- **Retro Gaming Nostalgia**: The pixelated font and simple graphics evoke classic arcade games
- **Modern Web Development**: Clean code, responsive design, and accessibility considerations
- **Interactive Storytelling**: Each obstacle tells part of my professional story
- **Memorable Experience**: Visitors remember the interaction, not just the content

## Deployment

To deploy this project:

1. Upload all files to your web server or hosting platform
2. Ensure all resources (images, PDFs) are in the correct directories
3. Update all personal information and links
4. Test thoroughly on different devices and browsers
5. Share your unique portfolio with the world!

## License

This project is open source and available under the MIT License. Feel free to use it, modify it, and make it your own.

## Contact

If you have questions about this project or want to connect:

- **Email**: OusamaHAlabdullah@gmail.com
- **GitHub**: [@OusamaAb](https://github.com/OusamaAb)
- **LinkedIn**: [Ousama Alabdullah](https://linkedin.com/in/ousama-alabdullah)

---

**Thanks for checking out my portfolio! Hope you enjoyed the game.** 🎯
