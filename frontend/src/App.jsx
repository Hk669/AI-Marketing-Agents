import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { ScrollArea } from "./components/ui/scroll-area";
import { Spinner } from "./components/ui/spinner"; // Assuming you have a spinner component

const ChatMessage = ({ message }) => {
  const { role, name, content } = message;
  const isUser = role === "user" && name === "user_proxy";

  const getMessageStyle = () => {
    if (isUser) return "bg-blue-200 text-blue-800 ml-auto";
    if (role === "analyst")
      return "bg-green-200 text-green-800 border-l-4 border-green-500";
    if (role === "email_agent")
      return "bg-yellow-200 text-yellow-800 border-l-4 border-yellow-500";
    if (role === "data_retriever")
      return "bg-purple-200 text-purple-800 border-l-4 border-purple-500";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`p-4 rounded-lg max-w-[70%] shadow-sm ${getMessageStyle()}`}
      >
        {!isUser && (
          <div className="font-semibold text-sm text-gray-600 mb-1">
            <span
              className={`capitalize ${
                role === "email_agent" ? "text-yellow-600" : ""
              }`}
            >
              {name}
            </span>
          </div>
        )}
        <div className="text-base leading-relaxed">{content}</div>
      </div>
    </div>
  );
};

const ChatWindow = ({ messages }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <ScrollArea ref={scrollRef} className="h-[calc(100vh-180px)] pr-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </ScrollArea>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:8000/chat");
        const data = await response.json();
        const formattedMessages = data.last_messages.map((msg) => ({
          role: msg.role,
          name: msg.name || "unknown",
          content: msg.content || "",
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        role: "user",
        name: "user_proxy",
        content: newMessage.trim(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");
      setLoading(true); // Set loading to true when sending the message

      fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage.trim() }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const responseMessages = data.last_messages.map((msg) => ({
            role: msg.role,
            name: msg.name || "unknown",
            content: msg.content || "",
          }));
          setMessages((prevMessages) => [...prevMessages, ...responseMessages]);
          setLoading(false); // Set loading to false once the messages are updated
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          setLoading(false); // Ensure loading is false in case of error
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Marketing AI Agents
          </h1>
          <div className="bg-gray-50 rounded-lg p-4 mb-4 shadow-inner border border-gray-200">
            <ChatWindow messages={messages} />
            {loading && (
              <div className="flex items-center justify-center mt-4">
                <Spinner /> {/* Loading spinner component */}
                <span className="ml-2 text-gray-500">Sending...</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-grow p-3 text-lg border border-gray-300 rounded-md focus:ring focus:ring-gray-200 focus:outline-none"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md transition duration-200 flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
