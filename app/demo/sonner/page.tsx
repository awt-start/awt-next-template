// app/page.tsx
"use client"

import { useToast } from "@/lib/useToast"

export default function HomePage() {
  const { success, error, warning, info, dismiss } = useToast()

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={() => success("🎉 Event created successfully!")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Success
      </button>

      <button
        onClick={() => error("❌ Failed to save data")}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Error
      </button>

      <button
        onClick={() => warning("⚠️ This will delete your data permanently")}
        className="bg-amber-600 text-white px-4 py-2 rounded"
      >
        Warning
      </button>

      <button
        onClick={() => info("ℹ️ You have 5 new notifications")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Info
      </button>

    
      <button
        onClick={() =>
          success("Custom with action!", {
            description: "Click undo to revert.",
            action: {
              label: "Undo",
              onClick: () => alert("Undid!"),
            },
          })
        }
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Custom Action
      </button>

      <button
        onClick={dismiss}
        className="bg-gray-600 text-white px-4 py-2 rounded"
      >
        Dismiss All
      </button>
    </div>
  )
}