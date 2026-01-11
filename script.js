// Game State
let gameState = {
    isRunning: false,
    isPaused: false,
    isUserPaused: false,
    lives: 3,
    progress: 0,
    maxProgress: 5,
    gameSpeed: 150, // pixels per second (was 2 pixels per frame at 60fps = 120 pixels/sec)
    score: 0,
    soundEnabled: false,
    lastLifeLoss: 0,
    lifeLossDelay: 1000 // 1 second delay between losing lives
};

// Frame rate independence variables
let lastFrameTime = performance.now();
const targetFPS = 60;
const frameTime = 1000 / targetFPS;

// Audio context for sound effects
let audioContext;
const sounds = {};

// Initialize audio context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        createSounds();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Create sound effects using Web Audio API
function createSounds() {
    // Jump sound
    sounds.jump = createTone(440, 0.1, 'sine');
    
    // Collect sound
    sounds.collect = createTone(660, 0.2, 'square');
    
    // Game over sound
    sounds.gameOver = createTone(220, 0.5, 'sawtooth');
    
    // Win sound
    sounds.win = createMelody([523, 659, 784, 1047], 0.3);
    
    // Life loss sound - quick, sharp sound
    sounds.lifeLoss = createTone(150, 0.15, 'sawtooth');
}

// Create a simple tone
function createTone(frequency, duration, type = 'sine') {
    return () => {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    };
}

// Create a simple melody
function createMelody(frequencies, noteDuration) {
    return () => {
        if (!audioContext) return;
        
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                createTone(freq, noteDuration, 'triangle')();
            }, index * noteDuration * 1000);
        });
    };
}

// Play sound effect
function playSound(soundName) {
    if (gameState.soundEnabled && sounds[soundName] && audioContext && audioContext.state === 'running') {
        sounds[soundName]();
    }
}

// Toggle audio (enable/disable sound)
function toggleAudio() {
    const audioButton = document.getElementById('enableAudio');
    
    if (!audioContext) {
        // Initialize audio context if not already done
        initAudio();
    }
    
    if (audioContext) {
        if (audioContext.state === 'suspended') {
            // Enable audio
            audioContext.resume();
            audioButton.textContent = '🔊 Sound On';
            audioButton.classList.remove('sound-off');
            audioButton.classList.add('sound-on');
            gameState.soundEnabled = true;
        } else {
            // Disable audio by suspending context
            audioContext.suspend();
            audioButton.textContent = '🔇 Sound Off';
            audioButton.classList.remove('sound-on');
            audioButton.classList.add('sound-off');
            gameState.soundEnabled = false;
        }
    }
}

// Game Objects
let player = {
    x: 50,
    y: 600,
    width: 50,
    height: 50,
    velocityY: 0,
    isJumping: false,
    jumpPower: 14,
    gravity: 0.6,
    groundY: 600,
    scale: 1,
    rotation: 0,
    isFlashing: false,
    flashDuration: 200,
    flashStartTime: 0
};

// Character images
let characterImage = new Image();
let characterJumpImage = new Image();
let characterLifeLostImage = new Image();

// Block images
let blockImages = {};
let destroyedImage = new Image();

let obstacles = [];
let canvas, ctx;

// Animated clouds
let clouds = [
    { x: 100, y: 50, size: 30, speed: 0.2, originalX: 100 },
    { x: 300, y: 80, size: 40, speed: 0.15, originalX: 300 },
    { x: 500, y: 60, size: 25, speed: 0.3, originalX: 500 },
    { x: 700, y: 70, size: 35, speed: 0.25, originalX: 700 },
    { x: 900, y: 45, size: 28, speed: 0.18, originalX: 900 },
    { x: 1100, y: 65, size: 32, speed: 0.22, originalX: 1100 },
    { x: 1300, y: 55, size: 38, speed: 0.12, originalX: 1300 }
];

// Portfolio sections data - in order they should appear
const portfolioSections = [
    { id: 'aboutModal', title: 'About Me', emoji: '👋' },
    { id: 'educationModal', title: 'Education', emoji: '🎓' },
    { id: 'experienceModal', title: 'Experience', emoji: '💼' },
    { id: 'projectsModal', title: 'Projects', emoji: '🚀' },
    { id: 'certificationsModal', title: 'Certifications', emoji: '🏆' }
];

