// Seleção dos elementos do DOM
const question = document.querySelector('#question'); // Elemento que exibe a pergunta
const answerBox = document.querySelector('#answers-box'); // Caixa que contém as respostas
const quizContainer = document.querySelector('#quiz-container'); // Container do quiz
const scoreContainer = document.querySelector('#score-container'); // Container para mostrar o resultado
const letters = ['a', 'b', 'c', 'd', 'e']; // Letras para as opções de resposta
let points = 0; // Pontuação inicial
let actualQuestion = 0; // Índice da pergunta atual

// Perguntas do quiz
const questions = [
  {
    question: 'O que é uma variável em programação?',
    answers: [
      { answer: 'Um tipo de dado fixo', correct: false },
      { answer: 'Um espaço na memória para armazenar dados', correct: true },
      { answer: 'Um método para ordenar dados', correct: false },
      { answer: 'Banco de dados', correct: false },
    ],
  },
  {
    question: 'Qual das seguintes estruturas de controle é usada para repetição?',
    answers: [
      { answer: 'input', correct: false },
      { answer: 'print', correct: false },
      { answer: 'for', correct: true },
      { answer: 'if', correct: false },
    ],
  },
  {
    question: 'Em qual linguagem usamos o comando console.log para exibir informações no console?',
    answers: [
      { answer: 'Python', correct: false },
      { answer: 'C++', correct: false },
      { answer: 'HTML', correct: false },
      { answer: 'Javascript', correct: true },
    ],
  },
  {
    question: 'O que é um loop em programação?',
    answers: [
      { answer: 'Uma maneira de sair de uma função', correct: false },
      { answer: 'Um tipo de variável', correct: false },
      { answer: 'Um erro no código', correct: false },
      { answer: 'Uma estrutura de repetição que executa um bloco de código várias vezes', correct: true },
    ],
  },
  {
    question: 'O que significa HTML?',
    answers: [
      { answer: 'Hyper Text Markup Language', correct: true },
      { answer: 'Hyperlink Text Model Language', correct: false },
      { answer: 'High-Level Transfer Machine Language', correct: false },
      { answer: 'Hyperlink Markup Language', correct: false },
    ],
  },
];

// Função para inicializar o quiz, criando a primeira pergunta
function init() {
  createQuestion(0); // Cria a primeira pergunta
}

// Função para criar uma nova pergunta
function createQuestion(i) {
  // Limpa as respostas anteriores
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove(); // Remove cada botão de resposta anterior
  });

  // Atualiza o texto da pergunta e o número da questão
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question; // Atualiza a pergunta
  questionNumber.textContent = i + 1; // Atualiza o número da pergunta

  // Insere as alternativas de resposta
  questions[i].answers.forEach((answer, i) => {
    // Cria um novo botão para a resposta
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);
    
    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i]; // Define a letra da resposta
    answerText.textContent = answer['answer']; // Define o texto da resposta

    answerTemplate.setAttribute('correct-answer', answer['correct']); // Define se a resposta é correta

    // Remove classes desnecessárias
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // Insere a alternativa na tela
    answerBox.appendChild(answerTemplate);

    // Adiciona evento de clique no botão de resposta
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this); // Chama a função para verificar a resposta
    });
  });

  actualQuestion++; // Incrementa o índice da pergunta atual
}

// Função para verificar a resposta do usuário
function checkAnswer(btn) {
  // Seleciona todos os botões de resposta
  const buttons = answerBox.querySelectorAll('button');

  // Verifica se a resposta está correta e adiciona a classe correspondente
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer'); // Marca a resposta correta

      // Checa se o usuário acertou a pergunta
      if (btn === button) {
        points++; // Incrementa os pontos se a resposta estiver correta
      }
    } else {
      button.classList.add('wrong-answer'); // Marca a resposta errada
    }
  });

  // Avança para a próxima pergunta
  nextQuestion();
}

// Função para exibir a próxima pergunta no quiz
function nextQuestion() {
  // Temporizador para mostrar a resposta antes de passar para a próxima pergunta
  setTimeout(function () {
    // Verifica se ainda há perguntas a serem feitas
    if (actualQuestion >= questions.length) {
      showSuccessMessage(); // Exibe mensagem de sucesso se todas as perguntas foram respondidas
      return;
    }

    createQuestion(actualQuestion); // Cria a próxima pergunta
  }, 1200); // Tempo de espera de 1200 milissegundos
}

// Função para exibir a tela final de sucesso
function showSuccessMessage() {
  hideOrShowQuiz(); // Esconde o quiz e mostra a tela de resultado

  // Calcula e exibe a pontuação
  const score = ((points / questions.length) * 100).toFixed(2);
  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString(); // Exibe a pontuação

  // Atualiza o número de respostas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // Atualiza o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// Função para mostrar ou esconder a tela de score
function hideOrShowQuiz() {
  quizContainer.classList.toggle('hide'); // Alterna a visibilidade do container do quiz
  scoreContainer.classList.toggle('hide'); // Alterna a visibilidade do container de score
}

// Evento para reiniciar o quiz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  actualQuestion = 0; // Reinicia o índice da pergunta atual
  points = 0; // Reinicia os pontos
  hideOrShowQuiz(); // Esconde o quiz e mostra a tela de reinício
  init(); // Inicializa o quiz novamente
});

// Inicialização do quiz
init(); // Chama a função de inicialização
