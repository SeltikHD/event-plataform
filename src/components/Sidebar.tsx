import Lesson, { type LessonProps } from '@/components/Lesson';

export default function Sidebar({ lessons }: { lessons?: LessonProps[] }) {
    return (
        <aside className="p-6 w-[348px] bg-gray-700 border-l border-gray-600">
            <span className="block pb-6 text-2xl font-bold border-b border-gray-500">Cronograma de aulas</span>
            <div className="flex flex-col gap-8 mt-6">
                {lessons?.map(lesson => (
                    <Lesson {...lesson} key={lesson.id} />
                ))}
            </div>
        </aside>
    );
}
