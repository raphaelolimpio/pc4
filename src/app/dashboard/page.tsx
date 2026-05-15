"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Calendar, ClipboardCheck, ArrowUpRight, TrendingUp } from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from "recharts"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPatientStatistics, getAllPatients } from "@/lib/patients-mock"

export default function Dashboard() {
  const stats_data = getPatientStatistics()
  const patients = getAllPatients()

  const stats = [
    {
      title: "Total de Pacientes",
      value: stats_data.total.toString(),
      change: `${stats_data.active} ativos`,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Avaliações Pendentes",
      value: stats_data.active.toString(),
      change: "Em acompanhamento",
      icon: ClipboardCheck,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "Pacientes em Reabilitação",
      value: stats_data.active.toString(),
      change: `Média ${stats_data.averageAge} anos`,
      icon: Activity,
      color: "text-teal-600",
      bg: "bg-teal-100",
    },
    {
      title: "Alta Concluída",
      value: stats_data.completed.toString(),
      change: "Ciclo terapêutico",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ]

  const chartData = [
    { name: "Seg", avaliacoes: 2, atividades: 8 },
    { name: "Ter", avaliacoes: 3, atividades: 12 },
    { name: "Qua", avaliacoes: 2, atividades: 10 },
    { name: "Qui", avaliacoes: 3, atividades: 14 },
    { name: "Sex", avaliacoes: 2, atividades: 9 },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao PCTE.ID</h1>
          <p className="text-muted-foreground">Aqui está um resumo das atividades clínicas do seu sistema.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Exportar Relatórios</Button>
          <Button asChild>
            <Link href="/patients">Ver Pacientes</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bg} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Volume de Atendimento</CardTitle>
            <CardDescription>Atividades registradas nos últimos 5 dias.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pl-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="atividades" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Pacientes Recentes</CardTitle>
            <CardDescription>Últimas interações registradas.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {patients.slice(0, 4).map((patient, i) => {
                const mainDifficulty = patient.motorDifficulties.length > 0 ? "Motor" : 
                                      patient.cognitiveDifficulties.length > 0 ? "Cognitivo" : "ADL"
                const colors = ["bg-blue-500", "bg-purple-500", "bg-teal-500", "bg-rose-500"]
                return (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-10 rounded-full ${colors[i % colors.length]}`} />
                      <div>
                        <Link href={`/patients/${patient.id}`} className="text-sm font-medium leading-none hover:underline">
                          {patient.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">{patient.age} anos • {mainDifficulty}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                      <Link href={`/patients/${patient.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
            <Button variant="link" className="w-full mt-6 text-sm" asChild>
              <Link href="/patients">Ver todos os pacientes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}