import type { LessonProps as Lesson } from '@/components/Lesson';
import Header from '@/components/Header';
import Player from '@/components/Player';
import Sidebar from '@/components/Sidebar';
import { gql, useQuery } from '@apollo/client';

const GET_LESSONS_QUERY = gql`
    query {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
            id
            title
            slug
            description
            videoId
            availableAt
            lessonType

            teacher {
                name
                bio
            }
        }
    }
`;

export default function Event() {
    const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);
    console.log(data?.lessons);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1">
                <Player />
                <Sidebar lessons={data?.lessons} />
            </main>
        </div>
    );
}
