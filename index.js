
main = $("#main");
parent = $("#parent");
var title = document.createElement("h1");
title.classList.add("title");
title.innerHTML = "The Quiz App"
main.append(title)
var questions;
var quiz = document.createElement("div");
quiz.classList.add("quiz")

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", successCallback).fail(errorCallback);

// Callback function for a successful response
function successCallback(data) {
    var i = 1;
    questions= data;
    data.forEach(element => {
        question = element.question;
        ans = element.answer;
        options = element.options;
        Que = document.createElement("p");
        Que.setAttribute("id", i);
        Que.setAttribute("data-ans", ans);
        Que.setAttribute("data-selected", "");
        Que.innerHTML = "Q" + i + "." + question;
        quiz.append(Que);
        Opts = document.createElement("ul");
        j = 1;
        options.forEach(option => {
            LI = document.createElement("li");
            Opt = '<input type="radio" class="optipns" data_no="' + j + '"  name="options' + i + '" data-result="" value="' + i + '"><label for="html">' + option + '</label><br>'

            LI.innerHTML = Opt;
            Opts.append(LI)
            j++
        })

        quiz.append(Opts);
        hr = document.createElement("hr")
        quiz.append(hr)
        i++;
    });
    success=document.createElement("button");
    success.setAttribute("id","submit-button");
    success.innerHTML="submit";
    success.setAttribute("onclick","showresult(this)")
    quiz.append(success);

};

// Callback function for a failed response
function errorCallback(jqXHR, textStatus, errorThrown) {
    console.error("Request failed!");
    console.error("Status:", textStatus);
    console.error("Error:", errorThrown);
    // You can handle the error or perform specific actions here
}

main.append(quiz);
score = document.createElement("div");
score.classList.add("result_box")
parent.append(score);        

///////////////////////////////////////////////////

function showresult(ele) {
    var userScore = 0;
    
    questions.forEach((question, index) => {
        var questionNumber = index + 1;
        var name = "options" + questionNumber;
        var options = document.getElementsByName(name);
        
        options.forEach(option => {
            if (option.checked) {
                var selectedOptionNumber = option.getAttribute("data_no");
                if (selectedOptionNumber == question.answer) {
                    userScore++;
                }
            }
        });
    });

    var resultBox = document.querySelector(".result_box");
    resultBox.innerHTML = `<p>Score: <span><br><br>${userScore} / ${questions.length}</span></p>`;
}







