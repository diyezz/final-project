import React, { createContext, useContext, useState } from 'react';

type SetTimeoutType = ReturnType <typeof setTimeout>;

interface NotificationContextType {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [activeTimeout, setActiveTimeout] = useState<SetTimeoutType | null>(null);

  const dismissNotification = () => {
    setNotification(null);
    setIsShown(false);
  }

  const showNotification = (message: string) => {
    if (activeTimeout) {
      clearTimeout(activeTimeout);
    }

    setNotification(message);
    setIsShown(true);

    setActiveTimeout(setTimeout(() => {
      dismissNotification();
    }, 3000));
  }
  
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {isShown && notification && (
        <div className='fixed bottom-5 inset-x-2 bg-blue-500 text-white p-4 rounded-lg shadow-lg transition-transform transform translate-y-0'>
          {notification}

          <button onClick={dismissNotification} className='text-white hover:text-gray-200'>Close</button>
        </div>
      )}

    </NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useCart must be used within a NotificationProvider');
  }
  return context
}