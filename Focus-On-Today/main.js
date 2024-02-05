const checkBoxList = document.querySelectorAll(".custom-checkbox");
const goalInput = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar")
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const goalQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun half is done',
  'just a step away, keep going',
  'Wow! You just all the goal done. Time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {}

let completeGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
progressValue.style.width = `${(completeGoalsCount / 3) * 100}%`;
progressValue.firstElementChild.innerText = `${completeGoalsCount} / 3 completed`

progressLabel.innerText = goalQuotes[completeGoalsCount]

checkBoxList.forEach((checkBox)=>{
  checkBox.addEventListener("click", ()=>{
    const allGoalAdd = [...goalInput].every((input)=>{
      return input.value;
    })

    if(allGoalAdd){
      checkBox.parentElement.classList.toggle("completed");
      const inputId = checkBox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completeGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length;
      progressValue.style.width = `${(completeGoalsCount / 3) * 100}%`;
      progressValue.firstElementChild.innerText = `${completeGoalsCount} / 3 completed`
      progressLabel.innerText = goalQuotes[completeGoalsCount]
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    }else{
      progressBar.classList.add("show-error");
      // errorLabel.style.display = "block";
    }
  })
})


goalInput.forEach((input)=>{

  if(allGoals[input.id].completed){
    input.parentElement.classList.add("completed");
  }

  input.value = allGoals[input?.id]?.name;
  input.addEventListener("focus",()=>{
    progressBar.classList.remove("show-error");
  })


  input.addEventListener("input",(e)=>{

    if(allGoals[input.id].completed){
      input.value = allGoals[input.id].name
      return;
    }

    allGoals[input.id] = {
      name: e.target.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  })
})