import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    console.log(userInfo);
    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.setName, userInfo.setEmail]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateUser({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                console.log(res);
                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated");
            } catch (err) {
                toast.error(err?.data.message || err.error);
            }
        }
    };
    return (
        <div className="login-background flex items-center justify-center">
            <div className="box-shadow w-[390px] bg-[#282828] rounded-2xl p-4 flex flex-col justify-between">
                <h1 className="text-[#D4D4D4] text-[1.25rem] text-center mb-4">
                    Update account
                </h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Enter your name..."
                            className="w-full rounded-md outline-none border-none bg-[#707070]/10 py-1 px-2 placeholder-gray-400/50 text-[#D4D4D4]"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter your email..."
                            className="w-full rounded-md outline-none border-none bg-[#707070]/10 py-1 px-2 placeholder-gray-400/50  text-[#D4D4D4]"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password..."
                            className="w-full rounded-md outline-none border-none bg-[#707070]/10 py-1 px-2 placeholder-gray-400/50 text-[#D4D4D4]"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirm password">
                            Confirm password
                        </label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Confirm your password..."
                            className="w-full rounded-md outline-none border-none bg-[#707070]/10 py-1 px-2 placeholder-gray-400/50 text-[#D4D4D4]"
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        className="bg-[#4A4340] p-1 text-[#D4D4D4] rounded-xl button-shadow mb-4">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
