import React from 'react'

interface IncomingCallPopupProps{
    onAccept: () => void;
    onReject: () => void;
}

const IncomingCallPopup = ({onAccept, onReject}: IncomingCallPopupProps) => {
  return (
    <div className='absolute bg-black/40 center-position h-full w-full'>
        <div className='bg-white w-[20%] min-w-[300px] h-[20%] min-h-[150px] p-3 rounded-xl'>
           <h1 className='text-center text-xl'>You have an incoming call</h1>
           <div className='mt-4 mx-5 flex justify-between'>
              <button onClick={onAccept}>Accept</button>
              <button onClick={onReject}>Decline</button>
           </div>
        </div>
    </div>
  )
}

export default IncomingCallPopup