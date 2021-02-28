const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var team = [];


// ==== GENERAL FUNCTIONS ==== //

// make an entry point into our inquirer prompts
function start(){
    inquirer.prompt(
        [
            {
                name: "startOptions",
                type: "list",
                message: "Make a selection: ",
                choices: [
                    "Build Team",
                    "Exit"
                ]
            }
        ]).then((answer) => {
            if(answer.startOptions === "Build Team"){
                buildManager();
            }
            else{
                process.exit(1);
            }
        })
}

// Asks if the user wants to add more employees after each added employee.
function addMore(){
    inquirer.prompt(
        [
        {
            name: "addMoreOptions",
            type: "list",
            message: "Add more team members?: ",
            choices: [
                "Yes",
                "No"
            ]
        }
        ]).then((answer)=> {
            if(answer.addMoreOptions === "Yes"){
                selectMembers();
            }
            else {
                // some code here.
            }
        })
}

// Provides a list of employee types the user can add.
function selectMembers(){
    inquirer.prompt([
        {
            name: "memberOptions",
            type: "list",
            message: "Add which type of employee? : ",
            choices: [
                "Intern",
                "Engineer",
                "Quit & Start Over"
            ]
        }
    ]).then((answer)=> {
        if(answer.memberOptions === "Intern"){
            buildIntern();
        }
        else if (answer.memberOptions === "Engineer"){
            buildEngineer();
        } else {
            process.exit(1);
        }
    })
}



// ==== EMPLOYEE BUILDER FUNCTIONS ==== //

// build team always starts with a manager as that position is required.
function buildManager(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Manager name: "
        },
        {
            type: "input",
            name: "email",
            message: "Manager email: "
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Manager phone number: "
        },

    ]).then((answer) => {
       const manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
       team.push(manager);

       selectMembers();
    })
}

function buildIntern(){
    inquirer.prompt([{
        type: "input",
        name: "internName",
        message: "Intern name: "
    },
    {
        type: "input",
        name: "internEmail",
        message: "Intern email: "
    },{
        name: "internSchool",
        type: "text",
        message: "Enter your school: "
    }
    ]).then((answer)=>{
        const intern = new Intern(answer.internName, answer.internEmail,answer.internSchool);
        team.push(intern);

        // Ask the user if they want to add more team members.
        addMore();
    })
}

function buildEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "Engineer name: "
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Engineer email: "
        },
        {
        name: "engineerGithub",
        type: "text",
        message: "Enter your github username: "
        }
    ]).then((answer)=>{
        const engineer = new Engineer(answer.engineerName, answer.engineerEmail, answer.engineerGithub);
        team.push(engineer);

        // Ask the user if they want to add more team members.
        addMore();
    })
}

render(team);

start();