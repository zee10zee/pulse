import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link href="/signup">Don't have an account? Sign up</Link>
    </div>
  )
}

export default Login