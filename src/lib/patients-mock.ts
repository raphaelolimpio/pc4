/**
 * Mock data for patients - used for local development without Firebase
 */

export interface Patient {
  id: string
  name: string
  age: number
  email: string
  phone: string
  diagnosis: string
  motorDifficulties: string[]
  cognitiveDifficulties: string[]
  dailyActivityDifficulties: string[]
  startDate: string
  status: 'active' | 'inactive' | 'completed'
  lastAssessment: string
  therapist: string
  notes: string
  avatar?: string
}

export const patientsMock: Patient[] = [
  {
    id: '1',
    name: 'Ana Silva',
    age: 68,
    email: 'ana.silva@email.com',
    phone: '(11) 98765-4321',
    diagnosis: 'Acidente Vascular Cerebral (AVC) - Sequelas Motoras',
    motorDifficulties: ['Fraqueza no braço direito', 'Dificuldade de equilíbrio', 'Limitação de amplitude de movimento'],
    cognitiveDifficulties: ['Dificuldade de memória de curto prazo', 'Redução de atenção'],
    dailyActivityDifficulties: ['Dificuldade em se vestir', 'Dificuldade para tomar banho', 'Limitação em tarefas domésticas'],
    startDate: '2024-01-15',
    status: 'active',
    lastAssessment: '2026-05-10',
    therapist: 'Dr. Carlos Santos',
    notes: 'Paciente apresenta bom engajamento nas atividades terapêuticas. Progressão positiva observada.',
    avatar: '👩‍⚕️'
  },
  {
    id: '2',
    name: 'João Oliveira',
    age: 55,
    email: 'joao.oliveira@email.com',
    phone: '(11) 99876-5432',
    diagnosis: 'Sequelas de Traumatismo Crânio-Encefálico',
    motorDifficulties: ['Coordenação motora fina prejudicada', 'Fraqueza nas pernas'],
    cognitiveDifficulties: ['Dificuldade de concentração', 'Impulsividade aumentada', 'Problemas de planejamento'],
    dailyActivityDifficulties: ['Dificuldade em preparar refeições', 'Limitação em cuidados pessoais'],
    startDate: '2024-03-20',
    status: 'active',
    lastAssessment: '2026-05-12',
    therapist: 'Dra. Marina Costa',
    notes: 'Paciente responde bem à reabilitação cognitiva. Recomenda-se aumento de intensidade das atividades.',
    avatar: '👨‍💼'
  },
  {
    id: '3',
    name: 'Maria Ferreira',
    age: 72,
    email: 'maria.ferreira@email.com',
    phone: '(11) 97654-3210',
    diagnosis: 'Doença de Parkinson',
    motorDifficulties: ['Tremor de repouso', 'Rigidez muscular', 'Bradicinesia (movimentos lentos)'],
    cognitiveDifficulties: [],
    dailyActivityDifficulties: ['Dificuldade em andar', 'Instabilidade postural', 'Dificuldade em escrita'],
    startDate: '2023-06-10',
    status: 'active',
    lastAssessment: '2026-05-08',
    therapist: 'Fisioterapeuta Pedro Lima',
    notes: 'Paciente segue com medicação regularizada. Continuar com protocolo atual.',
    avatar: '👵'
  },
  {
    id: '4',
    name: 'Roberto Santos',
    age: 60,
    email: 'roberto.santos@email.com',
    phone: '(11) 98765-4321',
    diagnosis: 'Após Cirurgia de Articulação do Joelho',
    motorDifficulties: ['Limitação de movimento no joelho', 'Fraqueza muscular na perna operada', 'Dor ao movimento'],
    cognitiveDifficulties: [],
    dailyActivityDifficulties: ['Dificuldade para subir escadas', 'Dificuldade para sair da cama'],
    startDate: '2026-04-01',
    status: 'active',
    lastAssessment: '2026-05-11',
    therapist: 'Dr. Felipe Rocha',
    notes: 'Recuperação dentro do esperado pós-cirúrgica. Próxima avaliação em 2 semanas.',
    avatar: '👨‍🔧'
  },
  {
    id: '5',
    name: 'Clarice Mendes',
    age: 45,
    email: 'clarice.mendes@email.com',
    phone: '(11) 99123-4567',
    diagnosis: 'Síndrome de Fibromialgia',
    motorDifficulties: ['Dor generalizada', 'Fadiga muscular'],
    cognitiveDifficulties: ['Confusão mental ("brain fog")'],
    dailyActivityDifficulties: ['Dificuldade em tarefas domésticas', 'Dificuldade em locomoção'],
    startDate: '2024-08-05',
    status: 'completed',
    lastAssessment: '2026-04-30',
    therapist: 'Dra. Lucia Martins',
    notes: 'Paciente completou ciclo terapêutico com sucesso. Recomenda-se manutenção com atividades em casa.',
    avatar: '👩‍🦲'
  }
]

/**
 * Get a single patient by ID
 */
export function getPatientById(id: string): Patient | undefined {
  return patientsMock.find(p => p.id === id)
}

/**
 * Get all patients
 */
export function getAllPatients(): Patient[] {
  return patientsMock
}

/**
 * Get active patients only
 */
export function getActivePatients(): Patient[] {
  return patientsMock.filter(p => p.status === 'active')
}

/**
 * Get patient statistics for dashboard
 */
export function getPatientStatistics() {
  const total = patientsMock.length
  const active = patientsMock.filter(p => p.status === 'active').length
  const completed = patientsMock.filter(p => p.status === 'completed').length
  const inactive = patientsMock.filter(p => p.status === 'inactive').length

  return {
    total,
    active,
    completed,
    inactive,
    averageAge: Math.round(patientsMock.reduce((sum, p) => sum + p.age, 0) / total),
  }
}
