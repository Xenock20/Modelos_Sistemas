import mysql from 'mysql2';

export const conect = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'seguimiento_control',
        port: 3306
    }
)

conect.connect((err)=>{
    if(err) {
        console.log('Error de coneccion en la base de dato' , err);
        return
    }

    console.log('Connect database');
})