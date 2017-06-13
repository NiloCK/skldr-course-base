"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RX = require("reactxp");
var Moment = require("moment");
// import Recorder from '../appUtilities/Recorder'
var BaseClasses;
(function (BaseClasses) {
    var Viewable = (function (_super) {
        __extends(Viewable, _super);
        function Viewable(props) {
            return _super.call(this, props) || this;
        }
        Viewable.prototype.init = function () {
            this.startTime = Moment();
        };
        Viewable.prototype.timeSinceStart = function () {
            var now = Moment();
            var milliseconds = now.diff(this.startTime);
            return milliseconds / 1000;
        };
        return Viewable;
    }(RX.Component));
    var Question = (function () {
        function Question() {
        }
        return Question;
    }());
    var QuestionView = (function (_super) {
        __extends(QuestionView, _super);
        function QuestionView(props) {
            var _this = _super.call(this, props) || this;
            _this.componentDidMount = function () {
                _this.init();
            };
            return _this;
        }
        QuestionView.prototype.init = function () {
            _super.prototype.init.call(this);
            this.attempts = 0;
        };
        QuestionView.prototype.userAnswer = function () {
            var input = document.getElementById('answer');
            return parseInt(input.value);
        };
        ;
        QuestionView.prototype.isCorrect = function () {
            return this.props.question.isCorrect(this.userAnswer());
        };
        QuestionView.prototype.submit = function (e) {
            e.preventDefault();
            this.attempts++;
            var input = document.getElementById('answer');
            var userans = parseInt(input.value);
            var isCorrect = this.isCorrect();
            var a = this;
            // Recorder.addRecord({
            //     q: (this.constructor as ClassConstructor).name,
            //     props: this.strippedProps(),
            //     answer: this.userAnswer(),
            //     isCorrect: isCorrect,
            //     attempts: this.attempts,
            //     time: this.timeSinceStart()
            // })
            input.value = "";
            this.animate(isCorrect);
            if (isCorrect) {
                this.props.onanswer();
            }
        };
        /**
         * Removes functions from the components props, so that the props can be pouched
         */
        QuestionView.prototype.strippedProps = function () {
            var _this = this;
            var strippedProps = {};
            Object.keys(this.props).forEach(function (key) {
                var prop = _this.props[key];
                if (typeof (prop) != 'function') {
                    strippedProps[key] = prop;
                }
            });
            return strippedProps;
        };
        QuestionView.prototype.animate = function (correct) {
            var questionDiv = document.getElementById("question");
            questionDiv.classList.add("correct-" + correct); // see /src/styles/answerStyles.css
            setTimeout(function () {
                questionDiv.classList.remove("correct-true", "correct-false");
            }, 1000);
        };
        return QuestionView;
    }(Viewable));
    QuestionView.staticThing = 5; //?
})(BaseClasses = exports.BaseClasses || (exports.BaseClasses = {}));
