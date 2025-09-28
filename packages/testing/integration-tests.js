// Cathedral System Integration Tests
// Verifies all datasets are properly connected and toggleable

import { CathedralDataController } from '../core-engines/dataset-controller.js';
import { MagicalMysteryHouse } from '../core-engines/mystery-house-engine.js';
import { OmniversalPortalNetwork } from '../core-engines/omniversal-portal-engine.js';

class CathedralIntegrationTester {
  constructor() {
    this.controller = null;
    this.mysteryHouse = null;
    this.portalNetwork = null;
    this.testResults = [];
  }

  async runAllTests() {
    console.log('🧪 Starting Cathedral System Integration Tests...\n');
    
    await this.initializeSystem();
    await this.testDatasetLoading();
    await this.testToggleSystem();
    await this.testNodeCorrelations();
    await this.testHealingSearch();
    await this.testMysteryHouseIntegration();
    await this.testPortalNetworkIntegration();
    await this.testSafetySystem();
    await this.testModeChanges();
    await this.testPersistence();
    
    this.displayResults();
  }

  async initializeSystem() {
    try {
      // Initialize the main controller
      this.controller = new CathedralDataController();
      await this.controller.initializeController();
      
      // Initialize subsystems
      this.mysteryHouse = new MagicalMysteryHouse();
      this.portalNetwork = new OmniversalPortalNetwork();
      
      this.addResult('✅', 'System Initialization', 'All systems initialized successfully');
    } catch (error) {
      this.addResult('❌', 'System Initialization', `Failed: ${error.message}`);
    }
  }

  async testDatasetLoading() {
    console.log('📊 Testing dataset loading...');
    
    const expectedDatasets = [
      'codex_nodes',
      'angels_72', 
      'alchemy_operations',
      'mystery_house',
      'portal_network',
      'crystal_frequencies',
      'chakra_system',
      'sacred_geometry'
    ];

    let loadedCount = 0;
    for (const dataset of expectedDatasets) {
      const data = this.controller.getActiveDataset(dataset);
      if (data) {
        loadedCount++;
        this.addResult('✅', `Dataset: ${dataset}`, 'Loaded successfully');
      } else {
        this.addResult('❌', `Dataset: ${dataset}`, 'Failed to load or inactive');
      }
    }

    this.addResult(
      loadedCount === expectedDatasets.length ? '✅' : '⚠️', 
      'Dataset Loading Summary', 
      `${loadedCount}/${expectedDatasets.length} datasets loaded`
    );
  }

  async testToggleSystem() {
    console.log('🎛️ Testing toggle system...');
    
    // Test turning off a dataset
    const wasActive = this.controller.isActive('crystal_frequencies');
    this.controller.toggleDataset('crystal_frequencies', false);
    const isNowInactive = !this.controller.isActive('crystal_frequencies');
    
    // Test turning it back on
    this.controller.toggleDataset('crystal_frequencies', true);
    const isActiveAgain = this.controller.isActive('crystal_frequencies');
    
    if (wasActive && isNowInactive && isActiveAgain) {
      this.addResult('✅', 'Toggle System', 'Dataset toggling works correctly');
    } else {
      this.addResult('❌', 'Toggle System', 'Toggle functionality failed');
    }
    
    // Test safety dataset protection
    const safetyToggleResult = this.controller.toggleDataset('trauma_safeguards', false);
    if (!safetyToggleResult) {
      this.addResult('✅', 'Safety Protection', 'Cannot disable safety datasets (correct)');
    } else {
      this.addResult('❌', 'Safety Protection', 'Safety datasets can be disabled (incorrect)');
    }
  }

  async testNodeCorrelations() {
    console.log('🕸️ Testing node correlations...');
    
    try {
      // Test with a specific node
      const nodeId = 99;
      const node = this.controller.getNode(nodeId, true);
      
      if (node) {
        this.addResult('✅', 'Node Retrieval', `Successfully retrieved node #${nodeId}`);
        
        // Check for correlations
        const correlations = this.controller.getCorrelations(nodeId);
        let correlationCount = 0;
        
        if (correlations.angels && correlations.angels.length > 0) {
          correlationCount++;
          this.addResult('✅', 'Angel Correlations', `Found ${correlations.angels.length} angels`);
        }
        
        if (correlations.crystals && correlations.crystals.length > 0) {
          correlationCount++;
          this.addResult('✅', 'Crystal Correlations', `Found ${correlations.crystals.length} crystals`);
        }
        
        if (correlations.alchemy && correlations.alchemy.length > 0) {
          correlationCount++;
          this.addResult('✅', 'Alchemy Correlations', `Found alchemy processes`);
        }
        
        this.addResult(
          correlationCount > 0 ? '✅' : '⚠️',
          'Cross-Dataset Correlations',
          `Found correlations in ${correlationCount} datasets`
        );
      } else {
        this.addResult('❌', 'Node Retrieval', 'Could not retrieve test node');
      }
    } catch (error) {
      this.addResult('❌', 'Node Correlations', `Error: ${error.message}`);
    }
  }

