import React from 'react';
import { RandomUsersProps } from '../types/friendType';
import FriendStatusActions from './FriendStatusActions';


const RandomUsers = ({users, onFriendAction, onProfileVisit} : RandomUsersProps) => {

  return (
    <div className="space-y-3">
      {users.map((user) =>(
        <div key={user._id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm transition hover:bg-white">
          <div className="flex min-w-0 items-center gap-3">
            <div className="center-position h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-black text-white">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            <p onClick={()=> onProfileVisit(user._id)} className="cursor-pointer truncate font-bold text-slate-800 hover:text-blue-600">{user.name}</p>
          </div>
          <FriendStatusActions 
            user={user}
            onFriendAction={onFriendAction}
          />
        </div>
      ))}
    </div>
  )
}

export default RandomUsers
