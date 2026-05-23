// app/post/[id]/FormattedDate.tsx
'use client';

import { CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function FormattedDate({ date }: { date: Date }) {
  const [formattedDate, setFormattedDate] = useState('');
  
  useEffect(() => {
    // Only format on client after hydration
    setFormattedDate(
      date.toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      })
    );
  }, [date]);
  
  // Show nothing during SSR to avoid mismatch
  if (!formattedDate) return <CardTitle className='text-sm font-thin'>Loading...</CardTitle>;
  
  return <CardTitle className='text-sm font-thin'>{formattedDate}</CardTitle>;
}