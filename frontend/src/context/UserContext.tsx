import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userId: number | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  refreshUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<number | null>(null);

  const refreshUser = async () => {
    try {
      const res = await fetch('https://localhost:7023/api/Auth/pingauth', {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUserId(data.mlUserId);
      } else {
        setUserId(null); // 👈 Reset if not authorized
      }
    } catch (err) {
      console.error('Failed to refresh user ID', err);
      setUserId(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ userId, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
