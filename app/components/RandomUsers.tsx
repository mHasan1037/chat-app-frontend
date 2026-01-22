import React from 'react';
import { RandomUsersProps } from '../types/friendType';
import FriendStatusActions from './FriendStatusActions';


const RandomUsers = ({users, onFriendAction, onProfileVisit} : RandomUsersProps) => {

  return (
    <div>
      {users.map((user) =>(
        <div key={user._id}>
          <div className='flex justify-between'>
            <p onClick={()=> onProfileVisit(user._id)}>{user.name}</p>
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