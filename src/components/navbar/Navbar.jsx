import React, { useState } from "react";
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSubMenus, setOpenSubMenus] = useState({});
  const { isSignedIn, user } = useUser();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = `https://synnex.lk/?s=${encodeURIComponent(
      searchQuery
    )}&post_type=product`;
  };

  const toggleSubMenu = (title) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Base menu items
  const baseMenuItems = [
    {
      title: "POS Solution",
      link: "#",
      subMenu: [
        { title: "POS Terminals", link: "#" },
        { title: "Cash Register", link: "#" },
        { title: "POS Printers", link: "#" },
        { title: "Mobile Printers", link: "#" },
        { title: "Cash Drawer", link: "#" },
        { title: "Cash Counting Machine", link: "#" },
        { title: "POS Software Solution", link: "#" },
      ],
    },
    {
      title: "Barcode Solution",
      link: "#",
      subMenu: [
        {
          title: "Barcode Scanners",
          link: "#",
          subMenu: [
            { title: "Desktop Barcode Scanner", link: "#" },
            { title: "Handheld Barcode Scanner", link: "#" },
            { title: "Wireless Barcode Scanners", link: "#" },
          ],
        },
        {
          title: "Barcode Label Printers",
          link: "#",
          subMenu: [
            { title: "Barcode Label Printers", link: "#" },
            { title: "Industrial Label Printers", link: "#" },
          ],
        },
      ],
    },
    {
      title: "PC & Printer Solution",
      link: "#",
      subMenu: [
        { title: "All in one PC", link: "#" },
        { title: "Monitor", link: "#" },
        {
          title: "Gaming Solution",
          link: "#",
          subMenu: [
            { title: "Graphics Card", link: "#" },
            { title: "Power Supply", link: "#" },
            { title: "Keyboard and Mouse", link: "#" },
          ],
        },
        {
          title: "Printers Solution",
          link: "#",
          subMenu: [
            { title: "A4 Printers", link: "#" },
            { title: "Card Printer", link: "#" },
          ],
        },
      ],
    },
    { title: "Services", link: "/services" },
    { title: "Support", link: "/support" },
  ];

  // Add Admin link if user role is admin
  if (isSignedIn && user?.publicMetadata?.role === "admin") {
    baseMenuItems.push({
      title: "Admin",
      link: "/admin",
      icon: <MdAdminPanelSettings className="inline-block mb-1 mr-1" />,
    });
  }

  const renderMenu = (items, nested = false, isMobile = false) => (
    <ul
      className={`${
        nested
          ? "pl-4 md:pl-0 md:absolute md:shadow-lg md:bg-white md:rounded-xl md:top-full md:left-0 md:min-w-[220px] space-y-1"
          : "flex gap-6 flex-col md:flex-row"
      }`}
    >
      {items.map((item, idx) => (
        <li key={idx} className="relative">
          <div className="flex justify-between items-center md:block">
            <Link
              to={item.link}
              className="block py-3 md:py-2 text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium whitespace-nowrap"
              onClick={(e) => {
                if (mobileMenuOpen && item.subMenu) {
                  e.preventDefault();
                  toggleSubMenu(item.title);
                }
              }}
            >
              {/* Show icon only in mobile version */}
              {isMobile && item.icon && <span className="inline-block mr-2">{item.icon}</span>}
              {item.title}
            </Link>
            {item.subMenu && mobileMenuOpen && (
              <button
                onClick={() => toggleSubMenu(item.title)}
                className="md:hidden text-gray-500 hover:text-red-500 px-2"
              >
                {openSubMenus[item.title] ? "-" : "+"}
              </button>
            )}
          </div>

          {item.subMenu && (
            <div
              className={`${
                mobileMenuOpen
                  ? openSubMenus[item.title]
                    ? "block pl-4 space-y-1"
                    : "hidden"
                  : "hidden md:group-hover:block mt-1 z-50"
              }`}
            >
              {renderMenu(item.subMenu, true, isMobile)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-6 lg:px-20 h-20">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LogicForge <span className="text-gray-800">IT Solutions</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {renderMenu(baseMenuItems)}
        </div>

        {/* Search & Icons */}
        <div className="flex items-center gap-4 text-gray-600 text-md md:ml-4">
          {/* Search */}
          <form
            className="hidden md:flex ml-6 flex border rounded-full overflow-hidden shadow-sm"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="search"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 outline-none w-64 text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-red-500 px-4 py-2 text-white flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
            >
              <FaSearch />
            </button>
          </form>

          {/* User */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link to="/signin">
              <FaUser className="cursor-pointer hover:text-blue-600 transition-colors duration-300" />
            </Link>
          )}

          {/* Cart */}
          <div className="relative cursor-pointer hover:text-blue-600 transition-colors duration-300">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              0
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-4 text-2xl"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">
          {/* Mobile Search */}
          <form
            className="flex border rounded-full overflow-hidden mb-4"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="search"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 outline-none w-full text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-red-500 px-4 py-2 text-white flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
            >
              <FaSearch />
            </button>
          </form>

          {renderMenu(baseMenuItems)}
        </div>
      )}
    </nav>
  );
}

export default Navbar;