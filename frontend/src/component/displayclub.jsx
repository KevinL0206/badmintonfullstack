
import Link from "next/link"
import { Button } from "..@/components/ui/button"
import { Input } from "..@/components/ui/input"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"

export default function DisplayClubDetails() {
    return (
        
        <div className="flex flex-1">
            <main className="flex flex-1 flex-col gap-4 p-6 md:gap-8 md:p-10">
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="flex items-center gap-4">
                    <Button className="ml-auto">Create Session</Button>
                </div>
                <Link href="#">
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
                </Link>
                <Link href="#">
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
                </Link>
                <Link href="#">
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
                </Link>
                <Link href="#">
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
                </Link>
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
                    <div className="flex items-center gap-4 mb-4">
                        <Input className="w-full md:w-1/2 lg:w-2/3" placeholder="Add player..." type="text" />
                        <Button>Add Player</Button>
                    </div>
                    <Link href="#">
                    <Card>
                        <CardHeader>
                        <CardTitle>Player 1</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Age: 18</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position: Forward</p>
                        </CardContent>
                    </Card>
                    </Link>
                    <Link href="#">
                    <Card>
                        <CardHeader>
                        <CardTitle>Player 2</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Age: 20</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position: Defender</p>
                        </CardContent>
                    </Card>
                    </Link>
                    <Link href="#">
                    <Card>
                        <CardHeader>
                        <CardTitle>Player 3</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Age: 22</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position: Goalkeeper</p>
                        </CardContent>
                    </Card>
                    </Link>
                    <Link href="#">
                    <Card>
                        <CardHeader>
                        <CardTitle>Player 4</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Age: 19</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position: Midfielder</p>
                        </CardContent>
                    </Card>
                    </Link>
                </div>
                </CollapsibleContent>
            </Collapsible>
            </aside>
        </div>
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

    