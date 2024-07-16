'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // New closeMenu function
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Updated onRent function to include closeMenu
  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      rentModal.onOpen();
    }
    closeMenu(); // Close menu after action
  }, [currentUser, loginModal, rentModal, closeMenu]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Book Your Space
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push('/trips');
                    closeMenu(); // Close menu after action
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push('/favorites');
                    closeMenu(); // Close menu after action
                  }}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => {
                    router.push('/reservations');
                    closeMenu(); // Close menu after action
                  }}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => {
                    router.push('/properties');
                    closeMenu(); // Close menu after action
                  }}
                  label="My properties"
                />
                <MenuItem
                  onClick={() => {
                    rentModal.onOpen();
                    closeMenu(); // Close menu after action
                  }}
                  label="Book your space"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                    closeMenu(); // Close menu after action
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                    closeMenu(); // Close menu after action
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                    closeMenu(); // Close menu after action
                  }}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
