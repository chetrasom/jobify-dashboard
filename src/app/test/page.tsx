import db from "@/lib/db";
import { data } from "@/utils/data";

const TestPage = async () => {
    const profile = await db.testProfile.create({
        data: {
            name: 'random name'
        }
    });

    const users = await db.testProfile.findMany();

    return (
        <div>
            <h1 className="text-3xl font-bold">TestPage</h1>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TestPage