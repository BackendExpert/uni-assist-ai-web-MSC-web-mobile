import React, { useState, useRef, useEffect } from "react";
import { Bot, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import API from "../../../services/api";


const ChatAssist = () => {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('access_token')

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "👋 Hello! I'm your Resource AI Assistant. Ask me anything about your uploaded learning resources.",
        },
    ]);

    const messagesEndRef = useRef(null);


    const handleAskQuestion = async (e) => {
        e.preventDefault();

        if (!question.trim() || loading) return;

        const currentQuestion = question;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: currentQuestion,
            },
        ]);

        setQuestion("");
        setLoading(true);

        try {
            const res = await API.post("/resource/ask-question", {
                question: currentQuestion,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        res.data.answer ||
                        res.data.response ||
                        "No response received.",
                },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">


            <div className="border-b border-slate-200 bg-[#2563EB] px-8 py-6">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#2563EB]">
                        <Bot size={24} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Resource AI Assistant
                        </h1>

                        <p className="mt-1 text-sm text-blue-100">
                            Ask questions about your uploaded learning resources.
                        </p>
                    </div>

                </div>

            </div>


            <div className="flex-1 overflow-y-auto bg-slate-50 px-8 py-8">

                <div className="mx-auto flex max-w-5xl flex-col gap-6">

                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >

                            {message.role === "assistant" && (
                                <div className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white">
                                    <Bot size={18} />
                                </div>
                            )}

                            <div
                                className={`max-w-3xl px-6 py-5 text-[15px] leading-7 ${message.role === "user"
                                    ? "rounded-2xl rounded-br-md bg-[#2563EB] text-white"
                                    : "rounded-2xl rounded-tl-md border border-slate-200 bg-white text-slate-700"
                                    }`}
                            >

                                {message.role === "assistant" ? (
                                    <ReactMarkdown
                                        components={{
                                            strong: ({ children }) => (
                                                <strong className="mb-2 mt-4 block text-[15px] font-bold text-slate-900">
                                                    {children}
                                                </strong>
                                            ),

                                            p: ({ children }) => (
                                                <p className="mb-3 whitespace-pre-line leading-7">
                                                    {children}
                                                </p>
                                            ),

                                            ul: ({ children }) => (
                                                <ul className="mb-3 list-disc space-y-2 pl-6">
                                                    {children}
                                                </ul>
                                            ),

                                            li: ({ children }) => (
                                                <li>{children}</li>
                                            ),

                                            h1: ({ children }) => (
                                                <h1 className="mb-3 mt-4 text-xl font-bold">
                                                    {children}
                                                </h1>
                                            ),

                                            h2: ({ children }) => (
                                                <h2 className="mb-2 mt-4 text-lg font-semibold">
                                                    {children}
                                                </h2>
                                            ),

                                            code: ({ children }) => (
                                                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px]">
                                                    {children}
                                                </code>
                                            ),

                                            pre: ({ children }) => (
                                                <pre className="my-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-white">
                                                    {children}
                                                </pre>
                                            ),
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                ) : (
                                    message.content
                                )}

                            </div>

                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">

                            <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-white">
                                <Bot size={18} />
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5">

                                <div className="flex gap-2">

                                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#2563EB]"></span>

                                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:150ms]"></span>

                                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-300 [animation-delay:300ms]"></span>

                                </div>

                            </div>

                        </div>
                    )}

                    <div ref={messagesEndRef} />

                </div>

            </div>


            <form
                onSubmit={handleAskQuestion}
                className="border-t border-slate-200 bg-white px-8 py-6"
            >

                <div className="mx-auto flex max-w-5xl items-center gap-3 rounded-2xl border border-slate-300 bg-white p-3 transition-all duration-200 focus-within:border-[#2563EB]">

                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask anything about your uploaded resources..."
                        className="flex-1 bg-transparent px-3 text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white transition-all duration-200 hover:bg-blue-700 disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>

                </div>

            </form>

        </div>
    );
};

export default ChatAssist;