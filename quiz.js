angular.module('quizApp', [])
    .controller('QuizController', ['$scope', '$interval', function($scope, $interval) {
        $scope.questions = [
            {
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
                options:['Dispur','Timphu','Kohima','Imphal'],
                correctAnswer:'Kohima'
            },
            {
                question: 'How many seats are there in loaksabha',
                options:['560','554','594','545'],
                correctAnswer: '545'
            },
            {
                question: ' How does tha induction motor start',
                options: ['urrrrrr','hurrrrr','burrrr'],
                correctAnswer: 'burrrr'
            },
            // Add more questions here
        ];


        $scope.visitedQuestionIndices = [];

        $scope.currentQuestionIndex = 0;
        $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];

        var mainTimerInterval, questionTimerInterval;
        $scope.mainTimer = 60; // 60 seconds = 1 minute


        startMainTimer();

        function startMainTimer() {
            mainTimerInterval = $interval(function() {
                if ($scope.mainTimer > 0) {
                    $scope.mainTimer--;
                    
                } else {
                    $scope.mainTimer = 60; // Reset main timer
                    moveToNextQuestion();
                }
            }, 100); // Update timer every second
        }



        function stopTimers() {
            if (angular.isDefined(mainTimerInterval)) {
                $interval.cancel(mainTimerInterval);
                mainTimerInterval = undefined;
            }
            if (angular.isDefined(questionTimerInterval)) {
                $interval.cancel(questionTimerInterval);
                questionTimerInterval = undefined;
            }
        }

        function moveToNextQuestion() {
            if ($scope.currentQuestionIndex < $scope.questions.length - 1) {
                if (!$scope.visitedQuestionIndices.includes($scope.currentQuestionIndex)) {
                    $scope.visitedQuestionIndices.push($scope.currentQuestionIndex);
                }
                $scope.currentQuestionIndex++;
                $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
                $scope.mainTimer = 60;
            } else {
                if (!$scope.visitedQuestionIndices.includes($scope.currentQuestionIndex)) {
                    $scope.visitedQuestionIndices.push($scope.currentQuestionIndex);
                }
                $scope.submitQuiz();
                stopTimers(); // Stop timers if last question is reached
            }
        }

        $scope.nextQuestion = function() {
            moveToNextQuestion();
            $scope.mainTimer = 60;
            
        };

        $scope.previousQuestion = function() {
            if ($scope.currentQuestionIndex > 0) {
                // Check if the previous question has been visited
                if (!$scope.visitedQuestionIndices.includes($scope.currentQuestionIndex - 1)) {
                    // If not visited, allow to go to the previous question
                    $scope.currentQuestionIndex--;
                    $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
                }
            }
        };
        

        // $scope.goToQuestion = function(index) {
        //     // Update visited question indices
        //     if ($scope.currentQuestionIndex !== index) {
        //         $scope.visitedQuestionIndices.push($scope.currentQuestionIndex);
        //     }

        //     $scope.currentQuestionIndex = index;
        //     $scope.currentQuestion = $scope.questions[index];
        //     $scope.mainTimer = 60;

    
        // };


        $scope.submitQuiz = function() {
        
            alert('THANK YOU FOR ATTENDING THE ASSESSMENT');
            stopTimers(); 
        };
    }]);
