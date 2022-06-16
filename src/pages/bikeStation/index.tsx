import { message } from 'antd';
import React, { useState, useRef } from 'react';
import { useRequest } from 'ahooks';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {});
}

function editUsername(): Promise<void> {
  console.log(arguments);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error('Failed to modify username'));
      }
    }, 101);
  });
}

export default () => {
  // store last username
  const lastRef = useRef<string>();

  const [state, setState] = useState('');

  // get username
  const { data: username, mutate } = useRequest(getUsername);

  // edit username
  const { run: edit } = useRequest(editUsername, {
    manual: true,
    onSuccess: (result, params) => {
      setState('');
      message.success(`The username was changed to "${params[0]}" !`);
    },
    onError: (error) => {
      message.error(error.message);
      mutate(lastRef.current);
    },
  });

  const onChange = () => {
    lastRef.current = username;
    mutate(state);
    edit(state, 1, 2, 3, 4);
  };

  return (
    <div>
      <p>Username: {username}</p>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button type="button" onClick={onChange}>
        Edit
      </button>
    </div>
  );
};
