import { ReactNode, useEffect } from 'react';
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from 'phosphor-react';
import { DefaultUi, Player as VideoPlayer, Youtube } from '@vime/react';
import { useGetLessonBySlugQuery } from '@/graphql/generated';

// Vime Styles
import '@vime/core/themes/default.css';

interface PlayerProps {
    lessonSlug: string;
}

export default function Player({ lessonSlug }: PlayerProps) {
    const { data } = useGetLessonBySlugQuery({ variables: { slug: lessonSlug } });

    useEffect(() => {
        document.title = data?.lesson?.title ? data.lesson.title : 'Event - Contents';
    }, [data?.lesson?.title]);

    return (
        <div className="flex-1">
            <div className="flex justify-center bg-black">
                <div className="z-[1] aspect-video h-full max-h-[60vh] w-full max-w-[1100px]">
                    {data?.lesson && (
                        <VideoPlayer>
                            <Youtube videoId={data.lesson.videoId} />
                            <DefaultUi />
                        </VideoPlayer>
                    )}
                </div>
            </div>

            <div className="mx-auto max-w-[1100px] p-8">
                <div className="flex flex-col items-start gap-6 md:flex-row md:gap-16">
                    <div className="flex-1">
                        {data?.lesson && (
                            <>
                                <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
                                <p className="mt-4 leading-relaxed text-gray-200">{data.lesson.description}</p>

                                <div className="mt-6 flex min-w-full items-center justify-center gap-4 md:min-w-0 md:justify-start">
                                    {data.lesson.teacher && (
                                        <>
                                            <img
                                                className="h-16 w-16 rounded-full border-2 border-blue-500"
                                                src={data.lesson.teacher.avatarURL}
                                                alt="Instructor avatar"
                                            />
                                            <div className="leading-relaxed">
                                                <strong className="block text-2xl">{data.lesson.teacher.name}</strong>
                                                <span className="block text-sm text-gray-200">
                                                    {data.lesson.teacher.bio}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex min-w-full flex-col gap-4 md:mt-0 md:min-w-0">
                        <a
                            href="https://discord.gg/ybQnP4C4qS"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 rounded bg-green-500 p-4 text-sm font-bold uppercase transition-colors hover:bg-green-700"
                        >
                            <DiscordLogo size={24} />
                            Discord community
                        </a>
                        <a
                            href="https://github.com/Rocketseat"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 rounded border border-blue-500 p-4 text-sm font-bold uppercase text-blue-500 transition-colors hover:bg-blue-500 hover:text-gray-900"
                        >
                            <Lightning size={24} />
                            Access the challenge
                        </a>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-2">
                    <Card
                        title="Complementary material"
                        description="Access supplemental material to accelerate your development"
                        href=""
                        icon={<FileArrowDown size={40} />}
                    />
                    <Card
                        title="Exclusive wallpapers"
                        description="Download exclusive event wallpapers and customize your machine"
                        href=""
                        icon={<Image size={40} />}
                    />
                </div>
            </div>
        </div>
    );
}

interface CardProps {
    title: string;
    description: string;
    href: string;
    icon: ReactNode;
}

const Card = ({ title, description, href, icon }: CardProps) => (
    <a
        href={href}
        className="flex items-center gap-6 overflow-hidden rounded bg-gray-700 transition-colors hover:bg-gray-600"
    >
        <div className="flex h-full items-center bg-green-600 p-6">{icon}</div>
        <div className="py-6 leading-relaxed">
            <strong className="text-2xl">{title}</strong>
            <p className="mt-2 text-sm text-gray-200">{description}</p>
        </div>
        <div className="flex h-full items-center p-6">
            <CaretRight size={24} />
        </div>
    </a>
);
