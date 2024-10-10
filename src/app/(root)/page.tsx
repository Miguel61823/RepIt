"use client"
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  const buttonClick = () => {
    router.push('/login');
  }
  return (
    <div className="text-right text-red-500">
      <button onClick={buttonClick}>Landing/Marketing </button>
    </div>
  );
}
