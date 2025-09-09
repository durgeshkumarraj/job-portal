// import React from 'react';
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
// import { User2, LogOut } from 'lucide-react'; // Assuming you're using lucide-react icons
// import { Avatar } from '@radix-ui/react-avatar';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from '../ui/button';
// import axios from 'axios';
// import { setUser } from '@/redux/authSlice';

// const Navbar = ({ user }) => {
 
 
// const {User}=useSelector(store=>store.auth);
// const dispatch=useDispatch();
// const Navigate=useNavigate();
// const logoutHandler= async()=>{
// try {
//   const res=await axios.get(`$USER_API_END_POINT/logout`,{withCredentials:true})
//   if(res.data.success){
// dispatch(setUser(null));
// Navigate("/")
// toast.success(res.data.message);
//   }
  
// } catch (error) {
//   console.log(error);
//   toast.error(error.response.data.message);
  
  
// }
// }
//   return (
//     <div className="bg-white">
//       <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
//         {/* Logo Section */}
//         <div>
//           <h1 className="text-2xl font-bold">
//             Job<span className="text-[#F83002]">portal</span>
//           </h1>
//         </div>

//         {/* Navigation Menu */}
//         <div className="flex items-center gap-6">
//           <ul className="flex items-center font-medium font-bold gap-6">
//             <li className="cursor-pointer hover:text-[#F83002]"><Link to="/">Home</Link></li>
//             <li className="cursor-pointer hover:text-[#F83002]"><Link to="/jobs">Jobs</Link></li>
//             <li className="cursor-pointer hover:text-[#F83002]"><Link to="/browse">Browse</Link></li>
            
//           </ul>

//           {/* User Section */}
//           {!user ? (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <div className="cursor-pointer">
//                   {/* Avatar Section */}
//                   <Avatar>
//                     <img
//                       src="https://github.com/shadcn.png"
//                       alt="User Avatar"
//                       className="w-10 h-10 rounded-full"
//                     />
//                   </Avatar>
//                 </div>
//               </PopoverTrigger>
//               <PopoverContent className="p-4 bg-white shadow-md rounded-md w-80 space-y-4">
//                 {/* Profile Details */}
//                 <div className="flex items-center gap-4">
//                   <Avatar>
//                     <img
//                       src="https://github.com/shadcn.png"
//                       alt="User Avatar"
//                       className="w-12 h-12 rounded-full"
//                     />
//                   </Avatar>
//                   <div>
//                     <h4 className="text-lg font-medium">Durgesh MERN Stack</h4>
//                     <p className="text-sm text-gray-500">durgesh@gmail.com</p>
//                   </div>
//                 </div>

//                 {/* Profile Options */}
//                 <div className="space-y-2 flex w-fit items-center gap-1 cursor-pointer">
//                   {/* <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#F83002]">
//                     <User2 className="w-5 h-5" />
//                     View Profile
//                   </button> */}

//                   <User2/>
//                   <Button><Link to="/profile"> View Profile</Link></Button>

//                   <div className='flex w-fit items-center gap-2 cursor-pointer'>
// <LogOut/>
// <Button onClick={logoutHandler}>LogOut</Button>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to='/login'>
//               <button className="px-4 py-2 font-medium text-white bg-[#F83002] rounded-md">
//                 Login
//               </button>
//               </Link>
//             <Link to='/signup'>
//             <button className="px-4 py-2 font-medium text-[#F83002] border border-[#F83002] rounded-md">
//                 Sign Up
//               </button>
//             </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar