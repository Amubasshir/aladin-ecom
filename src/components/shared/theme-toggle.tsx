'use client';

import { useTheme } from 'next-themes';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full relative group"
        >
          {/* Sun Icon */}
          <BsSunFill
            className={`absolute h-[1.4rem] w-[1.4rem] text-yellow-500 transition-transform duration-300 ease-in-out
        ${
          theme === 'dark'
            ? 'scale-0 rotate-180'
            : 'group-hover:scale-125 group-hover:rotate-180'
        }`}
          />
          {/* Moon Icon */}
          <BsMoonStarsFill
            className={`absolute h-[1.4rem] w-[1.4rem] text-blue-500 transition-transform duration-300 ease-in-out
        ${
          theme === 'dark'
            ? 'group-hover:scale-125 group-hover:rotate-260'
            : 'scale-0 rotate-180'
        }`}
          />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
