import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setpasswordarray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordarray(JSON.parse(passwords));
    }
  }, []);

  const showpassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("icons/closeeye.svg")) {
      ref.current.src = "icons/openeye.svg";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "icons/closeeye.svg";
      passwordref.current.type = "password";
    }
  };

  const savepassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordarray([...passwordarray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordarray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordarray, form]);
      setform({ site: "", username: "", password: "" });
      toast("password saved!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
      toast("length should be greater than 3",{
        theme: "dark",
      })
    }
  };

  const deletepassword = (id) => {
    let c = confirm("Do you really want to delete this password");
    if (c) {
      setpasswordarray(passwordarray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordarray.filter((item) => item.id !== id))
      );
      toast("password deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editpassword = (id) => {
    setform(passwordarray.filter((item) => item.id === id)[0]);
    setpasswordarray(passwordarray.filter((item) => item.id !== id));
    toast("password edited!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copytext = (text) => {
    toast("copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="bg-slate-50 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">FORT/&gt;</span>
        </h1>
        <p className="text-green-500 text-lg text-center">
          Your own password manager
        </p>
        <div className="text-black flex flex-col p-4 items-center">
          <input
            value={form.site}
            onChange={handlechange}
            placeholder="Enter website name"
            className="rounded-full border border-green-500 w-50 md:w-[31.5vw] p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row">
            <input
              value={form.username}
              onChange={handlechange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-fit items-center">
              <input
                value={form.password}
                ref={passwordref}
                onChange={handlechange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-fit p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 text-black w-fit cursor-pointer"
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className="w-[30px]"
                  src="icons/closeeye.svg"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            className="text-black flex justify-center items-center bg-green-400 rounded-full
        w-fit px-8 py-2 gap-2 hover:bg-green-500"
            onClick={savepassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-2">Your passwords</h2>
          {passwordarray.length === 0 && <div>No passwords to show</div>}
          {passwordarray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-3">Site</th>
                  <th className="py-3">Username</th>
                  <th className="py-3">Password</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordarray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 cursor-pointer">
                        <div className="flex gap-2 items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            src="icons/copy.png"
                            alt=""
                            onClick={() => {
                              copytext(item.site);
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 cursor-pointer">
                        <div className="flex gap-2 items-center justify-center">
                          <span>{item.username}</span>
                          <img
                            src="icons/copy.png"
                            alt=""
                            onClick={() => {
                              copytext(item.username);
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 cursor-pointer">
                        <div className="flex gap-2 items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <img
                            src="icons/copy.png"
                            alt=""
                            onClick={() => {
                              copytext(item.password);
                            }}
                          />
                        </div>
                      </td>
                      <td className="w-32 cursor-pointer">
                        <div className="flex justify-center items-center">
                          <span>
                            <img
                              onClick={() => {
                                editpassword(item.id);
                              }}
                              className="w-8"
                              src="icons/edit.svg"
                              alt=""
                            />
                          </span>
                          <span>
                            <img
                              className="w-8"
                              src="icons/delete.svg"
                              alt=""
                              onClick={() => {
                                deletepassword(item.id);
                              }}
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
