# 🤝 Guia de Contribuição - PCTE.ID

Obrigado por considerar contribuir para o PCTE.ID! Este documento fornece diretrizes para nos ajudar a manter um projeto de qualidade.

## 📋 Código de Conduta

Por favor, respeite todos os membros da comunidade. Comportamento agressivo, discriminatório ou ofensivo será banido.

## 🎯 Como Contribuir

### 1. Reportar Bugs

**Antes de criar um report de bug:**
- Verifique se o problema já não foi reportado (procure em Issues)
- Verifique se já não foi corrigido na branch de desenvolvimento

**Como reportar um bug:**
- Use um **título claro e descritivo**
- Descreva os **passos exatos** para reproduzir o problema
- Forneça **exemplos específicos** para demonstrar os passos
- Descreva o **comportamento observado** e o que você **esperava**
- Inclua **screenshots** se relevante
- Cite sua **versão do Node.js**, **SO** e **navegador**

### 2. Sugerir Melhorias

**Antes de sugerir uma melhoria:**
- Verifique se não foi sugerida antes
- Tenha argumentos claros sobre o **por que** essa melhoria é útil

**Como sugerir:**
- Use um **título claro e descritivo**
- Forneça uma **descrição passo-a-passo** da melhoria
- Cite **exemplos** para demonstrar o conceito
- Liste **algumas tarefas relacionadas** (se aplicável)

### 3. Pull Requests

**Processo de PR:**

1. Fork o repositório
2. Clone seu fork:
   ```bash
   git clone https://github.com/SEU-USUARIO/pc2.git
   cd PCTE.ID-main
   ```

3. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/minha-feature
   ```

4. Instale dependências:
   ```bash
   npm install
   ```

5. Faça suas mudanças
   - Sempre teste localmente com `npm run dev`
   - Verifique tipos com `npm run typecheck`
   - Execute lint com `npm run lint`

6. Commit com mensagens descritivas:
   ```bash
   git commit -m "Adiciona nova funcionalidade: descrição clara"
   ```
   
   **Convenção de commits:**
   - `feat:` Nova funcionalidade
   - `fix:` Correção de bug
   - `docs:` Mudanças na documentação
   - `style:` Formatação (sem mudança de código)
   - `refactor:` Refatoração de código
   - `test:` Adicionar testes
   - `chore:` Atualizações de dependências

7. Push para seu fork:
   ```bash
   git push origin feature/minha-feature
   ```

8. Abra um Pull Request via GitHub
   - Descreva o **tipo de mudança** (nova feature, bug fix, etc)
   - Relacione qualquer **issue conexa**
   - Descreva as **mudanças em detalhes**
   - Liste qualquer **breaking change**

---

## 🏗️ Estrutura de Desenvolvimento

### Branches
- **main**: Branch de produção (deploy automático)
- **develop**: Branch de desenvolvimento
- **feature/...**: Novas features
- **bugfix/...**: Correções de bugs
- **docs/...**: Mudanças na documentação

### Convenções de Código

#### TypeScript
- Use **tipos explícitos** sempre que possível
- Evite `any` - use tipos genéricos ou `unknown`
- Use `interface` para tipos de objeto
- Use `type` para tipos union ou aliases complexos

#### React/TSX
- Use **functional components** com hooks
- Componentes devem ser **memoizados** se apropriado
- Use **destructuring** para props
- Nomes de componentes em **PascalCase**
- Nomes de hooks em **camelCase** prefixados com `use`

Exemplo:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick 
}) => {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

#### CSS/Tailwind
- Use **classes Tailwind** primeiro
- Evite CSS custom desnecessário
- Mantenha **responsive design** em mente
- Use **dark mode** quando aplicável

---

## 🧪 Testes

Antes de submeter um PR, verifique:

```bash
# Verificar tipos
npm run typecheck

# Lint
npm run lint

# Build
npm run build

# Desenvolvimento local
npm run dev
# Teste manualmente em http://localhost:9002
```

---

## 📚 Documentação

- Mantenha o **README.md** atualizado
- Documente **componentes complexos** com comentários
- Adicione **exemplos** para features novas
- Use **JSDoc** para funções públicas

Exemplo de JSDoc:
```typescript
/**
 * Sugere atividades de reabilitação baseado nas dificuldades do paciente
 * @param motorDifficulties - Lista de dificuldades motoras
 * @param cognitiveDifficulties - Lista de dificuldades cognitivas
 * @returns Atividades recomendadas pela IA
 */
export async function suggestRehabilitationActivities(
  motorDifficulties: string[],
  cognitiveDifficulties: string[],
  dailyActivityDifficulties: string[]
): Promise<SuggestedActivity[]> {
  // implementação
}
```

---

## 🚀 Padrões e Boas Práticas

### Performance
- Minimize re-renders com `React.memo` e `useMemo`
- Use `dynamic` imports para code-splitting
- Otimize imagens com `next/image`

### Segurança
- Nunca commite **variáveis de ambiente**
- Use `.env.local` para desenvolvimento
- Valide inputs do usuário
- Use **Zod** para validação de tipos

### Acessibilidade
- Use **semantic HTML**
- Mantenha **contrast ratios** adequados
- Suporte **navegação por teclado**
- Adicione **aria labels** quando necessário

---

## 📝 Checklist do PR

Antes de submeter, verifique:

- [ ] Meu código segue os estilos do projeto
- [ ] Executei `npm run typecheck` localmente e passou
- [ ] Executei `npm run lint` localmente e passou
- [ ] Criei testes para as novas funcionalidades
- [ ] Minha mudança requer mudança na documentação
- [ ] Atualizei a documentação de acordo
- [ ] Minha mudança não quebra testes existentes
- [ ] Adicionei novos testes que provam minha fix/feature
- [ ] Testes novos e existentes passam localmente

---

## ❓ Dúvidas?

- Abra uma **Discussion** no GitHub
- Envie um **email** para suporte
- Consulte a **documentação** existente
- Verifique **Issues anteriores**

---

**Obrigado por contribuir! 🙌**
