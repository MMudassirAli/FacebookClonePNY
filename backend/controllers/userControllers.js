const registerUser = (req,res) =>{
    
    const {f_name, l_name, dob, gender, m_mail, password} = req.body;

    // Check if user enters all fields or not

    if(!f_name || !l_name || !dob || !gender || !m_mail || !password){
        res.status(400);
        throw new Error("Please Enter All Fields");
    }else{
        res.json({f_name, l_name, dob, gender, m_mail, password});
    }

}

module.exports = {
    registerUser,
}