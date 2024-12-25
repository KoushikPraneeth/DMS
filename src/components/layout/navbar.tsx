import { FileText, LogOut, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Button from '../ui/button';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <FileText className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold">DMS</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}