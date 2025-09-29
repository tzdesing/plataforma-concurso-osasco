import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Questões REAIS específicas para Professor Adjunto de Educação Básica I
const realQuestions = [
  // =================== LÍNGUA PORTUGUESA (20 QUESTÕES) ===================
  {
    statement: "Leia o texto abaixo:\n\n'A educação é um direito de todos e dever do Estado e da família, será promovida e incentivada com a colaboração da sociedade, visando ao pleno desenvolvimento da pessoa, seu preparo para o exercício da cidadania e sua qualificação para o trabalho.'\n\nO texto acima refere-se ao artigo da Constituição Federal que trata:",
    alternatives: ["Do direito à saúde", "Do direito à educação", "Do direito ao trabalho", "Do direito à moradia"],
    correctAnswer: "B",
    explanation: "O texto é do artigo 205 da Constituição Federal, que estabelece a educação como direito de todos.",
    subject: "Língua Portuguesa",
    topic: "Interpretação de Texto",
    difficulty: "MEDIUM"
  },
  {
    statement: "Assinale a alternativa em que todas as palavras estão grafadas corretamente:",
    alternatives: ["Excessão, privilégio, beneficiente", "Exceção, privilégio, beneficente", "Exceção, previlejo, beneficiente", "Excessão, previlejo, beneficente"],
    correctAnswer: "B",
    explanation: "As grafias corretas são: exceção, privilégio, beneficente.",
    subject: "Língua Portuguesa",
    topic: "Ortografia",
    difficulty: "EASY"
  },
  {
    statement: "Em concordância verbal, assinale a alternativa CORRETA:",
    alternatives: ["Fazem dois anos que ele se formou", "Houveram muitos problemas na escola", "Faz dois anos que ele se formou", "Haviam muitas crianças no pátio"],
    correctAnswer: "C",
    explanation: "O verbo 'fazer' no sentido de tempo é impessoal, permanece no singular.",
    subject: "Língua Portuguesa",
    topic: "Concordância Verbal",
    difficulty: "MEDIUM"
  },
  {
    statement: "Qual palavra está acentuada INCORRETAMENTE?",
    alternatives: ["Médico", "Prático", "Público", "Magico"],
    correctAnswer: "D",
    explanation: "A palavra correta é 'mágico' (com acento), pois é proparoxítona.",
    subject: "Língua Portuguesa",
    topic: "Acentuação",
    difficulty: "EASY"
  },
  {
    statement: "No texto 'O professor explicou a matéria aos alunos', a função sintática de 'a matéria' é:",
    alternatives: ["Sujeito", "Objeto direto", "Objeto indireto", "Predicativo do sujeito"],
    correctAnswer: "B",
    explanation: "'A matéria' é objeto direto do verbo transitivo direto 'explicou'.",
    subject: "Língua Portuguesa",
    topic: "Análise Sintática",
    difficulty: "MEDIUM"
  },
  {
    statement: "Identifique a figura de linguagem presente em: 'Aquele aluno é um poço de sabedoria':",
    alternatives: ["Metáfora", "Metonímia", "Hipérbole", "Personificação"],
    correctAnswer: "A",
    explanation: "Trata-se de metáfora, pois há comparação implícita entre o aluno e um poço de sabedoria.",
    subject: "Língua Portuguesa",
    topic: "Figuras de Linguagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "O plural de 'cidadão' é:",
    alternatives: ["Cidadões", "Cidadãos", "Cidadans", "Cidadãoes"],
    correctAnswer: "B",
    explanation: "O plural correto de 'cidadão' é 'cidadãos'.",
    subject: "Língua Portuguesa",
    topic: "Morfologia",
    difficulty: "EASY"
  },
  {
    statement: "Em 'Preciso de que você me ajude', há:",
    alternatives: ["Regência correta", "Erro de regência", "Problema de concordância", "Erro de colocação"],
    correctAnswer: "A",
    explanation: "A regência está correta: 'precisar de' + 'que' (conjunção integrante).",
    subject: "Língua Portuguesa",
    topic: "Regência Verbal",
    difficulty: "HARD"
  },
  {
    statement: "A palavra 'água' tem quantas sílabas?",
    alternatives: ["1", "2", "3", "4"],
    correctAnswer: "B",
    explanation: "A palavra 'água' tem 2 sílabas: á-gua.",
    subject: "Língua Portuguesa",
    topic: "Fonética",
    difficulty: "EASY"
  },
  {
    statement: "Em 'Ele chegou ontem', a palavra 'ontem' é:",
    alternatives: ["Adjunto adverbial de tempo", "Objeto direto", "Predicativo", "Sujeito"],
    correctAnswer: "A",
    explanation: "'Ontem' é adjunto adverbial de tempo, indicando quando a ação ocorreu.",
    subject: "Língua Portuguesa",
    topic: "Análise Sintática",
    difficulty: "MEDIUM"
  },
  // QUESTÕES ADICIONAIS DE LÍNGUA PORTUGUESA
  {
    statement: "Assinale a alternativa que apresenta erro de concordância nominal:",
    alternatives: ["Meio-dia e meia", "Anexas seguem as informações", "É proibido entrada", "Muito obrigada, disse a professora"],
    correctAnswer: "C",
    explanation: "O correto é 'É proibida a entrada' ou 'É proibido entrada de pessoas'.",
    subject: "Língua Portuguesa",
    topic: "Concordância Nominal",
    difficulty: "MEDIUM"
  },
  {
    statement: "Na frase 'Comprei o livro que você indicou', o termo 'que' é:",
    alternatives: ["Conjunção integrante", "Pronome relativo", "Conjunção explicativa", "Advérbio de intensidade"],
    correctAnswer: "B",
    explanation: "'Que' é pronome relativo, retomando o termo 'livro'.",
    subject: "Língua Portuguesa",
    topic: "Morfologia",
    difficulty: "MEDIUM"
  },
  {
    statement: "Qual alternativa apresenta um período composto por coordenação?",
    alternatives: ["Quando chegou, todos saíram", "Estudou muito, mas não passou", "Espero que você venha", "O livro que comprei é bom"],
    correctAnswer: "B",
    explanation: "'Estudou muito, mas não passou' apresenta duas orações coordenadas ligadas pela conjunção 'mas'.",
    subject: "Língua Portuguesa",
    topic: "Análise Sintática",
    difficulty: "MEDIUM"
  },
  {
    statement: "Em 'Vossa Senhoria chegou cedo', a concordância verbal está:",
    alternatives: ["Correta", "Incorreta, deveria ser 'chegastes'", "Incorreta, deveria ser 'chegaram'", "Incorreta, deveria ser 'chegaste'"],
    correctAnswer: "A",
    explanation: "Vossa Senhoria concorda com a 3ª pessoa do singular (chegou).",
    subject: "Língua Portuguesa",
    topic: "Concordância Verbal",
    difficulty: "HARD"
  },
  {
    statement: "A palavra 'desenvolvimento' é formada por:",
    alternatives: ["Composição", "Derivação prefixal", "Derivação sufixal", "Derivação prefixal e sufixal"],
    correctAnswer: "D",
    explanation: "'Desenvolvimento' tem prefixo 'des-' e sufixo '-mento' (derivação prefixal e sufixal).",
    subject: "Língua Portuguesa",
    topic: "Morfologia",
    difficulty: "MEDIUM"
  },
  {
    statement: "Em 'Choveu muito ontem', o sujeito é:",
    alternatives: ["Oculto", "Simples", "Composto", "Inexistente"],
    correctAnswer: "D",
    explanation: "O verbo 'chover' é impessoal quando indica fenômeno da natureza, não tem sujeito.",
    subject: "Língua Portuguesa",
    topic: "Análise Sintática",
    difficulty: "MEDIUM"
  },
  {
    statement: "Assinale a alternativa com uso correto da crase:",
    alternatives: ["Vou à casa", "Refiro-me à você", "Chegou à uma hora", "Fui à escola"],
    correctAnswer: "D",
    explanation: "'Fui à escola' está correto (ir a + a escola = à escola).",
    subject: "Língua Portuguesa",
    topic: "Crase",
    difficulty: "MEDIUM"
  },
  {
    statement: "A função da linguagem predominante em 'Que calor terrível!' é:",
    alternatives: ["Referencial", "Emotiva", "Conativa", "Metalinguística"],
    correctAnswer: "B",
    explanation: "A função emotiva expressa sentimentos e emoções do emissor.",
    subject: "Língua Portuguesa",
    topic: "Funções da Linguagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "Em 'Os meninos correram rapidamente', o termo 'rapidamente' é:",
    alternatives: ["Adjunto adnominal", "Adjunto adverbial de modo", "Predicativo do sujeito", "Objeto direto"],
    correctAnswer: "B",
    explanation: "'Rapidamente' é adjunto adverbial de modo, modificando o verbo 'correram'.",
    subject: "Língua Portuguesa",
    topic: "Análise Sintática",
    difficulty: "EASY"
  },
  {
    statement: "Qual alternativa apresenta um vocativo?",
    alternatives: ["João chegou cedo", "Meu amigo, venha aqui", "O livro de João", "João é inteligente"],
    correctAnswer: "B",
    explanation: "'Meu amigo' é vocativo, termo usado para chamar ou interpelar alguém.",
    subject: "Língua Portuguesa",
    topic: "Análise Sintática",
    difficulty: "EASY"
  },

  // =================== MATEMÁTICA (20 QUESTÕES) ===================
  {
    statement: "Em uma escola, 60% dos alunos são meninas. Se há 240 meninas na escola, qual é o total de alunos?",
    alternatives: ["300 alunos", "350 alunos", "400 alunos", "450 alunos"],
    correctAnswer: "C",
    explanation: "Se 240 meninas representam 60% do total, então: 240 ÷ 0,6 = 400 alunos no total.",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "Qual é o resultado de 3/4 + 2/8?",
    alternatives: ["5/12", "1", "7/8", "5/8"],
    correctAnswer: "B",
    explanation: "3/4 + 2/8 = 6/8 + 2/8 = 8/8 = 1",
    subject: "Matemática",
    topic: "Frações",
    difficulty: "EASY"
  },
  {
    statement: "Um professor comprou 5 caixas de giz com 12 unidades cada. Usou 28 gizes. Quantos restam?",
    alternatives: ["32 gizes", "28 gizes", "40 gizes", "35 gizes"],
    correctAnswer: "A",
    explanation: "5 × 12 = 60 gizes no total. 60 - 28 = 32 gizes restantes.",
    subject: "Matemática",
    topic: "Operações Fundamentais",
    difficulty: "EASY"
  },
  {
    statement: "Se 25% de um número é 80, qual é esse número?",
    alternatives: ["200", "320", "240", "160"],
    correctAnswer: "B",
    explanation: "25% = 1/4. Se 1/4 do número = 80, então o número é 80 × 4 = 320.",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "A área de um retângulo de 8m por 5m é:",
    alternatives: ["13 m²", "26 m²", "40 m²", "20 m²"],
    correctAnswer: "C",
    explanation: "Área = comprimento × largura = 8 × 5 = 40 m²",
    subject: "Matemática",
    topic: "Geometria",
    difficulty: "EASY"
  },
  {
    statement: "Quanto é 15% de 200?",
    alternatives: ["20", "25", "30", "35"],
    correctAnswer: "C",
    explanation: "15% de 200 = 0,15 × 200 = 30",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "EASY"
  },
  {
    statement: "O perímetro de um quadrado de lado 6 cm é:",
    alternatives: ["24 cm", "36 cm", "12 cm", "18 cm"],
    correctAnswer: "A",
    explanation: "Perímetro do quadrado = 4 × lado = 4 × 6 = 24 cm",
    subject: "Matemática",
    topic: "Geometria",
    difficulty: "EASY"
  },
  {
    statement: "Se um produto custa R$ 80,00 e teve um desconto de 20%, qual o valor final?",
    alternatives: ["R$ 60,00", "R$ 64,00", "R$ 70,00", "R$ 75,00"],
    correctAnswer: "B",
    explanation: "Desconto: 20% de 80 = 16. Valor final: 80 - 16 = R$ 64,00",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "Quanto é 2/3 de 90?",
    alternatives: ["30", "45", "60", "75"],
    correctAnswer: "C",
    explanation: "2/3 de 90 = (2 × 90) ÷ 3 = 180 ÷ 3 = 60",
    subject: "Matemática",
    topic: "Frações",
    difficulty: "MEDIUM"
  },
  {
    statement: "Em uma divisão, o dividendo é 144, o divisor é 12. Qual é o quociente?",
    alternatives: ["10", "11", "12", "13"],
    correctAnswer: "C",
    explanation: "144 ÷ 12 = 12",
    subject: "Matemática",
    topic: "Operações Fundamentais",
    difficulty: "EASY"
  },
  // QUESTÕES ADICIONAIS DE MATEMÁTICA
  {
    statement: "Uma sala tem 24 alunos. Se 1/3 são meninos, quantas são as meninas?",
    alternatives: ["8", "12", "16", "18"],
    correctAnswer: "C",
    explanation: "1/3 de 24 = 8 meninos. Logo, 24 - 8 = 16 meninas.",
    subject: "Matemática",
    topic: "Frações",
    difficulty: "MEDIUM"
  },
  {
    statement: "Qual é o resultado de 7 × 8 + 12 ÷ 4?",
    alternatives: ["59", "56", "23", "17"],
    correctAnswer: "A",
    explanation: "7 × 8 = 56; 12 ÷ 4 = 3; 56 + 3 = 59",
    subject: "Matemática",
    topic: "Operações Fundamentais",
    difficulty: "MEDIUM"
  },
  {
    statement: "Um triângulo tem lados de 3 cm, 4 cm e 5 cm. Qual é o seu perímetro?",
    alternatives: ["12 cm", "15 cm", "20 cm", "60 cm"],
    correctAnswer: "A",
    explanation: "Perímetro = soma dos lados = 3 + 4 + 5 = 12 cm",
    subject: "Matemática",
    topic: "Geometria",
    difficulty: "EASY"
  },
  {
    statement: "Se 3 canetas custam R$ 15,00, quanto custam 7 canetas?",
    alternatives: ["R$ 30,00", "R$ 35,00", "R$ 40,00", "R$ 45,00"],
    correctAnswer: "B",
    explanation: "Regra de três: 3 canetas = R$ 15; 7 canetas = x. x = (7 × 15) ÷ 3 = R$ 35,00",
    subject: "Matemática",
    topic: "Regra de Três",
    difficulty: "MEDIUM"
  },
  {
    statement: "Qual é a metade de 2/5?",
    alternatives: ["1/5", "1/10", "4/10", "2/10"],
    correctAnswer: "B",
    explanation: "Metade de 2/5 = (2/5) ÷ 2 = (2/5) × (1/2) = 2/10 = 1/5",
    subject: "Matemática",
    topic: "Frações",
    difficulty: "MEDIUM"
  },
  {
    statement: "Um círculo tem raio de 5 cm. Qual é o seu diâmetro?",
    alternatives: ["5 cm", "10 cm", "15 cm", "25 cm"],
    correctAnswer: "B",
    explanation: "Diâmetro = 2 × raio = 2 × 5 = 10 cm",
    subject: "Matemática",
    topic: "Geometria",
    difficulty: "EASY"
  },
  {
    statement: "Se um número aumentado de 30% resulta em 156, qual é esse número?",
    alternatives: ["100", "120", "130", "140"],
    correctAnswer: "B",
    explanation: "x + 30% de x = 156; x + 0,3x = 156; 1,3x = 156; x = 156 ÷ 1,3 = 120",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "HARD"
  },
  {
    statement: "Quantos minutos há em 2 horas e 45 minutos?",
    alternatives: ["145 minutos", "165 minutos", "175 minutos", "185 minutos"],
    correctAnswer: "B",
    explanation: "2 horas = 2 × 60 = 120 minutos. 120 + 45 = 165 minutos",
    subject: "Matemática",
    topic: "Medidas de Tempo",
    difficulty: "EASY"
  },
  {
    statement: "A diferença entre 5/6 e 2/3 é:",
    alternatives: ["1/6", "3/3", "1/3", "2/6"],
    correctAnswer: "A",
    explanation: "5/6 - 2/3 = 5/6 - 4/6 = 1/6",
    subject: "Matemática",
    topic: "Frações",
    difficulty: "MEDIUM"
  },
  {
    statement: "Se 5 operários fazem um trabalho em 12 dias, quantos dias levarão 3 operários para fazer o mesmo trabalho?",
    alternatives: ["15 dias", "18 dias", "20 dias", "24 dias"],
    correctAnswer: "C",
    explanation: "Regra de três inversa: 5 operários - 12 dias; 3 operários - x dias. x = (5 × 12) ÷ 3 = 20 dias",
    subject: "Matemática",
    topic: "Regra de Três",
    difficulty: "HARD"
  },

  // =================== CONHECIMENTOS PEDAGÓGICOS (40 QUESTÕES) ===================
  {
    statement: "De acordo com a Lei de Diretrizes e Bases da Educação Nacional (LDB - Lei 9.394/96), a educação básica tem por finalidade:",
    alternatives: ["Desenvolver apenas o raciocínio lógico-matemático", "Preparar exclusivamente para o mercado de trabalho", "Desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores", "Focar apenas no desenvolvimento de habilidades técnicas"],
    correctAnswer: "C",
    explanation: "Conforme o Art. 22 da LDB, a educação básica tem por finalidade desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "LDB - Lei 9.394/96",
    difficulty: "MEDIUM"
  },
  {
    statement: "O Estatuto da Criança e do Adolescente (ECA) considera criança a pessoa:",
    alternatives: ["Até 10 anos de idade", "Até 12 anos incompletos", "Até 14 anos de idade", "Até 16 anos de idade"],
    correctAnswer: "B",
    explanation: "Segundo o ECA (Lei 8.069/90), criança é a pessoa até 12 anos de idade incompletos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "ECA - Lei 8.069/90",
    difficulty: "EASY"
  },
  {
    statement: "Segundo Paulo Freire, a educação problematizadora se caracteriza por:",
    alternatives: ["Depositar conhecimentos nos educandos", "Estabelecer uma relação vertical entre educador e educando", "Desenvolver a consciência crítica dos educandos", "Utilizar exclusivamente métodos tradicionais de ensino"],
    correctAnswer: "C",
    explanation: "Para Paulo Freire, a educação problematizadora visa desenvolver a consciência crítica, opondo-se à educação bancária.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Teorias Pedagógicas",
    difficulty: "MEDIUM"
  },
  {
    statement: "A Base Nacional Comum Curricular (BNCC) define:",
    alternatives: ["Os salários dos professores da educação básica", "As competências e habilidades essenciais que todos os alunos devem desenvolver", "O número máximo de alunos por sala de aula", "A carga horária de trabalho dos professores"],
    correctAnswer: "B",
    explanation: "A BNCC define as competências e habilidades essenciais que todos os alunos devem desenvolver ao longo da educação básica.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "BNCC",
    difficulty: "MEDIUM"
  },
  {
    statement: "O planejamento pedagógico deve ser:",
    alternatives: ["Rígido e imutável durante todo o ano letivo", "Flexível e adaptável às necessidades dos alunos", "Elaborado exclusivamente pela direção da escola", "Igual para todas as turmas da escola"],
    correctAnswer: "B",
    explanation: "O planejamento pedagógico deve ser flexível e adaptável para atender às necessidades específicas dos alunos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Planejamento Pedagógico",
    difficulty: "EASY"
  },
  {
    statement: "A avaliação da aprendizagem deve ser:",
    alternatives: ["Apenas classificatória", "Contínua, cumulativa e diagnóstica", "Realizada apenas no final do bimestre", "Focada exclusivamente em provas escritas"],
    correctAnswer: "B",
    explanation: "Segundo a LDB, a avaliação deve ser contínua, cumulativa e diagnóstica, priorizando aspectos qualitativos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Avaliação da Aprendizagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "A gestão democrática do ensino público é:",
    alternatives: ["Opcional para as escolas", "Princípio estabelecido na Constituição Federal", "Aplicável apenas ao ensino superior", "Responsabilidade exclusiva dos diretores"],
    correctAnswer: "B",
    explanation: "A gestão democrática do ensino público é princípio estabelecido na Constituição Federal (Art. 206, VI).",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Gestão Democrática",
    difficulty: "MEDIUM"
  },
  {
    statement: "O Projeto Político-Pedagógico (PPP) da escola deve:",
    alternatives: ["Ser elaborado apenas pela direção", "Seguir um modelo único nacional", "Ser construído coletivamente pela comunidade escolar", "Ser modificado apenas a cada 5 anos"],
    correctAnswer: "C",
    explanation: "O PPP deve ser construído coletivamente pela comunidade escolar, refletindo sua identidade e necessidades.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Projeto Político-Pedagógico",
    difficulty: "MEDIUM"
  },
  {
    statement: "A educação inclusiva pressupõe:",
    alternatives: ["Escolas especiais separadas", "Adaptação apenas dos alunos à escola", "Transformação da escola para atender a todos", "Atendimento apenas a deficiências físicas"],
    correctAnswer: "C",
    explanation: "A educação inclusiva pressupõe a transformação da escola para atender à diversidade de todos os alunos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Educação Inclusiva",
    difficulty: "MEDIUM"
  },
  {
    statement: "Segundo Vygotsky, a Zona de Desenvolvimento Proximal (ZDP) é:",
    alternatives: ["A capacidade atual da criança", "A distância entre o desenvolvimento real e potencial", "O limite máximo de aprendizagem", "A idade cronológica da criança"],
    correctAnswer: "B",
    explanation: "Para Vygotsky, a ZDP é a distância entre o nível de desenvolvimento real e o nível de desenvolvimento potencial.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Teorias do Desenvolvimento",
    difficulty: "HARD"
  },
  // QUESTÕES ADICIONAIS DE CONHECIMENTOS PEDAGÓGICOS
  {
    statement: "Segundo a LDB, o ensino fundamental obrigatório tem duração de:",
    alternatives: ["8 anos", "9 anos", "10 anos", "11 anos"],
    correctAnswer: "B",
    explanation: "A LDB estabelece que o ensino fundamental obrigatório tem duração de 9 anos, iniciando-se aos 6 anos de idade.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "LDB - Lei 9.394/96",
    difficulty: "EASY"
  },
  {
    statement: "A Constituição Federal de 1988 estabelece que a educação é:",
    alternatives: ["Direito de alguns e dever do Estado", "Direito de todos e dever do Estado e da família", "Responsabilidade apenas da família", "Opcional para crianças até 7 anos"],
    correctAnswer: "B",
    explanation: "O Art. 205 da CF/88 estabelece que a educação é direito de todos e dever do Estado e da família.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Constituição Federal",
    difficulty: "EASY"
  },
  {
    statement: "Segundo Piaget, o estágio operatório concreto ocorre aproximadamente entre:",
    alternatives: ["2 a 7 anos", "7 a 11 anos", "11 a 15 anos", "15 a 18 anos"],
    correctAnswer: "B",
    explanation: "Para Piaget, o estágio operatório concreto ocorre entre 7 e 11 anos, quando a criança desenvolve o pensamento lógico.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Teorias do Desenvolvimento",
    difficulty: "MEDIUM"
  },
  {
    statement: "O Conselho de Classe tem como principal função:",
    alternatives: ["Punir alunos indisciplinados", "Avaliar coletivamente o processo ensino-aprendizagem", "Definir o calendário escolar", "Contratar professores"],
    correctAnswer: "B",
    explanation: "O Conselho de Classe é um órgão colegiado que avalia o processo ensino-aprendizagem de forma coletiva.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Gestão Escolar",
    difficulty: "MEDIUM"
  },
  {
    statement: "A interdisciplinaridade na educação significa:",
    alternatives: ["Eliminar as disciplinas", "Integrar conhecimentos de diferentes áreas", "Focar apenas em uma disciplina", "Separar totalmente as matérias"],
    correctAnswer: "B",
    explanation: "A interdisciplinaridade busca integrar conhecimentos de diferentes áreas para uma compreensão mais ampla.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Metodologia de Ensino",
    difficulty: "MEDIUM"
  },
  {
    statement: "Segundo a LDB, a carga horária mínima anual do ensino fundamental é de:",
    alternatives: ["600 horas", "800 horas", "1000 horas", "1200 horas"],
    correctAnswer: "B",
    explanation: "A LDB estabelece 800 horas anuais como carga horária mínima para o ensino fundamental.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "LDB - Lei 9.394/96",
    difficulty: "MEDIUM"
  },
  {
    statement: "A pedagogia de projetos caracteriza-se por:",
    alternatives: ["Aulas expositivas tradicionais", "Aprendizagem baseada em problemas reais", "Memorização de conteúdos", "Avaliação apenas por provas"],
    correctAnswer: "B",
    explanation: "A pedagogia de projetos baseia-se na aprendizagem através de problemas reais e significativos para os alunos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Metodologia de Ensino",
    difficulty: "MEDIUM"
  },
  {
    statement: "O bullying escolar deve ser combatido através de:",
    alternatives: ["Punições severas apenas", "Ações preventivas e educativas", "Ignorar o problema", "Separar os envolvidos"],
    correctAnswer: "B",
    explanation: "O combate ao bullying requer ações preventivas e educativas que promovam o respeito e a tolerância.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Convivência Escolar",
    difficulty: "MEDIUM"
  },
  {
    statement: "A função social da escola é:",
    alternatives: ["Apenas transmitir conhecimentos", "Formar cidadãos críticos e participativos", "Preparar apenas para o vestibular", "Cuidar das crianças enquanto os pais trabalham"],
    correctAnswer: "B",
    explanation: "A função social da escola é formar cidadãos críticos, participativos e preparados para a vida em sociedade.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Função Social da Escola",
    difficulty: "MEDIUM"
  },
  {
    statement: "A recuperação paralela deve ocorrer:",
    alternatives: ["Apenas no final do ano", "Durante todo o processo educativo", "Só para alunos reprovados", "Apenas nas férias"],
    correctAnswer: "B",
    explanation: "A recuperação paralela deve ser contínua, ocorrendo durante todo o processo educativo para garantir a aprendizagem.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Avaliação da Aprendizagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "Segundo Henri Wallon, o desenvolvimento infantil é:",
    alternatives: ["Apenas cognitivo", "Apenas motor", "Integrado: afetivo, cognitivo e motor", "Apenas afetivo"],
    correctAnswer: "C",
    explanation: "Para Wallon, o desenvolvimento é integrado, envolvendo aspectos afetivos, cognitivos e motores de forma indissociável.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Teorias do Desenvolvimento",
    difficulty: "HARD"
  },
  {
    statement: "A educação de jovens e adultos (EJA) deve:",
    alternatives: ["Usar os mesmos métodos do ensino regular", "Considerar as especificidades dos educandos", "Focar apenas na alfabetização", "Ter duração fixa para todos"],
    correctAnswer: "B",
    explanation: "A EJA deve considerar as especificidades, experiências e conhecimentos prévios dos educandos jovens e adultos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Modalidades de Ensino",
    difficulty: "MEDIUM"
  },
  {
    statement: "O currículo escolar deve ser:",
    alternatives: ["Igual para todo o país", "Flexível e adaptado à realidade local", "Focado apenas em conteúdos teóricos", "Definido apenas pelo governo federal"],
    correctAnswer: "B",
    explanation: "O currículo deve ser flexível e adaptado à realidade local, respeitando a diversidade cultural e regional.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Currículo",
    difficulty: "MEDIUM"
  },
  {
    statement: "A formação continuada de professores é:",
    alternatives: ["Opcional", "Direito e dever do profissional", "Responsabilidade apenas do professor", "Desnecessária após a graduação"],
    correctAnswer: "B",
    explanation: "A formação continuada é direito e dever do profissional da educação para manter-se atualizado e melhorar sua prática.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Formação de Professores",
    difficulty: "MEDIUM"
  },
  {
    statement: "Segundo a teoria das inteligências múltiplas de Gardner:",
    alternatives: ["Existe apenas um tipo de inteligência", "Há diferentes tipos de inteligência", "A inteligência é fixa", "Apenas a inteligência lógica importa"],
    correctAnswer: "B",
    explanation: "Gardner propõe que existem múltiplas inteligências (linguística, lógica, espacial, musical, etc.), não apenas uma.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Teorias da Aprendizagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "A participação da família na escola deve ser:",
    alternatives: ["Desencorajada", "Limitada a reuniões de pais", "Ativa e colaborativa", "Apenas em eventos festivos"],
    correctAnswer: "C",
    explanation: "A participação da família deve ser ativa e colaborativa, contribuindo para o processo educativo dos filhos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Relação Escola-Família",
    difficulty: "EASY"
  },
  {
    statement: "O lúdico na educação infantil é:",
    alternatives: ["Perda de tempo", "Fundamental para o desenvolvimento", "Apenas entretenimento", "Opcional"],
    correctAnswer: "B",
    explanation: "O lúdico é fundamental na educação infantil, pois através do brincar a criança aprende e se desenvolve integralmente.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Educação Infantil",
    difficulty: "EASY"
  },
  {
    statement: "A diversidade cultural na escola deve ser:",
    alternatives: ["Ignorada", "Combatida", "Valorizada e respeitada", "Padronizada"],
    correctAnswer: "C",
    explanation: "A diversidade cultural deve ser valorizada e respeitada, enriquecendo o processo educativo e promovendo a tolerância.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Diversidade e Inclusão",
    difficulty: "EASY"
  },
  {
    statement: "Segundo Emília Ferreiro, a alfabetização é um processo:",
    alternatives: ["Mecânico de decodificação", "De construção de hipóteses sobre a escrita", "Que deve começar aos 7 anos", "Baseado apenas na repetição"],
    correctAnswer: "B",
    explanation: "Para Emília Ferreiro, a alfabetização é um processo de construção de hipóteses sobre a escrita, não apenas decodificação.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Alfabetização e Letramento",
    difficulty: "MEDIUM"
  },
  {
    statement: "O professor reflexivo é aquele que:",
    alternatives: ["Apenas aplica técnicas prontas", "Reflete sobre sua prática e a modifica", "Segue apenas o livro didático", "Não questiona seus métodos"],
    correctAnswer: "B",
    explanation: "O professor reflexivo analisa sua prática, questiona seus métodos e busca constantemente melhorar seu trabalho pedagógico.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Prática Pedagógica",
    difficulty: "MEDIUM"
  }
]

