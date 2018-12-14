/**
 * Sound user interface ! 
 */

function Sui(holder) {

    this.audio_newItem = new Audio('audio/new.mp3');
    this.audio_correctAnswer = new Audio('audio/correct.mp3');
    this.audio_wrongAnswer = new Audio('audio/wrong.mp3');
    this.audio_timeOut = new Audio('audio/timeout.mp3');

    this.newItem = function (item, operator) {
        this.audio_newItem.play();
    }

    this.correctAnswer = function () {
        this.audio_correctAnswer.play();
        }

    this.wrongAnswer = function () {
        this.audio_wrongAnswer.play();
    }

    this.hasTimedOut = function () {
       this.audio_timeOut.play();
    }
}