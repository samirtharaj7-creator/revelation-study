"use client";

import { Moon, Sun } from "lucide-react";
import { useThemePreference } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useThemePreference();
  const dark = mounted ? theme === "dark" : false;
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
