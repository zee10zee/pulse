"use client";

import React from 'react'
import { useRouter } from 'next/navigation'

type NavigationButtons = {
    label : string;
    icon : React.ReactNode;
    destination? : string;
}

const NavigationButton = ({label, icon, destination} : NavigationButtons) => {
const router = useRouter()

  return (
    <button 
      onClick={() => destination ? router.push(destination) : router.back()}
      className="bg-green-500 text-white p-2 rounded-sm flex items-center gap-2 ml-auto"
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default NavigationButton