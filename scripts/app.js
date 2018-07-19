"use strict";

var questionIndex;
var questionSet;
var currentQuestion;
var correctCount;
const CORRECT_IMG_URL = "images/green-check.png";
const WRONG_IMG_URL = "images/x-mark.png";
const SUBMIT_BTN_TEXT = "Submit";
const NEXT_BTN_TEXT = "Next Question";
const START_BTN_TEXT = "Start Quiz";

var getOptionHTML = function(option){
	return (`<div class="col-6">
			<div class="option">
			<span>` + option + '</span></div></div>');
}

var getQuestionHTML = function(question){
	var questionHTML = '<h2>' + question.text + `</h2>
					<div class="options"><div class="inner-row">`;
	var optionsHTML = [];
	question.options.forEach(function(opt){optionsHTML.push(getOptionHTML(opt));});
	questionHTML += optionsHTML.shift();
	questionHTML += optionsHTML.shift();
	questionHTML += '</div><div class="inner-row">';
	questionHTML += optionsHTML.shift();
	questionHTML += optionsHTML.shift();
	questionHTML += '</div></div></div>';
	return questionHTML;
}

var addClickOptionListener = function(){
	$(".question-info").on('click', '.option', function(event){
		$(".option").removeClass("highlighted");
		$(this).addClass("highlighted");
	});
}

var nextQuestion = function(){
	if(questionIndex < (questionSet.length - 1)){
		currentQuestion = questionSet[++questionIndex];
		displayQuestion();
		setButtonText(SUBMIT_BTN_TEXT);
		updateProgress();
	}
	else{
		displayResults();
		setButtonText(START_BTN_TEXT);
	}
}

var setUpDefaultQuiz = function(){
	setUpQuiz(QUESTIONS);
}

var startQuiz = function(){
	nextQuestion();
	var button = $(".quiz-btn span");
	button.text(SUBMIT_BTN_TEXT);
}

var getSelectedOption = function(){
	return $('.highlighted span').text();
}

var getButtonText = function(){
	return $(".quiz-btn span").text();
}

var setButtonText = function(newText){
	$(".quiz-btn span").text(newText);
}

var addSubmitListener = function(){
	$(".question").submit(function(event){
		event.preventDefault();
		var buttonText = getButtonText();
		if(buttonText === SUBMIT_BTN_TEXT){
			var selectedOption = getSelectedOption();
			if(selectedOption)
				displayFeedback();
			else
				alert("You need to select an option first!");
		}

		else if(buttonText === NEXT_BTN_TEXT)
			nextQuestion();

		else if(buttonText === START_BTN_TEXT){
			setUpDefaultQuiz();
			startQuiz();
		}



	});
}

var toggleButtonText = function(){
	var buttonText = $(".quiz-btn span");
	console.log(buttonText.text());
	if(buttonText.text() === "Submit")
		buttonText.text("Next Question");
	else if(buttonText.text() === "Next Question")
		buttonText.text("Submit");
}

var addAllListeners = function(){
	addClickOptionListener();
	addSubmitListener();
	setUpQuiz(QUESTIONS);
}

var setUpQuiz = function(questions){
	questionSet = questions;
	questionIndex = -1;
	correctCount = 0;
}

//TODO RESULTS PAGE
var getResultsHTML = function(){
	return (`<h2>Quiz Finished!</h2>
			<div class="feedback-txt">You got <span class="bold">` + correctCount 
			+ `</span> questions right out of <span class="bold">` + questionSet.length 
			+ `</span></div><div class="feedback-txt">Want to give it another go? Click on 'Start Quiz' below!</div>`);
}

var displayResults = function(){
	clearProgress();
	var resultsHTML = getResultsHTML();
	$('.question-info').html(resultsHTML);
}

var displayQuestion = function(){
	$('.question-info').html(getQuestionHTML(currentQuestion));
}

var getFeedBackHTML = function(isCorrect){
	var correctness = isCorrect ? "Correct!" : "Incorrect!";
	var imgpath = isCorrect ? CORRECT_IMG_URL : WRONG_IMG_URL;


	return ('<h3>' + correctness + '</h3>'
		+ '<div class="feedback-txt">The correct answer was: <span class="bold">' + currentQuestion.correctOption + '</span></div>'
		+ '<img class="feedback-img" src="' +imgpath + '"">'
		+ '<div class="feedback-txt">' + currentQuestion.feedback + '</div>');
}

var displayFeedback = function(){
	var isCorrectAnswer = (getSelectedOption() === currentQuestion.correctOption);
	if(isCorrectAnswer)
		correctCount++;
	$('.question-info').html(getFeedBackHTML(isCorrectAnswer));
	setButtonText(NEXT_BTN_TEXT);
}

var getProgressHTML = function(){
	return ('<div class="col-6">Question ' + (questionIndex+1) + ' of ' + questionSet.length
				+ '</div><div class="col-6">' + correctCount + ' Correct</div>');
}

var updateProgress = function(){
	$('.progress').html(getProgressHTML());
}

var clearProgress = function(){
	$('.progress').html("");
}

$(addAllListeners);