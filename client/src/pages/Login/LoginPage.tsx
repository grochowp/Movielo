import React, { useState } from "react";
import { User } from "../../types";
import styled from "styled-components";

import { SubmitHandler, useForm } from "react-hook-form";

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UseFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const LoginPage: React.FC<LoginProps> = ({ setUser }) => {
  const { register, reset, handleSubmit } = useForm<UseFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  console.log(setUser);

  const [error, setError] = useState("");
  const [action, setAction] = useState<"Login" | "Register">("Login");

  const handleChangeAction = () => {
    setAction(action === "Login" ? "Register" : "Login");
    setError("");
    reset();
  };

  const onSubmit: SubmitHandler<UseFormInputs> = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dane zostały wysłane do backendu:", data);
        // Tutaj możesz dodać kod obsługi odpowiedzi z backendu, jeśli to konieczne
      })
      .catch((error) => {
        console.error("Błąd podczas wysyłania danych do backendu:", error);
        // Tutaj możesz dodać kod obsługi błędów
      });

    // console.log(data);
    // action === "Login"
    //   ? setUser({
    //       name: "aaa",
    //       surname: "bbb",
    //       email: "aaa@wp.pl",
    //       password: "aaaaaaaaa",
    //       points: 500,
    //     })
    //   : reset();
  };

  return (
    <PageBackground>
      <article>
        <Form action={action} onSubmit={handleSubmit(onSubmit)}>
          <h1>{action}</h1>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
          />

          <input
            {...register("password", { minLength: 8, required: true })}
            placeholder="Password"
            type="password"
          />

          {action === "Register" ? (
            <>
              <input
                {...register("firstName", { minLength: 2, required: true })}
                placeholder="First Name"
              />
              <input
                {...register("lastName", { minLength: 2, required: true })}
                placeholder="Last name"
              />
            </>
          ) : (
            ""
          )}

          {error ? <p>{error}</p> : <p></p>}

          <input type="submit" value={action} />
          <h5>
            Already have an account?{" "}
            <span onClick={() => handleChangeAction()}>{action}</span>
          </h5>
        </Form>
      </article>
    </PageBackground>
  );
};

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
  }

  article::before {
    height: 100vh;
    width: 100vw;
    max-width: 1920px;
    max-height: 1080px;
    content: "";
    position: absolute;
    background: url(images/loginBackground.jpg) center;
    filter: blur(7px);
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
`;
