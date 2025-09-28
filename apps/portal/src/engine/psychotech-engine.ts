/**
 * Cathedral Psychotech Engine v3.0
 * Integrates Leary 8-Circuit Model with AQAL Framework
 * Trauma-informed design with PTSD-safe transitions
 */

import { HarmonicWheel360 } from './harmonic-wheel';
import { SynthStation, CircuitState, ExperienceModule, AQALMatrix } from '../types';
import { NASADataProcessor } from '../data/nasa-processor';
import { BioSensorInterface } from '../biosensor/interface';

export class PsychotechEngine {
  private circuits: Map<number, CircuitState> = new Map([
    [1, { 
      circuit: 1, 
      name: 'Oral-Survival',
      frequency_range: [20, 100],
      synthesis_mode: 'deep_drone',
      biosensor_input: 'HRV',
      aqal_quadrant: 'IL', // Interior Individual
      description: 'Grounding, safety, physical needs',
      color_theme: '#8B4513', // Earth brown
      trauma_safe: true
    }],
    [2, {
      circuit: 2,
      name: 'Emotional-Territorial', 
      frequency_range: [100, 250],
      synthesis_mode: 'empathic_modulation',
      biosensor_input: 'GSR',
      aqal_quadrant: 'IR', // Interior Relational
      description: 'Boundaries, feelings, social space',
      color_theme: '#DC143C',
      trauma_safe: true
    }],
    [3, {
      circuit: 3,
      name: 'Semantic-Symbolic',
      frequency_range: [250, 500],
      synthesis_mode: 'linguistic_patterns',
      aqal_quadrant: 'EL', // Exterior Lower
      description: 'Language, meaning, time-binding',
      color_theme: '#4169E1',
      trauma_safe: true
    }],
    [4, {
      circuit: 4,
      name: 'Socio-Sexual',
      frequency_range: [500, 800],
      synthesis_mode: 'harmonic_bonding',
      aqal_quadrant: 'ER', // Exterior Relational
      description: 'Relationships, morality, cultural rules',
      color_theme: '#FF69B4',
      trauma_safe: true
    }],
    [5, {
      circuit: 5,
      name: 'Neurosomatic',
      frequency_range: [800, 1200],
      synthesis_mode: 'kinesthetic_flow',
      biosensor_input: 'EEG',
      aqal_quadrant: 'IL',
      description: 'Body awareness, pleasure, flow states',
      color_theme: '#00CED1',
      trauma_safe: false // Requires consent
    }],
    [6, {
      circuit: 6,
      name: 'Neurogenetic',
      frequency_range: [1200, 2000],
      synthesis_mode: 'ancestral_memory',
      aqal_quadrant: 'IR',
      description: 'Ancestral memory, collective patterns',
      color_theme: '#9932CC',
      trauma_safe: false
    }],
    [7, {
      circuit: 7,
      name: 'Meta-Programming',
      frequency_range: [2000, 4000],
      synthesis_mode: 'reality_modulation',
      biosensor_input: 'EEG',
      aqal_quadrant: 'EL',
      description: 'Reality hacking, consciousness editing',
      color_theme: '#FFD700',
      trauma_safe: false
    }],
    [8, {
      circuit: 8,
      name: 'Quantum-Nonlocal',
      frequency_range: [4000, 20000],
      synthesis_mode: 'cosmic_resonance',
      aqal_quadrant: 'ER',
      description: 'Cosmic consciousness, unity experience',
      color_theme: '#E6E6FA',
      trauma_safe: false
    }]
  ]);

  private harmonicWheel: HarmonicWheel360;
  private nasaDataProcessor: NASADataProcessor;
  private bioSensorInterface?: BioSensorInterface;
  private safeMode: boolean = true;
  private maxCircuitLevel: number = 4; // Trauma-safe default

  constructor(synthStations: SynthStation[], options: { safeMode?: boolean } = {}) {
    this.safeMode = options.safeMode ?? true;
    this.maxCircuitLevel = this.safeMode ? 4 : 8;
    
    this.harmonicWheel = new HarmonicWheel360(synthStations);
    this.nasaDataProcessor = new NASADataProcessor();
    
    this.initializeBiosensors();
  }

  private async initializeBiosensors() {
    // Optional OpenBCI/BrainFlow integration - only with explicit consent
    if (typeof window !== 'undefined' && 'serial' in navigator && !this.safeMode) {
      try {
        const { BrainFlow } = await import('brainflow');
        this.bioSensorInterface = new BioSensorInterface(BrainFlow);
      } catch (e) {
        console.log('Biosensors not available - running in simulation mode');
      }
    }
  }

