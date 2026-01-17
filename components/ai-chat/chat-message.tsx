interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isAssistant
            ? "bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}
