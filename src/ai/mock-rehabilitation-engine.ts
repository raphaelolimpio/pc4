/**
 * Mock Rehabilitation Engine
 * Generates personalized rehabilitation activity suggestions without external APIs
 * Works entirely locally with no Firebase or Google AI dependencies
 */

export interface SuggestedActivity {
  id: string
  name: string
  description: string
  difficulty: 'baixa' | 'média' | 'alta'
  difficultyTypes: ('motor' | 'cognitivo' | 'atividades')[]
  duration: string
  frequency: string
  instructions: string[]
  benefits: string[]
}

export interface RehabilitationPlan {
  suggestedActivities: SuggestedActivity[]
  overallRecommendation: string
  notes: string
}

// Base de dados de atividades locais - sem dependência de API
const ACTIVITY_DATABASE: Record<string, SuggestedActivity> = {
  'motor_1': {
    id: 'motor_1',
    name: 'Exercícios de Amplitude Articular',
    description: 'Movimentos controlados para melhorar a mobilidade das articulações afetadas',
    difficulty: 'baixa',
    difficultyTypes: ['motor'],
    duration: '20-30 minutos',
    frequency: '3 vezes por semana',
    instructions: [
      'Deite-se ou sente-se confortavelmente',
      'Mova lentamente a articulação afetada no seu máximo de movimento',
      'Realize 10-15 repetições de cada movimento',
      'Descanse entre os exercícios'
    ],
    benefits: [
      'Restaura mobilidade articular',
      'Reduz rigidez muscular',
      'Melhora circulação sanguínea',
      'Prepara o corpo para atividades mais intensas'
    ]
  },
  'motor_2': {
    id: 'motor_2',
    name: 'Treinamento de Equilíbrio',
    description: 'Exercícios para melhorar estabilidade e prevenir quedas',
    difficulty: 'média',
    difficultyTypes: ['motor'],
    duration: '15-25 minutos',
    frequency: '4-5 vezes por semana',
    instructions: [
      'Fique em pé, apoiado em uma superfície estável',
      'Transfira o peso de um pé para outro lentamente',
      'Levante um pé do chão, mantendo o equilíbrio',
      'Aumente a dificuldade fechando os olhos (com supervisão)',
      'Caminhe em linha reta, colocando um pé na frente do outro'
    ],
    benefits: [
      'Melhora propriocepção',
      'Aumenta confiança para se mover',
      'Reduz risco de quedas',
      'Fortalece estabilizadores musculares'
    ]
  },
  'motor_3': {
    id: 'motor_3',
    name: 'Fortalecimento Muscular Progressivo',
    description: 'Exercícios de resistência para ganho de força muscular',
    difficulty: 'média',
    difficultyTypes: ['motor'],
    duration: '25-35 minutos',
    frequency: '3 vezes por semana',
    instructions: [
      'Use pesos leves ou bandas elásticas',
      'Realize movimentos lentamente com controle total',
      'Faça 2-3 séries de 10-12 repetições',
      'Descanse 60-90 segundos entre séries',
      'Aumente gradualmente a resistência'
    ],
    benefits: [
      'Aumenta força muscular',
      'Melhora capacidade funcional',
      'Aumenta metabolismo',
      'Melhora autoestima e independência'
    ]
  },
  'cognitivo_1': {
    id: 'cognitivo_1',
    name: 'Exercícios de Memória',
    description: 'Atividades para estimular memória de curto e longo prazo',
    difficulty: 'baixa',
    difficultyTypes: ['cognitivo'],
    duration: '15-20 minutos',
    frequency: 'Diariamente',
    instructions: [
      'Use aplicativos de jogos de memória',
      'Tente memorizar listas de compras',
      'Jogue cartas de memória (memory)',
      'Estude fotos e tente reproduzir detalhes',
      'Leia e resuma textos'
    ],
    benefits: [
      'Estimula formação de novas memórias',
      'Melhora recall de informações',
      'Aumenta concentração',
      'Retarda declínio cognitivo'
    ]
  },
  'cognitivo_2': {
    id: 'cognitivo_2',
    name: 'Treinamento de Atenção',
    description: 'Atividades para melhorar foco e concentração',
    difficulty: 'média',
    difficultyTypes: ['cognitivo'],
    duration: '20-30 minutos',
    frequency: '4-5 vezes por semana',
    instructions: [
      'Faça leitura focada sem distrações',
      'Resolva quebra-cabeças ou sudoku',
      'Realize tarefas de busca visual (achando diferenças)',
      'Pratique meditação mindfulness',
      'Jogue xadrez ou damas'
    ],
    benefits: [
      'Melhora foco e concentração',
      'Aumenta produtividade',
      'Reduz dispersão mental',
      'Melhora qualidade de vida'
    ]
  },
  'cognitivo_3': {
    id: 'cognitivo_3',
    name: 'Estimulação Linguística',
    description: 'Exercícios para melhorar linguagem e expressão',
    difficulty: 'média',
    difficultyTypes: ['cognitivo'],
    duration: '20-25 minutos',
    frequency: '4 vezes por semana',
    instructions: [
      'Leia em voz alta diariamente',
      'Converse com familiares ou amigos',
      'Faça palavras-cruzadas ou caça-palavras',
      'Aprenda novas palavras todos os dias',
      'Cante músicas que conhece'
    ],
    benefits: [
      'Melhora expressão verbal',
      'Estimula recuperação de afasia',
      'Aumenta confiança comunicativa',
      'Fortalece conexões neurais'
    ]
  },
  'adl_1': {
    id: 'adl_1',
    name: 'Treinamento de Atividades de Vida Diária (AVD)',
    description: 'Prática de atividades essenciais do dia a dia',
    difficulty: 'baixa',
    difficultyTypes: ['atividades'],
    duration: '30-45 minutos',
    frequency: 'Diariamente',
    instructions: [
      'Pratique se vestir e despir',
      'Treine técnicas de higiene pessoal',
      'Prepare refeições simples',
      'Pratique usar utensílios de cozinha',
      'Aprenda adaptações para facilitar tarefas'
    ],
    benefits: [
      'Restaura independência',
      'Aumenta autoconfiança',
      'Melhora qualidade de vida',
      'Reduz dependência de cuidadores'
    ]
  },
  'adl_2': {
    id: 'adl_2',
    name: 'Treino de Mobilidade e Locomoção',
    description: 'Exercícios para melhorar capacidade de se mover de forma segura',
    difficulty: 'média',
    difficultyTypes: ['atividades'],
    duration: '20-30 minutos',
    frequency: '4-5 vezes por semana',
    instructions: [
      'Pratique técnicas de transferência (cama → cadeira)',
      'Trabalhe com dispositivos de assistência (muletas, andador)',
      'Caminhe em diferentes superfícies',
      'Suba e desça escadas com supervisão',
      'Pratique entrar e sair de veículos'
    ],
    benefits: [
      'Melhora mobilidade funcional',
      'Reduz risco de acidentes',
      'Aumenta participação em atividades',
      'Melhora qualidade de vida comunitária'
    ]
  },
  'adl_3': {
    id: 'adl_3',
    name: 'Gerenciamento de Instrumentos Adaptativos',
    description: 'Aprendizado e uso de dispositivos que facilitam atividades',
    difficulty: 'baixa',
    difficultyTypes: ['atividades'],
    duration: '15-20 minutos',
    frequency: '2-3 vezes por semana',
    instructions: [
      'Conheça dispositivos disponíveis (abridor de lata, abotoador)',
      'Pratique usar talheres adaptados',
      'Aprenda técnicas com equipamento de assistência',
      'Otimize o ambiente de casa para acessibilidade',
      'Receba treinamento personalizado para cada ferramenta'
    ],
    benefits: [
      'Aumenta independência funcional',
      'Reduz dor e esforço',
      'Melhora eficiência em tarefas',
      'Promove participação social'
    ]
  }
}

