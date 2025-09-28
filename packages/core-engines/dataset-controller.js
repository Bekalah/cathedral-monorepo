// Cathedral Dataset Controller - Unified data management with toggle system
// Allows customization and personalization of healing experience

class CathedralDataController {
  constructor() {
    this.datasets = new Map();
    this.activeToggles = new Map();
    this.userProfile = null;
    this.safetyLevel = 'standard';
    this.intensityLevel = 'moderate';
    this.mode = 'intermediate';
    
    this.initializeController();
  }

  async initializeController() {
    await this.loadAllDatasets();
    this.setupDefaultToggles();
    this.initializeSafetySystem();
    
    console.log('🗂️ Cathedral Dataset Controller ready!');
    console.log('📊 All datasets loaded and toggleable');
  }

  // Dataset Loading
  async loadAllDatasets() {
    try {
      // Core datasets
      this.datasets.set('codex_nodes', await this.loadJSON('./data/codex-sample-nodes.json'));
      this.datasets.set('angels_72', await this.loadJSON('./data/angels-72-complete.json'));
      this.datasets.set('alchemy_operations', await this.loadJSON('./data/alchemy-complete.json'));
      this.datasets.set('mystery_house', await this.loadJSON('./data/magical-mystery-house.json'));
      this.datasets.set('portal_network', await this.loadJSON('./data/omniversal-respawn-gates.json'));
      
      // Extended datasets (generated from core data)
      this.datasets.set('sacred_geometry', this.generateSacredGeometry());
      this.datasets.set('crystal_frequencies', this.generateCrystalDatabase());
      this.datasets.set('chakra_system', this.generateChakraSystem());
      this.datasets.set('tarot_integration', this.generateTarotIntegration());
      this.datasets.set('daemon_guardians', this.generateDaemonGuardians());
      this.datasets.set('tara_overlays', this.generateTaraSystem());
      this.datasets.set('reiki_symbols', this.generateReikiSystem());
      
      console.log('✅ All datasets loaded successfully');
    } catch (error) {
      console.error('❌ Error loading datasets:', error);
      this.activateEmergencyMode();
    }
  }