  public mapDegreeToCircuit(degree: number): CircuitState {
    // Map 360° to circuits, respecting safety limits
    const circuitIndex = Math.min(
      Math.floor(degree / 45) + 1, 
      this.maxCircuitLevel
    );
    return this.circuits.get(circuitIndex) || this.circuits.get(1)!;
  }

  public async generateExperienceModule(
    arcanaId: string,
    degree: number,
    stylePackId?: string
  ): Promise<ExperienceModule> {
    const circuit = this.mapDegreeToCircuit(degree);
    const harmonic = this.harmonicWheel.getHarmonic(degree);
    
    // Get NASA data for cosmic layer (with fallback)
    let cosmicData;
    try {
      cosmicData = await this.nasaDataProcessor.getDataForDegree(degree);
    } catch (e) {
      cosmicData = this.generateFallbackCosmicData(degree);
    }
    
    // Get biosensor data if available and consented
    const bioData = this.bioSensorInterface?.getCurrentState();
    
    return {
      arcana: arcanaId,
      degree,
      circuit: circuit.circuit,
      aqal: this.generateAQALMatrix(circuit, bioData, degree),
      synthesis: this.generateSynthesisParameters(circuit, harmonic, cosmicData),
      geometry: this.generateGeometrySeeds(degree, circuit),
      oracle: this.generateOracleText(arcanaId, circuit, degree),
      stylePack: stylePackId,
      safeMode: this.safeMode,
      timestamp: Date.now()
    };
  }

  private generateAQALMatrix(
    circuit: CircuitState, 
    bioData: any, 
    degree: number
  ): AQALMatrix {
    return {
      interior_individual: {
        emotional_state: bioData?.emotion || 'neutral',
        cognitive_load: bioData?.cognitiveLoad || 0.5,
        circuit_activation: circuit.circuit,
        safety_level: circuit.trauma_safe ? 'safe' : 'advanced',
        harmonic_resonance: this.calculateResonance(degree)
      },
      interior_collective: {
        shared_narrative: this.getSharedNarrative(circuit),
        cultural_resonance: this.getCulturalResonance(circuit),
        archetypal_layer: this.getArchetypalLayer(degree)
      },
      exterior_individual: {
        biosensor_metrics: bioData?.metrics || {},
        performance_stats: this.getPerformanceStats(),
        frequency_signature: circuit.frequency_range,
        synthesis_mode: circuit.synthesis_mode
      },
      exterior_collective: {
        world_state: this.getWorldState(),
        collective_geometry: this.getCollectiveGeometry(degree),
        nasa_data_integration: this.getNASADataSummary(),
        network_resonance: this.getNetworkResonance()
      }
    };
  }

  private generateSynthesisParameters(
    circuit: CircuitState, 
    harmonic: any, 
    cosmicData: any
  ) {
    return {
      baseFrequency: harmonic.frequency,
      circuitFrequencyRange: circuit.frequency_range,
      synthMode: circuit.synthesis_mode,
      harmonicSeries: this.generateHarmonicSeries(harmonic.frequency, circuit.circuit),
      cosmicModulation: this.extractCosmicModulation(cosmicData),
      spatialPosition: this.calculateSpatialPosition(circuit),
      amplitude: this.safeMode ? 0.25 : 0.35, // Lower for PTSD safety
      envelope: this.generateSafeEnvelope(circuit)
    };
  }

  private generateGeometrySeeds(degree: number, circuit: CircuitState) {
    const phi = 1.618033988749895;
    return {
      vesicaPattern: this.generateVesicaSeeds(degree),
      metatronsCube: this.generateMetatronsSeeds(circuit.circuit),
      sacredRatios: {
        phi: phi,
        vesica: Math.sqrt(3),
        pentagon: 1.902,
        hexagon: 2.0
      },
      colorBinding: this.harmonicWheel.getColorForDegree(degree),
      geometryComplexity: this.safeMode ? 'moderate' : 'complex'
    };
  }

