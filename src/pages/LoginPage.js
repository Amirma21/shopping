import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Layout from "../Layout/Layout";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { loginService } from "../services/loginService";
import { useAuth, useAuthAction } from "../providers/AuthProvider";
import { useQuery } from "../hooks/useQuery";


const initialValues = { email: "", password: "" };

const validationSchema = Yup.object({
  password: Yup.string(" ")
    .required("Password is required !")
    .min(8, "least 8 character! ")
    .max(20),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required !"),
});

const LoginPage = ({ history }) => {

  const query = useQuery();
  const redirect = query.get("kojabayadbere") || "/";

  const isLogin = useAuth();

  useEffect(() => {
    if (isLogin) history.push(redirect)
  }, [redirect, isLogin])

  const setAuth = useAuthAction();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, seterror] = useState(null);


  const submitHandler = async (value) => {
    try {
      const { data } = await loginService(value);
      setAuth(data);
      localStorage.setItem("userData", JSON.stringify(data));
      seterror(null);
      history.push(redirect);
    } catch (error) {
      seterror(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: submitHandler,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <>
      <Layout />
      <h1 className="font-bold text-2xl text-center text-purple-800 my-5">
        Amir shop
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="border border-slate-300 rounded sm:w-4/6 lg:w-3/6 xl:w-2/6 w-5/6 flex flex-col items-center p-2 mx-auto"
      >
        <div className="flex flex-col w-5/6 my-2 ">
          <label className="font-bold" htmlFor="">
            Email
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            name="email"
            className="py-1 px-2 rounded-xl outline-purple-800"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-center text-base">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="flex flex-col relative w-5/6 my-2">
          <span className="absolute top-8 cursor-pointer text-lg right-2" onClick={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
          <label className="font-bold" htmlFor="">
            password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type={isShowPassword ? "text" : "password"}
            name="password"
            className="py-1 px-2 rounded-xl outline-purple-800 "
          />

          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-center text-base">
              {formik.errors.password}
            </div>
          )}
        </div>
        <button
          disabled={!formik.isValid}
          className={`w-5/6 p-1 rounded-xl my-4 text-white ${formik.isValid
            ? "bg-purple-800  "
            : "bg-purple-500 cursor-not-allowed"
            }`}
        >
          Login
        </button>
        {error && <p className="text-red-400 text-center font-bold mb-4">{error}</p>}
        <Link to="/signup">
          <h6 className="text-sm text-purple-800">Not signup yet ? </h6>
        </Link>
      </form>
    </>
  );
};

export default LoginPage;
