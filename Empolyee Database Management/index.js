(async function(){
    const data = await fetch("./Data.json")
    const res = await data.json();
    // console.log(res)
    let employees = res;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");

    const createEmployee = document.querySelector(".createEmployee")
    const addEmployee = document.querySelector(".addEmployee")
    const addEmployeeForm = document.querySelector(".Add__createEmployee")

    createEmployee.addEventListener("click", ()=>{
        addEmployee.style.display = "flex"
    })
    addEmployee.addEventListener("click", (e)=>{
        if(e.target.className === "addEmployee")
        addEmployee.style.display = "none"
    })

    employeeList.addEventListener("click", (e)=>{
        if(e.target.tagName = "span" && selectedEmployeeId !== e.target.id){
            selectedEmployeeId = e.target.id;
            renderEmployee();
            renderSingleEmployee()
        }
    })

    addEmployeeForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formData = new FormData(addEmployeeForm)
        // console.log(formData);
        const values = [...formData.entries()]
        // console.log(values);
        let empData = {}
        values.forEach((val)=>{
            empData.val[0] = empData.val[1]
        })
        empData.id = employees[employees.length - 1].id + 1;
        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employees.push(empData)
        renderEmployee()
        addEmployeeForm.reset();
        addEmployee.style.display = "none"
    })

    // render all employee logic
    const renderEmployee = () =>{
        employeeList.innerHTML = '';
        employees.forEach(emp => {
            const employee = document.createElement("span");
            employee.classList.add("employees__names--item")
            if(parseInt(selectedEmployeeId, 10) === emp.id){
                employee.classList.add("selected")
                selectedEmployee = emp
            }
            employee.setAttribute("id", emp.id)
            employee.innerHTML = `${emp.firstName}  ${emp.lastName} <i class="employeeDelete">❌</i>`
            employeeList.append(employee)
        });
    }

    // renderSingleEmployee logic

    const renderSingleEmployee = () =>{
        employeeInfo.innerHTML=`
        <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}</span>
        <span>${selectedEmployee.email}</span>
        <span>${selectedEmployee.address}</span>
        <span>Mobile- ${selectedEmployee.mobile}</span>
        <span>DOB- ${selectedEmployee.dob}</span>
        `
    }

    if(selectedEmployee) renderSingleEmployee();

    renderEmployee();
})();