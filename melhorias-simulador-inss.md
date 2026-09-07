# Melhorias no Simulador de INSS — tlr-regularizacao-site

**Site:** https://tlr-regularizacao-site.vercel.app/
**Onde:** seção "Simule o débito estimado da sua obra" (bloco `#simulador`)
**Contexto:** o simulador calcula um "INSS bruto estimado" a partir de Área, Tipo de Imóvel, Tipo de Construção, Proprietário e Situação da Obra. Comparando com a planilha usada no curso (`Planilha_Simulador_IMPOSTO.xls`), foram confirmados 4 ajustes — os 3 primeiros já tinham sido identificados, o 4º foi confirmado agora com a planilha em mãos. Todos os números abaixo vêm da própria planilha, não são mais estimativas.

Fórmula final que o simulador deveria seguir:

```
Área Equivalente = Área Informada × % Equivalência (por destinação/padrão)
COD              = Área Equivalente × VAU (por estado e tipo de imóvel)
RMT              = COD × % Mão de Obra (por tipo de construção)
INSS Bruto       = RMT × Alíquota total (36,8% PF / 40% PJ optante do Simples)
```

---

## 1. [PRIORIDADE ALTA] Falta campo de seleção de Estado

**Problema:** o cálculo usa sempre o VAU de Mato Grosso do Sul, mas o site anuncia atendimento "100% online, em todo o Brasil". MS tem um dos VAU mais baixos do país — em alguns estados o VAU de multifamiliar é quase o dobro do de MS. Para qualquer visitante fora de MS, o simulador mostra hoje uma estimativa bem menor que a real.

**O que fazer:**
- Adicionar campo "Estado" (27 UFs), com MS pré-selecionado.
- A tabela de VAU precisa de uma dimensão por estado: `{ estado: { tipo: valor } }` em vez de `{ tipo: valor }`.
- Tabela completa por estado no Anexo A.

---

## 2. [PRIORIDADE ALTA] Tabela de VAU desatualizada — confirmado: é de maio/2021

**Problema:** a planilha do curso datava essa mesma tabela de VAU como **"maio/2021 (uso em junho/2021)"** — os valores fixos no código do site são exatamente esses, ou seja, estão paradas há mais de 5 anos. A Receita Federal atualiza o VAU **todo mês** (vinculado ao CUB/SINDUSCON, divulgado até o dia 5). Defasagem atual (MS, comparando com tabela de hoje 06/09/2026):

| Tipo (MS) | Valor de maio/2021 (no site hoje) | Valor atual | Defasagem |
|---|---|---|---|
| Unifamiliar | R$ 2.056,54 | R$ 2.252,88 | 9,5% abaixo |
| Multifamiliar | R$ 1.862,89 | R$ 1.887,01 | 1,3% abaixo |
| Comercial | R$ 2.145,63 | R$ 2.345,43 | 9,3% abaixo |
| Galpão Industrial | R$ 969,36 | R$ 1.057,28 | 9,1% abaixo |
| Popular | R$ 1.185,45 | R$ 1.292,60 | 9,0% abaixo |

**O que fazer:**
- Substituir a tabela fixa pelos valores atuais (Anexo A, já por estado).
- Criar um lembrete/rotina mensal de atualização (a planilha do curso mostra que isso é esperado — o VAU muda todo mês por natureza, não é algo que se define uma vez e esquece).
- Fontes públicas para conferência mensal: `tabelavau.seroassessoria.com.br` e `regularinssdeobras.com.br/tabela-sero`.

---

## 3. [PRIORIDADE MÉDIA] Falta o Percentual de Equivalência de Área — tabela confirmada

**Problema:** o cálculo usa 100% da área informada, sem reduzir pelo Percentual de Equivalência (Manual SERO v3.0, item 17.1 / art. 25, §6º). Isso não é um benefício opcional — é uma etapa padrão do cálculo do COD, que reduz a área principal antes de multiplicar pelo VAU.

