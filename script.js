let TotalBalance = document.getElementById('TotalBalance');
let income = document.getElementById('income');
let expense = document.getElementById('expense');
let incomeRecord = [];
let expenseRecord = [];
let allRecord = [];
let selectedObject = {};
let selectedRow = null;
let indexArrayValue = 0;
let balance_Value = 0;
let income_Value = 0;
let expense_Value = 0;
let recordIndex = 0;
let incomeArray = [];
let expenseArray = [];
let filter = document.getElementById('filter').value;




function onFormSubmit() {
    formData = readFormData();

    if (selectedRow == null) {
        allRecord.push(formData);
    }
    else {
        allRecord[recordIndex] = formData;
    }
    displayFunction();
    calculateTotal();
    
}





function readFormData() {
    let formData = {};
    formData.Description = document.getElementById('Description').value;
    formData.Amount = parseInt(document.getElementById('TransactionAmount').value);
    formData.Category = document.getElementById('Category').value;
    formData.Date = document.getElementById('Date').value;
    return formData;
}







function editData(td) {

    selectedObject = {};
    selectedRow = td.parentElement.parentElement;  
    selectedTable = selectedRow.parentElement;
    recordIndex = selectedRow.rowIndex - 1;


    selectedObject.Description = selectedRow.cells[1].innerHTML;
    selectedObject.Amount = parseInt(selectedRow.cells[3].innerHTML);
    selectedObject.Category = selectedRow.cells[2].innerHTML;
    selectedObject.Date = selectedRow.cells[0].innerHTML;
    document.getElementById('Date').value = selectedObject.Date;
    document.getElementById('Description').value = selectedObject.Description;
    document.getElementById('Category').value = selectedObject.Category;
    document.getElementById('TransactionAmount').value = parseInt(selectedObject.Amount);

    filter = document.getElementById('filter').value;
    // if (filter == "All") {
    //     console.log(recordIndex);
    //     return;
    // }
    // else if (filter == "Income") {
    //     filteredData = allRecord.filter(record => record.Category == "Income");
    //     console.log(recordIndex);
    //     recordIndex = allRecord.indexOf(filteredData[recordIndex]);
    // }
    // else {
    //     filteredData = allRecord.filter(record => record.Category == "Expense");
    //     console.log(recordIndex);
    // }




    if (filter == "All") {
        
        return;
    } else if (filter == "Income") {

        let filteredData = allRecord.filter(record => record.Category == "Income");
        let filteredRecord = filteredData[recordIndex]; 
        recordIndex = allRecord.indexOf(filteredRecord); 
    } else if (filter == "Expense") {
        let filteredData = allRecord.filter(record => record.Category == "Expense");
        let filteredRecord = filteredData[recordIndex];
        recordIndex = allRecord.indexOf(filteredRecord);
    }

}



function displayFunction() {
    filter = document.getElementById('filter').value;
    resetForm();
    switch (filter) {
        case ('All'):
            allRecord.forEach(record => callDisplay(record));
            break;
        case ('Income'):
            filteredRecord = allRecord.filter(record => record.Category == "Income");
            filteredRecord.forEach(record => callDisplay(record));
            break;
        case ('Expense'):
            filteredRecord = allRecord.filter(record => record.Category == "Expense");
            filteredRecord.forEach(record => callDisplay(record));
            break;
    }
}


function filterTable() {
    filter = document.getElementById('filter').value;
    resetForm();
    switch (filter) {
        case ('All'):
            allRecord.forEach(record => callDisplay(record));
            break;
        case ('Income'):
            filteredRecord = allRecord.filter(record => record.Category == "Income");
            filteredRecord.forEach(record => callDisplay(record));
            break;
        case ('Expense'):
            filteredRecord = allRecord.filter(record => record.Category == "Expense");
            filteredRecord.forEach(record => callDisplay(record));
            break;
    }
}



function callDisplay(formData) {
    let tableList = document.getElementsByTagName('tbody')[0];
    let newRow = tableList.insertRow(tableList.length)
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.Date;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.Description;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.Category;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.Amount;
    cell5 = cell4 = newRow.insertCell(4);
    cell5.innerHTML = `<button onclick="editData(this)">Edit</button>
                    <button onclick="DeleteRecord(this)">Delete</button>`;
}


function resetForm() {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    selectedRow = null;
    document.getElementById('Date').value = "";
    document.getElementById('Description').value = "";
    document.getElementById('Category').value = "";
    document.getElementById('TransactionAmount').value = "";

}

function calculateTotal(test) {
    incomeRecord = allRecord.filter(record => record.Category == "Income");
    incomeArray = incomeRecord.map(record => record.Amount);
    income_Value = incomeArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);
    expenseRecord = allRecord.filter(record => record.Category == "Expense");
    expenseArray = expenseRecord.map(record => record.Amount);
    expense_Value = expenseArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);
    balance_Value = income_Value - expense_Value;
    TotalBalance.innerHTML = balance_Value;
    income.innerHTML = income_Value;
    expense.innerHTML = expense_Value;
}


function DeleteRecord(td){
    selectedObject = {};
    selectedRow = td.parentElement.parentElement;  
    selectedTable = selectedRow.parentElement;
    recordIndex = selectedRow.rowIndex - 1;

    if (filter == "All") {

    } else if (filter == "Income") {

        let filteredData = allRecord.filter(record => record.Category == "Income");
        let filteredRecord = filteredData[recordIndex]; 
        recordIndex = allRecord.indexOf(filteredRecord); 
    } else if (filter == "Expense") {
        let filteredData = allRecord.filter(record => record.Category == "Expense");
        let filteredRecord = filteredData[recordIndex];
        recordIndex = allRecord.indexOf(filteredRecord);
    }

    allRecord.splice(recordIndex,1);
    displayFunction();
    calculateTotal();
}