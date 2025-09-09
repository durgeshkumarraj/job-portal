import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpDateProfileDialog from './UpDateProfileDialog';
import { useSelector } from 'react-redux';

function Profile() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg?semt=ais_hybrid"
                alt="Profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname || 'NA'}</h1>
              <p>{user?.profile?.bio || 'No bio available'}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div>
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || 'No email available'}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || 'No phone number available'}</span>
          </div>
        </div>
        <div className="gap-4">
          <h1>Skills</h1>
          <div className="flex items-center gap-3">
            {user?.profile?.skills?.length > 0
              ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              : <span>NA</span>}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a target="blank" href={user.profile.resume} className="text-blue-500 w-full hover:underline cursor-pointer">
              {user?.profile?.resumeOriginalName || 'Resume'}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl">
        <h1 className="font-bold my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpDateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
