import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Layout from "../Layout/Layout";
import { signUpService } from "../services/signupService";
import { useEffect, useState } from "react";
import { useAuth, useAuthAction } from "../providers/AuthProvider";
import { useQuery } from "../hooks/useQuery";





const initialValues = {
  email: "",
  password: "",
  name: "",
  phoneNumber: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  password: Yup.string(" ")
    .required("Password is required !")
    .min(8, "least 8 character! ")
    .max(20),

  name: Yup.string("Must be valid name")
    .required("name is required ")
    .min(3, "least 3 character "),

  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required !"),

  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),


  passwordConfirm: Yup.string()
    .required("Pasword Confirmation is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

});

const SignupPage = ({ history }) => {

  const query = useQuery();

  const redirect = query.get("kojabayadbere") || "/";


  const isSignUp = useAuth()

  useEffect(() => {
    if (isSignUp) history.push(redirect)
  }, [redirect, isSignUp])


  const [errors, seterrors] = useState(null);

  const setAuth = useAuthAction();


  const submitHandler = async (value) => {
    const { name, email, phoneNumber, password } = value
    const userData = {
      name, email, phoneNumber, password
    }

    try {
      const { data } = await signUpService(userData);
      setAuth(data)
      localStorage.setItem("userData", JSON.stringify(data))
      seterrors(null)
      history.push(redirect)
    } catch (error) {
      seterrors(error.response.data.message)
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
      <h3 className="font-bold text-lg text-center mb-2 text-purple-700 ">Sign up </h3>
      <form
        className="border border-slate-300 rounded sm:w-4/6 lg:w-3/6 xl:w-2/6 w-5/6 flex flex-col items-center p-2 mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col w-5/6 my-1 ">
          <label className="font-bold" htmlFor="name">
            Name
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            name="name"
            className="py-1 px-2 rounded-xl outline-purple-800"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500 text-center text-base">
              {formik.errors.name}
            </div>
          )}
        </div>

        <div className="flex flex-col w-5/6 my-1 ">
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

        <div className="flex flex-col w-5/6 my-1 ">
          <label className="font-bold" htmlFor="">
            phone number
          </label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            type="tell"
            name="phoneNumber"
            className="py-1 px-2 rounded-xl outline-purple-800"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="text-red-500 text-center text-base">
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>

        <div className="flex flex-col w-5/6  my-1">
          <label className="font-bold" htmlFor="">
            password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            className="py-1 px-2 rounded-xl outline-purple-800"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-center text-base">
              {formik.errors.password}
            </div>
          )}
        </div>

        <div className="flex flex-col w-5/6  my-1">
          <label className="font-bold" htmlFor="">
            password confirm
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
            type="password"
            name="passwordConfirm"
            className="py-1 px-2 rounded-xl outline-purple-800"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div className="text-red-500 text-center text-base">
              {formik.errors.passwordConfirm}
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
          sign up
        </button>
        {errors && <div className="text-center text-red-800">{errors}</div>}
        <Link to="/login?kojabayadbere=checkout">
          <h6 className="text-sm text-purple-800">Do you have an account? </h6>
        </Link>
      </form>
    </>
  );
};

export default SignupPage;
