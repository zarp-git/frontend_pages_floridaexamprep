/**
 * Iframe PostMessage Handler Utility
 * ===================================
 * Utility for handling cross-origin communication between parent page and GHL iframes.
 * Provides secure message passing with origin validation and height adjustment support.
 */

/**
 * Message interface for iframe communication
 */
export interface IframeMessage {
  type: "height-change" | "ready" | "error"
  payload: any
}

/**
 * PostMessage handler interface
 */
export interface PostMessageHandler {
  setupListener(
    iframeRef: HTMLIFrameElement,
    allowedOrigins: string[],
    onHeightChange: (height: number) => void
  ): () => void

  sendMessage(
    iframeRef: HTMLIFrameElement,
    message: any,
    targetOrigin: string
  ): void
}

/**
 * Validates if the message origin is in the allowed origins list
 * @param origin - The origin of the message
 * @param allowedOrigins - List of allowed origins
 * @returns true if origin is allowed, false otherwise
 */
function isOriginAllowed(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.some((allowed) => {
    // Exact match
    if (origin === allowed) return true
    
    // Wildcard subdomain match (e.g., *.example.com)
    if (allowed.startsWith("*.")) {
      const domain = allowed.slice(2)
      return origin.endsWith(domain)
    }
    
    return false
  })
}

/**
 * Sets up a message listener for iframe communication
 * @param iframeRef - Reference to the iframe element
 * @param allowedOrigins - List of allowed origins for security validation
 * @param onHeightChange - Callback function when height-change message is received
 * @returns Cleanup function to remove the event listener
 */
export function setupListener(
  iframeRef: HTMLIFrameElement,
  allowedOrigins: string[],
  onHeightChange: (height: number) => void
): () => void {
  const handleMessage = (event: MessageEvent) => {
    // Validate origin
    if (!isOriginAllowed(event.origin, allowedOrigins)) {
      console.warn("[IFRAME_POSTMESSAGE] Message from untrusted origin:", event.origin)
      return
    }

    // Parse message
    let message: IframeMessage
    try {
      // Handle both object and string messages
      message = typeof event.data === "string" ? JSON.parse(event.data) : event.data
    } catch (error) {
      console.warn("[IFRAME_POSTMESSAGE] Failed to parse message:", error)
      return
    }

    // Validate message structure
    if (!message || typeof message !== "object" || !message.type) {
      console.warn("[IFRAME_POSTMESSAGE] Invalid message structure:", message)
      return
    }

    // Handle different message types
    switch (message.type) {
      case "height-change":
        handleHeightChange(message, onHeightChange)
        break
      
      case "ready":
        console.log("[IFRAME_POSTMESSAGE] Iframe ready")
        break
      
      case "error":
        console.error("[IFRAME_POSTMESSAGE] Iframe error:", message.payload)
        break
      
      default:
        console.warn("[IFRAME_POSTMESSAGE] Unknown message type:", message.type)
    }
  }

  // Add event listener
  window.addEventListener("message", handleMessage)

  // Return cleanup function
  return () => {
    window.removeEventListener("message", handleMessage)
  }
}

/**
 * Handles height-change messages
 * @param message - The iframe message
 * @param onHeightChange - Callback function to update height
 */
function handleHeightChange(
  message: IframeMessage,
  onHeightChange: (height: number) => void
): void {
  const { payload } = message

  // Extract height from payload
  let height: number | undefined

  if (typeof payload === "number") {
    height = payload
  } else if (payload && typeof payload === "object") {
    height = payload.height || payload.value
  }

  // Validate height value
  if (typeof height !== "number" || height <= 0 || !isFinite(height)) {
    console.warn("[IFRAME_POSTMESSAGE] Invalid height value:", height)
    return
  }

  // Call the callback with validated height
  onHeightChange(height)
}

/**
 * Sends a message to the iframe
 * @param iframeRef - Reference to the iframe element
 * @param message - Message to send
 * @param targetOrigin - Target origin for security (use specific origin, not "*")
 */
export function sendMessage(
  iframeRef: HTMLIFrameElement,
  message: any,
  targetOrigin: string
): void {
  if (!iframeRef.contentWindow) {
    console.error("[IFRAME_POSTMESSAGE] Iframe contentWindow not available")
    return
  }

  if (targetOrigin === "*") {
    console.warn("[IFRAME_POSTMESSAGE] Using wildcard targetOrigin is not recommended for security")
  }

  try {
    const messageData = typeof message === "string" ? message : JSON.stringify(message)
    iframeRef.contentWindow.postMessage(messageData, targetOrigin)
  } catch (error) {
    console.error("[IFRAME_POSTMESSAGE] Failed to send message:", error)
  }
}

/**
 * Default export with all functions
 */
export default {
  setupListener,
  sendMessage,
}
