import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
//
export enum ThemeMode {
  Light,
  Dark,
  Orange,
}

export interface ThemeColors {
  bg: string,
  surface: string,
  text: string,
  textMuted: string,
  border: string,
  primary: string,
  success: string,
  danger: string,
  statusBarStyle: ThemeMode,
}

export interface ThemeOptionStyle {
  mainColor: string;
  borderColor: string;
  text: string;
  textMuted: string;
  bg: string;
  success: string;
}

export interface ThemeOption {
  mode: ThemeMode;
  title: string;
  style: ThemeOptionStyle
}

export const themes: ThemeOption[] = [
  {
    mode: ThemeMode.Light,
    title: "Light theme",
    style: {
      mainColor: "#f5f7fb",
      borderColor: "#e2e8f0",
      text: "#1e293b",
      textMuted: "#64748b",
      bg: "#f5f7fb",
      success: "#10b981",
    }
  }, {
    mode: ThemeMode.Dark,
    title: "Dark theme",
     style: {
      mainColor: "#f5f7fb",
      borderColor: "#334155",
      text: "#f1f5f9",
      textMuted: "#94a3b8",
      bg: "#0f172a",
      success: "#34d399",
    }
  },
  {
    mode: ThemeMode.Orange,
    title: "Orange theme",
    style: {
      mainColor: "#fff7ed",
      borderColor: "#f97316",
      text: "#431407",
      textMuted: "#9a3412",
      bg: "#ffedd5",
      success: "#16a34a",
    }
  }
];

export const themeColors: Record<ThemeMode, ThemeColors> = {
  [ThemeMode.Light]: {
    bg: "#f5f7fb",
    surface: "#ffffff",
    text: "#1e293b",
    textMuted: "#64748b",
    border: "#e2e8f0",
    primary: "#6366f1",
    success: "#10b981",
    danger: "#ef4444",
    statusBarStyle: ThemeMode.Light,
  },

  [ThemeMode.Dark]: {
    bg: "#0f172a",
    surface: "#1e293b",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    border: "#334155",
    primary: "#818cf8",
    success: "#34d399",
    danger: "#f87171",
    statusBarStyle: ThemeMode.Dark,
  },

  [ThemeMode.Orange]: {
    bg: "#ffedd5",
    surface: "#fff7ed",
    text: "#431407",
    textMuted: "#9a3412",
    border: "#f97316",
    primary: "#ea580c",
    success: "#16a34a",
    danger: "#dc2626",
    statusBarStyle: ThemeMode.Light,
  },
};


 
interface ThemeContextType {
  themeMode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: (currentThemeMode: ThemeMode) => Promise<void>;
}
 
const STORAGE_KEY = "@todo_theme_mode";

 
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
 
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Light);
 
  // Зчитуємо збережену тему при завантаженні
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTheme !== null) {
          setThemeMode(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error("Помилка завантаження теми з AsyncStorage:", error);
      }
    };
    loadTheme();
  }, []);
 
  const toggleTheme = async (nextThemeMode: ThemeMode) => {
    try {
      setThemeMode(nextThemeMode);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextThemeMode));
    } catch (error) {
      console.error("Theme save error:", error);
    }
  };
 
  const currentColors = themeColors[themeMode];
 
  return (
    <ThemeContext.Provider
      value={{
        themeMode: themeMode,
        colors: currentColors,
        toggleTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
 
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};