// Block types with different game themes using custom images
const blockTypes = [
    {
        name: 'mario',
        beforeImage: 'resources/mario.png'
    },
    {
        name: 'minecraft',
        beforeImage: 'resources/minecraft.png'
    },
    {
        name: 'sonic',
        beforeImage: 'resources/sonic.png'
    },
    {
        name: 'pacman',
        beforeImage: 'resources/pacman.png'
    }
];

// Initialize game
function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Load character images
    characterImage.onload = function() {
        console.log('Character image loaded successfully');
    };
    characterImage.onerror = function() {
        console.log('Failed to load character image');
    };
    characterImage.src = 'resources/character.png';
    
    characterJumpImage.onload = function() {
        console.log('Character jump image loaded successfully');
    };
    characterJumpImage.onerror = function() {
        console.log('Failed to load character jump image');
    };
    characterJumpImage.src = 'resources/character_jump.png';
    
    characterLifeLostImage.onload = function() {
        console.log('Character life lost image loaded successfully');
    };
    characterLifeLostImage.onerror = function() {
        console.log('Failed to load character life lost image');
    };
    characterLifeLostImage.src = 'resources/character_lifelost.png';
    
    // Load destroyed block image
    destroyedImage.onload = function() {
        console.log('Destroyed block image loaded successfully');
    };
    destroyedImage.onerror = function() {
        console.log('Failed to load destroyed block image');
    };
    destroyedImage.src = 'resources/destroyed.png';
    
    // Load all block images
    blockTypes.forEach(blockType => {
        const img = new Image();
        img.onload = function() {
            console.log(`${blockType.name} block image loaded successfully`);
        };
        img.onerror = function() {
            console.log(`Failed to load ${blockType.name} block image`);
        };
        img.src = blockType.beforeImage;
        blockImages[blockType.name] = img;
    });
    
    // Initialize audio
    initAudio();
    
    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('click', handleTouch);
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('playAgain').addEventListener('click', restartGame);
    document.getElementById('restartGame').addEventListener('click', restartGame);
    document.getElementById('enableAudio').addEventListener('click', toggleAudio);
    document.getElementById('jumpButton').addEventListener('click', handleTouch);
    document.getElementById('pauseButton').addEventListener('click', togglePause);
    document.getElementById('resumeGame').addEventListener('click', resumeGame);
    document.getElementById('menuButton').addEventListener('click', openMenu);
    document.getElementById('closeMenu').addEventListener('click', closeMenu);
    
    // Add event listeners for menu section buttons
    document.querySelectorAll('.menu-section-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionId = e.target.getAttribute('data-section');
            showModal(sectionId);
            // Don't close menu - keep it paused and hidden behind portfolio modal
            document.getElementById('menuModal').style.display = 'none';
        });
    });
    
    // Modal close events
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside (but not for win/game over/pause/menu modals)
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            const modalId = event.target.id;
            // Don't allow closing win, game over, pause, or menu modals by clicking outside
            if (modalId !== 'winModal' && modalId !== 'gameOverModal' && modalId !== 'pauseModal' && modalId !== 'menuModal') {
                closeModal(event);
            }
        }
    });
    
    // Initialize obstacles
    createObstacles();
    
    // Initialize frame time for delta-time calculations
    lastFrameTime = performance.now();
    
    // Start game loop
    gameLoop();
}

// Create obstacles representing portfolio sections
function createObstacles() {
    obstacles = [];
    const obstacleSpacing = 250;
    
    portfolioSections.forEach((section, index) => {
        // Assign blocks in fixed order: Mario → Minecraft → Sonic → Pac-Man → Mario
        const blockOrder = ['mario', 'minecraft', 'sonic', 'pacman', 'mario'];
        const assignedBlockType = blockTypes.find(block => block.name === blockOrder[index]);
        
        obstacles.push({
            x: canvas.width + (index * obstacleSpacing),
            y: player.groundY - 50,
            width: 50,
            height: 50,
            section: section,
            collected: false,
            id: `obstacle_${index}`,
            blockType: assignedBlockType,
            fadeAlpha: 1.0
        });
    });
}

