const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "react_app"
})

app.get('/', (re, res)=> {
    return res.json("From Backend side");
})

app.get('/tbl_about', (req, res)=> {
    const sql = "SELECT * FROM tbl_about";
    db.query(sql, (err, data)=> {
        if(err) return res.json("Error:"+ err);
        return res.json(data);
    })
    
})

app.get('/tbl_about/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM tbl_about WHERE ids=?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Error fetching data" });
        }
        return res.json(data);
    });  
});


app.put('/tbl_about/:id/update', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE tbl_about SET fullname=?, email=?, password=?, phone=? WHERE ids=?";
    const values = [
        req.body.fullname,
        req.body.email,
        req.body.password,
        req.body.phone,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ error: "Error updating data" });
        }
        return res.json({ message: "Record updated successfully" });
    });
});

app.delete('/tbl_about/:id/delete', (req, res) => {
    const id = req.params.id; 
    const sql = "DELETE FROM tbl_about WHERE ids=?"; 
    db.query(sql, [id], (err, data)=> { 
        if(err) return res.json("Error: "+err); 
        return res.json(data);
    })
});



app.post('/tbl_about', (req, res)=> {
    const sql = "INSERT INTO tbl_about(`fullname`, `email`, `password`, `phone`) VALUES (?)";
    const values = [
        req.body.fullname,
        req.body.email,
        req.body.password,
        req.body.phone
    ]
    db.query(sql, [values], (err, data)=> {
        if(err) return res.json("Error: "+err);
        return res.json(data);
    })
})

app.listen(8081, ()=> {
    console.log("listening");
})
