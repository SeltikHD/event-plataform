import Logo from '@/components/Logo';

export default function Header() {
    return (
        <header className="flex fixed z-20 justify-start items-center py-5 w-full bg-gray-700 border-b border-gray-600 lg:relative lg:justify-center">
            <div className="ml-6">
                <Logo />
            </div>
        </header>
    );
}
