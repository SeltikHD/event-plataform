import { useState, FormEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber($name: String!, $email: String!) {
        createSubscriber(data: { name: $name, email: $email }) {
            id
        }
    }
`;

export default function Subscribe() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState([false, false]);

    const [createSubscriber, { error, loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

    const navigate = useNavigate();

    const handleSubscribe = async (e: FormEvent) => {
        e.preventDefault();
        setFormError([name == '', email == '']);

        if (!name || !email) return;

        await createSubscriber({ variables: { name, email } }).then(() => navigate('/event/'));
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-no-repeat bg-cover bg-blur">
            <div className="flex z-10 flex-col justify-between items-center mx-auto w-full max-w-[1100px] h-screen lg:flex-row">
                <div className="p-6 max-w-[640px] bg-gradient-to-r from-transparent to-gray-700 lg:from-gray-500/75 lg:to-transparent lg:rounded-3xl">
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

                <div className="flex flex-col items-center p-8 w-full bg-gray-700 border border-gray-500 lg:w-auto lg:rounded">
                    <strong className="block mb-6 text-2xl">Sign up for free</strong>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 items-center w-full">
                        <input
                            type="text"
                            placeholder="Your complete name"
                            className={`px-5 h-14 w-full bg-gray-900 rounded border ${
                                formError[0] ? 'border-red-600' : 'border-gray-900'
                            }`}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Your best email"
                            className={`px-5 h-14 w-full bg-gray-900 rounded border ${
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
                            className="py-4 mt-4 w-full text-sm font-bold uppercase bg-green-500 hover:bg-green-700 rounded disabled:opacity-50 transition-colors"
                            disabled={loading}
                        >
                            Secure my spot
                        </button>
                    </form>
                </div>
            </div>

            <img
                src="/src/assets/code-mockup.png"
                className="relative z-0 mt-12 max-h-screen lg:absolute lg:mt-0"
                alt="Code Mockup"
            />
        </div>
    );
}
