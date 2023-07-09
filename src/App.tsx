import Editor from './components/Editor'

export function App() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className="bg-zinc-800 w-[1100px] mx-auto rounded-xl min-h-[720px] shadow-sm border border-black/20 overflow-hidden grid grid-cols-[16rem_1fr]">
        <aside className="bg-zinc-900 p-4">
          <div className="flex gap-2 group">
            <button className="w-3 h-3 rounded-full bg-red-400" />
            <button className="w-3 h-3 rounded-full bg-yellow-400" />
            <button className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        </aside>

        <main className="p-4">
          <Editor />
        </main>
      </div>
    </div>
  )
}
