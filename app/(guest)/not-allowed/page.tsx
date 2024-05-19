import { Button } from '@/components/ui/moving-border'
import Link from 'next/link'
import React from 'react'

const NotAllowedPage = () => {
    return (<div className='h-screen my-auto mx-auto text-center justify-center space-y-10'>
        <div className='mt-32'>
            You are not allowed if you didnt agree to our Terms and Agreements
        </div>
        <div className='mt-10'>
            <Link href="auth/register" >
                <Button
                    variant="ghost"
                    className="mr-10 mt-1 text-white outline outline-[1px] outline-emerald-500"
                >
                    Go Back
                </Button>
            </Link>
        </div>
    </div>
    )
}

export default NotAllowedPage