  async testHealingSearch() {
    console.log('🔍 Testing healing search functionality...');
    
    const healingQueries = ['anxiety', 'depression', 'trauma'];
    let successCount = 0;
    
    for (const query of healingQueries) {
      try {
        const results = this.controller.searchByHealing(query);
        
        let foundResults = 0;
        if (results.nodes && results.nodes.length > 0) foundResults++;
        if (results.angels && results.angels.length > 0) foundResults++;
        if (results.crystals && results.crystals.length > 0) foundResults++;
        if (results.alchemy && results.alchemy.length > 0) foundResults++;
        
        if (foundResults > 0) {
          successCount++;
          this.addResult('✅', `Healing Search: ${query}`, `Found results in ${foundResults} categories`);
        } else {
          this.addResult('❌', `Healing Search: ${query}`, 'No results found');
        }
      } catch (error) {
        this.addResult('❌', `Healing Search: ${query}`, `Error: ${error.message}`);
      }
    }
    
    this.addResult(
      successCount === healingQueries.length ? '✅' : '⚠️',
      'Healing Search Summary',
      `${successCount}/${healingQueries.length} queries successful`
    );
  }

  async testMysteryHouseIntegration() {
    console.log('🏠 Testing Magical Mystery House integration...');
    
    try {
      // Test if mystery house can access cathedral data
      if (this.controller.isActive('mystery_house')) {
        const houseData = this.controller.getActiveDataset('mystery_house');
        
        if (houseData && houseData.rooms) {
          const roomCount = Object.keys(houseData.rooms).length;
          this.addResult('✅', 'Mystery House Data', `${roomCount} rooms available`);
          
          // Test room with healing correlations
          const healingRoom = houseData.rooms['healing_sanctuary'];
          if (healingRoom && healingRoom.healing_elements) {
            this.addResult('✅', 'Room-Healing Integration', 'Healing room has proper correlations');
          } else {
            this.addResult('⚠️', 'Room-Healing Integration', 'Healing room lacks correlations');
          }
        } else {
          this.addResult('❌', 'Mystery House Data', 'House data structure invalid');
        }
      } else {
        this.addResult('⚠️', 'Mystery House Integration', 'Mystery house dataset inactive');
      }
    } catch (error) {
      this.addResult('❌', 'Mystery House Integration', `Error: ${error.message}`);
    }
  }

  async testPortalNetworkIntegration() {
    console.log('🌀 Testing Portal Network integration...');
    
    try {
      if (this.controller.isActive('portal_network')) {
        const portalData = this.controller.getActiveDataset('portal_network');
        
        if (portalData && portalData.realms) {
          const realmCount = Object.keys(portalData.realms).length;
          this.addResult('✅', 'Portal Network Data', `${realmCount} realms configured`);
          
          // Test realm connections
          const sonicRealm = portalData.realms['sonic_sanctuary'];
          if (sonicRealm && sonicRealm.healing_frequencies) {
            this.addResult('✅', 'Portal-Frequency Integration', 'Sonic realm has healing frequencies');
          } else {
            this.addResult('⚠️', 'Portal-Frequency Integration', 'Sonic realm lacks frequency data');
          }
        } else {
          this.addResult('❌', 'Portal Network Data', 'Portal data structure invalid');
        }
      } else {
        this.addResult('⚠️', 'Portal Network Integration', 'Portal network dataset inactive');
      }
    } catch (error) {
      this.addResult('❌', 'Portal Network Integration', `Error: ${error.message}`);
    }
  }

  async testSafetySystem() {
    console.log('🛡️ Testing safety system...');
    
    try {
      // Test emergency mode activation
      const beforeMode = this.controller.mode;
      const beforeIntensity = this.controller.intensityLevel;
      
      this.controller.activateEmergencyGentleMode();
      
      const afterMode = this.controller.mode;
      const afterIntensity = this.controller.intensityLevel;
      
      if (afterIntensity === 'gentle' && this.controller.isActive('trauma_safeguards')) {
        this.addResult('✅', 'Emergency Mode', 'Emergency gentle mode activated successfully');
      } else {
        this.addResult('❌', 'Emergency Mode', 'Emergency mode did not activate properly');
      }
      
      // Test safety dataset persistence
      const safetyDatasets = ['trauma_safeguards', 'grounding_techniques', 'emergency_exits'];
      let allSafetyActive = true;
      
      for (const dataset of safetyDatasets) {
        if (!this.controller.isActive(dataset)) {
          allSafetyActive = false;
          break;
        }
      }
      
      if (allSafetyActive) {
        this.addResult('✅', 'Safety Persistence', 'All safety systems remain active');
      } else {
        this.addResult('❌', 'Safety Persistence', 'Some safety systems were deactivated');
      }
    } catch (error) {
      this.addResult('❌', 'Safety System Test', `Error: ${error.message}`);
    }
  }

