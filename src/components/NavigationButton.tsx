"use client";

import React from 'react'
import { useRouter } from 'next/navigation'

type NavigationButtons = {
    destination : string;
    label : string;
    icon : React.ReactNode;
}

const NavigationButton = ({destination, label, icon} : NavigationButtons) => {
const router = useRouter()

  return (
    <button 
      onClick={() => router.push(destination)}
      className="bg-green-500 text-white p-2 rounded-sm flex items-center gap-2"
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default NavigationButton