  async loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
  }

  // Toggle System
  setupDefaultToggles() {
    const defaults = {
      // Core healing datasets (always recommended)
      'codex_nodes': true,
      'alchemy_operations': true,
      'crystal_frequencies': true,
      'chakra_system': true,
      
      // Spiritual guidance datasets
      'angels_72': true,
      'tara_overlays': true,
      'reiki_symbols': true,
      
      // Creative and interactive datasets  
      'mystery_house': true,
      'portal_network': true,
      'sacred_geometry': true,
      
      // Advanced datasets (toggleable based on experience)
      'daemon_guardians': false, // Requires readiness for shadow work
      'tarot_integration': true,
      
      // Safety systems (always active)
      'trauma_safeguards': true,
      'grounding_techniques': true,
      'emergency_exits': true
    };

    Object.entries(defaults).forEach(([key, value]) => {
      this.activeToggles.set(key, value);
    });
  }

  // Toggle Controls
  toggleDataset(datasetName, isActive = null) {
    if (isActive === null) {
      // Toggle current state
      isActive = !this.activeToggles.get(datasetName);
    }

    // Safety check - can't disable safety systems
    if (this.isSafetyDataset(datasetName) && !isActive) {
      console.warn(`⚠️ Cannot disable safety dataset: ${datasetName}`);
      return false;
    }

    // Experience level check
    if (this.requiresExperience(datasetName) && !this.hasRequiredExperience(datasetName)) {
      console.warn(`⚠️ Dataset ${datasetName} requires higher experience level`);
      return false;
    }

    this.activeToggles.set(datasetName, isActive);
    this.saveToggles();
    
    console.log(`${isActive ? '✅' : '❌'} ${datasetName}: ${isActive ? 'activated' : 'deactivated'}`);
    return true;
  }

  setMode(mode) {
    const modes = {
      'beginner': {
        datasets: ['codex_nodes', 'angels_72', 'crystal_frequencies', 'mystery_house'],
        intensity: 'gentle',
        safety: 'maximum'
      },
      'intermediate': {
        datasets: ['codex_nodes', 'angels_72', 'alchemy_operations', 'crystal_frequencies', 
                  'chakra_system', 'mystery_house', 'portal_network', 'sacred_geometry'],
        intensity: 'moderate', 
        safety: 'standard'
      },
      'advanced': {
        datasets: 'all',
        intensity: 'deep',
        safety: 'standard'
      },
      'custom': {
        // User defines their own combination
      }
    };

    if (!modes[mode]) {
      console.error(`❌ Unknown mode: ${mode}`);
      return false;
    }

    this.mode = mode;
    const config = modes[mode];

    if (config.datasets === 'all') {
      // Activate all datasets user is ready for
      this.datasets.forEach((data, name) => {
        if (this.hasRequiredExperience(name)) {
          this.activeToggles.set(name, true);
        }
      });
    } else if (Array.isArray(config.datasets)) {
      // Deactivate all first
      this.datasets.forEach((data, name) => {
        this.activeToggles.set(name, false);
      });
      // Activate specified datasets
      config.datasets.forEach(dataset => {
        this.activeToggles.set(dataset, true);
      });
    }

    this.setIntensity(config.intensity);
    this.setSafetyLevel(config.safety);

    console.log(`🎛️ Mode set to: ${mode}`);
    return true;
  }

  setIntensity(level) {
    const validLevels = ['gentle', 'moderate', 'deep', 'advanced'];
    if (!validLevels.includes(level)) {
      console.error(`❌ Invalid intensity level: ${level}`);
      return false;
    }

    this.intensityLevel = level;
    
    // Adjust dataset access based on intensity
    if (level === 'gentle') {
      this.activeToggles.set('daemon_guardians', false);
      this.activeToggles.set('shadow_work_elements', false);
    }

    console.log(`🔥 Intensity set to: ${level}`);
    return true;
  }

  setSafetyLevel(level) {
    const validLevels = ['maximum', 'standard', 'advanced_practitioner'];
    if (!validLevels.includes(level)) {
      console.error(`❌ Invalid safety level: ${level}`);
      return false;
    }

    this.safetyLevel = level;
    
    // Always keep safety systems active
    this.activeToggles.set('trauma_safeguards', true);
    this.activeToggles.set('grounding_techniques', true);
    this.activeToggles.set('emergency_exits', true);

    console.log(`🛡️ Safety level set to: ${level}`);
    return true;
  }

  // Data Access Methods
  getNode(nodeId, includeAllConnections = false) {
    const codexNodes = this.getActiveDataset('codex_nodes');
    if (!codexNodes) return null;

    const node = codexNodes.find(n => n.node_id === nodeId);
    if (!node || !includeAllConnections) return node;

    // Add connections from other active datasets
    const enhanced = { ...node };

    if (this.isActive('angels_72')) {
      enhanced.available_angels = this.getAngelsForNode(nodeId);
    }

    if (this.isActive('alchemy_operations')) {
      enhanced.alchemy_processes = this.getAlchemyForNode(nodeId);
    }

    if (this.isActive('crystal_frequencies')) {
      enhanced.resonant_crystals = this.getCrystalsForNode(nodeId);
    }

    if (this.isActive('sacred_geometry')) {
      enhanced.geometric_patterns = this.getGeometryForNode(nodeId);
    }

    return enhanced;
  }

  getCorrelations(nodeId, datasetTypes = []) {
    const correlations = {};

    if (datasetTypes.length === 0) {
      datasetTypes = Array.from(this.activeToggles.keys()).filter(key => this.isActive(key));
    }

    datasetTypes.forEach(type => {
      switch(type) {
        case 'angels_72':
          correlations.angels = this.getAngelsForNode(nodeId);
          break;
        case 'alchemy_operations':
          correlations.alchemy = this.getAlchemyForNode(nodeId);
          break;
        case 'crystal_frequencies':
          correlations.crystals = this.getCrystalsForNode(nodeId);
          break;
        case 'sacred_geometry':
          correlations.geometry = this.getGeometryForNode(nodeId);
          break;
        case 'tarot_integration':
          correlations.tarot = this.getTarotForNode(nodeId);
          break;
      }
    });

    return correlations;
  }

  searchByHealing(healingNeed) {
    const results = {
      nodes: [],
      angels: [],
      alchemy: [],
      crystals: [],
      practices: []
    };

    // Map healing needs to relevant data
    const healingMap = {
      'anxiety': {
        element: 'Air',
        frequency: '528Hz',
        angels: ['Iezalel', 'Hariel', 'Caliel'],
        crystals: ['Amethyst', 'Lepidolite', 'Blue Lace Agate'],
        alchemy: 'separation'
      },
      'depression': {
        element: 'Water',
        frequency: '639Hz', 
        angels: ['Leuviah', 'Pahaliah', 'Nelchael'],
        crystals: ['Rose Quartz', 'Sunstone', 'Citrine'],
        alchemy: 'fermentation'
      },
      'trauma': {
        element: 'Earth',
        frequency: '396Hz',
        angels: ['Achaiah', 'Cahetel', 'Haziel'],
        crystals: ['Black Tourmaline', 'Smoky Quartz', 'Hematite'],
        alchemy: 'calcination'
      }
    };

    const healing = healingMap[healingNeed.toLowerCase()];
    if (!healing) return results;

    // Find relevant nodes
    if (this.isActive('codex_nodes')) {
      const nodes = this.getActiveDataset('codex_nodes');
      results.nodes = nodes.filter(node => 
        node.element === healing.element || 
        node.sound === healing.frequency ||
        node.teaching_function.toLowerCase().includes(healingNeed.toLowerCase())
      );
    }

    // Find relevant angels
    if (this.isActive('angels_72')) {
      const angels = this.getActiveDataset('angels_72');
      results.angels = angels.filter(angel => 
        healing.angels.includes(angel.name) ||
        angel.element === healing.element ||
        angel.toneHz.toString() === healing.frequency.replace('Hz', '')
      );
    }

    // Find relevant alchemy processes
    if (this.isActive('alchemy_operations')) {
      const alchemy = this.getActiveDataset('alchemy_operations');
      if (alchemy.emotional_alchemy) {
        Object.entries(alchemy.emotional_alchemy).forEach(([key, process]) => {
          if (key.includes(healingNeed.toLowerCase()) || 
              process.frequency === healing.frequency) {
            results.alchemy.push(process);
          }
        });
      }
    }

    return results;
  }

  getDailyFocus(userProfile = null, currentMood = null) {
    // Get appropriate focus for today based on user state
    const focus = {
      primary_node: null,
      supporting_angel: null,
      alchemy_process: null,
      crystal_recommendation: null,
      healing_frequency: null,
      suggested_practice: null
    };

    // Simple algorithm - could be much more sophisticated
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    
    // Cycle through nodes based on day of year
    const nodeId = (dayOfYear % 144) + 1;
    focus.primary_node = this.getNode(nodeId, true);

    if (focus.primary_node && this.isActive('angels_72')) {
      const angels = this.getAngelsForNode(nodeId);
      focus.supporting_angel = angels[0]; // First angel
    }

    return focus;
  }

  // Helper Methods
  isActive(datasetName) {
    return this.activeToggles.get(datasetName) || false;
  }

  getActiveDataset(name) {
    return this.isActive(name) ? this.datasets.get(name) : null;
  }

  getActiveDatasets() {
    const active = {};
    this.activeToggles.forEach((isActive, name) => {
      if (isActive) {
        active[name] = this.datasets.get(name);
      }
    });
    return active;
  }

  isSafetyDataset(datasetName) {
    const safetyDatasets = ['trauma_safeguards', 'grounding_techniques', 'emergency_exits'];
    return safetyDatasets.includes(datasetName);
  }

  requiresExperience(datasetName) {
    const experienceRequired = ['daemon_guardians', 'shadow_work_elements', 'advanced_alchemy'];
    return experienceRequired.includes(datasetName);
  }

  hasRequiredExperience(datasetName) {
    if (!this.userProfile) return this.mode !== 'beginner';
    
    // Check user's experience level and completed integrations
    return this.userProfile.experience_level >= this.getRequiredLevel(datasetName);
  }

  // Emergency and Safety
  activateEmergencyGentleMode() {
    console.warn('🚨 Emergency gentle mode activated');
    
    // Disable all potentially challenging datasets
    this.activeToggles.set('daemon_guardians', false);
    this.activeToggles.set('shadow_work_elements', false);
    this.activeToggles.set('advanced_alchemy', false);
    
    // Enable only gentle, supportive datasets
    this.activeToggles.set('angels_72', true);
    this.activeToggles.set('crystal_frequencies', true);
    this.activeToggles.set('reiki_symbols', true);
    
    this.setIntensity('gentle');
    this.setSafetyLevel('maximum');
    
    // Offer immediate grounding
    this.showGroundingOptions();
  }

  showGroundingOptions() {
    const groundingTechniques = [
      '5-4-3-2-1 sensory grounding',
      'Deep belly breathing with your guardian angel',
      'Hold a grounding crystal (virtually or physically)', 
      'Listen to 396Hz grounding frequency',
      'Visualize roots growing from your feet into the earth'
    ];

    console.log('🌱 Grounding techniques available:');
    groundingTechniques.forEach((technique, index) => {
      console.log(`${index + 1}. ${technique}`);
    });
  }

  // Persistence
  saveToggles() {
    const saveData = {
      toggles: Object.fromEntries(this.activeToggles),
      mode: this.mode,
      intensity: this.intensityLevel,
      safety: this.safetyLevel,
      userProfile: this.userProfile,
      timestamp: Date.now()
    };

    localStorage.setItem('cathedral_dataset_settings', JSON.stringify(saveData));
  }

  loadToggles() {
    const saved = localStorage.getItem('cathedral_dataset_settings');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      
      this.activeToggles = new Map(Object.entries(data.toggles));
      this.mode = data.mode || 'intermediate';
      this.intensityLevel = data.intensity || 'moderate';
      this.safetyLevel = data.safety || 'standard';
      this.userProfile = data.userProfile;

      console.log('📂 Settings loaded from previous session');
    } catch (error) {
      console.error('❌ Error loading settings:', error);
    }
  }

  // Data Generation Methods (for extended datasets)
  generateSacredGeometry() {
    // Generate sacred geometry patterns
    return {
      patterns: [
        { name: 'Flower of Life', healing: 'overall harmony', frequency: '528Hz' },
        { name: 'Metatron\'s Cube', healing: 'protection', frequency: '741Hz' },
        { name: 'Sri Yantra', healing: 'manifestation', frequency: '852Hz' }
        // ... more patterns
      ]
    };
  }

  generateCrystalDatabase() {
    // Generate crystal healing database
    return {
      crystals: [
        { name: 'Clear Quartz', frequency: '963Hz', chakra: 'Crown', healing: 'amplification' },
        { name: 'Rose Quartz', frequency: '639Hz', chakra: 'Heart', healing: 'love_healing' },
        { name: 'Amethyst', frequency: '852Hz', chakra: 'Third Eye', healing: 'intuition' }
        // ... more crystals
      ]
    };
  }

  // Add more generation methods for other datasets...
}

// Global instance
window.Cathedral = new CathedralDataController();

// Convenience methods
window.toggleDataset = (name, active) => Cathedral.toggleDataset(name, active);
window.setMode = (mode) => Cathedral.setMode(mode);
window.getNode = (id, full) => Cathedral.getNode(id, full);
window.searchByHealing = (need) => Cathedral.searchByHealing(need);
window.emergencyMode = () => Cathedral.activateEmergencyGentleMode();

export { CathedralDataController };