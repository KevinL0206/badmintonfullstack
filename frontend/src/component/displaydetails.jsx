/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LlVUrSa3zf7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"

export default function Component() {
    return (
        <div className="flex flex-col h-screen">
        <header className="flex h-16 items-center border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <div className="flex items-center gap-2">
            <Package2Icon className="h-6 w-6" />
            <span className="text-lg font-semibold">Club Management System</span>
            </div>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
            </Button>
        </header>
        <div className="flex flex-1">
            <main className="flex flex-1 flex-col gap-4 p-6 md:gap-8 md:p-10">
            <div className="flex items-center gap-4">
                <Input className="w-full md:w-1/2 lg:w-1/3" placeholder="Search sessions..." type="search" />
                <Button className="ml-auto">Search</Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                <Card>
                    <CardHeader>
                    <CardTitle>Session 1</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: January 1, 2024</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time: 10:00 AM - 12:00 PM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location: Clubhouse</p>
                    </CardContent>
                </Card>
                </div>
                <div>
                <Card>
                    <CardHeader>
                    <CardTitle>Session 2</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: January 2, 2024</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time: 10:00 AM - 12:00 PM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location: Clubhouse</p>
                    </CardContent>
                </Card>
                </div>
                <div>
                <Card>
                    <CardHeader>
                    <CardTitle>Session 3</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: January 3, 2024</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time: 10:00 AM - 12:00 PM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location: Clubhouse</p>
                    </CardContent>
                </Card>
                </div>
                <div>
                <Card>
                    <CardHeader>
                    <CardTitle>Session 4</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: January 4, 2024</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time: 10:00 AM - 12:00 PM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location: Clubhouse</p>
                    </CardContent>
                </Card>
                </div>
            </div>
            </main>
            <aside className="w-80 border-l bg-gray-100/40 p-6 md:p-10 dark:bg-gray-800/40">
            <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2">
                <ChevronRightIcon className="h-4 w-4" />
                <span className="text-lg font-semibold">Players</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                    <Card>
                        <CardHeader>
                        <CardTitle>Player 1</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Age: 18</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position: Forward</p>
                        </CardContent>
                    </Card>
                    </div>
                    <div>
                    <Card>
                        <CardHeader>
                        <CardTitle>Player 2</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Age: 20</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position: Defender</p>
                        </CardContent>
                    </Card>
                    </div>
                    <div>
                    <Card>
                        <CardHeader>
                        <CardTitle>Player 3</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Age: 22</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position: Goalkeeper</p>
                        </CardContent>
                    </Card>
                    </div>
                    <div>
                    <Card>
                        <CardHeader>
                        <CardTitle>Player 4</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Age: 19</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position: Midfielder</p>
                        </CardContent>
                    </Card>
                    </div>
                </div>
                </CollapsibleContent>
            </Collapsible>
            </aside>
        </div>
        </div>
    )
    }

    function BellIcon(props) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
    }


    function ChevronRightIcon(props) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="m9 18 6-6-6-6" />
        </svg>
    )
    }


    function Package2Icon(props) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
        </svg>
    )
    }
