"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Accessibility,
  Home,
  Sparkles,
  Calendar,
  ChevronLeft,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { suggestRehabilitationActivities } from "@/ai/flows/suggest-rehabilitation-activities"

const MOTOR_DIFFICULTIES = ["Fraqueza em membros inferiores", "Dificuldade de equilíbrio", "Espasticidade", "Amplitude de movimento reduzida"]
const COGNITIVE_DIFFICULTIES = ["Lapsos de memória", "Dificuldade de concentração", "Desorientação temporal", "Afasia de expressão"]
const ADL_DIFFICULTIES = ["Dificuldade ao se vestir", "Necessidade de auxílio na higiene", "Dificuldade na alimentação", "Dependência para locomoção externa"]
export const dynamic = 'force-static';
export async function generateStaticParams() {
  return [];
}
export default function PatientDetailPage() {
  const { id } = useParams()
  const { toast } = useToast()

  const [selectedMotor, setSelectedMotor] = useState<string[]>([])
  const [selectedCognitive, setSelectedCognitive] = useState<string[]>([])
  const [selectedADL, setSelectedADL] = useState<string[]>([])
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([])

  const handleGeneratePlan = async () => {
    if (selectedMotor.length === 0 && selectedCognitive.length === 0 && selectedADL.length === 0) {
      toast({
        title: "Seleção necessária",
        description: "Selecione pelo menos uma dificuldade para gerar o plano.",
        variant: "destructive"
      })
      return
    }

    setIsLoadingAI(true)
    try {
      const result = await suggestRehabilitationActivities({
        motorDifficulties: selectedMotor,
        cognitiveDifficulties: selectedCognitive,
        dailyActivityDifficulties: selectedADL
      })
      setAiSuggestions(result.suggestedActivities)
      toast({
        title: "Plano Gerado",
        description: "A IA sugeriu novas atividades baseadas nas dificuldades registradas."
      })
    } catch (error) {
      toast({
        title: "Erro ao gerar",
        description: "Houve um problema ao consultar o Arquiteto de Atividades.",
        variant: "destructive"
      })
    } finally {
      setIsLoadingAI(false)
    }
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/patients"><ChevronLeft /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Maria das Dores Oliveira</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary">ID: HOSP-0021</Badge>
            <Badge variant="outline">74 anos</Badge>
            <Badge className="bg-green-100 text-green-700 border-none">Ativo</Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="assessment" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 w-full justify-start max-w-md">
          <TabsTrigger value="assessment" className="flex-1">Avaliação</TabsTrigger>
          <TabsTrigger value="timeline" className="flex-1">Cronograma</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Evolução</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Motora */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-blue-600">
                  <Accessibility className="h-5 w-5" />
                  <CardTitle className="text-lg">Motora</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {MOTOR_DIFFICULTIES.map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={`motor-${item}`}
                      checked={selectedMotor.includes(item)}
                      onCheckedChange={(checked) => {
                        setSelectedMotor(prev => checked ? [...prev, item] : prev.filter(i => i !== item))
                      }}
                    />
                    <label htmlFor={`motor-${item}`} className="text-sm">{item}</label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cognitiva */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-purple-600">
                  <Brain className="h-5 w-5" />
                  <CardTitle className="text-lg">Cognitiva</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {COGNITIVE_DIFFICULTIES.map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cog-${item}`}
                      checked={selectedCognitive.includes(item)}
                      onCheckedChange={(checked) => {
                        setSelectedCognitive(prev => checked ? [...prev, item] : prev.filter(i => i !== item))
                      }}
                    />
                    <label htmlFor={`cog-${item}`} className="text-sm">{item}</label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ADL */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-teal-600">
                  <Home className="h-5 w-5" />
                  <CardTitle className="text-lg">Atividades (ADL)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {ADL_DIFFICULTIES.map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={`adl-${item}`}
                      checked={selectedADL.includes(item)}
                      onCheckedChange={(checked) => {
                        setSelectedADL(prev => checked ? [...prev, item] : prev.filter(i => i !== item))
                      }}
                    />
                    <label htmlFor={`adl-${item}`} className="text-sm">{item}</label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center pt-4">
            <Button size="lg" onClick={handleGeneratePlan} disabled={isLoadingAI} className="bg-secondary text-white">
              {isLoadingAI ? "Gerando..." : "Arquitetar Plano IA"}
            </Button>
          </div>

          {aiSuggestions.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 pt-8">
              {aiSuggestions.map((act, i) => (
                <Card key={i} className="border-l-4 border-l-secondary">
                  <CardHeader><CardTitle className="text-base">{act.name}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{act.description}</p></CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Tratamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { title: "Fisioterapia", time: "Hoje, 14:00", status: "Agendado", Icon: Accessibility },
                  { title: "Treino ADL", time: "Amanhã, 09:30", status: "Pendente", Icon: Home },
                  { title: "Avaliação", time: "25 Nov, 15:00", status: "Pendente", Icon: Brain }
                ].map((item, i) => {
                  const IconComponent = item.Icon;
                  return (
                    <div key={i} className="flex gap-4 items-center p-4 border rounded-lg">
                      <div className="p-2 bg-slate-100 rounded-full">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.time} - {item.status}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}