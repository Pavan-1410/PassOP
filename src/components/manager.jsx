import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { MdLibraryAdd } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer,toast } from 'react-toastify';


const Manager = () => {
  const ref = useRef()
  const passref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])


  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const Showpassword = () => {
    if (ref.current.src.includes("hide.png")) {
      ref.current.src = "show.png"
      passref.current.type = "text"
    }
    else {
      ref.current.src = "hide.png"
      passref.current.type = "password"
    }
  }
  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const savepassword = () => {
    if (form.site.length === 0 || form.username.length === 0 || form.password.length === 0) {
      alert("Enter all the fields")
    }
    else {

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      setform({ site: "", username: "", password: "" })

    }
  }
  const deletepassword = (id) => {
    let c = confirm("Do you want to Delete this Password")
    if (c) {toast.warn('Deleting Password', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      })
      setpasswordArray(passwordArray.filter(item => item.id != id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
    }

  }
  const editpassword = (id) => {
    console.log('editing password of id ', id)
    setform(passwordArray.filter(item => item.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id != id))
  }
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copying Text', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
      <div className="mx-auto max-w-6xl bg-purple-200 bg-opacity-30 shadow-lg   mt-3 text-center pt-2 pb-3 p-8">
        <h1 className='font-bold text-center'>
          <div className='logo font-bold text-3xl'>
            <span className='text-green-800 text-3xl'> &lt;</span>
            Pass
            <span className='text-green-800 '>OP</span>
            <span className='text-green-800 text-3xl'>/&gt; </span>
          </div>
        </h1>
        <p className='text-center text-lg'>Your Own Password Manager</p>
        <div className='text-white flex flex-col gap-4 p-4'>
          <input value={form.site} name="site" onChange={handelchange} className='rounded-full text-black border-2 border-green-700 p-6 py-2' placeholder='Enter website URL' type="text" />
          <div className='flex gap-5 max-sm:flex-col max-sm:w-full'>
            <input value={form.username} name="username" onChange={handelchange} className='rounded-full w-full text-black border-2 border-green-700 p-6 py-2' type="text" placeholder='Enter Username' />
            <div className="relative">
              <input ref={passref} value={form.password} name="password" onChange={handelchange} className=' rounded-full sm:w-[250px] w-full text-black border-2 border-green-700 p-6 py-2 pr-12' type="password" placeholder='Enter Password' />
              <span className="absolute right-5 top-[8px] text-black " onClick={Showpassword}><img width={25} ref={ref} src="hide.png" alt="hide" style={{ cursor: 'pointer' }} /></span></div>

          </div>

        </div>
        <button onClick={savepassword} className='text-black bg-green-400 border-2 border-green-900 flex justify-center gap-4 text-[18px] items-center rounded-full w-[25%] m-auto p-2 py-2 hover:bg-green-500 max-md:w-[75%]'><MdLibraryAdd />
          Add Password</button>
      </div>
      <div className='mx-auto max-w-6xl bg-purple-200 bg-opacity-30 shadow-lg m-5 h-[310px] p-2 overflow-y-auto custom-scrollbar'>
        <h1 className='font-bold text-[20px] ml-[41px]'> Your Passwords</h1>
        {passwordArray.length === 0 && <div className='ml-10'>No Password To Show</div>}
        {passwordArray.length != 0 && <table className="m-auto mt-2 w-[90%] border-collapse border border-black text-center bg-white shadow-md overflow-hidden ">
          <thead className="bg-green-500 text-black">
            <tr>
              <th className="border border-black px-4 py-2">Sr</th>
              <th className="border border-black px-4 py-2">URL</th>
              <th className="border border-black px-4 py-2">Username</th>
              <th className="border border-black px-4 py-2">Password</th>
              <th className="border border-black px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {passwordArray.map((item, index) => {
              return <tr className="hover:bg-gray-100">
                <td className="border border-black px-4 py-2 "> {index + 1}</td>
                <td className="border border-black px-4 py-2 pr-[45px] relative "><a href={item.site} target='_blank'>{item.site}</a><FiCopy className='absolute right-5 top-3' onClick={() => { copyText(item.site) }} /> </td>
                <td className=" pr-[45px] border border-black px-4 py-2 relative">{item.username}<FiCopy className='absolute top-3 right-5' onClick={() => { copyText(item.username) }} /></td>
                <td className="pr-[45px]  border border-black px-4 py-2 relative" >{item.password}<FiCopy className='absolute top-3 right-5' onClick={() => { copyText(item.password) }} /></td>
                <td className="border border-black px-4 py-2 flex justify-center gap-2 h-[41px]" ><FiEdit onClick={() => { editpassword(item.id) }} /> <AiTwotoneDelete onClick={() => { deletepassword(item.id) }} />

                </td>

              </tr>
            })}
          </tbody>
        </table>}

      </div>
    </>
  )
}

export default Manager
