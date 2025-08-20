import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

export default function Homepage() {
    return (
        <div className='container'>
            <h1 className='text-4xl font-bold text-primary mb-5'>Homepage</h1>

            <Button asChild>
                <Link href="/add-job">Get start</Link>
            </Button>
        </div>
    )
}