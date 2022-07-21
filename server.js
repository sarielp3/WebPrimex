const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost', 
    user:'root',
    password:'1655597',
    database:'bd_primex'
});

app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));

connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});



app.get('/api/consult', (req,res) =>{
    const sql = `SELECT * FROM empleado`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json(null);
        }
    })
  //  res.send('Lista mascotas');
});

app.get('/api/consultxid/:id', (req,res) =>{
    const  { id } = req.params;
    const sql = `SELECT * FROM empleado where idempleado = '${id}'`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json(null);
        }
    })
  //  res.send('Lista mascotas');
});

app.get('/api/filtrar/:nombre&:ap_pat&:ap_mat', (req,res) =>{
    const  { nombre,ap_mat,ap_pat } = req.params;
    const sql = `SELECT * FROM empleado where nombres like '%${nombre}%' AND ap_pat like '%${ap_pat}%' AND ap_mat like '%${ap_mat}%'`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json(null);
        }
    })
  //  res.send('Lista mascotas');
});

app.post('/api/registrar', (req,res) =>{
    const{nombres,ap_pat,ap_mat,calle,colonia,ciudad,municipio,telefono} = req.body;
    const sql = `insert into empleado(nombres,ap_pat,ap_mat,calle,colonia,ciudad,municipio,telefono) values('${nombres}','${ap_pat}','${ap_mat}','${calle}','${colonia}','${ciudad}','${municipio}','${telefono}')`;
    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status : 'mascota agregada'})
        }

    })
});

app.put('/api/editar/:id', (req,res) =>{
    const{id} = req.params;
    const{nombres,ap_pat,ap_mat,calle,colonia,ciudad,municipio,telefono} = req.body;
    let sql = `update empleado set 
    nombres = '${nombres}',
    ap_pat = '${ap_pat}',
    ap_mat = '${ap_mat}',
    calle = '${calle}',
    colonia = '${colonia}',
    ciudad = '${ciudad}',
    municipio = '${municipio}',
    telefono = '${telefono}'
    where idempleado = '${id}'`
    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status:'empleado editado'})
        }
    }
    );
});

app.delete('/api/eliminar/:id', (req,res) =>{
    const{id} = req.params;
    const sql = `DELETE FROM empleado WHERE idempleado = '${id}'`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        else{
            res.json({status:'empleado eliminado'});
        }
    })
  //  res.send('Lista mascotas');
});