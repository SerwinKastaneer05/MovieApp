import { useState, React } from "react";
import './LoginPage.css'
import { auth } from '../Firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // onAuthStateChanged,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const LoginPage = ({ name, setname, setsigninn, setEmail }) => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    // const [user, setUser] = useState({});
    const [registeration, setRegisteration] = useState(false);
    const [reset, setreset]=useState(10)

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // });

    // function for registeration of new user using email and password
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword,
            );
            // console.log(user);
            alert("Registered Successfully!");
            setreset(reset+1); //clearing the input fields after registeration
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    // login function using email and password
    const login = async () => {
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );

            if (name === "" || result.user.displayName === null) { setname(result.user.email) }
            setEmail(result.user.email);
            setsigninn(true);
        } catch (error) {

            alert(error.message);
        }
    };


//login via user
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                //getting details from signed in account using google
                setname(result.user.displayName); 
                setEmail(result.user.email);
                setsigninn(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='login-page'>
            <div className="bg-image"> 
            </div>
            <div className="login-container">
                <h1>Home of Movies</h1>
                {/* Registeration form  */}
                {registeration ?
                    <><h3> Register User </h3>
                        <div className="registerwithemail" key={reset}>


                            <label >Email</label>
                            <input
                            type="email"
                                onChange={(event) => {
                                    setRegisterEmail(event.target.value);
                                }}
                            />
                            <label >Password</label>
                            <input
                            type="password"
                                onChange={(event) => {
                                    setRegisterPassword(event.target.value);
                                }}
                            />
                        </div>
                        <button className="button" type="submit" onClick={register}> Create User</button>

                        <div className="goback-login">
                        <p>Or go back to login?</p>
                        <button className="button" onClick={()=>setRegisteration(false)}> Login</button>
                        </div>
                    </> :
                    <>
                    {/* login form  */}
                        <h3> Login </h3>
                        <div className="loginwithemail">

                            <label >Email</label>
                            <input
                                type="email"
                                onChange={(event) => {
                                    setLoginEmail(event.target.value);
                                }}
                            />
                            <label >Password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    setLoginPassword(event.target.value);
                                }}
                            />
                        </div>
                        <button className="button btn-top-margin" type="submit" onClick={login}> Login</button>

                        <div> <p>OR connect with</p>
                            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                                Sign in with Google
                            </button>
                        </div>
                        <div className="register">
                        <p>Do not have any account?</p>
                        <button className="button" onClick={()=>setRegisteration(true)}> Register</button>
                        </div>
                    </>}
            </div>

        </div>
    )
}