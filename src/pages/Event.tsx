import Header from '@/components/Header';
import Player from '@/components/Player';
import Sidebar from '@/components/Sidebar';
import { Navigate, useParams } from 'react-router-dom';
import { useGetLessonsQuery } from '@/graphql/generated';
import { useEffect } from 'react';

export default function Event() {
    const { data } = useGetLessonsQuery();
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        document.title = 'Event - Contents';
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mt-[4.7rem] flex flex-1 lg:mt-0">
                {data && <Sidebar lessons={data.lessons} />}
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
