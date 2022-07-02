import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

export interface LessonProps {
    title: string;
    slug: string;
    availableAt: string;
    lessonType: 'live' | 'class';
}

export default function Lesson({ title, availableAt, lessonType, slug }: LessonProps) {
    const { slug: lessonSlug } = useParams<{ slug: string }>();

    const availableDate = new Date(availableAt);
    const availableLesson = isPast(availableDate);
    const formattedDate = format(availableDate, `EEEE' • 'd' de 'MMMM' • 'k'h'mm`);

    const isActive = slug === lessonSlug;

    return (
        <Link to={availableLesson ? `/event/lesson/${slug}` : ''} className="group">
            <span className="text-gray-300">{formattedDate}</span>

            <div
                className={classNames('p-4 mt-2 rounded border border-gray-500', {
                    'bg-green-500': isActive,
                    'group-hover:border-white': isActive,
                    'group-hover:border-green-500': !isActive,
                })}
            >
                <header className="flex items-center justify-between">
                    {availableLesson ? (
                        <span
                            className={classNames('flex gap-2 items-center text-sm font-medium', {
                                'text-white': isActive,
                                'text-blue-500': !isActive,
                            })}
                        >
                            <CheckCircle size={20} />
                            Released content
                        </span>
                    ) : (
                        <span className="flex items-center gap-2 text-sm font-medium text-orange-500">
                            <Lock size={20} />
                            Coming soon
                        </span>
                    )}

                    <span
                        className={classNames('py-[2px] px-2 text-xs font-bold text-white rounded border', {
                            'border-white': isActive,
                            'border-green-300': !isActive,
                        })}
                    >
                        {lessonType === 'live' ? 'LIVE' : 'PRACTICAL CLASS'}
                    </span>
                </header>

                <strong className={classNames('block mt-5', { 'text-white': isActive, 'text-gray-200': !isActive })}>
                    {title}
                </strong>
            </div>
        </Link>
    );
}
