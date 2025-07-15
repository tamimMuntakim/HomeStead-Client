import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import LoginLottie from "../assets/Lotties/login_lottie.json"
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Login = () => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { logIn, googleSignIn } = useAuth();
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    const location = useLocation();
    const navigate = useNavigate();

    const saveUserMutation = useMutation({
        mutationFn: async (userData) => {
            const res = await axiosInstance.post("/users", userData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        }
    });

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.target);
        const newUser = Object.fromEntries(formData.entries());

        logIn(newUser.email, newUser.password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Successfully Logged In!!!",
                    timer: 1500
                });
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch((error) => {
                setError(error.code);
                Swal.fire({
                    icon: "error",
                    title: "Please try again !!",
                    timer: 1500
                });
            })
    }

    const handleGoogleSignIn = async () => {
        setError("");

        try {
            const result = await googleSignIn();
            const user = result.user;

            const userData = {
                userDisplayName: user.displayName,
                userEmail: user.email,
                createdAt: user.metadata.creationTime,
                role: "user"
            };

            const checkRes = await axiosInstance.get(`/users?email=${user.email}`);
            if (!checkRes.data?.userEmail) {
                saveUserMutation.mutate(userData);
            }

            Swal.fire({
                icon: "success",
                title: "Successfully Logged In!!!",
                timer: 1500
            });
            navigate("/");
        } catch (err) {
            setError(err.code);
            Swal.fire({
                icon: "error",
                title: "Please try again !!",
                timer: 1500
            });
        }
    };

    return (
        <div className="flex justify-center py-8 items-center bg-white rounded-md">
            <title>HomeStead || Login</title>
            <div className='flex flex-col md:flex-row-reverse gap-2 md:gap-4 md:items-center'>
                <div className=''>
                    <Lottie animationData={LoginLottie} className='h-[150px] md:h-[400px] w-auto'
                    ></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl pt-5 border border-blue-200">
                    <h2 className="font-semibold text-lg md:text-2xl text-center text-primary">
                        Login your account
                    </h2>
                    <form onSubmit={handleLogin} className="card-body">
                        <fieldset className="fieldset">
                            <label className="label font-semibold ">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="input w-full"
                                placeholder="Email"
                                required
                            />
                            <label className="label font-semibold ">Password</label>
                            <div className='input w-full'>
                                <input
                                    name="password"
                                    type={(showPassword) ? "text" : "password"}
                                    className='w-full'
                                    placeholder="Password"
                                    required
                                />
                                <button type='button' className='text-xs md:text-base' onClick={() => setShowPassword(!showPassword)}>
                                    {(!showPassword) ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>
                            <div>
                                <button type='button' className="link link-hover">Forgot password?</button>
                            </div>

                            {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}

                            <button type="submit" className="btn btn-primary mt-4 text-white">
                                Login
                            </button>
                            <div className="divider text-slate-500">OR</div>

                            <button onClick={handleGoogleSignIn} type='button' className="btn bg-white text-black border-[#e5e5e5] mt-2">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>

                            <p className="font-semibold text-center pt-5">
                                Dont't Have An Account ?{" "}
                                <Link className="text-primary" to="/auth/register">
                                    Register
                                </Link>
                            </p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;