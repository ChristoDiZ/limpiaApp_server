const User=require('../models/user.model.js')
const bcrypt = require('bcryptjs'); // ✅ asegúrate de que sea "bcrypt", no "bcryptjs"
const jwt = require("jsonwebtoken");


//register
async function register(req,res) {
    //obtener los datos
    const { firstname, lastname, email, password, role } = req.body;


    //validar los datos
    if(!email)return res.status(400).send({msg:"El email es obligatorio ❌"})
    if(!password)return res.status(400).send({msg:"La contraseña es obligatorio ❌"})
    
    //crear el usuario
    const user = new User({
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      active: false,
      role // ✅ se guarda correctamente como "usuario" o "limpiador"
    });
    
    //encriptar password
    user.password=bcrypt.hashSync(password,10)
    console.log(user)
    //guardar en la db
    try{
        await user.save()
        res.status(201).send({
  msg: "usuario guardado",
  user: {
    firstname: user.firstname,
    email: user.email
  }
});

    }catch(error){
        res.status(500).send({msg:"Error al crear el usuario ❌"})
        console.log(error)
    }   


    res.status(200).send({msg:"todo ok"})
}
//login
async function login(req, res) {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send({ msg: "Email, contraseña y rol son obligatorios" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).send({ msg: "Usuario no encontrado" });

    if (user.role !== role) {
      return res.status(403).send({ msg: "No tienes permiso para acceder desde este tipo de cuenta" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.status(401).send({ msg: "Contraseña incorrecta" });

    // ✅ Generar token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // ✅ Enviar token y datos del usuario al frontend
    res.status(200).send({
      msg: "Login exitoso",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}


module.exports={
    register,login
}