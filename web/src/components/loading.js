import { ImSpinner9 } from 'react-icons/im';

export default function Loading() {
    return(
        <div className='flex flex-col items-center justify-center min-h-[70vh]'>
            <ImSpinner9 className='animate-spin text-8xl' />
            <p className='text-2xl py-4 font-semibold'>Loading...</p>
        </div>
    )
}