import {
  CalendarIcon,
  BuildingStorefrontIcon,
  BuildingOfficeIcon,
  HomeIcon,
  UsersIcon,
  ArrowLeftCircleIcon

} from '@heroicons/react/24/outline'

import { Link } from 'react-router-dom';
import logo from "@/assets/img/logo-blanc.svg"

const navigation = [
  { name: 'Dashboard', to: '/admin', icon: HomeIcon, current: true },
  { name: 'Utilisateurs', to: '/admin/users', icon: UsersIcon, current: false },
  { name: 'Restaurants', to: '/admin/restaurants', icon: BuildingStorefrontIcon, current: false },
  { name: 'Associations', to: '/admin/associations', icon: BuildingOfficeIcon, current: false },
  { name: 'Calendrier', to: '/admin/restaurantreservation', icon: CalendarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-y-5 overflow-y-auto bg-[#3c7460] px-6 w-[200px]">
      <div className="flex h-16 shrink-0 items-center">
        <img
          alt="La Petite Lili"
          src={logo}
          className="h-16 w-auto mt-6" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link to={item.to}
                    className={classNames(
                      item.current ? 'text-white hover:bg-[#2a5245]  hover:text-white' : 'text-white hover:bg-[#2a5245] hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm/6',
                    )}
                  >
                    <item.icon aria-hidden="true" className="size-6 shrink-0" />
                    {item.name}

                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>

          </li>
          <li className="-mx-6 mt-auto">
            <Link to="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm/6 text-white"
            >
              <span className="sr-only">Your profile</span>

            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto mb-5"> {/* Adjusted the margin-bottom to control the position */}
        <Link to="/" className="text-white flex items-center gap-x-3 p-2 rounded-md hover:bg-[#2a5245]">
          <ArrowLeftCircleIcon className="h-6 w-6" aria-hidden="true" />
          Retour
        </Link>
      </div>
    </div>
  )
}