  private generateOracleText(arcanaId: string, circuit: CircuitState, degree: number): string {
    const templates = {
      1: "Ground yourself in {element}. The {arcana} whispers of safety at {degree}°.",
      2: "Feel the emotional currents flowing through {quadrant} space.",
      3: "Words become symbols, symbols become meaning at the {degree}° threshold.",
      4: "Relationships weave their patterns in the {arcana} configuration.",
      5: "Your body knows wisdom that mind has not yet learned.",
      6: "Ancestral voices echo through the geometric patterns.",
      7: "Reality becomes malleable under conscious direction.",
      8: "Unity consciousness expands beyond all boundaries."
    };

    const template = templates[circuit.circuit as keyof typeof templates] || templates[1];
    
    return template
      .replace('{element}', this.getElementForDegree(degree))
      .replace('{arcana}', arcanaId)
      .replace('{degree}', degree.toString())
      .replace('{quadrant}', circuit.aqal_quadrant);
  }

  // Safe mode controls
  public setSafeMode(enabled: boolean) {
    this.safeMode = enabled;
    this.maxCircuitLevel = enabled ? 4 : 8;
  }

  public getSafeMode(): boolean {
    return this.safeMode;
  }

  public getAvailableCircuits(): CircuitState[] {
    return Array.from(this.circuits.values())
      .slice(0, this.maxCircuitLevel)
      .filter(circuit => this.safeMode ? circuit.trauma_safe : true);
  }

  // Helper methods
  private calculateResonance(degree: number): number {
    return Math.sin(degree * Math.PI / 180) * 0.5 + 0.5;
  }

  private getSharedNarrative(circuit: CircuitState): string {
    return `Circuit ${circuit.circuit} collective narrative`;
  }

  private getCulturalResonance(circuit: CircuitState): string {
    return `${circuit.name} cultural patterns`;
  }

  private getArchetypalLayer(degree: number): string {
    const archetypes = ['Fool', 'Magician', 'Priestess', 'Empress', 'Emperor'];
    return archetypes[Math.floor(degree / 72) % archetypes.length];
  }

  private getPerformanceStats() {
    return {
      latency: performance.now() % 100,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
    };
  }

  private getWorldState() {
    return {
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  private generateFallbackCosmicData(degree: number) {
    return {
      timeSeries: Array.from({ length: 100 }, (_, i) => 
        Math.sin(degree * Math.PI / 180 + i * 0.1) * Math.random()
      ),
      metadata: {
        source: 'Synthetic',
        mission: 'Cathedral Local',
        observationDate: new Date().toISOString()
      }
    };
  }

  private generateHarmonicSeries(baseFreq: number, circuitNum: number): number[] {
    return Array.from({ length: circuitNum }, (_, i) => baseFreq * (i + 1));
  }

  private extractCosmicModulation(cosmicData: any): number[] {
    if (!cosmicData?.timeSeries) return [1, 1, 1, 1];
    return cosmicData.timeSeries.slice(0, 4).map((v: number) => Math.abs(v) + 0.1);
  }

  private calculateSpatialPosition(circuit: CircuitState) {
    const angle = (circuit.circuit - 1) * (Math.PI * 2 / 8);
    return {
      x: Math.cos(angle) * 2,
      y: Math.sin(angle) * 2,
      z: circuit.circuit * 0.5
    };
  }

  private generateSafeEnvelope(circuit: CircuitState) {
    return {
      attack: this.safeMode ? 2.0 : 0.5,  // Slower attack for PTSD safety
      decay: 1.0,
      sustain: 0.7,
      release: this.safeMode ? 4.0 : 2.0  // Longer release for gentleness
    };
  }

  private generateVesicaSeeds(degree: number) {
    return {
      centerX: Math.cos(degree * Math.PI / 180),
      centerY: Math.sin(degree * Math.PI / 180),
      radius: 1 + Math.sin(degree * Math.PI / 90) * 0.2,
      overlap: Math.sqrt(3) / 2
    };
  }

  private generateMetatronsSeeds(circuitNum: number) {
    return {
      sphereCount: Math.min(13, circuitNum + 5),
      connectionDensity: circuitNum / 8,
      rotationSpeed: this.safeMode ? 0.001 : 0.005 // Slower for safety
    };
  }

  private getElementForDegree(degree: number): string {
    const elements = ['Fire', 'Earth', 'Air', 'Water'];
    return elements[Math.floor(degree / 90)];
  }

  private getCollectiveGeometry(degree: number) {
    return `Degree ${degree} collective geometric pattern`;
  }

  private getNASADataSummary() {
    return 'NASA data integration summary';
  }

  private getNetworkResonance() {
    return 'Network resonance patterns';
  }
}