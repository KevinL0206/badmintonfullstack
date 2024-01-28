
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export const Register = () => {
    

    const schema = yup.object().shape({ //schema is used to define the rules for the form
        username: yup.string().required("Username is Required"),
        email: yup.string().email().required("Email is Required"),
        password: yup.string().required("Password is Required").min(4).max(20),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords Do Not Match").required(), //oneOf is used to check if the value is equal to the value of another field, in this case, the password field
    });

    const {register,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(schema)}); //resolver is used to validate the form

    const onSubmit = (data) => {

        data = {
            username: data.username,
            email: data.email,
            password: data.password,
        }

        fetch("http://localhost:8000/register/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(() => {
            window.location.href = '/login'
            console.log(data)
            console.log("success")
        })
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}> 
            <p><input type="text" placeholder="Username" {...register("username")} /> {errors.username?.message}</p>
            <p><input type="text" placeholder="Email" {...register("email")} /> {errors.email?.message}</p>
            <p><input type="password" placeholder="Password" {...register("password")} />  {errors.password?.message}</p>
            <p><input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />   {errors.confirmPassword?.message}</p>
            <p><input type="submit" value="Submit" /></p>
        </form>
    )


}

