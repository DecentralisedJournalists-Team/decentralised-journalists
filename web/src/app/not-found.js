
import Link from "next/link";

export const metadata = {
    title: "404 | Page Not Found",
    description: "The page you are looking for does not exist. Please visit our homepage to find what you are looking for."
  };


export default function NotFound() {
    return (
        <div className={'flex flex-col py-auto justify-center items-center min-h-[90vh]'}>
            {/* <FaRegQuestionCircle size={100} color={theme.extend.colors["highlight-dark"]} /> */}
            <h1 className={'font-serif text-3xl mt-4'}>404 | Page Not Found</h1>
            <p>Are you lost? Click <Link className={'underline hover:text-gray-800'} href={'/'}>here</Link> to go back home.</p>
        </div>
    );
}