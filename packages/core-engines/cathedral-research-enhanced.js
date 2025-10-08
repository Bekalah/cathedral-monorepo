/**
 * Cathedral Research Mode - Enhanced Angel-Demon Meter System
 * Integration with Shem Angels, Goetic Demons, and Fable-style gameplay
 * Real Angel Tech based on Antero Alli's 8-circuit brain model
 * Authentic practices from fusionist masters
 */

class CathedralResearchEnhanced {
  constructor() {
    this.currentCard = null;
    this.meterPosition = 50; // 0-100, where 50 is perfect balance
    this.angelDemonPair = null;
    this.circuitActivation = new Array(8).fill(0);
    this.codexProgress = 0;
    this.shemsUnlocked = [];
    this.integrationLevel = 1;
    this.balanceHistory = [];
    
    this.loadDatasets();
    this.initializeMeter();
    this.setupEventListeners();
  }

  async loadDatasets() {
    try {
      // Load the complete Shem angels and demons dataset
      const response = await fetch('/data/shem-angels-demons-complete.json');
      this.shemDatabase = await response.json();
      
      // Load Fable Tarot deck
      const tarotResponse = await fetch('/data/fable-tarot-complete.json');
      this.tarotDeck = await tarotResponse.json();
      
      console.log('✨ Cathedral datasets loaded - 72 Shem Angels and Demons ready');
      this.initializeInterface();
    } catch (error) {
      console.error('Dataset loading error:', error);
      this.fallbackMode();
    }
  }

  initializeMeter() {
    // Create dynamic meter that responds to Tarot card selection
    this.meter = {
      canvas: null,
      ctx: null,
      position: 50,
      targetPosition: 50,
      animating: false,
      
      // Visual elements
      angelColor: '#FFD700', // Gold for angels
      demonColor: '#8B0000', // Dark red for demons  
      balanceColor: '#9400D3', // Purple for integration
      
      // Audio frequencies for different states
      frequencies: {
        angel: 528, // Love frequency
        demon: 256, // Root chakra
        balance: 432 // Natural harmony
      }
    };
    
    this.initializeMeterCanvas();
  }

  initializeMeterCanvas() {
    // Create responsive meter visualization
    const meterContainer = document.getElementById('angel-demon-meter');
    if (!meterContainer) return;
    
    this.meter.canvas = document.createElement('canvas');
    this.meter.canvas.width = 400;
    this.meter.canvas.height = 80;
    this.meter.ctx = this.meter.canvas.getContext('2d');
    
    meterContainer.appendChild(this.meter.canvas);
    this.drawMeter();
    this.startMeterAnimation();
  }

