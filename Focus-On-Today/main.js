const checkBoxList = document.querySelectorAll(".custom-checkbox");
const goalInput = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar")

checkBoxList.forEach((checkBox)=>{
  checkBox.addEventListener("click", ()=>{
    const allGoalAdd = [...goalInput].every((input)=>{
      return input.value;
    })

    if(allGoalAdd){
      checkBox.parentElement.classList.toggle("completed");
    }else{
      progressBar.classList.add("show-error");
      // errorLabel.style.display = "block";
    }
  })
})

goalInput.forEach((input)=>{
  input.addEventListener("focus",()=>{
    progressBar.classList.remove("show-error");
  })
})