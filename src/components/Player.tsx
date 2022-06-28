import type { ReactNode } from 'react';
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from 'phosphor-react';
import { DefaultUi, Player as VideoPlayer, Youtube } from '@vime/react';
import { gql, useQuery } from '@apollo/client';

// Vime Styles
import '@vime/core/themes/default.css';

const GET_LESSON_BY_SLUG_QUERY = gql`
    query GetLessonBySlug($slug: String) {
        lesson(where: { slug: $slug }) {
            title
            videoId
            description
            teacher {
                name
                bio
                avatarURL
            }
        }
    }
`;

interface GetLessonBySlugResponse {
    lesson: {
        title: string;
        videoId: string;
        description: string;
        teacher: {
            name: string;
            bio: string;
            avatarURL: string;
        };
    };
}

interface PlayerProps {
    lessonSlug: string;
}

export default function Player({ lessonSlug }: PlayerProps) {
    const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, { variables: { slug: lessonSlug } });

    return (
        <div className="flex-1">
            <div className="flex justify-center bg-black">
                <div className="aspect-video z-[1] w-full max-w-[1100px] h-full max-h-[60vh]">
                    {data && (
                        <VideoPlayer>
                            <Youtube videoId={data.lesson.videoId} />
                            <DefaultUi />
                        </VideoPlayer>
                    )}
                </div>
            </div>

            <div className="p-8 mx-auto max-w-[1100px]">
                <div className="flex flex-col gap-6 items-start md:flex-row md:gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{data?.lesson.title}</h1>
                        <p className="mt-4 leading-relaxed text-gray-200">{data?.lesson.description}</p>

                        <div className="flex gap-4 justify-center items-center mt-6 min-w-full md:justify-start md:min-w-0">
                            <img
                                className="w-16 h-16 rounded-full border-2 border-blue-500"
                                src={
                                    data
                                        ? data.lesson.teacher.avatarURL
                                        : 'https://avatars.githubusercontent.com/u/50963106?v=4'
                                }
                                alt="Instructor avatar"
                            />
                            <div className="leading-relaxed">
                                <strong className="block text-2xl">{data?.lesson.teacher.name}</strong>
                                <span className="block text-sm text-gray-200">{data?.lesson.teacher.bio}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 min-w-full md:mt-0 md:min-w-0">
                        <a
                            href="http://localhost.com:3000"
                            className="flex gap-2 justify-center items-center p-4 text-sm font-bold uppercase bg-green-500 hover:bg-green-700 rounded transition-colors"
                        >
                            <DiscordLogo size={24} />
                            Discord community
                        </a>
                        <a
                            href="http://localhost.com:3000"
                            className="flex gap-2 justify-center items-center p-4 text-sm font-bold text-blue-500 hover:text-gray-900 uppercase hover:bg-blue-500 rounded border border-blue-500 transition-colors"
                        >
                            <Lightning size={24} />
                            Access the challenge
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-20 xl:grid-cols-2">
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
        className="flex overflow-hidden gap-6 items-center bg-gray-700 hover:bg-gray-600 rounded transition-colors"
    >
        <div className="flex items-center p-6 h-full bg-green-600">{icon}</div>
        <div className="py-6 leading-relaxed">
            <strong className="text-2xl">{title}</strong>
            <p className="mt-2 text-sm text-gray-200">{description}</p>
        </div>
        <div className="flex items-center p-6 h-full">
            <CaretRight size={24} />
        </div>
    </a>
);
