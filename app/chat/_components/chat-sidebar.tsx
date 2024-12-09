import { PlusIcon, UserIcon } from 'lucide-react'

export default function ChatSidebar() {
  const chats = [
    { id: '1', title: 'Привет как дела' },
    { id: '2', title: 'Meaning of asdf' },
    { id: '3', title: 'Relax Etymology Explained' },
    { id: '4', title: 'Ansible vs Jenkins Сравнение' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="text-lg font-medium">Chats</div>
        <button className="p-2 hover:bg-gray-100 rounded">
          <PlusIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 text-sm text-gray-500 font-semibold">
          Today
        </div>
        <button className="w-full text-left px-4 py-3 hover:bg-gray-100 focus:bg-gray-200">
          Привет как дела
        </button>

        <div className="px-4 py-2 text-sm text-gray-500 font-semibold">
          Previous 7 Days
        </div>
        {chats.slice(1,3).map((chat) => (
          <button
            key={chat.id}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 focus:bg-gray-200"
          >
            {chat.title}
          </button>
        ))}

        <div className="px-4 py-2 text-sm text-gray-500 font-semibold">
          Previous 30 Days
        </div>
        {chats.slice(3).map((chat) => (
          <button
            key={chat.id}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 focus:bg-gray-200"
          >
            {chat.title}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center gap-2">
        <UserIcon className="h-6 w-6 text-gray-600" />
        <span className="text-sm text-gray-700">My Account</span>
      </div>
    </aside>
  )
}
