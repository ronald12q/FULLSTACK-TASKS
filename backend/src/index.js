const {newConnection} = require('./config/db.js');
const express = require('express');
const app = express();
const PORT  = 3000;
const cors = require('cors');
const taskRoute = require('./routes/taskRoutes.js');
const useRoute = require('./routes/userRoutes.js');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

newConnection();


app.get('/',(req, res) => {
    res.json({message: 'hola desde el servidor web'});

})

app.use('/api/tasks', taskRoute);
app.use('/api/user', useRoute);



app.listen(PORT, () => {
    console.log(`servidor corriendo con exito en el puerto: ${PORT}`);
});

