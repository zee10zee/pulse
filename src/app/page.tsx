import Link from 'next/link'
import React from 'react'

const page = () => {
  const isAuthenticated = true

  return (
    <div>

      <h1>Pulse</h1>
      <p>Share your pulse with the world.</p>
      <Link href= {`${isAuthenticated ? '/home' : '/signup'}`}>Get started</Link>
    </div>
  )
}

export default page