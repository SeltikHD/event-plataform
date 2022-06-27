import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';

export interface LessonProps {
    id: string;
    title: string;
    slug: string;
    description: string;
    videoId: string;
    availableAt: string;
    lessonType: 'live' | 'class';
}

export default function Lesson({ title, availableAt, lessonType }: LessonProps) {
    const availableDate = new Date(availableAt);
    const availableLesson = isPast(availableDate);
    const formattedDate = format(availableDate, `EEEE' • 'd' de 'MMMM' • 'k'h'mm`);

    return (
        <a href="https://github.com/">
            <span className="text-gray-300">{formattedDate}</span>

            <div className="p-4 mt-2 rounded border border-gray-500">
                <header className="flex justify-between items-center">
                    {availableLesson ? (
                        <span className="flex gap-2 items-center text-sm font-medium text-blue-500">
                            <CheckCircle size={20} />
                            Released content
                        </span>
                    ) : (
                        <span className="flex gap-2 items-center text-sm font-medium text-orange-500">
                            <Lock size={20} />
                            Coming soon
                        </span>
                    )}

                    <span className="py-[2px] px-2 text-xs font-bold text-white rounded border border-green-300">
                        {lessonType === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className="block mt-5 text-gray-200">{title}</strong>
            </div>
        </a>
    );
}
