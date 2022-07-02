import Logo from '@/components/Logo';

export default function Header() {
    return (
        <header className="fixed z-20 flex w-full items-center justify-start border-b border-gray-600 bg-gray-700 py-5 lg:relative lg:justify-center">
            <div className="ml-6">
                <Logo />
            </div>
        </header>
    );
}
