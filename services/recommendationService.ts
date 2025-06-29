// services/recommendationService.ts
export interface Recommendation {
  id: string;
  type: 'transport' | 'food' | 'energy' | 'waste';
  title: string;
  description: string;
  impact: string;
  savings: number; // kg CO2e
  icon: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

export interface UserData {
  dailyEmissions: number;
  location: string;
  preferences: string[];
  transportMode: string;
  dietType: string;
}

class RecommendationService {
  private recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'transport',
      title: 'Gunakan transportasi umum hari ini!',
      description: 'Transportasi bensin: normal 3.2 kg CO2e dibanding naik mobil',
      impact: 'Hemat: 2.1 kg CO2e',
      savings: 2.1,
      icon: '🚌',
      priority: 'high',
      actionable: true
    },
    {
      id: '2',
      type: 'food',
      title: 'Coba menu vegan untuk makan siang',
      description: 'Makan plant-based menurunkan jejak karbon hingga',
      impact: 'Hemat: 1.8 kg CO2e',
      savings: 1.8,
      icon: '🥗',
      priority: 'high',
      actionable: true
    },
    {
      id: '3',
      type: 'energy',
      title: 'Matikan perangkat elektronik yang tidak digunakan',
      description: 'Standby power consumption bisa mencapai 10% dari total penggunaan listrik',
      impact: 'Hemat: 0.8 kg CO2e',
      savings: 0.8,
      icon: '💡',
      priority: 'medium',
      actionable: true
    },
    {
      id: '4',
      type: 'waste',
      title: 'Bawa botol minum sendiri',
      description: 'Hindari botol plastik sekali pakai yang menghasilkan emisi tinggi',
      impact: 'Hemat: 0.3 kg CO2e',
      savings: 0.3,
      icon: '♻️',
      priority: 'medium',
      actionable: true
    },
    {
      id: '5',
      type: 'transport',
      title: 'Kombinasikan perjalanan untuk efisiensi',
      description: 'Gabungkan beberapa tujuan dalam satu perjalanan',
      impact: 'Hemat: 1.2 kg CO2e',
      savings: 1.2,
      icon: '🗺️',
      priority: 'medium',
      actionable: true
    }
  ];

  // Simulasi AI recommendation berdasarkan data user
  generateRecommendations(userData: UserData): Recommendation[] {
    const currentHour = new Date().getHours();
    const isWorkingHours = currentHour >= 8 && currentHour <= 17;
    const isEvening = currentHour >= 17 && currentHour <= 21;
    
    let filteredRecommendations = [...this.recommendations];

    // Filter berdasarkan waktu
    if (isWorkingHours) {
      // Prioritaskan transport dan energy saving
      filteredRecommendations = filteredRecommendations.filter(r => 
        r.type === 'transport' || r.type === 'energy'
      );
    } else if (isEvening) {
      // Prioritaskan food dan energy
      filteredRecommendations = filteredRecommendations.filter(r => 
        r.type === 'food' || r.type === 'energy'
      );
    }

    // Filter berdasarkan emisi harian user
    if (userData.dailyEmissions > 7) {
      // Jika emisi tinggi, prioritaskan high impact recommendations
      filteredRecommendations = filteredRecommendations.filter(r => 
        r.priority === 'high' || r.savings > 1.0
      );
    }

    // Filter berdasarkan preferensi transport
    if (userData.transportMode === 'car') {
      filteredRecommendations = filteredRecommendations.filter(r => 
        r.type !== 'transport' || r.title.includes('transportasi umum')
      );
    }

    // Sort berdasarkan savings dan priority
    filteredRecommendations.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const scoreA = a.savings + priorityWeight[a.priority];
      const scoreB = b.savings + priorityWeight[b.priority];
      return scoreB - scoreA;
    });

    // Return top 2 recommendations
    return filteredRecommendations.slice(0, 2);
  }

  // Simulasi tracking action
  async trackAction(recommendationId: string): Promise<boolean> {
    // Simulasi API call untuk tracking
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Action tracked for recommendation: ${recommendationId}`);
        resolve(true);
      }, 500);
    });
  }
}

export const recommendationService = new RecommendationService();