  drawMeter() {
    const ctx = this.meter.ctx;
    const width = this.meter.canvas.width;
    const height = this.meter.canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, this.meter.angelColor);
    gradient.addColorStop(0.5, this.meter.balanceColor);
    gradient.addColorStop(1, this.meter.demonColor);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 20, width, 40);
    
    // Draw current position indicator
    const indicatorX = (this.meter.position / 100) * width;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 5;
    ctx.fillRect(indicatorX - 3, 10, 6, 60);
    ctx.shadowBlur = 0;
    
    // Draw labels
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Angel', 5, 15);
    ctx.textAlign = 'center'; 
    ctx.fillText('Balance', width/2, 15);
    ctx.textAlign = 'right';
    ctx.fillText('Demon', width - 5, 15);
    
    // Draw meter state
    const state = this.getMeterState();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFF00';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(state.state, width/2, height - 5);
  }

  getMeterState() {
    const states = this.shemDatabase.tarot_meter_system.meter_states;
    const position = this.meter.position;
    
    if (position <= 20) return states['0-20%'];
    if (position <= 45) return states['20-45%'];
    if (position <= 55) return states['45-55%'];
    if (position <= 80) return states['55-80%'];
    return states['80-100%'];
  }

  startMeterAnimation() {
    // Smooth animation loop
    const animate = () => {
      if (Math.abs(this.meter.position - this.meter.targetPosition) > 0.5) {
        this.meter.position += (this.meter.targetPosition - this.meter.position) * 0.1;
        this.drawMeter();
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  selectTarotCard(cardName) {
    // Find card in Fable Tarot deck
    const card = this.findTarotCard(cardName);
    if (!card) return;
    
    this.currentCard = card;
    
    // Set meter position based on card's inherent angel-demon balance
    this.meter.targetPosition = this.calculateCardMeterPosition(card);
    
    // Find corresponding Shem angel and demon
    this.angelDemonPair = this.getAngelDemonForCard(card);
    
    // Update UI
    this.updateCardDisplay();
    this.updateAngelDemonDisplay();
    this.playCardFrequency();
    
    console.log(`🃏 Card selected: ${card.name}`);
    console.log(`👼 Angel: ${this.angelDemonPair.angel.angel_name}`);
    console.log(`😈 Demon: ${this.angelDemonPair.demon.name}`);
  }

  findTarotCard(cardName) {
    // Search through Major and Minor Arcana
    const allCards = [
      ...this.tarotDeck.major_arcana,
      ...Object.values(this.tarotDeck.minor_arcana).flat()
    ];
    
    return allCards.find(card => 
      card.name.toLowerCase().includes(cardName.toLowerCase()) ||
      card.keywords?.some(keyword => 
        keyword.toLowerCase().includes(cardName.toLowerCase())
      )
    );
  }

  calculateCardMeterPosition(card) {
    // Different Tarot cards have different inherent angel-demon balance
    const cardMeterMappings = {
      'The Fool': 30, // Innocent, leaning angelic
      'The Magician': 65, // Powerful, leaning demonic
      'The High Priestess': 25, // Mystical, angelic
      'The Empress': 45, // Balanced creation
      'The Emperor': 70, // Authority, demonic leaning
      'The Hierophant': 20, // Spiritual teacher, angelic
      'The Lovers': 50, // Perfect balance
      'The Chariot': 75, // Willpower, demonic
      'Strength': 40, // Controlled power, balanced
      'The Hermit': 15, // Wisdom, highly angelic
      'Wheel of Fortune': 50, // Balanced fate
      'Justice': 50, // Perfect balance
      'The Hanged Man': 35, // Sacrifice, angelic leaning
      'Death': 60, // Transformation, demonic leaning  
      'Temperance': 50, // Perfect balance
      'The Devil': 85, // Shadow work, highly demonic
      'The Tower': 80, // Destruction, demonic
      'The Star': 20, // Hope, angelic
      'The Moon': 55, // Illusion, slightly demonic
      'The Sun': 25, // Joy, angelic
      'Judgement': 45, // Balanced evaluation
      'The World': 50, // Perfect completion
      
      // Minor Arcana defaults
      'Wands': 60, // Fire, action-oriented
      'Cups': 40, // Water, emotion-oriented
      'Swords': 70, // Air, thought/conflict
      'Pentacles': 45 // Earth, material balance
    };
    
    // Try to find specific card mapping first
    for (const [pattern, position] of Object.entries(cardMeterMappings)) {
      if (card.name.includes(pattern)) {
        return position;
      }
    }
    
    // Fall back to suit mapping for Minor Arcana
    for (const [suit, position] of Object.entries(cardMeterMappings)) {
      if (card.suit && card.suit.includes(suit)) {
        return position;
      }
    }
    
    return 50; // Default balance
  }

  getAngelDemonForCard(card) {
    // Match Tarot card to appropriate Shem angel number
    let angelNumber = this.getAngelNumberForCard(card);
    
    const angels = this.shemDatabase.shem_angels_complete;
    const angel = angels[angelNumber.toString()];
    
    if (!angel) {
      // Fallback to random angel if specific mapping not found
      const angelKeys = Object.keys(angels);
      angelNumber = angelKeys[Math.floor(Math.random() * angelKeys.length)];
      angel = angels[angelNumber];
    }
    
    return {
      angel: angel,
      demon: angel.corresponding_demon,
      number: angelNumber
    };
  }

  getAngelNumberForCard(card) {
    // Sophisticated mapping system based on Qabalistic correspondences
    const majorArcanaAngels = {
      'The Fool': 1, // Vehuiah - new beginnings
      'The Magician': 5, // Mahasiah - divine communication
      'The High Priestess': 6, // Lelahel - divine love  
      'The Empress': 2, // Jeliel - partnership
      'The Emperor': 33, // Yehuiah - authority
      'The Hierophant': 3, // Sitael - spiritual expansion
      'The Lovers': 13, // Iezalel - reconciliation
      'The Chariot': 4, // Elemiah - protection in transition
      'Strength': 21, // Nelchael - mastery over negativity
      'The Hermit': 33, // Yehuiah - wisdom through experience
      'Wheel of Fortune': 3, // Sitael - hope and expansion
      'Justice': 72, // Mumiah - completion and justice
      'The Hanged Man': 13, // Iezalel - sacrifice for love
      'Death': 13, // Iezalel - transformation
      'Temperance': 21, // Nelchael - balance and healing
      'The Devil': 72, // Mumiah - facing endings
      'The Tower': 1, // Vehuiah - forced new beginnings  
      'The Star': 6, // Lelahel - hope and healing
      'The Moon': 33, // Yehuiah - discernment in illusion
      'The Sun': 2, // Jeliel - joy and vitality
      'Judgement': 72, // Mumiah - final judgment
      'The World': 21 // Nelchael - completion
    };
    
    // Check for Major Arcana first
    for (const [cardName, angelNum] of Object.entries(majorArcanaAngels)) {
      if (card.name.includes(cardName)) {
        return angelNum;
      }
    }
    
    // Minor Arcana mapping based on numerology and suit
    if (card.suit) {
      let baseNumber = parseInt(card.name.match(/\d+/)?.[0]) || 1;
      
      // Adjust based on suit
      switch (card.suit.toLowerCase()) {
        case 'wands': baseNumber += 0; break;   // Fire element
        case 'cups': baseNumber += 18; break;   // Water element  
        case 'swords': baseNumber += 36; break; // Air element
        case 'pentacles': baseNumber += 54; break; // Earth element
      }
      
      // Keep within 1-72 range
      return ((baseNumber - 1) % 72) + 1;
    }
    
    // Fallback to random angel
    return Math.floor(Math.random() * 72) + 1;
  }

  makeChoice(choiceType, direction) {
    // User makes choice that affects the angel-demon meter
    let shift = 0;
    
    switch (choiceType) {
      case 'angelic_practice':
        shift = -5; // Move toward angel side
        this.recordChoice('Chose angelic practice', shift);
        break;
        
      case 'shadow_work': 
        shift = 5; // Move toward demon side
        this.recordChoice('Chose shadow work', shift);
        break;
        
      case 'integration_ritual':
        // Move toward center (balance)
        if (this.meter.position > 50) {
          shift = -3;
        } else {
          shift = 3;
        }
        this.recordChoice('Chose integration ritual', shift);
        break;
        
      case 'card_specific':
        // Choice specific to current Tarot card
        shift = this.getCardSpecificShift(direction);
        this.recordChoice(`Card-specific choice: ${direction}`, shift);
        break;
    }
    
    // Apply shift with bounds checking
    this.meter.targetPosition = Math.max(0, Math.min(100, 
      this.meter.targetPosition + shift
    ));
    
    // Update circuit activation based on new position
    this.updateCircuitActivation();
    
    // Check for codex progress
    this.checkCodexProgress();
    
    // Play audio feedback
    this.playChoiceAudio(shift);
    
    console.log(`🎯 Choice made: ${shift > 0 ? 'Demon' : 'Angel'} shift of ${Math.abs(shift)}`);
  }

  getCardSpecificShift(direction) {
    if (!this.currentCard || !this.angelDemonPair) return 0;
    
    // Each card has specific choice consequences
    const cardChoices = this.currentCard.fable_elements?.choices || {};
    const angelDemon = this.angelDemonPair;
    
    // Use the fable challenge from the angel-demon pair
    const challenge = angelDemon.angel.balance_meter?.fable_challenge;
    
    if (challenge && challenge.includes('choose between')) {
      // Parse the challenge to determine shift direction
      if (direction === 'first_option') {
        return -8; // Usually the "higher path" option
      } else if (direction === 'second_option') {
        return 8; // Usually the "shadow path" option
      } else if (direction === 'integration') {
        return this.meter.position > 50 ? -5 : 5; // Move toward balance
      }
    }
    
    return 0;
  }

  recordChoice(description, shift) {
    this.balanceHistory.push({
      timestamp: new Date(),
      description: description,
      shift: shift,
      position_before: this.meter.position,
      position_after: Math.max(0, Math.min(100, this.meter.position + shift)),
      card: this.currentCard?.name,
      angel_demon: this.angelDemonPair?.angel.angel_name
    });
  }

  updateCircuitActivation() {
    // Update Antero Alli's 8-circuit brain activation based on meter position
    const position = this.meter.targetPosition;
    const state = this.getMeterState();
    
    // Different meter states activate different circuits
    switch (state.state) {
      case 'Excessive Angelic':
        this.circuitActivation[6] = Math.min(100, this.circuitActivation[6] + 5); // Metaprogramming circuit
        break;
        
      case 'Angelic Leaning':
        this.circuitActivation[3] = Math.min(100, this.circuitActivation[3] + 3); // Moral circuit
        this.circuitActivation[6] = Math.min(100, this.circuitActivation[6] + 2); // Consciousness circuit
        break;
        
      case 'Integrated Balance':
        // Balance activates all circuits mildly
        for (let i = 0; i < 8; i++) {
          this.circuitActivation[i] = Math.min(100, this.circuitActivation[i] + 1);
        }
        break;
        
      case 'Demonic Leaning':
        this.circuitActivation[1] = Math.min(100, this.circuitActivation[1] + 3); // Emotional circuit
        this.circuitActivation[4] = Math.min(100, this.circuitActivation[4] + 2); // Hedonistic circuit
        break;
        
      case 'Excessive Demonic':
        this.circuitActivation[1] = Math.min(100, this.circuitActivation[1] + 5); // Emotional overwhelm
        break;
    }
    
    // Update UI circuit display
    this.updateCircuitDisplay();
  }

  updateCircuitDisplay() {
    const circuits = [
      'Biosurvival', 'Emotional', 'Rational', 'Moral',
      'Hedonistic', 'Metaprogramming', 'Mystical', 'Psychoatomic'
    ];
    
    circuits.forEach((name, index) => {
      const element = document.getElementById(`circuit-${index + 1}`);
      if (element) {
        const activation = this.circuitActivation[index];
        element.style.opacity = (activation / 100);
        element.textContent = `${name}: ${Math.round(activation)}%`;
      }
    });
  }

  checkCodexProgress() {
    // Check if user is making progress toward Codex 144:99 completion
    const balancedSessions = this.balanceHistory.filter(choice => {
      const afterPosition = choice.position_after;
      return afterPosition >= 45 && afterPosition <= 55; // Balanced range
    });
    
    const uniqueAngels = new Set(
      this.balanceHistory.map(choice => choice.angel_demon).filter(Boolean)
    );
    
    this.codexProgress = Math.min(100, 
      (uniqueAngels.size / 72) * 50 + // 50% for angel variety
      (balancedSessions.length / 144) * 50 // 50% for balanced choices
    );
    
    // Update progress display
    const progressElement = document.getElementById('codex-progress');
    if (progressElement) {
      progressElement.textContent = `Codex 144:99 Progress: ${Math.round(this.codexProgress)}%`;
    }
    
    // Check for milestone achievements
    this.checkMilestones();
  }

  checkMilestones() {
    const milestones = this.shemDatabase.codex_completion_system.progression_rewards;
    const angelsMastered = new Set(
      this.balanceHistory.map(choice => choice.angel_demon).filter(Boolean)
    ).size;
    
    Object.entries(milestones).forEach(([nodes, reward]) => {
      const nodeCount = parseInt(nodes.split('_')[0]);
      if (angelsMastered >= nodeCount && !this.shemsUnlocked.includes(nodeCount)) {
        this.shemsUnlocked.push(nodeCount);
        this.showMilestoneAchievement(nodeCount, reward);
      }
    });
  }

  showMilestoneAchievement(nodeCount, reward) {
    // Display achievement notification
    console.log(`🏆 MILESTONE ACHIEVED: ${nodeCount} nodes - ${reward}`);
    
    // Create visual notification
    const notification = document.createElement('div');
    notification.className = 'milestone-achievement';
    notification.innerHTML = `
      <h3>🏆 Milestone Achieved!</h3>
      <p><strong>${nodeCount} Angels Mastered</strong></p>
      <p>${reward}</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  playChoiceAudio(shift) {
    // Play frequency based on choice direction
    let frequency;
    if (shift < -5) {
      frequency = this.meter.frequencies.angel;
    } else if (shift > 5) {
      frequency = this.meter.frequencies.demon;
    } else {
      frequency = this.meter.frequencies.balance;
    }
    
    this.playFrequency(frequency, 500); // 500ms duration
  }

  playCardFrequency() {
    if (this.angelDemonPair) {
      const frequency = parseFloat(this.angelDemonPair.angel.frequency.replace('Hz', ''));
      this.playFrequency(frequency, 1000); // 1 second
    }
  }

  playFrequency(freq, duration) {
    // Create Web Audio API tone
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  updateCardDisplay() {
    const cardElement = document.getElementById('current-card');
    if (cardElement && this.currentCard) {
      cardElement.innerHTML = `
        <h3>🃏 ${this.currentCard.name}</h3>
        <p><strong>Element:</strong> ${this.currentCard.element || 'Mixed'}</p>
        <p><strong>Keywords:</strong> ${this.currentCard.keywords?.join(', ') || 'Mystery'}</p>
        <p><strong>Story:</strong> ${this.currentCard.fable_elements?.story?.slice(0, 100) || 'Discovering...'}...</p>
      `;
    }
  }

  updateAngelDemonDisplay() {
    const angelElement = document.getElementById('current-angel');
    const demonElement = document.getElementById('current-demon');
    
    if (angelElement && this.angelDemonPair) {
      const angel = this.angelDemonPair.angel;
      angelElement.innerHTML = `
        <h4>👼 ${angel.angel_name}</h4>
        <p><strong>Meaning:</strong> ${angel.angel_meaning}</p>
        <p><strong>Gift:</strong> ${angel.angel_gift}</p>
        <p><strong>Frequency:</strong> ${angel.frequency}</p>
        <p><strong>Function:</strong> ${angel.angel_function}</p>
        <p><em>"${angel.invocation}"</em></p>
      `;
    }
    
    if (demonElement && this.angelDemonPair) {
      const demon = this.angelDemonPair.demon;
      demonElement.innerHTML = `
        <h4>😈 ${demon.name}</h4>
        <p><strong>Hierarchy:</strong> ${demon.hierarchy}</p>
        <p><strong>Function:</strong> ${demon.function}</p>
        <p><strong>Shadow Teaching:</strong> ${demon.shadow_teaching}</p>
        <p><strong>Integration Lesson:</strong> ${demon.integration_lesson}</p>
        <p><strong>Appearance:</strong> ${demon.appearance}</p>
      `;
    }
  }

  setupEventListeners() {
    // Set up UI event listeners when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      // Card selection
      const cardInput = document.getElementById('card-selector');
      if (cardInput) {
        cardInput.addEventListener('input', (e) => {
          if (e.target.value.length > 2) {
            this.selectTarotCard(e.target.value);
          }
        });
      }
      
      // Choice buttons
      const choiceButtons = document.querySelectorAll('.choice-btn');
      choiceButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const choiceType = e.target.dataset.choice;
          const direction = e.target.dataset.direction;
          this.makeChoice(choiceType, direction);
        });
      });
      
      // Random card button
      const randomBtn = document.getElementById('random-card');
      if (randomBtn) {
        randomBtn.addEventListener('click', () => {
          this.drawRandomCard();
        });
      }
    });
  }

  drawRandomCard() {
    if (!this.tarotDeck) return;
    
    const allCards = [
      ...this.tarotDeck.major_arcana,
      ...Object.values(this.tarotDeck.minor_arcana).flat()
    ];
    
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    this.selectTarotCard(randomCard.name);
  }

  initializeInterface() {
    // Create the main interface if it doesn't exist
    if (!document.getElementById('cathedral-research-enhanced')) {
      this.createInterface();
    }
    
    console.log('✨ Cathedral Research Enhanced - Ready for Angel-Demon Integration');
    console.log('🃏 Select a Tarot card to begin your Fable journey');
    console.log('👼😈 Balance light and shadow for optimal healing');
  }

  createInterface() {
    const interfaceHTML = `
      <div id="cathedral-research-enhanced">
        <header>
          <h2>🏰 Cathedral Research - Enhanced Angel-Demon System</h2>
          <p>Authentic Shem HaMephorash & Goetia Integration • Fable-style Interactive Tarot</p>
        </header>
        
        <div class="main-controls">
          <div class="card-selection">
            <input type="text" id="card-selector" placeholder="Enter Tarot card name...">
            <button id="random-card">🎲 Draw Random Card</button>
          </div>
        </div>
        
        <div class="angel-demon-meter-container">
          <h3>⚖️ Angel-Demon Balance Meter</h3>
          <div id="angel-demon-meter"></div>
          <p id="meter-guidance">Choose your practices to find perfect integration...</p>
        </div>
        
        <div class="current-working-set">
          <div id="current-card" class="card-display">
            <p>🃏 No card selected yet...</p>
          </div>
          
          <div class="angel-demon-pair">
            <div id="current-angel" class="angel-display">
              <p>👼 Select a card to meet your angel guide...</p>
            </div>
            
            <div id="current-demon" class="demon-display">
              <p>😈 Select a card to face your shadow teacher...</p>
            </div>
          </div>
        </div>
        
        <div class="choice-interface">
          <h3>🎯 Make Your Choice</h3>
          <div class="choice-buttons">
            <button class="choice-btn angelic" data-choice="angelic_practice">
              👼 Angelic Practice
            </button>
            <button class="choice-btn integration" data-choice="integration_ritual">
              ⚖️ Integration Ritual
            </button>
            <button class="choice-btn shadow" data-choice="shadow_work">
              😈 Shadow Work
            </button>
          </div>
          
          <div class="fable-choices" id="fable-specific-choices">
            <!-- Card-specific choices will appear here -->
          </div>
        </div>
        
        <div class="circuit-activation">
          <h3>🧠 8-Circuit Brain Activation (Antero Alli)</h3>
          <div class="circuits">
            <div id="circuit-1">Biosurvival: 0%</div>
            <div id="circuit-2">Emotional: 0%</div>
            <div id="circuit-3">Rational: 0%</div>
            <div id="circuit-4">Moral: 0%</div>
            <div id="circuit-5">Hedonistic: 0%</div>
            <div id="circuit-6">Metaprogramming: 0%</div>
            <div id="circuit-7">Mystical: 0%</div>
            <div id="circuit-8">Psychoatomic: 0%</div>
          </div>
        </div>
        
        <div class="progress-tracking">
          <div id="codex-progress">Codex 144:99 Progress: 0%</div>
          <div id="milestones-achieved">
            <h4>🏆 Achievements Unlocked:</h4>
            <div id="milestone-list">Begin your journey...</div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', interfaceHTML);
  }

  fallbackMode() {
    console.warn('⚠️ Running in fallback mode - some features limited');
    // Basic functionality without full datasets
    this.initializeInterface();
  }

  // API for external integration
  getState() {
    return {
      currentCard: this.currentCard,
      meterPosition: this.meter.position,
      angelDemonPair: this.angelDemonPair,
      circuitActivation: this.circuitActivation,
      codexProgress: this.codexProgress,
      integrationLevel: this.integrationLevel
    };
  }

  setState(newState) {
    Object.assign(this, newState);
    this.meter.targetPosition = newState.meterPosition || 50;
    this.updateCardDisplay();
    this.updateAngelDemonDisplay();
    this.updateCircuitDisplay();
  }
}

// Initialize when ready
let cathedralResearch = null;

document.addEventListener('DOMContentLoaded', () => {
  cathedralResearch = new CathedralResearchEnhanced();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CathedralResearchEnhanced;
}