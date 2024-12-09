import { UserIcon } from 'lucide-react'

export default function AccountButton() {
  return (
    <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
      <UserIcon className="h-5 w-5 text-gray-600" />
      <span className="text-sm text-gray-700">My Account</span>
    </button>
  )
}
