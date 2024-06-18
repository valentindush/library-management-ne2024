import { Button, Menu } from "@mantine/core";
import { useAuth } from "../utils/providers/authProvider";
import { IconUser } from "@tabler/icons-react";

export default function Header() {

    const { user } = useAuth()

    return (
        <header className="flex justify-between p-4 shadow">
            <div className="flex items-center gap-2">
                 <div className="flex items-center justify-center">
                    <img className='w-12' src="/logo.png" alt="" />
                </div>
                <h2 className="font-bold text-2xl text-gray-700">RCA LMS</h2>
            </div>
            <div className="flex items-center gap-24">
                
                <div className="flex items-center gap-4">
                    <div className="text-gray-600 font-medium">{user?.firstName} {user?.lastName}</div>
                    <Menu>
                        <Menu.Target>
                            <Button className="rounded-full" variant="default">
                                <IconUser size={24} />
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <p className="font-medium text-lg">{user?.firstName} {user?.lastName}</p>
                            </Menu.Item>
                            <Menu.Item>
                                <p>{user?.studentId}</p>
                            </Menu.Item>
                            <Menu.Item>
                                <p>{user?.email}</p>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </div>
        </header>
    )
}