/**
 * Gera sugestões de reabilitação baseado nas dificuldades do paciente
 * Funciona 100% localmente, sem dependência de APIs externas
 */
export function suggestRehabilitationActivitiesMock(input: {
  motorDifficulties: string[]
  cognitiveDifficulties: string[]
  dailyActivityDifficulties: string[]
}): RehabilitationPlan {
  const activities: SuggestedActivity[] = []
  const { motorDifficulties, cognitiveDifficulties, dailyActivityDifficulties } = input

  // Se tem dificuldades motoras, adiciona atividades motoras
  if (motorDifficulties.length > 0) {
    activities.push(
      ACTIVITY_DATABASE['motor_1'],
      ACTIVITY_DATABASE['motor_2']
    )
    
    // Se tem muitas dificuldades, adiciona fortalecimento
    if (motorDifficulties.length > 1) {
      activities.push(ACTIVITY_DATABASE['motor_3'])
    }
  }

  // Se tem dificuldades cognitivas, adiciona atividades cognitivas
  if (cognitiveDifficulties.length > 0) {
    activities.push(
      ACTIVITY_DATABASE['cognitivo_1'],
      ACTIVITY_DATABASE['cognitivo_2']
    )
    
    // Se tem muitas dificuldades, adiciona estimulação linguística
    if (cognitiveDifficulties.length > 1) {
      activities.push(ACTIVITY_DATABASE['cognitivo_3'])
    }
  }

  // Se tem dificuldades em atividades de vida diária
  if (dailyActivityDifficulties.length > 0) {
    activities.push(
      ACTIVITY_DATABASE['adl_1'],
      ACTIVITY_DATABASE['adl_2']
    )
    
    // Se tem muitas dificuldades, adiciona gerenciamento de instrumentos
    if (dailyActivityDifficulties.length > 1) {
      activities.push(ACTIVITY_DATABASE['adl_3'])
    }
  }

  // Se não tem nenhuma dificuldade selecionada, retorna recomendação geral
  if (activities.length === 0) {
    activities.push(
      ACTIVITY_DATABASE['motor_1'],
      ACTIVITY_DATABASE['cognitivo_1'],
      ACTIVITY_DATABASE['adl_1']
    )
  }

  // Gera recomendação personalizada baseada no perfil
  const hasMotor = motorDifficulties.length > 0
  const hasCognitive = cognitiveDifficulties.length > 0
  const hasADL = dailyActivityDifficulties.length > 0

  let overallRecommendation = 'Plano de reabilitação personalizado gerado com sucesso. '

  if (hasMotor && hasCognitive && hasADL) {
    overallRecommendation += 'Este paciente apresenta dificuldades multimodais. Recomenda-se abordagem integrada com foco na progressão gradual de intensidade.'
  } else if (hasMotor && hasCognitive) {
    overallRecommendation += 'Com dificuldades motoras e cognitivas, combine exercícios físicos com estimulação mental para melhor recuperação funcional.'
  } else if (hasMotor) {
    overallRecommendation += 'Foco em reabilitação motora com progressão de dificuldade conforme tolerância do paciente.'
  } else if (hasCognitive) {
    overallRecommendation += 'Ênfase em estimulação cognitiva através de atividades variadas e desafiadoras.'
  } else if (hasADL) {
    overallRecommendation += 'Treinamento de atividades de vida diária para restabelecer independência funcional.'
  }

  return {
    suggestedActivities: activities,
    overallRecommendation,
    notes: `Plano gerado em ${new Date().toLocaleDateString('pt-BR')}. Total de ${activities.length} atividades recomendadas. Acompanhamento semanal recomendado.`
  }
}
