'use client'
export default function NewCards(){
  return (
    <div>
      <button onClick={() => alert('Add to card')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add to card 
      </button>
    </div>
  )
}