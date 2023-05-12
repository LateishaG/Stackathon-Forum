import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPublicProfile } from '../store';

const Profile = () => {
  const { id } = useParams();
  const { auth, extProfile } = useSelector(state => state);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id && auth.id === id) {
      setUser(auth);
    } else {
      dispatch(fetchPublicProfile(id));
    }
  }, [id, auth]);

  useEffect(() => {
    setUser(extProfile);
  }, [extProfile]);

  console.log(user);

  if (!user.id) {
    return <h1>Wait</h1>;
  }

  return <h1>{user.username}</h1>;
};

export default Profile;
