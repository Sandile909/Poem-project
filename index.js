const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(__dirname));

app.get('/', (req, res) =>{
res.sendFile(__dirname + '/index.html')
});

let usersData = [];
let poemData = [];

fs.readFile('users.json', (err, jsonData) =>{
if(!err){
usersData = JSON.parse(jsonData)
}
})

fs.readFile('/poems', (err, jsonData) =>{
if(!err){
poemData = JSON.parse(jsonData)
}
})

app.post('/login', (req, res) =>{
const user = req.body
const existingUser = usersData.find(usersData => usersData.email === user.email && usersData.password === user.password && usersData.username == user.username)

if(existingUser){
res.send({success: true, message: 'Logged in'})
}else{
res.send({success: false, message: 'Invalid Password'})
}
});

app.post('/signup', (req, res) =>{
usersData.push(req.body)
fs.writeFile('users.json', JSON.stringify(usersData, null, 2), (err) =>{
if(err){
console.log('Fail to signup')
res.status(500).send({message: 'Fail to signup'})
}else{
console.log('Login success')
res.send({message: 'Login Success'})
}
})
});

app.post('/admin', (req, res) =>{
poemData.push(req.body)
fs.writeFile('poems.json', JSON.stringify(poemData, null, 2), (err) =>{
if(err){
console.log('Fail to submit poem')
res.status(500).send({message: 'Fail to submit poem'})
}else{
console.log('Poem post successful')
res.send({message: 'Poem post successful'})
}
})
});

app.post('/send-email', (req, res) => {
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'your-email@gmail.com',
pass: 'your-password'
}
});

const mailOptions = {
from: 'your-email@gmail.com',
to: req.body.to,
subject: req.body.subject,
text: req.body.body
};

transporter.sendMail(mailOptions, (error, info) => {
if (error) {
console.log('Error sending email:', error);
res.status(500).send({ message: 'Error sending email' });
} else {
console.log('Email sent successfully!');
res.send({ message: 'Email sent successfully' });
}
});
});

app.listen(port, () =>{
console.log('Server running')
});
