'use client';
<<<<<<< HEAD
=======

>>>>>>> c55ff121aaa144fbde07635f87a975c80a95c148
import Container from '../Container';
import Logo from './Logo';
import Search from './Search'
import UserMenu from './UserMenu'
import {SafeUser} from '@/app/types'

import { SafeUser } from '@/app/types';


interface NavbarProps{
    currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
           
            <div className="
            py-4
            border-b-[1px]
            ">
                 <Container>
                    <div
                        className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        
                     "
                    >
               
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser}/>
                    </div>
                 </Container>
           </div>
        </div>
    )
}

export default Navbar;
