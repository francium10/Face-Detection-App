//==============================================Database================================================

// Now its time to connect and create a database that will be used to store manage and access user information 
// and not the variable  database we where using. database is more organized and easy to work with
// it is always a good idea to look at a database,Backend, and Frontend as 3 separate entities which connect with 
// one another

// step 1
// Let us create a database 
// createdb -U postgres smart brain

// to access and connect our smart brain database 
// psql -U postgres smart brain
// We then go to our graphical user interface(pg admin) and start setting up things
// We begin by planning how our database will be like and what exactly it should have 
// like our trial database it will have users table with columns like id, name password, counts etc exactly
//  like that fake database we used and 
// we will store our passwords as in hash using bcrypt 

// we now create our login table.
// CREATE TABLE users (
// id SERIAL PRIMARY KEY,
// name VARCHAR(100) ,
// email text UNIQUE NOT NULL,
// entries BIGINT default 0,
// joined TIMESTAMP NOT NULL
// );

// Next, We go to the create the login table that will contain the login details such as the
// hashed passwords and and emails.

// CREATE TABLE logins (
// id SERIAL PRIMARY KEY,
// hash Varchar(100) NOT NULL,
// email text UNIQUE NOT NULL,
// );

// After Creating the tables, now we have to connect it with our server so that we a user logs in 
// will be persisted into the database 

// =========Connecting DATABASE to server=============================