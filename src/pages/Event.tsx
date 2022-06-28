import type { LessonProps as Lesson } from '@/components/Lesson';
import Header from '@/components/Header';
import Player from '@/components/Player';
import Sidebar from '@/components/Sidebar';
import { gql, useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';

const GET_LESSONS_QUERY = gql`
    query {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
            title
            slug
            availableAt
            lessonType
        }
    }
`;

export default function Event() {
    const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);
    const { slug } = useParams<{ slug: string }>();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 mt-[4.7rem] lg:mt-0">
                <Sidebar lessons={data?.lessons} />
                {slug ? (
                    <Player lessonSlug={slug} />
                ) : (
                    <div className="flex-1">
                        {data?.lessons[0] ? (
                            <Navigate to={`/event/lesson/${data?.lessons[0].slug}`} />
                        ) : (
                            <div className="flex-1" />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