// Handle keyboard input
function handleKeyPress(event) {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
    } else if (event.code === 'KeyP' || event.key === 'p') {
        event.preventDefault();
        togglePause();
    } else if (event.code === 'KeyM' || event.key === 'm') {
        event.preventDefault();
        openMenu();
    }
}

// Handle touch input for mobile
function handleTouch(event) {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    event.preventDefault();
    jump();
}

// Player jump function
function jump() {
    if (!player.isJumping) {
        // Jump power adjusted for good height while still falling quickly
        const jumpPowerPerSecond = 450;
        player.velocityY = -jumpPowerPerSecond;
        player.isJumping = true;
        
        // Jump animation effects
        player.scale = 1.1; // Slightly bigger when jumping
        player.rotation = -0.1; // Slight tilt
        
        playSound('jump');
    }
}

// Start the game
function startGame() {
    gameState.isRunning = true;
    gameState.isPaused = false;
    gameState.lastLifeLoss = 0; // Reset life loss timer
    player.isFlashing = false; // Reset flashing state
    lastFrameTime = performance.now(); // Reset frame timer for accurate deltaTime
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('menuButton').style.display = 'block';
    resetGame();
}

// Restart the game
function restartGame() {
    gameState.isRunning = true;
    gameState.isPaused = false;
    gameState.lives = 3;
    gameState.progress = 0;
    gameState.gameSpeed = 150; // pixels per second
    gameState.lastLifeLoss = 0; // Reset life loss timer
    player.isFlashing = false; // Reset flashing state
    lastFrameTime = performance.now(); // Reset frame timer
    
    // Close all modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    
    // Show pause and menu buttons when restarting
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('pauseButton').textContent = 'PAUSE';
    document.getElementById('menuButton').style.display = 'block';
    
    resetGame();
    updateUI();
}

// Reset game elements
function resetGame() {
    player.x = 50;
    player.y = player.groundY;
    player.velocityY = 0;
    player.isJumping = false;
    
    obstacles.forEach(obstacle => {
        obstacle.collected = false;
    });
    
    createObstacles();
}

// Main game loop
function gameLoop(currentTime) {
    if (gameState.isRunning && !gameState.isPaused) {
        // Calculate delta time for frame-rate independence
        const deltaTime = (currentTime - lastFrameTime) / 1000; // Convert to seconds
        lastFrameTime = currentTime;
        
        // Cap deltaTime to prevent large jumps (e.g., when tab becomes active)
        // Cap to 1/30th of a second (30fps minimum) to prevent physics issues
        const cappedDeltaTime = Math.min(deltaTime, 1/30);
        update(cappedDeltaTime);
        draw();
    } else {
        // Update lastFrameTime even when paused to prevent huge delta when resuming
        lastFrameTime = currentTime;
        // Still draw to show paused state
        if (gameState.isRunning) {
            draw();
        }
    }
    
    requestAnimationFrame(gameLoop);
}

// Update game state
function update(deltaTime) {
    updatePlayer(deltaTime);
    updateObstacles(deltaTime);
    updateClouds(deltaTime);
    checkCollisions();
    checkGameOver();
    // checkWin() is now called when obstacles are collected, not in the main loop
}

// Update player physics
function updatePlayer(deltaTime) {
    // Apply gravity - increased for faster falling
    const gravityPerSecond = 750;
    player.velocityY += gravityPerSecond * deltaTime;
    player.y += player.velocityY * deltaTime;
    
    // Handle flashing effect
    const currentTime = Date.now();
    if (player.isFlashing) {
        const elapsed = currentTime - player.flashStartTime;
        if (elapsed >= player.flashDuration) {
            player.isFlashing = false;
        }
    }
    
    // Animate scale and rotation back to normal (these are visual, keep frame-based is fine)
    if (player.scale > 1) {
        player.scale -= 0.02;
        if (player.scale < 1) player.scale = 1;
    }
    if (player.rotation !== 0) {
        player.rotation *= 0.9; // Smooth rotation back to 0
        if (Math.abs(player.rotation) < 0.01) player.rotation = 0;
    }
    
    // Ground collision
    if (player.y >= player.groundY) {
        player.y = player.groundY;
        player.velocityY = 0;
        player.isJumping = false;
        
        // Landing bounce effect
        player.scale = 0.95;
        player.rotation = 0.05;
    }
}

