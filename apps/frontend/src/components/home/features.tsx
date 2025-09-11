'use client';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Terminal, BarChart3, Workflow, Users } from 'lucide-react';

interface BentoGridItemProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

const BentoGridItem = ({
    title,
    description,
    icon,
    className,
    size = 'small',
}: BentoGridItemProps) => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring' as const, damping: 25 },
        },
    };

    return (
        <motion.div
            variants={variants}
            className={cn(
                'group border-primary/10 bg-background hover:border-primary/30 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border px-6 pt-6 pb-10 shadow-md transition-all duration-500',
                className,
            )}
        >
            <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,#3d16165e_1px,transparent_1px),linear-gradient(to_bottom,#3d16165e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>

            <div className="text-primary/5 group-hover:text-primary/10 absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
                {icon}
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <div className="bg-primary/10 text-primary shadow-primary/10 group-hover:bg-primary/20 group-hover:shadow-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
                        {icon}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
                    <p className="text-muted-foreground text-sm">{description}</p>
                </div>

            </div>
            <div className="from-primary to-primary/30 absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r blur-2xl transition-all duration-500 group-hover:blur-lg" />
        </motion.div>
    );
};

const items = [
    {
        title: 'Automated API Testing',
        description:
            'Quickly generate and execute test cases for your APIs with minimal setup. Trafyx ensures consistency, accuracy, and faster feedback loops for developers.',
        icon: <Terminal className="size-6" />,
        size: 'large' as const,
    },
    {
        title: 'Real-Time Reporting',
        description:
            'View live execution results, detailed logs, and status reports in one place. Instantly identify failures and debug issues without switching tools.',
        icon: <BarChart3 className="size-6" />,
        size: 'small' as const,
    },
    {
        title: 'Scenario-Based Testing',
        description:
            'Simulate complex workflows by chaining multiple API calls. Trafyx helps you validate dependencies, edge cases, and integrations under real-world conditions.',
        icon: <Workflow className="size-6" />,
        size: 'medium' as const,
    },
    {
        title: 'Seamless Collaboration',
        description:
            'Share test cases and results with your team or integrate Trafyx into CI/CD pipelines. Empower QA, developers, and DevOps to work together effortlessly.',
        icon: <Users className="size-6" />,
        size: 'medium' as const,
    },
];


export default function Features() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="max-w-4xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <h2 className="text-lg md:text-7xl mb-4 max-w-4xl tracking-tighter text-balance ">
                    Smarter Features to Supercharge Your <br />
                    <span className="tracking-tighter text-balance text-transparent from-primary/10 via-foreground/85 to-foreground/50 bg-gradient-to-tl bg-clip-text">
                        API Testing
                    </span>
                </h2>
                <p className=" text-sm md:text-base max-w-sm">
                    Trafyx streamlines API testing with automation, real-time insights, and collaborative tools. Built for developers and QA teams to save time, catch issues early, and ensure reliable API performance.
                </p>

            </div>
            <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >


                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        size={item.size}
                        className={cn(
                            item.size === 'large'
                                ? 'col-span-4'
                                : item.size === 'medium'
                                    ? 'col-span-3'
                                    : 'col-span-2',
                            'h-full',
                        )}
                    />
                ))}
            </motion.div>
        </div>
    );
}