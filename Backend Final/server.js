import express from 'express';
import bcrypt from 'bcryptjs'
import cors from 'cors'
// import knex from 'knex';

// const databases=knex({
//   client: 'pg',
//   connection: {
//    host: '127.0.0.1',
//    port: 5432,
//    user: 'postgres',
//    password: 'test',
//    database: 'smart',
//   },
// });

// database.select('*').from ('users');

const app=express();
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.json(database.users)
})

const database={
    users:[
{
    id:123,
    name:'john',
    email:"john@gmail.com",
    password:"cookies",
    Hobby:'singing',
    entries:0,
    joined: new Date()
},
{
    id:567,
    name:'Tom',
    email:"tom@gmail.com",
    password:"banana",
    Hobby:'cooking',
    entries:0,
    joined: new Date()
}

    ] 
}

// SIGNING ENDPOINT

// Looping through signIn
app.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    const user = database.users.find(user => user.email === email && user.password === password);
    if (user) {
      res.json(user);
    } else {
      res.status(400).json('error');
    }
  });
  
// REGISTER ENDPOINT
// Backend: Register Route

// Backend: Register Route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) { // Ensure all fields are provided
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    };
    database.users.push(user);
    res.json(user); // Return the new user object to the frontend
  } else {
    res.status(400).json('Invalid form submission');
  }
});

  // /PROFILE/:ID END POINT
  app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const user = database.users.find(user => user.id === parseInt(id));
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json('not found');
    }
  });
  
  // User image Recognition Entry count
    app.put('/image', (req, res) => {
    const { id } = req.body;
    const user = database.users.find(user => user.id === parseInt(id));
    if (user) {
      user.entries++;
      return res.json(user.entries);
    } else {
      return res.status(404).json('sorry not found');
    }
  });
  app.listen(3000, () => console.log("Server running on port 3000"));
    
  