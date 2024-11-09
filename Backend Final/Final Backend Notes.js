
// App.get('/',(req,res)=>{
// res.send('<h1>here we are, it is working</h1>')
// }); // This is just the initial testing for our server and post man as our frontend. 

// App.post('/signIn',(req,res)=>{
//     res.json('working working')// This is also for testing what our server will send to postman it should be printed 
//     // in body of server after doing a post method on the url/endpoint
//     })
    
// Real Staff going on
// for us to imitate a practical approach we will create a temporal local database
// which will be an array containing a list of users and their details

// signIn Endpoint
// const database={
//     users:[
//      {
//         id:123,
//        name:'Elijah',
//        email:"elijah@gmail.com",
//        password:'Cookies',
//        entries:0,
//        joined:new Date()//new Date() method generates date for that particular date
//      },
//      {
//         id:879,
//        name:'Emma',
//        email:"emma@gmail.com",
//        password:'biscuits',
//        entries:0,
//        joined:new Date()
//      },
    
//     ]
// }

// We want to create a server that will send a response()to a user assuming our user just tried to signIn by
// inputting their name and maybe email for a start..
// The assumption is that our server will check with the database to see if the name and email the user has entered in
// frontend matches with the one we have in our database. if it matches only then can we send back response as json
// like a login page for that particular individual other wise if the credential does not match we can respond 
// with an error message with a status code if we like. 
// All this is done in post method because the user is posting their name and email

// app.post('/signIn',(req,res)=>{
// if(req.body.email===database.users[0].email && req.body.password===database.users[0].password){
// res.json(success!)
// res.json(database.users[0])
// }})
// To interpret the above, we are saying that if what is in request.body.email is found in our database.users[1].email,


// PostMan===Frontend
// localhost:3000/signIn
// From postman side we will assume the user request is on localhost:3000/signIn
// and in the body we will enter key value pairs that match with the information in the local database objects
// contained in the user array. eg 
// {"name":"Emma" 
// 'email':"emma@gmail.com"
// }

// Error:Email is not Defined  
// This is an error to always look out for and it comes because of not adding the middleware App.use(express.json())
// don't forget 

// This should work perfectly
// The reason we need a database when doing a checking between server and frontend is because if like in our case where 
// we used a value database and this database contains a user array and the array contains a lot of users 
// then looping through would take a lot of time. where as in a database it would be a smooth run

// ===============Register Endpoint===================
// =============Post method server=================== 
// For registration, We won't need any if statements because what we want is when a new user is entered through
// frontEnd('Postman in our case'), that information should then be sent to the database and stored there.As seen from
// above what we need to do.
// in our post method, we wanna add a new user to our database which is essentially in our request.body
// for that we destructure our 3 properties we hope to receive in our request.body and next we use push() method 
// to help us push whatever we will receive into the res.body

// App.post('/register',(req,res)=>{
//     const{name,email,password}= req.body
//       database.users.push({
//                  id:879,
//                  name:name,
//                  email:email,
//                  password:password,
//                  entries:0,
//                  joined:new Date()
//                })
//        res.json(database.users[database.users.length-1]);
//   })
  
// Response 
// For the response we will send an actual user to the profile page the user requested for that we do 
// database.users.length-1 is what specifies that we want the last item in the array 
res.json(database.users[database.users.length-1]);

// =====================Postman==================
// In post man to imitate how and what info a new user will send from fronted register form, we have to 
// create a new object with the desired properties 
// eg 
localhost:3000/register
{
name:'Salome';
email:"salome@gmail.com"
password:1234
}

// =================/Profile/:id ENDPOINT=====================
// For this, We do a get request. we assume that the user is requesting to get a profile and we input /profile/:id 
//in our url root which will allow us to use any numbers in the post man.
// The best is using find() method to loop through our array and find the ID. we can also use for each array.
//Find the user with the matching ID through using loops
//Convert `id` to an integer since IDs in the database are integers using parseInt

  // /PROFILE/:ID END POINT
  app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const user = database.users.find(user => user.id === parseInt(id));
  // Check if a user was found and respond accordingly
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json('not found');
    }
  });

  // User image Recognition Entry count
  // For this  last one we want to update the entry anytime, an already existing  user logs in and submits 
  // a new image, the ranking goes to 2 or another number up
  // For this, we can also do a find() function that we can use to find an id that will return a rank increase
  // but we want id from body and not from params 

  app.put('/image',(req,res)=>{
    const { id } = req.body;
    const user = database.users.find(user => user.id === parseInt(id));

  // Check if a user was found and respond accordingly
    if (user) {
      user.entries++
      return res.json(user.entries);
    } else {
      return res.status(404).json('not found');
    }
  });


