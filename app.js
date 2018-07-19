"use strict";

var questionIndex;
var questionSet;
var currentQuestion;


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
	questionHTML += '</div></div></div>'
	return questionHTML;
}


var addClickOptionListener = function(){
	$(".quiz-frame").on('click', '.option', function(event){
		$(".option").removeClass("highlighted");
		$(this).addClass("highlighted");
	});
}

var i = 0;
var addSubmitListener = function(){
	$(".question").submit(function(event){
		event.preventDefault();
		var selectedOption = $('.highlighted');
		$(".quiz-test .question-info").html(getQuestionHTML(QUESTIONS[i++]));
	});
}

var addAllListeners = function(){
	addClickOptionListener();
	addSubmitListener();
}

var setUpQuiz = function(questions){
	questionSet = questions;
	questionIndex = -1;
}

var displayResults = function(){
	var resultsHTML = getResultsHTML();
	$('.quiz-frame').html(resultsHTML);
}

var nextQuestion = function(){
	if(questionIndex < (questionSet.length - 1))
		currentQuestion = questionSet[++questionIndex];
	else
		displayResults();
}

$(addAllListeners);