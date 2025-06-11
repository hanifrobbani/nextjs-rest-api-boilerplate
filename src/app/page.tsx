"use client";
import { useUserQuery, usePostUser } from "@/service/fetchDataUser.service";
import React, { useState } from "react";
import { ZodError } from "zod";
import { PostUserSchema } from "@/validations/userSchema";

export default function Home() {
  const { data, isLoading, isError } = useUserQuery();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

    const postUserMutation = usePostUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmissionSuccess(false);

    try {
      PostUserSchema.parse(formData);
      console.log("Form data is valid:", formData);
      await postUserMutation.mutateAsync(formData);

      setSubmissionSuccess(true);
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const fieldName = err.path[0] as string;
            newErrors[fieldName] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };
  
  return (
    <div className="">
      <div
        style={{
          padding: "20px",
          border: "2px solid #000000",
          borderRadius: "8px",
        }}
      >
        <h2>Add User</h2>
        {submissionSuccess && (
          <p style={{ color: "green" }}>Registration successful!</p>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                border: errors.username ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
            {errors.username && (
              <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>
                {errors.username}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                border: errors.email ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                border: errors.password ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>
                {errors.password}
              </p>
            )}
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </form>
      </div>
        
        {/* An error will occur because the default API endpoint has not been set, so it must be set manually. */}
      {isLoading ? (
        <div className="">Loading...</div>
      ) : isError ? (
        <div className="">Error while get data from server</div>
      ) : (
        <ul>
          {data?.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}