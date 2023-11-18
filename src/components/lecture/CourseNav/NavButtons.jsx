import React from 'react'

function NavButtons() {
    return (
        <div className='bg-slate-200 px-2 pt-6 pb-4'>
            <div>
                <p className='font-semibold text-xl py-4 '>(12/23) Completed</p>
                <div className='border h-3 w-[100%] rounded bg-white  mb-4'>
                    <div className='h-full w-[34%] rounded bg-green-400'>

                    </div>
                </div>

            </div>
            <div className='flex justify-end gap-3 items-center px-2 pb-6 '>
                {/* <div className='p-2 rounded w-20 text-center bg-slate-400'>Previous</div> */}
                <div className='p-2 rounded w-20 text-center bg-red-500 '>Skip</div>
                <div className='p-2 rounded w-20 text-center bg-green-500'>Next</div>
            </div>
        </div>
    )
}

export default NavButtons