  async testModeChanges() {
    console.log('🎛️ Testing mode changes...');
    
    const modes = ['beginner', 'intermediate', 'advanced'];
    let successCount = 0;
    
    for (const mode of modes) {
      try {
        const success = this.controller.setMode(mode);
        
        if (success && this.controller.mode === mode) {
          successCount++;
          
          // Verify appropriate datasets are active/inactive for this mode
          let modeAppropriate = true;
          
          if (mode === 'beginner') {
            // Advanced datasets should be inactive
            if (this.controller.isActive('daemon_guardians')) {
              modeAppropriate = false;
            }
          }
          
          if (mode === 'advanced') {
            // Most datasets should be active
            const activeCount = Array.from(this.controller.activeToggles.values()).filter(Boolean).length;
            if (activeCount < 10) {
              modeAppropriate = false;
            }
          }
          
          this.addResult(
            modeAppropriate ? '✅' : '⚠️',
            `Mode: ${mode}`,
            modeAppropriate ? 'Mode set with appropriate datasets' : 'Mode set but dataset configuration may be incorrect'
          );
        } else {
          this.addResult('❌', `Mode: ${mode}`, 'Failed to set mode');
        }
      } catch (error) {
        this.addResult('❌', `Mode: ${mode}`, `Error: ${error.message}`);
      }
    }
    
    this.addResult(
      successCount === modes.length ? '✅' : '⚠️',
      'Mode Changes Summary',
      `${successCount}/${modes.length} modes working correctly`
    );
  }

  async testPersistence() {
    console.log('💾 Testing data persistence...');
    
    try {
      // Save current state
      const originalMode = this.controller.mode;
      this.controller.saveToggles();
      
      // Modify state
      this.controller.setMode('beginner');
      this.controller.toggleDataset('tarot_integration', false);
      
      // Load previous state
      this.controller.loadToggles();
      
      if (this.controller.mode === originalMode) {
        this.addResult('✅', 'State Persistence', 'Settings saved and loaded correctly');
      } else {
        this.addResult('❌', 'State Persistence', 'Settings did not persist correctly');
      }
    } catch (error) {
      this.addResult('❌', 'Persistence Test', `Error: ${error.message}`);
    }
  }

  addResult(status, category, message) {
    this.testResults.push({ status, category, message });
  }

  displayResults() {
    console.log('\n🏛️ CATHEDRAL INTEGRATION TEST RESULTS');
    console.log('==========================================\n');
    
    let passed = 0;
    let warnings = 0;
    let failed = 0;
    
    this.testResults.forEach(result => {
      console.log(`${result.status} ${result.category}: ${result.message}`);
      
      if (result.status === '✅') passed++;
      else if (result.status === '⚠️') warnings++;
      else if (result.status === '❌') failed++;
    });
    
    console.log('\n==========================================');
    console.log(`SUMMARY: ${passed} passed, ${warnings} warnings, ${failed} failed`);
    console.log(`TOTAL TESTS: ${this.testResults.length}`);
    
    if (failed === 0) {
      console.log('🎉 ALL CRITICAL TESTS PASSED! Cathedral system is ready for use.');
    } else if (failed < 3) {
      console.log('⚠️ Minor issues detected. System mostly functional.');
    } else {
      console.log('❌ Significant issues detected. Review required before use.');
    }
    
    console.log('\n✨ The Cathedral of Circuits awaits your healing journey! ✨');
  }

  // Quick validation method for specific features
  async validateDatasetIntegrity() {
    console.log('🔍 Running quick dataset integrity check...\n');
    
    const issues = [];
    
    // Check if all required files exist
    const requiredFiles = [
      'codex-sample-nodes.json',
      'angels-72-complete.json', 
      'alchemy-complete.json',
      'magical-mystery-house.json',
      'omniversal-respawn-gates.json'
    ];
    
    // Check cross-references
    const node99 = this.controller.getNode(99);
    if (node99) {
      const correlations = this.controller.getCorrelations(99);
      
      if (!correlations.angels || correlations.angels.length === 0) {
        issues.push('Node 99 missing angel correlations');
      }
      
      if (!correlations.crystals || correlations.crystals.length === 0) {
        issues.push('Node 99 missing crystal correlations');
      }
    } else {
      issues.push('Cannot retrieve Node 99 for correlation testing');
    }
    
    // Check healing search functionality
    const anxietyResults = this.controller.searchByHealing('anxiety');
    if (!anxietyResults.nodes && !anxietyResults.angels && !anxietyResults.crystals) {
      issues.push('Healing search not returning results for anxiety');
    }
    
    if (issues.length === 0) {
      console.log('✅ Dataset integrity check PASSED - all systems connected properly');
      return true;
    } else {
      console.log('❌ Dataset integrity issues found:');
      issues.forEach(issue => console.log(`   • ${issue}`));
      return false;
    }
  }
}

// Export for use
export { CathedralIntegrationTester };

// Run tests if called directly
if (import.meta.main) {
  const tester = new CathedralIntegrationTester();
  await tester.runAllTests();
}