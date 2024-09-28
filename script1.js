let TotalBalance=document.getElementById('TotalBalance');
let income=document.getElementById('income');
let expense=document.getElementById('expense');
let incomeRecord=[];
let expenseRecord=[];
let allRecord=[];
let selectedObject={};
let selectedRow=null;

let balance_Value=0;
let income_Value=0;
let expense_Value=0;

let incomeArray=[];
let expenseArray=[];







function onFormSubmit(){
    formData=readFormData(); //initiation of formData Object
    if(selectedRow==null){
        insertData(formData); //Calling Insertion Data Function
    }
    else{
        UpdationOfEditedData(formData);
    }
    allRecord.push(formData); //Storing Form Data to All Record JSON
   
    
    
}




function readFormData(){
    let formData={};
    formData.Description=document.getElementById('Description').value;
    formData.Amount=document.getElementById('TransactionAmount').value;
    formData.Category=document.getElementById('Category').value;
    formData.Date=document.getElementById('Date').value;
    return formData;
}

//OLD CODE
// function insertData(formData){
//     let rowList = document.getElementById('tableBody');
//     let newRow = rowList.insertRow(rowList.rows.length);
//     cell1 = newRow.insertCell(0);
//     cell1.innerHTML = formData.Date;
//     cell1 = newRow.insertCell(1);
//     cell1.innerHTML = formData.Description;
//     cell1 = newRow.insertCell(2);
//     cell1.innerHTML = formData.Category;
//     cell1 = newRow.insertCell(3);
//     cell1.innerHTML = formData.Amount;
//     cell1 = newRow.insertCell(4);
//     cell1.innerHTML = `<button id="EditButton" onclick="editThisData(this)">Edit</button>
//                         <button id="DeleteButton" onclick="deleteThisData(this)">Delete</button>`;
//     allRecord.push(formData);
//     checkCategory(formData);
    
// }













function checkCategory(formData){
    if(formData.Category=="Income"){
        incomeArray.push(parseFloat(formData.Amount));
        income_Value = incomeArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        balance_Value=income_Value-expense_Value;
        TotalBalance.innerHTML=balance_Value;
        income.innerHTML=income_Value;
    }
    else{
        expenseArray.push(parseFloat(formData.Amount));
        expense_Value = expenseArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        balance_Value=income_Value-expense_Value;
        TotalBalance.innerHTML=balance_Value;
        expense.innerHTML=expense_Value;
    }
}// Checks and updates value in the display

function editThisData(td) {
    selectedObject={};

    selectedRow = td.parentElement.parentElement;  // Get the row (tr) containing the clicked cell
    selectedTable = selectedRow.parentElement;     // Get the parent element (tbody or table)
    
    selectedObject.Date=selectedRow.cells[0].innerHTML ;
    selectedObject.Description=selectedRow.cells[1].innerHTML;
    selectedObject.Category=selectedRow.cells[2].innerHTML;
    selectedObject.Amount=selectedRow.cells[3].innerHTML;
    console.log(selectedObject);

    document.getElementById('Date').value=selectedObject.Date;
    document.getElementById('Description').value=selectedObject.Description;
    document.getElementById('Category').value=selectedObject.Category;
    document.getElementById('TransactionAmount').value=parseInt(selectedObject.Amount);
    // // To get the index of the selected row
    // let rowIndex = Array.from(selectedTable.rows).indexOf(selectedRow);
    
    // console.log(`The index of the selected row is: ${rowIndex}`);

}

function UpdationOfEditedData(formData){
    selectedRow.cells[0].innerHTML=document.getElementById('Date').value;
    selectedRow.cells[1].innerHTML=document.getElementById('Description').value;
    selectedRow.cells[2].innerHTML=document.getElementById('Category').value;
    selectedRow.cells[3].innerHTML=document.getElementById('TransactionAmount').value;
}










displayFunction();



function displayFunction(){
    switch(filter){
        case("All"):
        break;
        case("Income"):
        break;
        case("Expense"):
        break;
    }
  
}