import { LoaderIcon } from "lucide-react";
import React from "react";

function ChatLoader() {
  return (
    <div className="h-screen flex p-4 flex-col items-center justify-center">
      <LoaderIcon
        size={40}
        className="animate-spin size-10 text-primary mb-4"
      />
      <div className="text-center mt-4 text-lg font-mono">
        Connecting to chat...
      </div>
    </div>
  );
}

export default ChatLoader;
