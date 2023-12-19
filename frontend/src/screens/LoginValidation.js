function Validation(values){
    let error={}
    const phone_pattern=/^[^\s@]+@[^\s@]+\.[^s@]+$/
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if(values.phone===""){
        error.phone = "Phone should not be empty"
    }
    else if (!phone_pattern.test(values.phone)){
        error.phone="Phone didnot match"
    } else {
        error.phone=""
    }

    if(values.password===""){
        error.password = "Password should not be empty"
    }
    else if (!password_pattern.test(values.password)){
        error.password="Password didnot match"
    } else {
        error.password=""
    }
    return error;
}
export default Validation;