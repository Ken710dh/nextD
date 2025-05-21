import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <div>Hello</div>
      <Link href="/users">Users</Link>
      <Link href="/new">New</Link>
    </main>
  )
}
