const customBox = document.querySelectorAll(".custom-checkbox");
const goalInput = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");


const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

// console.log(allGoals)

let allGoalsCount = Object.values(allGoals).filter(goals => goals.completed).length

const goalQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun half is done',
  'just a step away, keep going',
  'Wow! You just all the goal done. Time for chill :D',
]

function updateProgress(){
  allGoalsCount = Object.values(allGoals).filter(goals => goals.completed).length
  let percentage = `${(allGoalsCount / goalInput.length) * 100}%`
  progressValue.style.width = `${percentage}`
  progressValue.firstElementChild.innerText = `${allGoalsCount} / ${goalInput.length} completed`
  progressLabel.innerText = goalQuotes[allGoalsCount];
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
  localStorage.setItem("progress", JSON.stringify({percentage, allGoalsCount}))
}

const savedProgress = JSON.parse(localStorage.getItem("progress"))
// console.log(savedProgress)

if(savedProgress){
  allGoalsCount = savedProgress.allGoalsCount
  progressValue.style.width = `${savedProgress.percentage}`
  progressValue.firstElementChild.innerText = `${savedProgress.allGoalsCount} / ${goalInput.length} completed`
  progressLabel.innerText = goalQuotes[savedProgress.allGoalsCount];
}

customBox.forEach(box=>{
  box.addEventListener("click",()=>{
    const allGoalAdd = [...goalInput].every(input =>{
      return input.value;
    })
    
    if(allGoalAdd){
    box.parentElement.classList.toggle("completed");
    const inputId = box.nextElementSibling.id;
    allGoals[inputId].completed = !allGoals[inputId].completed;
    updateProgress();
    }else{
      progressBar.classList.add("show-error");
    }
  })
})

goalInput.forEach(input =>{
  input.addEventListener("focus", ()=>{
    progressBar.classList.remove("show-error");
  })

  if(allGoals[input.id]?.completed){
    input.parentElement.classList.add("completed");
  }

  input.value = allGoals[input.id]?.name || "";

  input.addEventListener("input", (e)=>{
      allGoals[input.id] = {
        name: e.target.value,
        completed: false,
      }
      updateProgress();
  })
})
