import React, { useState } from "react";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { userService } from "../../services/userService";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface UseFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const user = useUser();
  const [error, setError] = useState<string>("");
  const [action, setAction] = useState<"Login" | "Register">("Login");

  const { register, reset, handleSubmit } = useForm<UseFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleChangeAction = () => {
    setAction(action === "Login" ? "Register" : "Login");
    setError("");
    reset();
  };

  const onSubmit: SubmitHandler<UseFormInputs> = async (data) => {
    try {
      let response;

      if (action === "Register") {
        response = await userService.register(
          data.email,
          data.password,
          data.firstName,
          data.lastName
        );
      }

      if (action === "Login") {
        response = await userService.login(data.email, data.password);
      }

      if (response.user) {
        user.setUser(response.user);
        navigate("/main");
        setError("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageBackground>
      <img src={"/images/loginBackground-1.jpg"} />
      <article>
        <Form action={action} onSubmit={handleSubmit(onSubmit)}>
          <h1>{action}</h1>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
          />

          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
          />

          {action === "Register" ? (
            <>
              <input
                {...register("firstName", { required: true })}
                placeholder="First Name"
              />
              <input
                {...register("lastName", { required: true })}
                placeholder="Last name"
              />
            </>
          ) : (
            ""
          )}

          <p className="error">{error ? error : ""}</p>

          <input type="submit" value={action} />
          <h5>
            {action === "Login" ? (
              <p>
                Don't have an account?{" "}
                <span onClick={() => handleChangeAction()}>Register</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => handleChangeAction()}>Login</span>
              </p>
            )}
          </h5>
        </Form>
      </article>
    </PageBackground>
  );
};

export default LoginPage;

const PageBackground = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${(props) => props.theme.color};

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40rem;
    width: 30rem;
    border: 1px solid ${(props) => props.theme.color};
    border-radius: 20px;

    @media (max-width: 500px) {
      width: clamp(20rem, 95vw, 30rem);
    }
  }

  img {
    height: 100vh;
    width: 100vw;
    max-width: 1920px;

    content: "";
    position: absolute;

    filter: blur(2px);
    z-index: -1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
  font-family: "Inter", sans-serif;

  input {
    width: 20rem;
    height: 3rem;
    background: transparent;
    padding-left: 20px;
    border: 1px solid ${(props) => props.theme.color};
    border-radius: 10px;
    color: ${(props) => props.theme.color};
    @media (max-width: 500px) {
      width: clamp(15rem, 75vw, 20rem);
    }
  }

  input[type="submit"] {
    margin-top: ${(props) => (props.action === "Login" ? "9.5rem" : "1rem")};
    width: 15rem;
    padding-left: 0;
    font-size: 1.25rem;
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.pageBackground};
    cursor: pointer;
  }

  h1 {
    height: 3rem;
    font-size: 3.5rem;
    font-weight: 400;
  }

  h5 {
    font-size: 1rem;
    color: #c7c7c7;
    font-weight: 200;
    margin: 0;

    span {
      font-weight: 700;
      cursor: pointer;
    }
  }

  p {
    margin: 0;
    height: 2rem;
  }
  .error {
    text-align: center;
  }
`;
