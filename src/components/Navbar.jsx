import React from 'react'
const Navbar = () => {
  return (
    <nav className=' bg-purple-300 flex justify-center items-center h-12 text-black '>
      <div className='flex justify-between w-[80%]'>
        <div className='logo font-bold text-2xl'>
          <span className='text-green-800 text-3xl'> &lt;</span>
          Pass
          <span className='text-green-800 '>OP</span>
          <span className='text-green-800 text-3xl'>/&gt; </span>
        </div>
          
        <ul>
            <li className='hidden sm:flex gap-7 pt-1 text-[19px]'>
                <a className='hover:font-bold w-10' href="/">Home</a>
                <a className='hover:font-bold w-10' href="/">About</a>
                <a className='hover:font-bold w-10' href="/">Contact</a>
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar
