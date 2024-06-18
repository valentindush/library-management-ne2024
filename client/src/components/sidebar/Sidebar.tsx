import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, Modal, Text, Group, Button } from '@mantine/core';
import {
  IconHome2,
  IconLogout,
  IconUsersGroup,
  IconDevicesPc
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './styles.module.css';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '../../utils/providers/authProvider';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  to?: string
  color?: string
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick, to = "#", color = "text-white" }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={to}>
        <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
          <Icon style={{ width: rem(20), height: rem(20) }} className={`${!active ? color : ""}`} stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconUsersGroup, label: 'Employees', to: "/employees" },
  { icon: IconDevicesPc, label: 'Laptops', to: "/laptops" },
];

export default function CustomSidebar() {
  const [active, setActive] = useState(0);
  const [opened, { open, close }] = useDisclosure()

  const {logout} = useAuth()

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <MantineLogo type="mark" inverted size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink onClick={open} icon={IconLogout} label="Logout" />
      </Stack>

      <Modal opened={opened} onClose={close} title='Logout' size={"sm"} centered>
        <p className='text-lg text-gray-800'>Are you sure you want to logout ?</p>
        <div className="flex items-center gap-4 mt-6">
          <Button onClick={close} variant='outline'>Cancel</Button>
          <Button variant='filled' onClick={logout} color='red'>Logout</Button>
        </div>
      </Modal>
    </nav>
  );
}