"use strict"

$(function(){

    fetchIssues();

});


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