import styled from "styled-components";
import ProfileHeader from "../../components/ProfileHeader";
import { GoPencil } from "react-icons/go";
import { useUser } from "../../contexts/UserContext";
import { ChangeEvent, useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { userService } from "../../services/userService";
import { ITitle } from "../../types";
import { IMGUR_CLIENT_ID } from "../../../public/utils";

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
  const [profilePictureMessage, setProfilePictureMessage] =
    useState<string>("Profile Picture");

  const [tempLink, setTempLink] = useState<string>("");

  const auth = "Client-ID " + IMGUR_CLIENT_ID;
  useEffect(() => {
    if (name !== initialName || surname !== initialSurname) {
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  }, [name, surname, password, initialName, initialSurname]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `${auth}`);

      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("type", "image");
      formData.append("title", "PP");
      formData.append("description", "Profile picture");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };

      try {
        const response = await fetch(
          "https://api.imgur.com/3/image",
          requestOptions
        );
        const data = await response.json();
        setTempLink(data.data.link);
      } catch (error) {
        alert("Failed");
        console.error(error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await userService.changeProfilePicture(userId, tempLink);
    setUser(response.user);

    setProfilePictureMessage(response.message);
    setTempLink("");
    setTimeout(() => {
      setProfilePictureMessage("Profile Picture");
    }, 3500);
  };

  const editUserData = async () => {
    const response = await userService.editProfile(name, surname, userId);
    setUser(response.user);
    setMessage(response.message);

    setTimeout(() => {
      setMessage("");
    }, 3500);
  };

  const resetUserData = () => {
    setName(initialName);
    setSurname(initialSurname);
  };

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleChangeTitles = async (
    titleName: string,
    titleDisplay: boolean
  ) => {
    const response = await userService.changeTitles(
      titleName,
      !titleDisplay,
      userId
    );
    setUser(response.user);
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
            <p>{profilePictureMessage}</p>
            <div className="changePicture">
              <img
                src={`${tempLink ? tempLink : user?.profilePicture}`}
                alt={"user profile picture"}
              />

              <form onSubmit={handleSubmit}>
                <div className="file-input-container">
                  <input
                    type="file"
                    accept="image/jpeg"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="fileInput" className="custom-file-input">
                    Choose file
                  </label>
                </div>
                <button
                  className={!tempLink ? "disabled" : "profPic"}
                  type="submit"
                >
                  Upload <GoPencil />
                </button>
              </form>
            </div>
          </div>
          <div className="prof2">
            <p>Titles</p>
            <ul>
              {user?.titles.map((title: ITitle) => (
                <li key={title.name}>
                  <input
                    type="checkbox"
                    checked={title.display}
                    onChange={() =>
                      handleChangeTitles(title.name, title.display)
                    }
                  />
                  <span>{title.name}</span>
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
  max-width: calc(1920px - 5rem);
  width: calc(100vw - 5rem);
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
    // height: max-content;

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
      width: clamp(18rem, 35vw, 40rem);
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
      width: clamp(18rem, 35vw, 40rem);

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

    .disabled {
      width: clamp(5rem, 10vw, 8rem);
      pointer-events: none;
      cursor: not-allowed;
      color: ${(props) => props.theme.colorSecondary};
    }

    .prof2 {
      input[type="checkbox"] {
        width: 1.15rem;
        height: 1.15rem;
        accent-color: ${(props) => props.theme.color};
      }

      width: clamp(18rem, 35vw, 30rem);
      p {
        padding-bottom: 0.7rem;
        font-size: clamp(1rem, 1.5vw, 1.5rem);
        border-bottom: 1px solid ${(props) => props.theme.componentsBackground};
      }
      .changePicture {
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
          width: clamp(6rem, 8vw, 8rem);
          height: clamp(6rem, 8vw, 8rem);
          border-radius: 50%;
        }

        form {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }

        .file-input-container {
          position: relative;
          overflow: hidden;
        }

        .custom-file-input {
          display: inline-block;
          padding: 10px clamp(6px, 0.75vw, 16px);
          background-color: ${(props) => props.theme.componentsBackground};
          color: ${(props) => props.theme.color};
          border-radius: 5px;
          cursor: pointer;
        }

        input[type="file"] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
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
      }
    }
  }
`;
