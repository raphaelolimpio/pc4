// REMOVA TODOS OS IMPORTS DO GENKIT
// Deixamos apenas o Zod se você quiser manter a tipagem, mas o ideal é simplificar
import { z } from 'zod'; 

export async function suggestRehabilitationActivities(input: any) {
  console.log("Input recebido:", input);
  
  // Simulamos um delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Retorno estático para o build não quebrar
  return {
    suggestedActivities: [
      {
        name: "Treino de Equilíbrio",
        description: "Exercício simulado para build estático.",
        difficultyType: "motor"
      },
      {
        name: "Estímulo Cognitivo",
        description: "Atividade de memória simulada.",
        difficultyType: "cognitive"
      }
    ]
  };
}