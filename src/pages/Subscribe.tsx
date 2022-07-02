import { useState, FormEvent, useEffect } from 'react';
import { useCreateSubscriberMutation } from '@/graphql/generated';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import codeMockup from '/assets/code-mockup.png';

export default function Subscribe() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState([false, false]);

    const [createSubscriber, { error, loading }] = useCreateSubscriberMutation();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Event - Subscribe';
    }, []);

    const handleSubscribe = async (e: FormEvent) => {
        e.preventDefault();
        setFormError([name == '', email == '']);

        if (!name || !email) return;

        await createSubscriber({ variables: { name, email } }).then(() => navigate('/event/'));
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-blur bg-cover bg-no-repeat">
            <div className="z-10 mx-auto flex h-[70vh] w-full max-w-[1100px] flex-col items-center justify-between lg:h-screen lg:flex-row">
                <div className="max-w-[640px] bg-gradient-to-r from-transparent to-transparent p-6 lg:rounded-3xl lg:from-gray-500/75 lg:to-transparent">
                    <Logo />

                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Build a <strong className="text-blue-500">complete application</strong>, from scratch, with{' '}
                        <strong className="text-blue-500">React</strong>
                    </h1>
                    <p className="mt-4 leading-relaxed text-gray-200">
                        In just one week you will master in practice one of the most used technologies and with high
                        demand to access the best opportunities in the market.
                    </p>
                </div>

                <div className="flex w-full flex-col items-center border border-gray-500 bg-gray-700 p-8 lg:w-auto lg:rounded">
                    <strong className="mb-6 block text-2xl">Sign up for free</strong>

                    <form onSubmit={handleSubscribe} className="flex w-full flex-col items-center gap-2">
                        <input
                            type="text"
                            placeholder="Your complete name"
                            className={`h-14 w-full rounded border bg-gray-900 px-5 ${
                                formError[0] ? 'border-red-600' : 'border-gray-900'
                            }`}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Your best email"
                            className={`h-14 w-full rounded border bg-gray-900 px-5 ${
                                formError[1] || !!error ? 'border-red-600' : 'border-gray-900'
                            }`}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {(error || formError[0] || formError[1]) && (
                            <strong className="text-lg text-red-600">
                                {error
                                    ? 'E-mail already registered!'
                                    : (formError[0] || formError[1]) &&
                                      `${formError[0] ? 'Name ' : ''}${formError[0] && formError[1] ? 'and ' : ''}${
                                          formError[1] ? 'Email ' : ''
                                      } not defined!`}
                            </strong>
                        )}

                        <button
                            type="submit"
                            className="mt-4 w-full rounded bg-green-500 py-4 text-sm font-bold uppercase transition-colors hover:bg-green-700 disabled:opacity-50"
                            disabled={loading}
                        >
                            Secure my spot
                        </button>
                    </form>
                </div>
            </div>

            <img src={codeMockup} className="relative z-0 mt-12 max-h-screen lg:absolute lg:mt-0" alt="Code Mockup" />
        </div>
    );
}
