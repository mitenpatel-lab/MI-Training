import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Field, Formik, Form } from 'formik'

export default function Login() {
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (values, { setSubmitting }) => {
        const { username, password } = values;
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (data.success) {
            localStorage.setItem("token", data.accessToken);
            setMessage(`Welcome ${username}! Redirecting...`);
            setColor("text-green-600");
            if (data.user.role === "admin") {
                return navigate('/admin/flight');
            }

            setTimeout(() => {
                navigate('/index')
            }, 1000);
        } else {
            setMessage(data.message);
            setColor("text-red-600");
        }
        setSubmitting(false);

    };

    return (
        <>
            <Formik initialValues={{ username: "", password: "" }} onSubmit={handleLogin}>
                <Form className="space-y-4">
                    <Field
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-grey-500 outline-none"
                    />

                    <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-grey-500 outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-grey-800  py-3 rounded-lg focus:ring-grey-500 font-semibold transition">
                        Login
                    </button>
                </Form>
            </Formik>
            <button
                onClick={() => navigate('register')}
                className="w-full py-3 mt-5 rounded-lg font-semibold hover:ring-grey-700 transition"
            >
                Register Now
            </button>

            {
                message && (
                    <p className={`text-center mt-4 font-semibold ${color}`}>
                        {message}
                    </p>
                )
            }
        </>
    );
}
