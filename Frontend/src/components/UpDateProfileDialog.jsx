import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

function UpDateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '', // Handling array as comma-separated string
        file: user?.profile?.resume || null
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]; // Fixed typo from `file` to `files`
        setInput({ ...input, file });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px] bg-white text-black" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className="text-black">Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmitHandler} className="bg-white">
                        <div className="grid gap-4 py-5">
                            <div className="grid grid-cols-4 items-center">
                                <Label htmlFor="fullname" className="text-right text-black">Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-black border border-gray-300"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <Label htmlFor="email" className="text-right text-black">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-black border border-gray-300"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <Label htmlFor="phoneNumber" className="text-right text-black">Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-black border border-gray-300"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <Label htmlFor="bio" className="text-right text-black">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    type="text"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-black border border-gray-300"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <Label htmlFor="skills" className="text-right text-black">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    type="text"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3 bg-white text-black border border-gray-300"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <Label htmlFor="file" className="text-right text-black">Upload Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="col-span-3 bg-white text-black border border-gray-300"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4 bg-gray-300 text-black" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4 bg-blue-500 text-white">
                                    Update
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default UpDateProfileDialog;
