// Living Digital Grimoire House Navigation System
// Fable-style interactive exploration with trauma-informed safety

class MagicalMysteryHouse {
  constructor() {
    this.currentRoom = 'respawn_gate';
    this.chosenAngel = null;
    this.houseFamiliar = new DigitalCat('Mystique');
    this.healingProgress = new Map();
    this.unlockedRooms = new Set(['respawn_gate']);
    this.housePersonality = new HouseSpirit();
    this.safetyNet = new TraumaInformedSafety();
  }

  async initializeHouse() {
    const houseData = await this.loadHouseStructure();
    const codexNodes = await this.loadCodexNodes();
    const angels = await this.loadAngels();
    
    this.setupPortalDoors(houseData);
    this.initializeRoomExperiences(houseData);
    this.startAmbientMagic();
    
    console.log('🏰 Welcome to your Magical Mystery House! ✨');
    this.showEntranceRiddle();
  }

  showEntranceRiddle() {
    const riddle = "What has 144 rooms but only 99 doors, holds all wisdom yet weighs nothing, and grows stronger when shared?";
    
    this.displayMagicalText({
      text: riddle,
      style: 'golden_runes',
      effect: 'shimmer',
      voiceOver: 'mystical_whisper'
    });
    
    // The answer unlocks the house exploration
    this.waitForAnswer(['your heart', 'consciousness', 'love', 'wisdom', 'healing']);
  }

  enterRoom(roomId) {
    const room = this.houseStructure.house_sections[roomId];
    if (!room) return;
    
    // Trauma-informed check
    if (this.safetyNet.needsGrounding()) {
      this.offerGroundingTechniques();
      return;
    }
    
    this.currentRoom = roomId;
    this.renderRoom(room);
    this.startRoomExperience(room);
    this.housePersonality.adaptToMood();
  }

  renderRoom(room) {
    // Clear previous room
    this.clearCanvas();
    
    // Render with Fable-style whimsical 3D
    this.scene = new THREE.Scene();
    this.setupRoomEnvironment(room);
    this.addInteractiveElements(room.interactive_elements);
    this.startAmbientEffects(room);
    
    // Add magical navigation hints
    this.showAvailablePortals();
    this.houseFamiliar.appear();
  }

  setupRoomEnvironment(room) {
    switch(room.id) {
      case 'respawn_gate':
        this.createShimmeringPortal();
        this.addMirrorOfReflection();
        this.addAngelSelectionCircle();
        break;
        
      case 'codex_sanctum':
        this.createFloatingBooks();
        this.addSpiralStaircase();
        this.addScryingPool();
        break;
        
      case 'transmutation_chamber':
        this.createAlchemyLab();
        this.addEmotionCauldron();
        this.addElementForges();
        break;
        
      case 'reiki_sanctuary':
        this.createPeacefulChapel();
        this.addQuanYinStatue();
        this.addHealingAltar();
        break;
        
      case 'divination_den':
        this.createMysticalParlor();
        this.addLivingTarotDeck();
        this.addDestinyWeaver();
        break;
        
      case 'pattern_recognition_dome':
        this.createCrystallineDome();
        this.addGeometryProjector();
        this.addFrequencyVisualizer();
        break;
        
      case 'shadow_integration_wing':
        this.createWiseSanctuary();
        this.addDaemonCouncil();
        this.addIntegrationSpace();
        break;
        
      case 'vibrational_healing_grotto':
        this.createCrystalCave();
        this.addSingingCrystals();
        this.addChakraPool();
        break;
        
      case 'creation_studio':
        this.createWorkshop();
        this.addMagicalQuill();
        this.addProgressTree();
        break;
        
      case 'integration_sanctuary':
        this.createBloomingGarden();
        this.addHealingTimeline();
        this.addWisdomTree();
        break;
    }
  }

  // Interactive Elements
  addMirrorOfReflection() {
    const mirror = new InteractiveMirror({
      position: [0, 1.5, -2],
      onLookAt: () => this.showEmotionalGeometry(),
      codexNodes: [1, 8, 15, 22, 29, 36]
    });
    
    mirror.onActivate = () => {
      this.displaySacredGeometry(this.getCurrentEmotionalState());
      this.playHealingTone(528); // Love frequency
    };
    
    this.scene.add(mirror);
  }

  addFloatingBooks() {
    for (let i = 1; i <= 144; i++) {
      const book = new FloatingGrimoire({
        nodeId: i,
        position: this.calculateSpiralPosition(i),
        glowIntensity: this.getWisdomLevel(i),
        onOpen: () => this.revealNodeWisdom(i)
      });
      
      book.behavior = {
        float: true,
        pulseWithHeartbeat: true,
        respondsToApproach: true,
        whisperSecrets: true
      };
      
      this.scene.add(book);
    }
  }

