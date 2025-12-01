"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { COLORS, DURATIONS } from "@/lib/constants"

type LogType = 'info' | 'success' | 'error' | 'image' | 'json'

interface LogEntry {
  id: string
  type: LogType
  content: string | object
}

/**
 * SECTION: API Terminal
 * Interactive terminal-styled form for API login demonstration
 */
export const ApiTerminal: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'init-1', type: 'info', content: "> System Ready..." },
    { id: 'init-2', type: 'info', content: "> Waiting for user credentials..." }
  ])
  
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  const addLog = useCallback((content: string | object, type: LogType = 'info') => {
    setLogs((prev) => [
      ...prev, 
      { 
        id: Math.random().toString(36).substr(2, 9), 
        type, 
        content 
      }
    ])
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (success) {
        setSuccess(false);
        setLogs([{ id: 'reset', type: 'info', content: "> Session reset. Ready." }]);
        setFormData({ username: "", password: "" });
        return;
    }

    if (!formData.username || !formData.password) {
      addLog("ERROR: Username and Password required.", 'error')
      return
    }

    setLoading(true)
    addLog("Initiating connection to https://dummyjson.com...", 'info')
    addLog(`POST /auth/login payload: { username: "${formData.username}" }`, 'info')

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username, // emilys
          password: formData.password, // emilyspass
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true)
        addLog("STATUS: 200 OK", 'success')
        addLog("ACCESS GRANTED. Token received.", 'success')

        addLog(data, 'json')

        if (data.image) {
            addLog("Rendering user avatar...", 'info')
            addLog(data.image, 'image')
        }

        addLog(`Welcome back, ${data.firstName} ${data.lastName}.`, 'success')
      } else {
        addLog(`STATUS: ${response.status} UNAUTHORIZED`, 'error')
        addLog(data.message || "Login failed", 'error')
      }

    } catch (error) {
      addLog("NETWORK ERROR: Connection failed.", 'error')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const renderLogContent = (log: LogEntry) => {
    switch (log.type) {
        case 'json':
            return (
                <pre className="mt-2 mb-2 p-3 bg-gray-900 rounded text-xs text-green-400 overflow-x-auto border border-gray-800">
                    {JSON.stringify(log.content, null, 2)}
                </pre>
            )
        case 'image':
            return (
                <div className="mt-2 mb-2">
                    <img 
                        src={log.content as string} 
                        alt="User Avatar" 
                        className="w-24 h-24 rounded border-2 border-green-500 object-cover" 
                    />
                </div>
            )
        case 'error':
            return <span style={{ color: "#ef4444" }}>{log.content as string}</span>
        case 'success':
            return <span style={{ color: "#4ade80" }}>{log.content as string}</span>
        default:
            return <span style={{ color: "#9ca3af" }}>{log.content as string}</span>
    }
  }

  return (
    <section
      className="min-h-screen py-32 px-6 md:px-20 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: COLORS.dark || '#000' }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2">API CHALLENGE</h2>
          <p className="text-gray-400 font-mono">Endurance Test Level 3: Real Data Fetching</p>
        </div>

        {/* Terminal Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-2xl border"
          style={{
            backgroundColor: "#050505",
            borderColor: COLORS.gray?.[800] || '#333',
          }}
        >
          {/* Form Side */}
          <div className="p-10 border-r flex flex-col justify-center" style={{ borderColor: COLORS.gray?.[800] || '#333' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <label
                  className="font-mono text-xs uppercase tracking-widest mb-2 block"
                  style={{ color: COLORS.accent || '#3b82f6' }}
                >
                  Username
                </label>
                <input
                  type="text"
                  className="w-full p-4 text-white focus:outline-none transition-colors font-mono rounded"
                  placeholder="username (e.g. emilys)"
                  disabled={loading || success}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  style={{
                    backgroundColor: "#111",
                    borderWidth: "1px",
                    borderColor: COLORS.gray?.[700] || '#444',
                  }}
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="font-mono text-xs uppercase tracking-widest mb-2 block"
                  style={{ color: COLORS.accent || '#3b82f6' }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full p-4 text-white focus:outline-none transition-colors font-mono rounded"
                  placeholder="••••••• (e.g. emilyspass)"
                  disabled={loading || success}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    backgroundColor: "#111",
                    borderWidth: "1px",
                    borderColor: COLORS.gray?.[700] || '#444',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                className="w-full py-4 font-bold uppercase tracking-wider transition-all duration-300 rounded"
                style={{
                  backgroundColor: success ? "#16a34a" : (COLORS.accent || '#3b82f6'),
                  color: success ? (COLORS.black || '#000') : (COLORS.white || '#fff'),
                  opacity: loading ? 0.7 : 1,
                  cursor: success ? 'default' : 'pointer'
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                    Transmitting...
                  </>
                ) : success ? (
                  "Connection Established"
                ) : (
                  "Execute Login"
                )}
              </button>
              
              {success && (
                <p className="text-xs text-center text-gray-500 font-mono mt-2">
                    *Refresh or click again to reset session
                </p>
              )}
            </form>
          </div>

          {/* Terminal Side */}
          <div
            className="bg-black p-6 font-mono text-xs md:text-sm overflow-y-auto h-[500px] flex flex-col"
            style={{ backgroundColor: COLORS.black || '#000' }}
          >
            {/* Terminal Buttons */}
            <div className="flex gap-2 mb-4 sticky top-0 bg-black pt-2 pb-2 z-10 w-full">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            {/* Logs */}
            <div className="flex-1 space-y-1">
              {logs.map((log) => (
                <div key={log.id} className="break-all">
                  {renderLogContent(log)}
                </div>
              ))}
              
              {/* Dummy element for auto scroll */}
              <div ref={terminalEndRef} />

              {loading && (
                <div className="animate-pulse" style={{ color: COLORS.accent || '#3b82f6' }}>
                  _
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}