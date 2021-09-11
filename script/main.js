// обработчик событий, который 
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const answerItem1 = document.querySelector('#answerItem1');
  const answerItem2 = document.querySelector('#answerItem2');
  const answerImg = document.querySelector('answerImg');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');
  const sendButton = document.querySelector('#send');

  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
        {
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          title: 'Черный',
          url: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
        {
          title: 'Курица',
          url: './image/chickenMeat.png'
        },
        {
          title: 'Говядина',
          url: './image/beefMeat.png'
        },
        {
          title: 'Свинина',
          url: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
        {
          title: 'Помидор',
          url: './image/tomato.png'
        },
        {
          title: 'Огурец',
          url: './image/cucumber.png'
        },
        {
          title: 'Салат',
          url: './image/salad.png'
        },
        {
          title: 'Лук',
          url: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          title: 'Чесночный',
          url: './image/sauce1.png'
        },
        {
          title: 'Томатный',
          url: './image/sauce2.png'
        },
        {
          title: 'Горчичный',
          url: './image/sauce3.png'
        }
      ],
      type: 'radio'
    }
  ];



  // обработчик на открытие модального окна
  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  })

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
  })
  //  Фунция запуска тестирования
  const playTest = () => {


    const finalAnswers = [];
    // переменная с номером вопроса
    let numberQuestion = 0;

    // 
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer, index, arr) => {


        const answerItem = document.createElement('div');

        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

        answerItem.innerHTML = `
        <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}"">
         <label for="answerItem1" class="d-flex flex-column justify-content-between">
         <img class="answerImg" src="${answer.url}" alt="burger">
      <span>${answer.title}</span>
      </label>
    `;
        formAnswers.appendChild(answerItem)
      })
    }

    // функия рендеринга вопроса
    const renderQuestions = (indexQuestion) => {

      formAnswers.innerHTML = '';
      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        nextButton.classList.remove('d-none');
        prevButton.classList.remove('d-none');
        sendButton.classList.add('d-none');
      }
      if (numberQuestion === 0) {
        prevButton.classList.add('d-none');
      }
      if (numberQuestion === questions.length - 1) {
        prevButton.classList.add('d-none');
      }
      if (numberQuestion === questions.length) {
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.remove('d-none');
        formAnswers.innerHTML = `
        <div class = "form-group">
        <label for="Pone">Enter your Phone</label>
        <input type="phone" class=""form-control" id="numberPhone">
        `;
      }

      renderAnswers(indexQuestion);
    }



    // запуск функции рендеринга
    renderQuestions(numberQuestion);


    const checkAnswer = () => {
      console.log('check');
      const obj = {};

      const inputs = [...formAnswers.elements].filter((input) => input.checked
        || input.id === numberPhone);
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value
        }
        if (numberQuestion === questions.length) {
          obj[`Number Phone`] = input.value
        }
      })

      finalAnswers.push(obj)
    }
    // обработчики событий кнопок next , prev
    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    }
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
      console.log('prev');
    }

    sendButton.onclick = () => {
      checkAnswer();
      console.log(finalAnswers)
    }
  }
})
// const string = 'простой';
// console.log(`Я люблю "${string}" Javascript`)