  addEmotionCauldron() {
    const cauldron = new AlchemicalCauldron({
      position: [0, 0.5, 0],
      capacity: 'infinite',
      operations: this.alchemyOperations
    });
    
    cauldron.onUse = (emotion, operation) => {
      this.transformEmotion(emotion, operation);
      this.showAlchemicalProcess();
      this.rewardWisdom();
    };
    
    this.scene.add(cauldron);
  }

  addQuanYinStatue() {
    const statue = new LivingStatue({
      deity: 'quan_yin',
      arms: 1000, // Thousand-armed compassion
      position: [0, 2, -1],
      onPray: () => this.receiveCompassionateGuidance()
    });
    
    statue.voice = {
      tone: 'infinitely_compassionate',
      wisdom: 'trauma_informed_buddhist',
      responses: this.loadTaraWisdom()
    };
    
    this.scene.add(statue);
  }

  addLivingTarotDeck() {
    const deck = new LivingTarotDeck({
      cards: 78,
      behavior: 'leap_and_whisper',
      onDraw: (cards) => this.interpretReading(cards),
      specialLayouts: [
        'past_life_regression',
        'trauma_healing_spread',
        'integration_guidance',
        'shadow_work_safe'
      ]
    });
    
    this.scene.add(deck);
  }

  addSingingCrystals() {
    const crystalTypes = [
      'clear_quartz', 'amethyst', 'rose_quartz', 'citrine',
      'hematite', 'moonstone', 'carnelian', 'aquamarine'
    ];
    
    crystalTypes.forEach((type, index) => {
      const crystal = new SingingCrystal({
        type: type,
        frequency: this.getHealingFrequency(type),
        position: this.calculateCrystalPosition(index),
        onTouch: () => this.receiveCrystalHealing(type)
      });
      
      this.scene.add(crystal);
    });
  }

  // Safety and Grounding
  offerGroundingTechniques() {
    const techniques = [
      '5-4-3-2-1 sensory grounding',
      'Butterfly hug self-soothing',
      'Rainbow breathing with your angel',
      'Safe place visualization',
      'Connect with house familiar'
    ];
    
    this.showSafetyMenu(techniques);
  }

  // House Personality Evolution
  evolveHousePersonality() {
    const progress = Array.from(this.healingProgress.values());
    const totalWisdom = progress.reduce((sum, val) => sum + val, 0);
    
    if (totalWisdom > 1000) {
      this.housePersonality.level = 'wise_elder';
      this.unlockLegacyRooms();
    } else if (totalWisdom > 500) {
      this.housePersonality.level = 'compassionate_guide';
      this.addSeasonalTransformations();
    } else {
      this.housePersonality.level = 'nurturing_friend';
    }
  }

  // Portal Magic
  showAvailablePortals() {
    this.unlockedRooms.forEach(roomId => {
      if (roomId !== this.currentRoom) {
        const portal = new MagicalPortal({
          destination: roomId,
          readinessCheck: () => this.checkReadiness(roomId),
          onClick: () => this.enterRoom(roomId)
        });
        
        this.scene.add(portal);
      }
    });
  }

  // Wisdom Integration
  integrateWisdom(nodeId, insight) {
    const currentLevel = this.healingProgress.get(nodeId) || 0;
    this.healingProgress.set(nodeId, currentLevel + 1);
    
    // Trigger house evolution
    this.evolveHousePersonality();
    
    // Unlock new areas
    this.checkForNewUnlocks();
    
    // Celebrate integration
    this.celebrateWisdom(insight);
  }

}

// Digital Cat Familiar - Your wise house companion
class DigitalCat {
  constructor(name) {
    this.name = name;
    this.wisdom = 'ancient_feline';
    this.personality = 'mysteriously_helpful';
  }
  
  appear() {
    // Materializes with sparkles
    this.showHelpfulHints();
  }
  
  showSecretPassage() {
    // Reveals hidden doors when stuck
  }
  
  purr() {
    // Healing frequencies through purring
    this.playFrequency(50); // Cat purr healing frequency
  }
}

// Initialize the magical house when page loads
window.addEventListener('load', async () => {
  const mysteryHouse = new MagicalMysteryHouse();
  await mysteryHouse.initializeHouse();
  
  // Connect to global healing network
  mysteryHouse.connectToHealingCircle();
});

export { MagicalMysteryHouse };