#### Previews telas update 2026
* > Home

<img src="./preview/home.png" alt="">

* Tênis
```
https://www.olympikus.com.br/tenis-olympikus-corre-4-43720366-3-004/p
```


* > Home Item
<img src="./preview/home-item.png" alt="">

* > Create Item
<img src="./preview/create.jpg" alt="">

* > Show Item
<img src="./preview/show.jpg" alt="">

* > Dashboard Item
<img src="./preview/dashboard.jpg" alt="">

* > Doc
<img src="./preview/doc.png" alt="">

#### Supase link
* email rodrigoexer1
```
https://supabase.com/dashboard/project/epbiidfftrszstdgykmm/editor/50181?schema=public
```

#### prompt home
```
preciso de uma tela inicial para um loja online usando as tecnologias.
next, typescript, tailwindcss, motion para animação,
lembrando quero somente a tela home page.tsx
precisa ter um header bonito com a opção de login ou cadastro do lado direito, logo do lado esquerdo, e no meio uma barra de pesquisa.
em baixo uma lista de cards com todos os produtos cadastrados, me traga inicialmente, um array para posteriormente nos trocarmos pelo os dados do banco.
nos cards, foto do produto, do lado nome, valor,  descrição a baixo,
para finalizar a me um footer escuro com algumas informais redes sócias etc.
```

####
```
npm i framer-motion embla-carousel-react embla-carousel-autoplay
```

```
npm install @supabase/supabase-js @supabase/ssr framer-motion

```

#### Env.
```
https://qlmmdhklaqyxpdctykjk.supabase.co
```

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbW1kaGtsYXF5eHBkY3R5a2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzMxNzEsImV4cCI6MjA2NDIwOTE3MX0.EZyjWN4QT-Yf5f46dUKSE-sfQoWMIXtIAQPsekQvqzA
```

#### Contexto
```
npm i zustand
```

#### Table sql
```
ALTER TABLE public.produtos
ADD COLUMN imagens_adicionais TEXT[];
```

```
// arquivo: prisma/schema.prisma

model Produto {
  id                 Int      @id @default(autoincrement())
  nome               String
  descricao          String?
  preco              Decimal? @db.Decimal(10, 2)
  categoria          String?
  imagem_principal   String?   // Imagem de capa (permanece igual)
  
  // NOVO CAMPO ADICIONADO
  imagens_adicionais String[]  // Lista para até 4 imagens extras

  link_afiliado      String?
  tipo               String?  @default("proprio")
  ativo              Boolean? @default(true)
  created_at         DateTime? @default(now()) @db.Timestamptz
  usuario_id         String   @db.Uuid
  
  // Relação com o usuário (assumindo que seu modelo User usa CUID)
  // usuario         User     @relation(fields: [usuario_id], references: [id], onDelete: Cascade)

  @@map("produtos")
}
```

#### Links uteis
* modelos de telas
```
https://nicepage.com/pt/k/perfil-modelos-html
```

#### JWT Aut
```
✅ Solução: Sessão persistente por 24h com Supabase
O Supabase já suporta persistência de sessão via cookies ou localStorage, mas por padrão a sessão expira após 1 hora. Para manter o usuário logado por 24h (ou mais), precisamos:

🧠 Etapa 1: Configurar persistência de sessão
No seu client Supabase (ex: lib/supabaseClient.ts), garanta que a persistência esteja ativada corretamente:

ts
Copiar
Editar
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true, // ✅ garante persistência no localStorage
      autoRefreshToken: true // ✅ renova automaticamente
    }
  }
)
🧠 Etapa 2: Configurar duração do token no Supabase Dashboard
Vá para o Supabase Dashboard

Clique em Authentication > Settings > Policies

Em JWT Expiry, defina 86400 segundos (24h)

Clique em Save

🧠 Etapa 3: Atualizar session manualmente (opcional)
Se ainda estiver enfrentando logout, você pode recuperar a sessão no useEffect global do app:

ts
Copiar
Editar
useEffect(() => {
  const session = supabase.auth.getSession()
  // pode armazenar no Zustand/contexto se quiser
}, [])
✨ Resultado
Com isso:

O usuário fica logado por 24h

A sessão é renovada automaticamente

O login não precisa ser repetido toda hora

Se quiser ainda mais durabilidade (ex: 7 dias), é só ajustar o JWT expiry.
```
#### Estrutura Multi-Tenant (2026)
O projeto foi refatorado para suportar múltiplas lojas (SaaS) consumindo de uma API Flask.

