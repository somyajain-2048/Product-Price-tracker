import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setSocket(null);
      return;
    }

    // Connect to the backend server
    const socketInstance = io("http://localhost:5000", {
      auth: {
        token,
      },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
      if (err.message && err.message.includes("Authentication error")) {
        socketInstance.disconnect();
        setSocket(null);
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
          window.location.href = "/login";
        }
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

