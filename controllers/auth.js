const mysql=require("mysql");
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
    
});
exports.login=async(req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).render('login',{
                message:'Please provide Email and Password'
                
            })
        }
        db.query('SELECT * FROM users WHERE email = ?', [email],async(error,results)=>{
          console.log(results);
          console.log(password);
          const isMatch = await bcrypt.compare(password, results[0].password);
          console.log(isMatch);
          if(!results || !isMatch ) {
            // return res.status(401).render("login", {
            //   message: 'Incorrect email or password'
            // });
            return res.status(200).redirect("/index2");
          }
            else if(!results){
               
                // res.status(401).render('login',{
                //     message: 'Email or Password is Incorrect'
                // })
                return res.status(200).redirect("/index2");
            }
        })
 
    } catch (error) {
        console.log(error);
        
    }

}

exports.register =(req,res)=>{
    console.log(req.body);
  
    const{name,email,password,passwordConfirm} =req.body;


    db.query('SELECT email FROM users WHERE email=?',[email],async(error,results)=>{
        if(error){
            console.log(error);
        }
        if (results.length>0){
            return res.render('register',{
                message: 'this email is alredy in use'
            })
        }
        else if (password!==passwordConfirm){
            return res.render('register',{
                message: 'Passwords do not match'
            });

        }
        let hashedPasssword= await bcrypt.hash(password,8);
        console.log(hashedPasssword);
      
        db.query('INSERT INTO users SET ?',{name: name, email: email, password: hashedPasssword},(error, results)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log(results);
                res.status(200).redirect("/index2");
                return res.render('register',{
                    message: 'User Registered'
                });
    
            }
        })
    });

} 