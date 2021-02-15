var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: './template.html',
		link: function(scope,) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				scope.right = ''
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();
				
				
				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
					scope.right = scope.options[scope.answer]
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "O que significa CSS ?",
			options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
			answer: 0
		},
		{
			question: "Qual o html correto para se referir a uma style Sheet correta ?",
			options: [      
                        "<stylesheet>mystyle.css</stylesheet>", 
                        "<link rel='stylesheet' type='text/css' href='mystyle.css'>", 
                        " <style src='mystyle.css'>", 
                        "<link='style' href='.css'>"
                    ],
			answer: 1
		},
		{
			question: "Qual o local onde inserimos um style sheet de maneira correta no html ?",
			options: ["section", "body", "head", "inserimos no javascript"],
			answer: 2
		},
		{
			question: "Qual tag é usada no html para definir uma style sheet ?",
			options: ["<css>", "<script>", "<sheet>", "<style>"],
			answer: 3
		},
		{	
			question: "Qual a sintase para utilizar um css ? ",
			options: [" {body;color:black;}", " body:color=black;", " {body:color=black;}", " body {color: black;}"],
			answer: 3
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});