import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userId: number | null; // 👈 changed from string to number
  setUserId: (id: number | null) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<number | null>(null); // 👈 also updated to number

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('https://localhost:7023/api/Auth/pingauth', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUserId(data.mlUserId); // 👈 grab ML user ID, not the auth GUID
        }
      } catch (err) {
        console.error('Failed to fetch ML user ID', err);
      }
    };

    fetchUserId();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
