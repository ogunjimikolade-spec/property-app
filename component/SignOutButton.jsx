"use client"
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className="text-gray-600 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
      Sign Out
    </button>
  )
}

export default SignOutButton;