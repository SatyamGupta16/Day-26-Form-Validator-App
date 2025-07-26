"use client";
import { jsPDF } from "jspdf";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../globals.css";

function Form() {
    const generatePDF = (data) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Form Submission Details", 20, 20);
        const entries = Object.entries(data);
        let y = 30;
        entries.forEach(([key, value]) => {
            doc.setFontSize(12);
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
            const output = `${formattedKey}: ${typeof value === "boolean" ? (value ? "Yes" : "No") : value}`;
            doc.text(output, 20, y);
            y += 10;
        });
        doc.save("form-submission.pdf");
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            age: "",
            dob: "",
            gender: "",
            country: "",
            agree: false,
            about: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required").min(2, "Must be at least 2 characters"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            age: Yup.number().required("Age is required").min(1, "Minimum age is 1").max(100, "Maximum age is 100"),
            dob: Yup.date().required("Date of Birth is required"),
            gender: Yup.string().required("Gender is required"),
            country: Yup.string().required("Country is required"),
            agree: Yup.boolean().oneOf([true], "You must accept the terms"),
            about: Yup.string().required("About field is required").min(10, "Please write at least 10 characters"),
        }),
        onSubmit: (values, { resetForm }) => {
            alert("Form submitted successfully!");
            console.log(values);
            generatePDF(values);
            resetForm();
        },
    });

    return (
        <div className="container">
            <h2>Live Validation Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label>Name:</label>
                    <input type="text" {...formik.getFieldProps("name")} />
                    {formik.touched.name && formik.errors.name && (
                        <span className="error">{formik.errors.name}</span>
                    )}
                </div>

                <div className="field">
                    <label>Email:</label>
                    <input type="email" {...formik.getFieldProps("email")} />
                    {formik.touched.email && formik.errors.email && (
                        <span className="error">{formik.errors.email}</span>
                    )}
                </div>

                <div className="field">
                    <label>Password:</label>
                    <input type="password" {...formik.getFieldProps("password")} />
                    {formik.touched.password && formik.errors.password && (
                        <span className="error">{formik.errors.password}</span>
                    )}
                </div>

                <div className="field">
                    <label>Age:</label>
                    <input type="number" {...formik.getFieldProps("age")} />
                    {formik.touched.age && formik.errors.age && (
                        <span className="error">{formik.errors.age}</span>
                    )}
                </div>

                <div className="field">
                    <label>Date of Birth:</label>
                    <input type="date" {...formik.getFieldProps("dob")} />
                    {formik.touched.dob && formik.errors.dob && (
                        <span className="error">{formik.errors.dob}</span>
                    )}
                </div>

                <div className="field">
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={formik.handleChange}
                            checked={formik.values.gender === "male"}
                        /> Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={formik.handleChange}
                            checked={formik.values.gender === "female"}
                        /> Female
                    </label>
                    {formik.touched.gender && formik.errors.gender && (
                        <span className="error">{formik.errors.gender}</span>
                    )}
                </div>

                <div className="field">
                    <label>Country:</label>
                    <select {...formik.getFieldProps("country")}>
                        <option value="">--Select--</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                    </select>
                    {formik.touched.country && formik.errors.country && (
                        <span className="error">{formik.errors.country}</span>
                    )}
                </div>

                <div className="field">
                    <label>
                        <input
                            type="checkbox"
                            name="agree"
                            onChange={formik.handleChange}
                            checked={formik.values.agree}
                        /> I agree to the terms
                    </label>
                    {formik.touched.agree && formik.errors.agree && (
                        <span className="error">{formik.errors.agree}</span>
                    )}
                </div>

                <div className="field">
                    <label>About You:</label>
                    <textarea {...formik.getFieldProps("about")}></textarea>
                    {formik.touched.about && formik.errors.about && (
                        <span className="error">{formik.errors.about}</span>
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form;
