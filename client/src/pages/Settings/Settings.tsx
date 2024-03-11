import styled from "styled-components";
import ProfileHeader from "../../components/ProfileHeader";
import { GoPencil } from "react-icons/go";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { userService } from "../../services/userService";

interface ISettings {
  theme: string;
  setTheme: (newTheme: string) => void;
}

const Settings: React.FC<ISettings> = ({ theme, setTheme }) => {
  const { user, setUser } = useUser();
  const userId = user ? user._id : "";
  const initialName = user ? user.firstName : "";
  const initialSurname = user ? user.lastName : "";

  const [name, setName] = useState<string>(initialName);
  const [surname, setSurname] = useState<string>(initialSurname);
  const [password, setPassword] = useState<string>("********");
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (name !== initialName || surname !== initialSurname) {
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  }, [name, surname, password, initialName, initialSurname]);

  const editUserData = async () => {
    const response = await userService.editProfile(name, surname, userId);
    setMessage(response.message);
    resetUserData();
    response.user && setUser(response.user);

    const intervalId = setInterval(() => {
      setMessage("");
    }, 3500);

    setTimeout(function () {
      clearInterval(intervalId);
    }, 1000);
  };

  const resetUserData = () => {
    setName(initialName);
    setSurname(initialSurname);
  };

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };
  return (
    <>
      <ProfileHeader>Settings</ProfileHeader>
      <Content>
        <div className="personalInfo">
          <div className="personalInfo-Edit">
            <span>Personal Information</span>
            {dataChanged && (
              <div className="btnsUserData">
                <button
                  style={{ color: "#CC5500" }}
                  onClick={() => resetUserData()}
                >
                  Reset <GoPencil />
                </button>
                <button onClick={() => editUserData()}>
                  Save <GoPencil />
                </button>
              </div>
            )}
            {message && !dataChanged && <div>{message}</div>}
          </div>
          <div className="userData">
            <div>
              <span>Name</span>
              <input
                className="custom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <span>Surname</span>
              <input
                className="custom"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></input>
            </div>
            <div>
              <span>Email</span>
              <input
                disabled={true}
                value={user?.email}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <span>Password</span>
              <input
                type="password"
                disabled={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)} //TO-DO change password and display potential errors, add visible/invisible button
              ></input>
            </div>
          </div>
        </div>
        <div className="pfp-Titles">
          <div className="prof2">
            <p>Profile Picture</p>
            <div className="changePicture">
              <img src={`/images/bg-1.jpg`} alt={"a"} />
              <button className="profPic" onClick={() => resetUserData()}>
                Change <GoPencil />
              </button>
            </div>
          </div>
          <div className="prof2">
            <p>Titles</p>
            <ul>
              {user?.titles.map((title: string, i: number) => (
                <li>
                  <input type="checkbox" value={i} />
                  <span>{title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="prof2">
            <p>Theme</p>
            <div className="themes">
              <button
                className={`profPic ${theme === "dark" ? "active" : ""}`}
                onClick={() => changeTheme("dark")}
              >
                Dark <CiDark />
              </button>
              <button
                className={`profPic ${theme === "light" ? "active" : ""}`}
                onClick={() => changeTheme("light")}
              >
                Light <IoSunnyOutline />
              </button>
              {/* <button className="profPic" onClick={() => changeTheme("")}>
                ???? <GoPencil />
              </button> */}
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Settings;

const Content = styled.article`
  display: flex;
  max-width: calc(1920px - 7rem);
  width: calc(100vw - 7rem);
  height: calc(100vh - 6rem);
  font-family: "Spline Sans", sans-serif;
  background-color: ${(props) => props.theme.pageBackground};
  padding-top: 6rem;
  transition: 0.25s;
  @media (max-width: 900px) {
    padding-top: 8rem;
  }
  button {
    box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
    font-family: "Spline Sans", sans-serif;
    color: ${(props) => props.theme.color};
    font-size: clamp(0.75rem, 1.5vw, 1.25rem);
    background-color: ${(props) => props.theme.pageBackground};
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.componentsBackground};
    width: clamp(4.75rem, 7vw, 7rem);
    height: 2.5rem;
    cursor: pointer;

    &:hover {
      transform: scale(1.025);
    }

    svg {
      position: relative;
      top: 0.15rem;
      left: 0.1rem;
    }
  }

  @media (max-width: 900px) {
    width: 100vw;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    height: max-content;

    article {
      padding-bottom: 5rem;
    }
  }

  .personalInfo {
    width: 50vw;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.color};

    @media (max-width: 900px) {
      width: 100vw;
    }

    .personalInfo-Edit {
      height: 3.5rem;
      width: clamp(20rem, 35vw, 40rem);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.componentsBackground};

      .btnsUserData {
        display: flex;
        gap: 0.5rem;
      }

      span {
        font-size: clamp(1rem, 1.5vw, 1.5rem);
      }
    }

    .userData {
      width: clamp(20rem, 35vw, 40rem);

      div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 2rem;

        input {
          background-color: ${(props) => props.theme.componentsBackground};
          border: 0;
          border-radius: 5px;
          font-size: clamp(1rem, 2vw, 1.25rem);
          height: 3rem;
          padding-left: 1rem;
          transition: 1s;

          &:hover,
          &:focus {
            transform: scale(1.025);
          }
        }
        span {
          color: ${(props) => props.theme.colorSecondary};
        }
        .custom {
          color: ${(props) => props.theme.color};
        }
      }
    }
  }

  .pfp-Titles {
    color: ${(props) => props.theme.color};
    width: 50vw;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    justify-content: center;
    align-items: center;

    @media (max-width: 900px) {
      width: 100vw;
    }
    .profPic {
      width: clamp(5rem, 10vw, 8rem);
    }

    .prof2 {
      width: clamp(20rem, 35vw, 30rem);
      p {
        padding-bottom: 0.7rem;
        font-size: clamp(1rem, 1.5vw, 1.5rem);
        border-bottom: 1px solid ${(props) => props.theme.componentsBackground};
      }
      .changePicture {
        display: flex;
        align-items: center;
        gap: 2rem;
        img {
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
        }
      }

      ul {
        max-height: 7.5rem;
        overflow-y: auto;
        list-style: none;
        padding: 0;

        li {
          decoration: none;
          margin-bottom: 1rem;
          font-size: clamp(0.9rem, 1.5vw, 1.5rem);
          span {
            margin-left: 1rem;
          }
        }
      }
      .themes {
        display: flex;
        justify-content: space-around;
      }
      .active {
        background-color: ${(props) => props.theme.componentsBackground};
        // color: ${(props) => props.theme.componentsBackground};
      }
    }
  }
`;
