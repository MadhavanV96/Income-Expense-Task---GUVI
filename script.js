let selectedRow = null;
let totalBalance=0;
let incomeArray = [];
let ExpenseArray = [];



let allRecords = []; 






let totalIncome = 0;
let totalExpense = 0;

let income=document.getElementById('income');
let expense=document.getElementById('expense');
let TotalBalance=document.getElementById('TotalBalance');


function onFormSubmit() {
    let formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    allRecords.push(formData);
    console.log(allRecords);

    updateArray(formData);
    totalBalance=totalIncome-totalExpense;
    income.innerHTML=` &#x20B9 ${totalIncome}`;
    expense.innerHTML=` &#x20B9 ${totalExpense}`;
    TotalBalance.innerHTML=` &#x20B9 ${totalBalance}`;
    // console.log(totalIncome);
    // console.log(totalExpense);
    // console.log(totalBalance);
    
    

    resetForm();


    

}



function readFormData() {
    let formData = {};
    formData["Description"] = document.getElementById('Description').value;
    formData["Amount"] = parseInt(document.getElementById('TransactionAmount').value);
    formData["Category"] = document.getElementById('Category').value;
    formData["Date"] = document.getElementById('Date').value;
    return formData;

}


function insertNewRecord(formData) {
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
    cell5.innerHTML = `<button onclick="EditData(this)">Edit</button>
                    <button onclick="DeleteRecord(this)">Delete</button>`;
    // if(formData.Category=='Expense'){
    //     newRow.style.backgroundColor='#f5d687'
    // }

}










function resetForm() {
    document.getElementById('Description').value = "";
    document.getElementById('TransactionAmount').value = "";
    document.getElementById('Category').value = "";
    document.getElementById('Date').value = "";
    selectedRow = null;
}



function EditData(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('Description').value = selectedRow.cells[1].innerHTML;
    document.getElementById('TransactionAmount').value = selectedRow.cells[3].innerHTML;
    document.getElementById('Category').value = selectedRow.cells[2].innerHTML;
    document.getElementById('Date').value = selectedRow.cells[0].innerHTML;

    if(document.getElementById('Category').value=="Income"){
        incomeArray = incomeArray.filter(item => item !== parseInt(document.getElementById('TransactionAmount').value));
        // console.log(incomeArray);
        totalIncome-=parseInt(document.getElementById('TransactionAmount').value);

    }
    else{
        ExpenseArray = ExpenseArray.filter(item => item !== parseInt(document.getElementById('TransactionAmount').value));
        // console.log(ExpenseArray);
        totalExpense-=parseInt(document.getElementById('TransactionAmount').value);
    }   

}

function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = document.getElementById('Description').value;
    selectedRow.cells[3].innerHTML = document.getElementById('TransactionAmount').value;
    selectedRow.cells[2].innerHTML = document.getElementById('Category').value;
    selectedRow.cells[0].innerHTML = document.getElementById('Date').value;
    // if(formData.Category=='Expense'){
    //     selectedRow.style.backgroundColor='#f5d687'
    // }
    // else{
    //     selectedRow.style.backgroundColor='#fffaec'
    // }


}


function DeleteRecord(td) {
    row=td.parentElement.parentElement;
    if(row.cells[2].innerHTML=="Income"){
        incomeArray = incomeArray.filter(item => item !== parseInt(row.cells[3].innerHTML));
        console.log(incomeArray);
        
    }
    else{
        ExpenseArray = ExpenseArray.filter(item => item !== parseInt(row.cells[3].innerHTML));
        console.log(ExpenseArray);
    }
    totalIncome = incomeArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    totalExpense = ExpenseArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    totalBalance=totalIncome-totalExpense;
    income.innerHTML=` &#x20B9 ${totalIncome}`;
    expense.innerHTML=` &#x20B9 ${totalExpense}`;
    TotalBalance.innerHTML=` &#x20B9 ${totalBalance}`;


    
    document.getElementById("ExpenseListTable").deleteRow(row.rowIndex);
    resetForm();

}



function updateArray(formData) {
    if (formData["Category"] == 'Income') {
        incomeArray.push(formData["Amount"]);
        // console.log(incomeArray);
        totalIncome = incomeArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log(totalIncome);
    }
    else {
        ExpenseArray.push(formData["Amount"]);
        // console.log(ExpenseArray);
        totalExpense = ExpenseArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
    }

}



function filterTable() {
    let filter = document.getElementById('filter').value;
    let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ""; 

    let filteredData = allRecords.filter(record => filter === "All" || record.Category === filter);

    filteredData.forEach(data => {
        let newRow = tableBody.insertRow();
        newRow.insertCell(0).innerHTML = data.Date;
        newRow.insertCell(1).innerHTML = data.Description;
        newRow.insertCell(2).innerHTML = data.Category;
        newRow.insertCell(3).innerHTML = data.Amount;
        newRow.insertCell(4).innerHTML = `<button onclick="EditData(this)">Edit</button>
                                          <button onclick="DeleteRecord(this)">Delete</button>`;
    });
}
function sortTable(columnIndex) {
    let tableBody = document.querySelector('tbody');
    let rows = Array.from(tableBody.rows);

    rows.sort((a, b) => {
        let cellA = a.cells[columnIndex].innerHTML;
        let cellB = b.cells[columnIndex].innerHTML;

        if (columnIndex === 0) { 
            return new Date(cellA) - new Date(cellB);
        } else if (columnIndex === 3) { 
            return parseFloat(cellA) - parseFloat(cellB);
        } else {
            return cellA.localeCompare(cellB);
        }
    });

    tableBody.innerHTML = ""; 
    rows.forEach(row => tableBody.appendChild(row)); 
}