//  Handling Security 
// Security is a major issue that should be handed well in web application
// For that we use packages like  Bcrypt which keeps passwords as hashes or random characters 
// and also does salting which adds random characters to password before hashing hence making 
// it even more harder for hackers 
// bcryptjs is a library for hashing passwords in JavaScript, commonly used in Node.js applications. 
// Hashing passwords helps keep them secure by transforming them into a long, random-looking string, 
// so even if someone steals the database, they can’t easily see the original passwords. Here’s how 
// it works and how to use it:

// What is bcryptjs?
// Password Hashing: Hashing is a one-way function that converts data (like passwords) into a unique, 
// fixed-length string of characters. The main idea is that you can’t convert it back to the original 
// text easily.

// Salting: bcryptjs adds an extra step called salting, where it adds random characters (a "salt") to 
// each password before hashing. This makes each hash unique, even if two people have the same password.

// Why Use bcryptjs?
// Security: Hashing with bcryptjs means passwords aren’t stored in their original form, making it harder 
// for hackers to retrieve passwords even if they get access to your database.
// Slow Computation: bcryptjs deliberately slows down the hashing process a bit, making it harder for attackers
//  to guess the password by repeatedly hashing possible combinations (a technique called “brute-forcing”).


// How to Use bcryptjs
// npm install bcryptjs
// import bcrypt from bcryptjs

// const password = 'mySuperSecret123';
// const saltRounds = 10; // controls how strong the hash is (higher means more secure but slower)

// Hashing a Password: 
// When a user sets or updates their password, hash it before saving to the database.
// bcrypt.hash(password, saltRounds, (err, hash) => {
//   if (err) throw err;
//   console.log("Hashed password:", hash); // Save this to the database
// });
// Comparing Passwords:
// When a user logs in, you’ll need to compare their entered password with the hashed password in your database.
// const enteredPassword = 'mySuperSecret123';
// const storedHash = '$2a$10$eE0D9iUhlF9GqK2KwjjNne12Ji5nlZ';

// bcrypt.compare(enteredPassword, storedHash, (err, isMatch) => {
//   if (err) throw err;
//   if (isMatch) {
//     console.log("Password matches!");
//   } else {
//     console.log("Password does not match.");
//   }
// });

// In a real setup we will have some form of a database and in postman we will do a post method 
// not in query strings but in body 

// app.post('/register',(req,res)=>{
//   const{name,email,password}= req.body
//   const saltRounds = 10;
//   bcrypt.hash(password, saltRounds, (err, hash) => {
//     if (err) throw err;
//     console.log("Hashed password:", hash); // Save this to the database
//   });

//     database.users.push({
//       id:879,
//       name:name,
//       email:email,
//       password:password,
//       entries:0,
//       joined:new Date()
//      })
//      res.json(database.users[database.users.length-1]);
// })

// Or Do this 
const database = {
  users: [
    {
      id: 123,
      name: 'john',
      email: "john@gmail.com",
      Hobby: 'singing',
      entries: 0,
      joined: new Date()
    },
    {
      id: 567,
      name: 'Tom',
      email: "tom@gmail.com",
      Hobby: 'cooking',
      entries: 0,
      joined: new Date()
    }
  ],
  logins: [
    {
      id: 123,
      hash: "",
      email: "john@gmail.com",
    },
   
  ],
};

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;

  // Hash the password and save to the `logins` array
  bcrypt.hash(password, saltRounds, (err, hash) => { // Ensure password is a string
    if (err) throw err;

    // Add user to `users` array
    const newUser = {
      id: Date.now(), // Generate unique ID
      name: name,
      email: email,
      entries: 0,
      joined: new Date()
    };
    database.users.push(newUser);

    // Add login details with hashed password to `logins` array
    database.logins.push({
      id: newUser.id,
      hash: hash, // Use the hashed password
      email: email
    });

    res.json(newUser);
  });
});