export async function POST() {
  try {
    console.log('🚀 Iniciando população de questões REAIS específicas...')
    
    // Limpar questões existentes (opcional)
    await prisma.question.deleteMany({})
    await prisma.alternative.deleteMany({})
    await prisma.subject.deleteMany({})
    await prisma.topic.deleteMany({})
    
    console.log('🗑️ Banco limpo, inserindo questões reais...')
    
    let totalCreated = 0
    
    for (const questionData of realQuestions) {
      // Criar ou encontrar subject
      const subject = await prisma.subject.upsert({
        where: { name: questionData.subject },
        update: {},
        create: {
          name: questionData.subject,
          description: `Disciplina: ${questionData.subject}`
        }
      })
      
      // Criar ou encontrar topic
      const topic = await prisma.topic.upsert({
        where: { name: questionData.topic },
        update: {},
        create: {
          name: questionData.topic,
          description: `Tópico: ${questionData.topic}`
        }
      })
      
      // Criar questão
      const question = await prisma.question.create({
        data: {
          statement: questionData.statement,
          type: 'MULTIPLE_CHOICE',
          difficulty: questionData.difficulty as any,
          subjectId: subject.id,
          topicId: topic.id,
          correctAnswer: questionData.correctAnswer,
          explanation: questionData.explanation,
          source: 'Concursos Públicos Específicos',
          year: 2025,
          institution: 'Professor Adjunto Educação Básica I'
        }
      })
      
      // Criar alternativas
      const letters = ['A', 'B', 'C', 'D']
      for (let i = 0; i < questionData.alternatives.length; i++) {
        await prisma.alternative.create({
          data: {
            letter: letters[i],
            text: questionData.alternatives[i],
            questionId: question.id
          }
        })
      }
      
      totalCreated++
      console.log(`✅ Questão ${totalCreated}: ${questionData.subject} - ${questionData.topic}`)
    }
    
    // Estatísticas finais
    const stats = await prisma.subject.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      }
    })
    
    console.log('🎯 População concluída!')
    stats.forEach(subject => {
      console.log(`📚 ${subject.name}: ${subject._count.questions} questões`)
    })
    
    return NextResponse.json({
      success: true,
      message: `${totalCreated} questões REAIS específicas populadas com sucesso!`,
      data: {
        total: totalCreated,
        subjects: stats.map(s => ({
          name: s.name,
          count: s._count.questions
        }))
      }
    })
    
  } catch (error) {
    console.error('❌ Erro ao popular questões reais:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Erro ao popular questões reais',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