**Tabela confirmada na planilha do curso (ABNT NBR 12.721/2006):**

| Projeto Padrão | % Equivalência | Uso típico |
|---|---|---|
| R-1 Baixo | 88,57% | Unifamiliar, padrão baixo |
| R-1 Normal | 93,45% | Unifamiliar, padrão normal |
| R-1 Alto | 93,60% | Unifamiliar, padrão alto |
| R-8 Baixo | 67,30% | Multifamiliar (edifício de apartamentos), padrão baixo |
| R-8 Normal | 68,93% | Multifamiliar, padrão normal |
| R-8 Alto | 78,49% | Multifamiliar, padrão alto |
| R-16 Normal (>10 pav.) | 77,87% | Multifamiliar alto (mais de 10 pavimentos) |
| R-16 Alto (>10 pav.) | 80,02% | Multifamiliar alto (mais de 10 pavimentos) |
| CSL (Comercial Salas e Lojas) | 65,99% | Comercial |
| PIS (Interesse Social) | 98,65% | Habitação popular |
| Galpão Industrial | 100% | Sem redução — área normal = área equivalente |

**Como o simulador não pergunta "padrão" hoje**, a recomendação mais simples e defensável é usar o valor **Normal** de cada destinação como padrão (R-1 Normal para unifamiliar, R-8 Normal para multifamiliar, etc.) — é o cenário mais comum, e evita superestimar (Baixo) ou subestimar (Alto) o "bruto sem redução" que o simulador promete mostrar.

**O que fazer:**
- Aplicar `Área Equivalente = Área Informada × % Equivalência (Normal, por tipo de imóvel)` antes de multiplicar pelo VAU.

---

## 4. [PRIORIDADE MÉDIA] Alíquota incompleta — confirmado: falta 16,8 pontos percentuais

**Problema:** o simulador usa só 20% (cota patronal) como alíquota final. A planilha do curso mostra o detalhamento completo do que compõe o "Valor do INSS devido":

| Componente | Alíquota |
|---|---|
| Cota patronal | 20% |
| Segurado (funcionário) | 8% |
| RAT | 3% |
| Outras entidades (terceiros) | 5,8% |
| **Total — Pessoa Física** | **36,8%** |
| Total — PJ optante do Simples | 40% (achado na planilha, ainda não testado no site) |

**O que fazer:**
- Trocar a alíquota final de 20% para **36,8%** (o simulador só tem PF/PJ hoje; se quiser cobrir PJ optante do Simples também, precisa de uma terceira opção nesse campo com alíquota de 40%).

---

## Resultado combinado — conferência com o caso do Evaldo (971,61 m², multifamiliar, MS)

| Versão | INSS bruto estimado |
|---|---|
| Site hoje (VAU de 2021, sem equivalência, alíquota 20%) | R$ 72.400,10 |
| + Equivalência (R-8 Normal/Baixo por padrão do alvará) | R$ 49.383,68 |
| + VAU atualizado | R$ 50.551,55 |
| + Alíquota completa (36,8%) | **R$ 92.046,28** |
| Simulador do curso (referência) | R$ 108.834,20 |

Com os 4 ajustes aplicados, o simulador do site sai de **R$ 72.400,10 para R$ 92.046,28** — de uma diferença de ~33% para uma diferença de ~15% em relação ao curso. O que sobra da diferença provavelmente vem de uma suposição de padrão (Baixo/Normal) diferente da que o curso usou, ou de o curso não aplicar a equivalência do mesmo jeito nesse campo específico — vale testar lado a lado com o mesmo input antes de fechar como definitivo.

---

## Anexo A — Tabela VAU atual por estado (dados de 06/09/2026)

> Fonte: regularinssdeobras.com.br/tabela-sero (dados públicos, cruzar com a fonte oficial da Receita antes de publicar)

