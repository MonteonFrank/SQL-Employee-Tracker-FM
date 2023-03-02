# SQL-Employee-Tracker-FM

<h2><strong>Description</strong></h2>

<p>Challenge 12 consisted in using MySQL to create 3 tables, one for Departments, one for Roles and another for Employees. Additionally, I used Node to establish a connection with the DB, create queries, use the inquierer module to ask the user questions and obtain information for the Add Deparments, Add Roles and Modify Employee Roles functions.</p>
  
<p>For the Deparment table, by using a query, the ID and the Name of the Department can be displayed. Also, the ID serves as a primary key to use as a Foreign key for the Roles Table in order to obtain the deparment the role belongs to. For the Roles Table, we have the ID (which is the primary key and used as a Foreign Key in the Employees table to get the role of the user), the Role Title, the Salary and the Department ID. For the Employee table, we have the ID (which is also a primary key for the same table to be used as the Manager ID), First Name, Last Name, Role ID (used as a Foreign Key from the Roles ID table) and the Manager ID. </p> 
  
<p> After creating the three tables, I used dummy information in the Seeds file to add information into the DB and test the code in the Server File. Also, I created another file called queries in order to also test the information shown through the Server File.</p>

<p>After creating the database, I created the server.js by using Node and started creating the code to access the database as well as used the inquierer mode to either display the information of the database and the inquierer module to prompt the user with questions to add new deparments, add new roles, and add new employees.</p>

 
<h2><strong>Programming Logic</strong></h2>

<p>For this Challenge, we were not provided with a starting code so I had to create the code from scratch. I used the top of the Server File to import Express, MySQL and the Inquierer Modules </p>
  
<p>Afterwards, I created a init function which uses the inquierer module to prompt the options to the user. In this selection the user will be able to select, View all Departments, View all Roles, View all Employees, Add Department, Add a Role, Update an Employee Role and Quit Program </p>

<p>For the View Department, View Roles and View Employees, I used prepared statements (same as the ones in the query file) to show the information based on the selection</p>

<p>For the Add Deparpment option, inquierer module was also used to ask the user the question in regards to the Department Name and add it into the database. For this section I did an investigation in Stack Overflow and learned more about asynchronous functions and used them to get the information from the database. </p>

<p>For the Add a Role option, I created a function to get the current deparment (used a promise) and store it into a variable afterwards (also used asynchronous functions). This variables is then used as a list to ask the user to which deparment the new role belongs to and also ask the user the name of the new deparment afterewards. Once this is completed, the information is then stored into the database</p>

<p>For Update Employee Role, I created 2 functions similarly like the Add a Role option, in order to obtain the current list of roles, and the current list of employees in order to ask the user which employee and which role they wanted to add to the employee. I also used a functions for the databa se to only show unique names and avoid duplicates when adding the manager.</p>

<p>For the last option, which is Quit Program, this simply exits the program.</p>
  
<h2><strong>What did I learn?</strong></h2>

 <p>For this activity, I learned how to use MySQL and how to create queries to link different tables together. Additionally, I used ChatGPT to ask a few questions in regards to asyncronos methods in order to obtain the information better.</p>

 <p>I do recognize that maybe using classes the code might be reduced and additional function can be added but I needed more time to add them.</p>


<h2><strong>Videos</strong></h2>
<p>Code:</p>

[Quick view on the code.webm](https://user-images.githubusercontent.com/112662397/222517010-c8652ab6-9d83-4b49-bec7-02775081d92f.webm)

<p>Application Working:</p>

[Codeworking.webm](https://user-images.githubusercontent.com/112662397/222517111-74f81f34-3c13-44f8-a9ed-422d28feace2.webm)
