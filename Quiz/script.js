const quizData = [
    {
        question: "Who is the owner of SpaceX ?",
        a: "Elon Reeve Musk",
        b: "Mark",
        c: "Bill Gate",
        d: "Elon Musk",
        correct: "d",
    },

    {
        question: "What's the name of Lugacity?",
        a: "Yinka Opeyemi",
        b: "Yinka Abeeb Adesina",
        c: "Habeeb Olayinka",
        d: "Abdullahi",
        correct: "b",
    },

    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },

    {
        question: "What does CSS sstand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading SImpple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },

    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyerploop Machine Language",
        d: "Helicopters Terminal Motorboats",
        correct: "a",
    },

    {
        question: "What your was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "None of the above",
        correct: "b",
    },
];

        const quiz = document.getElementById('quiz');
        const answerEls = document.querySelectorAll('.answer');
        const questionEl = document.getElementById('questions');
        const a_text = document.getElementById('a_text');
        const b_text = document.getElementById('b_text');
        const c_text = document.getElementById('c_text');
        const d_text = document.getElementById('d_text');
        const submitBtn = document.getElementById('submit');

        let currentQuiz = 0;
        let score = 0;
        let userAnswers = Array(quizData.length).fill(null);

        loadQuiz();

        function loadQuiz() {
            deselectAnswers();

            const currentQuizData = quizData[currentQuiz];

            questionEl.innerText = currentQuizData.question;
            a_text.innerText = currentQuizData.a;
            b_text.innerText = currentQuizData.b;
            c_text.innerText = currentQuizData.c;
            d_text.innerText = currentQuizData.d;

            // Check the user's previous answer
            const userAnswer = userAnswers[currentQuiz];
            const selectedInput = document.getElementById(userAnswer);
            if (selectedInput) {
                selectedInput.checked = true;
            }

            // Update the disabled status of prev and next buttons
            document.getElementById('prev').disabled = currentQuiz === 0;
            document.getElementById('next').disabled = currentQuiz === quizData.length - 1;
        }

        function nextQuestion() {
            saveUserAnswer();
            currentQuiz++;
            loadQuiz();
        }

        function prevQuestion() {
            saveUserAnswer();
            currentQuiz--;
            loadQuiz();
        }

        function deselectAnswers() {
            const answerEls = document.querySelectorAll('.answer');

            answerEls.forEach(function (answerEl) {
                answerEl.checked = false;
            });
        }

        function saveUserAnswer() {
            const selectedAnswer = getSelected();
            userAnswers[currentQuiz] = selectedAnswer;
        }

        function getSelected() {
            let answer;

            answerEls.forEach(answerEl => {
                if (answerEl.checked) {
                    answer = answerEl.id;
                }
            });

            return answer;
        }

        function submitQuiz() {
            saveUserAnswer();
        
            // Check if all questions are answered
            if (userAnswers.every(answer => answer !== null)) {
                calculateScore();
                showResult();
            } else {
                alert("Please answer all questions before submitting.");
            }
        }
        
        function calculateScore() {
            score = 0;
            for (let i = 0; i < quizData.length; i++) {
                if (userAnswers[i] === quizData[i].correct) {
                    score++;
                }
            }
        }
        
        

        function showResult() {
            quiz.innerHTML = `
                <h2 class="update_check">Please, follow my page for more updates</h2>
                <h3 class="update_check">You answered ${score}/${quizData.length} questions correctly</h3>`;
            quizData.forEach((question, index) => {
                quiz.innerHTML += `<p class="result">Question ${index + 1}: Your answer - ${userAnswers[index]}, Correct answer - ${question.correct}</p>`;
            });
            quiz.innerHTML += `<button onclick="location.reload()">Reload</button>`;
        }



        // If you want the color to change if user choose the right answer and when choose the wrong answer
        // Here is the code below 

        // function showResult() {
        //     let resultHtml = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>`;
            
        //     quizData.forEach((question, index) => {
        //         const userAnswer = userAnswers[index];
        //         const isCorrect = userAnswer === question.correct;
        //         const backgroundColor = isCorrect ? 'green' : 'red';
        
        //         resultHtml += `<p class="result" style="background-color: ${backgroundColor};">Question ${index + 1}: Your answer - ${userAnswer}, Correct answer - ${question.correct}</p>`;
        //     });
        
        //     resultHtml += `<button onclick="location.reload()">Reload</button>`;
        //     quiz.innerHTML = resultHtml;
        // }