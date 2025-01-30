import "../App.css";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { useState } from "react";
import UserList from "./UserList";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [education, setEducation] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format";
    if (!password || password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!mobile || mobile.length < 10)
      newErrors.mobile = "Mobile number must be at least 10 digits.";
    if (!mobile.match(/^\d{10}$/))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!education) newErrors.education = "Education is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (setter, field) => (event) => {
    setter(event.target.value);
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setMobile("");
    setEducation("");
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      const formData = {
        name,
        email,
        password,
        mobile,
        education,
      };

      try {
        const response = await fetch("http://localhost:3001/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        alert(`User created successfully! ID: ${data.user.id}`);
        resetForm();
        <UserList/>

      } catch (error) {
        console.error("Fetching failed:", error);
        alert(`Failed to fetch: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <h1>User Registration Form</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleInputChange(setName, "name")}
              placeholder="Enter Name"
              disabled={isSubmitting}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange(setEmail, "email")}
              placeholder="Enter Email"
              disabled={isSubmitting}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange(setPassword, "password")}
              minLength={8}
              placeholder="Enter Password"
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </label>
          <br />
          <label>
            Mobile No:
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={handleInputChange(setMobile, "mobile")}
              maxLength={10}
              placeholder="Mobile Number"
              disabled={isSubmitting}
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </label>
          <br />
          <Dropdown
            value={education}
            onChange={(value) => {
              setEducation(value);
              if (errors.education) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  education: undefined,
                }));
              }
            }}
            disabled={isSubmitting}
          />
          {errors.education && (
            <span className="error">{errors.education}</span>
          )}
          <Button disabled={isSubmitting} />
        </form>
      </div>
    </>
  );
}

export default Form;
