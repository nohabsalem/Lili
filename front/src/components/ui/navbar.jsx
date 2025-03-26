import { LogOut } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
}
  from '@headlessui/react'

import { UserIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { getUserById } from "@/api/users";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", lastname: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function logout() {
    localStorage.clear();
    navigate("/");
  }
  useEffect(() => {

  }, []);


  return (
    <Disclosure as="nav" className="bg-[#689f88]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">

            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">

              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full text-sm/6 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />

                  <UserIcon className="h-8 w-8 bg-white rounded-full p-1" />

                  {<span className="ml-2 text-white text-sm flex items-center">
                    {user.name} {user.lastname}
                  </span>
                  }
                </MenuButton>
              </div>

              <MenuItems
                transition
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"              >
                <MenuItem>
                  <Link to="/admin/profil"
                    class="block px-4 py-2 text-sm/6 hover:bg-[#dbdbdb]">
                    Modifier mon profil
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm"
                  >
                    <LogOut className="mr-2 inline" />
                    Déconnexion
                  </button>
                </MenuItem>

              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">


        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