// Update obstacles
function updateObstacles(deltaTime) {
    obstacles.forEach(obstacle => {
        if (!obstacle.collected) {
            // Move non-collected obstacles (gameSpeed is now in pixels per second)
            obstacle.x -= gameState.gameSpeed * deltaTime;
            
            // Check for missed obstacles (off screen) and respawn them
            if (obstacle.x < -50) {
                // Respawn the obstacle further ahead with minimum distance check
                let newX = canvas.width + Math.random() * 200 + 100;
                
                // Ensure minimum distance from other obstacles
                const minDistance = 200;
                let validPosition = false;
                let attempts = 0;
                
                while (!validPosition && attempts < 10) {
                    validPosition = true;
                    
                    // Check distance from all other obstacles
                    for (let otherObstacle of obstacles) {
                        if (otherObstacle !== obstacle && !otherObstacle.collected) {
                            const distance = Math.abs(newX - otherObstacle.x);
                            if (distance < minDistance) {
                                validPosition = false;
                                newX = canvas.width + Math.random() * 200 + 100;
                                break;
                            }
                        }
                    }
                    attempts++;
                }
                
                obstacle.x = newX;
            }
        }
    });
    
    // Remove collected obstacles that are far off screen to clean up memory
    obstacles = obstacles.filter(obstacle => !obstacle.collected || obstacle.x > -100);
}

// Update cloud positions
function updateClouds(deltaTime) {
    clouds.forEach(cloud => {
        // Move cloud to the left (convert speed to pixels per second: speed * 60)
        const cloudSpeedPerSecond = cloud.speed * 60;
        cloud.x -= cloudSpeedPerSecond * deltaTime;
        
        // Reset cloud position when it goes off screen
        if (cloud.x + cloud.size < 0) {
            cloud.x = canvas.width + cloud.size + Math.random() * 200;
        }
    });
}

// Check collisions
function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (!obstacle.collected) {
            // Check if player is above obstacle (landing on top)
            if (player.x + player.width > obstacle.x &&
                player.x < obstacle.x + obstacle.width &&
                player.y + player.height > obstacle.y &&
                player.y < obstacle.y + obstacle.height) {
                
                // Check if player is landing on top of obstacle
                if (player.velocityY > 0 && player.y < obstacle.y) {
                    // Successful landing - only collect if not already collected
                    if (!obstacle.collected) {
                        obstacle.collected = true;
                        gameState.isPaused = true;
                        
                        // Play collect sound
                        playSound('collect');
                        
                        // Show modal based on order of collection (not obstacle type)
                        const collectedCount = obstacles.filter(obs => obs.collected).length;
                        const sectionToShow = portfolioSections[collectedCount - 1];
                        showModal(sectionToShow.id);
                        updateUI();
                        
                        // Don't check win condition immediately - let the modal show first
                    }
                } else {
                    // Hit obstacle from side or below - lose life
                    loseLife();
                }
            }
        }
    });
}

// Show modal for portfolio section
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

// Close modal and resume game
function closeModal(event) {
    const modal = event.target.closest('.modal');
    if (modal) {
        modal.style.display = 'none';
        
        // Check if we're closing a portfolio modal from the menu
        const portfolioModals = ['aboutModal', 'educationModal', 'experienceModal', 'projectsModal', 'certificationsModal', 'contactModal'];
        const isPortfolioModal = portfolioModals.includes(modal.id);
        
        if (isPortfolioModal && gameState.isUserPaused) {
            // Return to menu instead of resuming game
            document.getElementById('menuModal').style.display = 'block';
            return;
        }
        
        // Resume game if it's not the win modal, game over modal, or menu modal
        if (modal.id !== 'winModal' && modal.id !== 'gameOverModal' && modal.id !== 'menuModal') {
            gameState.isPaused = false;
            
            // Check for win condition after closing a portfolio modal
            setTimeout(() => {
                checkWin();
            }, 50);
        }
    }
}

