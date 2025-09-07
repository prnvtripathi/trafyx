export default function Heading({ title, description, className }: { title: string, description?: string, className?: string }) {
    return (
        <div className={className}>
            <h1 className="md:text-3xl text-2xl font-bold">
                {title}
            </h1>
            {description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {description}
                </p>
            )}
        </div>
    );
}