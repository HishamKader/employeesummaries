const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const test1 = new Employee("Alice");


test1.getName();

const test2 = new Employee("Foo", 100);

test2.getId();

const test3 = new Employee("Foo", 1, "test@test.com");

test3.getEmail();

const test4 = new Employee("Alice", 1, "test@test.com")
test4.role = "Employee"
console.log(test4.role);

test4.getRole();

const test5 = new Intern("Foo", 1, "test@test.com", "UCLA")

test5.getRole();

test5.getSchool();

const engineer = new Engineer("Foo", 1, "test@test.com", "GitHubUser")

engineer.getRole();

engineer.getGithub();

const manager = new Manager("Foo", 1, "test@test.com", 100);

manager.getRole();

manager.getOfficeNumber();