| UF | Unifamiliar | Multifamiliar | Comercial | Galpão Industrial | Popular / Interesse Social |
|---|---|---|---|---|---|
| AC | 4.242,10 | 3.585,47 | 3.970,60 | 1.835,61 | 2.143,31 |
| AL | 2.558,21 | 2.204,66 | 2.466,05 | 1.151,86 | 1.362,40 |
| AP | 3.376,99 | 2.982,56 | 3.386,00 | 1.609,56 | 1.902,20 |
| AM | 4.242,10 | 3.585,47 | 3.970,60 | 1.835,61 | 2.143,31 |
| BA | 2.752,71 | 2.307,07 | 2.642,31 | 1.198,83 | 1.487,76 |
| CE | 2.878,33 | 2.499,51 | 2.845,05 | 1.347,80 | 1.695,74 |
| DF | 2.903,96 | 2.516,31 | 2.879,66 | 1.287,94 | 1.588,55 |
| ES | 3.403,21 | 2.895,38 | 3.226,46 | 1.462,06 | 1.916,54 |
| GO | 2.845,90 | 2.376,01 | 2.704,95 | 1.264,09 | 1.518,21 |
| MA | 2.348,61 | 2.246,52 | 2.294,07 | 1.094,67 | 1.312,57 |
| MT | 4.007,38 | 3.482,69 | 3.957,52 | 1.740,33 | 2.222,33 |
| MS | 2.252,88 | 1.887,01 | 2.345,43 | 1.057,28 | 1.292,60 |
| MG | 3.071,19 | 2.664,40 | 2.991,56 | 1.316,03 | 1.725,92 |
| PA | 2.917,27 | 2.548,39 | 2.869,22 | 1.356,84 | 1.655,36 |
| PB | 2.097,99 | 1.859,16 | 2.089,85 | 960,51 | 1.135,38 |
| PR | 3.340,01 | 2.844,92 | 3.253,13 | 1.458,10 | 1.827,31 |
| PE | 2.799,33 | 2.341,09 | 2.656,82 | 1.215,84 | 1.553,08 |
| PI | 2.348,61 | 2.025,47 | 2.294,07 | 1.094,67 | 1.312,57 |
| RJ | 3.101,08 | 2.669,62 | 3.036,43 | 1.378,73 | 1.731,76 |
| RN | 2.651,16 | 2.276,11 | 2.532,87 | 1.217,66 | 1.530,91 |
| RS | 3.467,09 | 3.069,41 | 3.639,91 | 1.412,37 | 1.854,69 |
| RO | 2.958,50 | 2.692,13 | 3.044,81 | 1.357,59 | 1.739,04 |
| RR | 3.682,39 | 3.156,13 | 3.595,77 | 1.723,59 | 1.913,40 |
| SC | 3.498,08 | 2.968,24 | 3.410,76 | 1.577,81 | 1.994,92 |
| SP | 2.705,27 | 2.359,48 | 2.685,96 | 1.265,41 | 1.517,13 |
| SE | 2.548,48 | 2.308,47 | 2.585,44 | 1.188,74 | 1.396,57 |
| TO | 2.845,90 | 2.376,01 | 2.704,95 | 1.264,09 | 1.518,21 |

*(Valores em R$/m². "Popular / Interesse Social" cobre Casa Popular, Projeto de Interesse Social e Conjunto Habitacional Popular.)*

---

## Fora de escopo por agora (não implementar ainda)

- **Desconto por concreto usinado** (art. 32, §3º) — a planilha do curso tem uma tabela de percentual de abatimento por estado e tipo de obra (ex: MS ≈ 4,3% a 12,2% dependendo da destinação). Só se aplica quando o cliente tem nota fiscal de concreto usinado — não dá pra estimar isso num simulador rápido sem essa informação, então não faz sentido incluir agora.
- **Fator Social e Fator de Ajuste** — o site já avisa que não aplica essas reduções (de propósito, para depois mostrar a economia no diagnóstico). Manter assim.
- **Terceira opção de proprietário (PJ optante do Simples)** — mencionada no item 4, mas só vale a pena se o público do site realmente incluir esse perfil; por ora, focar nos 4 itens acima.
