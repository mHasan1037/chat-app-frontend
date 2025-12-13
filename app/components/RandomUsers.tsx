import React from 'react';
import { RandomUsersProps } from '../types/friendType';
import FriendStatusActions from './FriendStatusActions';


const RandomUsers = ({users, onFriendAction} : RandomUsersProps) => {

  return (
    <div>
      {users.map((user) =>(
        <div key={user._id}>
          <div className='flex'>
            <p>{user.name}</p>
            <FriendStatusActions 
              user={user}
              onFriendAction={onFriendAction}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default RandomUsers