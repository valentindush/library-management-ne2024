import { Button, Menu } from "@mantine/core";
import { useAuth } from "../utils/providers/authProvider";
import { IconLogout, IconUser } from "@tabler/icons-react";

export default function Header() {

    const { user } = useAuth()

    return (
        <header className="flex justify-between p-4 shadow">
            <div className="">

            </div>
            <div className="flex items-center gap-24">
                
                <div className="flex items-center gap-4">
                    <div className="text-gray-600 font-medium">{user?.email}</div>
                    <Menu>
                        <Menu.Target>
                            <Button className="w-[40px] h-[40px] rounded-full" variant="default">
                                <IconUser size={24} />
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Button color="red" leftSection={<IconLogout size={14} />} variant="filled">Logout</Button>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </div>
        </header>
    )
}