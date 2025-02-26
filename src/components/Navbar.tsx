import { useState, useEffect, useRef, useCallback } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageScrollable, setIsPageScrollable] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const checkPageHeight = useCallback(() => {
    setIsPageScrollable(document.body.scrollHeight > window.innerHeight);
  }, []);

  const updateNavbarHeight = useCallback(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isPageScrollable) {
      setIsScrolled(window.scrollY > 0);
    }
  }, [isPageScrollable]);

  useEffect(() => {
    checkPageHeight();
    updateNavbarHeight();
    window.addEventListener('resize', checkPageHeight);
    window.addEventListener('resize', updateNavbarHeight);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkPageHeight);
      window.removeEventListener('resize', updateNavbarHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkPageHeight, updateNavbarHeight, handleScroll]);

  return (
    <>
      <div style={{ paddingTop: isScrolled ? navbarHeight : 0 }} />
      <nav
        ref={navbarRef}
        className={`w-full p-4 transition-all duration-300 ${
          isScrolled
            ? 'fixed top-0 left-0 w-full bg-gray-100 dark:bg-gray-800 shadow-md z-50'
            : 'relative bg-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-black dark:text-white">
            My Test Task
          </h1>
          <ThemeToggleButton />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
