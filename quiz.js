angular.module('quizApp', [])
    .controller('QuizController', ['$scope', function ($scope) {
        // Initialize the quiz questions
        $scope.questions = [{
                question: 'What is the capital of France?',
                options: ['Paris', 'London', 'Berlin', 'Rome'],
                correctAnswer: 'Paris'
            },
            {
                question: 'Which planet is known as the Red Planet?',
                options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
                correctAnswer: 'Mars'
            },
            {
                question: 'What is the capital of nagaland.',
                options: ['Dispur', 'Timphu', 'Kohima', 'Imphal'],
                correctAnswer: 'Kohima'
            },
            {
                question: 'How many seats are there in loaksabha',
                options: ['560', '554', '594', '545'],
                correctAnswer: '545'
            },
            {
                question: ' How does tha induction motor start',
                options: ['a', 'br', 'c'],
                correctAnswer: 'br'
            },
            {
                question: 'What is 5?',
                options: ['3', '4', '5', '7'],
                correctAnswer: '5'
            },
            {
                question: 'Whixh of the following is a bird?',
                options: ['Horse', 'airplane', 'donkey', 'pegion'],
                correctAnswer: 'pigeon'
            }
        ];

        // Initialize variables for the quiz
        $scope.currentQuestionIndex = 0;
        $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
        $scope.mainTimer = 30; 

        // Create a new web worker for the main timer
        var timerWorker = new Worker('timerWorker.js');

        // Start the main timer
        timerWorker.postMessage({
            mainTimer: $scope.mainTimer
        });

        // Listen for messages from the web worker
        timerWorker.onmessage = function (event) {
            var message = event.data;
            if (message.type === 'updateTimer') {
                $scope.$apply(function () {
                    $scope.mainTimer = message.mainTimer;
                });
            } else if (message.type === 'moveToNextQuestion') {
                moveToNextQuestion();
            } else if (message.type === 'submitQuiz') {
                submitQuiz();
            }
        };



        


        // Function to move to the next question
        function moveToNextQuestion() {
            if ($scope.currentQuestionIndex < $scope.questions.length - 1) {
                $scope.currentQuestionIndex++;
                $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];

                // Restart the timer
                $scope.mainTimer = 30; // Reset to initial timer value
                timerWorker.postMessage({
                    type: 'restartTimer',
                    mainTimer: $scope.mainTimer
                });
            } else {
                $scope.submitQuiz();
                stopTimers(); 
            }
        }

        $scope.stopTimerWorker = function () {
            timerWorker.terminate();
            alert("Timer stopped.");
        };

        $scope.nextQuestion = function () {
            moveToNextQuestion();

            $scope.mainTimer = 30;
        };




        // Function to handle submission of the quiz
        $scope.submitQuiz = function () {
            // stopTimers()
            timerWorker.terminate();
            alert("Thank You ")
        };
    }]);
