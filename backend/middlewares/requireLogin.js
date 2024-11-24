function requireLogin(req , res , next){
    
    if(req.session.username || req.session.user_id){

        return next()
    }
    else{
        res.redirect("/")
    }
}

export default requireLogin