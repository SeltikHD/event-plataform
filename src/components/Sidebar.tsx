import type { GetLessonsQuery } from '@/graphql/generated';
import { TextAlignJustify, X } from 'phosphor-react';
import { useState } from 'react';
import Lesson from '@/components/Lesson';
import classNames from 'classnames';

export default function Sidebar({ lessons }: GetLessonsQuery) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="fixed top-[1.05rem] right-1 z-20 lg:invisible" onClick={() => setOpen(!open)}>
                {open ? (
                    <X size={36} color="#81D8F7" />
                ) : (
                    <div className="flex items-center">
                        <p className="invisible mr-3 text-lg sm:visible lg:invisible">Classes</p>
                        <TextAlignJustify size={36} color="#81D8F7" />
                    </div>
                )}
            </button>
            <aside
                className={classNames(
                    'fixed top-[4.7rem] max-h-[181vh] overflow-y-auto z-20 p-6 min-w-[100vw] min-h-screen bg-gray-700 border-l border-b border-gray-600 lg:relative lg:top-0 lg:w-[348px] lg:min-w-[348px] lg:visible',
                    { visible: open, invisible: !open },
                )}
            >
                <span className="block border-b border-gray-500 pb-6 text-2xl font-bold">Schedule</span>
                <div className="mt-6 flex flex-col gap-8">
                    {lessons?.map((lesson, i) => (
                        <Lesson {...lesson} key={i} />
                    ))}
                </div>
            </aside>
        </>
    );
}
