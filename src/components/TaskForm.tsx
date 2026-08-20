import { useState } from 'react'
import type { FormEvent } from 'react'

interface TaskFormProps {
  onAdd: (text: string) => void
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="新しいタスクを入力"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="task-add-button">
        追加
      </button>
    </form>
  )
}

export default TaskForm