// Lose a life
function loseLife() {
    const currentTime = Date.now();
    
    // Check if enough time has passed since last life loss
    if (currentTime - gameState.lastLifeLoss < gameState.lifeLossDelay) {
        return; // Don't lose a life if too soon
    }
    
    gameState.lastLifeLoss = currentTime;
    gameState.lives--;
    
    // Start flashing effect
    player.isFlashing = true;
    player.flashStartTime = currentTime;
    
    // Play life loss sound
    playSound('lifeLoss');
    
    updateUI();
    
    if (gameState.lives <= 0) {
        gameOver();
    } else {
        // Reset player position
        player.x = 50;
        player.y = player.groundY;
        player.velocityY = 0;
        player.isJumping = false;
    }
}

// Check for game over
function checkGameOver() {
    if (gameState.lives <= 0) {
        gameOver();
    }
}

// Game over
function gameOver() {
    gameState.isRunning = false;
    playSound('gameOver');
    document.getElementById('gameOverModal').style.display = 'block';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('menuButton').style.display = 'none';
}

// Check for win condition
function checkWin() {
    // Check if all unique obstacles have been collected
    const collectedSections = new Set();
    obstacles.forEach(obstacle => {
        if (obstacle.collected) {
            collectedSections.add(obstacle.section.id);
        }
    });
    
    // Win if we've collected all 5 unique sections
    if (collectedSections.size >= gameState.maxProgress) {
        winGame();
    }
}

// Win game
function winGame() {
    gameState.isRunning = false;
    gameState.isPaused = true;
    playSound('win');
    document.getElementById('winModal').style.display = 'block';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('menuButton').style.display = 'none';
}

// Update UI elements
function updateUI() {
    document.getElementById('livesCount').textContent = gameState.lives;
    
    // Count unique sections collected
    const collectedSections = new Set();
    obstacles.forEach(obstacle => {
        if (obstacle.collected) {
            collectedSections.add(obstacle.section.id);
        }
    });
    
    document.getElementById('progressCount').textContent = collectedSections.size + '/' + gameState.maxProgress;
}

// Pause/Resume functions
function togglePause() {
    if (!gameState.isRunning) return;
    
    if (gameState.isUserPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

function pauseGame() {
    gameState.isPaused = true;
    gameState.isUserPaused = true;
    document.getElementById('pauseModal').style.display = 'block';
    document.getElementById('pauseButton').textContent = 'RESUME';
}

function resumeGame() {
    gameState.isPaused = false;
    gameState.isUserPaused = false;
    document.getElementById('pauseModal').style.display = 'none';
    document.getElementById('pauseButton').textContent = 'PAUSE';
}

// Menu functions
function openMenu() {
    if (!gameState.isRunning) return;
    
    gameState.isPaused = true;
    gameState.isUserPaused = true;
    document.getElementById('menuModal').style.display = 'block';
}

function closeMenu() {
    gameState.isPaused = false;
    gameState.isUserPaused = false;
    document.getElementById('menuModal').style.display = 'none';
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background elements
    drawBackground();
    
    // Draw ground
    drawGround();
    
    // Draw obstacles
    drawObstacles();
    
    // Draw player
    drawPlayer();
    
    // Draw clouds
    drawClouds();
}

// Draw background
function drawBackground() {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.5, '#98FB98');
    gradient.addColorStop(1, '#90EE90');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw ground
function drawGround() {
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, player.groundY + 30, canvas.width, 20);
    
    // Ground border
    ctx.strokeStyle = '#006400';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, player.groundY + 30);
    ctx.lineTo(canvas.width, player.groundY + 30);
    ctx.stroke();
}

