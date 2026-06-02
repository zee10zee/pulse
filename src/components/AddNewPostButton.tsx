"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const AddNewPostButton = () => {
    const router = useRouter()
  return (
    <div className="NewPostButton">
            <button onClick={() => router.push('/newPost')}
            className="bg-green-500 text-white p-1 rounded-sm flex flex-row" style={{marginLeft : 'auto'}}>
              <Plus /> <span>Add</span>
            </button>
      </div>
  )
}

export default AddNewPostButton