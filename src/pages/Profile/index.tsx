import { privateRequest, request } from '@/utils/apis';
import { useRequest } from 'ahooks';
import React from 'react';

const Profile = () => {
  const { data } = useRequest(async () => {
    return privateRequest(request.get, '/user/profile');
  });

  return <div>Profile</div>;
};

export default Profile;
