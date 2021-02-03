"use strict"

$(function(){

    const elIssueForm = document.getElementById("issueInputForm");
    elIssueForm.addEventListener('submit', createIssue);

    fetchIssues();

});


function createIssue(event) {
    event.preventDefault();

    const issue = {
        id: chance.guid(),
        description: document.getElementById('issueDescInput').value,
        severity: document.getElementById('issueSeverityInput').value,
        assignedTo: document.getElementById('issueAssignedToInput').value,
        status: "Open"
    };
    addIssueToStorage(issue);
    console.log("Create issue!")
}

function getIssuesFromStorage(){
    // Init issue storage.
    if(localStorage.getItem('issues') == null){
        localStorage.setItem('issues', JSON.stringify([]));
    }

    return JSON.parse(localStorage.getItem('issues'));
}

function addIssueToStorage(issue){
    const issues = getIssuesFromStorage();
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
}

function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    if(!issues) 
        return;

    let elIssuesList = document.getElementById('issuesList');
    elIssuesList.innerHTML = '';
    [...issues].forEach((curIssue) => {
        elIssuesList.innerHTML += getIssueHtml(curIssue);
    });
}

function getIssueHtml(issue) {
    return `
    <div class="well rounded p-3 border bg-light mb-2">
        <h6>Issue ID: ${issue.id} </h6>
        <p><span class="label label-info">${issue.status}</span></p>
        <h3>${issue.description}</h3>
        
        <p><span class="fas fa-clock"></span> ${issue.severity}</p>
        <p><span class="fas fa-address-card"></span> ${issue.assignedTo}</p>
        <a href="#" onclick="setStatusClosed('${issue.id}')" class="btn btn-warning">Close</a>
        <a href="#" onclick="deleteIssue('${issue.id}')" class="btn btn-danger">Delete</a>                
    <div>
    `;
}