// Draw player
function drawPlayer() {
    // Choose which image to use based on jumping state
    const isJumping = player.isJumping || player.y < player.groundY;
    const currentImage = isJumping ? characterJumpImage : characterImage;
    
    if (currentImage.complete && currentImage.naturalWidth !== 0) {
        // Save the current canvas state
        ctx.save();
        
        // Move to player center for transformations
        const centerX = player.x + player.width / 2;
        const centerY = player.y + player.height / 2;
        
        // Apply transformations
        ctx.translate(centerX, centerY);
        ctx.rotate(player.rotation);
        ctx.scale(player.scale, player.scale);
        
        // Handle flashing effect
        if (player.isFlashing) {
            // Draw life lost character image when flashing
            if (characterLifeLostImage.complete && characterLifeLostImage.naturalWidth !== 0) {
                ctx.drawImage(
                    characterLifeLostImage, 
                    -player.width / 2, 
                    -player.height / 2, 
                    player.width, 
                    player.height
                );
            } else {
                // Fallback to red rectangle if image not loaded
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(
                    -player.width / 2, 
                    -player.height / 2, 
                    player.width, 
                    player.height
                );
            }
        } else {
            // Draw character image normally
            ctx.drawImage(
                currentImage, 
                -player.width / 2, 
                -player.height / 2, 
                player.width, 
                player.height
            );
        }
        
        // Restore the canvas state
        ctx.restore();
    } else {
        // Fallback: simple rectangle if image isn't loaded yet
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Add "Loading..." text
        ctx.fillStyle = '#FFF';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Loading...', player.x + player.width/2, player.y + player.height/2);
    }
}

// Draw obstacles
function drawObstacles() {
    obstacles.forEach(obstacle => {
        const blockType = obstacle.blockType;
        const isCollected = obstacle.collected;
        
        // Set alpha for fade effect
        ctx.globalAlpha = obstacle.fadeAlpha;
        
        // Choose which image to draw
        let imageToDraw;
        if (isCollected) {
            imageToDraw = destroyedImage;
        } else {
            imageToDraw = blockImages[blockType.name];
        }
        
        // Draw the image if it's loaded
        if (imageToDraw && imageToDraw.complete && imageToDraw.naturalWidth !== 0) {
            ctx.drawImage(
                imageToDraw,
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );
        } else {
            // Fallback: simple colored rectangle
            ctx.fillStyle = isCollected ? '#8B4513' : '#FFD700';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
        
        // Reset alpha
        ctx.globalAlpha = 1.0;
        
        // Fade out effect for collected blocks
        if (isCollected) {
            obstacle.fadeAlpha -= 0.05;
            if (obstacle.fadeAlpha <= 0) {
                obstacle.fadeAlpha = 0;
            }
        }
    });
}

// Draw clouds
function drawClouds() {
    clouds.forEach(cloud => {
        // Add subtle floating animation
        const floatOffset = Math.sin(Date.now() * 0.001 + cloud.x * 0.01) * 2;
        const currentY = cloud.y + floatOffset;
        
        // Create gradient for more realistic clouds
        const gradient = ctx.createRadialGradient(
            cloud.x, currentY, 0,
            cloud.x, currentY, cloud.size * 1.5
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
        
        ctx.fillStyle = gradient;
        
        // Draw cloud with multiple overlapping circles for more realistic look
        ctx.beginPath();
        
        // Main cloud body
        ctx.arc(cloud.x, currentY, cloud.size, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.6, currentY, cloud.size * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x - cloud.size * 0.6, currentY, cloud.size * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.3, currentY - cloud.size * 0.3, cloud.size * 0.6, 0, Math.PI * 2);
        ctx.arc(cloud.x - cloud.size * 0.3, currentY - cloud.size * 0.3, cloud.size * 0.6, 0, Math.PI * 2);
        ctx.arc(cloud.x, currentY - cloud.size * 0.5, cloud.size * 0.5, 0, Math.PI * 2);
        
        ctx.fill();
        
        // Add subtle shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.arc(cloud.x + 2, currentY + 2, cloud.size * 0.9, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.6 + 2, currentY + 2, cloud.size * 0.7, 0, Math.PI * 2);
        ctx.arc(cloud.x - cloud.size * 0.6 + 2, currentY + 2, cloud.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        // Redraw main cloud on top
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, currentY, cloud.size, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.6, currentY, cloud.size * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x - cloud.size * 0.6, currentY, cloud.size * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.3, currentY - cloud.size * 0.3, cloud.size * 0.6, 0, Math.PI * 2);
        ctx.arc(cloud.x - cloud.size * 0.3, currentY - cloud.size * 0.3, cloud.size * 0.6, 0, Math.PI * 2);
        ctx.arc(cloud.x, currentY - cloud.size * 0.5, cloud.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);
