import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href: string;
}

export function BackButton({ href }: BackButtonProps) {
  return (
    <a href={href} className="inline-flex items-center text-white/60 hover:text-white mb-12">
      <ArrowLeft size={20} className="mr-2" />
      Back to home
    </a>
  );
}